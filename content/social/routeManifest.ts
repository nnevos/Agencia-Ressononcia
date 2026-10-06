/** Estrutura social padrao. Conteudo narrativo continua nos arquivos individuais. */
export const SOCIAL_ROUTE_STAGES = [1, 2, 3, 4, 5, 6] as const;
export const SOCIAL_OUTING_STAGES = [3, 6] as const;

export const SOCIAL_ROUTE_MANIFEST = [
  { characterId: "yuki", speaker: "Yuki", authored: true },
  { characterId: "elysia", speaker: "Elysia", authored: true },
  { characterId: "lysandro", speaker: "Lysandro", authored: true },
  { characterId: "helio", speaker: "Hélio", authored: true },
  { characterId: "demetria", speaker: "Demétria", authored: true },
  { characterId: "alexandra", speaker: "Alexandra", authored: true },
  { characterId: "eros", speaker: "Eros", authored: true },
] as const;

export type SocialRouteCharacterId = typeof SOCIAL_ROUTE_MANIFEST[number]["characterId"];
