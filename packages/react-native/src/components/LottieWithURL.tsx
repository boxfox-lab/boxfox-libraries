import { queryOption } from "@boxfox/react-query";
import AnimatedLottieView from "lottie-react-native";
import React, { ComponentProps, ForwardedRef } from "react";
import { useQuery } from "react-query";

export const LottieWithURL = React.forwardRef(function LottieWithURL(
  props: Omit<ComponentProps<typeof AnimatedLottieView>, "source"> & {
    uri: string;
  },
  ref: ForwardedRef<AnimatedLottieView>
) {
  const query = useQuery<string>(
    props.uri,
    () => fetch(props.uri).then((res) => res.text()),
    queryOption()
  );
  return <AnimatedLottieView ref={ref} {...props} source={query.data ?? ""} />;
});
