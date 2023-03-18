import React, { useEffect, useMemo } from "react";
import { Animated, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";

interface Props {
  value?: boolean;
  onPress?: () => void;
}

export function ToggleButton({ value, onPress }: Props) {
  const backgroundAnimation = useMemo(
    () => new Animated.Value(value ? 1 : 0),
    []
  );
  useEffect(() => {
    Animated.timing(backgroundAnimation, {
      toValue: value ? 1 : 0,
      useNativeDriver: false,
      duration: 200,
    }).start();
  }, [value]);

  const backgroundColor = backgroundAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["#e5e8eb", "#8B5CF6"],
  });
  const position = backgroundAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 25],
  });

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <SwitchContainer style={{ backgroundColor }}>
        <StyledSwitchButton style={{ left: position }} />
      </SwitchContainer>
    </TouchableWithoutFeedback>
  );
}
const SwitchContainer = styled(Animated.View)`
  border-radius: 18px;
  height: 25px;
  width: 48px;
  border-radius: 52px;
  flex-direction: row;
  align-items: center;
`;
const StyledSwitchButton = styled(Animated.View)`
  width: 21px;
  height: 21px;
  border-radius: 20px;
  position: absolute;
  top: 2px;
  background: ${(p) => p.theme.colors.white};
  elevation: 2;
`;
