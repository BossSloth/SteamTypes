import {
  InterfaceDeclaration,
  MethodSignature,
  PropertySignature,
  SyntaxKind,
  TypeElementMemberedNode,
  TypeLiteralNode,
} from 'ts-morph';
import type { InterfaceReferenceResolver } from '../matching/InterfaceReferenceResolver';
import type { ComparisonSession } from '../session/ComparisonSession';
import { getInterfaceMembers } from '../shared';
import { InheritanceReconciler } from './InheritanceReconciler';
import { MethodReconciler } from './MethodReconciler';
import { PropertyReconciler } from './PropertyReconciler';
import { TypeReconciler } from './TypeReconciler';

/**
 * The narrow view of the member hub that the type and inheritance reconcilers depend on.
 */
export interface MemberReconciliation {
  reconcileMembers(target: InterfaceDeclaration | TypeLiteralNode, source: InterfaceDeclaration | TypeLiteralNode): boolean;
  reconcileMember(target: PropertySignature | MethodSignature, source: PropertySignature | MethodSignature, isInherited: boolean): boolean;
}

/**
 * Hub for member reconciliation. Mutates target members (adds, removes, corrects) and, through its collaborators,
 * the target's extends clauses and interfaces. Its constructor builds the collaborators and passes `this` as a
 * MemberReconciliation; no collaborator calls back into the hub during construction.
 */
export class MemberReconciler implements MemberReconciliation {
  private readonly references: InterfaceReferenceResolver;
  private readonly types: TypeReconciler;
  private readonly properties: PropertyReconciler;
  private readonly methods: MethodReconciler;
  private readonly inheritance: InheritanceReconciler;

  public constructor(session: ComparisonSession, references: InterfaceReferenceResolver) {
    this.references = references;
    this.types = new TypeReconciler(session, references, this);
    this.properties = new PropertyReconciler(session, references, this.types);
    this.methods = new MethodReconciler(this.types);
    this.inheritance = new InheritanceReconciler(session, this);
  }

  /**
   * Compares and corrects properties between two interfaces
   * @param targetInterface The interface to be edited
   * @param sourceInterface The interface to use as the source of truth
   *
   * @returns true if properties were added or removed
   */
  public reconcileMembers(targetInterface: InterfaceDeclaration | TypeLiteralNode, sourceInterface: InterfaceDeclaration | TypeLiteralNode): boolean {
    return this.reconcileMembersPass(targetInterface, sourceInterface, new Set<string>());
  }

  /** Runs an inheritance correction for `memberName` at most once per pass, then re-runs the pass with fresh maps. @returns false when the name was already handled in this pass */
  private reconcileInheritedOnce(
    target: InterfaceDeclaration,
    source: InterfaceDeclaration,
    memberName: string,
    handledInherited: Set<string>,
    correct: () => void,
  ): boolean {
    if (handledInherited.has(memberName)) {
      return false;
    }

    handledInherited.add(memberName);
    correct();
    this.reconcileMembersPass(target, source, handledInherited);

    return true;
  }

  /**
   * One pass over the members. `handledInherited` holds the inherited names whose inheritance correction already ran in
   * this reconciliation. After a correction the pass re-runs with the same set, so later members are still compared.
   * A name that was handled once is not sent to the inheritance path again, which stops the re-run from recursing forever
   * when a correction does not resolve the mismatch.
   */
  private reconcileMembersPass(
    targetInterface: InterfaceDeclaration | TypeLiteralNode,
    sourceInterface: InterfaceDeclaration | TypeLiteralNode,
    handledInherited: Set<string>,
  ): boolean {
    const targetMembers = getInterfaceMembers(targetInterface);
    const realTargetMembers = targetInterface.getMembers() as (PropertySignature | MethodSignature)[];
    const sourceMembers = getInterfaceMembers(sourceInterface);

    // Create maps for easier lookup
    const targetMembersMap = new Map<string, PropertySignature | MethodSignature>();
    targetMembers.forEach((member) => targetMembersMap.set(member.getName(), member));
    const realTargetMembersMap = new Map<string, PropertySignature | MethodSignature>();
    realTargetMembers.forEach((member) => realTargetMembersMap.set(member.getName(), member));

    const sourceMembersMap = new Map<string, PropertySignature | MethodSignature>();
    sourceMembers.forEach((member) => sourceMembersMap.set(member.getName(), member));

    // Reconcile computed property names (e.g. [Enum.Value]) with source numeric keys
    reconcileComputedPropertyNames(targetMembers, targetMembersMap, realTargetMembersMap, sourceMembersMap);

    let changed = false;

    // Check for missing properties in target and add them
    for (const [propName, sourceProp] of sourceMembersMap) {
      let targetProp = targetMembersMap.get(propName);

      // Check for mismatched kinds
      if (targetProp && targetProp.getKind() !== sourceProp.getKind()) {
        // Property kind mismatch, remove the property
        targetProp.remove();
        targetProp = undefined;
        changed = true;
      }

      if (!targetProp) {
        this.addMissingMember(targetInterface, sourceProp, propName);
        changed = true;

        continue;
      }

      // Property exists in both, check for type differences
      const isFromExtendedInterface = !realTargetMembersMap.has(targetProp.getName());
      const needsExtendUpdate = this.reconcileMember(targetProp, sourceProp, isFromExtendedInterface);

      if (needsExtendUpdate && targetInterface instanceof InterfaceDeclaration && sourceInterface instanceof InterfaceDeclaration) {
        if (this.reconcileInheritedOnce(targetInterface, sourceInterface, propName, handledInherited, () => {
          this.inheritance.reconcileInheritedMismatch(targetInterface, sourceInterface, propName);
        })) {
          return true;
        }
      }
    }

    // Check for extra properties in target that don't exist in source
    for (const [propName, targetProp] of targetMembersMap) {
      if (!sourceMembersMap.has(propName) && !targetProp.hasQuestionToken()) {
        if (realTargetMembersMap.has(propName)) {
          // Property exists in target but not in source, remove it
          targetProp.remove();
          changed = true;
          continue;
        }

        // An extra inherited member can only exist on an InterfaceDeclaration
        this.reconcileInheritedOnce(targetInterface as InterfaceDeclaration, sourceInterface as InterfaceDeclaration, propName, handledInherited, () => {
          this.inheritance.reconcileExtraInheritedMember(targetInterface as InterfaceDeclaration, sourceInterface as InterfaceDeclaration, propName);
        });

        return true;
      }
    }

    return changed;
  }

  /**
   * Reconciles a single property or method pair. Properties go to the property reconciler, everything else to the method reconciler.
   * @returns true if an inherited member needs an extends update
   */
  public reconcileMember(target: PropertySignature | MethodSignature, source: PropertySignature | MethodSignature, isInherited: boolean): boolean {
    if (target instanceof PropertySignature && source instanceof PropertySignature) {
      return this.properties.reconcile(target, source, isInherited);
    }

    return this.methods.reconcile(target as MethodSignature, source as MethodSignature, isInherited);
  }

  /**
   * Adds a missing property to the target interface
   * @param targetInterface The interface to add the property to
   * @param sourceProp The property to add
   * @param propName The name of the property to add
   */
  private addMissingMember(targetInterface: TypeElementMemberedNode, sourceProp: PropertySignature | MethodSignature, propName: string): void {
    // Property missing in target, add it
    if (sourceProp instanceof MethodSignature) {
      // Filter out @native jsdoc
      const docs = sourceProp.getJsDocs().map((doc) => doc.getInnerText());
      const filteredDocs = docs.filter((doc) => doc !== '');

      targetInterface.addMethod({
        name: propName,
        parameters: sourceProp.getParameters().map((param) => ({
          name: param.getName(),
          type: param.getTypeNode()?.getText(),
          hasQuestionToken: param.hasQuestionToken(),
        })),
        returnType: sourceProp.getReturnTypeNode()?.getText(),
        hasQuestionToken: sourceProp.hasQuestionToken(),
        docs: filteredDocs,
      });
    } else {
      const typeNode = sourceProp.getTypeNode();
      if (!typeNode) return;

      targetInterface.addProperty({
        name: propName,
        type: typeNode.getText(),
        hasQuestionToken: sourceProp.hasQuestionToken(),
        isReadonly: sourceProp.isReadonly(),
        docs: sourceProp.getJsDocs().map((doc) => doc.getStructure()),
      });

      this.references.addMissingInterface(typeNode);
    }
  }
}

/**
 * Reconciles computed property names (e.g. [Enum.Value]) with source numeric keys.
 * Resolves the computed expression to its literal value via the type checker,
 * then remaps the target member so it matches the equivalent source key.
 */
function reconcileComputedPropertyNames(
  targetMembers: (PropertySignature | MethodSignature)[],
  targetMembersMap: Map<string, PropertySignature | MethodSignature>,
  realTargetMembersMap: Map<string, PropertySignature | MethodSignature>,
  sourceMembersMap: Map<string, PropertySignature | MethodSignature>,
): void {
  for (const member of targetMembers) {
    if (!(member instanceof PropertySignature)) continue;
    const nameNode = member.getNameNode();
    if (!nameNode.isKind(SyntaxKind.ComputedPropertyName)) continue;

    const computedName = member.getName();
    const resolvedValue = nameNode.getExpression().getType().getLiteralValue();
    if (typeof resolvedValue !== 'number' && typeof resolvedValue !== 'string') continue;

    const resolvedKey = `${resolvedValue}`;
    if (!sourceMembersMap.has(resolvedKey) || targetMembersMap.has(resolvedKey)) continue;

    // Remap the computed target member to the resolved source key
    targetMembersMap.set(resolvedKey, member);
    targetMembersMap.delete(computedName);
    realTargetMembersMap.set(resolvedKey, member);
  }
}
