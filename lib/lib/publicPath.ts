const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").trim().replace(/\/$/, "");

/** Prefixa assets de public/ quando a build é publicada sob um subdiretório (GitHub Pages). */
export function publicPath(path: string | null | undefined): string {
  if (!path) return "";
  if (/^(?:https?:|data:|blob:)/i.test(path)) return path;
  if (!path.startsWith("/")) return path;
  if (!BASE_PATH || path === BASE_PATH || path.startsWith(`${BASE_PATH}/`)) return path;
  return `${BASE_PATH}${path}`;
}

export function getPublicBasePath(): string { return BASE_PATH; }
