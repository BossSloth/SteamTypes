export interface CMsgSteamNetworkingIdentityLegacyBinary {
  generic_bytes?: Uint8Array;

  generic_string?: string;

  ipv6_and_port?: Uint8Array;

  steam_id?: string;
}

export interface CMsgSteamDatagramCertificate {
  app_ids?: number[];

  gameserver_datacenter_ids?: number[];

  identity_string?: string;

  ip_addresses?: string[];

  key_data?: Uint8Array;

  key_type?: CMsgSteamDatagramCertificate_KeyType;

  legacy_identity_binary?: CMsgSteamNetworkingIdentityLegacyBinary;

  legacy_steam_id?: string;

  time_created?: number;

  time_expiry?: number;
}

export enum CMsgSteamDatagramCertificate_KeyType {
  INVALID = 0,
  ED25519 = 1,
}

export interface CMsgSteamDatagramCertificateSigned {
  ca_key_id?: string;

  ca_signature?: Uint8Array;

  cert?: Uint8Array;

  private_key_data?: Uint8Array;
}

export interface CMsgSteamDatagramCertificateRequest {
  cert?: CMsgSteamDatagramCertificate;
}
