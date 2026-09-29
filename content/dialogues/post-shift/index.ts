import type { DialogueScene, SaveGame } from "@/game/types";
import { yukiPostShift } from "./yuki";
import { elysiaPostShift } from "./elysia";
import { lysandroPostShift } from "./lysandro";
import { helioPostShift } from "./helio";
import { demetriaPostShift } from "./demetria";
import { alexandraPostShift } from "./alexandra";
import { erosPostShift } from "./eros";

/** Registro central. Adicione/remova cenas aqui. */
export const postShiftScenes: DialogueScene[] = [
  yukiPostShift, elysiaPostShift, lysandroPostShift, helioPostShift, demetriaPostShift, alexandraPostShift, erosPostShift,
];

export function isSceneAvailable(scene: DialogueScene, save: SaveGame) {
  const rule = scene.availability;
  if (rule?.enabled === false) return false;
  if (rule?.minDay != null && save.player.currentDay < rule.minDay) return false;
  if (rule?.maxDay != null && save.player.currentDay > rule.maxDay) return false;
  if (rule?.requiredFlags?.some((flag) => !save.flags.includes(flag))) return false;
  if (rule?.blockedFlags?.some((flag) => save.flags.includes(flag))) return false;
  if (scene.completionFlag && save.flags.includes(scene.completionFlag)) return false;
  return true;
}
