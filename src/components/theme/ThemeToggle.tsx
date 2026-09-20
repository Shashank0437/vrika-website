"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle({ placement = "inline" }: { placement?: "inline" | "floating" }) {
  const { theme, setTheme } = useTheme();
  return (
    <button
      type="button"
      className="theme-toggle"
      data-theme-toggle={placement}
      aria-label="Dark mode"
      aria-pressed={theme === "dark"}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      disabled={theme === null}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Moon className="theme-toggle-moon" size={18} aria-hidden="true" />
      <Sun className="theme-toggle-sun" size={18} aria-hidden="true" />
    </button>
  );
}
