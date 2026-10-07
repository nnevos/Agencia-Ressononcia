export type HeroStatus = "disponivel" | "em_missao" | "recuperacao" | "desmaiado";

export type AttributeKey = "strength" | "agility" | "charisma" | "intelligence" | "vigor";
export type HeroAttributes = Record<AttributeKey, number>;

export type TechniqueDefinition = {
  id: string;
  name: string;
  description: string;
  level: 2 | 4 | 6;
  category: "tecnica" | "especializacao" | "evolucao";
  grantedTags?: string[];
};

export type Hero = {
  id: string;
  name: string;
  powerName: string;
  age: number;
  heightCm: number;
  weightKg: number;
  tags: string[];
  attributes: HeroAttributes;
  className: string;
  trail: string;
  style: string[];
  profile: string;
  strengths: string[];
  limitations: string[];
  techniques: TechniqueDefinition[];
};

export type HeroProgression = {
  heroId: string;
  level: number;
  xp: number;
  /** Progressao pos-nivel 6. Derivada do XP total e limitada a 5 ranks. */
  masteryRank: number;
  attributes: HeroAttributes;
  unspentAttributePoints: number;
  unlockedTechniqueIds: string[];
  pendingMilestoneLevels: number[];
};

export type HeroState = {
  heroId: string;
  status: HeroStatus;
  health: number;
  energy: number;
  missionId?: string | null;
  busyUntilGameMinute?: number | null;
};

export type OperationalHero = Hero & HeroState & HeroProgression;

export type IncidentPriority = "P1" | "P2" | "P3";
export type IncidentReliability = "Alta" | "Média" | "Baixa";
export type IncidentTier = "easy" | "medium" | "hard" | "crisis";

export type Incident = {
  id: string;
  title: string;
  district: string;
  priority: IncidentPriority;
  reliability: IncidentReliability;
  description: string;
  recommendedTags: string[];
  attributeWeights: Partial<Record<AttributeKey, number>>;
  spawnMinute: number;
  deadlineMinutes: number;
  missionDurationMinutes: number;
  risk: "Baixo" | "Médio" | "Alto";
  caseCode?: string;
  tier?: IncidentTier;
  minDay?: number;
  weight?: number;
  cooldownDays?: number;
  powerAffinityHeroIds?: string[];
  effectSuggestion?: string;
  designIntent?: string;
};

export type IncidentRuntimeStatus = "scheduled" | "waiting" | "dispatched" | "resolved" | "expired";

export type IncidentRuntime = {
  incidentId: string;
  status: IncidentRuntimeStatus;
  spawnedAtGameMinute?: number;
  deadlineAtGameMinute?: number;
  dispatchedAtGameMinute?: number;
  resolvesAtGameMinute?: number;
  selectedHeroIds?: string[];
  result?: DispatchResult;
};

export type RelationshipStats = {
  trust: number;
  respect: number;
  intimacy: number;
  tension: number;
  attraction: number;
};

export type ResonancePair = {
  a: string;
  b: string;
  value: number;
  missionsTogether: number;
};

export type PlayerPronouns = "ele-dele" | "ela-dela" | "elu-delu";

export type PlayerState = {
  name: string;
  pronouns: PlayerPronouns;
  currentDay: number;
  reputation: number;
  currentChapter: string;
  developmentRequired: boolean;
};

export type MissionOutcome = "Sucesso" | "Sucesso com custo" | "Sucesso parcial" | "Falha";

export type HeroMissionEffect = {
  heroId: string;
  healthDelta: number;
  energyDelta: number;
  healthAfter: number;
  energyAfter: number;
  xpAwarded: number;
};

export type DispatchResult = {
  incidentId: string;
  selectedHeroIds: string[];
  outcome: MissionOutcome;
  matchedTags: string[];
  missingTags: string[];
  decisiveFactors: string[];
  summary: string;
  heroEffects: HeroMissionEffect[];
  attributeScore: number;
  conditionScore: number;
  resonanceScore: number;
  specialCombos: string[];
  completedAtGameMinute: number;
};

export type ShiftState = {
  day: number;
  startedAtEpochMs: number | null;
  elapsedGameMinutes: number;
  status: "not_started" | "running" | "finished";
  incidents: Record<string, IncidentRuntime>;
  reportQueue: DispatchResult[];
};

export type RomanceState = {
  /** LEGADO v8/v9: preservado no save para compatibilidade. A UI deriva o percentual da etapa da rota. */
  romanceProgress: Record<string, number>;
  /** Etapa narrativa individual de cada personagem. Nao depende do dia global. */
  routeStage: Record<string, number>;
  /** LEGADO v8/v9: preservado para compatibilidade; nao alimenta mais o percentual de romance. */
  romanceEarnedByStage: Record<string, Record<string, number>>;
  /** Personagem escolhido para uma saida em cada noite global; no maximo um encontro por noite. */
  outingsByGlobalDay: Record<string, string>;
  /** Marcos presenciais concluidos por personagem (primeiro/segundo date). */
  outingMilestones: Record<string, number[]>;
};

export type SaveGame = {
  version: 10;
  player: PlayerState;
  heroStates: Record<string, HeroState>;
  heroProgression: Record<string, HeroProgression>;
  relationships: Record<string, RelationshipStats>;
  resonance: Record<string, ResonancePair>;
  social: RomanceState;
  shift: ShiftState;
  flags: string[];
  lastDispatch: DispatchResult | null;
};

export type RelationshipDelta = Partial<RelationshipStats>;

export type DialogueMessage = {
  direction: "incoming" | "outgoing";
  text?: string;
  image?: string;
  imageAlt?: string;
  /** Opcional: durante entrega ao vivo, a bolha troca para estado excluído após este atraso. */
  deleteAfterMs?: number;
  /** Texto mostrado depois da exclusão. Histórico concluído já abre neste estado. */
  deletedText?: string;
};

export type DialogueChoice = {
  id: string;
  text: string;
  response: string;
  delta: RelationshipDelta;
  flag: string;
  /** Qualidade romântica da resposta: melhor encaixe, intermediária ou fraca. Não é RNG. */
  romanceAffinity?: 100 | 50 | 30;
  /** Marca uma escolha que confirma a única saída permitida naquele dia. */
  exclusiveOutingDay?: 3 | 6; // etapa da rota (marco 3 ou 6), nao dia global
  /** Gancho editorial para futura transição a uma cena presencial/VN autorada. */
  vnSceneId?: string;
  /** Mensagens fixas exibidas depois da resposta desta escolha. */
  afterResponse?: DialogueMessage[];
};

export type DialogueTurn = {
  id: string;
  incoming: string;
  incomingImage?: string;
  incomingImageAlt?: string;
  /** Mensagem fixa do Analista imediatamente antes da mensagem recebida. */
  prefaceOutgoing?: string;
  /** Sequência fixa exibida depois da mensagem recebida e antes das escolhas. */
  afterIncoming?: DialogueMessage[];
  timeLabel?: string;
  choices: DialogueChoice[];
};

export type DialogueScene = {
  id: string;
  /** Dia principal desta cena; usado para histórico, orçamento romântico e ordenação. */
  day?: number;
  characterId: string;
  speaker: string;
  timeLabel: string;
  opening: string;
  openingImage?: string;
  openingImageAlt?: string;
  openingOutgoing?: string;
  openingAfterIncoming?: DialogueMessage[];
  contextLines?: {
    whenHeroWasDispatched?: string;
    whenHeroWasNotDispatched?: string;
  };
  choices: DialogueChoice[];
  /** Turnos adicionais permitem conversas longas sem criar uma nova tela/rota. */
  followUps?: DialogueTurn[];
  /** Override opcional do teto diário de romance para esta cena/personagem. */
  romanceBudget?: number;
  /** Conteúdo temporário de QA. Deve ser substituído na etapa de autoria final. */
  placeholder?: boolean;
  availability?: DialogueAvailability;
  completionFlag?: string;
};

/** Regras opcionais para controlar quando uma cena pós-expediente aparece. */
export type DialogueAvailability = {
  enabled?: boolean;
  minDay?: number;
  maxDay?: number;
  requiredFlags?: string[];
  blockedFlags?: string[];
  /** LEGADO: ignorado desde v0.2.11; disponibilidade social usa etapa/flags. */
  minRomanceProgress?: number;
};

export type OutingScene = {
  id: string;
  day: 3 | 6; // etapa/marco da rota
  characterId: string;
  speaker: string;
  title: string;
  /** Imagem de fundo da cena. Pode ser substituida pelo autor sem mudar a tela. */
  backgroundImage?: string;
  /** Enquadramento autoral opcional por viewport; a tela continua generica. */
  backgroundPositionDesktop?: string;
  backgroundPositionMobile?: string;
  /** Texto descritivo da saida/date exibido em uma caixa estilo light novel. */
  paragraphs: string[];
  /** Beats opcionais permitem trocar o background durante uma cena linear, sem adicionar escolhas. */
  beats?: Array<{
    backgroundImage?: string;
    backgroundPositionDesktop?: string;
    backgroundPositionMobile?: string;
    paragraphs: string[];
    continueLabel?: string;
  }>;
  continueLabel?: string;
  completionFlag: string;
};
