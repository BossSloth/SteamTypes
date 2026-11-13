// oxlint-disable typescript/no-unsafe-call typescript/no-unsafe-member-access
import { AchievementSchema, UserAchievements } from 'types';
import { ServiceTransport } from 'types/Global/managers/ConnectionManager';
import { SteamID } from 'types/shared/steamid';
import { GameRecordingRequestHandler } from '../types/Modules/GameRecordingRequestHandler';
import { steambrew } from './steambrew';

export const gameRecordingRequestHandler = steambrew.findModuleExport(
  (e) => e.SendMsgTakeScreenshot !== undefined || e.ZipClip !== undefined || e.SendMsgNotifyTimelineEntryChanged !== undefined,
) as GameRecordingRequestHandler;

export const GetGameAchievements = steambrew.findModuleExport(
  (e) => typeof e === 'function' && e.toString?.()?.includes('Error from GetGameAchievements') === true,
) as (transport: ServiceTransport, appid: number, language: string) => Promise<AchievementSchema>;

/**
 * @param steamid64 - The user's Steam ID as a 64-bit string. See {@link SteamID.ConvertTo64BitString}.
 */
export const GetUserAchievements = steambrew.findModuleExport(
  (e) => typeof e === 'function' && e.toString?.()?.includes('Error from GetUserAchievements') === true,
) as (transport: ServiceTransport, appid: number, steamid64: string) => Promise<UserAchievements>;
