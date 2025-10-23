import { EUIMode } from 'Global/PopupManager';
import { ESteamUISound, ObservableValue, Unsubscribable } from 'shared';
import { FocusNavigationContext } from './GamepadNavigationManager';

export interface GamepadUIAudioStore {
  Init(e: unknown, t: unknown): void;

  m_fnGetUIMode(): EUIMode;

  OnFocusChangeEvent(e: unknown): void;

  OnGamepadFocusChanged(e: unknown, t: unknown, r: unknown): void;

  OnUnhandledButtonDownEvent(e: unknown): void;

  /**
   * Like {@link PlayNavSound}, but using a URL path instead.
   *
   * @param url The URL path to play.
   */
  PlayAudioURL(sound: `/sounds/${NavAudioFile_t}`): SteamAudioPlaybackObj;

  /**
   * Plays a Steam UI sound.
   *
   * @param type The sound to play.
   */
  PlayNavSound(type: ESteamUISound, t: unknown): void;

  PlayNavSoundInternal(type: ESteamUISound): void;

  RegisterFocusNavContext(context: FocusNavigationContext): Unsubscribable;

  SuppressImminentNavSound(): void;

  AudioPlaybackManager: AudioPlaybackManager;

  m_AudioPlaybackManager: AudioPlaybackManager;

  m_bCanPlaySound: boolean;

  m_currentlyFocusedAppid: ObservableValue<number>;

  m_pendingSoundHandle: null | undefined;

  m_pendingSoundType: number | null;
}

export interface AudioPlaybackManager {
  CleanupContextIfUneeded(e: unknown): undefined;

  /**
   * @param e default: void 0
   */
  CreateContextIfNeeded(): void;

  DelayedCleanupContextIfInactive(): void;

  GetActiveDestination(): unknown;

  GetLastObservedSampleRate(): unknown;

  /**
   * @native
   */
  OnAudioContextStateChange(): unknown;

  /**
   * @param t default: 1
   */
  PlayAudioURL(e: unknown, t?: number): SteamAudioPlaybackObj;

  /**
   * @param t default: 0
   */
  PlayAudioURLWithRepeats(e: unknown, t?: number): SteamAudioPlaybackObj;

  PlaybackFinished(e: unknown): void;

  SetVoiceActive(e: unknown): void;

  SetVoiceNotActive(): void;

  SetVoiceStore(e: unknown): void;

  context: undefined | object;

  m_bSupportsAudioWorkletProcessors: boolean;

  m_bVoiceActive: boolean;

  m_Context: undefined | object;

  m_hCloseContextTimeout: number | undefined;

  m_loadContextPromise: Promise<unknown> | undefined;

  m_mapPlaybackObjs: Map<SteamAudioPlaybackObj, boolean>;

  m_MediaStreamAudioElem: undefined;

  m_MediaStreamDestination: undefined;

  m_nLastObservedSampleRate: number;

  m_voiceStore: undefined;

  supports_audio_worklets: boolean;
}

export interface SteamAudioPlaybackObj {
  NotifyPlaybackFinished(): void;

  /** @native */
  OnFailure(): unknown;

  /** @native */
  OnPlaybackEnded(): unknown;

  RegisterOnPlaybackFinished(e: unknown): void;

  StartPlayback(): void;

  StopPlayback(): void;

  m_Cancelled: boolean;

  m_cbPlaybackFinished: null;

  m_Manager: AudioPlaybackManager;

  m_RepeatCount: number;

  m_Source: undefined;

  m_TimesPlayed: number;

  m_URL: string;

  url: string;
}

/**
 * Steam UI sound file names relative to `https://steamloopback.host/sounds`.
 *
 * Generated with:
 * ```js
 * fs.readdirSync(`${os.homedir()}/.steam/steamui/sounds`).map((e) => `'${e}'`).join('|');
 * ```
 */
type NavAudioFile_t = 'bumper_end.wav'
  | 'camera1.wav'
  | 'confirmation_negative.wav'
  | 'confirmation_positive.wav'
  | 'deck_ui_achievement_toast.wav'
  | 'deck_ui_bumper_end_02.wav'
  | 'deck_ui_default_activation.wav'
  | 'deck_ui_hide_modal.wav'
  | 'deck_ui_into_game_detail.wav'
  | 'deck_ui_launch_game.wav'
  | 'deck_ui_message_toast.wav'
  | 'deck_ui_misc_01.wav'
  | 'deck_ui_misc_08.wav'
  | 'deck_ui_misc_10.wav'
  | 'deck_ui_navigation.wav'
  | 'deck_ui_out_of_game_detail.wav'
  | 'deck_ui_show_modal.wav'
  | 'deck_ui_side_menu_fly_in.wav'
  | 'deck_ui_side_menu_fly_out.wav'
  | 'deck_ui_slider_down.wav'
  | 'deck_ui_slider_up.wav'
  | 'deck_ui_switch_toggle_off.wav'
  | 'deck_ui_switch_toggle_on.wav'
  | 'deck_ui_tab_transition_01.wav'
  | 'deck_ui_tile_scroll.wav'
  | 'deck_ui_toast.wav'
  | 'deck_ui_typing.wav'
  | 'deck_ui_volume.wav'
  | 'desktop_toast_default.wav'
  | 'desktop_toast_short.wav'
  | 'pop_sound.wav'
  | 'recording_highlight.wav'
  | 'recording_start.wav'
  | 'recording_stop.wav'
  | 'steam_at_mention.m4a'
  | 'steam_chatroom_notification.m4a'
  | 'timer_expired_alarm.wav'
  | 'ui_steam_message_old_smooth.m4a'
  | 'ui_steam_smoother_friend_join.m4a'
  | 'ui_steam_smoother_friend_online.m4a';
