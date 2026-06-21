import { InterfaceBuilder } from '@Convert/building/InterfaceBuilder';
import { ConversionSession } from '@Convert/session/ConversionSession';
import { Project } from 'ts-morph';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('createInterfaceDefinition', () => {
  let session: ConversionSession;
  let builder: InterfaceBuilder;

  beforeEach(() => {
    const project = new Project({ useInMemoryFileSystem: true });
    session = new ConversionSession([], project);
    builder = new InterfaceBuilder(session);
  });

  it('logs an error and returns early when duplicate interface name is provided', () => {
    const interfaceName = 'TestInterface';
    const interfaceToProcess = {
      obj: { prop1: 'value1' },
    };

    const consoleErrorSpy = vi.spyOn(console, 'error').mockReturnValue(undefined);

    // First call should succeed
    builder.createInterfaceDefinition(interfaceName, interfaceToProcess);
    expect(session.interfaceRepository.definitions.has(interfaceName)).toBe(true);
    expect(consoleErrorSpy).not.toHaveBeenCalled();

    // Second call with the same name should log error and not create duplicate
    builder.createInterfaceDefinition(interfaceName, interfaceToProcess);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `❌ Error: duplicate interface name?: ${interfaceName}`,
      interfaceToProcess.obj,
    );
    // Should still only have one entry
    expect(session.interfaceRepository.definitions.size).toBe(1);

    consoleErrorSpy.mockRestore();
  });

  it('creates interface definition successfully for unique names', () => {
    const interfaceName1 = 'TestInterface1';
    const interfaceName2 = 'TestInterface2';
    const interfaceToProcess = {
      obj: { prop1: 'value1' },
    };

    const consoleErrorSpy = vi.spyOn(console, 'error').mockReturnValue(undefined);

    builder.createInterfaceDefinition(interfaceName1, interfaceToProcess);
    builder.createInterfaceDefinition(interfaceName2, interfaceToProcess);

    expect(session.interfaceRepository.definitions.has(interfaceName1)).toBe(true);
    expect(session.interfaceRepository.definitions.has(interfaceName2)).toBe(true);
    expect(session.interfaceRepository.definitions.size).toBe(2);
    expect(consoleErrorSpy).not.toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });
});
