// Two siblings with the same nested shape so the converter's interface merger
// produces duplicate-named nested interfaces that get deduped during output.

const sharedShape = { id: 1, name: 'A' };

export const converterFlowTests = {
  first: { ...sharedShape },
  second: { ...sharedShape },
  third: { ...sharedShape },
};
