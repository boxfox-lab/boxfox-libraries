import React, { Component, ComponentProps } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
const TOAST_MAX_WIDTH = 0.8;
const TOAST_ANIMATION_DURATION = 200;

const positions = {
  TOP: 20,
  BOTTOM: -20,
  CENTER: 0,
};

const durations = {
  LONG: 3500,
  SHORT: 2000,
};

let styles = StyleSheet.create({
  defaultStyle: {
    position: "absolute",
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  containerStyle: {
    padding: 10,
    backgroundColor: "#000",
    opacity: 0.8,
    borderRadius: 5,
  },
  shadowStyle: {
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 10,
  },
  textStyle: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
});

interface Props extends ComponentProps<typeof View> {
  containerStyle?: ViewStyle;
  duration?: number;
  visible?: boolean;
  position?: number;
  animation?: boolean;
  shadow?: boolean;
  keyboardAvoiding?: boolean;
  backgroundColor?: ViewStyle["backgroundColor"];
  opacity?: number;
  shadowColor?: string;
  textColor?: string;
  textStyle?: ComponentProps<typeof Text>["style"];
  delay?: number;
  hideOnPress?: boolean;
  onPress?: Function;
  onHide?: Function;
  onHidden?: Function;
  onShow?: Function;
  onShown?: Function;
  siblingManager?: unknown;
}

interface State {
  visible?: boolean;
  opacity: Animated.Value;
  windowWidth: number;
  windowHeight: number;
  keyboardScreenY: number;
}

export class ToastContainer extends Component<Props, State> {
  static displayName = "ToastContainer";

  private _animating?: any = false;
  private _root: View | null = null;
  private _hideTimeout?: any = null;
  private _showTimeout?: any = null;

  static defaultProps = {
    visible: false,
    duration: durations.SHORT,
    animation: true,
    shadow: true,
    position: positions.BOTTOM,
    opacity: 0.8,
    delay: 0,
    hideOnPress: true,
    keyboardAvoiding: true,
  };

  constructor(props: Props) {
    super(props);
    const window = Dimensions.get("window");
    this.state = {
      visible: this.props.visible ?? false,
      opacity: new Animated.Value(0),
      windowWidth: window.width,
      windowHeight: window.height,
      keyboardScreenY: window.height,
    };
  }

  componentDidMount = () => {
    Dimensions.addEventListener("change", this._windowChanged);
    if (this.props.keyboardAvoiding) {
      Keyboard.addListener(
        "keyboardDidChangeFrame",
        this._keyboardDidChangeFrame
      );
    }
    if (this.state.visible) {
      this._showTimeout = setTimeout(() => this._show(), this.props.delay);
    }
  };

  componentDidUpdate = (prevProps: Props) => {
    if (this.props.visible !== prevProps.visible) {
      if (this.props.visible) {
        clearTimeout(this._showTimeout);
        clearTimeout(this._hideTimeout);
        this._showTimeout = setTimeout(() => this._show(), this.props.delay);
      } else {
        this._hide();
      }

      this.setState({
        visible: this.props.visible,
      });
    }
  };

  componentWillUnmount = () => {
    this._hide();
    Dimensions.removeEventListener("change", this._windowChanged);
    Keyboard.removeListener(
      "keyboardDidChangeFrame",
      this._keyboardDidChangeFrame
    );
  };

  _windowChanged = ({
    window,
  }: {
    window: { width: number; height: number };
  }) => {
    this.setState({
      windowWidth: window.width,
      windowHeight: window.height,
    });
  };

  _keyboardDidChangeFrame = ({
    endCoordinates,
  }: {
    endCoordinates: { screenY: number };
  }) => {
    this.setState({
      keyboardScreenY: endCoordinates.screenY,
    });
  };

  _show = () => {
    clearTimeout(this._showTimeout);
    if (!this._animating) {
      clearTimeout(this._hideTimeout);
      this._animating = true;
      this._root?.setNativeProps({
        pointerEvents: "auto",
      });
      this.props.onShow && this.props.onShow(this.props.siblingManager);
      Animated.timing(this.state.opacity, {
        toValue: this.props.opacity ?? ToastContainer.defaultProps.opacity,
        duration: this.props.animation ? TOAST_ANIMATION_DURATION : 0,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          this._animating = !finished;
          this.props.onShown && this.props.onShown(this.props.siblingManager);
          if (this.props.duration ?? ToastContainer.defaultProps.duration > 0) {
            this._hideTimeout = setTimeout(
              () => this._hide(),
              this.props.duration
            );
          }
        }
      });
    }
  };

  _hide = () => {
    clearTimeout(this._showTimeout);
    clearTimeout(this._hideTimeout);
    if (!this._animating) {
      if (this._root) {
        this._root.setNativeProps({
          pointerEvents: "none",
        });
      }

      if (this.props.onHide) {
        this.props.onHide(this.props.siblingManager);
      }

      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: this.props.animation ? TOAST_ANIMATION_DURATION : 0,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          this._animating = false;
          this.props.onHidden && this.props.onHidden(this.props.siblingManager);
        }
      });
    }
  };

  render() {
    let { props } = this;
    const { windowWidth } = this.state;
    let offset = props.position;

    const { windowHeight, keyboardScreenY } = this.state;
    const keyboardHeight = Math.max(windowHeight - keyboardScreenY, 0);
    let position = offset
      ? {
          [offset < 0 ? "bottom" : "top"]:
            offset < 0 ? keyboardHeight - offset : offset,
        }
      : {
          top: 0,
          bottom: keyboardHeight,
        };

    return this.state.visible || this._animating ? (
      <View style={[styles.defaultStyle, position]} pointerEvents="box-none">
        <TouchableWithoutFeedback
          onPress={() => {
            typeof this.props.onPress === "function"
              ? this.props.onPress()
              : null;
            this.props.hideOnPress ? this._hide() : null;
          }}
        >
          <Animated.View
            style={[
              styles.containerStyle,
              { marginHorizontal: windowWidth * ((1 - TOAST_MAX_WIDTH) / 2) },
              props.containerStyle,
              props.backgroundColor
                ? {
                    backgroundColor: props.backgroundColor,
                  }
                : {},
              {
                opacity: this.state.opacity,
              },
              props.shadow && styles.shadowStyle,
              props.shadowColor ? { shadowColor: props.shadowColor } : {},
            ]}
            pointerEvents="none"
            ref={(ele: View) => (this._root = ele)}
          >
            {typeof this.props.children === "string" ? (
              <Text
                style={[
                  styles.textStyle,
                  props.textStyle,
                  props.textColor ? { color: props.textColor } : {},
                ]}
              >
                {this.props.children}
              </Text>
            ) : (
              this.props.children
            )}
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    ) : null;
  }
}

export { positions, durations };
