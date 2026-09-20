export const THEME_STORAGE_KEY = "vrika-theme";
export type Theme = "light" | "dark";

export function parseTheme(value: unknown): Theme | null {
  return value === "light" || value === "dark" ? value : null;
}

/** Runs in the document head before themed content can paint. */
export const THEME_BOOTSTRAP = `(function(){var theme=null;try{var saved=localStorage.getItem("${THEME_STORAGE_KEY}");if(saved==="light"||saved==="dark")theme=saved;}catch(error){/* Storage can be blocked; use the system preference. */}if(!theme)theme=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme;})();`;
