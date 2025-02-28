# Interface Checker Scripts

This directory contains scripts to help compare TypeScript interface definitions with their actual implementations, making it easier to identify added or removed functions/properties.

## Prerequisites

- [Bun](https://bun.sh/) or Node.js installed
- TypeScript installed (included in the project's devDependencies)

## Available Scripts

### 1. `interface-checker.ts`

The core script that compares an interface definition with its actual implementation.

**Usage:**
```bash
bun interface-checker.ts <interface-file> <interface-name> [interface-string-file]
```

**Example:**
```bash
# Compare with a file containing the interface definition
bun interface-checker.ts src/SteamClient/App.ts Apps interface-definition.ts

# Or paste the interface definition interactively
bun interface-checker.ts src/SteamClient/App.ts Apps
```

### 2. `check-apps-interface.ts`

A specific wrapper for checking the `Apps` interface from `SteamClient/App.ts`.

**Usage:**
```bash
bun check-apps-interface.ts [interface-string-file]
```

### 3. `run-apps-check.ps1`

A PowerShell script that runs the check for the `Apps` interface using a predefined interface definition.

**Usage:**
```powershell
.\run-apps-check.ps1
```

### 4. `check-interface.ps1`

A generic PowerShell script that can check any interface against its implementation.

**Usage:**
```powershell
.\check-interface.ps1 -InterfaceFile "path/to/file.ts" -InterfaceName "InterfaceName" -InterfaceDefinition "interface definition"
```

## Example Workflow

1. **Check the Apps interface:**
   ```powershell
   .\run-apps-check.ps1
   ```

2. **Check a custom interface:**
   ```powershell
   $interfaceDefinition = @'
   export interface MyInterface {
       method1: any;
       method2: any;
   }
   '@

   .\check-interface.ps1 -InterfaceFile "src/path/to/file.ts" -InterfaceName "MyInterface" -InterfaceDefinition $interfaceDefinition
   ```

3. **Interactive usage:**
   ```bash
   bun interface-checker.ts src/SteamClient/App.ts Apps
   # Then paste your interface definition and press Ctrl+D
   ```

## Output

The scripts will output:
- Total members in both interfaces
- Members added in the actual file but missing in the provided interface
- Members in the provided interface but missing in the actual file
- A summary indicating whether the interfaces match perfectly or have differences
