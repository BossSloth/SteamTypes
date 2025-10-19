import { GameRecordingRequestHandlers } from '../types/Modules/GameRecordingRequestHandlers';
import { steambrew } from './steambrew';

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
export const gameRecordingRequestHandlers = steambrew.findModuleExport(e => e.SendMsgTakeScreenshot !== undefined || e.ZipClip !== undefined || e.SendMsgNotifyTimelineEntryChanged !== undefined) as GameRecordingRequestHandlers;
