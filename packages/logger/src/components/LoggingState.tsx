import React, { useEffect } from "react";
import { LogParams } from "../models";
import { useLogger } from "./LoggerContext";
import { LoggerParamsProvider, useLogParams } from "./LoggerParamsContext";

interface Props {
  name: string;
  params?: LogParams;
  children: React.ReactNode;
  log?: boolean;
}

export function LoggingState({
  name,
  params: paramsInProps,
  log,
  children,
}: Props) {
  const paramsInContext = useLogParams();
  const params: LogParams = {
    pageName: name,
    ...paramsInContext,
    ...paramsInProps,
  };
  const logger = useLogger();

  useEffect(() => {
    if (log || log == null) {
      logger.log(name, params);
    }
  }, [JSON.stringify(params), logger, name, log]);

  return (
    <LoggerParamsProvider params={params}>{children}</LoggerParamsProvider>
  );
}
