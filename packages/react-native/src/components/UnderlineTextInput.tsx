import { useBooleanState } from "@boxfox/core-hooks";
import React, { ComponentProps, ForwardedRef, useMemo } from "react";
import {
  Platform,
  TextInput as BaseTextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { EyeIcon, EyeOffIcon } from "react-native-heroicons/solid";
import { withProps } from "../hoc";
import { useColors } from "../hooks";
import { Input } from "./Input";

interface Props extends ComponentProps<typeof Input> {
  hint?: boolean;
}

export const UnderlineTextInput = React.forwardRef(function CardInfoTextInput(
  { hint, ...props }: Props,
  ref: ForwardedRef<BaseTextInput>
) {
  const colors = useColors();
  const [focused, setFocus, setBlur] = useBooleanState(false);
  const [visible, , , toggleVisible] = useBooleanState(false);
  const textProps = useMemo(() => {
    if (Platform.OS === "ios") {
      return {
        ...props,
        selectionColor: focused ? colors.primary[500] : colors.primary[900],
      };
    }
    return props;
  }, [props, focused]);
  return (
    <View>
      {props.secureTextEntry && hint && (
        <TouchableOpacity
          onPress={toggleVisible}
          activeOpacity={0.8}
          style={{ position: "absolute", right: 0, bottom: 8, zIndex: 10 }}
        >
          {visible ? (
            <EyeOffIcon size={24} color={colors.gray400} />
          ) : (
            <EyeIcon size={24} color={colors.gray400} />
          )}
        </TouchableOpacity>
      )}
      <StyledTextField
        ref={ref}
        placeholderTextColor={colors.gray300}
        underline={true}
        {...textProps}
        color={focused ? colors.primary[600] : colors.gray900}
        onFocus={(e) => {
          setFocus();
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setBlur();
          props.onBlur?.(e);
        }}
        secureTextEntry={props.secureTextEntry && !visible}
      />
    </View>
  );
});

const StyledTextField = withProps(Input, {
  style: { height: 41, paddingBottom: 4 },
});
