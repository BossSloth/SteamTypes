import { ObservableMap, ObservableSet } from 'mobx';

// IMPORTANT objects must have at least 3 properties in common to be merged
//TODO: something goes horribly wrong here almost all types are lost/combined into one big type

//#region Basic Merged Interface Test Cases
export const basicMergedInterfaceTests = {
  // Test case for arrays with objects that have the same base properties
  // but some have additional properties
  arrayWithExtraProperties: [
    { id: 1, name: 'Item 1', category: 'A', status: 'active', priority: 'high' },
    { id: 2, name: 'Item 2', category: 'B', status: 'active', priority: 'medium' },
    { id: 3, name: 'Item 3', category: 'C', status: 'active', priority: 'low', description: 'Optional description' }
  ],
  
  // Test case for arrays with objects that have the same properties
  // but with different value types
  arrayWithDifferentTypes: [
    { id: 1, name: 'First', status: 'active', value: 42, createdAt: new Date() },
    { id: 2, name: 'Second', status: 'active', value: 'string value', createdAt: new Date() },
    { id: 3, name: 'Third', status: 'active', value: true, createdAt: new Date() }
  ],
  
  // Test case for arrays with objects that have nested objects
  // with varying properties
  arrayWithNestedObjects: [
    { id: 1, name: 'Basic', status: 'active', createdAt: new Date(), details: { name: 'Basic' } },
    { id: 2, name: 'Advanced', status: 'active', createdAt: new Date(), details: { name: 'Advanced', features: ['A', 'B'] } }
  ]
};
//#endregion

//#region Complex Merged Interface Test Cases
export const complexMergedInterfaceTests = {
  // Test case for arrays with multiple levels of nesting
  deeplyNestedArray: [
    { 
      id: 1, 
      name: 'First',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
      metadata: { 
        created: new Date(), 
        owner: { id: 101, name: 'Owner 1', email: 'owner1@example.com' }
      }
    },
    { 
      id: 2, 
      name: 'Second',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
      metadata: { 
        created: new Date(), 
        owner: { id: 102, name: 'Owner 2', email: 'owner2@example.com', role: 'admin' }
      },
      statistics: { views: 150, likes: 42 }
    }
  ],
  
  // Test case for objects with arrays of objects that should be merged
  objectWithArrayProperties: {
    users: [
      { id: 1, name: 'User 1', email: 'user1@example.com', role: 'user', createdAt: new Date() },
      { id: 2, name: 'User 2', email: 'user2@example.com', role: 'admin', createdAt: new Date(), permissions: ['read', 'write', 'delete'] }
    ],
    products: [
      { id: 101, title: 'Product 1', description: 'Description 1', price: 9.99, stock: 100, category: 'electronics' },
      { id: 102, title: 'Product 2', description: 'Description 2', price: 19.99, stock: 50, category: 'electronics', discount: 0.1 }
    ]
  },
  
  // Test case for Set with objects that should be merged
  setWithMergeableObjects: new Set([
    { id: 1, name: 'First', type: 'basic', enabled: true, createdAt: new Date() },
    { id: 2, name: 'Second', type: 'advanced', enabled: false, createdAt: new Date(), config: { timeout: 30 } }
  ]),
  
  // Test case for Map with values that should be merged
  mapWithMergeableValues: new Map([
    ['key1', { id: 1, name: 'First', status: 'active', createdAt: new Date(), updatedAt: new Date() }],
    ['key2', { id: 2, name: 'Second', status: 'inactive', createdAt: new Date(), updatedAt: new Date(), reason: 'expired' }]
  ])
};
//#endregion

//#region Edge Case Merged Interface Test Cases
export const edgeCaseMergedInterfaceTests = {
  // Test case for arrays with objects that have exactly the minimum
  // number of common properties (3)
  minimalCommonProperties: [
    { prop1: 'a', prop2: 'b', prop3: 'c', shared1: true, shared2: 42, shared3: 'common' },
    { prop1: 'd', prop2: 'e', prop3: 'f', shared1: false, shared2: 43, shared3: 'common', prop4: 'g' }
  ],
  
  // Test case for arrays with objects that have fewer than the minimum
  // number of common properties (should not merge)
  insufficientCommonProperties: [
    { prop1: 'a', prop2: 'b', shared1: true, shared2: 42 },
    { prop1: 'c', prop3: 'd', shared1: false, shared2: 43, prop4: 'e' }
  ],
  
  // Test case for arrays with objects that have circular references
  circularReferences: (() => {
    const obj1: any = { id: 1, name: 'Circular 1', type: 'reference', status: 'active', createdAt: new Date() };
    const obj2: any = { id: 2, name: 'Circular 2', type: 'reference', status: 'active', createdAt: new Date(), parent: obj1 };
    obj1.child = obj2;
    return [obj1, obj2];
  })(),
  
  // Test case for arrays with objects that have functions
  // (functions should be preserved in merged interfaces)
  objectsWithFunctions: [
    { 
      id: 1, 
      name: 'Function Object 1',
      type: 'calculator',
      version: '1.0',
      status: 'active',
      calculate: function(a: number, b: number) { return a + b; }
    },
    { 
      id: 2, 
      name: 'Function Object 2',
      type: 'calculator',
      version: '2.0',
      status: 'active',
      calculate: function(a: number, b: number) { return a + b; },
      format: function(value: number) { return `$${value.toFixed(2)}`; }
    }
  ],
  
  // Test case for arrays with objects that have properties with union types
  unionTypeProperties: [
    { id: 1, name: 'Union 1', type: 'basic', status: 'active', createdAt: new Date(), value: 42 },
    { id: 2, name: 'Union 2', type: 'basic', status: 'active', createdAt: new Date(), value: 'string' },
    { id: 3, name: 'Union 3', type: 'basic', status: 'active', createdAt: new Date(), value: { nested: true } }
  ]
};
//#endregion

//#region Generic Type Merged Interface Test Cases
export const genericTypeMergedInterfaceTests = {
  // Test case for arrays with objects that use generic container types
  arrayWithGenericTypes: [
    { 
      id: 1, 
      name: 'Generic 1',
      type: 'container',
      status: 'active',
      createdAt: new Date(),
      values: [1, 2, 3],
      mappings: new Map([['a', 1], ['b', 2]])
    },
    { 
      id: 2, 
      name: 'Generic 2',
      type: 'container',
      status: 'active',
      createdAt: new Date(),
      values: ['a', 'b', 'c'],
      mappings: new Map([['x', { nested: true }]]),
      sets: new Set([1, 2, 3])
    }
  ],
  
  // Test case for arrays with objects that have observable collections
  arrayWithObservableCollections: [
    {
      id: 1,
      name: 'Observable 1',
      type: 'collection',
      status: 'active',
      createdAt: new Date(),
      items: new ObservableSet([1, 2, 3])
    },
    {
      id: 2,
      name: 'Observable 2',
      type: 'collection',
      status: 'active',
      createdAt: new Date(),
      items: new ObservableSet(['a', 'b']),
      mappings: new ObservableMap([['key1', 'value1']])
    }
  ],
  
  // Test case for nested generic types
  nestedGenericTypes: [
    {
      id: 1,
      name: 'Nested 1',
      type: 'complex',
      status: 'active',
      createdAt: new Date(),
      data: new Map([
        ['items', new Set([1, 2, 3])]
      ])
    },
    {
      id: 2,
      name: 'Nested 2',
      type: 'complex',
      status: 'active',
      createdAt: new Date(),
      data: new Map([
        ['items', new Set(['a', 'b'])],
        // @ts-ignore
        ['metadata', { created: new Date() }]
      ]),
      extraData: new Set([new Map([['nested', true]])])
    }
  ]
};
//#endregion

//#region Array Type Merged Interface Test Cases
export const arrayTypeMergedInterfaceTests = {
  // Test case for arrays with objects that have array properties
  // with different item types
  arrayWithDifferentItemTypes: [
    { id: 1, name: 'Array 1', type: 'tags', status: 'active', createdAt: new Date(), tags: ['tag1', 'tag2'] },
    { id: 2, name: 'Array 2', type: 'tags', status: 'active', createdAt: new Date(), tags: [1, 2, 3] }
  ],
  
  // Test case for arrays with objects that have array properties
  // with different lengths
  arrayWithDifferentLengths: [
    { id: 1, name: 'Length 1', type: 'array', status: 'active', createdAt: new Date(), values: [1] },
    { id: 2, name: 'Length 2', type: 'array', status: 'active', createdAt: new Date(), values: [1, 2, 3, 4, 5] }
  ],
  
  // Test case for arrays with objects that have nested arrays
  arrayWithNestedArrays: [
    { id: 1, name: 'Nested 1', type: 'matrix', status: 'active', createdAt: new Date(), matrix: [[1, 2], [3, 4]] },
    { id: 2, name: 'Nested 2', type: 'matrix', status: 'active', createdAt: new Date(), matrix: [[5, 6], [7, 8]], vector: [9, 10] }
  ],
  
  // Test case for arrays with objects that have arrays of objects
  arrayWithArraysOfObjects: [
    { 
      id: 1, 
      name: 'Parent 1',
      type: 'parent',
      status: 'active',
      createdAt: new Date(),
      children: [
        { childId: 1, name: 'Child 1', age: 5 },
        { childId: 2, name: 'Child 2', age: 7 }
      ]
    },
    { 
      id: 2, 
      name: 'Parent 2',
      type: 'parent',
      status: 'active',
      createdAt: new Date(),
      children: [
        { childId: 3, name: 'Child 3', age: 9, active: true },
        { childId: 4, name: 'Child 4', age: 11, active: false }
      ],
      settings: { darkMode: true }
    }
  ]
};
//#endregion

//#region Classes with extra properties or different types
class TestClass {
  name: string;
  details: { name: string; };
  index: number;
  status: string;
  createdAt: Date;

  constructor(name: string, index: number, extra: boolean = false) {
    this.name = name;
    this.index = index;
    this.status = 'active';
    this.createdAt = new Date();
    //@ts-ignore
    this.details = { name: name, other: 5, m_data: undefined };
    if(extra) {
      //@ts-ignore
      this.test1 = false;
      //@ts-ignore
      this.details.test2 = name;
    }
  }
}

export const classBasedMergedInterfaceTests = {
  // Test case for arrays with objects that are instances of different classes
  differentClassInstances: [
    new (class User { 
      constructor(
        public id: number, 
        public name: string, 
        public email: string, 
        public status: string, 
        public createdAt: Date
      ) {}
    })(1, 'Alice', 'alice@example.com', 'active', new Date()),
    new (class Admin { 
      constructor(
        public id: number, 
        public name: string, 
        public email: string, 
        public status: string, 
        public createdAt: Date, 
        public role: string
      ) {}
    })(2, 'Bob', 'bob@example.com', 'active', new Date(), 'admin')
  ],

  mergedClassInstances: [
    new TestClass('Alice', 1),
    new TestClass('Admin', 3),
    new TestClass('Bob', 2, true)
  ],

  // Test case for arrays with objects that have methods with different signatures
  objectsWithDifferentMethods: [
    { 
      id: 1, 
      name: 'Method 1', 
      type: 'calculator', 
      status: 'active', 
      createdAt: new Date(),
      calculate: (x: number) => x * 2 
    },
    { 
      id: 2, 
      name: 'Method 2', 
      type: 'calculator', 
      status: 'active', 
      createdAt: new Date(),
      calculate: (x: number, y: number) => x + y 
    }
  ],

  // Test case for arrays with objects that have symbol properties
  objectsWithSymbolProperties: [
    { 
      id: 1, 
      name: 'Symbol 1', 
      type: 'symbol', 
      status: 'active', 
      createdAt: new Date(),
      [Symbol.for('secret')]: 'hidden1' 
    },
    { 
      id: 2, 
      name: 'Symbol 2', 
      type: 'symbol', 
      status: 'active', 
      createdAt: new Date(),
      [Symbol.for('secret')]: 'hidden2', 
      [Symbol.for('extra')]: 123 
    }
  ]
};


// Export all merged interface test cases
export const mergedInterfaceTests = {
  basicMergedInterfaceTests,
  complexMergedInterfaceTests,
  edgeCaseMergedInterfaceTests,
  genericTypeMergedInterfaceTests,
  arrayTypeMergedInterfaceTests,
  classBasedMergedInterfaceTests
};
