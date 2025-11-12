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
