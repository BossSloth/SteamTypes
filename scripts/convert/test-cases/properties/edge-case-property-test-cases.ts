//#region Circular Reference Property Test Cases
// Create objects with circular references
const circularObj: any = { name: 'circular' };
circularObj.self = circularObj;

const nestedCircularObj: any = { 
  level1: { 
    level2: { 
      level3: {} 
    } 
  } 
};
nestedCircularObj.level1.level2.level3.back = nestedCircularObj;

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
    'var': 'Var'
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
    '*asterisk': 'asterisk'
  },
  
  // Object with emoji property names
  emojiPropertyNames: {
    '🙂': 'smile',
    '👍': 'thumbs up',
    '🚀': 'rocket'
  },

  m_startWithUnderscore: {a: 5},
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

// Export all edge case property tests
export const edgeCasePropertyTests = {
  circularReferenceTests,
  prototypeInheritanceTests,
  specialValueTests,
  propertyNameEdgeCases,
  mixedComplexEdgeCases
};
