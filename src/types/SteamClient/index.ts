import { Apps } from './Apps';
import { Auth } from './Auth';
import { Broadcast } from './Broadcast';
import { Browser } from './Browser';
import { BrowserView } from './BrowserView';
import { ClientNotifications } from './ClientNotifications';
import { Cloud } from './Cloud';
import { CloudStorage } from './CloudStorage';
import { CommunityItems } from './CommunityItems';
import { Compat } from './Compat';
import { Console } from './Console';
import { Customization } from './Customization';
import { Downloads } from './Downloads';
import { FamilySharing } from './FamilySharing';
import { FriendSettings } from './FriendSettings';
import { Friends } from './Friends';
import { GameNotes } from './GameNotes';
import { GameRecording } from './GameRecording';
import { GameSessions } from './GameSessions';
import { Input } from './Input';
import { InstallFolder } from './InstallFolder';
import { Installs } from './Installs';
import { Internal } from './Internal';
import { Messaging } from './Messaging';
import { Music } from './Music';
import { Notifications } from './Notifications';
import { OpenVR } from './OpenVR';
import { Overlay } from './Overlay';
import { Parental } from './Parental';
import { RemotePlay } from './RemotePlay';
import { Screenshots } from './Screenshots';
import { ServerBrowser } from './ServerBrowser';
import { Settings } from './Settings';
import { SharedConnection } from './SharedConnection';
import { Stats } from './Stats';
import { SteamChina } from './SteamChina';
import { Storage } from './Storage';
import { Streaming } from './Streaming';
import { System } from './System';
import { UI } from './UI';
import { URL } from './URL';
import { Updates } from './Updates';
import { User } from './User';
import { WebChat } from './WebChat';
import { WebUITransport } from './WebUITransport';
import { Window } from './Window';

export interface SteamClient {
  _internal: Internal;

  Apps: Apps;

  Auth: Auth;

  Broadcast: Broadcast;

  Browser: Browser;

  BrowserView: BrowserView;

  ClientNotifications: ClientNotifications;

  Cloud: Cloud;

  CloudStorage: CloudStorage;

  CommunityItems: CommunityItems;

  Compat: Compat;

  Console: Console;

  Customization: Customization;

  Downloads: Downloads;

  FamilySharing: FamilySharing;

  Friends: Friends;

  FriendSettings: FriendSettings;

  GameNotes: GameNotes;

  GameRecording: GameRecording;

  GameSessions: GameSessions;

  Input: Input;

  InstallFolder: InstallFolder;

  Installs: Installs;

  MachineStorage: Storage;

  Messaging: Messaging;

  Music: Music;

  Notifications: Notifications;

  OpenVR: OpenVR;

  Overlay: Overlay;

  Parental: Parental;

  RemotePlay: RemotePlay;

  RoamingStorage: Storage;

  Screenshots: Screenshots;

  ServerBrowser: ServerBrowser;

  Settings: Settings;

  SharedConnection: SharedConnection;

  Stats: Stats;

  SteamChina: SteamChina;

  Storage: Storage;

  Streaming: Streaming;

  System: System;

  UI: UI;

  Updates: Updates;

  URL: URL;

  User: User;

  WebChat: WebChat;

  WebUITransport: WebUITransport;

  Window: Window;
}

export {
  Apps,
  Auth,
  Broadcast,
  Browser,
  BrowserView,
  ClientNotifications,
  Cloud,
  CloudStorage,
  CommunityItems,
  Compat,
  Console,
  Customization,
  Downloads,
  FamilySharing,
  Friends,
  FriendSettings,
  GameNotes,
  GameRecording,
  GameSessions,
  Input,
  InstallFolder,
  Installs,
  Messaging,
  Music,
  Notifications,
  OpenVR,
  Overlay,
  Parental,
  RemotePlay,
  Screenshots,
  ServerBrowser,
  Settings,
  SharedConnection,
  Stats,
  SteamChina,
  Storage,
  Streaming,
  System,
  UI,
  Updates,
  URL,
  User,
  WebChat,
  WebUITransport,
};
