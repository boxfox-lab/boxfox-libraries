import { EdgeInsets } from "react-native-safe-area-context";
import "styled-components";
import { colors } from "./constants";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: typeof colors["light"];
    edgeInsets: EdgeInsets;
  }
}
