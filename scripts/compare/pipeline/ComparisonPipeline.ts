import { InterfaceDeclaration, SourceFile, SyntaxKind } from 'ts-morph';
import { InterfaceMatcher } from '../matching/InterfaceMatcher';
import { InterfaceReferenceResolver } from '../matching/InterfaceReferenceResolver';
import { orderMembers } from '../member-ordering';
import { renderDiff } from '../output/diff-output';
import { MemberReconciler } from '../reconcile/MemberReconciler';
import type { ComparisonSession } from '../session/ComparisonSession';
import { CustomJsDocTags, hasJsDocTag } from '../shared';

/**
 * Runs one comparison: looks up the root pair, drains the session queue through member and heritage reconciliation,
 * removes unused interfaces and renders the diff. Mutates the target file through its collaborators.
 */
export class ComparisonPipeline {
  private readonly session: ComparisonSession;
  private readonly sourceFile: SourceFile;
  private readonly interfaceName: string;
  private readonly filePath: string;
  private readonly references: InterfaceReferenceResolver;
  private readonly members: MemberReconciler;

  public constructor(session: ComparisonSession, sourceFile: SourceFile, interfaceName: string, filePath: string) {
    this.session = session;
    this.sourceFile = sourceFile;
    this.interfaceName = interfaceName;
    this.filePath = filePath;
    const matcher = new InterfaceMatcher(session);
    this.references = new InterfaceReferenceResolver(session, matcher);
    this.members = new MemberReconciler(session, this.references);
  }

  /**
   * @returns A diff of all changes made to the entire target source file, or null when nothing changed
   */
  public run(): string | null {
    // Store the original text of the entire source file for diff generation
    const originalSourceText = this.session.targetFile.getFullText();

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

    this.removeUnusedInterfaces(targetInterface);

    return renderDiff(this.session.targetFile, originalSourceText, this.filePath);
  }

  private removeUnusedInterfaces(rootInterface: InterfaceDeclaration): void {
    const targetSourceFile = this.session.targetFile;
    const targetInterfaces = targetSourceFile.getInterfaces().slice(1);
    const typeReferences = targetSourceFile.getDescendantsOfKind(SyntaxKind.TypeReference);
    const expressionWithTypeArguments = targetSourceFile.getDescendantsOfKind(SyntaxKind.ExpressionWithTypeArguments);
    const typeAliases = targetSourceFile.getDescendantsOfKind(SyntaxKind.TypeAliasDeclaration);

    for (const targetInterface of targetInterfaces) {
      if (targetInterface === rootInterface) {
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
      const hasJsDocLink = targetSourceFile.getText().includes(`@link ${targetInterface.getName()}`);
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
}
