import { FriendStoreMaps } from './FriendStore';
import { GlobalMaps } from './Global';
import { ModulesMaps } from './Modules';
import { SharedMaps } from './Shared';
import { SteamClientMaps } from './SteamClient';
import { SteamUIStoreMaps } from './SteamUIStore';

export interface InterfaceMap extends InterfaceMapOptions {
  /** Path to the file relative to src/types */
  file: string;
  /** The SharedJs object so like `SteamClient.Apps` */
  objectExpression: string;
  /** Name of the interface in the source file */
  interfaceName: string;
}

export interface InterfaceMapOptions {
  /** The function to call before we start processing the interface */
  initFunction?: string;
  /** The condition to check before we start processing the interface */
  condition?: string;
  /** Properties to ignore for example parent references to prevent circular references */
  ignoredProperties?: string[];
}

export function GMap(file: string, interfaceName: string, objectExpression: string, options?: InterfaceMapOptions): InterfaceMap {
  return {
    file: `Global/${file}`,
    interfaceName,
    objectExpression,
    ...options,
  };
}

export function IMap(file: string, interfaceName: string, objectExpression: string, options?: InterfaceMapOptions): InterfaceMap {
  return {
    file,
    interfaceName,
    objectExpression,
    ...options,
  };
}

export const interfaceMaps: InterfaceMap[] = [
  ...GlobalMaps,
  ...SharedMaps,
  ...SteamClientMaps,
  ...SteamUIStoreMaps,
  ...ModulesMaps,
  ...FriendStoreMaps,
];
