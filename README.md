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

`steam-types` provides global type declarations for `SteamClient` and the other Steam window globals (`App`, `appStore`, `appDetailsStore`, `LocalizationManager`, `SteamUIStore`, `NotificationStore`, …).

If you also depend on `@steambrew/client`, both packages declare some of the same globals. `steam-types` ships a `global-overrides.d.ts` that re-declares them so its types take precedence. To apply it, add that file to the **`files`** array of your `tsconfig.json`:

```jsonc
{
  "files": ["node_modules/steam-types/global-overrides.d.ts"]
}
```

#### Directory-scoped projects (e.g. Millennium)

Millennium plugins split their code across `frontend/` and `webkit/` directories. In that case, drop a small tsconfig inside each directory that extends your root config and adds the override, so it stays scoped to that directory:

```jsonc
// frontend/tsconfig.json  (and the same in webkit/tsconfig.json)
{
  "extends": "../tsconfig.json",
  "files": ["../node_modules/steam-types/global-overrides.d.ts"]
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

### Useful Commands for generating types

Fill a lot of data:
```javascript
fillAppData();
```

map an app details value:
```javascript
[...appDetailsStore.m_mapAppData.values()].map(data => {return {value: data.details?.eCloudSync, name: data.details?.strDisplayName}}).filter(d => d.value !== undefined)
```

Profile a script:
```
tsx --cpu-prof --cpu-prof-dir .profiler --no-warnings scripts/convert-to-typescript/index.ts
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
