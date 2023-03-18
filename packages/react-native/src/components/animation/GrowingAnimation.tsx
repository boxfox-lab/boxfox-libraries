import React, { ComponentProps, ComponentType } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { useSharedValueByEffect } from "../../hooks";
import { useFadeInOutOption } from "./useFadeInOutOption";

export interface GrowingAnimationOptions {
  visible: boolean;
  initialVisible?: boolean;
  duration?: { fadeIn?: number; fadeOut?: number } | number;
  delay?: { fadeIn?: number; fadeOut?: number } | number;
  height: number;
}

export function useGrowingAnimation(options: GrowingAnimationOptions) {
  const height = useSharedValueByEffect(options.height);
  const duration = useFadeInOutOption(options.duration);
  const delay = useFadeInOutOption(options.delay);
  const value = useSharedValueByEffect(options.visible, options.initialVisible);
  const style = useAnimatedStyle(() => {
    const targetDuration =
      (value.value ? duration?.fadeIn : duration?.fadeOut) ?? 500;
    const timingValue = withTiming(value.value ? height.value : 0, {
      duration: targetDuration,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    const targetDelay = value.value ? delay?.fadeIn : delay?.fadeOut;
    const result = targetDelay
      ? withDelay(targetDelay, timingValue)
      : timingValue;
    return {
      height: result,
    };
  }, [
    options.delay,
    options.duration,
    duration?.fadeIn,
    duration?.fadeOut,
    delay?.fadeIn,
    delay?.fadeOut,
  ]);
  return style;
}

export function withGrowingAnimation<
  P extends ComponentProps<typeof Animated.View>
>(Component: ComponentType<P>) {
  return React.forwardRef(function (
    props: P & { growingAnimation: GrowingAnimationOptions },
    ref
  ) {
    const animationStyle = useGrowingAnimation(props.growingAnimation);
    return (
      <Component {...props} style={[props.style, animationStyle]} ref={ref} />
    );
  });
}
