import * as React from "react";
import { TouchableOpacity } from "react-native";
import { TextSize, TextWeight } from "../../constants/text-style";
import { useColors } from "../../hooks";
import { LottieWithURL } from "../LottieWithURL";
import { Text } from "../Text";
import {
  ButtonInterface,
  DEFAULT_ACTIVE_TOUABLE_OPACITY,
  DEFAULT_BUTTON_RADIUS,
} from "./types";

interface CTAButtonProps extends ButtonInterface {
  loading?: boolean;
  loadingSize?: number;
}

const DEFAULT_LOADING_SIZE = 24;
const DEFAULT_BUTTON_HEIGHT = 56;
const DEFAULT_TEXT_SIZE: TextSize = "lg";
const DEFAULT_TEXT_WEIGHT: TextWeight = "semibold";

export const CTAButton: React.FC<CTAButtonProps> = ({
  style,
  children,
  height,
  width,
  disabled,
  textSize,
  textWeight,
  textColor,
  radius,
  onPress,
  loading,
  loadingSize,
}) => {
  const colors = useColors();
  let ButtonBody;

  if (loading) {
    ButtonBody = (
      <LottieWithURL
        style={{
          width: loadingSize || DEFAULT_LOADING_SIZE,
          height: loadingSize || DEFAULT_LOADING_SIZE,
        }}
        uri="https://d296p9s9lflvhj.cloudfront.net/lottie/lottie_loading_spinner_white.json"
        autoPlay
      />
    );
  } else {
    ButtonBody = (
      <Text
        size={textSize ?? DEFAULT_TEXT_SIZE}
        weight={textWeight || DEFAULT_TEXT_WEIGHT}
        color={textColor || (disabled ? "gray400" : "white")}
      >
        {children}
      </Text>
    );
  }

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      activeOpacity={DEFAULT_ACTIVE_TOUABLE_OPACITY}
      style={[
        {
          height: height ?? DEFAULT_BUTTON_HEIGHT,
          width: width,
          borderRadius: radius ?? DEFAULT_BUTTON_RADIUS,
          backgroundColor: disabled ? colors.gray300 : colors.primary[500],
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        },
        style,
      ]}
    >
      {ButtonBody}
    </TouchableOpacity>
  );
};
