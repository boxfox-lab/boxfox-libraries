import { useMounted } from "@boxfox/core-hooks";
import React, { ComponentProps, Suspense } from "react";

export function SSRSafeSuspense(props: ComponentProps<typeof Suspense>) {
  const isMounted = useMounted();

  if (isMounted) {
    return <Suspense {...props} />;
  }
  return <>{props.fallback}</>;
}
