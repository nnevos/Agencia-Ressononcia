import { SOCIAL_BALANCE } from "@/content/config/social";
import type { DialogueChoice, DialogueScene, DialogueTurn, SaveGame } from "@/game/types";

export type NormalizedDialogueTurn = DialogueTurn & { isOpeningTurn?: boolean };
export function getDialogueTurns(scene: DialogueScene): NormalizedDialogueTurn[] { return [{ id:`${scene.id}:opening`, incoming:scene.opening, choices:scene.choices, timeLabel:scene.timeLabel, isOpeningTurn:true }, ...(scene.followUps ?? [])]; }
export function getCompletedChoice(turn: DialogueTurn, save: SaveGame) { return turn.choices.find((choice)=>save.flags.includes(choice.flag)) ?? null; }
export function getCurrentTurn(scene: DialogueScene, save: SaveGame) { const turns=getDialogueTurns(scene); for(let i=0;i<turns.length;i++){ if(!turns.slice(0,i).every(t=>Boolean(getCompletedChoice(t,save)))) return null; if(!getCompletedChoice(turns[i],save)) return {turn:turns[i],index:i,turns}; } return null; }
export function isDialogueSceneComplete(scene: DialogueScene, save: SaveGame) { if(scene.completionFlag && save.flags.includes(scene.completionFlag)) return true; return getDialogueTurns(scene).every(t=>Boolean(getCompletedChoice(t,save))); }
/** scene.day agora representa a etapa da rota individual. */
export function getSceneDay(scene: DialogueScene) { return scene.day ?? scene.availability?.minDay ?? 1; }
export function getRouteStage(save: SaveGame, characterId: string) { return Math.max(1, save.social.routeStage[characterId] ?? 1); }
export function routeAdvanceFlag(day: number, characterId: string) { return `social:route-advanced:day:${day}:${characterId}`; }
export function hasAdvancedRouteToday(save: SaveGame, characterId: string) { return save.flags.includes(routeAdvanceFlag(save.player.currentDay, characterId)); }

export function getStageRomanceEarned(save: SaveGame, characterId: string, stage: number) { return Math.max(0, save.social.romanceEarnedByStage[String(stage)]?.[characterId] ?? 0); }
export function getRomanceStageCap(scene: DialogueScene) { return scene.romanceBudget ?? SOCIAL_BALANCE.romanceStageCap; }
export function getRomanceGain(save: SaveGame, scene: DialogueScene, choice: DialogueChoice) { const affinity=choice.romanceAffinity ?? 0; if(!affinity)return 0; const stage=getSceneDay(scene); const raw=SOCIAL_BALANCE.romancePointsByAffinity[affinity] ?? 0; return Math.min(raw, Math.max(0,getRomanceStageCap(scene)-getStageRomanceEarned(save,scene.characterId,stage))); }
export function getRomanceProgress(save: SaveGame, characterId: string) { return Math.max(0,Math.min(SOCIAL_BALANCE.maxRomanceProgress,save.social.romanceProgress[characterId] ?? 0)); }
export function getOutingThreshold(stage: number) { return SOCIAL_BALANCE.outingThresholdByStage[stage] ?? null; }
export function canChooseOuting(save: SaveGame, characterId: string, stage: number, projectedGain=0) { const threshold=getOutingThreshold(stage); const selected=save.social.outingsByGlobalDay[String(save.player.currentDay)]; const done=save.social.outingMilestones[characterId]?.includes(stage) ?? false; const projectedProgress=Math.min(100,getRomanceProgress(save,characterId)+Math.max(0,projectedGain)); return { allowed:threshold!=null && !done && (!selected||selected===characterId) && projectedProgress>=threshold, threshold, selected, projectedProgress, done }; }
export function isRomanceRouteComplete(save: SaveGame, characterId: string) { const done=save.social.outingMilestones[characterId] ?? []; return SOCIAL_BALANCE.completionOutingMilestones.every(stage=>done.includes(stage)); }
export function isRomanceGame100Complete(save: SaveGame) { return Object.keys(save.social.routeStage).every(id=>isRomanceRouteComplete(save,id)); }
// aliases temporarios para componentes antigos durante a migracao
export const getDailyRomanceEarned = getStageRomanceEarned;
export const getRomanceDailyCap = getRomanceStageCap;
