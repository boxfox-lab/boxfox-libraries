import { fromPairs } from "lodash";

export function parseIntentUri(uri: string) {
  const data = fromPairs(
    uri
      .split(";")
      .filter((row) => row.includes("="))
      .map((row) => row.split("="))
      .map(([key, value]) => [key, decodeURIComponent(value)])
  );
  const action = data.action;
  const flags = data.launchFlags ? parseInt(data.launchFlags, 16) : undefined;
  const extra = fromPairs(
    Object.entries(data)
      .filter(([key]) => key.startsWith("S."))
      .map(([key, value]) => [key.replace("S.", ""), value])
  );
  return { action, flags, extra };
}
