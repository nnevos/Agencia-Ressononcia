import { heroes } from "@/game/data/heroes";
import { PROGRESSION_BALANCE } from "@/content/config/balance";
import type { AttributeKey, HeroProgression, MissionOutcome } from "@/game/types";

export const MAX_HERO_LEVEL = PROGRESSION_BALANCE.maxHeroLevel;
export const MAX_ATTRIBUTE_VALUE = PROGRESSION_BALANCE.maxAttributeValue;
export const LEVEL_XP: Record<number, number> = PROGRESSION_BALANCE.levelXp;

export function createInitialHeroProgression(): Record<string, HeroProgression> {
  return Object.fromEntries(heroes.map((hero) => [hero.id, {
    heroId: hero.id,
    level: 1,
    xp: 0,
    attributes: { ...hero.attributes },
    unspentAttributePoints: 0,
    unlockedTechniqueIds: [],
    pendingMilestoneLevels: []
  }]));
}

export function xpAwardForOutcome(outcome: MissionOutcome) { return PROGRESSION_BALANCE.xpByOutcome[outcome]; }

export function targetLevelFromXp(xp: number) {
  let target = 1;
  for (let level = 2; level <= MAX_HERO_LEVEL; level += 1) {
    if (xp >= LEVEL_XP[level]) target = level;
  }
  return target;
}

export function canLevelUp(progress: HeroProgression) {
  return progress.level < targetLevelFromXp(progress.xp) && progress.level < MAX_HERO_LEVEL;
}

export function getNextLevel(progress: HeroProgression) {
  return canLevelUp(progress) ? progress.level + 1 : null;
}

export function rewardLabelForLevel(level: number) {
  if (level === 2) return "Desbloqueio de técnica";
  if (level === 3) return "+1 ponto de atributo";
  if (level === 4) return "Técnica / especialização";
  if (level === 5) return "+1 ponto de atributo";
  if (level === 6) return "Evolução de poder";
  return "Progressão";
}

export function queueEarnedMilestones(progress: HeroProgression): HeroProgression {
  const target = targetLevelFromXp(progress.xp);
  const pending = Array.from({ length: Math.max(0, target - progress.level) }, (_, index) => progress.level + index + 1)
    .filter((level) => !progress.pendingMilestoneLevels.includes(level));
  if (!pending.length) return progress;
  return { ...progress, pendingMilestoneLevels: [...progress.pendingMilestoneLevels, ...pending] };
}

export function awardHeroXp(progress: HeroProgression, amount: number): HeroProgression {
  return queueEarnedMilestones({ ...progress, xp: progress.xp + amount });
}

export function confirmAttributeLevel(progress: HeroProgression, level: 3 | 5): HeroProgression {
  if (progress.level + 1 !== level || !progress.pendingMilestoneLevels.includes(level)) return progress;
  return {
    ...progress,
    level,
    unspentAttributePoints: progress.unspentAttributePoints + 1,
    pendingMilestoneLevels: progress.pendingMilestoneLevels.filter((item) => item !== level)
  };
}

export function spendAttributePoint(progress: HeroProgression, attribute: AttributeKey): HeroProgression {
  if (progress.unspentAttributePoints <= 0 || progress.attributes[attribute] >= MAX_ATTRIBUTE_VALUE) return progress;
  return {
    ...progress,
    attributes: { ...progress.attributes, [attribute]: progress.attributes[attribute] + 1 },
    unspentAttributePoints: progress.unspentAttributePoints - 1
  };
}

export function unlockTechniqueLevel(progress: HeroProgression, level: 2 | 4 | 6, techniqueId: string): HeroProgression {
  if (progress.level + 1 !== level || !progress.pendingMilestoneLevels.includes(level)) return progress;
  if (progress.unlockedTechniqueIds.includes(techniqueId)) return progress;
  return {
    ...progress,
    level,
    unlockedTechniqueIds: [...progress.unlockedTechniqueIds, techniqueId],
    pendingMilestoneLevels: progress.pendingMilestoneLevels.filter((item) => item !== level)
  };
}

export function developmentComplete(progressions: Record<string, HeroProgression>) {
  return Object.values(progressions).every((progress) => !canLevelUp(progress) && progress.unspentAttributePoints === 0);
}
