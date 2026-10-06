import type { DialogueScene, SaveGame } from "@/game/types";
import { hasAdvancedRouteToday } from "@/game/social/dialogue";
import { yukiPostShiftScenes } from "./yuki";
import { elysiaPostShiftScenes } from "./elysia";
import { lysandroPostShiftScenes } from "./lysandro";
import { helioPostShiftScenes } from "./helio";
import { demetriaPostShiftScenes } from "./demetria";
import { alexandraPostShiftScenes } from "./alexandra";
import { erosPostShiftScenes } from "./eros";
import { placeholderPostShiftScenes } from "./placeholders";

/** Registro central. Mantenha a ordem cronológica de autoria. */
export const postShiftScenes: DialogueScene[] = [
  ...yukiPostShiftScenes, ...elysiaPostShiftScenes, ...lysandroPostShiftScenes, ...helioPostShiftScenes, ...demetriaPostShiftScenes, ...alexandraPostShiftScenes, ...erosPostShiftScenes,
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
  // minRomanceProgress foi descontinuado em v0.2.11: progresso social e definido pela etapa da rota.
  if (scene.completionFlag && save.flags.includes(scene.completionFlag)) return false;
  return true;
}
