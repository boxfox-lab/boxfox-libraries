import { useBooleanState, useContextSafly } from "@boxfox/core-hooks";
import React, {
  ComponentProps,
  createContext,
  ReactNode,
  useCallback,
  useState,
} from "react";
import { Snackbar } from "../components/snackbar";

type SnackbarProps = ComponentProps<typeof Snackbar>;
type OpenOption = Omit<SnackbarProps, "open" | "onClose">;

const SnackbarContext = createContext<((options: OpenOption) => void) | null>(
  null
);

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen, setClose] = useBooleanState(false);
  const [state, setState] = useState<OpenOption>({
    children: null,
  });

  const open = useCallback((options: OpenOption) => {
    setState({ ...options });
    setOpen();
  }, []);

  return (
    <SnackbarContext.Provider value={open}>
      {children}
      <Snackbar {...state} open={isOpen} onClose={setClose}>
        {state.children}
      </Snackbar>
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  const controls = useContextSafly(SnackbarContext);
  return controls;
}
