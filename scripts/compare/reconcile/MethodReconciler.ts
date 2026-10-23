import { MethodSignature, Node, ParameterDeclaration, SyntaxKind } from 'ts-morph';
import type { TypeReconciler } from './TypeReconciler';
import { CustomJsDocTags, hasJsDocTag, updatePropertyModifiers } from '../shared';

/**
 * Reconciles method return types, parameters and modifiers. Mutates the target method and its parameters.
 */
export class MethodReconciler {
  private readonly types: TypeReconciler;

  public constructor(types: TypeReconciler) {
    this.types = types;
  }

  /**
   * Compares and corrects method types
   * @param targetMethod The method to be edited
   * @param sourceMethod The method to use as the source of truth
   * @param isFromExtendedInterface Whether the method is inherited from an extended interface
   *
   * @returns true if the method is from an extended interface and its signature needs to change
   */
  public reconcile(targetMethod: MethodSignature, sourceMethod: MethodSignature, isFromExtendedInterface = false): boolean {
    if (hasJsDocTag(targetMethod, CustomJsDocTags.ignore)) {
      return false;
    }

    if (!isFromExtendedInterface) {
      updatePropertyModifiers(targetMethod, sourceMethod);
    }

    // If it has the @native jsDoc don't compare
    if (sourceMethod.getJsDocs().some((doc) => doc.getTags().some((tag) => tag.getTagName() === CustomJsDocTags.native))) {
      return false;
    }

    const returnTypeNeedsUpdate = this.compareReturnType(targetMethod, sourceMethod, isFromExtendedInterface);
    const parametersNeedUpdate = this.compareParameters(targetMethod, sourceMethod, isFromExtendedInterface);

    return returnTypeNeedsUpdate || parametersNeedUpdate;
  }

  private compareReturnType(
    targetMethod: MethodSignature,
    sourceMethod: MethodSignature,
    isFromExtendedInterface: boolean,
  ): boolean {
    // Compare return types
    const targetReturnTypeNode = targetMethod.getReturnTypeNode();
    const sourceReturnTypeNode = sourceMethod.getReturnTypeNode();

    const typesAreEqual =
      targetReturnTypeNode !== undefined
      && sourceReturnTypeNode !== undefined
      && this.types.reconcile(targetReturnTypeNode, sourceReturnTypeNode);

    if (!typesAreEqual && sourceReturnTypeNode !== undefined) {
      if (isFromExtendedInterface) {
        return true;
      }
      targetMethod.setReturnType(sourceReturnTypeNode.getText());
    }

    return false;
  }

  private compareParameters(
    targetMethod: MethodSignature,
    sourceMethod: MethodSignature,
    isFromExtendedInterface: boolean,
  ): boolean {
    // Compare parameters
    const targetParams = targetMethod.getParameters();
    const sourceParams = sourceMethod.getParameters();

    if (targetParams[0]?.isRestParameter() && Node.isTypeReference(targetParams[0]?.getTypeNode())) {
      // If we are using a reference type as a array deconstruction rest type skip
      // Example test case: 'external type accessed arguments'
      return false;
    }

    // If sourceParams is just '...e: unknown[]' skip type check
    if (sourceParams.length === 1 && sourceParams[0].isRestParameter()) {
      const sourceTypeNode = sourceParams[0].getTypeNode();
      if (
        sourceTypeNode?.isKind(SyntaxKind.ArrayType) === true
        && sourceTypeNode.getElementTypeNode().isKind(SyntaxKind.UnknownKeyword)
      ) {
        return false;
      }
    }

    let needsUpdate = false;
    for (let i = 0; i < Math.max(sourceParams.length, targetParams.length); i++) {
      const sourceParam = sourceParams[i];
      const targetParam = targetParams[i];

      if (this.compareParameter(targetMethod, targetParam, sourceParam, isFromExtendedInterface)) {
        needsUpdate = true;
      }
    }

    return needsUpdate;
  }

  private compareParameter(
    targetMethod: MethodSignature,
    targetParam: ParameterDeclaration | undefined,
    sourceParam: ParameterDeclaration | undefined,
    isFromExtendedInterface: boolean,
  ): boolean {
    const sourceTypeNode = sourceParam?.getTypeNode();
    const targetTypeNode = targetParam?.getTypeNode();

    if (targetParam === undefined && sourceParam !== undefined) {
      if (isFromExtendedInterface) {
        return true;
      }
      targetMethod.addParameter(sourceParam.getStructure());

      return false;
    }

    if (targetParam !== undefined && sourceParam === undefined) {
      if (isFromExtendedInterface) {
        return true;
      }
      targetParam.remove();

      return false;
    }

    /* v8 ignore next -- the parameter loop bound guarantees at least one side exists @preserve */
    if (sourceParam === undefined || targetParam === undefined) {
      return false;
    }

    const typesAreEqual =
      sourceTypeNode === undefined || (targetTypeNode !== undefined && this.types.reconcile(targetTypeNode, sourceTypeNode));

    if (isFromExtendedInterface) {
      return !typesAreEqual;
    }

    updatePropertyModifiers(targetParam, sourceParam);

    if (!typesAreEqual) {
      targetParam.setType(sourceTypeNode.getText());
    }

    return false;
  }
}
