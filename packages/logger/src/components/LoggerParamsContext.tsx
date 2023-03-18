import React, { createContext, ReactNode, useContext } from "react";
import { LogParams } from "../models";

export const LoggerParamsContext = createContext<{ params?: LogParams }>({});

interface Props {
  children: ReactNode;
  params: LogParams;
}

export function LoggerParamsProvider({ children, params }: Props) {
  const paramsInContext = useLogParams();
  return (
    <LoggerParamsContext.Provider
      value={{ params: { ...paramsInContext, ...params } }}
    >
      {children}
    </LoggerParamsContext.Provider>
  );
}

export function useLogParams() {
  const { params } = useContext(LoggerParamsContext);
  return params ?? {};
}
