import * as React from "react";
import { ComponentProps, useMemo } from "react";
import { Animated } from "react-native";

export function FadeAnimation({
  onFinish,
  initialVisible,
  visible,
  duration = 1000,
  delay,
  ...props
}: ComponentProps<typeof Animated.View> & {
  initialVisible?: boolean;
  visible: boolean;
  duration?: number;
  delay?: number;
  onFinish?: () => void;
}) {
  const animation = useMemo(
    () => new Animated.Value(initialVisible ?? visible ? 1 : 0),
    []
  );
  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: visible ? 1 : 0,
      duration,
      useNativeDriver: true,
      delay,
    }).start(onFinish);
  }, [visible, delay]);
  return (
    <Animated.View {...props} style={[{ opacity: animation }, props.style]} />
  );
}
