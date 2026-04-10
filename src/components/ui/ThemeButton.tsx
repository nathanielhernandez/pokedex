import React from "react";
import { useTheme } from "../../context/ThemeContext";

const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} className="dark:text-neutral-50">
      {theme}
    </button>
  );
};

export default ThemeButton;
