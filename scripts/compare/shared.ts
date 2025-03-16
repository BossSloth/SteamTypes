import { Logger } from "../logger";

export let logger: Logger;

export function setLogger(newLogger: Logger): void {
  logger = newLogger;
}