"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { parseTheme, THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

type ThemeContextValue = {
  theme: Theme | null;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("Theme controls must be inside ThemeProvider.");
  return context;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setResolvedTheme] = useState<Theme | null>(null);
  const [storageUnavailable, setStorageUnavailable] = useState(false);
  const preference = useRef<Theme | null>(null);

  function applyTheme(next: Theme) {
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;
    setResolvedTheme(next);
  }

  useEffect(() => {
    const media = window.matchMedia?.("(prefers-color-scheme: dark)");
    const systemTheme = (): Theme => media?.matches ? "dark" : "light";
    try {
      preference.current = parseTheme(window.localStorage.getItem(THEME_STORAGE_KEY));
    } catch {
      // A blocked storage API must not prevent using the theme for this tab.
      preference.current = null;
    }
    applyTheme(preference.current ?? systemTheme());
    const onSystemChange = () => {
      if (preference.current === null) applyTheme(systemTheme());
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY && event.key !== null) return;
      try {
        if (event.storageArea && event.storageArea !== window.localStorage) return;
      } catch {
        return;
      }
      preference.current = parseTheme(event.newValue);
      applyTheme(preference.current ?? systemTheme());
      setStorageUnavailable(false);
    };
    media?.addEventListener("change", onSystemChange);
    window.addEventListener("storage", onStorage);
    return () => {
      media?.removeEventListener("change", onSystemChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  function setTheme(next: Theme) {
    preference.current = next;
    applyTheme(next);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
      setStorageUnavailable(false);
    } catch {
      setStorageUnavailable(true);
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
      <span role="status" className="sr-only">
        {storageUnavailable ? "Theme changed for this tab. Your browser is preventing saved preferences." : ""}
      </span>
    </ThemeContext.Provider>
  );
}
