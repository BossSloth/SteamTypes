export interface OuterMessage {
  inner?: OuterMessage_InnerMessage;

  inner_list?: OuterMessage_InnerMessage[];

  outer_field?: string;
}

export interface OuterMessage_InnerMessage {
  inner_field?: string;

  value?: number;
}

export interface Container {
  name?: string;

  type?: Container_ContainerType;
}

export enum Container_ContainerType {
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
