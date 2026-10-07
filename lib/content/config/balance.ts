import type { MissionOutcome } from "@/game/types";

/** BALANCEAMENTO CENTRAL. Números mecânicos editáveis sem tocar no motor. */
export const CONDITION_BALANCE = {
  baseHealth: 9,
  baseEnergy: 9,
  costsByOutcome: {
    "Sucesso": { health: 0, energy: 2 },
    "Sucesso com custo": { health: 1, energy: 3 },
    "Sucesso parcial": { health: 2, energy: 4 },
    "Falha": { health: 5, energy: 5 },
  } satisfies Record<MissionOutcome, { health: number; energy: number }>,
  tiredThreshold: 0.65,
  exhaustedThreshold: 0.35,
  hurtThreshold: 0.65,
  badlyHurtThreshold: 0.35,
} as const;

export const PROGRESSION_BALANCE = {
  maxHeroLevel: 6,
  maxMasteryRank: 5,
  masteryXp: { 1: 700, 2: 900, 3: 1150, 4: 1450, 5: 1800 } as Record<number, number>,
  maxAttributeValue: 5,
  levelXp: { 1: 0, 2: 50, 3: 130, 4: 230, 5: 360, 6: 520 } as Record<number, number>,
  xpByOutcome: {
    "Sucesso": 30,
    "Sucesso com custo": 26,
    "Sucesso parcial": 20,
    "Falha": 14,
  } satisfies Record<MissionOutcome, number>,
} as const;

export const MISSION_BALANCE = {
  recommendedPoints: { weight3: 6, weight2: 5, weight1: 4 },
  minEstimatedChance: 8,
  maxEstimatedChance: 98,
  // Nao ha bonus automatico por quantidade de agentes. Equipe maior so ajuda ao cobrir requisitos, tags, Ressonancia ou combos.
  teamSizeBonus: { 1: 0, 2: 0, 3: 0 } as Record<number, number>,
  reliabilityPenalty: { "Alta": 0, "Média": 0.025, "Baixa": 0.05 } as Record<string, number>,
  /** Primeira semana ensina a curva. Depois, a cidade alterna respiro/normal/pressao/pico sem inflacao infinita. */
  dayRequirementScale: { 1: 0.60, 2: 0.68, 3: 0.76, 4: 0.86, 5: 0.96, 6: 1.05 } as Record<number, number>,
  postDay6RequirementCycle: [0.68, 0.76, 0.88, 0.72, 0.94, 1.02, 0.78, 0.86] as readonly number[],
  techniqueChanceBonus: 0.06,
  maxTechniqueChanceBonus: 0.12,
  masterySoloChancePerRank: 0.012,
  powerAffinityChanceBonus: 0.08,
  maxPowerAffinityChanceBonus: 0.12,
} as const;
