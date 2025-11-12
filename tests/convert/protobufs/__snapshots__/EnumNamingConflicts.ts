export interface StoreBrowseFilterFailure {
  failed?: boolean;

  filter_name?: string;
}

export enum EStoreBrowseFilterFailure {
  STORE_BROWSE_FILTER_FAILURE_NONE = 0,
  STORE_BROWSE_FILTER_FAILURE_REDUNDANT = 1,
}

export enum StoreLinkType {
  STORE_LINK_TYPE_NONE = 0,
  STORE_LINK_TYPE_YOUTUBE = 1,
}

export enum StoreCategoryType {
  STORE_CATEGORY_TYPE_CATEGORY = 0,
  STORE_CATEGORY_TYPE_FEATURE = 1,
}

export enum WindowStackingOrder {
  Invalid = 0,
  Top = 1,
  Bottom = 2,
}

export enum BluetoothDeviceType {
  Invalid = 0,
  Unknown = 1,
  Phone = 2,
}
