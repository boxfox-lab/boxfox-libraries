import * as React from "react";
import { GestureResponderEvent, TouchableOpacity } from "react-native";
import { TextSize, TextWeight } from "../../constants/text-style";

export interface ButtonInterface
  extends Partial<React.ComponentProps<typeof TouchableOpacity>> {
  height?: number;
  width?: number | string | undefined;
  radius?: number | undefined;
  textSize?: TextSize;
  textWeight?: TextWeight;
  textColor?: string;
  onPress?: (event: GestureResponderEvent) => void;
}

export const DEFAULT_BUTTON_RADIUS = 8;
export const DEFAULT_ACTIVE_TOUABLE_OPACITY = 0.7;
