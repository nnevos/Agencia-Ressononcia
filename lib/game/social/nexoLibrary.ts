import { postShiftScenes, isSceneAvailable } from "@/content/dialogues/post-shift";
import { outingScenes } from "@/content/narrative/outings";
import { getCompletedChoice, getCurrentTurn, getDialogueTurns, getRouteStage } from "@/game/social/dialogue";
import type { SaveGame } from "@/game/types";

export type NexoPhotoMemory = { src: string; alt: string; characterId: string; speaker: string; sceneId: string };

const NEXO_ACTIVITY_PREFIX = "nexo:activity:";

export function recordNexoActivity(save: SaveGame, characterId: string, at = Date.now()) {
  const prefix = `${NEXO_ACTIVITY_PREFIX}${characterId}:`;
  const flags = save.flags.filter((flag) => !flag.startsWith(prefix));
  flags.push(`${prefix}${save.player.currentDay}:${at}`);
  return { ...save, flags };
}

export function getNexoActivity(save: SaveGame, characterId: string) {
  const prefix = `${NEXO_ACTIVITY_PREFIX}${characterId}:`;
  const flag = [...save.flags].reverse().find((item) => item.startsWith(prefix));
  if (!flag) return null;
  const payload = flag.slice(prefix.length).split(":");
  const day = Number(payload[0]);
  const at = Number(payload[1]);
  if (!Number.isFinite(day) || !Number.isFinite(at)) return null;
  return { day, at };
}

export function nexoReadFlag(save: SaveGame, characterId: string) {
  const stage = getRouteStage(save, characterId);
  const scene = postShiftScenes.find((item) => item.characterId === characterId && (item.day ?? item.availability?.minDay ?? 1) === stage && isSceneAvailable(item, save));
  const turnId = scene ? getCurrentTurn(scene, save)?.turn.id : null;
  const token = turnId ? turnId.replaceAll(":", "_") : `stage_${stage}`;
  return `nexo:read:${save.player.currentDay}:${characterId}:${token}`;
}

export function isNexoContactRead(save: SaveGame, characterId: string) {
  return save.flags.includes(nexoReadFlag(save, characterId));
}

export function collectUnlockedNexoPhotos(save: SaveGame): NexoPhotoMemory[] {
  const seen = new Set<string>();
  const result: NexoPhotoMemory[] = [];
  for (const scene of postShiftScenes) {
    for (const turn of getDialogueTurns(scene)) {
      const completed = getCompletedChoice(turn, save);
      if (!completed) break;
      const media = [
        ...(turn.incomingImage ? [{ src: turn.incomingImage, alt: turn.incomingImageAlt ?? "Foto recebida no NEXO." }] : []),
        ...(turn.afterIncoming ?? []).filter((item) => item.image).map((item) => ({ src: item.image!, alt: item.imageAlt ?? "Foto recebida no NEXO." })),
        ...(completed.afterResponse ?? []).filter((item) => item.image).map((item) => ({ src: item.image!, alt: item.imageAlt ?? "Foto recebida no NEXO." })),
      ];
      for (const item of media) {
        if (seen.has(item.src)) continue;
        seen.add(item.src);
        result.push({ ...item, characterId: scene.characterId, speaker: scene.speaker, sceneId: scene.id });
      }
    }
  }
  return result;
}

export function collectCompletedOutings(save: SaveGame) {
  return outingScenes.filter((scene) => save.social.outingMilestones[scene.characterId]?.includes(scene.day));
}
