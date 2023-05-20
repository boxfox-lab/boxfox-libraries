import { colors } from "@boxfox/bds-common";
import styled from "@emotion/styled";
import React, { ComponentProps } from "react";
import { useCheckIsMobile } from "../../hooks";
import { Text } from "../Text";

export namespace Form {
  export function Label(props: ComponentProps<typeof Text>) {
    const isMobile = useCheckIsMobile();
    return (
      <Text
        size={isMobile ? "base" : "lg"}
        weight="bold"
        color={colors.gray[700]}
        {...props}
      />
    );
  }

  export const Input = styled.input`
    width: 100%;
    padding: 13px 17px;
    font-family: Pretendard;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 23px;
    background: ${colors.gray[50]};
    border: 1px solid #ebe9e6;
    box-sizing: border-box;
    border-radius: 6px;
    ::placeholder {
      color: ${colors.gray[500]};
    }
  `;

  export const TextArea = styled.textarea`
    width: 100%;
    padding: 13px 17px;
    font-family: Pretendard;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 23px;
    background: ${colors.gray[50]};
    border: 1px solid #ebe9e6;
    box-sizing: border-box;
    border-radius: 6px;
    ::placeholder {
      color: ${colors.gray[500]};
    }
  `;

  export const Select = styled.select`
    width: 100%;
    padding: 13px 14px;
    font-family: Pretendard;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 23px;
    background: ${colors.gray[50]};
    border: 1px solid #ebe9e6;
    box-sizing: border-box;
    border-radius: 6px;
    ::placeholder {
      color: ${colors.gray[500]};
    }
  `;
}
