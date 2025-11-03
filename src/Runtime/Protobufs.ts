/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { CAppOverview_Change } from '../types/Protobufs/steam/steammessages_appoverview';
import { CMsgAchievementChange, CMsgCloudPendingRemoteOperations } from '../types/Protobufs/steam/steammessages_client_objects';
import { CMsgClientSettings } from '../types/Protobufs/steam/steammessages_clientsettings';
import { CGameRecording_AudioSessionsChanged_Notification } from '../types/Protobufs/steam/steammessages_gamerecording_objects';
import { ProtobufClass } from '../types/shared/protobuf';
import { steambrew } from './steambrew';

export const CAppOverview_Change_Protobuf = (
  steambrew.findModuleExport(e =>
    e.toString().includes('return"CAppOverview_Change"') === true)
) as ProtobufClass<CAppOverview_Change>;

export const CMsgCloudPendingRemoteOperations_Protobuf = (
  steambrew.findModuleExport(e =>
    e.toString().includes('return"CMsgCloudPendingRemoteOperations"') === true)
) as ProtobufClass<CMsgCloudPendingRemoteOperations>;

export const CMsgAchievementChange_Protobuf = (
  steambrew.findModuleExport(e =>
    e.toString().includes('return"CMsgAchievementChange"') === true)
) as ProtobufClass<CMsgAchievementChange>;

export const CGameRecording_AudioSessionsChanged_Notification_Protobuf = (
  steambrew.findModuleExport(e =>
    e.toString().includes('return"CGameRecording_AudioSessionsChanged_Notification"') === true)
) as ProtobufClass<CGameRecording_AudioSessionsChanged_Notification>;

export const CMsgClientSettings_Protobuf = (
  steambrew.findModuleExport(e =>
    e.toString().includes('return"CMsgClientSettings"') === true)
) as ProtobufClass<CMsgClientSettings>;
