import { useEffect, useState } from "react";
import { AmplitudeLogger } from "@boxfox/logger";
import { getAmplitudeLogger } from "./getAmplitudeLogger";

export function useAmplitudeLogger(key: string, isAlpha: boolean) {
  const [instance, setInstance] = useState<AmplitudeLogger>();
  useEffect(() => {
    getAmplitudeLogger(key, isAlpha).then(setInstance);
  }, []);
  return instance;
}
