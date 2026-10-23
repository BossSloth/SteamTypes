import {
  InterfaceDeclaration,
  MethodSignature,
  MethodSignatureStructure,
  Node,
  PropertySignature,
  PropertySignatureStructure,
  StructureKind,
  SyntaxKind,
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
  reconcileMember(
    target: PropertySignature | MethodSignature,
    source: PropertySignature | MethodSignature,
    isInherited: boolean,
  ): boolean;
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
  public reconcileMembers(
    targetInterface: InterfaceDeclaration | TypeLiteralNode,
    sourceInterface: InterfaceDeclaration | TypeLiteralNode,
  ): boolean {
    return this.reconcileMembersPass(targetInterface, sourceInterface, new Set<string>());
  }

  /**
   * Reconciles a single property or method pair. Properties go to the property reconciler, everything else to the method reconciler.
   * @returns true if an inherited member needs an extends update
   */
  public reconcileMember(
    target: PropertySignature | MethodSignature,
    source: PropertySignature | MethodSignature,
    isInherited: boolean,
  ): boolean {
    if (target instanceof PropertySignature && source instanceof PropertySignature) {
      return this.properties.reconcile(target, source, isInherited);
    }

    return this.methods.reconcile(target as MethodSignature, source as MethodSignature, isInherited);
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
    const pending: (PropertySignatureStructure | MethodSignatureStructure)[] = [];

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
        const missingMember = this.createMissingMember(sourceProp, propName);
        if (missingMember) pending.push(missingMember);
        changed = true;

        continue;
      }

      // Property exists in both, check for type differences
      if (targetProp.getFirstDescendantByKind(SyntaxKind.TypeReference)) this.flushMissingMembers(targetInterface, pending);
      const needsExtendUpdate = this.reconcileMember(targetProp, sourceProp, !realTargetMembersMap.has(targetProp.getName()));

      if (
        needsExtendUpdate
        && targetInterface instanceof InterfaceDeclaration
        && sourceInterface instanceof InterfaceDeclaration
      ) {
        this.flushMissingMembers(targetInterface, pending);
        if (
          this.reconcileInheritedOnce(targetInterface, sourceInterface, propName, handledInherited, () => {
            this.inheritance.reconcileInheritedMismatch(targetInterface, sourceInterface, propName);
          })
        ) {
          return true;
        }
      }
    }

    this.flushMissingMembers(targetInterface, pending);

    // Check for extra properties in target that don't exist in source
    const toRemove: (PropertySignature | MethodSignature)[] = [];
    for (const [propName, targetProp] of targetMembersMap) {
      if (!sourceMembersMap.has(propName) && !targetProp.hasQuestionToken()) {
        if (realTargetMembersMap.has(propName)) {
          // Property exists in target but not in source, remove it
          toRemove.push(targetProp);
          continue;
        }

        // An extra inherited member can only exist on an InterfaceDeclaration
        this.removeMembers(targetInterface, toRemove);
        this.reconcileInheritedOnce(
          targetInterface as InterfaceDeclaration,
          sourceInterface as InterfaceDeclaration,
          propName,
          handledInherited,
          () => {
            this.inheritance.reconcileExtraInheritedMember(
              targetInterface as InterfaceDeclaration,
              sourceInterface as InterfaceDeclaration,
              propName,
            );
          },
        );

        return true;
      }
    }

    this.removeMembers(targetInterface, toRemove);

    return changed || toRemove.length > 0;
  }

  /**
   * Builds the structure for a property or method missing from the target interface
   * @param sourceProp The property or method to copy
   * @param propName The name of the member to add
   *
   * @returns the structure to insert, or undefined when the source property has no type
   */
  private createMissingMember(
    sourceProp: PropertySignature | MethodSignature,
    propName: string,
  ): PropertySignatureStructure | MethodSignatureStructure | undefined {
    if (sourceProp instanceof MethodSignature) {
      // Filter out @native jsdoc
      const docs = sourceProp.getJsDocs().map((doc) => doc.getInnerText());
      const filteredDocs = docs.filter((doc) => doc !== '');

      return {
        kind: StructureKind.MethodSignature,
        name: propName,
        parameters: sourceProp.getParameters().map((param) => ({
          name: param.getName(),
          type: param.getTypeNode()?.getText(),
          hasQuestionToken: param.hasQuestionToken(),
        })),
        returnType: sourceProp.getReturnTypeNode()?.getText(),
        hasQuestionToken: sourceProp.hasQuestionToken(),
        docs: filteredDocs,
      };
    }

    const typeNode = sourceProp.getTypeNode();
    if (!typeNode) return undefined;

    this.references.addMissingInterface(typeNode);

    return {
      kind: StructureKind.PropertySignature,
      name: propName,
      type: typeNode.getText(),
      hasQuestionToken: sourceProp.hasQuestionToken(),
      isReadonly: sourceProp.isReadonly(),
      docs: sourceProp.getJsDocs().map((doc) => doc.getStructure()),
    };
  }

  /**
   * Inserts the pending members in one edit. Skips names the target already has, since a nested reconcile of the
   * same interface may have added them.
   * @param targetInterface The interface to add the members to
   * @param pending The structures to add. Cleared after the call.
   */
  private flushMissingMembers(
    targetInterface: InterfaceDeclaration | TypeLiteralNode,
    pending: (PropertySignatureStructure | MethodSignatureStructure)[],
  ): void {
    if (pending.length === 0) return;

    const existingNames = new Set(
      targetInterface
        .getMembers()
        .filter(
          (member): member is PropertySignature | MethodSignature =>
            member instanceof PropertySignature || member instanceof MethodSignature,
        )
        .map((member) => member.getName()),
    );
    const newMembers = pending.filter((member) => !existingNames.has(member.name));
    pending.length = 0;

    targetInterface.addMembers(newMembers);
  }

  /**
   * Removes the members in one edit. Adjacent members are removed as one run, with the same whitespace handling as
   * ts-morph's own removal, so the result matches removing them one at a time.
   * @param targetInterface The interface to remove the members from
   * @param members The members to remove
   */
  private removeMembers(
    targetInterface: InterfaceDeclaration | TypeLiteralNode,
    members: (PropertySignature | MethodSignature)[],
  ): void {
    if (members.length === 0) return;

    if (members.length === 1) {
      members[0].remove();

      return;
    }

    const siblings = members[0].getParentSyntaxListOrThrow().getChildren();
    const removed = new Set<Node>(members);
    const indices = siblings.flatMap((sibling, index) => (removed.has(sibling) ? [index] : []));

    const runs: number[][] = [];
    let previous = -2;
    for (const index of indices) {
      if (index === previous + 1) {
        runs[runs.length - 1].push(index);
      } else {
        runs.push([index]);
      }
      previous = index;
    }

    const fullText = targetInterface.getSourceFile().getFullText();
    let newFullText = fullText;
    for (const run of runs.reverse()) {
      const first = run[0];
      const last = run[run.length - 1];
      const { start, end, spacing } = getRunRemoval(
        siblings[first],
        siblings[last],
        siblings[first - 1],
        siblings[last + 1],
        fullText,
      );
      newFullText = newFullText.slice(0, start) + spacing + newFullText.slice(end);
    }

    const delta = newFullText.length - fullText.length;
    targetInterface.replaceWithText(newFullText.slice(targetInterface.getStart(true), targetInterface.getEnd() + delta));
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

/**
 * Computes the text range that ts-morph's removal deletes for a run of adjacent interface or type literal members,
 * and the separator it leaves behind. Ports RemoveChildrenWithFormattingTextManipulator, where member formatting is
 * always a newline.
 */
function getRunRemoval(
  firstChild: Node,
  lastChild: Node,
  previousSibling: Node | undefined,
  nextSibling: Node | undefined,
  fullText: string,
): { start: number; end: number; spacing: string } {
  let start: number;
  if (previousSibling !== undefined) {
    const trailingEnd = previousSibling.getTrailingTriviaEnd();
    start = isNewLineAtPos(fullText, trailingEnd) ? trailingEnd : previousSibling.getEnd();
  } else {
    const firstPos = getPreviousNonWhitespacePos(fullText, firstChild.getPos());
    start = firstChild.isFirstNodeOnLine() ? firstPos : firstChild.getNonWhitespaceStart();
  }

  const triviaEnd = lastChild.getTrailingTriviaEnd();
  let end: number;
  if (previousSibling !== undefined && nextSibling !== undefined) {
    end = getPosAtStartOfLineOrNonWhitespace(fullText, nextSibling.getNonWhitespaceStart());
  } else if (isNewLineAtPos(fullText, triviaEnd)) {
    end = getPosAtEndOfPreviousLine(fullText, getPosAtNextNonBlankLine(fullText, triviaEnd));
  } else {
    end = previousSibling === undefined ? triviaEnd : lastChild.getEnd();
  }

  const spacing = previousSibling !== undefined && nextSibling !== undefined ? '\n' : '';

  return { start, end, spacing };
}

function isNewLineAtPos(fullText: string, pos: number): boolean {
  const newLine = /\r?\n/y;
  newLine.lastIndex = pos;

  return newLine.test(fullText);
}

function getPreviousNonWhitespacePos(fullText: string, pos: number): number {
  return fullText.slice(0, pos).replace(/\s+$/, '').length;
}

function getPosAtStartOfLineOrNonWhitespace(fullText: string, pos: number): number {
  return fullText.slice(0, pos).replace(/[ \t]+$/, '').length;
}

function getPosAtEndOfPreviousLine(fullText: string, pos: number): number {
  const newLine = fullText.lastIndexOf('\n', pos - 1);

  return newLine - Number(fullText[newLine - 1] === '\r');
}

function getPosAtNextNonBlankLine(fullText: string, pos: number): number {
  const blankLines = /(?:[ \t]*\r?\n)*/y;
  blankLines.lastIndex = pos;
  blankLines.exec(fullText);

  return blankLines.lastIndex;
}
