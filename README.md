# Steam Client TypeScript Definitions

> [!IMPORTANT]
> This project is not yet finished. Expect major breaking changes if you decide to use it.

TypeScript type definitions for the Steam client window objects.

## Installation

```bash
npm install steam-types
# or
pnpm add steam-types
```


## Useful command
Fill the app details cache with the first 100 apps
```javascript
collectionStore.allAppsCollection.m_rgApps.slice(0, 100).forEach(item => appDetailsCache.FetchDataForApp(item))
```