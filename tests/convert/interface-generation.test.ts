import { createInterfaceDefinition } from '@Convert/interface-generation';
import { context, initContext } from '@Convert/utils';
import { Project } from 'ts-morph';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('createInterfaceDefinition', () => {
  let project: Project;

  beforeEach(() => {
    project = new Project({ useInMemoryFileSystem: true });
    initContext('TestInterface');
    // Reset the order counter by reimporting or by clearing the context
    context.interfaceDefinitions.clear();
  });

  it('logs an error and returns early when duplicate interface name is provided', () => {
    const interfaceName = 'TestInterface';
    const interfaceToProcess = {
      obj: { prop1: 'value1' },
    };

    const consoleErrorSpy = vi.spyOn(console, 'error').mockReturnValue(undefined);

    // First call should succeed
    createInterfaceDefinition(interfaceName, interfaceToProcess, project);
    expect(context.interfaceDefinitions.has(interfaceName)).toBe(true);
    expect(consoleErrorSpy).not.toHaveBeenCalled();

    // Second call with the same name should log error and not create duplicate
    createInterfaceDefinition(interfaceName, interfaceToProcess, project);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `❌ Error: duplicate interface name?: ${interfaceName}`,
      interfaceToProcess.obj,
    );
    // Should still only have one entry
    expect(context.interfaceDefinitions.size).toBe(1);

    consoleErrorSpy.mockRestore();
  });

  it('creates interface definition successfully for unique names', () => {
    const interfaceName1 = 'TestInterface1';
    const interfaceName2 = 'TestInterface2';
    const interfaceToProcess = {
      obj: { prop1: 'value1' },
    };

    const consoleErrorSpy = vi.spyOn(console, 'error').mockReturnValue(undefined);

    createInterfaceDefinition(interfaceName1, interfaceToProcess, project);
    createInterfaceDefinition(interfaceName2, interfaceToProcess, project);

    expect(context.interfaceDefinitions.has(interfaceName1)).toBe(true);
    expect(context.interfaceDefinitions.has(interfaceName2)).toBe(true);
    expect(context.interfaceDefinitions.size).toBe(2);
    expect(consoleErrorSpy).not.toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });
});
