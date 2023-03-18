import { Logger } from "../models";

export interface AmplitudeLogger extends Logger {
  setUserId: (id: string) => Promise<void> | void;
  setUserProperties: (props: Record<string, unknown>) => Promise<void> | void;
}
