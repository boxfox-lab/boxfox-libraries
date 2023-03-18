import { useBooleanState } from "@boxfox/core-hooks";
import { CrossPlatformPressable, Text } from "@boxfox/react-native";
import * as React from "react";
import { ImageSourcePropType } from "react-native";
import styled from "styled-components/native";
import { KakaoAuthResult } from "../types";
import { KakaoAuthModal } from "./KakaoAuthModal";

interface Props {
  token: string;
  onFinish: (result: KakaoAuthResult) => void;
  icon?: ImageSourcePropType;
}

export function KakaoAuthButton({ token, onFinish, icon }: Props) {
  const [isKakaoAuthOpen, openKakao, closeKakao] = useBooleanState(false);
  const handleFinish = React.useCallback((result: KakaoAuthResult) => {
    closeKakao();
    onFinish(result);
  }, []);
  return (
    <>
      <StyledRipple onPress={openKakao}>
        <StyledKakaoAuthButton>
          {icon && <StyledIcon source={icon} />}
          <Text color="rgba(27, 27, 27, 1)" weight="bold">
            카카오톡으로 시작하기
          </Text>
        </StyledKakaoAuthButton>
      </StyledRipple>
      {isKakaoAuthOpen && (
        <KakaoAuthModal
          token={token}
          open={isKakaoAuthOpen}
          onClose={closeKakao}
          onFinish={handleFinish}
        />
      )}
    </>
  );
}
const StyledRipple = styled(CrossPlatformPressable)`
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
`;

const StyledIcon = styled.Image`
  width: 19px;
  height: 18px;
  position: absolute;
  left: 20px;
  top: 17px;
`;

const StyledKakaoAuthButton = styled.View`
  width: 100%;
  padding: 17px 20px 15px;
  background: rgba(255, 211, 0, 1);
  align-items: center;
  border-radius: 10px;
`;
