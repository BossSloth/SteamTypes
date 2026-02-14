import { CMsgSteamDatagramConnectionQuality, CMsgSteamDatagramSessionCryptInfoSigned, CMsgSteamNetworkingICESessionSummary } from './steamnetworkingsockets_messages';
import { CMsgSteamDatagramCertificateSigned, CMsgSteamNetworkingIdentityLegacyBinary } from './steamnetworkingsockets_messages_certs';

export interface CMsgSteamNetworkingIPAddress {
  v4?: number;

  v6?: Uint8Array;
}

export interface CMsgSteamDatagramSignedMessageGeneric {
  cert?: CMsgSteamDatagramCertificateSigned;

  dummy_pad?: Uint8Array;

  signature?: Uint8Array;

  signed_data?: Uint8Array;
}

export interface CMsgSteamDatagramRouterPingReply {
  alt_addresses?: CMsgSteamDatagramRouterPingReply_AltAddress[];

  challenge?: string;

  client_cookie?: number;

  client_timestamp?: number;

  dummy_pad?: Uint8Array;

  dummy_varint?: number;

  echo_request_reply_tos?: number;

  echo_sent_tos?: number;

  flags?: number;

  /**
   * @Options
   * packed: true
   */
  latency_datacenter_ids?: number[];

  /**
   * @Options
   * packed: true
   */
  latency_datacenter_ids_p2p?: number[];

  /**
   * @Options
   * packed: true
   */
  latency_ping_ms?: number[];

  /**
   * @Options
   * packed: true
   */
  latency_ping_ms_p2p?: number[];

  recv_tos?: number;

  route_exceptions?: CMsgSteamDatagramRouterPingReply_RouteException[];

  scoring_penalty_relay_cluster?: number;

  seconds_until_shutdown?: number;

  sent_tos?: number;

  server_time?: number;

  your_public_ip?: number;

  your_public_port?: number;
}

export interface CMsgSteamDatagramRouterPingReply_RouteException {
  data_center_id?: number;

  flags?: number;

  penalty?: number;
}

export interface CMsgSteamDatagramRouterPingReply_AltAddress {
  id?: string;

  ipv4?: number;

  penalty?: number;

  port?: number;

  protocol?: CMsgSteamDatagramRouterPingReply_AltAddress_Protocol;
}

export enum CMsgSteamDatagramRouterPingReply_AltAddress_Protocol {
  DefaultProtocol = 0,
}

export enum CMsgSteamDatagramRouterPingReply_Flags {
  FLAG_MAYBE_MORE_DATA_CENTERS = 1,
  FLAG_MAYBE_MORE_ALT_ADDRESSES = 2,
}

export interface CMsgSteamDatagramGameserverPingRequestBody {
  echo?: Uint8Array;

  my_ips?: CMsgSteamNetworkingIPAddress[];

  relay_popid?: number;

  relay_unix_time?: number;

  routing_secret?: string;

  your_public_ip?: CMsgSteamNetworkingIPAddress;

  your_public_port?: number;
}

export interface CMsgSteamDatagramGameserverPingRequestEnvelope {
  cert?: CMsgSteamDatagramCertificateSigned;

  dummy_pad?: Uint8Array;

  legacy_challenge?: string;

  legacy_relay_unix_time?: number;

  legacy_router_timestamp?: number;

  legacy_your_public_ip?: number;

  legacy_your_public_port?: number;

  signature?: Uint8Array;

  signed_data?: Uint8Array;
}

export interface CMsgSteamDatagramGameserverPingReplyData {
  appid?: number;

  build?: string;

  data_center_id?: number;

  echo?: Uint8Array;

  echo_relay_unix_time?: number;

  legacy_challenge?: string;

  legacy_router_timestamp?: number;

  my_unix_time?: number;

  network_config_version?: number;

  protocol_version?: number;

  routing_blob?: Uint8Array;
}

export interface CMsgSteamDatagramNoSessionRelayToClient {
  challenge?: string;

  connection_id?: number;

  seconds_until_shutdown?: number;

  server_time?: number;

  your_public_ip?: number;

  your_public_port?: number;
}

export interface CMsgSteamDatagramNoSessionRelayToPeer {
  from_connection_id?: number;

  from_relay_session_id?: number;

  kludge_pad?: string;

  legacy_relay_session_id?: number;
}

export interface CMsgTOSTreatment {
  down_dscp45?: string;

  l4s_detect?: string;

  up_ecn1?: string;
}

export interface CMsgSteamDatagramClientPingSampleRequest {
  connection_id?: number;
}

export interface CMsgSteamDatagramClientPingSampleReply {
  connection_id?: number;

  legacy_data_centers?: CMsgSteamDatagramClientPingSampleReply_LegacyDataCenter[];

  pops?: CMsgSteamDatagramClientPingSampleReply_POP[];

  relay_override_active?: boolean;

  tos?: CMsgTOSTreatment;
}

export interface CMsgSteamDatagramClientPingSampleReply_POP {
  alt_addresses?: CMsgSteamDatagramClientPingSampleReply_POP_AltAddress[];

  best_dc_ping_ms?: number;

  best_dc_score?: number;

  best_dc_via_relay_pop_id?: number;

  cluster_penalty?: number;

  default_dc_ping_ms?: number;

  default_dc_score?: number;

  default_dc_via_relay_pop_id?: number;

  default_e2e_ping_ms?: number;

  default_e2e_score?: number;

  default_front_ping_ms?: number;

  p2p_via_peer_relay_pop_id?: number;

  pop_id?: number;

  test_dc_ping_ms?: number;

  test_dc_score?: number;

  test_dc_via_relay_pop_id?: number;
}

export interface CMsgSteamDatagramClientPingSampleReply_POP_AltAddress {
  front_ping_ms?: number;

  id?: string;

  penalty?: number;
}

export interface CMsgSteamDatagramClientPingSampleReply_LegacyDataCenter {
  best_dc_ping_ms?: number;

  best_dc_via_relay_pop_id?: number;

  data_center_id?: number;
}

export interface CMsgSteamDatagramClientSwitchedPrimary {
  connection_id?: number;

  from_active_packets_recv?: number;

  from_active_time?: number;

  from_dropped_reason?: string;

  from_ip?: number;

  from_port?: number;

  from_quality_now?: CMsgSteamDatagramClientSwitchedPrimary_RouterQuality;

  from_quality_then?: CMsgSteamDatagramClientSwitchedPrimary_RouterQuality;

  from_router_cluster?: number;

  gap_ms?: number;

  to_quality_now?: CMsgSteamDatagramClientSwitchedPrimary_RouterQuality;

  to_quality_then?: CMsgSteamDatagramClientSwitchedPrimary_RouterQuality;
}

export interface CMsgSteamDatagramClientSwitchedPrimary_RouterQuality {
  back_ping?: number;

  front_ping?: number;

  score?: number;

  seconds_until_down?: number;
}

export interface CMsgSteamDatagramConnectRequest {
  cert?: CMsgSteamDatagramCertificateSigned;

  connection_id?: number;

  crypt?: CMsgSteamDatagramSessionCryptInfoSigned;

  gameserver_relay_session_id?: number;

  legacy_client_steam_id?: string;

  my_timestamp?: string;

  ping_est_ms?: number;

  routing_secret?: string;

  virtual_port?: number;
}

export interface CMsgSteamDatagramConnectOK {
  cert?: CMsgSteamDatagramCertificateSigned;

  client_connection_id?: number;

  crypt?: CMsgSteamDatagramSessionCryptInfoSigned;

  delay_time_usec?: number;

  gameserver_relay_session_id?: number;

  server_connection_id?: number;

  your_timestamp?: string;
}

export interface CMsgSteamNetworkingP2PSDRRoutingSummary {
  best_ping?: number;

  best_ping_front_local?: number;

  best_ping_front_remote?: number;

  best_pop_local?: number;

  best_pop_remote?: number;

  best_score?: number;

  best_time?: number;

  initial_ping?: number;

  initial_ping_front_local?: number;

  initial_ping_front_remote?: number;

  initial_pop_local?: number;

  initial_pop_remote?: number;

  initial_score?: number;

  negotiation_ms?: number;

  selected_seconds?: number;
}

export interface CMsgSteamDatagramP2PRoutingSummary {
  ice?: CMsgSteamNetworkingICESessionSummary;

  sdr?: CMsgSteamNetworkingP2PSDRRoutingSummary;
}

export interface CMsgSteamDatagramConnectionClosed {
  debug?: string;

  forward_target_relay_routing_token?: Uint8Array;

  forward_target_revision?: number;

  from_connection_id?: number;

  from_identity_string?: string;

  from_relay_session_id?: number;

  legacy_from_identity_binary?: CMsgSteamNetworkingIdentityLegacyBinary;

  legacy_from_steam_id?: string;

  legacy_gameserver_relay_session_id?: number;

  not_primary_session?: boolean;

  not_primary_transport?: boolean;

  p2p_routing_summary?: CMsgSteamDatagramP2PRoutingSummary;

  quality_e2e?: CMsgSteamDatagramConnectionQuality;

  quality_relay?: CMsgSteamDatagramConnectionQuality;

  reason_code?: number;

  relay_mode?: CMsgSteamDatagramConnectionClosed_RelayMode;

  relay_override_active?: boolean;

  routing_secret?: string;

  to_connection_id?: number;

  to_relay_session_id?: number;
}

export enum CMsgSteamDatagramConnectionClosed_RelayMode {
  None = 0,
  EndToEnd = 1,
  ClosedByPeer = 2,
}

export interface CMsgSteamDatagramNoConnection {
  dummy_pad?: number;

  end_to_end?: boolean;

  from_connection_id?: number;

  from_identity_string?: string;

  from_relay_session_id?: number;

  legacy_from_steam_id?: string;

  legacy_gameserver_relay_session_id?: number;

  not_primary_session?: boolean;

  not_primary_transport?: boolean;

  p2p_routing_summary?: CMsgSteamDatagramP2PRoutingSummary;

  quality_e2e?: CMsgSteamDatagramConnectionQuality;

  quality_relay?: CMsgSteamDatagramConnectionQuality;

  relay_override_active?: boolean;

  routing_secret?: string;

  to_connection_id?: number;

  to_relay_session_id?: number;
}

export interface CMsgSteamDatagramGameserverSessionRequest {
  build?: string;

  challenge?: string;

  challenge_time?: number;

  client_connection_id?: number;

  dev_client_cert?: CMsgSteamDatagramCertificateSigned;

  dev_gameserver_identity?: string;

  network_config_version?: number;

  platform?: string;

  protocol_version?: number;

  server_connection_id?: number;

  ticket?: Uint8Array;
}

export interface CMsgSteamDatagramGameserverSessionEstablished {
  connection_id?: number;

  dummy_legacy_identity_binary?: Uint8Array;

  gameserver_identity_string?: string;

  legacy_gameserver_steamid?: string;

  seconds_until_shutdown?: number;

  seq_num_r2c?: number;
}

export interface CMsgSteamDatagramConnectionStatsClientToRouter {
  ack_relay?: number[];

  client_connection_id?: number;

  flags?: number;

  legacy_ack_e2e?: number[];

  quality_e2e?: CMsgSteamDatagramConnectionQuality;

  quality_relay?: CMsgSteamDatagramConnectionQuality;

  seq_num_c2r?: number;

  seq_num_e2e?: number;
}

export enum CMsgSteamDatagramConnectionStatsClientToRouter_Flags {
  ACK_REQUEST_RELAY = 1,
  ACK_REQUEST_E2E = 2,
  ACK_REQUEST_IMMEDIATE = 4,
  NOT_PRIMARY_SESSION = 8,
  CLIENT_RELAY_OVERRIDE = 32,
}

export interface CMsgSteamDatagramConnectionStatsRouterToClient {
  ack_relay?: number[];

  client_connection_id?: number;

  flags?: number;

  legacy_ack_e2e?: number[];

  migrate_request_ip?: number;

  migrate_request_port?: number;

  quality_e2e?: CMsgSteamDatagramConnectionQuality;

  quality_relay?: CMsgSteamDatagramConnectionQuality;

  scoring_penalty_relay_cluster?: number;

  seconds_until_shutdown?: number;

  seq_num_e2e?: number;

  seq_num_r2c?: number;
}

export enum CMsgSteamDatagramConnectionStatsRouterToClient_Flags {
  ACK_REQUEST_RELAY = 1,
  ACK_REQUEST_E2E = 2,
  ACK_REQUEST_IMMEDIATE = 4,
}

export interface CMsgSteamDatagramConnectionStatsRouterToServer {
  ack_relay?: number[];

  client_connection_id?: number;

  client_identity_string?: string;

  flags?: number;

  legacy_ack_e2e?: number[];

  legacy_client_steam_id?: string;

  quality_e2e?: CMsgSteamDatagramConnectionQuality;

  quality_relay?: CMsgSteamDatagramConnectionQuality;

  relay_session_id?: number;

  routing_secret?: string;

  seq_num_e2e?: number;

  seq_num_r2s?: number;

  server_connection_id?: number;
}

export enum CMsgSteamDatagramConnectionStatsRouterToServer_Flags {
  ACK_REQUEST_RELAY = 1,
  ACK_REQUEST_E2E = 2,
  ACK_REQUEST_IMMEDIATE = 4,
}

export interface CMsgSteamDatagramConnectionStatsServerToRouter {
  ack_relay?: number[];

  client_connection_id?: number;

  flags?: number;

  legacy_ack_e2e?: number[];

  quality_e2e?: CMsgSteamDatagramConnectionQuality;

  quality_relay?: CMsgSteamDatagramConnectionQuality;

  relay_session_id?: number;

  seq_num_e2e?: number;

  seq_num_s2r?: number;

  server_connection_id?: number;
}

export enum CMsgSteamDatagramConnectionStatsServerToRouter_Flags {
  ACK_REQUEST_RELAY = 1,
  ACK_REQUEST_E2E = 2,
  ACK_REQUEST_IMMEDIATE = 4,
}

export interface CMsgSteamDatagramP2PSessionRequestBody {
  build?: string;

  challenge?: string;

  challenge_time?: number;

  client_connection_id?: number;

  encrypted_data?: Uint8Array;

  encryption_my_ephemeral_public_key?: Uint8Array;

  encryption_your_public_key_lead_byte?: number;

  legacy_peer_steam_id?: string;

  network_config_version?: number;

  peer_connection_id?: number;

  peer_identity_string?: string;

  platform?: string;

  protocol_version?: number;
}

export interface CMsgSteamDatagramP2PSessionRequestBody_EncryptedData {
  peer_identity_string?: string;
}

export interface CMsgSteamDatagramP2PSessionRequest {
  body?: Uint8Array;

  cert?: CMsgSteamDatagramCertificateSigned;

  signature?: Uint8Array;
}

export interface CMsgSteamDatagramP2PSessionEstablished {
  connection_id?: number;

  relay_routing_token?: Uint8Array;

  seconds_until_shutdown?: number;

  seq_num_r2c?: number;
}

export interface CMsgSteamDatagramConnectionStatsP2PClientToRouter {
  ack_peer_routes_revision?: number;

  ack_relay?: number[];

  connection_id?: number;

  flags?: number;

  forward_target_relay_routing_token?: Uint8Array;

  forward_target_revision?: number;

  legacy_ack_e2e?: number[];

  p2p_routing_summary?: CMsgSteamDatagramP2PRoutingSummary;

  quality_e2e?: CMsgSteamDatagramConnectionQuality;

  quality_relay?: CMsgSteamDatagramConnectionQuality;

  routes?: Uint8Array;

  seq_num_c2r?: number;

  seq_num_e2e?: number;
}

export enum CMsgSteamDatagramConnectionStatsP2PClientToRouter_Flags {
  ACK_REQUEST_RELAY = 1,
  ACK_REQUEST_E2E = 2,
  ACK_REQUEST_IMMEDIATE = 4,
  NOT_PRIMARY_SESSION = 8,
  NOT_PRIMARY_TRANSPORT_E2E = 16,
  CLIENT_RELAY_OVERRIDE = 32,
}

export interface CMsgSteamDatagramConnectionStatsP2PRouterToClient {
  ack_forward_target_revision?: number;

  ack_peer_routes_revision?: number;

  ack_relay?: number[];

  connection_id?: number;

  flags?: number;

  legacy_ack_e2e?: number[];

  migrate_request_ip?: number;

  migrate_request_port?: number;

  quality_e2e?: CMsgSteamDatagramConnectionQuality;

  quality_relay?: CMsgSteamDatagramConnectionQuality;

  routes?: Uint8Array;

  scoring_penalty_relay_cluster?: number;

  seconds_until_shutdown?: number;

  seq_num_e2e?: number;

  seq_num_r2c?: number;
}

export enum CMsgSteamDatagramConnectionStatsP2PRouterToClient_Flags {
  ACK_REQUEST_RELAY = 1,
  ACK_REQUEST_E2E = 2,
  ACK_REQUEST_IMMEDIATE = 4,
  NOT_PRIMARY_TRANSPORT_E2E = 16,
}

export interface CMsgSteamDatagramP2PBadRouteRouterToClient {
  ack_forward_target_revision?: number;

  connection_id?: number;

  failed_relay_routing_token?: Uint8Array;

  kludge_pad?: string;
}

export interface CMsgSteamDatagramP2PRoutes {
  relay_clusters?: CMsgSteamDatagramP2PRoutes_RelayCluster[];

  revision?: number;

  routes?: CMsgSteamDatagramP2PRoutes_Route[];
}

export interface CMsgSteamDatagramP2PRoutes_RelayCluster {
  ping_ms?: number;

  pop_id?: number;

  score_penalty?: number;

  session_relay_routing_token?: Uint8Array;
}

export interface CMsgSteamDatagramP2PRoutes_Route {
  interior_score?: number;

  legacy_score?: number;

  my_pop_id?: number;

  your_pop_id?: number;
}

export interface CMsgSteamDatagramSetSecondaryAddressRequest {
  client_connection_id?: number;

  client_identity?: string;

  client_main_ip?: number;

  client_main_port?: number;

  kludge_pad?: Uint8Array;

  request_send_duplication?: boolean;
}

export interface CMsgSteamDatagramSetSecondaryAddressResult {
  message?: string;

  success?: boolean;
}

export enum SteamDatagramMsgID {
  ESteamDatagramMsg_Invalid = 0,
  ESteamDatagramMsg_RouterPingRequest = 1,
  ESteamDatagramMsg_RouterPingReply = 2,
  ESteamDatagramMsg_GameserverPingRequest = 3,
  ESteamDatagramMsg_GameserverSessionRequest = 5,
  ESteamDatagramMsg_GameserverSessionEstablished = 6,
  ESteamDatagramMsg_NoSession = 7,
  ESteamDatagramMsg_Diagnostic = 8,
  ESteamDatagramMsg_DataClientToRouter = 9,
  ESteamDatagramMsg_DataRouterToServer = 10,
  ESteamDatagramMsg_DataServerToRouter = 11,
  ESteamDatagramMsg_DataRouterToClient = 12,
  ESteamDatagramMsg_Stats = 13,
  ESteamDatagramMsg_ClientPingSampleRequest = 14,
  ESteamDatagramMsg_ClientPingSampleReply = 15,
  ESteamDatagramMsg_ClientToRouterSwitchedPrimary = 16,
  ESteamDatagramMsg_RelayHealth = 17,
  ESteamDatagramMsg_ConnectRequest = 18,
  ESteamDatagramMsg_ConnectOK = 19,
  ESteamDatagramMsg_ConnectionClosed = 20,
  ESteamDatagramMsg_NoConnection = 21,
  ESteamDatagramMsg_TicketDecryptRequest = 22,
  ESteamDatagramMsg_TicketDecryptReply = 23,
  ESteamDatagramMsg_P2PSessionRequest = 24,
  ESteamDatagramMsg_P2PSessionEstablished = 25,
  ESteamDatagramMsg_P2PStatsClient = 26,
  ESteamDatagramMsg_P2PStatsRelay = 27,
  ESteamDatagramMsg_P2PBadRoute = 28,
  ESteamDatagramMsg_GameserverPingReply = 29,
  ESteamDatagramMsg_LegacyGameserverRegistration = 30,
  ESteamDatagramMsg_SetSecondaryAddressRequest = 31,
  ESteamDatagramMsg_SetSecondaryAddressResult = 32,
  ESteamDatagramMsg_RelayToRelayPingRequest = 33,
  ESteamDatagramMsg_RelayToRelayPingReply = 34,
}
