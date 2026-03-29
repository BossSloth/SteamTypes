import { FriendFeaturesEnabled, FriendsSettings } from 'Global/stores/FriendStore/ChatStore/SettingsStore';
import { SerializedJsonString } from 'shared/helpers';

/**
 * Represents friend settings and configuration.
 */
export interface FriendSettings {
  /**
   * Retrieves a list of enabled friend settings features.
   * @returns A Promise that resolves to an array of enabled friend settings features.
   */
  GetEnabledFeatures(): Promise<FriendSettingsFeatureObject[]>;

  /**
   * Registers a callback function to be notified of friend settings changes.
   * @param callback The callback function to be called when friend settings change.
   * @remarks The callback receives a JSON object string which may be parsed into {@link FriendsSettingsVDF}.
   */
  RegisterForSettingsChanges(callback: (settings: SerializedJsonString<FriendsSettingsVDF>) => void): void;

  /**
   * @param details String received from {@link FriendSettings.RegisterForSettingsChanges}.
   */
  SetFriendSettings(details: string): void;
}

/** 0 - false, 1 - true */
type VDFBoolean = 0 | 1;

export type BooleanToVDFBoolean<T> = {
  [K in keyof T]: T[K] extends boolean
    ? VDFBoolean
    : T[K] extends object
      ? BooleanToVDFBoolean<T[K]>
      : T[K];
};

export type FriendsSettingsVDF = BooleanToVDFBoolean<FriendsSettings>;

export interface FriendSettingsFeatureObject {
  bEnabled: boolean;

  feature: keyof FriendFeaturesEnabled;
}
