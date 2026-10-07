import { isRomanceGame100Complete } from "@/game/social/dialogue";
import type { SaveGame } from "@/game/types";

export const ROMANCE_ENDING_COMPLETE_FLAG = "campaign:all-romances-complete";
export const ROMANCE_ENDING_SEEN_FLAG = "campaign:all-romances-ending-seen";

/**
 * O "fim" narrativo/sistêmico da campanha acontece quando todos os sete
 * personagens concluíram os dois marcos presenciais (DATE 1 e DATE 2).
 * O loop operacional continua depois disso; esta função só controla a tela
 * comemorativa única de conclusão.
 */
export function hasCompletedAllRomances(save: SaveGame) {
  return isRomanceGame100Complete(save);
}

export function shouldShowRomanceEnding(save: SaveGame) {
  return hasCompletedAllRomances(save) && !save.flags.includes(ROMANCE_ENDING_SEEN_FLAG);
}

export function markRomanceEndingSeen(save: SaveGame): SaveGame {
  if (!hasCompletedAllRomances(save)) return save;
  return {
    ...save,
    flags: Array.from(new Set([
      ...save.flags,
      ROMANCE_ENDING_COMPLETE_FLAG,
      ROMANCE_ENDING_SEEN_FLAG,
    ])),
  };
}
