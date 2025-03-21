import { Unregisterable } from './shared';

/**
 * Represents functions related to input and controllers in Steam.
 */
export interface Input {
  CalibrateControllerIMU(controllerIndex: unknown): unknown;

  CalibrateControllerJoystick(controllerIndex: unknown): unknown;

  CalibrateControllerTrackpads(controllerIndex: unknown): unknown;

  CancelGyroSWCalibration(): unknown;

  ClearSelectedConfigForApp(appId: number, controllerIndex: number): unknown;

  /**
   * @params unknown
   */
  CloseDesktopConfigurator(): unknown;

  /**
   * Writes text.
   * @param textToWrite The text to write.
   */
  ControllerKeyboardSendText(textToWrite: string): void;

  /**
   * Sets a specified key's pressed state.
   * @param keyIndex The key index to set the state for.
   * @param state true for pressed, false otherwise.
   * @example
   * Send paste command:
   * ```
   * SteamClient.Input.ControllerKeyboardSetKeyState(EHIDKeyboardKey.LControl, true);
   * SteamClient.Input.ControllerKeyboardSetKeyState(EHIDKeyboardKey.V, true);
   * SteamClient.Input.ControllerKeyboardSetKeyState(EHIDKeyboardKey.V, false);
   * SteamClient.Input.ControllerKeyboardSetKeyState(EHIDKeyboardKey.LControl, false);
   * ```
   */
  ControllerKeyboardSetKeyState(keyIndex: EHIDKeyboardKey, state: boolean): void;

  DecrementCloudedControllerConfigsCounter(): unknown;

  DeletePersonalControllerConfiguration(param0: unknown): unknown;

  // f.Debug("sending to client"), this.SetEditingConfigurationValue(e, t, c.QU, (e => SteamClient.Input.DuplicateControllerConfigurationSourceMode(this.m_unControllerIndex, e))), this.SaveEditingConfiguration(e), this
  DuplicateControllerConfigurationSourceMode(controllerIndex: number, param1: unknown): unknown;

  EndControllerDeviceSupportFlow(): unknown;

  ExportCurrentControllerConfiguration(
    controllerIndex: number,
    appId: number,
    param2: number,
    title: string,
    description: string,
    param5: string,
  ): Promise<unknown>;

  ForceConfiguratorFocus(param0: boolean): unknown;

  ForceSimpleHapticEvent(param0: number, param1: number, param2: number, param3: number, param4: number): unknown;

  FreeControllerConfig(m_ChordSummaryConfiguration: unknown): unknown;

  GetConfigForAppAndController(appId: number, unControllerIndex: number): unknown;

  /**
   * Retrieves the controller mapping string for the specified controller index.
   * @param unControllerIndex The controller index.
   * @returns A Promise that resolves to the controller mapping string.
   */
  GetControllerMappingString(unControllerIndex: number): Promise<string>;

  GetControllerPreviouslySeen(): Promise<number[]>;

  GetSteamControllerDongleState(): Promise<boolean>;

  GetTouchMenuIconsForApp(appId: number): Promise<unknown>;

  GetXboxDriverInstallState(): Promise<unknown>; // "{"nResult":0}"
  IdentifyController(controllerIndex: number): unknown;

  InitControllerSounds(): unknown;

  InitializeControllerPersonalizationSettings(controllerIndex: number): unknown;

  ModalKeyboardDismissed(): void;

  /**
   * @params unknown
   */
  OpenDesktopConfigurator(): unknown;

  PreviewConfigForAppAndController(appId: number, controllerIndex: number, workshopUri: string): unknown;

  PreviewControllerLEDColor(flHue: number, flSaturation: number, flBrightness: number): unknown;

  QueryControllerConfigsForApp(appId: number, controllerIndex: number, param2: boolean): unknown;

  /**
   * @params unknown
  */
  // {"nActiveController":0}
  RegisterForActiveControllerChanges(): Unregisterable;

  // param0 - e possibly appid?
  // param1 - some index?
  RegisterForConfigSelectionChanges(callback: (param0: number, param1: number) => void): Unregisterable;

  /**
   * @params unknown
   */
  RegisterForControllerAccountChanges(): Unregisterable;

  RegisterForControllerAnalogInputMessages(callback: (controllerAnalogInputMessages: ControllerAnalogInputMessage[]) => void): Unregisterable;

  RegisterForControllerBatteryChanges(callback: unknown): Unregisterable;

  RegisterForControllerCommandMessages(callback: (controllerCommandMessage: ControllerCommandMessage) => void): Unregisterable;

  /**
   * Registers a callback for changes in controller configuration cloud state.
   * @param callback The callback function for config cloud state changes.
   * @returns An object that can be used to unregister the callback.
   */
  RegisterForControllerConfigCloudStateChanges(
    callback: (controllerConfigCloudStateChange: ControllerConfigCloudStateChange) => void,
  ): Unregisterable;

  /**
   * Registers a callback for receiving controller configuration info messages (controller layouts query, personal controller layout query).
   * @param callback The callback function for controller config info messages.
   * @returns An object that can be used to unregister the callback.
   * @remarks Do Not Use, this will break the controller layout selection unless you know what you are doing.
   */
  RegisterForControllerConfigInfoMessages(
    callback: (controllerConfigInfoMessages: ControllerConfigInfoMessageList[] | ControllerConfigInfoMessageQuery[]) => void,
  ): Unregisterable;

  /**
   * Registers a callback function to be invoked when controller input messages are received.
   * @param callback The callback function to be invoked when controller input messages are received.
   * @returns An object that can be used to unregister the callback.
   */
  RegisterForControllerInputMessages(callback: (controllerInputMessages: ControllerInputMessage[]) => void): Unregisterable;

  RegisterForControllerListChanges(callback: (controllerListChanges: ControllerInfo[]) => void): Unregisterable;

  /**
   * Registers a callback for changes in the controller state (buttons presses, triggers presses, joystick changes etc...).
   * @param callback The callback function for controller state changes.
   * @returns An object that can be used to unregister the callback.
   */
  RegisterForControllerStateChanges(callback: (controllerStateChanges: ControllerStateChange[]) => void): Unregisterable;

  RegisterForDualSenseUpdateNotification(callback: (m_strDualSenseUpdateProduct: string) => void): Unregisterable;

  /**
   * Registers a callback for receiving game keyboard messages (text field popup for inputting text for games when in character creation or etc...).
   * @param callback The callback function for game keyboard messages.
   * @returns An object that can be used to unregister the callback.
   */
  RegisterForGameKeyboardMessages(callback: (gameKeyboardMessage: GameKeyboardMessage) => void): Unregisterable;

  RegisterForRemotePlayConfigChanges(callback: () => void): Unregisterable;

  // data.appId, data.ulConfigId
  RegisterForShowControllerLayoutPreviewMessages(callback: (data: unknown) => void): Unregisterable;

  /*
            onTouchMenuInput(e) {
            for (let t = 0; t < e.length; t++) {
                const n = this.TouchMenuGetKey(e[t]), o = this.m_mapActiveTouchMenus.get(n);
                void 0 !== o && o.updateTouchMenuState(e[t])
            }
        }
     */
  RegisterForTouchMenuInputMessages(callback: (inputs: number[]) => void): Unregisterable;

  RegisterForTouchMenuMessages(callback: (touchMenuMessage: TouchMenuMessage) => void): Unregisterable;

  // param0 - index?
  RegisterForUIVisualization(param0: unknown, param1: unknown, param2: unknown): Unregisterable;

  RegisterForUnboundControllerListChanges(callback: (m_unboundControllerList: unknown) => void): Unregisterable; // param0 is an array

  /*
        OnDismissKeyboardMessage(e) {
            this.m_WindowStore.SteamUIWindows.forEach((e => e.VirtualKeyboardManager.SetVirtualKeyboardHidden(e.BrowserWindow)))
        }
     */
  RegisterForUserDismissKeyboardMessages(callback: (param0: unknown) => void): Unregisterable;

  /**
   * @params unknown
   */
  RegisterForUserKeyboardMessages(): Unregisterable;

  RequestGyroActive(controllerIndex: number, param1: boolean): unknown;

  RequestRemotePlayControllerConfigs(param0: unknown): unknown;

  ResetControllerBindings(param0: unknown): unknown;

  ResolveCloudedControllerConfigConflict(param0: unknown): unknown;

  RestoreControllerPersonalizationSettings(controllerIndex: number): unknown;

  SaveControllerCalibration(controllerIndex: number): unknown;

  SaveControllerPersonalizationSettings(param0: unknown): unknown;

  /**
   * @params unknown
   */
  SaveControllerSounds(): unknown;

  SaveEditingControllerConfiguration(controllerIndex: number, sharedConfig: boolean): unknown;

  // this.SetEditingConfigurationValue(e, t, c.sL, (e => SteamClient.Input.SetControllerConfigurationModeShiftBinding(this.m_unControllerIndex, e)))
  SetControllerConfigurationModeShiftBinding(controllerIndex: number, param1: unknown): unknown;

  SetControllerHapticSetting(controllerIndex: number, eHapticSetting: unknown): unknown;

  SetControllerMappingString(mapping: string): void;

  SetControllerName(controllerIndex: number, controllerName: string): unknown;

  /**
   * @params unknown
   */
  SetControllerNintendoLayoutSetting(): unknown;

  /**
   * @params unknown
   */
  SetControllerPersonalizationName(): unknown;

  // param0 - nLStickDeadzone, bSWAntiDrift, nRHapticStrength, flRPadPressureCurve
  /*
                SteamClient.Input.SetControllerPersonalizationSetting("nLStickDeadzone", e.nLStickDeadzone),
                SteamClient.Input.SetControllerPersonalizationSetting("nRStickDeadzone", e.nRStickDeadzone),
                SteamClient.Input.SetControllerPersonalizationSetting("bSWAntiDrift", e.bSWAntiDrift ? 1 : 0),
                SteamClient.Input.SetControllerPersonalizationSetting("nLHapticStrength", e.nLHapticStrength),
                SteamClient.Input.SetControllerPersonalizationSetting("nRHapticStrength", e.nRHapticStrength),
                SteamClient.Input.SetControllerPersonalizationSetting("flLPadPressureCurve", 100 * e.flLPadPressureCurve),
                SteamClient.Input.SetControllerPersonalizationSetting("flRPadPressureCurve", 100 * e.flRPadPressureCurve),
                SteamClient.Input.SetControllerPersonalizationSetting("ePlayerSlotLEDSetting", e),
                SteamClient.Input.SetControllerPersonalizationSetting("GyroPreferenceData.nGyroSampleAngleOffsetX", e.nGyroSampleAngleOffsetX),
                SteamClient.Input.SetControllerPersonalizationSetting("GyroPreferenceData.bMomentumEnabled", e.bMomentumEnabled ? 1 : 0),
                SteamClient.Input.SetControllerPersonalizationSetting("GyroPreferenceData.nMomentumFrictionX", e.nMomentumFrictionX),
                SteamClient.Input.SetControllerPersonalizationSetting("GyroPreferenceData.nMomentumFrictionY", e.nMomentumFrictionY),
                SteamClient.Input.SetControllerPersonalizationSetting("GyroPreferenceData.nAccerationLevel", e.nAccerationLevel),
                SteamClient.Input.SetControllerPersonalizationSetting("GyroPreferenceData.bInvertX", e.bInvertX ? 1 : 0),
                SteamClient.Input.SetControllerPersonalizationSetting("GyroPreferenceData.bInvertY", e.bInvertY ? 1 : 0),
                SteamClient.Input.SetControllerPersonalizationSetting("GyroPreferenceData.nRotationAngle", e.nRotationAngle),
                SteamClient.Input.SetControllerPersonalizationSetting("GyroPreferenceData.nTriggerClamping", e.nTriggerClamping),
                SteamClient.Input.SetControllerPersonalizationSetting("GyroPreferenceData.nTriggerClampingAmount", e.nTriggerClampingAmount),
                SteamClient.Input.SetControllerPersonalizationSetting("GyroPreferenceData.nGyroEnableButton", e.nGyroEnableButton),
                SteamClient.Input.SetControllerPersonalizationSetting("GyroPreferenceData.nGyroEnableButtonBehavior", e.nGyroEnableButtonBehavior),
     */
  SetControllerPersonalizationSetting(param0: string, param1: number): unknown;

  // param0 - flGyroStationaryTolerance, flAccelerometerStationaryTolerance,
  /*
                    SteamClient.Input.SetControllerPersonalizationSettingFloat("GyroPreferenceData.flGyroNaturalSensitivity", e.flGyroNaturalSensitivity),
                    SteamClient.Input.SetControllerPersonalizationSettingFloat("GyroPreferenceData.flGyroXYRatio", e.flGyroXYRatio),
                    SteamClient.Input.SetControllerPersonalizationSettingFloat("GyroPreferenceData.flGyroSpeedDeadzone", e.flGyroSpeedDeadzone),
                    SteamClient.Input.SetControllerPersonalizationSettingFloat("GyroPreferenceData.flGyroPrecisionSpeed", e.flGyroPrecisionSpeed),
                SteamClient.Input.SetControllerPersonalizationSettingFloat("flGyroStationaryTolerance", e.flGyroStationaryTolerance),
                SteamClient.Input.SetControllerPersonalizationSettingFloat("flAccelerometerStationaryTolerance", e.flAccelerometerStationaryTolerance),
     */
  SetControllerPersonalizationSettingFloat(param0: string, param1: number): unknown;

  SetControllerRumbleSetting(controllerIndex: number, rumblePreference: EControllerRumbleSetting): unknown;

  SetControllerUseUniversalFaceButtonGlyphs(controllerIndex: number, value: boolean): void;

  SetCursorActionset(param0: boolean): unknown;

  SetDualSenseUpdateNotification(param0: boolean): unknown;

  /*
            SetEditingConfigurationValue(e, t, n, o) {
            const a = new r.BinaryWriter;
            n.serializeBinaryToWriter(n.fromObject(t), a);
            const s = a.getResultBase64String();
            f.Debug("SetEditingConfigurationValue serializeBinaryToWriter", (0, i.ZN)(t), s), this.EditingConfigurationWillUpdate(), this.m_updatingEditingConfigurationPromise = o(s).then((t => {
                if (null == t) return f.Debug("SetEditingConfigurationValue returned nothing."), void (0, i.z)((() => this.UpdateEditingConfiguration(e, this.m_unControllerIndex, this.EditingConfiguration)));
                const n = c.bE.deserializeBinary(t).toObject();
                f.Debug("SetEditingConfigurationValue returned controller configuration.", n), this.UpdateEditingConfiguration(e, this.m_unControllerIndex, n), this.m_nEditNumber++, -1 == n.url.indexOf("autosave://") && this.SaveEditingConfiguration(e)
            })).catch((e => {
                f.Error("SetEditingConfigurationValue fail:", o, l.jt(e.result), e.message), this.m_bIsUpdatingActiveConfiguration = !1
            }))
        }

        SetControllerActionSet(e, t) {
            this.SetEditingConfigurationValue(e, t, c.X3, (e => SteamClient.Input.SetEditingControllerConfigurationActionSet(this.m_unControllerIndex, e)))
        }
     */
  SetEditingControllerConfigurationActionSet(controllerIndex: number, param1: unknown): unknown;

  // this.SetEditingConfigurationValue(e, t, c.io, (e => SteamClient.Input.SetEditingControllerConfigurationInputActivator(this.m_unControllerIndex, e)))
  SetEditingControllerConfigurationInputActivator(controllerIndex: number, param1: unknown): unknown;

  // this.SetEditingConfigurationValue(e, t, c.tH, (e => SteamClient.Input.SetEditingControllerConfigurationInputActivatorEnabled(this.m_unControllerIndex, e)))
  SetEditingControllerConfigurationInputActivatorEnabled(controllerIndex: number, param1: unknown): unknown;

  // this.SetEditingConfigurationValue(e, t, c.J2, (e => SteamClient.Input.SetEditingControllerConfigurationInputBinding(this.m_unControllerIndex, e)))
  SetEditingControllerConfigurationInputBinding(controllerIndex: number, param1: unknown): unknown;

  // this.SetEditingConfigurationValue(e, t, c.Sz, (e => SteamClient.Input.SetEditingControllerConfigurationMiscSetting(this.m_unControllerIndex, e)))
  SetEditingControllerConfigurationMiscSetting(controllerIndex: number, param1: unknown): unknown;

  // f.Debug("sending to client"), this.SetEditingConfigurationValue(e, t, c.QU, (e => SteamClient.Input.SetEditingControllerConfigurationSourceMode(this.m_unControllerIndex, e)))
  SetEditingControllerConfigurationSourceMode(controllerIndex: number, param1: unknown): unknown;

  SetGamepadKeyboardText(param0: boolean, param1: string): unknown;

  SetKeyboardActionset(param0: boolean, param1: boolean): unknown;

  /**
   * Sets the mouse position.
   * @param pid 0
   * @param x Mouse X position.
   * @param y Mouse Y position.
   */
  SetMousePosition(pid: number, x: number, y: number): void;

  SetSelectedConfigForApp(appId: number, controllerIndex: number, url: string, param3: boolean): unknown;

  SetSteamControllerDonglePairingMode(bEnable: boolean, bSilent: boolean): unknown;

  SetVirtualMenuKeySelected(unControllerIndex: number, unMenuIndex: number, m_controllerMenuActiveMenuItem: number): unknown; //
  SetWebBrowserActionset(param0: boolean): unknown;

  SetXboxDriverInstallState(param0: unknown): unknown; // state

  /**
   * Opens the Steam Input controller settings.
   * This function displays the Steam Input controller settings for configuration.
   */
  ShowControllerSettings(): void;

  StandaloneKeyboardDismissed(): unknown;

  StartControllerDeviceSupportFlow(param0: unknown, param1: unknown, callback: (param2: unknown) => void): unknown;

  /*
    this.m_updatingEditingConfigurationPromise = SteamClient.Input.StartEditingControllerConfigurationForAppIDAndControllerIndex(e, t).then((n=>{
                                const o = c.bE.deserializeBinary(n).toObject();
                                f.Debug("Loaded controller config for appid", e, n, o),
                                    (0,
                                        i.z)((()=>this.UpdateEditingConfiguration(e, t, o)))
                            }
                        )).catch((n=>{
                                f.Debug("Loading controller config for appid rejected", e, n),
                                    (0,
                                        i.z)((()=>this.UpdateEditingConfiguration(e, t, null)))
                            }
                        ))
     */
  StartEditingControllerConfigurationForAppIDAndControllerIndex(m_appId: number, m_unControllerIndex: number): Promise<unknown>;

  StartGyroSWCalibration(callback: () => void): unknown;

  StopEditingControllerConfiguration(controllerIndex: number): unknown;

  /**
   * @params unknown
   */
  SwapControllerConfigurationSourceModes(): unknown;

  // this.SetEditingConfigurationValue(e, t, c.Qb, (e => SteamClient.Input.SwapControllerModeInputBindings(this.m_unControllerIndex, e)))
  SwapControllerModeInputBindings(controllerIndex: number, param1: unknown): unknown;

  SwapControllerOrder(controllerIndex1: number, controllerIndex2: number): unknown;

  SyncCloudedControllerConfigs(): unknown;

  // type - enum
  /*
    Off - 0, Tick, Click
     */
  TriggerHapticPulse(controllerIndex: number, eHapticType: number, param2: number): unknown;

  TriggerSimpleHapticEvent(controllerIndex: number, eHapticType: number, unIntensity: number, ndBGain: number, param4: number): unknown;

  UnregisterForControllerStateChanges(): void;

  UnregisterForUIVisualization(controllerIndex: number): unknown;

  UploadChangesForCloudedControllerConfigs(): unknown;
}

export enum EHIDKeyboardKey {
  Invalid,
  BeforeFirst = 3,
  A,
  B,
  C,
  D,
  E,
  F,
  G,
  H,
  I,
  J,
  K,
  L,
  M,
  N,
  O,
  P,
  Q,
  R,
  S,
  T,
  U,
  V,
  W,
  X,
  Y,
  Z,
  Key_1,
  Key_2,
  Key_3,
  Key_4,
  Key_5,
  Key_6,
  Key_7,
  Key_8,
  Key_9,
  Key_0,
  Return,
  Escape,
  Backspace,
  Tab,
  Space,
  Dash,
  Equals,
  LeftBracket,
  RightBracket,
  Backslash,
  Unused1,
  Semicolon,
  SingleQuote,
  Backtick,
  Comma,
  Period,
  ForwardSlash,
  CapsLock,
  F1,
  F2,
  F3,
  F4,
  F5,
  F6,
  F7,
  F8,
  F9,
  F10,
  F11,
  F12,
  PrintScreen,
  ScrollLock,
  Break,
  Insert,
  Home,
  PageUp,
  Delete,
  End,
  PageDown,
  RightArrow,
  LeftArrow,
  DownArrow,
  UpArrow,
  NumLock,
  KeypadForwardSlash,
  KeypadAsterisk,
  KeypadDash,
  KeypadPlus,
  KeypadEnter,
  Keypad_1,
  Keypad_2,
  Keypad_3,
  Keypad_4,
  Keypad_5,
  Keypad_6,
  Keypad_7,
  Keypad_8,
  Keypad_9,
  Keypad_0,
  KeypadPeriod,
  LAlt,
  LShift,
  LWin,
  LControl,
  RAlt,
  RShift,
  RWin,
  RControl,
  VolUp,
  VolDown,
  Mute,
  Play,
  Stop,
  Next,
  Prev,
  AfterLast,
}

export interface ControllerAnalogInputMessage {
  nA: number;
  nC: number;
  x: number;
  y: number;
}

export interface ControllerCommandMessage {
  /**
   * @todo enum
   */
  eAction: number;
  nControllerIndex: number;
}

export interface ControllerConfigCloudStateChange {
  bSyncConflict: boolean;
  bSyncDone: boolean;
  bSyncError: boolean;
}

export interface ControllerConfigInfoMessage {
  appID: number;
}

export interface ControllerConfigInfoMessageQuery extends ControllerConfigInfoMessage {
  bPersonalQueryDone: boolean;
}

export interface ControllerConfigInfoMessageList extends ControllerConfigInfoMessage {
  accountID: number;
  bOfficial: boolean;
  bProgenitorOfficial: boolean;
  bProgenitorRecommended: boolean;
  bRecommended: boolean;
  bSelected: boolean;
  bUsesGamepad: boolean;
  bUsesKeyboard: boolean;
  bUsesMouse: boolean;
  bUsesSIAPI: boolean;
  Description: string;
  /**
   * @todo unconfirmed
   */
  eExportType: EControllerConfigExportType;
  nControllerType: number;
  playtime: string;
  publishedFileID: string;
  timeUpdated: string;
  Title: string;
  URL: string;
}

export enum EControllerConfigExportType {
  Unknown,
  PersonalLocal,
  PersonalCloud,
  Community,
  Template,
  Official,
  OfficialDefault,
}

export enum EControllerRumbleSetting {
  ControllerPreference,
  Off,
  On,
}

// TODO: Not the actual name, but the enum is only represented in a dropdown
// options vector, ty valve
export enum EThirdPartyControllerConfiguration {
  Off,
  DefaultSetting,
  On,
}

export interface ControllerInputMessage {
  bS: boolean;
  nA: number;
  nC: number;
}

export interface ActiveAccount {
  strActiveAccountID: string;
  strAvatarHash: string;
  strName: string;
}

export interface ControllerInfo {
  ActiveAccount: ActiveAccount | undefined;
  bHaptics: boolean;
  bNintendoLayout: boolean;
  bRemoteDevice: boolean;
  bSWAntiDrift: boolean;
  bUseReversedLayout: boolean;
  bWireless: boolean;
  eControllerType: EControllerType;
  eRumblePreference: EControllerRumbleSetting;
  flAccelerometerStationaryTolerance: number;
  flGyroStationaryTolerance: number;
  flLEDBrightness: number;
  flLEDSaturation: number;
  flLPadPressureCurve: number;
  flRPadPressureCurve: number;
  nControllerIndex: number;
  nLEDColorB: number;
  nLEDColorG: number;
  nLEDColorR: number;
  nLHapticStrength: number;
  nLStickDeadzone: number;
  nRHapticStrength: number;
  nRStickDeadzone: number;
  nTurnOffSound: number;
  nTurnOnSound: number;
  nXInputIndex: number;
  strChipID: string;
  strFirmwareBuildTime: string;
  strName: string;
  strSerialNumber: string;
  unCapabilities: number;
  unProductID: number;
  unUniqueID: number;
  unVendorID: number;
  vecAltAccounts: unknown[]; // The type for this property might need to be more specific based on the actual data structure
}

export enum EControllerType {
  None = -1,
  Unknown,
  UnknownSteamController,
  SteamController, // Codename Gordon
  SteamControllerV2, // Codename Headcrab
  SteamControllerNeptune, // Steam Deck
  FrontPanelBoard = 20,
  Generic = 30,
  XBox360Controller,
  XBoxOneController,
  PS3Controller,
  PS4Controller,
  WiiController,
  AppleController,
  AndroidController,
  SwitchProController,
  SwitchJoyConLeft,
  SwitchJoyConRight,
  SwitchJoyConPair,
  SwitchProGenericInputOnlyController,
  MobileTouch,
  SwitchProXInputSwitchController,
  PS5Controller,
  XboxEliteController,
  LastController, // Unverified
  PS5EdgeController,
  GenericKeyboard = 400,
  GenericMouse = 800,
}

export interface ControllerStateChange {
  flAccelerometerNoiseLength: number;
  flGravityVectorX: number;
  flGravityVectorY: number;
  flGravityVectorZ: number;
  flGyroCalibrationProgress: number;
  flGyroNoiseLength: number;
  flHardwareGyroDegreesPerSecondPitch: number;
  flHardwareGyroDegreesPerSecondRoll: number;
  flHardwareGyroDegreesPerSecondYaw: number;
  flHardwareQuatW: number;
  flHardwareQuatX: number;
  flHardwareQuatY: number;
  flHardwareQuatZ: number;
  flSoftwareGyroDegreesPerSecondPitch: number;
  flSoftwareGyroDegreesPerSecondRoll: number;
  flSoftwareGyroDegreesPerSecondYaw: number;
  flSoftwareQuatW: number;
  flSoftwareQuatX: number;
  flSoftwareQuatY: number;
  flSoftwareQuatZ: number;
  flTrustedGravityVectorX: number;
  flTrustedGravityVectorY: number;
  flTrustedGravityVectorZ: number;
  sBatteryLevel: number;
  sCenterPadX: number;
  sCenterPadY: number;
  sLeftPadX: number;
  sLeftPadY: number;
  sLeftStickX: number;
  sLeftStickY: number;
  sPressureBumperLeft: number;
  sPressureBumperRight: number;
  sPressurePadLeft: number;
  sPressurePadRight: number;
  sRightPadX: number;
  sRightPadY: number;
  sRightStickX: number;
  sRightStickY: number;
  sTriggerL: number;
  sTriggerR: number;
  /**
   * Bitmask representing pressed buttons.
   * - Bit 0: R2
   * - Bit 1: L2
   * - Bit 2: R1
   * - Bit 3: L1
   * - Bit 4: Y
   * - Bit 5: B
   * - Bit 6: X
   * - Bit 7: A
   * - Bit 8: D-Pad Up
   * - Bit 9: D-Pad Right
   * - Bit 10: D-Pad Left
   * - Bit 11: D-Pad Down
   * - Bit 12: Select
   * - Bit 13: Steam/Home
   * - Bit 14: Start
   * - Bit 15: L5
   * - Bit 16: R5
   * - Bit 17: Left Touchpad Click
   * - Bit 18: Right Touchpad Click
   * - Bit 19: Left Touchpad Touch
   * - Bit 20: Right Touchpad Touch
   * - Bit 21: Unknown (@todo Please provide more details if known)
   * - Bit 22: L3
   * - Bit 23-25: Unknown (@todo Please provide more details if known)
   * - Bit 26: R3
   * - Bit 27-28: Unknown (@todo Please provide more details if known)
   * - Bit 29: Mute (Dualsense)
   * - Bit 30-31: Unknown (@todo Please provide more details if known)
   */
  ulButtons: number;
  /**
   * Bitmask representing pressed upper buttons.
   * - Bit 0-8: Unknown (@todo Please provide more details if known)
   * - Bit 9: L4
   * - Bit 10: R4
   * - Bit 11-13: Unknown (@todo Please provide more details if known)
   * - Bit 14: Left Joystick Touch
   * - Bit 15: Right Joystick Touch
   * - Bit 16-17: Unknown (@todo Please provide more details if known)
   * - Bit 18: Quick Access Menu
   */
  ulUpperButtons: number;
  unControllerIndex: number;
  unHardwareUpdateInMicrosec: number;
  unPacketNum: number;
}

export interface GameKeyboardMessage {
  m_bOpen: boolean;
  m_dwOverlayPID: number;
  m_dwPID: number;
  /** @todo enum */
  m_eInputMode: number;
  /** @todo enum */
  m_eLineInputMode: number;
  m_hPipe: number;
  m_pchDescription: string;
  m_pchExistingText: string;
  m_unCharMax: number;
  nAppID: number;
}

export interface TouchMenuMessage {
  appID: number;
  bHasVirtualMenus: boolean;
  unControllerIndex: number;
}
