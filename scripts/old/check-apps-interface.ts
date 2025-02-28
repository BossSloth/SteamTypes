#!/usr/bin/env bun
/**
 * Check Apps Interface
 * 
 * This script is a specific wrapper for the interface-checker that checks
 * the Apps interface from SteamClient/App.ts against a provided interface definition.
 * 
 * Usage:
 *   bun check-apps-interface.ts [interface-string-file]
 */

import * as fs from 'fs';
import * as path from 'path';
import { compareInterfaces } from '../interface-checker';

// Default interface file path
const DEFAULT_INTERFACE_FILE = path.resolve(__dirname, '../src/SteamClient/App.ts');
const DEFAULT_INTERFACE_NAME = 'Apps';

function main() {
  const args = process.argv.slice(2);
  let interfaceString = '';

  // If a file is provided, read from that file
  if (args[0] && fs.existsSync(args[0])) {
    interfaceString = fs.readFileSync(args[0], 'utf-8');
    console.log(`Reading interface definition from: ${args[0]}`);
  } else {
    // Otherwise, read from stdin
    console.log('Please paste the Apps interface definition to compare (end with Ctrl+D):');
    const chunks: Buffer[] = [];
    let chunk;
    while (null !== (chunk = process.stdin.read())) {
      chunks.push(Buffer.from(chunk));
    }
    interfaceString = Buffer.concat(chunks).toString('utf-8');
  }

  compareInterfaces(DEFAULT_INTERFACE_FILE, DEFAULT_INTERFACE_NAME, interfaceString);
}

// Check if this script is being run directly
if (require.main === module) {
  main();
}
