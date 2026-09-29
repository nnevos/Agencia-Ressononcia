import { heroes } from "@/game/data/heroes";
import { CONDITION_BALANCE } from "@/content/config/balance";
import type { HeroAttributes, HeroMissionEffect, HeroProgression, HeroState, MissionOutcome } from "@/game/types";
import { xpAwardForOutcome } from "@/game/progression/heroProgression";

export function clamp(value: number, min: number, max: number) { return Math.max(min, Math.min(max, value)); }
export function getMaxHealth(attributes: Pick<HeroAttributes, "vigor">) { return CONDITION_BALANCE.baseHealth + attributes.vigor; }
export function getMaxEnergy(attributes: Pick<HeroAttributes, "agility">) { return CONDITION_BALANCE.baseEnergy + attributes.agility; }

export function getHealthState(health: number, maxHealth: number) {
  if (health <= 0) return "DESMAIADO";
  const ratio = health / maxHealth;
  if (ratio <= CONDITION_BALANCE.badlyHurtThreshold) return "MACHUCADO";
  if (ratio <= CONDITION_BALANCE.hurtThreshold) return "FERIDO";
  return "SAUDÁVEL";
}
export function getEnergyState(energy: number, maxEnergy: number) {
  if (energy <= 0) return "DESMAIADO";
  const ratio = energy / maxEnergy;
  if (ratio <= CONDITION_BALANCE.exhaustedThreshold) return "EXAUSTO";
  if (ratio <= CONDITION_BALANCE.tiredThreshold) return "CANSADO";
  return "DESCANSADO";
}

export function createInitialHeroStates(): Record<string, HeroState> {
  return Object.fromEntries(heroes.map((hero) => [hero.id, {
    heroId: hero.id,
    status: "disponivel" as const,
    health: getMaxHealth(hero.attributes),
    energy: getMaxEnergy(hero.attributes),
    missionId: null,
    busyUntilGameMinute: null
  }]));
}

export function calculateHeroMissionEffect(hero: HeroState & { attributes: HeroAttributes }, outcome: MissionOutcome, _risk: "Baixo" | "Médio" | "Alto" = "Médio"): HeroMissionEffect {
  const { health: healthCost, energy: energyCost } = CONDITION_BALANCE.costsByOutcome[outcome];
  const maxHealth = getMaxHealth(hero.attributes);
  const maxEnergy = getMaxEnergy(hero.attributes);
  const healthAfter = clamp(hero.health - healthCost, 0, maxHealth);
  const energyAfter = clamp(hero.energy - energyCost, 0, maxEnergy);
  return {
    heroId: hero.heroId,
    healthDelta: healthAfter - hero.health,
    energyDelta: energyAfter - hero.energy,
    healthAfter,
    energyAfter,
    xpAwarded: xpAwardForOutcome(outcome)
  };
}

export function markHeroesOnMission(states: Record<string, HeroState>, heroIds: string[], missionId: string, busyUntilGameMinute: number) {
  const next = { ...states };
  for (const id of heroIds) if (next[id] && next[id].status === "disponivel") next[id] = { ...next[id], status: "em_missao", missionId, busyUntilGameMinute };
  return next;
}

export function applyMissionEffects(states: Record<string, HeroState>, effects: HeroMissionEffect[]) {
  const next = { ...states };
  for (const effect of effects) {
    const current = next[effect.heroId]; if (!current) continue;
    const knockedOut = effect.healthAfter <= 0 || effect.energyAfter <= 0;
    next[effect.heroId] = { ...current, health: effect.healthAfter, energy: effect.energyAfter, status: knockedOut ? "desmaiado" : "disponivel", missionId: null, busyUntilGameMinute: null };
  }
  return next;
}

export function recoverHeroStates(states: Record<string, HeroState>, progression: Record<string, HeroProgression>) {
  return Object.fromEntries(Object.entries(states).map(([id,current]) => {
    const base = heroes.find((hero) => hero.id === id);
    const attributes = progression[id]?.attributes ?? base?.attributes ?? { strength: 1, agility: 1, charisma: 1, intelligence: 1, vigor: 1 };
    return [id, { ...current, health: getMaxHealth(attributes), energy: getMaxEnergy(attributes), status: "disponivel" as const, missionId: null, busyUntilGameMinute: null }];
  }));
}
