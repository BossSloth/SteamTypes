# SteamTypes

> [!IMPORTANT]
> This project is not yet finished and is still in development. Expect major breaking changes if you decide to use it.

TypeScript type definitions for the Steam client window objects including SteamClient, UI components, and global objects.

## Installation

```bash
bun add -d steam-types
# or
pnpm add -D steam-types
```

### Usage
To override the global SteamClient type that may be provided by other packages like `@steambrew/client`, create a file called `overrides.d.ts` in your project root with the following content:

```typescript
import { SteamClient } from 'steam-types';

declare global {
  let SteamClient: SteamClient;
}
```

And add it to your `tsconfig.json` include:

```json
{
  "include": ["overrides.d.ts", "src/**/*"]
}
```

## Project Structure

This project consists of:
1. Generated TypeScript definitions in the `src/types` folder
2. Automation scripts in the `scripts` folder for generating and validating types see [Development](#development)

### Type Definitions

The type definitions cover the Steam client's global SharedJSContext window objects, including:
- `SteamClient` object and all its submodules (Apps, UI, System, etc.)
- All the other global objects (appDetailsStore, collectionStore, etc.)

## Development

### Scripts

The project includes scripts for:
- Converting runtime JS objects to TypeScript interfaces
- Comparing and validating the generated types against the actual Steam client
- Automating the type generation process

### Useful Commands

Fill the app details store with all apps:
```javascript
async function fillAppDetailsStore() {
  const apps = collectionStore.allAppsCollection.m_rgApps.filter(appId => appId);
  const time = Date.now()

  await Promise.all(apps.map(async (appId) => {
    await appDetailsStore.RequestAppDetails(appId);

    return Promise.all([
      appDetailsStore.RequestAchievements(appId),
      appDetailsStore.RequestAssociationData(appId),
      appDetailsStore.RequestDescriptionsData(appId),
      appDetailsStore.RequestCustomImageInfo({appid: appId, rt_custom_image_mtime: time}),
      appDetailsStore.RequestAppDetailsSpotlight(appId),
      appActivityStore.RestoreActivity(appId),
    ]);
  }));
}

fillAppDetailsStore().then(() => console.log('All app details loaded'));
```

map an app details value:
```javascript
[...appDetailsStore.m_mapAppData.values()].map(data => {return {value: data.details?.eCloudSync, name: data.details?.strDisplayName}}).filter(d => d.value !== undefined)
```

Profile a script:
```
tsx --cpu-prof --cpu-prof-dir .profiler --no-warnings scripts/convert-to-typescript/test.ts
```

### Type Validation

Run the type validation script to ensure definitions match the runtime objects:
```bash
bun validate-types
```

## Contributing

Contributions are welcome! Please follow the existing naming conventions and ensure all generated interfaces are properly exported.

## Special thanks
- [This decky pr](https://github.com/SteamDeckHomebrew/decky-frontend-lib/pull/92) for the initial SteamClient type definitions and the inspiration for this project.
