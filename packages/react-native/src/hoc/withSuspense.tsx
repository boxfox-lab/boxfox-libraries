import React, {
  ComponentType,
  FunctionComponent,
  ReactNode,
  Suspense,
} from "react";

export function withSuspense<T>(
  Component: ComponentType<T>,
  Fallback: ReactNode | FunctionComponent<T> = <></>
) {
  return function (props: T) {
    return (
      <Suspense
        fallback={
          typeof Fallback === "function" ? <Fallback {...props} /> : Fallback
        }
      >
        <Component {...props} />
      </Suspense>
    );
  };
}
