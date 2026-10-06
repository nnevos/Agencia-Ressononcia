import { SOCIAL_OUTING_STAGES, SOCIAL_ROUTE_MANIFEST } from "@/content/social/routeManifest";
import { outingScenes } from "@/content/narrative/outings";
import type { RelationshipStats, SaveGame } from "@/game/types";

const HERO_IDS = SOCIAL_ROUTE_MANIFEST.map((item) => item.characterId);
const VALID_OUTING_STAGES = new Set<number>(SOCIAL_OUTING_STAGES);
const MAX_ROUTE_STAGE = Math.max(...SOCIAL_OUTING_STAGES) + 1;

const emptyRelationship = (): RelationshipStats => ({ trust: 0, respect: 0, intimacy: 0, tension: 0, attraction: 0 });

export type SocialIntegrityIssue = {
  code: string;
  message: string;
  characterId?: string;
  repairable: boolean;
};

export function auditSocialSave(save: SaveGame): SocialIntegrityIssue[] {
  const issues: SocialIntegrityIssue[] = [];
  const knownHeroes = new Set(HERO_IDS);

  if (new Set(save.flags).size !== save.flags.length) {
    issues.push({ code: "duplicate-flags", message: "O save contém flags duplicadas.", repairable: true });
  }

  for (const characterId of HERO_IDS) {
    if (!save.relationships[characterId]) {
      issues.push({ code: "missing-relationship", characterId, message: `${characterId}: relacionamento ausente.`, repairable: true });
    }

    const stage = save.social.routeStage[characterId];
    if (!Number.isInteger(stage) || stage < 1 || stage > MAX_ROUTE_STAGE) {
      issues.push({ code: "invalid-route-stage", characterId, message: `${characterId}: etapa de rota inválida (${String(stage)}).`, repairable: true });
    }

    const milestones = save.social.outingMilestones[characterId];
    if (!Array.isArray(milestones)) {
      issues.push({ code: "missing-milestones", characterId, message: `${characterId}: milestones de Date ausentes.`, repairable: true });
      continue;
    }
    if (new Set(milestones).size !== milestones.length) {
      issues.push({ code: "duplicate-milestones", characterId, message: `${characterId}: milestones de Date duplicados.`, repairable: true });
    }
    const invalid = milestones.filter((value) => !VALID_OUTING_STAGES.has(value));
    if (invalid.length) {
      issues.push({ code: "invalid-milestones", characterId, message: `${characterId}: milestones inválidos (${invalid.join(", ")}).`, repairable: true });
    }
    if (milestones.includes(6) && !milestones.includes(3)) {
      issues.push({ code: "date2-without-date1", characterId, message: `${characterId}: Date 2 concluído sem Date 1.`, repairable: true });
    }
    if (milestones.includes(3) && (stage ?? 1) < 4) {
      issues.push({ code: "stage-behind-date1", characterId, message: `${characterId}: rota ficou atrás do Date 1 concluído.`, repairable: true });
    }
    if (milestones.includes(6) && (stage ?? 1) < 7) {
      issues.push({ code: "stage-behind-date2", characterId, message: `${characterId}: rota ficou atrás do Date 2 concluído.`, repairable: true });
    }
  }

  for (const [day, characterId] of Object.entries(save.social.outingsByGlobalDay)) {
    if (!/^\d+$/.test(day) || Number(day) < 1) {
      issues.push({ code: "invalid-outing-day", message: `Reserva de Date usa noite inválida: ${day}.`, repairable: true });
    }
    if (!knownHeroes.has(characterId as (typeof HERO_IDS)[number])) {
      issues.push({ code: "unknown-outing-character", message: `Reserva de Date aponta para personagem inexistente: ${characterId}.`, repairable: true });
    }
  }

  for (const outing of outingScenes) {
    const hasMilestone = save.social.outingMilestones[outing.characterId]?.includes(outing.day) ?? false;
    const hasCompletionFlag = save.flags.includes(outing.completionFlag);
    if (hasMilestone !== hasCompletionFlag) {
      issues.push({
        code: "outing-flag-mismatch",
        characterId: outing.characterId,
        message: `${outing.characterId}: Date ${outing.day === 3 ? 1 : 2} diverge entre milestone e completion flag.`,
        repairable: true,
      });
    }
  }

  return issues;
}

export function repairSocialSave(save: SaveGame): { save: SaveGame; changed: boolean; repaired: string[] } {
  const repaired: string[] = [];
  const flags = Array.from(new Set(save.flags));
  if (flags.length !== save.flags.length) repaired.push("flags duplicadas removidas");

  const relationships = { ...save.relationships };
  const routeStage = { ...save.social.routeStage };
  const romanceProgress = { ...save.social.romanceProgress };
  const outingMilestones = { ...save.social.outingMilestones };

  for (const characterId of HERO_IDS) {
    if (!relationships[characterId]) {
      relationships[characterId] = emptyRelationship();
      repaired.push(`${characterId}: relacionamento restaurado`);
    }
    if (typeof romanceProgress[characterId] !== "number" || !Number.isFinite(romanceProgress[characterId])) {
      romanceProgress[characterId] = 0;
      repaired.push(`${characterId}: romanceProgress restaurado`);
    }

    let milestones = Array.isArray(outingMilestones[characterId]) ? outingMilestones[characterId] : [];
    milestones = Array.from(new Set(milestones.filter((value) => VALID_OUTING_STAGES.has(value)))).sort((a, b) => a - b);
    if (milestones.includes(6) && !milestones.includes(3)) milestones.unshift(3);

    for (const outing of outingScenes.filter((item) => item.characterId === characterId)) {
      const flagDone = flags.includes(outing.completionFlag);
      const milestoneDone = milestones.includes(outing.day);
      if (flagDone && !milestoneDone) milestones.push(outing.day);
      if (milestoneDone && !flagDone) flags.push(outing.completionFlag);
    }
    milestones = Array.from(new Set(milestones)).sort((a, b) => a - b);

    const rawStage = routeStage[characterId];
    let safeStage = Number.isInteger(rawStage) ? rawStage : 1;
    safeStage = Math.max(1, Math.min(MAX_ROUTE_STAGE, safeStage));
    if (milestones.includes(3)) safeStage = Math.max(safeStage, 4);
    if (milestones.includes(6)) safeStage = Math.max(safeStage, 7);

    if (safeStage !== rawStage) repaired.push(`${characterId}: etapa normalizada para ${safeStage}`);
    if (JSON.stringify(outingMilestones[characterId] ?? []) !== JSON.stringify(milestones)) repaired.push(`${characterId}: milestones normalizados`);
    routeStage[characterId] = safeStage;
    outingMilestones[characterId] = milestones;
  }

  const knownHeroes = new Set<string>(HERO_IDS);
  const outingsByGlobalDay = Object.fromEntries(Object.entries(save.social.outingsByGlobalDay).filter(([day, characterId]) => {
    const valid = /^\d+$/.test(day) && Number(day) >= 1 && knownHeroes.has(characterId);
    if (!valid) repaired.push(`reserva de Date inválida removida (${day}:${characterId})`);
    return valid;
  }));

  const normalizedFlags = Array.from(new Set(flags));
  const changed = repaired.length > 0 || normalizedFlags.length !== save.flags.length;
  if (!changed) return { save, changed: false, repaired: [] };

  return {
    changed: true,
    repaired,
    save: {
      ...save,
      relationships,
      social: {
        ...save.social,
        routeStage,
        romanceProgress,
        outingMilestones,
        outingsByGlobalDay,
      },
      flags: normalizedFlags,
    },
  };
}
