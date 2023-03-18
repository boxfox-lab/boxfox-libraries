import { useFocusEffect } from "@react-navigation/core";
import { Platform, StatusBar } from "react-native";

export function useBackgroundColor(
  color: string,
  style: "default" | "light-content" | "dark-content"
) {
  useFocusEffect(() => {
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor(color);
      StatusBar.setBarStyle(style);
    }
  });
}
