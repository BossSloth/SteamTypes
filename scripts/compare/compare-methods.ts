import { MethodSignature, Node, ParameterDeclaration, SyntaxKind } from 'ts-morph';
import { handleInterfaceTypeReferences } from './handle-interfaces';
import { currentTargetSourceFile, isImportedType } from './shared';

/**
 * Compares and corrects method types
 * @param targetMethod The method to be edited
 * @param sourceMethod The method to use as the source of truth
 */
export function compareAndCorrectMethodTypes(targetMethod: MethodSignature, sourceMethod: MethodSignature): void {
  // Check if the method has a question token (optional method)
  if (sourceMethod.hasQuestionToken() !== targetMethod.hasQuestionToken()) {
    targetMethod.setHasQuestionToken(sourceMethod.hasQuestionToken());
  }

  // If it has the @native jsDoc don't compare
  if (sourceMethod.getJsDocs().some(doc => doc.getTags().some(tag => tag.getTagName() === 'native'))) {
    return;
  }

  compareReturnType(targetMethod, sourceMethod);

  compareParameters(targetMethod, sourceMethod);
}

function compareReturnType(targetMethod: MethodSignature, sourceMethod: MethodSignature): void {
  // Compare return types
  const targetReturnTypeNode = targetMethod.getReturnTypeNode();
  const sourceReturnTypeNode = sourceMethod.getReturnTypeNode();

  if (sourceReturnTypeNode?.getType().isNever() === true || (Node.isArrayTypeNode(sourceReturnTypeNode) && sourceReturnTypeNode.getElementTypeNode().getType().isNever())) {
    return;
  }

  if (isImportedType(currentTargetSourceFile, targetMethod.getReturnType())) {
    return;
  }

  // If source has a return type but target doesn't, update target
  if (sourceReturnTypeNode && !targetReturnTypeNode) {
    targetMethod.setReturnType(sourceReturnTypeNode.getText());
  } else if (targetReturnTypeNode && sourceReturnTypeNode) {
    handleInterfaceTypeReferences(targetReturnTypeNode, sourceReturnTypeNode);
    // Both have return types, check if they're different
    let targetReturnTypeText = targetReturnTypeNode.getText();
    if (targetReturnTypeNode.isKind(SyntaxKind.IndexedAccessType)) {
      targetReturnTypeText = targetReturnTypeNode.getType().getText();
    }

    const sourceReturnTypeText = sourceReturnTypeNode.getText();

    if (!sourceReturnTypeText.includes('unknown') && targetReturnTypeText !== sourceReturnTypeText) {
      // Update the return type
      targetMethod.setReturnType(sourceReturnTypeText);
    }
  }
}

function compareParameters(targetMethod: MethodSignature, sourceMethod: MethodSignature): void {
  // Compare parameters
  const targetParams = targetMethod.getParameters();
  const sourceParams = sourceMethod.getParameters();

  if (targetParams[0]?.isRestParameter() && Node.isTypeReference(targetParams[0]?.getTypeNode())) {
    // If we are using a reference type as a array deconstruction rest type skip
    // Example test case: 'external type accessed arguments'
    return;
  }

  for (let i = 0; i < Math.max(sourceParams.length, targetParams.length); i++) {
    const sourceParam = sourceParams[i];
    const targetParam = targetParams[i];

    compareParameter(targetMethod, targetParam, sourceParam);
  }
}

function compareParameter(targetMethod: MethodSignature, targetParam?: ParameterDeclaration, sourceParam?: ParameterDeclaration): void {
  const sourceTypeNode = sourceParam?.getTypeNode();
  const targetTypeNode = targetParam?.getTypeNode();

  if (targetParam === undefined && sourceParam !== undefined) {
    targetMethod.addParameter(sourceParam.getStructure());

    return;
  }

  if (targetParam !== undefined && sourceParam === undefined) {
    targetParam.remove();

    return;
  }

  if (sourceParam === undefined || targetParam === undefined) {
    return;
  }

  if (sourceTypeNode && sourceTypeNode.getText() !== 'unknown' && targetTypeNode && targetTypeNode.getText() !== sourceTypeNode.getText()) {
    targetParam.setType(sourceTypeNode.getText());
  }

  // Update question token
  if (sourceParam.hasQuestionToken() && !targetParam.hasQuestionToken()) {
    targetParam.setHasQuestionToken(sourceParam.hasQuestionToken());
  }

  // Update rest parameter
  if (sourceParam.isRestParameter() && !targetParam.isRestParameter()) {
    targetParam.setIsRestParameter(sourceParam.isRestParameter());
  }
}
