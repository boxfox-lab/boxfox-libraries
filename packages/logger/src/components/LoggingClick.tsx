import React, { ReactElement } from "react";
import { LogParams } from "../models";
import { LoggingEvent } from "./LoggingEvent";

interface Props {
  name: string;
  params?: LogParams;
  children: ReactElement;
  capture?: string;
}

export function LoggingClick(props: Props) {
  return (
    <LoggingEvent
      {...props}
      capture={props.capture ?? "onClick"}
      params={{ type: "click", ...props.params }}
    />
  );
}
