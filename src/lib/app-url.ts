/**
 * Helper to construct URLs pointing to the main Vrika application / dashboard.
 * Configurable via NEXT_PUBLIC_APP_URL (e.g. http://localhost:3001 or https://app.vrika.io).
 */
export function getAppUrl(path: string = ""): string {
  const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (!base) return cleanPath;
  return `${base.replace(/\/+$/, "")}${cleanPath}`;
}
