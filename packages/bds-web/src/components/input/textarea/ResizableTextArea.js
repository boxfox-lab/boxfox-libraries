import { useCombinedRefs, useMounted } from "@boxfox/core-hooks";
import styled from "@emotion/styled";
import React, { forwardRef, useCallback, useEffect, useRef, } from "react";
export const ResizableTextArea = forwardRef(function TextArea({ autoresize = true, ...props }, forwardRef) {
    var _a;
    const ref = useRef(null);
    const resize = useCallback(() => {
        if (ref.current == null || !autoresize) {
            return;
        }
        ref.current.style.height = "auto";
        const { paddingTop, paddingBottom } = window.getComputedStyle(ref.current);
        const padding = parseInt(paddingTop) + parseInt(paddingBottom);
        const resultHeight = ref.current.scrollHeight - padding;
        if (resultHeight === 0) {
            return;
        }
        ref.current.style.height = `${resultHeight}px`;
    }, [autoresize]);
    const combinedRef = useCombinedRefs(ref, forwardRef, resize);
    const handleChange = useCallback((e) => {
        var _a;
        resize();
        (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, e);
    }, [props.onChange, resize]);
    const isMounted = useMounted();
    useEffect(() => {
        if ((props.value != null || props.defaultValue != null) && isMounted) {
            resize();
        }
    }, [props.value, props.defaultValue, resize, isMounted]);
    return (React.createElement(StyledTextArea, { ...props, rows: (_a = props.rows) !== null && _a !== void 0 ? _a : 1, ref: combinedRef, onChange: handleChange, spellCheck: false }));
});
const StyledTextArea = styled.textarea `
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
