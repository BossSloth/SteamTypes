export interface OuterMessage {
  inner?: InnerMessage;
  inner_list?: InnerMessage[];
  outer_field?: string;
}

export interface InnerMessage {
  inner_field?: string;
  value?: number;
}

export interface Container {
  name?: string;
  type?: ContainerType;
}

export enum ContainerType {
  CONTAINER_TYPE_UNSPECIFIED = 0,
  CONTAINER_TYPE_BOX = 1,
  CONTAINER_TYPE_CRATE = 2,
}

export interface Address {
  city?: string;
  country?: string;
  street?: string;
}

export interface Person {
  address?: Address;
  age?: number;
  name?: string;
}
