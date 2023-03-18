import type { LinearGradient as BaseLinearGradient } from "expo-linear-gradient";

function getLinearGradient(): typeof BaseLinearGradient {
  try {
    const RNLinearGraidnet = require("react-native-linear-gradient");
    return RNLinearGraidnet.default ?? RNLinearGraidnet.LinearGradient;
  } catch {
    const { LinearGradient } = require("expo-linear-gradient");
    return LinearGradient;
  }
}

export const AdaptiveLinearGradient = getLinearGradient();
export const LinearGradient = AdaptiveLinearGradient;
