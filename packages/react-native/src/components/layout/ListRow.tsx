import React from "react";
import { View } from "react-native";
import { ChevronRightIcon } from "react-native-heroicons/outline";
import styled from "styled-components/native";
import { withProps } from "../../hoc/withProps";
import { CrossPlatformPressable } from "../Pressable";
import { Text } from "../Text";

interface Props extends React.ComponentProps<typeof View> {
  left?: React.ReactNode;
  onPress?: () => void;
  right?: React.ReactNode;
  children?: React.ReactNode;
}

export function ListRow({ onPress, left, right, children, ...rest }: Props) {
  const Wrapper = onPress
    ? withProps(CrossPlatformPressable, { onPress })
    : React.Fragment;
  return (
    <Wrapper>
      <InnerContainer {...rest}>
        {left}
        <View style={{ flex: 1 }}>
          {typeof children === "string" ? (
            <Text weight="semibold" color="gray900">
              {children}
            </Text>
          ) : (
            children
          )}
        </View>
        {right}
      </InnerContainer>
    </Wrapper>
  );
}

ListRow.ContentText = (props: React.ComponentProps<typeof Text>) => (
  <Text weight="semibold" color="gray900" {...props} />
);

ListRow.RightIcon = () => <ChevronRightIcon size={20} color="gray300" />;

ListRow.RightText = (props: React.ComponentProps<typeof Text>) => (
  <Text size="xs" color="gray500" {...props} />
);

const InnerContainer = styled.View`
  padding-horizontal: 28px;
  padding-vertical: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
