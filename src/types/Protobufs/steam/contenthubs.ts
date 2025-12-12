export interface CStorePageFilter {
  content_hub_filter?: CStorePageFilter_ContentHubFilter;

  sale_filter?: CStorePageFilter_SalePageFilter;

  store_filters?: CStorePageFilter_StoreFilter[];
}

export interface CStorePageFilter_SalePageFilter {
  creator_clan_account_id?: number;

  sale_tagid?: number;
}

export interface CStorePageFilter_ContentHubFilter {
  discount_filter?: ContentHubDiscountFilterType;

  hub_category?: string;

  hub_tagid?: number;

  hub_type?: string;

  optin?: CStorePageFilter_ContentHubFilter_OptInInfo;
}

export interface CStorePageFilter_ContentHubFilter_OptInInfo {
  name?: string;

  optin_only?: boolean;

  optin_tagid?: number;

  prune_tagid?: number;
}

export interface CStorePageFilter_StoreFilter {
  cache_key?: string;

  filter_json?: string;
}

export enum ContentHubDiscountFilterType {
  None = 0,
  DiscountsOnly = 1,
  PrioritizeDiscounts = 2,
}
