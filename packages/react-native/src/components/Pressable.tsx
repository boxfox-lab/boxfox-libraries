import React, { ComponentProps, ReactNode, useMemo } from "react";
import {
  Insets,
  Platform,
  Pressable,
  StyleProp,
  Touchable,
  TouchableOpacity,
  useColorScheme,
  ViewStyle,
} from "react-native";
import { withProps } from "../hoc/withProps";

type Props = Touchable &
  Omit<
    ComponentProps<typeof Pressable>,
    | "delayLongPress"
    | "hitSlop"
    | "onLongPress"
    | "onPress"
    | "onPressIn"
    | "onPressOut"
    | "pressRetentionOffset"
    | "style"
  > &
  NonNullableProperites<
    Pick<
      ComponentProps<typeof Pressable>,
      "delayLongPress" | "onLongPress" | "onPress" | "onPressIn" | "onPressOut"
    >
  > & {
    style?: StyleProp<ViewStyle>;
    activeOpacity?: number;
    children?: ReactNode;
    hitSlop?: Insets;
    pressRetentionOffset?: Insets;
    radius?: number;
  };

export function CrossPlatformPressable({
  android_ripple,
  radius,
  ...props
}: Props) {
  const scheme = useColorScheme();
  const Component = useMemo(
    () =>
      Platform.OS === "android"
        ? withProps(Pressable, {
            android_ripple: {
              radius,
              borderless: radius ? true : false,
              color:
                scheme === "dark"
                  ? "rgba(255,255,255,0.2)"
                  : "rgba(0,0,0,0.12)",
              ...android_ripple,
            },
          })
        : StyledTouchableOpacity,
    [radius]
  );
  return (
    <Component
      {...props}
      style={[props.style, { borderRadius: radius, overflow: "hidden" }]}
    />
  );
}

const StyledTouchableOpacity = withProps(TouchableOpacity, {
  activeOpacity: 0.7,
});

type NonNullableProperites<T extends object> = {
  [key in keyof T]: NonNullable<T[key]>;
};
