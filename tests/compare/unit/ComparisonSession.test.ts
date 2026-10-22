import { Project } from 'ts-morph';
import { describe, expect, it } from 'vitest';
import { ComparisonSession } from '../../../scripts/compare/session/ComparisonSession';

describe('ComparisonSession', () => {
  it('dequeues pairs in FIFO order and then returns undefined', () => {
    const project = new Project({ useInMemoryFileSystem: true });
    const target = project.createSourceFile('target.ts', 'interface A {}\ninterface B {}');
    const source = project.createSourceFile('source.ts', 'interface A {}\ninterface B {}');
    const session = new ComparisonSession(target);

    session.enqueue(target.getInterfaceOrThrow('A'), source.getInterfaceOrThrow('A'));
    session.enqueue(target.getInterfaceOrThrow('B'), source.getInterfaceOrThrow('B'));

    expect(session.dequeue()?.targetInterface.getName()).toBe('A');
    expect(session.dequeue()?.targetInterface.getName()).toBe('B');
    expect(session.dequeue()).toBeUndefined();
  });

  it('skips a second pair whose target was already processed', () => {
    const project = new Project({ useInMemoryFileSystem: true });
    const target = project.createSourceFile('target.ts', 'interface A {}');
    const sourceOne = project.createSourceFile('sourceOne.ts', 'interface A {}');
    const sourceTwo = project.createSourceFile('sourceTwo.ts', 'interface A {}');
    const session = new ComparisonSession(target);

    session.enqueue(target.getInterfaceOrThrow('A'), sourceOne.getInterfaceOrThrow('A'));
    session.enqueue(target.getInterfaceOrThrow('A'), sourceTwo.getInterfaceOrThrow('A'));

    const first = session.dequeue();
    expect(first?.sourceInterface.getSourceFile().getFilePath()).toBe(sourceOne.getFilePath());
    expect(session.dequeue()).toBeUndefined();
  });

  it('computes the dedupe key at dequeue time, so a target renamed after enqueue is still deduped by its new name', () => {
    const project = new Project({ useInMemoryFileSystem: true });
    const target = project.createSourceFile('target.ts', 'interface X {}');
    const source = project.createSourceFile('source.ts', 'interface X {}\ninterface Y {}');
    const session = new ComparisonSession(target);

    session.enqueue(target.getInterfaceOrThrow('X'), source.getInterfaceOrThrow('X'));
    target.getInterfaceOrThrow('X').rename('Y');
    session.enqueue(target.getInterfaceOrThrow('Y'), source.getInterfaceOrThrow('Y'));

    expect(session.dequeue()?.targetInterface.getName()).toBe('Y');
    expect(session.dequeue()).toBeUndefined();
  });

  it('skips pairs whose target was forgotten', () => {
    const project = new Project({ useInMemoryFileSystem: true });
    const target = project.createSourceFile('target.ts', 'interface A {}\ninterface B {}');
    const source = project.createSourceFile('source.ts', 'interface A {}\ninterface B {}');
    const session = new ComparisonSession(target);

    session.enqueue(target.getInterfaceOrThrow('A'), source.getInterfaceOrThrow('A'));
    session.enqueue(target.getInterfaceOrThrow('B'), source.getInterfaceOrThrow('B'));
    target.getInterfaceOrThrow('A').remove();

    expect(session.dequeue()?.targetInterface.getName()).toBe('B');
    expect(session.dequeue()).toBeUndefined();
  });

  it('skips pairs whose source was forgotten', () => {
    const project = new Project({ useInMemoryFileSystem: true });
    const target = project.createSourceFile('target.ts', 'interface A {}\ninterface B {}');
    const source = project.createSourceFile('source.ts', 'interface A {}\ninterface B {}');
    const session = new ComparisonSession(target);

    session.enqueue(target.getInterfaceOrThrow('A'), source.getInterfaceOrThrow('A'));
    session.enqueue(target.getInterfaceOrThrow('B'), source.getInterfaceOrThrow('B'));
    source.getInterfaceOrThrow('A').remove();

    expect(session.dequeue()?.targetInterface.getName()).toBe('B');
    expect(session.dequeue()).toBeUndefined();
  });

  it('keeps startingInterfaces as a snapshot taken at construction', () => {
    const project = new Project({ useInMemoryFileSystem: true });
    const target = project.createSourceFile('target.ts', 'interface A {}');
    const session = new ComparisonSession(target);

    target.addInterface({ name: 'B' });

    expect(session.startingInterfaces.map((iface) => iface.getName())).toEqual(['A']);
  });

  it('isolates the queue and processed set between sessions', () => {
    const projectOne = new Project({ useInMemoryFileSystem: true });
    const projectTwo = new Project({ useInMemoryFileSystem: true });
    const targetOne = projectOne.createSourceFile('target.ts', 'interface A {}');
    const targetTwo = projectTwo.createSourceFile('target.ts', 'interface A {}');
    const sourceOne = projectOne.createSourceFile('source.ts', 'interface A {}');
    const sourceTwo = projectTwo.createSourceFile('source.ts', 'interface A {}');
    const sessionOne = new ComparisonSession(targetOne);
    const sessionTwo = new ComparisonSession(targetTwo);

    sessionOne.enqueue(targetOne.getInterfaceOrThrow('A'), sourceOne.getInterfaceOrThrow('A'));
    sessionTwo.enqueue(targetTwo.getInterfaceOrThrow('A'), sourceTwo.getInterfaceOrThrow('A'));

    expect(sessionOne.dequeue()?.targetInterface.getSourceFile()).toBe(targetOne);
    expect(sessionOne.dequeue()).toBeUndefined();
    expect(sessionTwo.dequeue()?.targetInterface.getSourceFile()).toBe(targetTwo);
  });
});
