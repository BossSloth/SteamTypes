import { OverlayBrowserInfo } from './Overlay';
import { EUIMode, Unregisterable } from './shared';

export interface WebChat {
  BSuppressPopupsInRestore(): Promise<boolean>;

  /**
   * Gets your Steam3 ID.
   * @returns A Promise that resolves to a Steam3 ID.
   */
  GetCurrentUserAccountID(): Promise<number>;

  /**
   * Gets the current user's 64x64 avatar as a data URL.
   * @returns A Promise that resolves to the data URL.
   */
  GetLocalAvatarBase64(): Promise<string>;

  /**
   * Gets the current user's nickname.
   * @returns A Promise that resolves to the nickname.
   */
  GetLocalPersonaName(): Promise<string>;

  GetOverlayChatBrowserInfo(): Promise<OverlayBrowserInfo[]>;

  // param0 - appid ?
  GetPrivateConnectString(param0: number): Promise<string>;

  /**
   * Gets information about push-to-Talk.
   * @returns
   */
  GetPushToTalkEnabled(): Promise<PushToTalkInfo>;

  /**
   * Gets the "Sign in to friends when Steam starts" option value.
   * @returns A Promise that resolves to a boolean indicating whether the option is enabled or not.
   */
  GetSignIntoFriendsOnStart(): Promise<boolean>;

  /**
   * Retrieves the current UI mode.
   * @returns A Promise that resolves to the current UI mode.
   */
  GetUIMode(): Promise<EUIMode>;

  OnGroupChatUserStateChange(chatGroupId: unknown, accountId: unknown, action: unknown): unknown;

  OnNewGroupChatMsgAdded(groupId: number, chatId: number, accountId: number, timestamp: number, param4: number, message: string): unknown;

  // Opens the URL in default web browser, despite what the name says ?
  OpenURLInClient(url: string, pid: number, forceExternal: boolean): void;

  /**
   * Registers a callback function to be called when the computer's active state changes.
   * @param callback The callback function to be called.
   * @returns An object that can be used to unregister the callback.
   * @todo Changes to 2 after 10 seconds?
   * @todo Does not affect the keyboard?
   */
  RegisterForComputerActiveStateChange(callback: (state: EComputerActiveState, time: number) => void): Unregisterable;

  /**
   * @todo WebChat.ShowFriendChatDialog does this.
   */
  RegisterForFriendPostMessage(callback: (data: FriendChatDialogData) => void): Unregisterable;

  /**
   * To unregister, use {@link UnregisterForMouseXButtonDown}.
   */
  RegisterForMouseXButtonDown(callback: unknown): void;

  /**
   * Registers a callback function to be called when the push-to-talk state changes.
   * @param callback The callback function to be called.
   * @returns An object that can be used to unregister the callback.
   */
  RegisterForPushToTalkStateChange(callback: (state: boolean) => void): Unregisterable;

  /**
   * Registers a callback function to be called when the UI mode is changed.
   * @param callback The callback function to be called.
   * @returns An object that can be used to unregister the callback.
   */
  RegisterForUIModeChange(callback: (mode: EUIMode) => void): Unregisterable;

  RegisterOverlayChatBrowserInfoChanged(callback: unknown): Unregisterable;

  SetActiveClanChatIDs(clanChatIds: unknown[]): unknown;

  SetNumChatsWithUnreadPriorityMessages(size: number): void;

  SetPersonaName(): unknown;

  SetPushToMuteEnabled(value: boolean): unknown;

  SetPushToTalkEnabled(value: boolean): unknown;

  SetPushToTalkHotKey(param0: number): void;

  SetPushToTalkMouseButton(param0: number): void;

  SetVoiceChatActive(): unknown;

  SetVoiceChatStatus(): unknown;

  ShowChatRoomGroupDialog(): unknown;

  /**
   * @todo Does not actually show the dialog.
   */
  ShowFriendChatDialog(steamid: string): void;

  /**
   * @todo does this take any args at all lol
   */
  UnregisterForMouseXButtonDown(callback: unknown): void;
}

export enum EComputerActiveState {
  Invalid,
  Active,
  Idle,
}

export interface FriendChatDialog {
  browserid: number;
  btakefocus: string;
  command: string;
  pid: number;
  steamid: string;
}

export interface FriendChatDialogData {
  data: FriendChatDialog;
}

export interface PushToTalkInfo {
  /** Indicates whether push-to-talk is enabled. */
  bEnabled: boolean;
  /** Indicates whether push-to-mute is in use instead. */
  bPushToMute: boolean;
  /** Push-to-talk hotkey name. */
  strKeyName: string;
  /**
   * Push-to-talk hotkey.
   * @todo enum? this is not EHIDKeyboardKey
   */
  vkHotKey: number;
}
