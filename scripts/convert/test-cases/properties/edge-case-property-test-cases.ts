//#region Circular Reference Property Test Cases
// Create objects with circular references
const circularObj: any = { name: 'circular' };
circularObj.self = circularObj;

const nestedCircularObj: any = { 
  level5: { 
    level6: { 
      level7: {} 
    } 
  } 
};
nestedCircularObj.level5.level6.level7.back = nestedCircularObj;

const circularArray: any[] = [1, 2, 3];
circularArray.push(circularArray);

const nestedCircularArray: any[] = [1, 2, 3];
nestedCircularArray.push({nestedArray: nestedCircularArray});

export const circularReferenceTests = {
  // Simple circular reference
  simpleCircularReference: circularObj,
  
  // Nested circular reference
  nestedCircularReference: nestedCircularObj,
  
  // Array with circular reference
  circularArray: circularArray,
  
  // Nested array with circular reference
  nestedCircularArray: nestedCircularArray
};
//#endregion

//#region Prototype and Inheritance Property Test Cases
// Create objects with prototype inheritance
const protoObj = {
  inheritedMethod() { return 'inherited'; }
};

const derivedObj = Object.create(protoObj);
derivedObj.ownProperty = 'own';

// Multi-level inheritance
const baseObj = {
  baseMethod() { return 'base'; }
};

const middleObj = Object.create(baseObj);
middleObj.middleMethod = function() { return 'middle'; };

const leafObj = Object.create(middleObj);
leafObj.leafMethod = function() { return 'leaf'; };

export const prototypeInheritanceTests = {
  // Simple inheritance
  simpleInheritance: derivedObj,
  
  // Multi-level inheritance
  multiLevelInheritance: leafObj
};
//#endregion

//#region Special Value Property Test Cases
export const specialValueTests = {
  // Special numeric values
  maxNumber: Number.MAX_VALUE,
  
  minNumber: Number.MIN_VALUE,
  
  epsilonNumber: Number.EPSILON,
  
  // Special string values
  emptyString: '',
  
  whitespaceString: '   \t\n',
  
  // Special object values
  objectWithOnlyToString: {
    toString() { return 'custom toString'; },
  },

  objectWithToStringAndOther: {
    toString() { return 'custom toString'; },
    fooOther: 'bar',
  },

  objectWithOnlyValueOf: {
    valueOf() { return 42; }
  },
};
//#endregion

//#region Property Name Edge Cases
export const propertyNameEdgeCases = {
  // Object with reserved keywords as property names
  reservedKeywords: {
    'class': 'Class',
    'function': 'Function',
    'if': 'If',
    'return': 'Return',
    'var': 'Var',
    other: 5,
    foo: 'bar',
  },
  
  // Object with numeric property names
  numericPropertyNames: {
    '0': 'zero',
    '1': 'one',
    '2': 'two'
  },
  
  // Object with special characters in property names
  specialCharacterPropertyNames: {
    '@special': 'at',
    '#hashtag': 'hash',
    '%percent': 'percent',
    '^caret': 'caret',
    '*asterisk': 'asterisk',
    'space between': 'space between',
  },
  
  // Object with emoji property names
  emojiPropertyNames: {
    '🌟': 'star',
    '🚀': 'rocket',
    '🌙': 'moon'
  },

  m_startWithUnderscore: {a: 5},

  // Object with reserved keywords as property names
  reservedKeywordsObject: {
    'class': { id1: 1, value: 'Class' },
    'function': { id2: 2, value: 'Function' },
    'if': { id3: 3, value: 'If' },
    'return': { id4: 4, value: 'Return' },
    'var': { id5: 5, value: 'Var' }
  },
  
  // Object with numeric property names
  numericPropertyNamesObject: {
    '3': { index0: 0, value: 'zero' },
    '4': { index1: 1, value: 'one' },
    '5': { index2: 2, value: 'two' },
    '6543': { index3: 3, value: 'other' },
    'Other3': { index4: 4, value: 'other' },
  },
  
  // Object with special characters in property names
  specialCharacterPropertyNamesObject: {
    '@special': { type1: 'at', value: 'at' },
    '#hashtag': { type2: 'hash', value: 'hash' },
    '%percent': { type3: 'percent', value: 'percent' },
    '^caret': { type4: 'caret', value: 'caret' },
    '*asterisk': { type5: 'asterisk', value: 'asterisk' },
    'space between': { type6: 'space', value: 'space between' },
    'dashed-property': { type7: 'dashed', value: 'dashed' },
    'under_score': { type8: 'under', value: 'under' },
    '#multiple_ #_': { type9: 'multiple', value: 'multiple' },
  },
  
  // Object with emoji property names
  emojiPropertyNamesObject: {
    '🙂': { emoji1: '🙂', name: 'smile' },
    '👍': { emoji2: '👍', name: 'thumbs up' },
    '🚀': { emoji3: '🚀', name: 'rocket' }
  },
};
//#endregion

//#region Mixed Complex Edge Cases
export const mixedComplexEdgeCases = {
  // Object with mixed property types including functions
  complexMixedObject: {
    id: 1,
    name: 'Complex',
    active: true,
    tags: ['tag1', 'tag2'],
    metadata: { created: new Date(), version: '1.0' },
    process() { return this.id; },
    calculate: (x) => x * 2,
    [Symbol.iterator]: function* () { yield 1; yield 2; }
  },
  
  // Deeply nested object with various types
  deeplyNestedMixedObject: {
    level1: {
      primitive: 'string',
      array: [1, 2, 3],
      level2: {
        date: new Date(),
        regex: /test/,
        level3: {
          map: new Map([['key', 'value']]),
          set: new Set([1, 2, 3]),
          function: () => 'result'
        }
      }
    }
  },
  
  objectWithUndefined: { a: 1, b: undefined, c: 3 },
};
//#endregion

//#region Array Type Optimization Test Cases
// Test cases for array type optimization in union types
export const arrayTypeOptimizationTests = {
  // This should remain as (string[] | number[]) and not be merged to (string | number)[]
  unmergableArrays: [['a', 'b', 'c'], [1, 2, 3]],

  // This should be merged to (string | number)[] because (string | number)[] exists
  mergeableArrays: [['a', 'b', 'c'], [1, 2, 3], ['a', 1, 'b', 2]],

  nestedArrays: [
    [{b: 1}, {c: 2}],
    [true, false],
    ['a', 'b'],
    [1, 2],
    [true, {c: 3}],
    ['a', 1],
  ],
};
//#endregion

// Export all edge case property tests
export const edgeCasePropertyTests = {
  circularReferenceTests,
  prototypeInheritanceTests,
  specialValueTests,
  propertyNameEdgeCases,
  mixedComplexEdgeCases,
  arrayTypeOptimizationTests,
};
