import { useColors } from "../../hooks";
import React from "react";
import { TouchableOpacity } from "react-native";
import { CameraIcon } from "react-native-heroicons/outline";
import styled from "styled-components/native";
import layout from "../../constants/layout";

export function AddImageSection({ onPress }: { onPress?: () => void }) {
  const colors = useColors();
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <ImageSection
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.gray100,
        }}
      >
        <CameraIcon size={100} color={colors.gray300} />
      </ImageSection>
    </TouchableOpacity>
  );
}

const ImageSection = styled.View`
  height: ${layout.window.width}px;
`;
