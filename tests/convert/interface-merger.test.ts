import { describe, expect, it } from 'vitest';
import { mergeInterfaces } from '../../scripts/convert-to-typescript/interface-merger';
import { PrimitiveType, Type } from '../../scripts/convert-to-typescript/Type';
import { InterfaceProperty, TypeScriptInterface } from '../../scripts/convert-to-typescript/types';

interface PropSpec {
  jsDoc?: string[];
  name: string;
  optional?: boolean;
  type?: Type;
}

function prop(spec: PropSpec): InterfaceProperty {
  const property: InterfaceProperty = {
    name: spec.name,
    type: spec.type ?? new PrimitiveType('string'),
  };
  if (spec.optional !== undefined) property.optional = spec.optional;
  if (spec.jsDoc) property.jsDoc = spec.jsDoc;

  return property;
}

interface InterfaceSpec {
  constructorString?: string;
  extendedConstructorString?: string;
  name: string;
  nameCounter?: number;
  order?: number;
  properties: PropSpec[];
}

function buildInterfaces(specs: InterfaceSpec[]): Map<string, TypeScriptInterface> {
  const map = new Map<string, TypeScriptInterface>();
  specs.forEach((spec, idx) => {
    const tsInterface: TypeScriptInterface = {
      name: spec.name,
      properties: spec.properties.map(prop),
      order: spec.order ?? idx,
    };
    if (spec.constructorString !== undefined) tsInterface.constructorString = spec.constructorString;
    if (spec.extendedConstructorString !== undefined) tsInterface.extendedConstructorString = spec.extendedConstructorString;
    if (spec.nameCounter !== undefined) tsInterface.nameCounter = spec.nameCounter;
    map.set(spec.name, tsInterface);
  });

  return map;
}

interface TestCase {
  interfaces: InterfaceSpec[];
  name: string;
}

function defineTests(suiteName: string, cases: TestCase[]) {
  describe(suiteName, () => {
    cases.forEach((testCase) => {
      it(testCase.name, () => {
        const interfaces = buildInterfaces(testCase.interfaces);
        const merged = mergeInterfaces(interfaces);
        expect(merged).toMatchSnapshot();
      });
    });
  });
}

defineTests('shouldMergeInterfaces - proto property guard', [
  {
    name: 'does not merge when first interface has a `proto` property',
    interfaces: [
      {
        name: 'A',
        constructorString: 'class C{}',
        properties: [{ name: 'a' }, { name: 'proto' }],
      },
      {
        name: 'B',
        constructorString: 'class C{}',
        properties: [{ name: 'a' }, { name: 'b' }],
      },
    ],
  },
  {
    name: 'does not merge when second interface has a `proto` property',
    interfaces: [
      {
        name: 'A',
        constructorString: 'class C{}',
        properties: [{ name: 'a' }, { name: 'b' }],
      },
      {
        name: 'B',
        constructorString: 'class C{}',
        properties: [{ name: 'a' }, { name: 'proto' }],
      },
    ],
  },
]);

defineTests('inheritance grouping', [
  {
    name: 'discards inheritance groups that contain only a single interface',
    interfaces: [
      {
        name: 'Lonely',
        constructorString: 'class Lonely{}',
        extendedConstructorString: 'class Missing{}',
        properties: [{ name: 'x' }],
      },
    ],
  },
  {
    name: 'collapses inheritance group whose members all share the same constructor',
    interfaces: [
      {
        name: 'A',
        constructorString: 'class Same{}',
        extendedConstructorString: 'class Parent{}',
        properties: [{ name: 'x' }],
      },
      {
        name: 'B',
        constructorString: 'class Same{}',
        extendedConstructorString: 'class Parent{}',
        properties: [{ name: 'x' }],
      },
    ],
  },
  {
    name: 'keeps interfaces separate when inheritance group has no common properties',
    interfaces: [
      {
        name: 'A',
        constructorString: 'class CA{}',
        extendedConstructorString: 'class Parent{}',
        properties: [{ name: 'a' }],
      },
      {
        name: 'B',
        constructorString: 'class CB{}',
        extendedConstructorString: 'class Parent{}',
        properties: [{ name: 'b' }],
      },
    ],
  },
  {
    name: 'merges shared jsDoc onto base properties for inheritance groups',
    interfaces: [
      {
        name: 'A',
        constructorString: 'class CA{}',
        extendedConstructorString: 'class Parent{}',
        properties: [
          { name: 'shared', jsDoc: ['/** shared docs */'] },
          { name: 'a' },
        ],
      },
      {
        name: 'B',
        constructorString: 'class CB{}',
        extendedConstructorString: 'class Parent{}',
        properties: [
          { name: 'shared', jsDoc: ['/** shared docs */', '/** more docs */'] },
          { name: 'b' },
        ],
      },
    ],
  },
  {
    name: 'strips numeric suffix from base interface name when first member uses nameCounter',
    interfaces: [
      {
        name: 'Foo2',
        nameCounter: 2,
        constructorString: 'class CB{}',
        extendedConstructorString: 'class Parent{}',
        properties: [{ name: 'shared' }, { name: 'b' }],
      },
      {
        name: 'Foo',
        constructorString: 'class CA{}',
        extendedConstructorString: 'class Parent{}',
        properties: [{ name: 'shared' }, { name: 'a' }],
      },
    ],
  },
  {
    name: 'treats two empty-property interfaces with the same constructor as mergeable',
    interfaces: [
      { name: 'Empty1', constructorString: 'class E{}', properties: [] },
      { name: 'Empty2', constructorString: 'class E{}', properties: [] },
    ],
  },
  {
    name: 'handles inheritance entries that lack a constructorString',
    interfaces: [
      {
        name: 'A',
        extendedConstructorString: 'class Parent{}',
        properties: [{ name: 'a' }],
      },
      {
        name: 'B',
        extendedConstructorString: 'class Parent{}',
        properties: [{ name: 'a' }, { name: 'b' }],
      },
    ],
  },
  {
    name: 'does not duplicate parent name when multiple children extend the same parent',
    interfaces: [
      {
        name: 'Parent',
        constructorString: 'class P{}',
        properties: [{ name: 'shared' }],
      },
      {
        name: 'ChildA',
        constructorString: 'class CA{}',
        extendedConstructorString: 'class P{}',
        properties: [{ name: 'shared' }, { name: 'a' }],
      },
      {
        name: 'ChildB',
        constructorString: 'class CB{}',
        extendedConstructorString: 'class P{}',
        properties: [{ name: 'shared' }, { name: 'b' }],
      },
    ],
  },
  {
    name: 'uses parent class as base when an instance lacks extendedConstructorString',
    interfaces: [
      {
        name: 'Parent',
        constructorString: 'class P{}',
        properties: [{ name: 'shared' }],
      },
      {
        name: 'Child',
        constructorString: 'class C{}',
        extendedConstructorString: 'class P{}',
        properties: [{ name: 'shared' }, { name: 'extra' }],
      },
    ],
  },
]);
