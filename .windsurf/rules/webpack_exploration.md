---
trigger: model_decision
description: This guide explains how to explore the Steam client's webpack chunk files to find modules and understand what exports are being used. For example for chunk~2dcc5aaf
---

# Exploring Webpack Chunk Files

This guide explains how to explore the Steam client's webpack chunk files to find modules and understand what exports are being used.

## Overview

Steam's client uses webpack to bundle JavaScript modules. The chunk files (e.g., `chunk~2dcc5aaf7.js`) contain numerous modules identified by numeric IDs called "bundles".

## Finding a Specific Module/Bundle

### 1. Search for the Bundle ID

To find a specific bundle (e.g., bundle `22588`), search for the bundle ID followed by a colon:

```
Search pattern: 22588:
```

This will locate the module definition line, which looks like:
```javascript
22588: (e, t, r) => {
  "use strict";
  r.d(t, { Fc: () => v, Ni: () => S, SX: () => B, kh: () => b });
  // ... module code
```

### 2. Understanding the Export Mapping

The `r.d(t, { ... })` line defines what this module exports:
- **Left side** (e.g., `SX`): The export name that other modules use when importing
- **Right side** (e.g., `B`): The internal variable name within this module

Example:
```javascript
r.d(t, { Fc: () => v, Ni: () => S, SX: () => B, kh: () => b });
```

This means:
- Export `Fc` maps to internal variable `v`
- Export `Ni` maps to internal variable `S`
- Export `SX` maps to internal variable `B` (the main class in this case)
- Export `kh` maps to internal constant `b`

### 3. Reading the Module Code

Once you've identified the internal variable name, read through the module code to find:
- Class definitions (e.g., `class B { ... }`)
- Function definitions
- Constants and exports

## Example Workflow

**Goal:** Find and understand the `SX` export from bundle 22588

1. **Search**: `grep "22588:"` in the chunk file
   - Found at line 91324

2. **Identify exports**:
   ```javascript
   r.d(t, { Fc: () => v, Ni: () => S, SX: () => B, kh: () => b });
   ```
   - `SX` is exported as internal class `B`

3. **Read the code**: Starting from line 91346
   ```javascript
   class B {
     constructor() { ... }
     m_bInitialized = !1;
     m_rgListeners = [];
     // ... methods and properties
   ```

4. **Analyze**: The class `B` (exported as `SX`) is a Timeline Loader that manages game recording timelines, clips, and playback.

## File Size Considerations
- For larger files or distant line numbers, read in chunks using offset and limit parameters

## Tips for Type Generation

When extracting types from these webpack modules:

1. Look for class properties (e.g., `m_bInitialized`, `m_rgListeners`)
2. Identify method signatures and their parameters
3. Track return types from method implementations
4. Note any enums or constants defined in the module
5. Check for interfaces or type definitions used within the class

## Common Patterns

- **Module parameters**: `(e, t, r)` typically represents `(exports, module, require)`
- **Dependencies**: `var n = r(34629)` imports module 34629. `n.Xs` would be the export `Xs` from module 34629.
