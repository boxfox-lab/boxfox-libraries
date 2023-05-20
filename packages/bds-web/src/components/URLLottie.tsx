import { useCallbackRef } from "@boxfox/core-hooks";
import { queryOption } from "@boxfox/react-query";
import axios from "axios";
import React, { ComponentProps } from "react";
import Lottie, { EventListener } from "react-lottie";
import { useQuery } from "react-query";

export function UrlLottie({
  src,
  className,
  onComplete,
  onLoopComplete,
  onEnterFrame,
  ...rest
}: {
  src: string;
  className?: string;
  onComplete?: () => void;
  onLoopComplete?: () => void;
  onEnterFrame?: () => void;
  options: Omit<ComponentProps<typeof Lottie>["options"], "animationData">;
} & Omit<ComponentProps<typeof Lottie>, "options">) {
  const { data } = useQuery(
    src,
    () => axios.get(src).then((res) => res.data),
    queryOption()
  );
  const completeListener = useEventListener("complete", onComplete);
  const loopCompleteListener = useEventListener("loopComplete", onLoopComplete);
  const enterFrameListener = useEventListener("enterFrame", onEnterFrame);

  if (data == null) {
    return <></>;
  }
  return (
    <Lottie
      isClickToPauseDisabled={true}
      {...rest}
      options={{
        ...rest.options,
        animationData: data,
      }}
      eventListeners={[
        completeListener,
        loopCompleteListener,
        enterFrameListener,
      ]}
    />
  );
}

function useEventListener(
  eventName: EventListener["eventName"],
  callback?: () => void
): EventListener {
  const preservedCallback = useCallbackRef(callback ?? (() => {}));
  return {
    eventName,
    callback: preservedCallback,
  };
}
