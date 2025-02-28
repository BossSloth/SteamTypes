#!/usr/bin/env bun
/**
 * Interface Checker Script
 * 
 * This script compares an interface definition with its actual implementation
 * to identify added or removed functions/properties.
 * 
 * Usage:
 *   bun interface-checker.ts <interface-file> <interface-name>
 * 
 * Example:
 *   bun interface-checker.ts src/SteamClient/App.ts Apps
 */

import fs from 'fs';
import ts from 'typescript';

// Function to parse TypeScript file and extract interface members
function extractInterfaceMembers(filePath: string, interfaceName: string): string[] {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const sourceFile = ts.createSourceFile(
    filePath,
    fileContent,
    ts.ScriptTarget.Latest,
    true
  );

  const members: string[] = [];

  function visit(node: ts.Node) {
    if (
      ts.isInterfaceDeclaration(node) &&
      node.name.text === interfaceName
    ) {
      node.members.forEach((member) => {
        if (ts.isPropertySignature(member) || ts.isMethodSignature(member)) {
          if (member.name && ts.isIdentifier(member.name)) {
            members.push(member.name.text);
          }
        }
      });
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  
  return members;
}

// Function to parse an interface string and extract member names
function extractMembersFromString(interfaceString: string): string[] {
  const lines = interfaceString.split('\n');
  const members: string[] = [];

  for (const line of lines) {
    // Match property or method name before a colon or parenthesis
    const match = line.match(/^\s*([a-zA-Z0-9_]+)[\s:(/]/);
    if (match && match[1]) {
      members.push(match[1]);
    }
  }

  return members;
}

// Main function to compare interfaces
function compareInterfaces(
  filePath: string, 
  interfaceName: string, 
  providedInterfaceString: string
): void {
  // Extract members from the actual file
  const actualMembers = extractInterfaceMembers(filePath, interfaceName);
  
  // Extract members from the provided interface string
  const providedMembers = extractMembersFromString(providedInterfaceString);

  // Find added members (in actual but not in provided)
  const addedMembers = actualMembers.filter(
    (member) => !providedMembers.includes(member)
  );

  // Find removed members (in provided but not in actual)
  const removedMembers = providedMembers.filter(
    (member) => !actualMembers.includes(member)
  );

  // Print results
  console.log(`\n=== Interface Comparison for ${interfaceName} ===\n`);
  
  console.log(`Total members in actual file: ${actualMembers.length}`);
  console.log(`Total members in provided interface: ${providedMembers.length}\n`);

  if (addedMembers.length > 0) {
    console.log('Members added in actual file but missing in provided interface:');
    addedMembers.forEach((member) => console.log(`  - ${member}`));
    console.log('');
  } else {
    console.log('No members added in actual file.\n');
  }

  if (removedMembers.length > 0) {
    console.log('Members in provided interface but missing in actual file:');
    removedMembers.forEach((member) => console.log(`  - ${member}`));
    console.log('');
  } else {
    console.log('No members removed from actual file.\n');
  }

  if (addedMembers.length === 0 && removedMembers.length === 0) {
    console.log('✅ The interfaces match perfectly!');
  } else {
    console.log('⚠️ The interfaces have differences that need to be addressed.');
  }
}

// Command-line interface
function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 3) {
    console.error('Usage: bun interface-checker.ts <interface-file> <interface-name> [interface-string-file]');
    process.exit(1);
  }

  const filePath = args[0];
  const interfaceName = args[1];
  let interfaceString = fs.readFileSync(args[2], 'utf-8');

  compareInterfaces(filePath, interfaceName, interfaceString);
}

// Check if this script is being run directly
if (require.main === module) {
  main();
}

export { compareInterfaces, extractInterfaceMembers, extractMembersFromString };
