import { SourceFile, SyntaxKind } from 'ts-morph';
import type { ComparisonSession } from '../session/ComparisonSession';
import { InterfaceMatcher } from '../matching/InterfaceMatcher';
import { InterfaceReferenceResolver } from '../matching/InterfaceReferenceResolver';
import { orderMembers } from '../member-ordering';
import { MemberReconciler } from '../reconcile/MemberReconciler';
import { CustomJsDocTags, hasJsDocTag } from '../shared';

/**
 * Runs one comparison: looks up the root pair and drains the session queue through member and
 * heritage reconciliation. Mutates the target file through its collaborators.
 */
export class ComparisonPipeline {
  private readonly session: ComparisonSession;
  private readonly sourceFile: SourceFile;
  private readonly interfaceName: string;
  private readonly references: InterfaceReferenceResolver;
  private readonly members: MemberReconciler;

  public constructor(session: ComparisonSession, sourceFile: SourceFile, interfaceName: string) {
    this.session = session;
    this.sourceFile = sourceFile;
    this.interfaceName = interfaceName;
    const matcher = new InterfaceMatcher(session);
    this.references = new InterfaceReferenceResolver(session, matcher);
    this.members = new MemberReconciler(session, this.references);
  }

  public run(): void {
    // Get the interfaces from both source files
    const targetInterface = this.session.targetFile.getInterface(this.interfaceName);
    const sourceInterface = this.sourceFile.getInterface(this.interfaceName);

    if (!targetInterface || !sourceInterface) {
      throw new Error(`Interface ${this.interfaceName} not found in one of the source files`);
    }

    this.session.enqueue(targetInterface, sourceInterface);

    // Process all interfaces in the queue
    for (let pair = this.session.dequeue(); pair !== undefined; pair = this.session.dequeue()) {
      const { targetInterface: pairTarget, sourceInterface: pairSource } = pair;

      // Compare and correct properties
      const propertiesChanged = this.members.reconcileMembers(pairTarget, pairSource);

      // Compare and correct heritage clauses (extends)
      this.references.syncHeritage(pairTarget, pairSource);

      if (propertiesChanged) {
        // Order members
        orderMembers(pairTarget);
      }
    }
  }
}

/**
 * Removes target interfaces that are no longer referenced by anything and are not comparison roots.
 * @param targetFile The mutated target source file
 * @param rootNames Names of every root interface compared against this file; these are always kept
 */
export function removeUnusedInterfaces(targetFile: SourceFile, rootNames: ReadonlySet<string>): void {
  const targetInterfaces = targetFile.getInterfaces().slice(1);
  const typeReferences = targetFile.getDescendantsOfKind(SyntaxKind.TypeReference);
  const expressionWithTypeArguments = targetFile.getDescendantsOfKind(SyntaxKind.ExpressionWithTypeArguments);
  const typeAliases = targetFile.getDescendantsOfKind(SyntaxKind.TypeAliasDeclaration);

  for (const targetInterface of targetInterfaces) {
    if (rootNames.has(targetInterface.getName())) {
      continue;
    }

    const hasTypeAliasWithName = typeAliases.some((dec) => !dec.wasForgotten() && dec.getName() === targetInterface.getName());

    const doesNotHaveJsDocExportTag = !hasJsDocTag(targetInterface, CustomJsDocTags.exported);
    const hasTypeReferenceWithName = typeReferences.some(
      (dec) => !dec.wasForgotten() && dec.getTypeName().getText() === targetInterface.getName(),
    );
    const hasExpressionWithTypeArgumentsWithName = expressionWithTypeArguments.some(
      (dec) => !dec.wasForgotten() && dec.getExpression().getText() === targetInterface.getName(),
    );
    const hasJsDocLink = targetFile.getText().includes(`@link ${targetInterface.getName()}`);
    const extendsJsPbMessage = targetInterface.getExtends().some((ext) => ext.getExpression().getText() === 'JsPbMessage');

    if (
      hasTypeAliasWithName
      || (doesNotHaveJsDocExportTag
        && !hasTypeReferenceWithName
        && !hasExpressionWithTypeArgumentsWithName
        && !hasJsDocLink
        && !extendsJsPbMessage)
    ) {
      targetInterface.remove();
    }
  }
}
