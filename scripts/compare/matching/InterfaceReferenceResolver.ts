import { InterfaceDeclaration, SyntaxKind, TypeNode, TypeReferenceNode } from 'ts-morph';
import { orderMembers } from '../member-ordering';
import type { ComparisonSession } from '../session/ComparisonSession';
import { getIdentifierName, getInterfaceDeclaration, isImportedType } from '../shared';
import type { InterfaceMatcher } from './InterfaceMatcher';
import { canMergeIntoTarget, mergeSourcesIntoTarget } from './manual-merge';

/**
 * Pairs source interfaces with target interfaces and inserts the ones with no match. Mutates the source AST
 * (renames to matched target names, removes declarations that stand for imported target types, folds manual merges)
 * and the target AST (adds missing interfaces, ordering their members once). Enqueues matched pairs on the session.
 */
export class InterfaceReferenceResolver {
  private readonly session: ComparisonSession;
  private readonly matcher: InterfaceMatcher;

  public constructor(session: ComparisonSession, matcher: InterfaceMatcher) {
    this.session = session;
    this.matcher = matcher;
  }

  /**
   * Handles interface type references by adding them to the processing queue
   */
  public resolveTypeReferences(targetTypeNode: TypeNode, sourceTypeNode: TypeNode): void {
    // Extract all interface references from both types
    const targetInterfaces = this.extractInterfaceReferences(targetTypeNode);
    let sourceInterfaces = this.extractInterfaceReferences(sourceTypeNode);

    // Check if target has a single interface and source has multiple (manual merge case)
    if (targetInterfaces.length === 1 && sourceInterfaces.length > 1) {
      const targetInterfaceDeclaration = getInterfaceDeclaration(targetInterfaces[0]);
      if (targetInterfaceDeclaration && canMergeIntoTarget(sourceInterfaces, targetInterfaceDeclaration)) {
        mergeSourcesIntoTarget(sourceInterfaces, targetInterfaceDeclaration, this.session);

        return;
      }
    }

    // Rename and remove any imported interfaces
    for (let i = 0; i < sourceInterfaces.length; i++) {
      const sourceInterface = sourceInterfaces[i];
      const targetInterface = targetInterfaces[i] as TypeReferenceNode | undefined;

      if (targetInterface === undefined) {
        continue;
      }

      if (
        isImportedType(this.session.targetFile, targetInterface.getType())
        && !isImportedType(sourceInterface.getSourceFile(), sourceInterface.getType())
      ) {
        const sourceInterfaceDeclaration = getInterfaceDeclaration(sourceInterface);
        if (!sourceInterfaceDeclaration) {
          // We get here if the interface was for example already renamed and now doesn't exist anymore, so we can ignore this
          continue;
        }

        sourceInterfaceDeclaration.rename(getIdentifierName(targetInterface));
        sourceInterfaceDeclaration.remove();
      }
    }
    sourceInterfaces = this.extractInterfaceReferences(sourceTypeNode);

    // For each source interface, find a matching target interface and update it
    for (const sourceInterface of sourceInterfaces) {
      const sourceInterfaceDeclaration = getInterfaceDeclaration(sourceInterface);
      if (!sourceInterfaceDeclaration) {
        continue;
      }
      const sourceInterfaceName = sourceInterface.getTypeName().getText();

      // Try to find a matching interface by name first
      const matchingTargetInterface = targetInterfaces.find((i) => i.getTypeName().getText() === sourceInterfaceName);
      let targetInterfaceDeclaration: InterfaceDeclaration | undefined;

      // If no exact name match, try to find by structure similarity
      if (!matchingTargetInterface) {
        targetInterfaceDeclaration = this.matcher.findSimilarInterface(sourceInterfaceDeclaration);

        // Never collapse an extra source derived interface into a target base.
        if (targetInterfaceDeclaration && this.matcher.isDerivedToBaseMismatch(sourceInterfaceDeclaration, targetInterfaceDeclaration)) {
          targetInterfaceDeclaration = undefined;
        }
      } else {
        targetInterfaceDeclaration = getInterfaceDeclaration(matchingTargetInterface);
      }

      if (targetInterfaceDeclaration) {
        sourceInterfaceDeclaration.rename(targetInterfaceDeclaration.getName());
        this.session.enqueue(targetInterfaceDeclaration, sourceInterfaceDeclaration);
      } else {
        // If no matching interface found, add the source interface to the target
        this.addMissingInterface(sourceInterface);
      }
    }
  }

  /**
   * Extracts all interface references from a type, including those in arrays, unions, etc.
   */
  private extractInterfaceReferences(type: TypeNode): TypeReferenceNode[] {
    const interfaces: TypeReferenceNode[] = [];

    if (type.isKind(SyntaxKind.TypeReference)) {
      interfaces.push(type);
    }

    interfaces.push(...type.getDescendantsOfKind(SyntaxKind.TypeReference));

    return interfaces.filter(
      (interf) =>
        interf
          .getType()
          .getSymbol()
          ?.getDeclarations()
          .some((d) => d.isKind(SyntaxKind.InterfaceDeclaration)) === true || isImportedType(this.session.targetFile, interf),
    );
  }

  /**
   * Repoints a freshly added interface's `extends` clauses at the matching target base.
   * The structure is copied verbatim from the source, so a renamed base (e.g. matched via
   * `@compareOriginalName`) would otherwise leave a dangling reference to the source's name.
   */
  private remapNewInterfaceExtends(newInterface: InterfaceDeclaration, sourceInterface: InterfaceDeclaration): void {
    const sourceExtends = sourceInterface.getExtends();
    newInterface.getExtends().forEach((ext) => newInterface.removeExtends(ext));

    for (const sourceExt of sourceExtends) {
      const sourceExtName = sourceExt.getExpression().getText();

      // Only remap when the source's base name is missing from the target.
      const { targetName } = this.matcher.resolveBaseName(sourceExt, sourceInterface.getSourceFile());
      newInterface.addExtends(sourceExt.getText().replace(sourceExtName, targetName));
    }
  }

  /**
   * Compares and corrects heritage clauses (extends) between two interfaces
   * @param targetInterface The interface to be edited
   * @param sourceInterface The interface to use as the source of truth
   */
  public syncHeritage(targetInterface: InterfaceDeclaration, sourceInterface: InterfaceDeclaration): void {
    const targetExtends = targetInterface.getExtends();
    const sourceExtends = sourceInterface.getExtends();
    const targetExtendsSet = new Set(targetExtends.map((ext) => ext.getText()));

    // Process extended interfaces and keep target heritage in sync
    for (const sourceExt of sourceExtends) {
      const rawSourceExtText = sourceExt.getText();
      const sourceExtName = sourceExt.getExpression().getText();

      const { targetName, targetBase, sourceBase, matchedBySimilarity } = this.matcher.resolveBaseName(
        sourceExt,
        sourceInterface.getSourceFile(),
      );

      // Rename the source base interface so future references use the resolved name
      if (matchedBySimilarity && sourceBase) {
        sourceBase.rename(targetName);
      }

      // Preserve any generic arguments on the extends clause while updating the base name
      const extendsText = rawSourceExtText.replace(sourceExtName, targetName);

      // Add missing extends clauses to target using the resolved name
      if (!targetExtendsSet.has(extendsText)) {
        targetInterface.addExtends(extendsText);
        targetExtendsSet.add(extendsText);
      }

      // If both interfaces exist, add them to the queue for processing
      if (sourceBase && targetBase) {
        this.session.enqueue(targetBase, sourceBase);
      }
    }
  }

  /**
   * Adds a missing interface to the target file
   */
  public addMissingInterface(type: TypeNode): void {
    const typeReferences = type.getDescendantsOfKind(SyntaxKind.TypeReference);
    if (type.isKind(SyntaxKind.TypeReference)) {
      typeReferences.push(type);
    }

    for (const typeReference of typeReferences) {
      const interfaceDeclaration = getInterfaceDeclaration(typeReference);
      if (!interfaceDeclaration) return;

      const interfaceName = interfaceDeclaration.getName();
      const existingInterface = this.session.targetFile.getInterface(interfaceName);
      if (existingInterface) {
        return;
      }

      const similarInterface = this.matcher.findSimilarInterface(interfaceDeclaration);
      // A derived interface always matches its own base via structure similarity, so ignore
      // such matches here and add the interface instead of treating it as a base rename.
      if (similarInterface && !this.matcher.isDerivedToBaseMismatch(interfaceDeclaration, similarInterface)) {
        // If the source file also contains an interface with the similar's name,
        // both coexist in source -> this is a genuinely new interface, not a rename. Add it.
        const sourceHasSimilarByName = interfaceDeclaration.getSourceFile().getInterface(similarInterface.getName()) !== undefined;
        if (!sourceHasSimilarByName) {
          return;
        }
      }

      // Add the interface to the target source file
      const newInterface = this.session.targetFile.addInterface(interfaceDeclaration.getStructure());
      this.remapNewInterfaceExtends(newInterface, interfaceDeclaration);
      orderMembers(newInterface);

      // Recursively process referenced interfaces
      interfaceDeclaration.forEachDescendant((child) => {
        if (child.isKind(SyntaxKind.TypeReference)) {
          this.addMissingInterface(child);
        }
      });
    }
  }
}
