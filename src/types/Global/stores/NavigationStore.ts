import type { History, Location } from 'history';

export interface NavigationStore {
  BRouteMatch(path: string): boolean;

  GetNavigator(): Navigator;

  SetNavigator(navigator: Navigator): void;

  UpdateRoutingInfo(history: History, location: Location): void;

  m_history?: History;

  m_locationPathname: string;

  m_navigator: Navigator;
}

export interface Navigator {
  Account(e: unknown[]): void;

  AllCollections(...e: unknown[]): void;

  App(...e: unknown[]): void;

  AppProperties(...e: unknown[]): void;

  Chat(...e: unknown[]): void;

  Collection(...e: unknown[]): void;

  Console(...e: unknown[]): void;

  Downloads(...e: unknown[]): void;

  ExternalWeb(...e: unknown[]): void;

  FriendAchievements(...e: unknown[]): void;

  GameServers(...e: unknown[]): void;

  GlobalAchievements(...e: unknown[]): void;

  Home(...e: unknown[]): void;

  Invites(e: unknown[]): void;

  LibraryTab(e: unknown[]): void;

  Login(e: unknown[]): void;

  MTXAuth(e: unknown[]): void;

  MyAchievements(...e: unknown[]): void;

  Reauthentication(e: unknown[]): void;

  RemotePlayTogether(e: unknown[]): void;

  RequestPlaytimeDialog(...e: unknown[]): void;

  Settings(...e: unknown[]): void;

  SteamWeb(...e: unknown[]): void;

  SteamWebTab(...e: unknown[]): void;

  AppOverlay: AppOverlay;

  ControllerConfigurator: ControllerConfigurator;

  Media: Media;

  type: string;
}

export interface Media {
  Clip(e: unknown): unknown;

  Grid(e: unknown): unknown;

  List(e: unknown): unknown;

  Recording(e: unknown): unknown;

  Screenshot(e: unknown): unknown;
}

export interface AppOverlay {
  Root(e: unknown): unknown;
}

export interface ControllerConfigurator {
  Main(e: unknown): unknown;
}
