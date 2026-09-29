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

export type PlayerState = {
  name: string;
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

export type SaveGame = {
  version: 6;
  player: PlayerState;
  heroStates: Record<string, HeroState>;
  heroProgression: Record<string, HeroProgression>;
  relationships: Record<string, RelationshipStats>;
  resonance: Record<string, ResonancePair>;
  shift: ShiftState;
  flags: string[];
  lastDispatch: DispatchResult | null;
};

export type RelationshipDelta = Partial<RelationshipStats>;

export type DialogueChoice = {
  id: string;
  text: string;
  response: string;
  delta: RelationshipDelta;
  flag: string;
};

export type DialogueScene = {
  id: string;
  characterId: string;
  speaker: string;
  timeLabel: string;
  opening: string;
  contextLines?: {
    whenHeroWasDispatched?: string;
    whenHeroWasNotDispatched?: string;
  };
  choices: DialogueChoice[];
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
};
