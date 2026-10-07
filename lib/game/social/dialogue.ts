import { SOCIAL_BALANCE } from "@/content/config/social";
import type { DialogueChoice, DialogueScene, DialogueTurn, SaveGame } from "@/game/types";

export type NormalizedDialogueTurn = DialogueTurn & { isOpeningTurn?: boolean };
export function getDialogueTurns(scene: DialogueScene): NormalizedDialogueTurn[] {
  return [{
    id:`${scene.id}:opening`,
    incoming:scene.opening,
    incomingImage:scene.openingImage,
    incomingImageAlt:scene.openingImageAlt,
    prefaceOutgoing:scene.openingOutgoing,
    afterIncoming:scene.openingAfterIncoming,
    choices:scene.choices,
    timeLabel:scene.timeLabel,
    isOpeningTurn:true,
  }, ...(scene.followUps ?? [])];
}
export function getCompletedChoice(turn: DialogueTurn, save: SaveGame) { return turn.choices.find((choice)=>save.flags.includes(choice.flag)) ?? null; }
export function getCurrentTurn(scene: DialogueScene, save: SaveGame) { const turns=getDialogueTurns(scene); for(let i=0;i<turns.length;i++){ if(!turns.slice(0,i).every(t=>Boolean(getCompletedChoice(t,save)))) return null; if(!getCompletedChoice(turns[i],save)) return {turn:turns[i],index:i,turns}; } return null; }
export function isDialogueSceneComplete(scene: DialogueScene, save: SaveGame) { if(scene.completionFlag && save.flags.includes(scene.completionFlag)) return true; return getDialogueTurns(scene).every(t=>Boolean(getCompletedChoice(t,save))); }
/** scene.day agora representa a etapa da rota individual. */
export function getSceneDay(scene: DialogueScene) { return scene.day ?? scene.availability?.minDay ?? 1; }
export function getRouteStage(save: SaveGame, characterId: string) { return Math.max(1, save.social.routeStage[characterId] ?? 1); }
export function routeAdvanceFlag(day: number, characterId: string) { return `social:route-advanced:day:${day}:${characterId}`; }
export function dialogueIntroOutgoingFlag(turnId: string) { return `social:intro-outgoing-sent:${turnId}`; }
export function hasAdvancedRouteToday(save: SaveGame, characterId: string) { return save.flags.includes(routeAdvanceFlag(save.player.currentDay, characterId)); }

/**
 * O percentual de romance agora representa apenas o progresso estrutural da rota.
 * Escolhas 100/50/30 continuam existindo como metadado autoral/relacional, mas
 * nao concedem XP de romance nem alteram este percentual.
 *
 * routeStage aponta para a proxima etapa disponivel. Portanto, etapas concluidas
 * = routeStage - 1. O denominador vem da quantidade de etapas autoradas da rota.
 */
export function getRomanceProgress(save: SaveGame, characterId: string, totalStages = Math.max(...SOCIAL_BALANCE.completionOutingMilestones)) {
  const safeTotal = Math.max(1, totalStages);
  const completedStages = Math.max(0, Math.min(safeTotal, getRouteStage(save, characterId) - 1));
  return Math.round((completedStages / safeTotal) * SOCIAL_BALANCE.maxRomanceProgress);
}
export function getOutingThreshold(stage: number) { return SOCIAL_BALANCE.outingStages.includes(stage as 3 | 6) ? stage : null; }
export function canChooseOuting(save: SaveGame, characterId: string, stage: number) {
  const milestone = getOutingThreshold(stage);
  const selected = save.social.outingsByGlobalDay[String(save.player.currentDay)];
  const done = save.social.outingMilestones[characterId]?.includes(stage) ?? false;
  return { allowed: milestone != null && !done && (!selected || selected === characterId), threshold: null, selected, projectedProgress: null, done };
}
export function isRomanceRouteComplete(save: SaveGame, characterId: string) { const done=save.social.outingMilestones[characterId] ?? []; return SOCIAL_BALANCE.completionOutingMilestones.every(stage=>done.includes(stage)); }
export function isRomanceGame100Complete(save: SaveGame) { return Object.keys(save.social.routeStage).every(id=>isRomanceRouteComplete(save,id)); }
