// Build class instances whose methods appear as bound functions on the
// instance. This exercises `handleNativeFunction` in interface-generation:
// the m_fn early return, the function declaration cache, and the
// missing-method warn-and-cache path.
class NativeHost {
  greet(name: string): string {
    return `hi ${name}`;
  }
}

function dummy() {
  return 1;
}

function ghost() {
  return 'ghost';
}

function ghost2() {
  return 'ghost2';
}

function buildHost(): NativeHost {
  const instance = new NativeHost();
  const mutable = instance as unknown as Record<string, unknown>;
  mutable.greet = instance.greet.bind(instance);
  mutable.m_fnBound = dummy.bind(instance);
  mutable.notOnClass = ghost.bind(instance);

  return instance;
}

function buildSecondHost(): NativeHost {
  const instance = new NativeHost();
  const mutable = instance as unknown as Record<string, unknown>;
  // Same method name & class → exercises the function declaration cache.
  mutable.greet = instance.greet.bind(instance);
  // Same missing-method name → exercises the cachedMissingFunctions short-circuit.
  mutable.notOnClass = ghost2.bind(instance);

  return instance;
}

export const nativeMethodTests = {
  host: buildHost(),
  secondHost: buildSecondHost(),
};
