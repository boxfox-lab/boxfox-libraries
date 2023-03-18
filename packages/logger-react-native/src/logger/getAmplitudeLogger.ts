import { AmplitudeLogger } from "@boxfox/logger";
import { createNativeAmplitudeLogger } from "./createNativeAmplitudeLogger";

let instance: AmplitudeLogger;

export async function getAmplitudeLogger(
  key: string,
  isAlpha: boolean
): Promise<AmplitudeLogger> {
  if (instance) {
    return instance;
  }
  const logger = await createNativeAmplitudeLogger(key, isAlpha);
  instance = logger;
  return logger;
}

export async function initUserInfo(
  logger: AmplitudeLogger,
  userId?: string,
  properties?: Record<string, unknown>
) {
  if (userId) {
    await logger.setUserId(userId);
  }
  await logger.setUserProperties({
    ...properties,
  });
}
