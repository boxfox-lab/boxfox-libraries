import * as React from "react";
import { View, ViewStyle } from "react-native";
import { useColors } from "../hooks";

interface DividerProps extends React.ComponentProps<typeof View> {
  color?: string;
  marginHorizontal?: ViewStyle["marginHorizontal"];
  marginVertical?: ViewStyle["marginVertical"];
  height?: ViewStyle["height"];
  width?: ViewStyle["width"];
}

export const Divider: React.FC<DividerProps> = ({
  height,
  width,
  marginHorizontal,
  marginVertical,
  color,
  ...props
}) => {
  const colors = useColors();
  return (
    <View
      {...props}
      style={[
        {
          height: height || 1,
          width: width,
          marginHorizontal: marginHorizontal,
          marginVertical: marginVertical,
          backgroundColor: color || colors.gray200,
        },
        props.style,
      ]}
    />
  );
};

export default Divider;
