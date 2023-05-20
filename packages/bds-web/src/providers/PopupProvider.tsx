import { useCallbackRef, useContextSafly } from "@boxfox/core-hooks";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useReducer,
} from "react";
import { clearBackNavigationEvent, waitBackNavigationEvent } from "../hooks";

type PopupMap = Record<string, ReactNode>;
type Options = {
  children: ReactNode;
  onClose?: () => void;
};
interface State {
  open: (key: string, options: Options) => void;
  close: (key: string) => void;
}
const PopupContext = createContext<State | null>(null);

function reducer(state: PopupMap, action: Partial<PopupMap>) {
  return { ...state, ...action };
}

export function PopupProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {});
  const open = useCallbackRef(
    useCallback((key: string, options: Options) => {
      dispatch({ [key]: options.children });
    }, [])
  );
  const close = useCallbackRef(
    useCallback((key: string) => {
      dispatch({ [key]: undefined });
    }, [])
  );

  return (
    <PopupContext.Provider value={{ open, close }}>
      {Object.values(state).filter((item) => item != null)}
      {children}
    </PopupContext.Provider>
  );
}

export function usePopup(key: string) {
  const context = useContextSafly(PopupContext);
  const open = useCallbackRef(
    useCallback(
      (options: Options) => {
        context.open(key, options);
        if (!options.onClose) {
          return;
        }
        waitBackNavigationEvent().then(() => {
          options.onClose?.();
          context.close(key);
        });
      },
      [key, context.open]
    )
  );
  const close = useCallbackRef(
    useCallback(() => {
      clearBackNavigationEvent();
      context.close(key);
    }, [key, context.open])
  );

  useEffect(() => {
    return () => {
      close();
    };
  }, [close]);

  return { open, close };
}
