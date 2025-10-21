import { ExtensionFieldInfo } from 'google-protobuf';
import { CMsgProtoBufHeader } from '../Protobufs/steam/steammessages_base';

/**
 * To get the deserialized object call {@link ProtobufNotification.Body()}.toObject()
 * @todo: Find way to add this to the compare maps to check for new types
 */
export interface ProtobufNotification<T> {
  BIsValid(): boolean;

  Body(): ProtobufInterface<T>;

  BSuccess(): boolean;

  DEBUG_LogToConsole(): void;

  DEBUG_ToObject(): object | unknown;

  GetEMsg(): number;

  GetEResult(): number;

  GetErrorMessage(): string;

  Hdr(): Header;

  InitForType(e: unknown): void;

  ReadBodyFromBuffer(e: unknown, t: unknown): void;

  Serialize(): Uint8Array;

  SerializeBody(): Uint8Array;

  SetBodyFields(e: unknown): void;

  SetBodyJSON(e: unknown): void;

  SetEMsg(e: number): void;

  m_body: Body;

  m_bValid: boolean;

  m_cubHeader: number;

  /**
   * This value is an enum
   * @currentValue 146
   */
  m_eMsg: number;

  m_header: Header;

  m_netPacket: NetPacket;
}

export type Header = ProtobufInterface<CMsgProtoBufHeader>;

export interface NetPacket {
  GetCountBytesRemaining(): number;

  GetPacket(): unknown;

  GetUint8(): unknown;

  /**
   * @param e default: !0
   */
  GetUint32(e?: boolean): unknown;

  PutBytes(e: unknown): void;

  PutUint8(e: unknown): void;

  /**
   * @param t default: !0
   */
  PutUint32(e: unknown, t?: boolean): void;

  SeekGetCurrent(e: unknown): void;

  /**
   * @param e default: 0
   */
  SeekGetHead(e?: number): void;

  SeekPut(e: unknown): void;

  TellGet(): unknown;

  TellMaxPut(): unknown;

  TellPut(): unknown;

  m_iGet: number;

  m_iPut: number;

  m_nLength: number;

  m_nOffset: number;

  m_rgubPacket: Uint8Array;

  m_viewPacket: DataView;
}

type ProtoGetters<T> = {
  [K in keyof T]-?: () => Exclude<T[K], undefined>;
};

type ProtoSetters<T> = {
  [K in keyof T as `set_${string & K}`]-?: (value: T[K]) => ProtobufInterface<T>;
};

// Helper to check if a type is an interface (object but not array, primitive, or built-in)
type IsInterface<T> = T extends unknown[]
  ? false
  : T extends object
    ? T extends Function
      ? false
      : T extends Date | RegExp | Map<unknown, unknown> | Set<unknown> | WeakMap<object, unknown> | WeakSet<object> | Promise<unknown>
        ? false
        : true
    : false;

// Extract element type from array
type ArrayElement<T> = T extends (infer E)[] ? E : never;

// Conditional type for add method parameter - wraps interfaces in ProtobufInterface
type AddMethodParam<T> = IsInterface<T> extends true ? ProtobufInterface<T> : T;

// Add methods for all array properties
type ProtoAdders<T> = {
  [K in keyof T as Exclude<T[K], undefined> extends unknown[]
    ? `add_${string & K}`
    : never]: (
    value: AddMethodParam<ArrayElement<Exclude<T[K], undefined>>>,
  ) => void;
};

/**
 * Protobuf interface with getters, setters, and add methods for array properties
 * @note You probably don't want to use most of the properties here and
 * instead use the {@link ProtobufInterface.toObject()} method to convert the protobuf message to a plain object
 */
export type ProtobufInterface<T> = ProtoGetters<T> & ProtoSetters<T> & ProtoAdders<T> & SimpleJsPbMessage<T>;

export interface SimpleJsPbMessage<T> {
  clone(): this;

  cloneMessage(): this;

  /**
   * Returns the exact name of the protobuf message "class"
   */
  getClassName(): string;

  getExtension<T>(fieldInfo: ExtensionFieldInfo<T>): T;

  getJsPbMessageId(): unknown | undefined;

  serializeBase64String(): string;

  serializeBinary(): Uint8Array;

  setExtension<T>(fieldInfo: ExtensionFieldInfo<T>, value: T): void;

  toArray(): SimpleJsPbMessage<T>['array'];

  toObject(e?: boolean): T;

  array: InterfaceToTuple<T>;

  arrayIndexOffset_: number;

  /**
   * SimpleJsPbMessage[] of all nested objects in this message
   */
  wrappers_: SimpleJsPbMessage<unknown>[];
}

type InterfaceToTuple<T> = T extends object
  ? {
      [K in keyof T]-?: Exclude<T[K], undefined> extends infer V
        ? V extends object
          ? V extends unknown[]
            ? V // Keep arrays as-is
            : InterfaceToTuple<V> // Recursively convert nested interfaces
          : V
        : never;
    }[keyof T][]
  : T;
