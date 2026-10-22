import { GameRecordingRequestHandler } from '../types/Modules/GameRecordingRequestHandler';
import { steambrew } from './steambrew';

export const gameRecordingRequestHandler = steambrew.findModuleExport(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  (e) => e.SendMsgTakeScreenshot !== undefined || e.ZipClip !== undefined || e.SendMsgNotifyTimelineEntryChanged !== undefined,
) as GameRecordingRequestHandler;
