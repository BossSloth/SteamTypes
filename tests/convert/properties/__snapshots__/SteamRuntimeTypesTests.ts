import { QueryObserver } from '@tanstack/query-core';
import { ConnectionManager } from 'Global/managers/ConnectionManager';
import { ProtobufInterface } from 'shared/protobuf';
import { SteamID } from 'shared/steamid';

export interface SteamRuntimeTypesTests {
  cmObject: ConnectionManager;

  protoMessage: ProtobufInterface<CMsgFakeProto>;

  queryObserver: QueryObserver;

  steamID: SteamID;
}
