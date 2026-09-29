import type { MissionOutcome } from "@/game/types";

/** BALANCEAMENTO CENTRAL. Números mecânicos editáveis sem tocar no motor. */
export const CONDITION_BALANCE = {
  baseHealth: 9,
  baseEnergy: 9,
  costsByOutcome: {
    "Sucesso": { health: 0, energy: 1 },
    "Sucesso com custo": { health: 1, energy: 2 },
    "Sucesso parcial": { health: 2, energy: 3 },
    "Falha": { health: 5, energy: 5 },
  } satisfies Record<MissionOutcome, { health: number; energy: number }>,
  tiredThreshold: 0.65,
  exhaustedThreshold: 0.35,
  hurtThreshold: 0.65,
  badlyHurtThreshold: 0.35,
} as const;

export const PROGRESSION_BALANCE = {
  maxHeroLevel: 6,
  maxAttributeValue: 5,
  levelXp: { 1: 0, 2: 70, 3: 170, 4: 300, 5: 460, 6: 650 } as Record<number, number>,
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
  maxEstimatedChance: 94,
  teamSizeBonus: { 1: 0, 2: 0.03, 3: 0.06 } as Record<number, number>,
  reliabilityPenalty: { "Alta": 0, "Média": 0.025, "Baixa": 0.05 } as Record<string, number>,
} as const;
