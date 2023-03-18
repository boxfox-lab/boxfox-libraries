import { useCallbackRef } from "@boxfox/core-hooks";
import { useEffect } from "react";
import { Keyboard } from "react-native";

export function useKeyboardOpenEvent(handler: (open: boolean) => void) {
  const preservedHandler = useCallbackRef(handler);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => preservedHandler(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => preservedHandler(false)
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [preservedHandler]);
}
