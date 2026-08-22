/**
 * Helper to construct URLs pointing to the main Vrika application / dashboard.
 * - If `NEXT_PUBLIC_APP_URL` is explicitly set (e.g. https://app.vrika.io), it prepends the origin.
 * - Otherwise, it uses same-origin relative paths (e.g. /login, /register, /dashboard),
 *   which work seamlessly behind reverse proxies (like Nginx) on any host IP or domain.
 */
export function getAppUrl(path: string = ""): string {
  const base = process.env.NEXT_PUBLIC_APP_URL?.trim();
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (!base) return cleanPath;
  return `${base.replace(/\/+$/, "")}${cleanPath}`;
}
