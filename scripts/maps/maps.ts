import { InterfaceMap } from '.';
import { FriendStoreMaps } from './FriendStore';
import { GlobalMaps } from './Global';
import { ModulesMaps } from './Modules';
import { SharedMaps } from './Shared';
import { SteamClientMaps } from './SteamClient';
import { SteamUIStoreMaps } from './SteamUIStore';

export const interfaceMaps: InterfaceMap[] = [
  ...GlobalMaps,
  ...SharedMaps,
  ...SteamClientMaps,
  ...SteamUIStoreMaps,
  ...ModulesMaps,
  ...FriendStoreMaps,
];
