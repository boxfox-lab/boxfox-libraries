import { HTMLProps } from "react";

export type ExtendHTMLProps<Elem extends HTMLElement, T extends unknown> = Omit<
  HTMLProps<Elem>,
  keyof T
> &
  T;
