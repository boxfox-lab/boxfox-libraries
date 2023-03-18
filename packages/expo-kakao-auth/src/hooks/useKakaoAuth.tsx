import React, { useCallback } from "react";
import RootSiblings from "react-native-root-siblings";
import { KakaoAuthModal } from "../components/KakaoAuthModal";

let kakaoAuthModal: RootSiblings | undefined;

export function useKakaoAuth() {
  return useCallback((option: { token: string }) => {
    return new Promise<string>((resolve, reject) => {
      kakaoAuthModal = new RootSiblings(
        (
          <KakaoAuthModal
            token={option.token}
            open
            onClose={() => {
              kakaoAuthModal?.destroy();
            }}
            onFinish={(result) => {
              if (result.isSuccess) {
                resolve(result.code);
              } else {
                reject();
              }
            }}
          />
        )
      );
    });
  }, []);
}
