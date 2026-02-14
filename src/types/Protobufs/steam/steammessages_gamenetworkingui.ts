import { CMsgSteamDatagramP2PRoutingSummary } from './steamdatagram_messages_sdr';
import { CMsgSteamDatagramConnectionQuality } from './steamnetworkingsockets_messages';

export interface CGameNetworkingUI_GlobalState { }

export interface CGameNetworkingUI_ConnectionState {
  address_remote?: string;

  appid?: number;

  close_message?: string;

  close_reason?: number;

  close_time?: number;

  connection_id_local?: number;

  connection_key?: string;

  connection_state?: number;

  e2e_quality_local?: CMsgSteamDatagramConnectionQuality;

  e2e_quality_remote?: CMsgSteamDatagramConnectionQuality;

  e2e_quality_remote_instantaneous_time?: number;

  e2e_quality_remote_lifetime_time?: number;

  front_quality_local?: CMsgSteamDatagramConnectionQuality;

  front_quality_remote?: CMsgSteamDatagramConnectionQuality;

  front_quality_remote_instantaneous_time?: number;

  front_quality_remote_lifetime_time?: number;

  identity_local?: string;

  identity_remote?: string;

  p2p_routing?: CMsgSteamDatagramP2PRoutingSummary;

  ping_default_internet_route?: number;

  ping_interior?: number;

  ping_remote_front?: number;

  sdrpopid_local?: string;

  sdrpopid_remote?: string;

  start_time?: number;

  status_loc_token?: string;

  transport_kind?: number;
}

export interface CGameNetworkingUI_Message {
  connection_state?: CGameNetworkingUI_ConnectionState[];
}

export interface CGameNetworkingUI_ConnectionSummary {
  connection_state?: number;

  ip_was_shared?: boolean;

  packet_loss?: number;

  ping_default_internet_route?: number;

  ping_ms?: number;

  sdrpop_local?: string;

  sdrpop_remote?: string;

  transport_kind?: number;
}

export interface CGameNetworkingUI_AppSummary {
  active_connections?: number;

  appid?: number;

  ip_was_shared_with_friend?: boolean;

  ip_was_shared_with_nonfriend?: boolean;

  main_cxn?: CGameNetworkingUI_ConnectionSummary;
}
