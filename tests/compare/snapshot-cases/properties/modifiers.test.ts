import dedent from 'dedent';
import { ComparatorTest, createTest } from '../shared';

export const modifierCases: Record<string, ComparatorTest> = {
  'interface with optional properties': {
    interfaceName: 'Config',
    target: dedent/* ts */`
      export interface Config {
        name: string;
        version?: string;
      }`,
    source: dedent/* ts */`
      export interface Config {
        name?: string;
        version?: string;
        debug?: boolean;
      }`,
  },

  'interface with readonly properties': {
    interfaceName: 'ImmutableData',
    target: dedent/* ts */`
      export interface ImmutableData {
        readonly id: number;
        data: string;
      }`,
    source: dedent/* ts */`
      export interface ImmutableData {
        readonly id: number;
        readonly data: string;
        updatedAt: Date;
      }`,
  },

  'interface with property changing from optional to required': {
    interfaceName: 'UserAccount',
    expectsNoDiff: true,
    target: dedent/* ts */`
      export interface UserAccount {
        email?: string;

        id: string;

        name: string;

        phone?: string;
      }`,
    source: dedent/* ts */`
      export interface UserAccount {
        email: string;
        id: string;
        name: string;
        phone?: string;
      }`,
  },

  'interface with property changing from required to optional': {
    interfaceName: 'ProductDetails',
    target: dedent/* ts */`
      export interface ProductDetails {
        description: string;
        id: string;
        name: string;
        price: number;
      }`,
    source: dedent/* ts */`
      export interface ProductDetails {
        description?: string;
        discount?: number;
        id: string;
        name: string;
        price: number;
        inStock: boolean;
      }`,
  },

  'method becomes property when source switches kind': {
    interfaceName: 'KindMismatch',
    target: dedent/* ts */`
      export interface KindMismatch {
        item(): string;
      }`,
    source: dedent/* ts */`
      export interface KindMismatch {
        item: string;
      }`,
  },

  'property becomes method when source switches kind': {
    interfaceName: 'KindMismatch',
    target: dedent/* ts */`
      export interface KindMismatch {
        item: string;
      }`,
    source: dedent/* ts */`
      export interface KindMismatch {
        item(): string;
      }`,
  },
};

createTest('Property Modifiers', modifierCases);
