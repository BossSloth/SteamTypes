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

Fill the app details cache with the first 500 apps:
```javascript
collectionStore.allAppsCollection.m_rgApps.slice(0, 500).forEach(item => appDetailsCache.FetchDataForApp(item))
collectionStore.allAppsCollection.m_rgApps.slice(0, 500).forEach(item => appDetailsStore.GetAppDetails(item))
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
