import { LogParams } from "./LogParams";

export interface Logger {
  log(name: string, params?: LogParams): void;
}
