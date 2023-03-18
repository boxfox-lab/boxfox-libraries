import * as React from "react";
import { View, ViewStyle } from "react-native";

interface Props extends React.ComponentProps<typeof View> {
  direction?: ViewStyle["flexDirection"];
  align?: ViewStyle["alignItems"];
  justify?: ViewStyle["justifyContent"];
  children?: React.ReactNode;
}

export function Flex({ direction, align, justify, ...props }: Props) {
  return (
    <View
      {...props}
      style={[
        {
          flexDirection: direction,
          alignItems: align,
          justifyContent: justify,
        },
        props.style,
      ]}
    />
  );
}
Flex.Center = (props: Props) => (
  <Flex align="center" justify="center" {...props} />
);
Flex.CenterVertical = (props: Props) => <Flex align="center" {...props} />;
Flex.CenterHorizontal = (props: Props) => <Flex justify="center" {...props} />;
