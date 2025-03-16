export class Logger {
    options: Partial<{verbose: boolean}> = {};

    constructor(options?: Partial<{verbose: boolean}>) {
        this.options = options ?? {};
    }
    
    log(...messages: string[]) {
        console.log(...messages);
    }

    error(...messages: string[]) {
        console.error(...messages);
    }

    debug(...messages: string[]) {
        if (this.options.verbose) {
            console.debug(...messages);
        }
    }
}
