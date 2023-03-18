import * as React from "react";
import { Text as DefaultText } from "react-native";
import { TextStyleProps, useTextStyle } from "../constants/text-style";

export function Text(props: DefaultText["props"] & TextStyleProps) {
  const textStyle = useTextStyle(props);
  return <DefaultText {...props} style={[textStyle, props.style]} />;
}

Text.create =
  (defaultProps: DefaultText["props"] & TextStyleProps) =>
  (props: DefaultText["props"] & TextStyleProps) => {
    return <Text {...defaultProps} {...props} />;
  };
