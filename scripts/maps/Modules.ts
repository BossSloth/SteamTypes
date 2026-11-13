/* eslint-disable @stylistic/quotes */
import { IMap, InterfaceMap } from '.';

export const ModulesMaps: InterfaceMap[] = [
  IMap(
    'Modules/GameRecordingRequestHandler',
    'GameRecordingRequestHandler',
    /* ts */ `MILLENNIUM_API.findModuleExport(e => e.SendMsgTakeScreenshot !== undefined || e.ZipClip !== undefined || e.SendMsgNotifyTimelineEntryChanged !== undefined)`,
  ),
  IMap(
    'Modules/Achievements',
    'AchievementSchema',
    /* ts */ `await MILLENNIUM_API.findModuleExport(
        (e) => typeof e === 'function' && e.toString?.()?.includes('Error from GetGameAchievements') === true,
      )(window.cm.GetServiceTransport(), 227300, 'english')`,
  ),
  IMap(
    'Modules/Achievements',
    'UserAchievements',
    /* ts */ `await MILLENNIUM_API.findModuleExport(
        (e) => typeof e === 'function' && e.toString?.()?.includes('Error from GetUserAchievements') === true,
      )(window.cm.GetServiceTransport(), 227300, window.cm.steamid.ConvertTo64BitString())`,
  ),
];
