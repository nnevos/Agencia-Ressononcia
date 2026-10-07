import { initialResonancePairs, specialCombos } from "@/content/relationships/resonance";
import type { ResonancePair } from "@/game/types";

export function pairKey(a: string, b: string) {
  return [a, b].sort().join("__");
}

export function createInitialResonance(): Record<string, ResonancePair> {
  return Object.fromEntries(initialResonancePairs.map((pair) => [pairKey(pair.a, pair.b), { ...pair }]));
}

export { specialCombos };
