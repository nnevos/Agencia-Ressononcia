export type RessonanciaSettings = {
  reducedMotion: boolean;
  textSpeed: "normal" | "fast";
};

const SETTINGS_KEY = "ressonancia.settings";
export const DEFAULT_SETTINGS: RessonanciaSettings = { reducedMotion: false, textSpeed: "normal" };

export function loadSettings(): RessonanciaSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  const raw = localStorage.getItem(SETTINGS_KEY);
  if (!raw) return DEFAULT_SETTINGS;
  try {
    const value = JSON.parse(raw) as Partial<RessonanciaSettings>;
    return {
      reducedMotion: Boolean(value.reducedMotion),
      textSpeed: value.textSpeed === "fast" ? "fast" : "normal",
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function writeSettings(settings: RessonanciaSettings): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  window.dispatchEvent(new CustomEvent("ressonancia:settings", { detail: settings }));
}

export function dialogueRevealDelay(): number {
  return loadSettings().textSpeed === "fast" ? 360 : 620;
}
