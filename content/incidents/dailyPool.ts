import { caseBank } from "./caseBank";
import type { Incident, IncidentTier } from "@/game/types";

export type DayPressure = "respite" | "normal" | "pressure" | "peak";

type TierCounts = Record<IncidentTier, number>;

const COMPOSITION: Record<DayPressure, TierCounts> = {
  respite: { easy: 5, medium: 4, hard: 1, crisis: 0 },
  normal: { easy: 4, medium: 5, hard: 2, crisis: 0 },
  pressure: { easy: 3, medium: 5, hard: 4, crisis: 0 },
  peak: { easy: 2, medium: 5, hard: 5, crisis: 1 },
};

const POST_DAY6_PRESSURE: readonly DayPressure[] = [
  "respite", "normal", "pressure", "normal", "pressure", "peak", "respite", "normal",
];

function hashSeed(input: string) {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seed: number) {
  return () => {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pressureForDay(day: number): DayPressure {
  if (day <= 1) return "respite";
  if (day <= 3) return "normal";
  if (day <= 5) return "pressure";
  if (day === 6) return "peak";
  return POST_DAY6_PRESSURE[(day - 7) % POST_DAY6_PRESSURE.length] ?? "normal";
}

function weightedPick<T extends { weight?: number }>(items: T[], rng: () => number, weightFor: (item: T) => number = (item) => Math.max(1, item.weight ?? 1)): T | null {
  if (!items.length) return null;
  const total = items.reduce((sum, item) => sum + Math.max(0.01, weightFor(item)), 0);
  let roll = rng() * total;
  for (const item of items) {
    roll -= Math.max(0.01, weightFor(item));
    if (roll <= 0) return item;
  }
  return items.at(-1) ?? null;
}

function pickTier(
  tier: IncidentTier,
  count: number,
  day: number,
  selectedIds: Set<string>,
  lastSeen: Map<string, number>,
  rng: () => number,
) {
  const picked: Incident[] = [];
  for (let i = 0; i < count; i += 1) {
    const eligible = caseBank.filter((item) => item.tier === tier && (item.minDay ?? 1) <= day && !selectedIds.has(item.id));
    const choice = weightedPick(eligible, rng, (item) => {
      const base = Math.max(1, item.weight ?? 1);
      const seen = lastSeen.get(item.id);
      if (seen == null) return base;
      const distance = day - seen;
      if (distance <= 1) return base * 0.03;
      if (distance <= (item.cooldownDays ?? 0)) return base * 0.15;
      return base;
    });
    if (!choice) break;
    picked.push(choice);
    selectedIds.add(choice.id);
  }
  return picked;
}

function selectCasesForDay(day: number, seedSource: string, lastSeen: Map<string, number>) {
  const pressure = pressureForDay(day);
  const rng = mulberry32(hashSeed(`${seedSource}|day:${day}|${pressure}`));
  const counts = COMPOSITION[pressure];
  const selectedIds = new Set<string>();
  const selected: Incident[] = [];
  const tiers: IncidentTier[] = ["easy", "medium", "hard", "crisis"];
  for (const tier of tiers) selected.push(...pickTier(tier, counts[tier], day, selectedIds, lastSeen, rng));

  // Dia 1: o incendio E-04 e sempre o primeiro caso para sustentar o onboarding autorado.
  // Depois do tutorial ele volta a obedecer o banco/cooldown normalmente.
  if (day === 1) {
    const tutorialCase = caseBank.find((item) => item.id === "pool-e-04");
    if (tutorialCase && !selectedIds.has(tutorialCase.id)) {
      const easyIndex = selected.findIndex((item) => item.tier === "easy");
      if (easyIndex >= 0) selectedIds.delete(selected[easyIndex].id);
      if (easyIndex >= 0) selected[easyIndex] = tutorialCase;
      else selected.unshift(tutorialCase);
      selectedIds.add(tutorialCase.id);
    }
  }

  const target = Object.values(counts).reduce((sum, value) => sum + value, 0);
  while (selected.length < target) {
    const eligible = caseBank.filter((item) => (item.minDay ?? 1) <= day && !selectedIds.has(item.id));
    const choice = weightedPick(eligible, rng, (item) => {
      const base = Math.max(1, item.weight ?? 1);
      const seen = lastSeen.get(item.id);
      if (seen == null) return base;
      const distance = day - seen;
      if (distance <= 1) return base * 0.03;
      if (distance <= (item.cooldownDays ?? 0)) return base * 0.15;
      return base;
    });
    if (!choice) break;
    selected.push(choice);
    selectedIds.add(choice.id);
  }

  return { pressure, selected };
}

function assignSpawnMinutes(cases: Incident[], day: number, seedSource: string) {
  const rng = mulberry32(hashSeed(`${seedSource}|spawns:${day}`));
  const shuffled = [...cases].sort((a, b) => hashSeed(`${seedSource}|${day}|${a.id}`) - hashSeed(`${seedSource}|${day}|${b.id}`));
  const count = shuffled.length;
  // v0.2.2: chamados ocupam uma janela menor e alguns chegam em ondas. Isso cria
  // sobreposicao real sem transformar todo minuto do turno em pico permanente.
  return shuffled.map((incident, index) => {
    if (day === 1 && incident.id === "pool-e-04") return { ...incident, spawnMinute: 0 };
    const base = count <= 1 ? 25 : 12 + index * (430 / (count - 1));
    const wavePull = index > 0 && index % 3 === 1 ? -18 : index > 0 && index % 3 === 2 ? -10 : 0;
    const jitter = Math.round((rng() - 0.5) * 18);
    const spawnMinute = Math.max(5, Math.min(470, Math.round(base + wavePull + jitter)));
    return { ...incident, spawnMinute };
  }).sort((a, b) => a.spawnMinute - b.spawnMinute);
}

/**
 * Gera sempre o mesmo expediente para a mesma combinacao jogador/dia.
 * O historico e reconstituido deterministicamente para aplicar cooldown sem inflar o save.
 */
export function getIncidentsForDay(day: number, seedSource = "default") {
  const safeDay = Math.max(1, Math.floor(day));
  const lastSeen = new Map<string, number>();
  let target: Incident[] = [];
  let pressure: DayPressure = "respite";
  for (let current = 1; current <= safeDay; current += 1) {
    const result = selectCasesForDay(current, seedSource, lastSeen);
    for (const incident of result.selected) lastSeen.set(incident.id, current);
    if (current === safeDay) {
      pressure = result.pressure;
      target = result.selected;
    }
  }
  return { pressure, incidents: assignSpawnMinutes(target, safeDay, seedSource) };
}

export function getDayPressure(day: number) {
  return pressureForDay(day);
}
