import React, { ComponentProps } from "react";
import { LoggingEvent } from "./LoggingEvent";

export function LoggingPress(
  props: Omit<ComponentProps<typeof LoggingEvent>, "capture">
) {
  return <LoggingEvent {...props} capture="onPress" />;
}
