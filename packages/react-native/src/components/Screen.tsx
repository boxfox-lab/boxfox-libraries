import * as React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { withProps } from "../hoc/withProps";
import { useColors } from "../hooks/useColors";

interface ScreenProps extends React.ComponentProps<typeof SafeAreaView> {
  paddingTop?: boolean;
  backgroundColor?: string;
  statusBar?: boolean;
  statusBarStyle?: "default" | "light-content" | "dark-content";
}

export const Screen: React.FC<ScreenProps> = (props) => {
  const colors = useColors();

  const Wrapper =
    Platform.OS === "ios" ? IosKeyboardAvoidingView : React.Fragment;

  return (
    <Wrapper>
      <SafeAreaView
        {...props}
        style={[
          {
            flex: 1,
            paddingTop:
              props.paddingTop !== false && Platform.OS === "android"
                ? StatusBar.currentHeight
                : 0,
            backgroundColor: props.backgroundColor || colors.background,
          },
          props.style,
        ]}
      />
    </Wrapper>
  );
};

const IosKeyboardAvoidingView = withProps(KeyboardAvoidingView, {
  behavior: "padding",
  style: { flex: 1 },
});

export default Screen;
