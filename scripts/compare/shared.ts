import {
  Identifier,
  ImportSpecifier,
  InterfaceDeclaration,
  JSDocableNode,
  MethodSignature,
  Node,
  PropertySignature,
  SourceFile,
  SyntaxKind,
  Type,
  TypeLiteralNode,
  TypeNode,
} from 'ts-morph';

export const CustomJsDocTags = {
  originalName: 'compareOriginalName',
  currentValue: 'currentValue',
  ignore: 'ignore',
  dontSort: 'dontSort',
  ignoreFormatting: 'ignoreFormatting',
  exported: 'exported',
  native: 'native',
};

/**
 * Extracts a specific tag value from JSDoc comments
 * @param prop The property to extract JSDoc from
 * @param tagName The name of the tag to extract
 * @returns The value of the tag or undefined if not found
 */
export function getJsDocTagValues(prop: JSDocableNode, tagName: string): string[] {
  const values: string[] = [];
  for (const doc of prop.getJsDocs()) {
    for (const tag of doc.getTags()) {
      if (tag.getTagName() === tagName) {
        values.push(tag.getCommentText() ?? '');
      }
    }
  }

  return values;
}

export function hasJsDocTag(node: JSDocableNode, tagName: string): boolean {
  return getJsDocTagValues(node, tagName).length > 0;
}

/**
 * Checks if a property type is imported
 */
export function isImportedType(sourceFile: SourceFile, type: Node | Type | TypeNode): boolean {
  const text = getIdentifierName(type);

  return sourceFile
    .getImportDeclarations()
    .some((importDecl) => importDecl.getNamedImports().some((importSpec) => importSpec.getName() === text));
}

export function getInterfaceMembers(
  interfaceDeclaration: InterfaceDeclaration | TypeLiteralNode,
): (PropertySignature | MethodSignature)[] {
  const members = interfaceDeclaration.getMembers() as (PropertySignature | MethodSignature)[];

  if (interfaceDeclaration instanceof InterfaceDeclaration) {
    interfaceDeclaration.getExtends().forEach((ext) => {
      const extendedInterface = (ext.getExpression() as Identifier).getDefinitionNodes()[0] as
        | InterfaceDeclaration
        | ImportSpecifier
        | undefined;
      if (
        extendedInterface
        && extendedInterface instanceof InterfaceDeclaration
        && !isImportedType(interfaceDeclaration.getSourceFile(), extendedInterface)
      ) {
        // Get extended members and remove duplicates
        const extendedMembers = getInterfaceMembers(extendedInterface).filter(
          (member) => !members.some((m) => m.getName() === member.getName()),
        );
        members.push(...extendedMembers);
      }
    });
  }

  return members;
}

export function getIdentifierName(node: Node | Type | TypeNode): string {
  let text = node.getText();

  if (node instanceof TypeNode && Node.isTypeReference(node)) {
    text = node.getTypeName().getText();
  }
  if (node instanceof Type) {
    const aliasName = node.getAliasSymbol()?.getName();
    if (aliasName !== undefined) {
      text = aliasName;
    }
  }

  return text;
}

export function updatePropertyModifiers(target: Node, source: Node): void {
  /* v8 ignore else -- callers always pass question-tokenable nodes @preserve */
  if (Node.isQuestionTokenable(target) && Node.isQuestionTokenable(source)) {
    // Update optional status if different
    if (!target.hasQuestionToken() && source.hasQuestionToken()) {
      target.setHasQuestionToken(source.hasQuestionToken());
    }
  }

  if (Node.isReadonlyable(target) && Node.isReadonlyable(source)) {
    // Update readonly status if different
    if (target.isReadonly() !== source.isReadonly()) {
      target.setIsReadonly(source.isReadonly());
    }
  }
}

export function getInterfaceDeclaration(type: TypeNode | Type): InterfaceDeclaration | undefined {
  if (type instanceof TypeNode) {
    type = type.getType();
  }

  const symbol = type.getSymbol();
  if (!symbol) return undefined;

  return symbol.getDeclarations().find((d) => d.isKind(SyntaxKind.InterfaceDeclaration));
}

export function getTypeText(typeNode: TypeNode): string {
  let text = typeNode.getText();
  if (Node.isIndexedAccessTypeNode(typeNode)) {
    text = typeNode.getType().getText();
  }

  return text.replace(/import\(".+?\)\./, '');
}
