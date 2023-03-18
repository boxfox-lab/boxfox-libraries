import React, { ComponentType } from "react";

export function withProps<P, D extends Partial<P>>(
  Component: ComponentType<P>,
  baseProps: Partial<P>
) {
  return React.forwardRef((props: Omit<P, keyof D> & Partial<P>, ref) => (
    //@ts-ignore
    <Component {...baseProps} {...props} ref={ref} />
  ));
}
