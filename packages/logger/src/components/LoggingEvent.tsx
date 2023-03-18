import React, { ReactElement } from "react";
import { LogParams } from "../models";
import { useLogger } from "./LoggerContext";
import { useLogParams } from "./LoggerParamsContext";

interface Props {
  name: string;
  params?: LogParams;
  children: ReactElement;
  capture: string;
  log?: boolean;
  onLog?: () => void;
}

export function LoggingEvent({
  name,
  params: paramsInProps,
  children,
  capture,
  log = true,
  onLog,
}: Props) {
  const logger = useLogger();
  const paramsInContext = useLogParams();
  const params: LogParams = { ...paramsInContext, ...paramsInProps };
  return React.cloneElement(children, {
    [capture]: (...args: any[]) => {
      if (logger && log) {
        logger.log(name, params);
        onLog?.();
      }
      children.props[capture]?.(...args);
    },
  });
}
