import { MethodSignature } from 'ts-morph';

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

  // If source has a return type but target doesn't, update target
  if (sourceReturnTypeNode && !targetReturnTypeNode) {
    targetMethod.setReturnType(sourceReturnTypeNode.getText());
  } else if (targetReturnTypeNode && sourceReturnTypeNode) {
    // Both have return types, check if they're different
    const targetReturnTypeText = targetReturnTypeNode.getText();
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

  // Different number of parameters - replace all
  if (targetParams.length !== sourceParams.length) {
    // Remove all existing parameters
    targetParams.forEach((param) => param.remove());

    // Add all parameters from source
    targetMethod.addParameters(sourceParams.map(param => param.getStructure()));
  } else {
    // Same number of parameters - update by index
    for (let i = 0; i < sourceParams.length; i++) {
      const sourceParam = sourceParams[i];
      const targetParam = targetParams[i];
      
      // Update type if needed
      const sourceTypeNode = sourceParam.getTypeNode();
      const targetTypeNode = targetParam.getTypeNode();
      
      if (sourceTypeNode && sourceTypeNode.getText() !== 'unknown' && (!targetTypeNode || targetTypeNode.getText() !== sourceTypeNode.getText())) {
        targetParam.setType(sourceTypeNode.getText());
      }
      
      // Update question token
      if (sourceParam.hasQuestionToken() !== targetParam.hasQuestionToken()) {
        targetParam.setHasQuestionToken(sourceParam.hasQuestionToken());
      }
      
      // Update rest parameter
      if (sourceParam.isRestParameter() !== targetParam.isRestParameter()) {
        targetParam.setIsRestParameter(sourceParam.isRestParameter());
      }
    }
  }
}
