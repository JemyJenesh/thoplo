import { createContext, useState, useEffect } from "react";
import { createMuiTheme } from "@material-ui/core/styles";

const flat = {
  elevation: 0,
};

export const theme = (dark = true) =>
  createMuiTheme({
    props: {
      MuiButton: {
        disableRipple: true,
        disableElevation: true,
      },
      MuiPaper: flat,
      // MuiAppBar: flat,
      MuiMenu: {
        elevation: 1,
      },
    },
    typography: {
      fontFamily: "Poppins, sans-serif",
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 600,
      fontWeightBold: 700,
    },
    palette: {
      type: dark ? "dark" : "light",
      primary: {
        main: dark ? "#90caf9" : "#1976D2",
      },
      secondary: {
        main: dark ? "#f48fb1" : "#DC004E",
      },
    },
    shape: {
      borderRadius: 8,
    },
  });

export const ThemeContext = createContext();

export default function ThemeContextProvider({ children }) {
  const { Provider } = ThemeContext;
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => {
    localStorage.setItem("isDark", JSON.stringify(!isDark));
    setIsDark((prev) => !prev);
  };

  useEffect(() => {
    let dark = localStorage.getItem("isDark");
    if (dark) {
      dark = JSON.parse(dark);
      setIsDark(dark);
    } else {
      localStorage.setItem("isDark", JSON.stringify(false));
    }
  }, []);
  return <Provider value={{ isDark, toggleTheme }}>{children}</Provider>;
}
