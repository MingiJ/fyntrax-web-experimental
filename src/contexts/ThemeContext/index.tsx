"use client";
import {
  createContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
  useContext,
} from "react";

import { IThemeContext, IThemeContextProvider } from "./types";

export const ThemeContext = createContext<IThemeContext>({
  theme: "",
  toggleTheme: () => {},
});

const ThemeContextProvider = ({ children }: IThemeContextProvider) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("fyntrax-theme");

      if (savedTheme) {
        setTheme(savedTheme);
      }
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("fyntrax-theme", newTheme);
  }, [theme]);

  const value = useMemo(() => {
    return {
      theme,
      toggleTheme,
    };
  }, [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContextProvider;

export const useThemeContext = () => useContext(ThemeContext);
