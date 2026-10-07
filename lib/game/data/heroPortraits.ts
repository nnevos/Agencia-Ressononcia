import { publicPath } from "@/lib/publicPath";
import { HERO_PORTRAITS } from "@/content/characters/portraits";
export const heroPortraits = HERO_PORTRAITS;
export function getHeroPortrait(heroId: string) { const portrait = heroPortraits[heroId]; return portrait ? publicPath(portrait) : null; }
