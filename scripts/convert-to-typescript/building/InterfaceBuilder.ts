import { ClassDeclaration } from 'ts-morph';
import { getProtobufClassName, isProtobufClass } from '../detection/protobuf-helpers';
import { TypeDetector } from '../detection/TypeDetector';
import { ConversionSession } from '../session/ConversionSession';
import { GenericType, InterfaceType, PrimitiveType, Type } from '../Type';
import { InterfaceProperty, InterfaceToProcess, TypeScriptInterface } from '../types';
import { formatPropertyName, getProperties, propertyStringSorter } from '../utils';
import { FunctionExtractor } from './FunctionExtractor';

/**
 * Builds interface definitions from runtime objects: enumerates properties,
 * detects their types, and batches function-signature extraction.
 */
export class InterfaceBuilder {
  private readonly session: ConversionSession;
  private readonly detector: TypeDetector;
  private readonly functionExtractor: FunctionExtractor;

  // Caches scoped to this builder (and therefore to a single conversion session)
  private readonly cachedClassDeclarations = new Map<string, ClassDeclaration>();
  private readonly cachedFunctionDeclarations = new Map<string, Function>();
  private readonly cachedMissingFunctions = new Set<string>();

  constructor(session: ConversionSession) {
    this.session = session;
    this.detector = new TypeDetector(session);
    this.functionExtractor = new FunctionExtractor(session.project);
  }

  /**
   * Creates or updates an interface definition object
   */
  public createInterfaceDefinition(interfaceName: string, interfaceToProcess: InterfaceToProcess): void {
    if (this.session.interfaceRepository.definitions.get(interfaceName)) {
      console.error(`❌ Error: duplicate interface name?: ${interfaceName}`, interfaceToProcess.obj);

      return;
    }

    // Create a new interface definition
    const interfaceDefinition: TypeScriptInterface = {
      name: interfaceName,
      properties: [],
      order: this.session.interfaceRepository.nextOrder(),
      nameCounter: interfaceToProcess.nameCounter,
      constructorString: interfaceToProcess.constructorString,
      extendedConstructorString: interfaceToProcess.extendedConstructorString,
      protobufClassName: interfaceToProcess.protobufClassName,
    };

    // Get all properties
    const properties = getProperties(interfaceToProcess.obj).sort(propertyStringSorter);

    // Process all properties
    this.processInterfaceProperties(interfaceToProcess.obj, properties, interfaceDefinition);

    // Get parameter information and return type using ts-morph in one big call
    // This is still the biggest performance hit because of ts-morph being slow
    const functions = this.session.functions.get(interfaceName);
    if (functions) {
      const functionInfos = this.functionExtractor.extract(functions);
      for (const [name, functionInfo] of functionInfos) {
        const interfaceProperty: InterfaceProperty = {
          name,
          type: new PrimitiveType('function'),
          functionInfo,
        };
        interfaceDefinition.properties.push(interfaceProperty);
      }
    }

    this.session.interfaceRepository.definitions.set(interfaceName, interfaceDefinition);
  }

  private processInterfaceProperties(
    obj: Record<string, unknown>,
    properties: string[],
    interfaceDefinition: TypeScriptInterface,
  ): void {
    const name = interfaceDefinition.name;
    for (const key of properties) {
      // Skip ignoredProperties for performance optimization
      if (this.session.ignoredProperties.has(key)) {
        const formattedName = formatPropertyName(key);
        const interfaceProperty: InterfaceProperty = {
          name: formattedName,
          type: new PrimitiveType('unknown'),
          jsDoc: ['@todo property ignored by configuration, please type this'],
        };
        interfaceDefinition.properties.push(interfaceProperty);
        continue;
      }

      let value: unknown;
      try {
        value = obj[key];
      }
      catch (e) {
        console.error(`❌ Error: failed to get property ${key} from ${name}`, e);

        const interfaceProperty: InterfaceProperty = {
          name: key,
          type: new PrimitiveType('unknown'),
          jsDoc: ['@todo property failed to be extracted, please type this'],
        };
        interfaceDefinition.properties.push(interfaceProperty);

        continue;
      }

      const propertyPath = `${name}.${key}`;
      const formattedName = formatPropertyName(key);

      if (typeof value === 'function') {
        this.processFunctionProperty(obj, value, formattedName, interfaceDefinition);
      } else {
        const foundCM = this.handleConnectionManagerProperty(key, formattedName, interfaceDefinition);
        if (foundCM) continue;

        const type = this.detector.detect(value, propertyPath);

        const jsDoc = generatePropertyJsDoc(type, key, value);

        const interfaceProperty: InterfaceProperty = {
          name: formattedName,
          type,
          jsDoc,
        };

        interfaceDefinition.properties.push(interfaceProperty);
      }
    }
  }

  private processFunctionProperty(
    obj: Record<string, unknown>,
    value: Function,
    formattedName: string,
    interfaceDefinition: TypeScriptInterface,
  ): void {
    const protobufProperty = this.tryGetProtobufClassProperty(value, formattedName);
    if (protobufProperty) {
      interfaceDefinition.properties.push(protobufProperty);

      return;
    }

    if (isClassFunction(value)) {
      interfaceDefinition.properties.push({
        name: formattedName,
        type: new PrimitiveType('unknown'),
        jsDoc: ['This is a class function'],
      });

      return;
    }

    if (isBoundFunction(value, obj)) {
      value = this.handleNativeFunction(obj, value, formattedName);
    }

    this.session.functions.add(interfaceDefinition.name, formattedName, value);
  }

  private handleConnectionManagerProperty(key: string, formattedName: string, interfaceDefinition: TypeScriptInterface): boolean {
    if (key === 'CMInterface' || key === 'm_CMInterface' || key === 'm_CM') {
      const interfaceProperty: InterfaceProperty = {
        name: formattedName,
        type: new InterfaceType('ConnectionManager'),
      };
      this.session.imports.add('Global/managers/ConnectionManager', 'ConnectionManager');
      interfaceDefinition.properties.push(interfaceProperty);

      return true;
    }

    return false;
  }

  private tryGetProtobufClassProperty(value: unknown, formattedName: string): InterfaceProperty | null {
    if (!isProtobufClass(value)) return null;
    const protoClassName = getProtobufClassName(value as Function);
    /* v8 ignore next -- @preserve */
    if (protoClassName === null) return null;

    this.session.imports.add('shared/protobuf', 'ProtobufClass');

    return {
      name: formattedName,
      type: new GenericType('ProtobufClass', [protoClassName]),
    };
  }

  // TODO: this is unoptimized it is better to just give the function declaration directly to processVariableDeclaration as it should also support function declarations
  private handleNativeFunction(classObj: Record<string, unknown>, functionObj: Function, functionName: string): Function {
    if (functionName.startsWith('m_fn')) {
      // Common pattern Steam uses on variable functions
      return functionObj;
    }

    const functionCacheKey = `${classObj.constructor.toString()}.${functionName}`;
    const cachedFunction = this.cachedFunctionDeclarations.get(functionCacheKey);
    if (cachedFunction) {
      return cachedFunction;
    }

    const classString = classObj.constructor.toString();
    let classDeclaration: ClassDeclaration | undefined = this.cachedClassDeclarations.get(classString);
    if (!classDeclaration) {
      const sourceFile = this.session.project.createSourceFile(`${Math.random().toString(36).substring(2)}.ts`, classString);

      classDeclaration = sourceFile.getClasses()[0];
      this.cachedClassDeclarations.set(classString, classDeclaration);
    }

    const functionDeclaration = classDeclaration.getMethod(functionName);
    if (!functionDeclaration) {
      const missingFunctionKey = `${classDeclaration.getName()}.${functionName}`;
      if (this.cachedMissingFunctions.has(missingFunctionKey)) {
        return functionObj;
      }
      this.cachedMissingFunctions.add(missingFunctionKey);
      console.warn(`Function ${functionName} not found in class ${classDeclaration.getName()}`);

      return functionObj;
    }

    // We need to call eval indirectly because of this https://esbuild.github.io/content-types/#direct-eval
    // eslint-disable-next-line no-eval
    const scopedEval = eval;
    let functionText = functionDeclaration.getText();
    let functionInstance: Function;
    if (functionText.startsWith('async ')) {
      functionText = functionText.slice('async '.length);
      functionInstance = scopedEval(`(async function ${functionText})`) as Function;
    } else {
      functionInstance = scopedEval(`(function ${functionText})`) as Function;
    }

    this.cachedFunctionDeclarations.set(functionCacheKey, functionInstance);

    return functionInstance;
  }
}

function generatePropertyJsDoc(type: Type, propertyName: string, value: unknown): string[] | undefined {
  if (
    type instanceof PrimitiveType
    && type.kind === 'number'
    && typeof value === 'number'
    && propertyName.trim().match(/^e[A-Z]|^m_e[A-Z]/) !== null
  ) {
    // If we got here we have a property that is likely an enum value
    return ['This value is an enum', `@currentValue ${value}`];
  }

  return undefined;
}

function isBoundFunction(functionObj: Function, classObj: Record<string, unknown>): boolean {
  return functionObj.name.startsWith('bound ') && classObj.constructor.name !== 'Object';
}

function isClassFunction(functionObj: Function): boolean {
  return 'toString' in functionObj && functionObj.toString().trim().startsWith('class ');
}
