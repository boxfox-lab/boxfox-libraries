import type { captureException, init, ErrorBoundary } from "@sentry/react";
import React, { ReactNode } from "react";
import { Platform } from "react-native";

interface SentryType {
  init: typeof init;
  captureException: typeof captureException;
  ErrorBoundary: typeof ErrorBoundary;
}
type Params = Parameters<typeof captureException>;

export namespace Sentry {
  export function getModule(): SentryType {
    return Platform.OS === "web"
      ? require("@sentry/react")
      : require("@sentry/react-native");
  }

  export function init(dsn: string) {
    const module = Sentry.getModule();
    const options = { dsn, enableNative: false };
    module.init(options);
  }

  export function captureException(...params: Params) {
    const module = Sentry.getModule();
    module.captureException(...params);
  }

  export function ErrorBoundary({ children }: { children: ReactNode }) {
    const { ErrorBoundary } = Sentry.getModule();
    return <ErrorBoundary>{children}</ErrorBoundary>;
  }
}
