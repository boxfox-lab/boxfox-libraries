import { useContextSafly } from "@boxfox/core-hooks";
import React, { createContext, ReactNode, useMemo } from "react";
import { Logger } from "../models";
import { useLogParams } from "./LoggerParamsContext";

export const LoggerContext = createContext<{ logger: Logger } | null>(null);

interface Props {
  children: ReactNode;
  logger: Logger;
}

export function LoggerProvider({ children, logger }: Props) {
  return (
    <LoggerContext.Provider value={{ logger }}>
      {children}
    </LoggerContext.Provider>
  );
}

export function useLogger() {
  const { logger } = useContextSafly(LoggerContext);
  const paramsInCtx = useLogParams();
  return useMemo(
    () => ({
      log: (name: string, params?: object) => {
        logger.log(name, { ...paramsInCtx, ...params });
      },
    }),
    [logger, JSON.stringify(paramsInCtx)]
  );
}
