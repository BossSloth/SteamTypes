#!/bin/bash

# Extract Steam version and build date from system-information.ts
VERSION=$(grep -oP 'nSteamVersion: \K\d+' src/types/system-information.ts)
DATE=$(grep -oP "sSteamBuildDate: '\K[^']+" src/types/system-information.ts)

# Generate and output the commit message
echo "feat(types): Updated all types for steam version $VERSION ($DATE)"
