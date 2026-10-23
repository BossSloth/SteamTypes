import { ExpressionWithTypeArguments, InterfaceDeclaration, SourceFile } from 'ts-morph';
import type { ComparisonSession } from '../session/ComparisonSession';
import { CustomJsDocTags, getInterfaceDeclaration, getInterfaceMembers, getJsDocTagValues } from '../shared';

export const REQUIRED_OVERLAP = 0.65;

export interface ResolvedBaseName {
  targetName: string;
  targetBase?: InterfaceDeclaration;
  sourceBase?: InterfaceDeclaration;
  matchedBySimilarity: boolean;
}

/**
 * Read-only matching of source interfaces against the session's starting target interfaces. Never mutates an AST.
 */
export class InterfaceMatcher {
  private readonly session: ComparisonSession;

  public constructor(session: ComparisonSession) {
    this.session = session;
  }

  /**
   * Finds a similar interface based on property structure
   * Uses a similarity score to determine the best match
   */
  public findSimilarInterface(sourceInterface: InterfaceDeclaration): InterfaceDeclaration | undefined {
    const targetInterfaces = this.session.startingInterfaces.filter((i) => !i.wasForgotten());
    const sourceInterfaceName = sourceInterface.getName();

    // Check for @compareOriginalName match first
    for (const targetInterface of targetInterfaces) {
      const originalNames = getJsDocTagValues(targetInterface, CustomJsDocTags.originalName);
      if (originalNames.includes(sourceInterfaceName)) {
        return targetInterface;
      }
    }

    let bestMatch: InterfaceDeclaration | undefined;
    let highestScore = 0;

    const sourceNames = getInterfacePropertyNames(sourceInterface);

    for (const targetInterface of targetInterfaces) {
      if (this.session.isPairedByRename(targetInterface)) {
        continue;
      }

      const targetNames = getInterfacePropertyNames(targetInterface);

      // Calculate similarity score (0-1)
      const score = calculateSimilarityScore(sourceNames, targetNames);

      // If score is above threshold (e.g., 0.65 for 65% similarity)
      if (score >= REQUIRED_OVERLAP && score > highestScore) {
        highestScore = score;
        bestMatch = targetInterface;
      }
    }

    return bestMatch;
  }

  /**
   * A derived source interface (one that extends something) shares all of its base's
   * members, so structure similarity will wrongly match it to a target base interface.
   * Returns true when the matched target is itself a base (extended by other target
   * interfaces), meaning the match should be rejected so the source interface is added
   * on its own instead of being collapsed into the shared base.
   */
  public isDerivedToBaseMismatch(sourceInterface: InterfaceDeclaration, matchedTarget: InterfaceDeclaration): boolean {
    if (sourceInterface.getExtends().length === 0) {
      return false;
    }

    return this.session.targetFile
      .getInterfaces()
      .some(
        (other) =>
          other !== matchedTarget
          && other.getExtends().some((ext) => getInterfaceDeclaration(ext.getExpression().getType()) === matchedTarget),
      );
  }

  /**
   * Fallback for a source interface that matched nothing by name or similarity: pairs it with one of the target
   * interfaces referenced from the same type (e.g. the same property) that shares the most property names.
   */
  public findRenamedInterface(
    sourceInterface: InterfaceDeclaration,
    candidates: InterfaceDeclaration[],
  ): InterfaceDeclaration | undefined {
    const sourceNames = getInterfacePropertyNames(sourceInterface);
    let bestMatch: InterfaceDeclaration | undefined;
    let highestScore = 0;

    for (const candidate of candidates) {
      if (
        candidate.wasForgotten()
        || this.session.isClaimed(candidate)
        || !this.session.startingInterfaces.includes(candidate)
        || sourceInterface.getSourceFile().getInterface(candidate.getName()) !== undefined
        || this.isDerivedToBaseMismatch(sourceInterface, candidate)
      ) {
        continue;
      }

      const score = calculateSimilarityScore(sourceNames, getInterfacePropertyNames(candidate));
      if (score > highestScore) {
        highestScore = score;
        bestMatch = candidate;
      }
    }

    return bestMatch;
  }

  public resolveBaseName(sourceExt: ExpressionWithTypeArguments, sourceFile: SourceFile): ResolvedBaseName {
    const sourceExtName = sourceExt.getExpression().getText();

    // Find the extended interface in the source file
    const sourceBase = sourceFile.getInterface(sourceExtName);

    // Find the corresponding interface in the target file by name
    const targetBase = this.session.targetFile.getInterface(sourceExtName);

    // If the base interface name does not exist in the target, try to find a similar one
    const similarTarget =
      targetBase === undefined && sourceBase !== undefined ? this.findSimilarInterface(sourceBase) : undefined;

    if (similarTarget === undefined) {
      return { targetName: sourceExtName, targetBase, sourceBase, matchedBySimilarity: false };
    }

    return { targetName: similarTarget.getName(), targetBase: similarTarget, sourceBase, matchedBySimilarity: true };
  }
}

/**
 * Gets the names of all properties of an interface type
 */
function getInterfacePropertyNames(interfaceDeclaration: InterfaceDeclaration): string[] {
  return getInterfaceMembers(interfaceDeclaration).map((property) => property.getName());
}

/**
 * Calculates a similarity score between two sets of properties
 * Returns a value between 0 (no similarity) and 1 (identical)
 */
function calculateSimilarityScore(sourceNames: string[], targetNames: string[]): number {
  if (sourceNames.length === 0 && targetNames.length === 0) return 1;
  if (sourceNames.length === 0 || targetNames.length === 0) return 0;

  // Count matching properties
  const targetNameSet = new Set(targetNames);
  const matchingProps = sourceNames.filter((name) => targetNameSet.has(name)).length;

  // Calculate Jaccard similarity: intersection / union
  const totalUniqueProps = new Set([...sourceNames, ...targetNames]).size;

  return matchingProps / totalUniqueProps;
}
