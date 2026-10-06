import { pairKey, specialCombos } from "@/game/data/resonance";
import { MISSION_BALANCE, CONDITION_BALANCE } from "@/content/config/balance";
import type { DispatchResult, Incident, OperationalHero, ResonancePair } from "@/game/types";
import { calculateHeroMissionEffect, getMaxEnergy, getMaxHealth } from "@/game/simulation/heroState";

function average(values: number[]) {
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
}

export function getTeamResonance(selectedHeroes: OperationalHero[], resonance: Record<string, ResonancePair>) {
  if (selectedHeroes.length < 2) return { score: 0, labels: [] as string[] };
  const values: number[] = [];
  const labels: string[] = [];
  for (let i = 0; i < selectedHeroes.length; i += 1) {
    for (let j = i + 1; j < selectedHeroes.length; j += 1) {
      const a = selectedHeroes[i];
      const b = selectedHeroes[j];
      const pair = resonance[pairKey(a.id, b.id)];
      const value = pair?.value ?? 0;
      values.push(value);
      if (value >= 2) labels.push(`${a.name} + ${b.name}: sintonia alta`);
      else if (value <= -2) labels.push(`${a.name} + ${b.name}: tensão forte`);
    }
  }
  return { score: average(values), labels };
}

export function getSpecialCombos(selectedHeroes: OperationalHero[]) {
  const ids = new Set(selectedHeroes.map((hero) => hero.id));
  return specialCombos.filter((combo) => combo.ids.every((id) => ids.has(id)));
}

export function getDayRequirementScale(day: number) {
  if (day <= 6) return MISSION_BALANCE.dayRequirementScale[Math.max(1, day)] ?? 0.75;
  const cycle = MISSION_BALANCE.postDay6RequirementCycle;
  return cycle[(day - 7) % cycle.length] ?? 0.82;
}

export type MissionRequirementFit = {
  attribute: keyof OperationalHero["attributes"];
  required: number;
  provided: number;
  importance: "ESSENCIAL" | "IMPORTANTE" | "APOIO";
};

export function getMissionAssessment(incident: Incident, selectedHeroes: OperationalHero[], resonance: Record<string, ResonancePair>, day = 1) {
  const weightedEntries = Object.entries(incident.attributeWeights) as [keyof OperationalHero["attributes"], number][];
  const requirements: MissionRequirementFit[] = weightedEntries
    .filter(([, weight]) => (weight ?? 0) > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([attribute, weight]) => {
      const baseRequired = weight >= 3 ? MISSION_BALANCE.recommendedPoints.weight3 : weight >= 2 ? MISSION_BALANCE.recommendedPoints.weight2 : MISSION_BALANCE.recommendedPoints.weight1;
      const dayScale = getDayRequirementScale(day);
      const required = Math.max(1, Math.round(baseRequired * dayScale));
      const provided = selectedHeroes.reduce((sum, hero) => sum + hero.attributes[attribute], 0);
      const importance = weight >= 3 ? "ESSENCIAL" as const : weight >= 2 ? "IMPORTANTE" as const : "APOIO" as const;
      return { attribute, required, provided, importance };
    });

  if (!selectedHeroes.length) return { requirements, successChance: 0, resonanceScore: 0, tagCoverage: 0, conditionScore: 1, combos: [] as ReturnType<typeof getSpecialCombos>, matchedTags: [] as string[], missingTags: incident.recommendedTags, techniqueBonus: 0, masteryBonus: 0, powerAffinityBonus: 0, powerAffinityMatches: [] as string[] };

  const essential = requirements.filter((item) => item.importance === "ESSENCIAL");
  const important = requirements.filter((item) => item.importance === "IMPORTANTE");
  const support = requirements.filter((item) => item.importance === "APOIO");
  const essentialFit = essential.length ? essential.reduce((sum, item) => sum + Math.min(1, item.provided / item.required), 0) / essential.length : 1;
  const importantFit = important.length ? important.reduce((sum, item) => sum + Math.min(1, item.provided / item.required), 0) / important.length : 1;
  const supportFit = support.length ? support.reduce((sum, item) => sum + Math.min(1, item.provided / item.required), 0) / support.length : 1;
  const weightTotal = (essential.length ? 0.60 : 0) + (important.length ? 0.30 : 0) + (support.length ? 0.10 : 0);
  const requirementFit = weightTotal > 0 ? ((essential.length ? essentialFit * 0.60 : 0) + (important.length ? importantFit * 0.30 : 0) + (support.length ? supportFit * 0.10 : 0)) / weightTotal : 1;
  const allEssentialsMet = essential.every((item) => item.provided >= item.required);
  const allRequirementsMet = requirements.every((item) => item.provided >= item.required);

  const availableTags = new Set(selectedHeroes.flatMap((hero) => hero.tags));
  const matchedTags = incident.recommendedTags.filter((tag) => availableTags.has(tag));
  const missingTags = incident.recommendedTags.filter((tag) => !availableTags.has(tag));
  const tagCoverage = incident.recommendedTags.length ? matchedTags.length / incident.recommendedTags.length : 1;

  const averageHealthRatio = average(selectedHeroes.map((hero) => hero.health / getMaxHealth(hero.attributes)));
  const averageEnergyRatio = average(selectedHeroes.map((hero) => hero.energy / getMaxEnergy(hero.attributes)));
  const conditionScore = Math.max(0.45, 0.45 + averageHealthRatio * 0.30 + averageEnergyRatio * 0.25);
  const resonanceInfo = getTeamResonance(selectedHeroes, resonance);
  const combos = getSpecialCombos(selectedHeroes);
  const comboBonus = Math.min(0.08, combos.reduce((sum, combo) => sum + Math.max(0, combo.bonus - 1), 0));
  const reliabilityPenalty = MISSION_BALANCE.reliabilityPenalty[incident.reliability] ?? 0;
  const activeTechniqueCount = selectedHeroes.reduce((sum, hero) => sum + hero.techniques.filter((technique) => hero.unlockedTechniqueIds.includes(technique.id) && technique.grantedTags?.some((tag) => incident.recommendedTags.includes(tag))).length, 0);
  const techniqueBonus = Math.min(MISSION_BALANCE.maxTechniqueChanceBonus, activeTechniqueCount * MISSION_BALANCE.techniqueChanceBonus);
  const masteryBonus = selectedHeroes.length === 1 ? (selectedHeroes[0].masteryRank ?? 0) * MISSION_BALANCE.masterySoloChancePerRank : 0;
  const powerAffinityMatches = selectedHeroes.filter((hero) => incident.powerAffinityHeroIds?.includes(hero.id)).map((hero) => hero.id);
  const powerAffinityBonus = Math.min(MISSION_BALANCE.maxPowerAffinityChanceBonus, powerAffinityMatches.length * MISSION_BALANCE.powerAffinityChanceBonus);

  // Design v0.2.0: tamanho de equipe nao concede bonus por si so.
  // Se um unico agente cobre os requisitos, ele deve ser viavel sozinho; parceiros servem para cobrir lacunas.
  let rawChance = 0.10 + requirementFit * 0.54 + tagCoverage * 0.22 + resonanceInfo.score * 0.02 + comboBonus + techniqueBonus + masteryBonus + powerAffinityBonus;
  if (allEssentialsMet) rawChance += 0.04;
  if (allRequirementsMet) rawChance += 0.03;
  if (allRequirementsMet && tagCoverage >= 0.75) rawChance = Math.max(rawChance, 0.84);
  if (allRequirementsMet && tagCoverage >= 1) rawChance = Math.max(rawChance, 0.92);

  const conditionedChance = rawChance * (0.72 + conditionScore * 0.28) - reliabilityPenalty;
  const successChance = Math.round(Math.max(MISSION_BALANCE.minEstimatedChance, Math.min(MISSION_BALANCE.maxEstimatedChance, conditionedChance * 100)));
  return { requirements, successChance, resonanceScore: resonanceInfo.score, tagCoverage, conditionScore, combos, matchedTags, missingTags, techniqueBonus, masteryBonus, powerAffinityBonus, powerAffinityMatches };
}

export function analyzeTeam(incident: Incident, selectedHeroes: OperationalHero[], resonance: Record<string, ResonancePair>) {
  if (!selectedHeroes.length) return [];
  const alerts: string[] = [];
  const resonanceInfo = getTeamResonance(selectedHeroes, resonance);
  alerts.push(...resonanceInfo.labels);
  for (const hero of selectedHeroes) {
    if (incident.powerAffinityHeroIds?.includes(hero.id)) alerts.push(`Afinidade de poder: ${hero.name}`);
    const activeTechniques = hero.techniques.filter((technique) => hero.unlockedTechniqueIds.includes(technique.id) && technique.grantedTags?.some((tag) => incident.recommendedTags.includes(tag)));
    for (const technique of activeTechniques) alerts.push(`Técnica ativa: ${hero.name} · ${technique.name}`);
  }
  for (const combo of getSpecialCombos(selectedHeroes)) alerts.push(`Ressonância: ${combo.name}`);
  if (selectedHeroes.some((hero) => hero.energy / getMaxEnergy(hero.attributes) <= CONDITION_BALANCE.tiredThreshold)) alerts.push("Agente cansado");
  if (selectedHeroes.some((hero) => hero.health / getMaxHealth(hero.attributes) <= CONDITION_BALANCE.hurtThreshold)) alerts.push("Agente machucado");
  return alerts.slice(0, 6);
}

export function resolveIncident(
  incident: Incident,
  selectedHeroes: OperationalHero[],
  resonance: Record<string, ResonancePair>,
  completedAtGameMinute: number,
  day = 1
): DispatchResult {
  const availableTags = new Set(selectedHeroes.flatMap((hero) => hero.tags));
  const matchedTags = incident.recommendedTags.filter((tag) => availableTags.has(tag));
  const missingTags = incident.recommendedTags.filter((tag) => !availableTags.has(tag));

  const assessment = getMissionAssessment(incident, selectedHeroes, resonance, day);
  const attributeScore = assessment.requirements.length
    ? assessment.requirements.reduce((sum, item) => sum + Math.min(1, item.provided / item.required), 0) / assessment.requirements.length
    : 1;
  const conditionScore = assessment.conditionScore;
  const resonanceScore = assessment.resonanceScore;
  const combos = assessment.combos;
  const successChance = assessment.successChance;
  const roll = Math.random() * 100;

  let outcome: DispatchResult["outcome"];
  if (roll <= successChance) {
    const margin = successChance - roll;
    outcome = margin >= 24 && successChance >= 68 ? "Sucesso" : "Sucesso com custo";
  } else {
    const miss = roll - successChance;
    outcome = miss <= 18 || successChance >= 55 ? "Sucesso parcial" : "Falha";
  }

  const decisiveFactors: string[] = [];
  decisiveFactors.push(`Estimativa antes do despacho: ${successChance}% de chance de sucesso.`);
  if (matchedTags.length) decisiveFactors.push(`Capacidades cobertas: ${matchedTags.join(", ")}.`);
  if (missingTags.length) decisiveFactors.push(`Lacunas operacionais: ${missingTags.join(", ")}.`);
  if (assessment.powerAffinityMatches.length) decisiveFactors.push(`Afinidade contextual de poder: ${selectedHeroes.filter((hero) => assessment.powerAffinityMatches.includes(hero.id)).map((hero) => `${hero.name} (${hero.powerName})`).join(", ")}.`);
  decisiveFactors.push(`Condição da equipe: ${Math.round(conditionScore * 100)}%.`);
  decisiveFactors.push(`Rolagem operacional: ${Math.round(roll)} / alvo ${successChance}.`);
  if (selectedHeroes.length >= 2) decisiveFactors.push(`Ressonância média da equipe: ${resonanceScore >= 0 ? "+" : ""}${resonanceScore.toFixed(1)}.`);
  if (combos.length) decisiveFactors.push(`Combinação especial ativada: ${combos.map((combo) => combo.name).join(", ")}.`);
  if (incident.reliability !== "Alta") decisiveFactors.push(`A confiabilidade ${incident.reliability.toLowerCase()} manteve parte do cenário incerta.`);

  const teamNames = selectedHeroes.map((hero) => hero.name).join(" + ");
  const covered = matchedTags.length ? ` A abordagem se apoiou em ${matchedTags.slice(0, 3).join(", ")}.` : "";
  const affinity = assessment.powerAffinityMatches.length
    ? ` A afinidade de poder de ${selectedHeroes.filter((hero) => assessment.powerAffinityMatches.includes(hero.id)).map((hero) => hero.name).join(" e ")} foi decisiva no contexto.`
    : "";
  const summaries: Record<DispatchResult["outcome"], string> = {
    "Sucesso": `${teamNames} resolveu "${incident.title}" e encerrou o risco principal antes que a situação escalasse.${covered}${affinity}`,
    "Sucesso com custo": `${teamNames} resolveu "${incident.title}", mas a intervenção exigiu esforço acima do previsto e deixou desgaste operacional.${covered}${affinity}`,
    "Sucesso parcial": `${teamNames} conteve a parte mais urgente de "${incident.title}", porém riscos secundários permaneceram e exigiram resposta local posterior.${covered}${affinity}`,
    "Falha": `${teamNames} não conseguiu estabilizar "${incident.title}" dentro da janela operacional; a situação foi repassada para contenção emergencial e resposta local.${covered}`
  };

  return {
    incidentId: incident.id,
    selectedHeroIds: selectedHeroes.map((hero) => hero.id),
    outcome,
    matchedTags,
    missingTags,
    decisiveFactors: decisiveFactors.slice(0, 6),
    summary: summaries[outcome],
    heroEffects: selectedHeroes.map((hero) => calculateHeroMissionEffect(hero, outcome, incident.risk)),
    attributeScore,
    conditionScore,
    resonanceScore,
    specialCombos: combos.map((combo) => combo.name),
    completedAtGameMinute
  };
}
