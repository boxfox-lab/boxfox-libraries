import React, { Component, ComponentProps, ReactNode } from "react";
import RootSiblings from "react-native-root-siblings";
import { ToastContainer, durations, positions } from "./ToastContainer";

export class Toast extends Component<ComponentProps<typeof ToastContainer>> {
  static displayName = "Toast";
  static positions = positions;
  static durations = durations;

  static show = (
    message: ReactNode,
    options: ComponentProps<typeof ToastContainer> = {
      position: positions.BOTTOM,
      duration: durations.SHORT,
    }
  ) => {
    return new RootSiblings(
      (
        <ToastContainer {...options} visible={true}>
          {message}
        </ToastContainer>
      )
    );
  };

  static hide = (toast: RootSiblings) => {
    if (toast instanceof RootSiblings) {
      toast.destroy();
    } else {
      console.warn(
        `Toast.hide expected a \`RootSiblings\` instance as argument.\nBut got \`${typeof toast}\` instead.`
      );
    }
  };

  private _toast: RootSiblings | null = null;

  componentWillMount = () => {
    this._toast = new RootSiblings(
      <ToastContainer {...this.props} duration={0} />
    );
  };

  componentWillReceiveProps = (
    nextProps: ComponentProps<typeof ToastContainer>
  ) => {
    this._toast?.update(<ToastContainer {...nextProps} duration={0} />);
  };

  componentWillUnmount = () => {
    this._toast?.destroy();
  };

  render() {
    return null;
  }
}

export { RootSiblings as Manager };
