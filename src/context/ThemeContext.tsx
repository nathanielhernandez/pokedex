import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

interface Props {
  children: React.ReactNode;
}

type Theme = "light" | "dark";

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

const ThemeContextProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem("theme") as Theme) || "light",
  );

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeContextProvider;
