import { useCombinedRefs, useMounted } from "@boxfox/core-hooks";
import styled from "@emotion/styled";
import React, {
  ChangeEvent,
  ComponentProps,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
} from "react";

type Props = ComponentProps<"textarea"> & {
  autoresize?: boolean;
};

export const ResizableTextArea = forwardRef<HTMLTextAreaElement, Props>(
  function TextArea({ autoresize = true, ...props }, forwardRef) {
    const ref = useRef<HTMLTextAreaElement>(null);
    const resize = useCallback(() => {
      if (ref.current == null || !autoresize) {
        return;
      }
      ref.current.style.height = "auto";
      const { paddingTop, paddingBottom } = window.getComputedStyle(
        ref.current
      );
      const padding = parseInt(paddingTop) + parseInt(paddingBottom);
      const resultHeight = ref.current.scrollHeight - padding;
      if (resultHeight === 0) {
        return;
      }
      ref.current.style.height = `${resultHeight}px`;
    }, [autoresize]);
    const combinedRef = useCombinedRefs(ref, forwardRef, resize);

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLTextAreaElement>) => {
        resize();
        props.onChange?.(e);
      },
      [props.onChange, resize]
    );

    const isMounted = useMounted();

    useEffect(() => {
      if ((props.value != null || props.defaultValue != null) && isMounted) {
        resize();
      }
    }, [props.value, props.defaultValue, resize, isMounted]);

    return (
      <StyledTextArea
        {...props}
        rows={props.rows ?? 1}
        ref={combinedRef}
        onChange={handleChange}
        spellCheck={false}
      />
    );
  }
);

const StyledTextArea = styled.textarea`
  box-shadow: none !important;
  padding: 0;
  flex: 1;
  border-width: 1px;
  outline: none;
  &:focus {
    outline: none;
  }
  resize: none;
  appearance: none;
`;
