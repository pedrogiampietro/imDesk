import "styled-components";
import { darkTheme } from "../assets/styles/theme";

declare module "styled-components" {
  type ThemeType = typeof darkTheme;

  export interface DefaultTheme extends ThemeType {}
}
