import { useContextSafly } from "@boxfox/core-hooks";
import { BottomSheet } from "../components/BottomSheet";
import { CommonModal } from "../components/CommonModal";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";

interface State {
  content: ReactNode;
  open: (content: ReactNode, options?: Option) => void;
  setOption: (options?: Option) => void;
}

interface Option {
  withoutModalParent?: boolean;
}

export const ModalContext = createContext<State | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ReactNode>();
  const [options, setOptions] = useState<Option>();
  const open = useCallback((content: ReactNode, options?: Option) => {
    setContent(content);
    setOptions(options);
  }, []);
  const value = useMemo(
    () => ({ content, open, setOption: setOptions }),
    [content, open, setOptions]
  );
  return (
    <ModalContext.Provider value={value}>
      {content &&
        (options?.withoutModalParent ? (
          content
        ) : (
          <CommonModal
            open
            onClose={() => setContent(undefined)}
            children={content}
          />
        ))}
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContextSafly(ModalContext);
  const open = context.open;
  const setOption = context.setOption;
  const close = useCallback(() => {
    context.setOption();
    context.open(undefined);
  }, [context.open, context.setOption]);
  return useMemo(() => ({ open, close, setOption }), [open, close, setOption]);
}

export function useBottomSheet() {
  const { open, close, setOption } = useModal();
  const openBottomSheet = useCallback(
    (children: ReactNode, options?: { onClose?: () => void }) => {
      open(
        <BottomSheet open onClose={options?.onClose ?? close}>
          {children}
        </BottomSheet>,
        { withoutModalParent: true }
      );
    },
    [open]
  );
  return useMemo(
    () => ({ open: openBottomSheet, close, setOption }),
    [openBottomSheet, close]
  );
}
