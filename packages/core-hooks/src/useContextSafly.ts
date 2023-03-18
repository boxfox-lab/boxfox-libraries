import { Context, useContext } from "react";

export function useContextSafly<T>(context: Context<T>): NonNullable<T> {
  const value = useContext(context);

  if (value == null) {
    throw new Error(`${context.displayName}안에서 사용해 주세요`);
  }

  return value as NonNullable<T>;
}
