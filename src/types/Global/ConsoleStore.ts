import { Console, SpewType } from '../SteamClient/Console';
import { Unregisterable } from '../SteamClient/shared';

export interface ConsoleStore {
  AddSpewLine(spew: string, spewType: SpewType): void;

  Init(): void;

  /**
   * Is registered to {@link Console.RegisterForSpewOutput}
   */
  OnSteamConsoleSpew(...args: Parameters<Parameters<Console['RegisterForSpewOutput']>[0]>): void;

  Reset(): void;

  StartListening(): void;

  StopListening(): void;

  commandHistory: string[];

  consoleSpew: ConsoleSpew[];

  m_listenHandle: Unregisterable;

  m_nLineCounter: number;

  m_rgCommandHistory: string[];

  m_rgConsoleSpew: ConsoleSpew[];
}

export interface ConsoleSpew {
  line: number;

  spew: SpewInfo[];

  time: Date;
}

export interface SpewInfo {
  text: string;

  type: SpewType;
}
