// Builds a nested object keyed by a numeric name (triggers `findProtobufClassInObject`),
// whose inner property has a getter that throws when accessed.

function buildThrowingInner(): unknown {
  const inner: Record<string, unknown> = { real: 1 };
  Object.defineProperty(inner, 'unstable', {
    get(): unknown { throw new Error('unstable getter'); },
    enumerable: true,
  });

  return inner;
}

export const getterThrowsTests = {
  numericContainer: {
    123: buildThrowingInner(),
  },
};
