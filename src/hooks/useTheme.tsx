
import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check user preference from localStorage
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    
    // If no preference is saved, use system preference
    if (!savedTheme) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches 
        ? "dark" 
        : "light";
    }
    
    return savedTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme };
}
