import { CLocalizationToken } from './steammessages_base';

export interface CSeasonPassDateAndDisplay {
  coming_soon_display_type?: string;

  rtime?: number;
}

export interface CSeasonPassMilestone {
  appid?: number;

  backfilled_release?: boolean;

  coming_soon_appid?: number;

  dates?: CSeasonPassDateAndDisplay[];

  event_gid?: string;

  image?: CLocalizationToken[];

  milestone_desc?: CLocalizationToken[];

  milestone_id?: number;

  rtime_complete?: number;

  shipped?: boolean;

  title?: CLocalizationToken[];
}

export interface CSeasonPass {
  appid?: number;

  milestones?: CSeasonPassMilestone[];
}
