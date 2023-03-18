import { Dimensions } from "react-native";

export const layout = {
  window: Dimensions.get("window"),
  screen: Dimensions.get("screen"),
  isSmallDevice: Dimensions.get("window").width < 375,
};

export default layout;
