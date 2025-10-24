import { GameRecordingRequestHandler } from '../types/Modules/GameRecordingRequestHandler';
import { steambrew } from './steambrew';

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
export const gameRecordingRequestHandler = steambrew.findModuleExport(e => e.SendMsgTakeScreenshot !== undefined || e.ZipClip !== undefined || e.SendMsgNotifyTimelineEntryChanged !== undefined) as GameRecordingRequestHandler;
