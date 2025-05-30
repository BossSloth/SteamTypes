/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
declare const collectionStore: any;
declare const appDetailsStore: any;
declare const StoreItemCache: any;
declare const appActivityStore: any;

async function fillAppDetails(): Promise<void> {
  const apps = collectionStore.allAppsCollection.m_rgApps.filter(appId => appId);
  const time = Date.now();

  await Promise.all(apps.map(async (appId) => {
    await appDetailsStore.RequestAppDetails(appId);

    const storeItemCachePromises: Promise<void>[] = [];
    for (let i = 0; i < 6; i++) {
      if (i === 3) continue;

      storeItemCachePromises.push(StoreItemCache.QueueStoreItemRequest(appId, i, {
        include_assets: true,
        include_release: true,
        include_platforms: true,
        include_all_purchase_options: true,
        include_screenshots: true,
        include_trailers: true,
        include_ratings: true,
        include_tag_count: true,
        include_reviews: true,
        include_basic_info: true,
        include_supported_languages: true,
        include_full_description: true,
        include_included_items: true,
        include_assets_without_overrides: true,
        apply_user_filters: true,
        include_links: true,
      }));
    }

    return Promise.all([
      appDetailsStore.RequestAchievements(appId),
      appDetailsStore.RequestAssociationData(appId),
      appDetailsStore.RequestDescriptionsData(appId),
      appDetailsStore.RequestCustomImageInfo({ appid: appId, rt_custom_image_mtime: time }),
      appDetailsStore.RequestAppDetailsSpotlight(appId),
      appActivityStore.RestoreActivity(appId),
      ...storeItemCachePromises,
    ]);
  }));
}

function fillWrapper(): void {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  fillAppDetails().then(() => {
    console.log('All app details loaded');
  });
}

globalThis.fillAppData = fillWrapper;

export default fillWrapper;
