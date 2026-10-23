export interface SteamAward_Localization {
  title?: string;
}

export interface SteamAward {
  award_year?: number;

  localization?: SteamAward_Localization;

  voteid?: number;
}
