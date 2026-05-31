import { MethodSignature, Node, ParameterDeclaration, SyntaxKind } from 'ts-morph';
import { CustomJsDocTags, getJsDocTagValues, updatePropertyModifiers } from './shared';
import { compareTypes } from './type-comparator';

/**
 * Compares and corrects method types
 * @param targetMethod The method to be edited
 * @param sourceMethod The method to use as the source of truth
 * @param isFromExtendedInterface Whether the method is inherited from an extended interface
 *
 * @returns true if the method is from an extended interface and its signature needs to change
 */
export function compareAndCorrectMethodTypes(
  targetMethod: MethodSignature,
  sourceMethod: MethodSignature,
  isFromExtendedInterface = false,
): boolean {
  const ignore = getJsDocTagValues(targetMethod, CustomJsDocTags.ignore);

  if (ignore.length > 0) {
    return false;
  }

  if (!isFromExtendedInterface) {
    updatePropertyModifiers(targetMethod, sourceMethod);
  }

  // If it has the @native jsDoc don't compare
  if (sourceMethod.getJsDocs().some(doc => doc.getTags().some(tag => tag.getTagName() === 'native'))) {
    return false;
  }

  const returnTypeNeedsUpdate = compareReturnType(targetMethod, sourceMethod, isFromExtendedInterface);
  const parametersNeedUpdate = compareParameters(targetMethod, sourceMethod, isFromExtendedInterface);

  return returnTypeNeedsUpdate || parametersNeedUpdate;
}

function compareReturnType(targetMethod: MethodSignature, sourceMethod: MethodSignature, isFromExtendedInterface: boolean): boolean {
  // Compare return types
  const targetReturnTypeNode = targetMethod.getReturnTypeNode();
  const sourceReturnTypeNode = sourceMethod.getReturnTypeNode();

  const typesAreEqual = targetReturnTypeNode !== undefined && sourceReturnTypeNode !== undefined
    && compareTypes(targetReturnTypeNode, sourceReturnTypeNode);

  if (!typesAreEqual && sourceReturnTypeNode !== undefined) {
    if (isFromExtendedInterface) {
      return true;
    }
    targetMethod.setReturnType(sourceReturnTypeNode.getText());
  }

  return false;

  // if (sourceReturnTypeNode?.getType().isNever() === true || (Node.isArrayTypeNode(sourceReturnTypeNode) && sourceReturnTypeNode.getElementTypeNode().getType().isNever())) {
  //   return;
  // }

  // if (isImportedType(currentTargetSourceFile, targetMethod.getReturnType())) {
  //   return;
  // }

  // // If source has a return type but target doesn't, update target
  // if (sourceReturnTypeNode && !targetReturnTypeNode) {
  //   targetMethod.setReturnType(sourceReturnTypeNode.getText());
  // } else if (targetReturnTypeNode && sourceReturnTypeNode) {
  //   handleInterfaceTypeReferences(targetReturnTypeNode, sourceReturnTypeNode);
  //   // Both have return types, check if they're different
  //   let targetReturnTypeText = targetReturnTypeNode.getText();
  //   if (targetReturnTypeNode.isKind(SyntaxKind.IndexedAccessType)) {
  //     targetReturnTypeText = targetReturnTypeNode.getType().getText();
  //   }

  //   const sourceReturnTypeText = sourceReturnTypeNode.getText();

  //   if (!sourceReturnTypeText.includes('unknown') && targetReturnTypeText !== sourceReturnTypeText) {
  //     // Update the return type
  //     targetMethod.setReturnType(sourceReturnTypeText);
  //   }
  // }
}

function compareParameters(targetMethod: MethodSignature, sourceMethod: MethodSignature, isFromExtendedInterface: boolean): boolean {
  // Compare parameters
  const targetParams = targetMethod.getParameters();
  const sourceParams = sourceMethod.getParameters();

  if (targetParams[0]?.isRestParameter() && Node.isTypeReference(targetParams[0]?.getTypeNode())) {
    // If we are using a reference type as a array deconstruction rest type skip
    // Example test case: 'external type accessed arguments'
    return false;
  }

  // If sourceParams is just '...e: unknown[]' skip type check
  if (sourceParams.length === 1
    && sourceParams[0].isRestParameter()) {
    const sourceTypeNode = sourceParams[0].getTypeNode();
    if (sourceTypeNode?.isKind(SyntaxKind.ArrayType) === true && sourceTypeNode.getElementTypeNode().isKind(SyntaxKind.UnknownKeyword)) {
      return false;
    }
  }

  let needsUpdate = false;
  for (let i = 0; i < Math.max(sourceParams.length, targetParams.length); i++) {
    const sourceParam = sourceParams[i];
    const targetParam = targetParams[i];

    if (compareParameter(targetMethod, targetParam, sourceParam, isFromExtendedInterface)) {
      needsUpdate = true;
    }
  }

  return needsUpdate;
}

function compareParameter(
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

  /* v8 ignore next -- @preserve */
  if (sourceParam === undefined || targetParam === undefined) {
    return false;
  }

  const typesAreEqual = sourceTypeNode === undefined
    || (targetTypeNode !== undefined && compareTypes(targetTypeNode, sourceTypeNode));

  if (isFromExtendedInterface) {
    return !typesAreEqual;
  }

  updatePropertyModifiers(targetParam, sourceParam);

  if (!typesAreEqual) {
    targetParam.setType(sourceTypeNode.getText());
  }

  return false;
}
