import { useEffect } from "react";
import { useSharedValue } from "react-native-reanimated";

export function useSharedValueByEffect<T>(value: T, defaultValue?: T) {
  const sharedValue = useSharedValue(defaultValue ?? value);
  useEffect(() => {
    sharedValue.value = value;
  }, [value]);
  return sharedValue;
}
