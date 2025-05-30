import { SteamWebURL, URLFeature } from '../Global/UrlStore';
import { Unregisterable } from './shared';

export interface URL {
  /**
   * Executes a steam:// URL.
   * @param url The URL to execute.
   */
  ExecuteSteamURL(url: string): void;

  /**
   * @param urls Additional URLs to get. May be empty.
   */
  GetSteamURLList(urls: SteamWebURL[]): Promise<SteamURLs>;

  GetWebSessionID(): Promise<string>;

  /**
   * Registers a callback to be called when a steam:// URL gets executed.
   * @param section `rungameid`, `open`, etc.
   * @param callback The callback function to be called.
   * @returns An object that can be used to unregister the callback.
   */
  RegisterForRunSteamURL(section: string, callback: (param0: number, url: string) => void): Unregisterable;

  RegisterForSteamURLChanges(callback: () => void): void;
}

export interface SteamURL {
  feature: URLFeature;

  url: string;
}

export type SteamURLs = Record<SteamWebURL, SteamURL>;
