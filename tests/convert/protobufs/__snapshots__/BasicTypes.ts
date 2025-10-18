export interface BasicTypes {
  bool_field?: boolean;
  bytes_field?: Uint8Array;
  double_field?: number;
  fixed32_field?: number;
  fixed64_field?: string;
  float_field?: number;
  int32_field?: number;
  int64_field?: number;
  sfixed32_field?: number;
  sfixed64_field?: string;
  sint32_field?: number;
  sint64_field?: number;
  string_field?: string;
  uint32_field?: number;
  uint64_field?: number;
}

export interface OptionalFields {
  active?: boolean;
  age?: number;
  name?: string;
}

export interface RepeatedFields {
  flags?: boolean[];
  numbers?: number[];
  tags?: string[];
}
