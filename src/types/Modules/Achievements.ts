export interface AchievementSchema {
  appid: number;

  groups: AchievementGroup[];

  language: string;

  schema_hash: number;

  schema_version: number;
}

export interface AchievementGroup {
  achievements: GroupAchievement[];

  archived: boolean;

  developeronly: boolean;

  dlcappid: number;

  id: number;

  ispublic: boolean;

  name: string;

  order: number;
}

export interface GroupAchievement {
  api_name: string;

  archived: boolean;

  description: string;

  groupid: number;

  hidden: boolean;

  icon_achieved: string;

  icon_unachieved: string;

  internal_key: number;

  max_progress?: number;

  min_progress?: number;

  name: string;
}

export interface UserAchievements {
  achievements: Record<number, UserAchievement>;

  appid: number;

  groups: Record<number, UserGroup>;

  schema_hash: number;

  steamid: string;
}

export interface UserAchievement {
  internal_key: number;

  progress?: number;

  unlock_time?: number;

  unlocked?: boolean;
}

export interface UserGroup {
  completed_achievements: number;

  groupid: number;

  is_achievable: boolean;

  is_completed: boolean;

  time_completed?: number;
}
