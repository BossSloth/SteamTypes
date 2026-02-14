import { CMsgSteamDatagramCertificateSigned } from './steamnetworkingsockets_messages_certs';

export interface CMsgSteamDatagramSessionCryptInfo {
  ciphers?: SteamNetworkingSocketsCipher[];

  key_data?: Uint8Array;

  key_type?: CMsgSteamDatagramSessionCryptInfo_KeyType;

  nonce?: string;

  protocol_version?: number;
}

export enum CMsgSteamDatagramSessionCryptInfo_KeyType {
  INVALID = 0,
  CURVE25519 = 1,
}

export interface CMsgSteamDatagramSessionCryptInfoSigned {
  info?: Uint8Array;

  signature?: Uint8Array;
}

export interface CMsgSteamDatagramDiagnostic {
  severity?: number;

  text?: string;
}

export interface CMsgSteamDatagramLinkInstantaneousStats {
  in_bytes_per_sec?: number;

  in_packets_per_sec_x10?: number;

  out_bytes_per_sec?: number;

  out_packets_per_sec_x10?: number;

  packets_dropped_pct?: number;

  packets_weird_sequence_pct?: number;

  peak_jitter_usec?: number;

  ping_ms?: number;
}

export interface CMsgSteamDatagramLinkLifetimeStats {
  connected_seconds?: number;

  jitter_histogram_1?: number;

  jitter_histogram_10?: number;

  jitter_histogram_2?: number;

  jitter_histogram_20?: number;

  jitter_histogram_5?: number;

  jitter_histogram_negligible?: number;

  kb_recv?: number;

  kb_sent?: number;

  multipath_packets_recv_later?: number[];

  multipath_packets_recv_sequenced?: number[];

  multipath_send_enabled?: number;

  packets_recv?: number;

  packets_recv_dropped?: number;

  packets_recv_duplicate?: number;

  packets_recv_lurch?: number;

  packets_recv_out_of_order?: number;

  packets_recv_out_of_order_corrected?: number;

  packets_recv_sequenced?: number;

  packets_sent?: number;

  ping_histogram_100?: number;

  ping_histogram_125?: number;

  ping_histogram_150?: number;

  ping_histogram_200?: number;

  ping_histogram_25?: number;

  ping_histogram_300?: number;

  ping_histogram_50?: number;

  ping_histogram_75?: number;

  ping_histogram_max?: number;

  ping_ntile_50th?: number;

  ping_ntile_5th?: number;

  ping_ntile_75th?: number;

  ping_ntile_95th?: number;

  ping_ntile_98th?: number;

  quality_histogram_1?: number;

  quality_histogram_100?: number;

  quality_histogram_50?: number;

  quality_histogram_75?: number;

  quality_histogram_90?: number;

  quality_histogram_95?: number;

  quality_histogram_97?: number;

  quality_histogram_99?: number;

  quality_histogram_dead?: number;

  quality_ntile_25th?: number;

  quality_ntile_2nd?: number;

  quality_ntile_50th?: number;

  quality_ntile_5th?: number;
}

export interface CMsgSteamDatagramConnectionQuality {
  instantaneous?: CMsgSteamDatagramLinkInstantaneousStats;

  lifetime?: CMsgSteamDatagramLinkLifetimeStats;
}

export interface CMsgICECandidate {
  candidate?: string;
}

export interface CMsgICERendezvous {
  add_candidate?: CMsgICECandidate;

  auth?: CMsgICERendezvous_Auth;
}

export interface CMsgICERendezvous_Auth {
  pwd_frag?: string;
}

export interface CMsgSteamNetworkingP2PRendezvous {
  ack_peer_routes_revision?: number;

  ack_reliable_msg?: number;

  application_messages?: CMsgSteamNetworkingP2PRendezvous_ApplicationMessage[];

  connect_ok?: CMsgSteamNetworkingP2PRendezvous_ConnectOK;

  connect_request?: CMsgSteamNetworkingP2PRendezvous_ConnectRequest;

  connection_closed?: CMsgSteamNetworkingP2PRendezvous_ConnectionClosed;

  first_reliable_msg?: number;

  from_connection_id?: number;

  from_identity?: string;

  hosted_server_ticket?: Uint8Array;

  ice_enabled?: boolean;

  reliable_messages?: CMsgSteamNetworkingP2PRendezvous_ReliableMessage[];

  sdr_routes?: Uint8Array;

  to_connection_id?: number;

  to_identity?: string;
}

export interface CMsgSteamNetworkingP2PRendezvous_ConnectRequest {
  cert?: CMsgSteamDatagramCertificateSigned;

  crypt?: CMsgSteamDatagramSessionCryptInfoSigned;

  from_fakeip?: string;

  from_virtual_port?: number;

  to_virtual_port?: number;
}

export interface CMsgSteamNetworkingP2PRendezvous_ConnectOK {
  cert?: CMsgSteamDatagramCertificateSigned;

  crypt?: CMsgSteamDatagramSessionCryptInfoSigned;
}

export interface CMsgSteamNetworkingP2PRendezvous_ConnectionClosed {
  debug?: string;

  reason_code?: number;
}

export interface CMsgSteamNetworkingP2PRendezvous_ReliableMessage {
  ice?: CMsgICERendezvous;
}

export interface CMsgSteamNetworkingP2PRendezvous_ApplicationMessage {
  data?: Uint8Array;

  flags?: number;

  lane_idx?: number;

  msg_num?: number;
}

export interface CMsgSteamNetworkingICESessionSummary {
  best_ping?: number;

  best_route_kind?: number;

  best_score?: number;

  best_time?: number;

  failure_reason_code?: number;

  ice_enable_var?: number;

  initial_ping?: number;

  initial_route_kind?: number;

  initial_score?: number;

  local_candidate_types?: number;

  local_candidate_types_allowed?: number;

  negotiation_ms?: number;

  remote_candidate_types?: number;

  selected_seconds?: number;

  user_settings?: number;
}

export enum SteamNetworkingSocketsCipher {
  INVALID = 0,
  NULL = 1,
  AES_256_GCM = 2,
}
