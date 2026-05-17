// Fake objects that satisfy duck-type checks for Steam runtime types.

const fakeProtobufInstance = {
  getClassName(): string { return 'CMsgFakeProto'; },
  toObject(): unknown { return {}; },
  serializeBinary(): Uint8Array { return new Uint8Array(); },
  serializeBase64String(): string { return ''; },
};

const fakeSteamID = {
  m_ulSteamID: '76561197960287930',
  ConvertTo64BitString(): string { return '76561197960287930'; },
};

const fakeQueryObserver = {
  createResult(): unknown { return null; },
  getCurrentResult(): unknown { return null; },
  subscribe(): unknown { return null; },
};

const fakeConnectionManager = { connected: true };

if (typeof globalThis.window === 'undefined') {
  (globalThis as unknown as { window: { cm: unknown; }; }).window = { cm: fakeConnectionManager };
} else {
  (globalThis as unknown as { window: { cm: unknown; }; }).window.cm = fakeConnectionManager;
}

const cmContainer = {
  CMInterface: {},
  m_CMInterface: {},
  m_CM: {},
};

export const steamRuntimeTypesTests = {
  protoMessage: fakeProtobufInstance,
  steamID: fakeSteamID,
  queryObserver: fakeQueryObserver,
  cmObject: fakeConnectionManager,
  cmContainer: cmContainer,
};
