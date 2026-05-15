import dedent from 'dedent';
import { ConversionContext, getCtx, setCtx } from '../../../scripts/proto-scripts/conversion-context';
import { parseExistingComments } from '../../../scripts/proto-scripts/existing-comments';

beforeEach(() => {
  setCtx(new ConversionContext('current.proto'));
});

describe('parseExistingComments', () => {
  it('returns silently when given empty content', () => {
    function call(): void {
      parseExistingComments('');
    }
    expect(call).not.toThrow();
  });

  it('captures interface-level JSDoc', () => {
    parseExistingComments(dedent/* ts */`
      /**
       * Top-level docs
       */
      export interface Foo {
        bar?: string;
      }
    `);

    const foo = getCtx().existingComments.get('Foo');
    expect(foo?.get('__interface_comment')).toContain('Top-level docs');
  });

  it('captures enum-level JSDoc', () => {
    parseExistingComments(dedent/* ts */`
      /**
       * Enum docs
       */
      export enum Kind {
        A = 0,
      }
    `);

    const kind = getCtx().existingComments.get('Kind');
    expect(kind?.get('__interface_comment')).toContain('Enum docs');
  });

  it('captures field comments above optional and required field syntax', () => {
    parseExistingComments(dedent/* ts */`
      export interface Foo {
        /**
         * required field
         */
        id: string;

        /**
         * optional field
         */
        note?: number;
      }
    `);

    const foo = getCtx().existingComments.get('Foo');
    expect(foo?.get('id')).toContain('required field');
    expect(foo?.get('note')).toContain('optional field');
  });

  it('saves a pending interface-level comment when followed by another interface', () => {
    parseExistingComments(dedent/* ts */`
      /**
       * Docs A
       */
      export interface A {
        x?: string;
      }

      /**
       * Docs B
       */
      export interface B {
        y?: string;
      }
    `);

    const ctx = getCtx();
    expect(ctx.existingComments.get('A')?.get('__interface_comment')).toContain('Docs A');
    expect(ctx.existingComments.get('B')?.get('__interface_comment')).toContain('Docs B');
  });

  it('resets buffered comment when an unrelated non-comment line follows', () => {
    parseExistingComments(dedent/* ts */`
      /**
       * Stale comment
       */
      const stray = 1;
      export interface Foo {
        bar?: string;
      }
    `);

    const foo = getCtx().existingComments.get('Foo');
    // Stale comment must NOT have leaked onto Foo
    expect(foo?.get('__interface_comment')).toBeUndefined();
  });

  it('reuses the existing entry when the same interface name appears twice without a pending comment', () => {
    parseExistingComments(dedent/* ts */`
      export interface Foo {
        x?: string;
      }

      export interface Foo {
        /**
         * y docs
         */
        y?: number;
      }
    `);

    const foo = getCtx().existingComments.get('Foo');
    expect(foo?.get('__interface_comment')).toBeUndefined();
    expect(foo?.get('y')).toContain('y docs');
  });

  it('ignores buffered field comments that are not followed by a field declaration', () => {
    parseExistingComments(dedent/* ts */`
      export interface Foo {
        /**
         * dangling comment
         */
        someMethod(): void;
        bar?: string;
      }
    `);

    const foo = getCtx().existingComments.get('Foo');
    expect(foo?.get('bar')).toBeUndefined();
    expect(foo?.get('someMethod')).toBeUndefined();
  });

  it('does not duplicate the entry when the interface name appears twice', () => {
    parseExistingComments(dedent/* ts */`
      export interface Foo { x?: string; }
      /**
       * second
       */
      export interface Foo { y?: string; }
    `);

    const ctx = getCtx();
    expect(ctx.existingComments.get('Foo')?.get('__interface_comment')).toContain('second');
  });
});
