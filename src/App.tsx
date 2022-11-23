import { useState, createContext } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./assets/styles/globalStyles";
import { darkTheme, lightTheme } from "./assets/styles/theme";

import { AuthRoutes } from "./authRoutes";

interface IContextData {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

export const ThemeContext = createContext({} as IContextData);

export function App() {
  const [theme, setTheme] = useState("light");
  const themeStyle = theme === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ setTheme, theme } as any}>
      <ThemeProvider theme={themeStyle}>
        <GlobalStyle />

        <AuthRoutes />
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
