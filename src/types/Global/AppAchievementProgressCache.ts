import { ObservableMap } from 'mobx';
import { Apps, GameSessions } from '../SteamClient';
import { ConnectionManager } from './managers/ConnectionManager';

export interface AppAchievementProgressCache {
  /**
   * Checks if a game has cached achievements
   * @param appId The ID of the app to check
   * @returns True if the app has cached achievements, false otherwise
   */
  BGameHasAchievements(appId: number): boolean;

  /**
   * Retrieves the percentage of achievements unlocked for a game
   * @param appId The ID of the app
   * @returns The percentage of achievements unlocked
   */
  GetAchievementProgress(appId: number): AchievementCache['percentage'];

  Init(connectionManager: ConnectionManager): Promise<void>;

  /**
   * Loads the achievement progress cache file from `achievement_progress.json`
   */
  LoadCacheFile(): Promise<void>;

  /**
   * Is registered to {@link GameSessions.RegisterForAchievementNotification}
   */
  OnAchievementNotification(...args: Parameters<Parameters<GameSessions['RegisterForAchievementNotification']>[0]>): unknown;

  /**
   * Queues a cache update for a specific app
   * @param appId The ID of the app to queue a cache update for
   */
  QueueCacheUpdate(appId: number): void;

  /**
   * Requests a cache update for all apps in {@link m_mapQueuedCacheMisses}
   */
  RequestCacheUpdate(): Promise<void>;

  /**
   * Saves the achievement progress cache to `achievement_progress.json`
   *
   * Calls {@link Apps.SaveAchievementProgressCache} to get the achievement progress cache
   */
  SaveCacheFile(): Promise<void>;

  CMInterface: ConnectionManager;

  m_achievementProgress: AchievementProgress;

  m_cacheUpdateTimer?: number;

  m_CMInterface: ConnectionManager;

  m_mapQueuedCacheMisses: Map<number, boolean>;
}

/**
 * An parsed object from the achievement progress cache file `achievement_progress.json`
 */
export interface AchievementProgress {
  mapCache: ObservableMap<number, AchievementCache>;

  nVersion: number;
}

export interface AchievementCache {
  /**
   * Whether all achievements are unlocked
   */
  all_unlocked: boolean;

  /**
   * App ID
   */
  appid: number;

  /**
   * Cache time
   */
  cache_time: number;

  /**
   * Percentage of achievements unlocked
   */
  percentage: number;

  /**
   * Total number of achievements
   */
  total: number;

  /**
   * Number of achievements unlocked
   */
  unlocked: number;

  /**
   * Whether the achievements have been vetted
   */
  vetted?: boolean;
}
