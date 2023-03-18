import { Amplitude } from "@amplitude/react-native";
import { LogParams } from "@boxfox/logger";
import { AmplitudeLogger } from "@boxfox/logger";

export async function createNativeAmplitudeLogger(
  key: string,
  isAlpha: boolean
): Promise<AmplitudeLogger> {
  const instance = Amplitude.getInstance();
  await instance.init(key);
  return {
    log: (name: string, params?: LogParams) => {
      if (isAlpha) {
        console.log(
          "\x1b[36m[Alpha-Log]",
          name,
          JSON.stringify(params),
          "\x1b[0m"
        );
      } else {
        instance.logEvent(name, params ?? {});
      }
    },
    setUserId: (id: string) => {
      instance.setUserId(id);
    },
    setUserProperties: (props: Record<string, unknown>) => {
      instance.setUserProperties(props);
    },
  };
}
