import React from "react";
import RootSiblings from "react-native-root-siblings";
import styled from "styled-components/native";
import { Flex } from "./Flex";
import { LottieWithURL } from "./LottieWithURL";

export namespace BackdropLoading {
  export function show() {
    return new RootSiblings(<BackdropLoadingContent />);
  }
  export function hide(loading: RootSiblings) {
    if (loading instanceof RootSiblings) {
      loading.destroy();
    } else {
      console.warn(
        `BackdropLoading.hide expected a \`RootSiblings\` instance as argument.\nBut got \`${typeof loading}\` instead.`
      );
    }
  }
}

function BackdropLoadingContent() {
  return (
    <Container>
      <LottieWithURL
        uri="https://d296p9s9lflvhj.cloudfront.net/lottie/lottie_loading_spinner_white.json"
        style={{ width: 120, height: 120 }}
        loop
        autoPlay
      />
    </Container>
  );
}

const Container = styled(Flex.Center)`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;
