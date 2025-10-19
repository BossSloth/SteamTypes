import type { GameRecordingService } from '../types/index.js';
import { steambrew } from './steambrew.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
export const gameRecordingService = steambrew.findModuleExport(e => e.SendMsgTakeScreenshot !== undefined || e.ZipClip !== undefined || e.SendMsgNotifyTimelineEntryChanged !== undefined) as GameRecordingService;
