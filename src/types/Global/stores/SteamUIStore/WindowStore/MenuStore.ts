import { ObservableMap } from 'mobx';
import { GamingDeviceType } from 'SteamClient/System';
import { WindowInstance } from './WindowStore';

export interface MenuStore {
  ClearLastRequestedSideMenu(): void;

  CloseSideMenus(): void;

  GetLastRequestedSideMenu(): unknown;

  GetOpenSideMenu(): unknown;

  GetQuickAccessTab(): unknown;

  Init(): never[];

  IsAnySideMenuVisible(): boolean;

  IsSideMenuInteractable(): boolean;

  IsSideMenuVisible(e: unknown): unknown;

  OnMenuDeactivated(e: unknown): void;

  OnSideMenusChanged(): void;

  OpenMainMenu(): unknown;

  /**
   * @native
   */
  OpenQuickAccessMenu(): unknown;

  OpenSideMenu(e: unknown): void;

  RequestExtendSideMenuVisibility(): () => number;

  SetSuppressMenus(): () => number;

  ToggleSideMenu(e: unknown, t: unknown): void;

  m_cSideMenuExtendedVisibilityRequests: number;

  m_cSuppressRequests: number;

  m_eLastRequestedSideMenu: SideMenu;

  m_eOpenSideMenu: SideMenu;

  m_eQuickAccessTab: QuickAccessTab;

  m_Instance: WindowInstance;

  m_MainMenuStore: MainMenuStore;

  MainMenuStore: MainMenuStore;
}

export interface MainMenuStore {
  GetFocusedApp(): unknown;

  GetFocusedColumn(): unknown;

  GetGamingDeviceType(): unknown;

  GetRunningApps(): unknown;

  GetSelectedGuide(e: unknown): unknown;

  GetSelectedNavEntry(): unknown;

  GetStoreURL(e: unknown): unknown;

  Init(): unknown;

  OnRunningAppsChanged(): void;

  SetFocusedApp(e: unknown): void;

  SetFocusedColumn(e: unknown): void;

  SetSelectedGuide(e: unknown, t: unknown): void;

  SetSelectedNavEntry(e: unknown): void;

  m_eFocusedColumn: SideMenu;

  m_eGamingDeviceType: GamingDeviceType;

  m_eSelectedNavEntry: SelectedNavEntry;

  m_focusedApp: null;

  m_mapSelectedGuide: ObservableMap<unknown, unknown>;

  m_WindowInstance: WindowInstance;
}

export enum SideMenu {
  None,
  Main,
  QuickAccess,
}

export enum QuickAccessTab {
  Notifications,
  RemotePlayTogetherControls,
  VoiceChat,
  Friends,
  Settings,
  Perf,
  Help,
  Soundtrack,
}

export enum SelectedNavEntry {
  Achievements,
  Controller,
  Guides,
  Notes,
  Browser,
  GR,
}
