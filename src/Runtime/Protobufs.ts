/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { CAppOverview_Change } from '../types/Protobufs/steam/steammessages_appoverview';
import { ProtobufClass } from '../types/shared/protobuf';
import { steambrew } from './steambrew';

export const CAppOverview_Change_Protobuf = (
  steambrew.findModuleExport(e =>
    e.toString().includes('removed_appid:') === true
    && e.toString().includes('update_complete:') === true)
) as ProtobufClass<CAppOverview_Change>;
