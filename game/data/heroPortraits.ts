import { HERO_PORTRAITS } from "@/content/characters/portraits";
export const heroPortraits = HERO_PORTRAITS;
export function getHeroPortrait(heroId: string) { return heroPortraits[heroId] ?? null; }
