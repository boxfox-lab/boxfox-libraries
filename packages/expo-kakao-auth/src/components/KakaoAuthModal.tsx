import { QS } from "@boxfox/url";
import { startActivityAsync } from "expo-intent-launcher";
import React, { useCallback, useRef } from "react";
import { Modal } from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";
import { ShouldStartLoadRequest } from "react-native-webview/lib/WebViewTypes";
import { KakaoAuthResult } from "../types/KakaoAuthResult";
import { parseIntentUri } from "../utils/parseIntentUri";

interface Props {
  token: string;
  open: boolean;
  onClose: () => void;
  onFinish: (result: KakaoAuthResult) => void;
}

export function KakaoAuthModal({ open, token, onClose, onFinish }: Props) {
  const webview = useRef<WebView>(null);
  const handleMessage = useCallback(
    async (event: WebViewMessageEvent) => {
      try {
        const result = JSON.parse(event.nativeEvent.data);
        onFinish(result);
        onClose();
      } catch (e) {
        console.error(e);
        onClose();
      }
    },
    [onClose, onFinish]
  );
  const handleRedirect = (event: ShouldStartLoadRequest) => {
    if (event.url.startsWith("http")) {
      return true;
    }
    const result = parseIntentUri(event.url);
    startActivityAsync(result.action, {
      extra: result.extra,
      flags: result.flags,
    });
    return false;
  };
  return (
    <Modal animationType="slide" transparent={true} visible={open}>
      <WebView
        ref={webview}
        originWhitelist={["*"]}
        source={{
          uri: `https://d29debaqtljndx.cloudfront.net/auth/kakao${QS.create({
            token,
          })}`,
        }}
        onShouldStartLoadWithRequest={handleRedirect}
        javaScriptEnabled={true}
        onMessage={handleMessage}
      />
    </Modal>
  );
}
