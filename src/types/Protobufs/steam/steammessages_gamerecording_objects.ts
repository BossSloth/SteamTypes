export interface CGameRecording_AudioSessionsChanged_Notification {
  sessions?: CGameRecording_AudioSessionsChanged_Notification_Session[];
}

export interface CGameRecording_AudioSessionsChanged_Notification_Session {
  id?: string;

  is_active?: boolean;

  is_captured?: boolean;

  is_game?: boolean;

  is_muted?: boolean;

  is_saved?: boolean;

  is_steam?: boolean;

  is_system?: boolean;

  name?: string;

  recent_peak?: number;
}
