import { useBooleanState, useCombinedCallbacks } from "@boxfox/core-hooks";
import React, { ComponentProps, ForwardedRef } from "react";
import { TextInput as DefaultTextInput } from "react-native";
import { useColors } from "../hooks";
import { TextStyleProps, useTextStyle } from "../constants";

interface Props
  extends ComponentProps<typeof DefaultTextInput>,
    TextStyleProps {
  underline?: boolean;
  error?: boolean;
}

export const Input = React.forwardRef(function TextInput(
  { size, weight, color, underline, error, ...props }: Props,
  ref: ForwardedRef<DefaultTextInput>
) {
  const style = useTextStyle({ size, weight, color });
  const {
    setFocused,
    setBlur,
    style: underlineStyle,
  } = useUnderlineStyle(underline, error);
  const focus = useCombinedCallbacks(props.onFocus, setFocused);
  const blur = useCombinedCallbacks(props.onBlur, setBlur);
  return (
    <DefaultTextInput
      ref={ref}
      {...props}
      style={[underlineStyle, style, props.style]}
      onFocus={focus}
      onBlur={blur}
    />
  );
});

function useUnderlineStyle(use?: boolean, error?: boolean) {
  const [focused, setFocused, setBlur] = useBooleanState(false);
  const colors = useColors();
  const style = use
    ? [
        { paddingBottom: 8 },
        focused
          ? {
              borderBottomColor: error ? colors.red[400] : colors.primary[600],
              borderBottomWidth: 2,
            }
          : {
              borderBottomColor: colors.gray300,
              borderBottomWidth: 1,
            },
      ]
    : [];
  return { setFocused, setBlur, style };
}
