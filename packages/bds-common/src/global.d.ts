import "styled-components";
import { colors } from "./constants";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: typeof colors["light"];
  }
}
