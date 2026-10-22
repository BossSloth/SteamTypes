import { Identifier, InterfaceDeclaration, MethodSignature, Node, PropertySignature, SyntaxKind } from 'ts-morph';
import type { ComparisonSession } from '../session/ComparisonSession';
import { orderMembers } from '../member-ordering';
import { getInterfaceMembers, getTypeText } from '../shared';
import type { MemberReconciliation } from './MemberReconciler';

/**
 * Reconciles members inherited through `extends`, including synthetic bases that exist only in the target.
 * Mutates the target base and derived interfaces (members, extends clauses) and may remove base members.
 */
export class InheritanceReconciler {
  private readonly session: ComparisonSession;
  private readonly members: MemberReconciliation;

  public constructor(session: ComparisonSession, members: MemberReconciliation) {
    this.session = session;
    this.members = members;
  }

  public reconcileInheritedMismatch(targetInterface: InterfaceDeclaration, sourceInterface: InterfaceDeclaration, memberName: string): void {
    if (this.reconcileNonSyntheticBaseMember(targetInterface, sourceInterface, memberName)) {
      return;
    }

    const declaring = findDeclaringInheritedMember(targetInterface, memberName);
    /* v8 ignore start -- declaring is always found for an inherited member @preserve */
    if (!declaring) {
      removeAllExtends(targetInterface);
      this.members.reconcileMembers(targetInterface, sourceInterface);

      return;
    }
    /* v8 ignore stop -- @preserve */

    const sourceBaseInterface = sourceInterface.getSourceFile().getInterface(declaring.baseInterface.getName());

    // Synthetic base (only present in the target): reconcile the base member from
    // every derived source. This always reports a change, removing the member when
    // the sources disagree, otherwise correcting it in place.
    if (!sourceBaseInterface) {
      const baseMemberRemoved = this.reconcileSyntheticBaseMemberFromDerivedSources(targetInterface, sourceInterface, memberName);
      if (baseMemberRemoved) {
        this.recompareSyntheticBaseDerivedInterfaces(declaring.baseInterface, sourceInterface);
      }

      return;
    }

    // The shared base exists in the source too, so drop the heritage and inline the
    // members directly.
    removeAllExtends(targetInterface);
    this.members.reconcileMembers(targetInterface, sourceInterface);
  }

  public reconcileExtraInheritedMember(targetInterface: InterfaceDeclaration, sourceInterface: InterfaceDeclaration, memberName: string): void {
    const declaring = findDeclaringInheritedMember(targetInterface, memberName);
    /* v8 ignore next -- declaring is always found for an inherited member @preserve */
    if (!declaring) {
      return;
    }

    const sourceBaseInterface = sourceInterface.getSourceFile().getInterface(declaring.baseInterface.getName());
    if (sourceBaseInterface) {
      removeAllExtends(targetInterface);
      this.members.reconcileMembers(targetInterface, sourceInterface);

      return;
    }

    // Synthetic base: an extra inherited member never exists in the sources, so the
    // base member is always removed and the derived interfaces are re-compared.
    this.reconcileSyntheticBaseMemberFromDerivedSources(targetInterface, sourceInterface, memberName);
    this.recompareSyntheticBaseDerivedInterfaces(declaring.baseInterface, sourceInterface);
  }

  private findTargetInterfacesExtending(baseName: string): InterfaceDeclaration[] {
    return this.session.targetFile.getInterfaces().filter((i) => i.getExtends().some((ext) => ext.getExpression().getText() === baseName));
  }

  private getSourceDerivedInterfacesForSyntheticBase(
    baseInterface: InterfaceDeclaration,
    sourceDerived: InterfaceDeclaration,
  ): InterfaceDeclaration[] {
    const derivedTargets = this.findTargetInterfacesExtending(baseInterface.getName());

    const sourceFile = sourceDerived.getSourceFile();
    const derivedSources = derivedTargets
      .map((t) => sourceFile.getInterface(t.getName()))
      .filter((i): i is InterfaceDeclaration => i !== undefined);

    /* v8 ignore next -- the derived target being compared always has a same-named source @preserve */
    return derivedSources.length > 0 ? derivedSources : [sourceDerived];
  }

  /** @returns true if the base member was removed */
  private reconcileSyntheticBasePropertyMember(baseMember: PropertySignature, sourceMembers: PropertySignature[]): boolean {
    const widest = findWidestAgreeingSource(sourceMembers);
    if (!widest) {
      baseMember.remove();

      return true;
    }

    this.members.reconcileMember(baseMember, widest, false);

    return false;
  }

  /** @returns true if the base member was removed */
  private reconcileSyntheticBaseMethodMember(baseMember: MethodSignature, sourceMembers: MethodSignature[]): boolean {
    const first = sourceMembers[0];
    for (const other of sourceMembers.slice(1)) {
      if (other.getText() !== first.getText()) {
        baseMember.remove();

        return true;
      }
    }

    this.members.reconcileMember(baseMember, first, false);

    return false;
  }

  /**
   * Reconciles a synthetic base member (base only present in the target) using every
   * derived source. Callers only invoke this when the source has no matching base.
   * @returns true if the base member was removed
   */
  private reconcileSyntheticBaseMemberFromDerivedSources(
    targetDerived: InterfaceDeclaration,
    sourceDerived: InterfaceDeclaration,
    memberName: string,
  ): boolean {
    const declaring = findDeclaringInheritedMember(targetDerived, memberName);
    /* v8 ignore next -- declaring is always found for an inherited member @preserve */
    if (!declaring) {
      return false;
    }

    const { baseInterface, baseMember } = declaring;
    const sourceDerivedInterfaces = this.getSourceDerivedInterfacesForSyntheticBase(baseInterface, sourceDerived);
    const baseMemberKind = baseMember.getKind();
    const agreeingSourceMembers = collectAgreeingSourceMembers(sourceDerivedInterfaces, memberName, baseMemberKind);

    if (!agreeingSourceMembers) {
      baseMember.remove();

      return true;
    }

    // collectAgreeingSourceMembers guarantees every member shares baseMember's kind
    if (baseMember instanceof PropertySignature) {
      return this.reconcileSyntheticBasePropertyMember(baseMember, agreeingSourceMembers as PropertySignature[]);
    }

    return this.reconcileSyntheticBaseMethodMember(baseMember, agreeingSourceMembers as MethodSignature[]);
  }

  private recompareSyntheticBaseDerivedInterfaces(baseInterface: InterfaceDeclaration, sourceDerived: InterfaceDeclaration): void {
    const sourceFile = sourceDerived.getSourceFile();
    const baseName = baseInterface.getName();
    const targetDerivedInterfaces = this.findTargetInterfacesExtending(baseName);

    if (baseInterface.getMembers().length === 0) {
      for (const targetDerivedInterface of targetDerivedInterfaces) {
        targetDerivedInterface.getExtends().forEach((ext) => {
          if (ext.getExpression().getText() === baseName) {
            targetDerivedInterface.removeExtends(ext);
          }
        });
      }
    }

    for (const targetDerivedInterface of targetDerivedInterfaces) {
      const sourceDerivedInterface = sourceFile.getInterface(targetDerivedInterface.getName());
      if (!sourceDerivedInterface) {
        continue;
      }

      if (this.members.reconcileMembers(targetDerivedInterface, sourceDerivedInterface)) {
        orderMembers(targetDerivedInterface);
      }
    }
  }

  private reconcileNonSyntheticBaseMember(targetDerived: InterfaceDeclaration, sourceDerived: InterfaceDeclaration, memberName: string): boolean {
    const targetDeclaring = findDeclaringInheritedMember(targetDerived, memberName);
    const sourceDeclaring = findDeclaringInheritedMember(sourceDerived, memberName);

    if (!targetDeclaring || !sourceDeclaring) {
      return false;
    }

    const { baseMember: targetBaseMember } = targetDeclaring;
    const { baseMember: sourceBaseMember } = sourceDeclaring;

    /* v8 ignore next -- only reachable when the source is invalid TypeScript (a derived property overriding a base method) @preserve */
    if (targetBaseMember.getKind() !== sourceBaseMember.getKind()) {
      targetBaseMember.remove();

      return true;
    }

    // The base member kind always matches the (same-kind) derived member that triggered this
    this.members.reconcileMember(targetBaseMember, sourceBaseMember, false);

    return true;
  }
}

function findDeclaringInheritedMember(
  targetInterface: InterfaceDeclaration,
  memberName: string,
): { baseInterface: InterfaceDeclaration; baseMember: PropertySignature | MethodSignature } | undefined {
  for (const ext of targetInterface.getExtends()) {
    const def = (ext.getExpression() as Identifier).getDefinitionNodes().at(0);
    if (def === undefined || !Node.isInterfaceDeclaration(def)) {
      continue;
    }

    const directMember = (def.getMembers() as (PropertySignature | MethodSignature)[]).find((m) => m.getName() === memberName);

    if (directMember) {
      return { baseInterface: def, baseMember: directMember };
    }

    const deepMember = findDeclaringInheritedMember(def, memberName);
    if (deepMember) {
      return deepMember;
    }
  }

  return undefined;
}

/**
 * Returns the source member whose union members contain every other source's members (the widest type in a subset chain),
 * or undefined when the sources don't form a chain or their modifiers differ. Never mutates.
 */
function findWidestAgreeingSource(sourceMembers: PropertySignature[]): PropertySignature | undefined {
  const first = sourceMembers[0];
  if (sourceMembers.some((member) => member.getTypeNode() === undefined)) {
    return undefined;
  }

  if (sourceMembers.some((member) => member.hasQuestionToken() !== first.hasQuestionToken() || member.isReadonly() !== first.isReadonly())) {
    return undefined;
  }

  const memberSets = sourceMembers.map((member) => {
    const typeNode = member.getTypeNodeOrThrow();

    return new Set(Node.isUnionTypeNode(typeNode) ? typeNode.getTypeNodes().map((node) => getTypeText(node)) : [getTypeText(typeNode)]);
  });

  return sourceMembers.find((_member, candidateIndex) =>
    memberSets.every((otherSet) => [...otherSet].every((text) => memberSets[candidateIndex].has(text))));
}

function removeAllExtends(targetInterface: InterfaceDeclaration): void {
  targetInterface.getExtends().forEach((ext) => targetInterface.removeExtends(ext));
}

function collectAgreeingSourceMembers(
  sourceDerivedInterfaces: InterfaceDeclaration[],
  memberName: string,
  baseMemberKind: SyntaxKind,
): (PropertySignature | MethodSignature)[] | undefined {
  const agreeingSourceMembers: (PropertySignature | MethodSignature)[] = [];

  for (const srcIface of sourceDerivedInterfaces) {
    const srcMember = getInterfaceMembers(srcIface).find((m) => m.getName() === memberName);
    if (srcMember?.getKind() !== baseMemberKind) {
      return undefined;
    }
    agreeingSourceMembers.push(srcMember);
  }

  return agreeingSourceMembers;
}
