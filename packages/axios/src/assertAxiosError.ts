import type { AxiosError } from "axios";

export function assertAxiosError(e: unknown): asserts e is AxiosError {
  if (typeof e === "object" && e != null && "isAxiosError" in e) {
    return;
  }
  throw e;
}
