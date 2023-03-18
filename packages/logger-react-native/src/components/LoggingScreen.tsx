import React, { ComponentProps } from "react";
import { useIsFocused } from "@react-navigation/core";
import { LoggingState } from "@boxfox/logger";

export function LoggingScreen(props: ComponentProps<typeof LoggingState>) {
  const isFocused = useIsFocused();
  return (
    <LoggingState
      {...props}
      log={isFocused && (props.log == null || props.log)}
    />
  );
}
