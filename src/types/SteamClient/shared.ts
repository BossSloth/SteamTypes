import { EBrowserType, EUIMode } from 'Global/managers/PopupManager';

export enum EResult {
  OK = 1,
  Fail,
  NoConnection,
  InvalidPassword = 5,
  LoggedInElsewhere,
  InvalidProtocolVer,
  InvalidParam,
  FileNotFound,
  Busy,
  InvalidState,
  InvalidName,
  InvalidEmail,
  DuplicateName,
  AccessDenied,
  Timeout,
  Banned,
  AccountNotFound,
  InvalidSteamID,
  ServiceUnavailable,
  NotLoggedOn,
  Pending,
  EncryptionFailure,
  InsufficientPrivilege,
  LimitExceeded,
  Revoked,
  Expired,
  AlreadyRedeemed,
  DuplicateRequest,
  AlreadyOwned,
  IPNotFound,
  PersistFailed,
  LockingFailed,
  LogonSessionReplaced,
  ConnectFailed,
  HandshakeFailed,
  IOFailure,
  RemoteDisconnect,
  ShoppingCartNotFound,
  Blocked,
  Ignored,
  NoMatch,
  AccountDisabled,
  ServiceReadOnly,
  AccountNotFeatured,
  AdministratorOK,
  ContentVersion,
  TryAnotherCM,
  PasswordRequiredToKickSession,
  AlreadyLoggedInElsewhere,
  Suspended,
  Cancelled,
  DataCorruption,
  DiskFull,
  RemoteCallFailed,
  PasswordUnset,
  ExternalAccountUnlinked,
  PSNTicketInvalid,
  ExternalAccountAlreadyLinked,
  RemoteFileConflict,
  IllegalPassword,
  SameAsPreviousValue,
  AccountLogonDenied,
  CannotUseOldPassword,
  InvalidLoginAuthCode,
  AccountLogonDeniedNoMail,
  HardwareNotCapableOfIPT,
  IPTInitError,
  ParentalControlRestricted,
  FacebookQueryError,
  ExpiredLoginAuthCode,
  IPLoginRestrictionFailed,
  AccountLockedDown,
  AccountLogonDeniedVerifiedEmailRequired,
  NoMatchingURL,
  BadResponse,
  RequirePasswordReEntry,
  ValueOutOfRange,
  UnexpectedError,
  Disabled,
  InvalidCEGSubmission,
  RestrictedDevice,
  RegionLocked,
  RateLimitExceeded,
  AccountLoginDeniedNeedTwoFactor,
  ItemDeleted,
  AccountLoginDeniedThrottle,
  TwoFactorCodeMismatch,
  TwoFactorActivationCodeMismatch,
  AccountAssociatedToMultiplePartners,
  NotModified,
  NoMobileDevice,
  TimeNotSynced,
  SmsCodeFailed,
  AccountLimitExceeded,
  AccountActivityLimitExceeded,
  PhoneActivityLimitExceeded,
  RefundToWallet,
  EmailSendFailure,
  NotSettled,
  NeedCaptcha,
  GSLTDenied,
  GSOwnerDenied,
  InvalidItemType,
  IPBanned,
  GSLTExpired,
  InsufficientFunds,
  TooManyPending,
  NoSiteLicensesFound,
  WGNetworkSendExceeded,
  AccountNotFriends,
  LimitedUserAccount,
}

export enum ESteamRealm {
  Unknown,
  Global,
  China,
}

/**
 * Controls how Gamescope renders the GamepadUI window when a game is running.
 */
export enum EUIComposition {
  /** Steam is not rendered on the screen. */
  Hidden,
  /**
   * Transparent divs will allow pixels from the app behind Steam to penetrate.
   * Input goes to **the app**.
   */
  Notification,
  /**
   * Transparent divs will allow pixels from the app behind Steam to penetrate.
   * Input goes to **Steam**.
   */
  Overlay,
  /** Take all of the pixels on the screen, nothing "behind" Steam is shown. */
  Opaque,
  /**
   * Special composition mode that matches {@link Overlay}, but forwards synthetic keyboard
   * events to the Gamescope foreground app (game) instead of Steam.
   */
  OverlayKeyboard,
}

export interface BrowserContext {
  /**
   * Window type.
   */
  m_eBrowserType?: EBrowserType;

  /**
   * The UI mode in use.
   */
  m_eUIMode?: EUIMode;

  /**
   * @todo Appears when EBrowserType == 0 ?
   */
  m_gameID?: string;

  /**
   * @todo Same as `SteamClient.Browser.GetBrowserID()` ?
   */
  m_nBrowserID: number;

  /**
   * Game's app ID.
   */
  m_unAppID?: number;

  /**
   * If overlay, game's PID.
   */
  m_unPID: number;
}

/**
 * Represents the response of an operation. It appears to be not necessary to await for this operation response. It is only used to indicate the result of an operation.
 */
export interface OperationResponse {
  /**
   * A message describing the result of the operation.
   */
  message: string;

  /**
   * The result code of the operation.
   */
  result: EResult;
}

export interface Unregisterable {
  /**
   * Unregister the callback.
   */
  unregister(): void;
}

/**
 * @todo Get rid of this interface and use `ProtobufInterface` instead from the other shared folder
 * Deserialized ProtoBuf message.
 */
export interface JsPbMessage {
  getClassName(): string;

  serializeBase64String(): string;

  serializeBinary(): Uint8Array;

  /**
   * Converts the message to an object.
   */
  toObject(includeJsPbInstance: boolean): unknown;
}
