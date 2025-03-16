/* eslint-disable @typescript-eslint/class-methods-use-this */
export class Logger {
  options: Partial<{ verbose: boolean; }> = {};

  constructor(options?: Partial<{ verbose: boolean; }>) {
    this.options = options ?? {};
  }

  log(...messages: string[]): void {
    console.log(...messages);
  }

  error(...messages: string[]): void {
    console.error(...messages);
  }

  debug(...messages: string[]): void {
    if (this.options.verbose ?? false) {
      console.debug(...messages);
    }
  }
}
