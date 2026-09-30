import type { DialogueScene, SaveGame } from "@/game/types";
import { getRomanceProgress, hasAdvancedRouteToday } from "@/game/social/dialogue";
import { yukiPostShiftScenes } from "./yuki";
import { elysiaPostShift } from "./elysia";
import { lysandroPostShift } from "./lysandro";
import { helioPostShift } from "./helio";
import { demetriaPostShift } from "./demetria";
import { alexandraPostShift } from "./alexandra";
import { erosPostShift } from "./eros";
import { placeholderPostShiftScenes } from "./placeholders";

/** Registro central. Mantenha a ordem cronológica de autoria. */
export const postShiftScenes: DialogueScene[] = [
  ...yukiPostShiftScenes, elysiaPostShift, lysandroPostShift, helioPostShift, demetriaPostShift, alexandraPostShift, erosPostShift,
  ...placeholderPostShiftScenes,
];

export function isSceneAvailable(scene: DialogueScene, save: SaveGame) {
  const rule = scene.availability;
  if (rule?.enabled === false) return false;
  // Uma personagem pode avancar no maximo uma etapa de rota por noite global.
  // Isso preserva a rota lenta e impede consumir D1-D10 em uma unica noite.
  if (hasAdvancedRouteToday(save, scene.characterId)) return false;
  const stage = save.social.routeStage[scene.characterId] ?? 1;
  const sceneStage = scene.day ?? rule?.minDay ?? 1;
  if (sceneStage !== stage) return false;
  if (rule?.minDay != null && stage < rule.minDay) return false;
  if (rule?.maxDay != null && stage > rule.maxDay) return false;
  if (rule?.requiredFlags?.some((flag) => !save.flags.includes(flag))) return false;
  if (rule?.blockedFlags?.some((flag) => save.flags.includes(flag))) return false;
  if (rule?.minRomanceProgress != null && getRomanceProgress(save, scene.characterId) < rule.minRomanceProgress) return false;
  if (scene.completionFlag && save.flags.includes(scene.completionFlag)) return false;
  return true;
}
