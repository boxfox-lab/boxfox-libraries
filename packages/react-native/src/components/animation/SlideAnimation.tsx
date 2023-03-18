import React, { ComponentProps, ComponentType } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { useSharedValueByEffect } from "../../hooks";
import { useFadeInOutOption } from "./useFadeInOutOption";

export interface SlideAnimationOptions {
  visible: boolean;
  initialVisible?: boolean;
  duration?: { fadeIn?: number; fadeOut?: number } | number;
  delay?: { fadeIn?: number; fadeOut?: number } | number;
  direction: "from-left" | "from-right";
}

export function useSlideAnimation(options: SlideAnimationOptions) {
  const duration = useFadeInOutOption(options.duration);
  const delay = useFadeInOutOption(options.delay);
  const value = useSharedValueByEffect(options.visible, options.initialVisible);
  const style = useAnimatedStyle(() => {
    const targetDuration =
      (value.value ? duration?.fadeIn : duration?.fadeOut) ?? 500;
    const timingValue = withTiming(value.value ? "0%" : "-100%", {
      duration: targetDuration,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    const targetDelay = value.value ? delay?.fadeIn : delay?.fadeOut;
    const result = targetDelay
      ? withDelay(targetDelay, timingValue)
      : timingValue;
    return options.direction === "from-right"
      ? { right: result }
      : { left: result };
  }, [
    options.delay,
    options.direction,
    duration?.fadeIn,
    duration?.fadeOut,
    delay?.fadeIn,
    delay?.fadeOut,
  ]);
  return style;
}

export function withSlideAnimation<
  P extends ComponentProps<typeof Animated.View>
>(Component: ComponentType<P>) {
  return React.forwardRef(function (
    props: P & { slideAnimation: SlideAnimationOptions },
    ref
  ) {
    const animationStyle = useSlideAnimation(props.slideAnimation);
    return (
      <Component {...props} style={[props.style, animationStyle]} ref={ref} />
    );
  });
}
