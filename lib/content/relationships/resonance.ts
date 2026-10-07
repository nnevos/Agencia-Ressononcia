import type { ResonancePair } from "@/game/types";

/** Relações iniciais entre heróis. Edite valores de -2 a +2. */
export const initialResonancePairs: ResonancePair[] = [
  { a: "yuki", b: "elysia", value: 2, missionsTogether: 0 },
  { a: "yuki", b: "lysandro", value: 1, missionsTogether: 0 },
  { a: "yuki", b: "alexandra", value: 1, missionsTogether: 0 },
  { a: "yuki", b: "eros", value: 1, missionsTogether: 0 },
  { a: "elysia", b: "lysandro", value: 2, missionsTogether: 0 },
  { a: "elysia", b: "helio", value: -2, missionsTogether: 0 },
  { a: "demetria", b: "eros", value: 2, missionsTogether: 0 },
  { a: "demetria", b: "lysandro", value: 1, missionsTogether: 0 },
  { a: "yuki", b: "helio", value: -1, missionsTogether: 0 },
];

/** Combinações especiais. bonus é multiplicador interno de adequação. */
export const specialCombos = [
  { ids: ["yuki", "alexandra"], name: "Janela de Cristalização", bonus: 1.15, description: "Controle fino e contenção com baixo colateral." },
  { ids: ["demetria", "eros"], name: "Corredor Seguro", bonus: 1.12, description: "Evacuação acelerada e proteção de civis." },
  { ids: ["elysia", "helio"], name: "Pico de Potência", bonus: 1.10, description: "Grande poder contra ameaças resistentes, com risco de desgaste." },
  { ids: ["yuki", "eros"], name: "Frente Fria", bonus: 1.10, description: "Excelente mobilidade e controle de área." },
  { ids: ["alexandra", "elysia"], name: "Circuito Azul", bonus: 1.12, description: "Controle técnico elevado em ambiente preparado." },
] as const;
