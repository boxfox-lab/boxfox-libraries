import React, { ReactNode } from "react";
import {
  CheckCircleIcon,
  InformationCircleIcon,
  MinusCircleIcon,
  XCircleIcon,
} from "react-native-heroicons/solid";
import { colors as activeColors } from "@boxfox/bds-common";
import { colors } from "../../constants/colors";
import { Flex } from "../Flex";
import { Spacing } from "../Spacing";
import { Text } from "../Text";
import { Toast } from "./Toast";

export namespace DarkToast {
  export function show(
    message: string,
    options?: Parameters<typeof Toast.show>[1] & {
      icon?: ReactNode;
    }
  ) {
    Toast.show(
      <Flex.CenterVertical direction="row">
        {options?.icon && (
          <>
            {options.icon}
            <Spacing width={10} />
          </>
        )}
        <Text size="sm" color={activeColors.white}>
          {message}
        </Text>
      </Flex.CenterVertical>,
      {
        backgroundColor: colors.light.gray700,
        opacity: 1,
        shadow: false,
        position: -50,
        containerStyle: { paddingHorizontal: 16 },
        ...options,
      }
    );
  }
  export function success(
    message: string,
    options?: Parameters<typeof Toast.show>[1]
  ) {
    show(message, {
      icon: <CheckCircleIcon size={20} color={activeColors.green[400]} />,
      ...options,
    });
  }
  export function error(
    message: string,
    options?: Parameters<typeof Toast.show>[1]
  ) {
    show(message, {
      icon: <XCircleIcon color={activeColors.red[400]} size={20} />,
      ...options,
    });
  }
  export function warn(
    message: string,
    options?: Parameters<typeof Toast.show>[1]
  ) {
    show(message, {
      icon: <MinusCircleIcon color={activeColors.yellow[400]} size={20} />,
      ...options,
    });
  }
  export function info(
    message: string,
    options?: Parameters<typeof Toast.show>[1]
  ) {
    show(message, {
      icon: <InformationCircleIcon size={20} color={activeColors.blue[400]} />,
      ...options,
    });
  }
}
