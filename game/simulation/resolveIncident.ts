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

export type MissionRequirementFit = {
  attribute: keyof OperationalHero["attributes"];
  required: number;
  provided: number;
  importance: "ESSENCIAL" | "IMPORTANTE";
};

export function getMissionAssessment(incident: Incident, selectedHeroes: OperationalHero[], resonance: Record<string, ResonancePair>) {
  const weightedEntries = Object.entries(incident.attributeWeights) as [keyof OperationalHero["attributes"], number][];
  const requirements: MissionRequirementFit[] = weightedEntries
    .filter(([, weight]) => (weight ?? 0) > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([attribute, weight], index) => {
      // A marca representa a faixa de equipe considerada ideal, não um bloqueio rígido.
      const required = weight >= 3 ? MISSION_BALANCE.recommendedPoints.weight3 : weight >= 2 ? MISSION_BALANCE.recommendedPoints.weight2 : MISSION_BALANCE.recommendedPoints.weight1;
      const provided = selectedHeroes.reduce((sum, hero) => sum + hero.attributes[attribute], 0);
      return { attribute, required, provided, importance: index < 2 ? "ESSENCIAL" : "IMPORTANTE" };
    });

  if (!selectedHeroes.length) return { requirements, successChance: 0, resonanceScore: 0, tagCoverage: 0, conditionScore: 1, combos: [] as ReturnType<typeof getSpecialCombos> };

  const fit = requirements.length
    ? requirements.reduce((sum, item) => sum + Math.min(1.2, item.provided / item.required), 0) / requirements.length
    : 1;
  const availableTags = new Set(selectedHeroes.flatMap((hero) => hero.tags));
  const matchedTags = incident.recommendedTags.filter((tag) => availableTags.has(tag));
  const tagCoverage = incident.recommendedTags.length ? matchedTags.length / incident.recommendedTags.length : 1;
  const averageHealthRatio = average(selectedHeroes.map((hero) => hero.health / getMaxHealth(hero.attributes)));
  const averageEnergyRatio = average(selectedHeroes.map((hero) => hero.energy / getMaxEnergy(hero.attributes)));
  // Vida e Energia baixas reduzem a entrega real, mas nunca transformam a missão em resultado automático.
  const conditionScore = Math.max(0.32, 0.35 + averageHealthRatio * 0.35 + averageEnergyRatio * 0.30);
  const resonanceInfo = getTeamResonance(selectedHeroes, resonance);
  const combos = getSpecialCombos(selectedHeroes);
  const comboBonus = Math.min(0.10, combos.reduce((sum, combo) => sum + Math.max(0, combo.bonus - 1), 0));
  const teamSizeBonus = MISSION_BALANCE.teamSizeBonus[selectedHeroes.length] ?? 0;
  const reliabilityPenalty = MISSION_BALANCE.reliabilityPenalty[incident.reliability] ?? 0;

  // Estimativa operacional: nunca vira certeza. Mesmo uma equipe ideal mantém risco residual.
  const rawChance = 0.12 + fit * 0.52 + tagCoverage * 0.16 + teamSizeBonus + resonanceInfo.score * 0.025 + comboBonus;
  const successChance = Math.round(Math.max(MISSION_BALANCE.minEstimatedChance, Math.min(MISSION_BALANCE.maxEstimatedChance, (rawChance * conditionScore - reliabilityPenalty) * 100)));
  return { requirements, successChance, resonanceScore: resonanceInfo.score, tagCoverage, conditionScore, combos };
}

export function analyzeTeam(incident: Incident, selectedHeroes: OperationalHero[], resonance: Record<string, ResonancePair>) {
  if (!selectedHeroes.length) return [];
  const alerts: string[] = [];
  const resonanceInfo = getTeamResonance(selectedHeroes, resonance);
  alerts.push(...resonanceInfo.labels);
  for (const combo of getSpecialCombos(selectedHeroes)) alerts.push(`Ressonância: ${combo.name}`);
  if (selectedHeroes.some((hero) => hero.energy / getMaxEnergy(hero.attributes) <= CONDITION_BALANCE.tiredThreshold)) alerts.push("Agente cansado");
  if (selectedHeroes.some((hero) => hero.health / getMaxHealth(hero.attributes) <= CONDITION_BALANCE.hurtThreshold)) alerts.push("Agente machucado");
  return alerts.slice(0, 4);
}

export function resolveIncident(
  incident: Incident,
  selectedHeroes: OperationalHero[],
  resonance: Record<string, ResonancePair>,
  completedAtGameMinute: number
): DispatchResult {
  const availableTags = new Set(selectedHeroes.flatMap((hero) => hero.tags));
  const matchedTags = incident.recommendedTags.filter((tag) => availableTags.has(tag));
  const missingTags = incident.recommendedTags.filter((tag) => !availableTags.has(tag));

  const assessment = getMissionAssessment(incident, selectedHeroes, resonance);
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
  decisiveFactors.push(`Condição da equipe: ${Math.round(conditionScore * 100)}%.`);
  decisiveFactors.push(`Rolagem operacional: ${Math.round(roll)} / alvo ${successChance}.`);
  if (selectedHeroes.length >= 2) decisiveFactors.push(`Ressonância média da equipe: ${resonanceScore >= 0 ? "+" : ""}${resonanceScore.toFixed(1)}.`);
  if (combos.length) decisiveFactors.push(`Combinação especial ativada: ${combos.map((combo) => combo.name).join(", ")}.`);
  if (incident.reliability !== "Alta") decisiveFactors.push(`A confiabilidade ${incident.reliability.toLowerCase()} manteve parte do cenário incerta.`);

  const summaries: Record<DispatchResult["outcome"], string> = {
    "Sucesso": "O objetivo principal foi cumprido com boa coordenação e custo controlado.",
    "Sucesso com custo": "O objetivo principal foi cumprido, mas a operação gerou desgaste e consequências relevantes.",
    "Sucesso parcial": "A equipe estabilizou parte da situação, mas não conseguiu cobrir todos os riscos do chamado.",
    "Falha": "A equipe não conseguiu cumprir o objetivo principal antes que a situação se deteriorasse."
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
