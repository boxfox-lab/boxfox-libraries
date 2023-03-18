import { useNavigation } from "@react-navigation/core";
import React, { ReactNode } from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import { ChevronLeftIcon, XIcon } from "react-native-heroicons/outline";
import styled from "styled-components/native";
import { withProps } from "../hoc";
import { useColors } from "../hooks";
import { Divider } from "./Divider";
import { Text } from "./Text";

interface Props {
  back?: boolean | "x";
  title?: ReactNode;
  leftTitle?: boolean;
  right?: ReactNode[] | ReactNode;
  elevated?: boolean;
}
export function AppHeader({ back, title, leftTitle, right, elevated }: Props) {
  const colors = useColors();
  const navigation = useNavigation();
  return (
    <View>
      <AppHeaderContainer>
        {back !== false && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ padding: 5 }}
          >
            {back === "x" ? (
              <XIcon size={24} color={colors.gray900} />
            ) : (
              <ChevronLeftIcon size={24} color={colors.gray900} />
            )}
          </TouchableOpacity>
        )}
        {typeof title === "string" ? (
          <Title size="lg" weight="bold" leftTitle={leftTitle}>
            {title}
          </Title>
        ) : (
          title
        )}
        <View style={{ flex: 1 }} />
        {right}
      </AppHeaderContainer>
      {elevated && <Divider height={1} />}
    </View>
  );
}

AppHeader.RightButton = styled(
  withProps(TouchableOpacity, { activeOpacity: 0.7 })
)`
  padding: 8px;
`;

const AppHeaderContainer = styled.View`
  flex-direction: row;
  padding-horizontal: 14px;
  height: 64px;
  position: relative;
  align-items: center;
`;

const Title = styled(Text)<{ leftTitle?: boolean }>`
  ${(p) =>
    p.leftTitle
      ? ``
      : `
      position: absolute;
      width: ${Platform.OS === "web" ? "calc(100% - 48px)" : "100%"};;
      text-align: center;
      z-index: -1;
    `}
  margin: 0 14px;
  padding: 14px 0 14px;
`;
