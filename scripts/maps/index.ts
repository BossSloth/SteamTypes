import { GlobalMaps } from './Global';
import { SharedMaps } from './Shared';
import { SteamClientMaps } from './SteamClient';
import { SteamUIStoreMaps } from './SteamUIStore';

export interface InterfaceMap {
  condition?(): boolean;
  /** Path to the file relative to src/types */
  file: string;
  /** The SharedJs object so like `SteamClient.Apps` */
  objectExpression: string;
  /** Name of the interface in the source file */
  interfaceName: string;

  /** The function to call before we start processing the interface */
  initFunction?: string;
}

export function GMap(file: string, interfaceName: string, objectExpression: string, initFunction?: string): InterfaceMap {
  return {
    file: `Global/${file}`,
    interfaceName,
    objectExpression,
    initFunction,
  };
}

export function IMap(file: string, interfaceName: string, objectExpression: string, initFunction?: string): InterfaceMap {
  return {
    file,
    interfaceName,
    objectExpression,
    initFunction,
  };
}

export const interfaceMaps: InterfaceMap[] = [
  ...GlobalMaps,
  ...SharedMaps,
  ...SteamClientMaps,
  ...SteamUIStoreMaps,
];
