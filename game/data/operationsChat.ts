import {
  affinityMissionLines,
  ambientMessages,
  eventComments,
  missionLines,
  outcomeLines,
  pairDialogue,
  specialtyMissionLines,
  teamOutcomeReactions,
  teamTemplates,
  type MissionOutcomeKey,
  type MissionPhase,
  type OperationsHeroId,
} from "@/content/messages/operations";
import { GAMEPLAY_CONFIG } from "@/content/config/gameplay";
import { heroes } from "@/game/data/heroes";
import { incidents } from "@/game/data/incidents";
import type { Incident, MissionOutcome, ResonancePair, SaveGame } from "@/game/types";

export type OperationalChatMessage = {
  id: string;
  minute: number;
  sender: string;
  text: string;
  kind?: "system" | "agent" | "alert";
};

function heroName(id: string) { return heroes.find((hero) => hero.id === id)?.name ?? id; }
function asHeroId(id: string): OperationsHeroId { return id as OperationsHeroId; }
function pairKey(a: string, b: string) { return [a, b].sort().join("|"); }
function fill(text: string, values: Record<string, string>) {
  return Object.entries(values).reduce((current, [key, value]) => current.replaceAll(`{${key}}`, value), text);
}

function outcomeKey(outcome: MissionOutcome): MissionOutcomeKey {
  if (outcome === "Sucesso") return "success";
  if (outcome === "Sucesso com custo") return "cost";
  if (outcome === "Sucesso parcial") return "partial";
  return "failure";
}

function resonanceValue(save: SaveGame, a: string, b: string) {
  const direct = save.resonance[pairKey(a, b)];
  if (direct) return direct.value;
  const pair = Object.values(save.resonance).find((item: ResonancePair) => pairKey(item.a, item.b) === pairKey(a, b));
  return pair?.value ?? 0;
}

function contextualSoloLine(incident: Incident, heroId: OperationsHeroId, phase: MissionPhase) {
  const affinity = affinityMissionLines[incident.id]?.[heroId]?.[phase];
  if (affinity) return affinity;
  const specialty = specialtyMissionLines[heroId];
  if (specialty) {
    for (const tag of incident.recommendedTags) {
      const line = specialty[tag]?.[phase];
      if (line) return line;
    }
  }
  const fallback = missionLines[heroId] ?? missionLines.yuki;
  return phase === "depart" ? fallback[0] : phase === "arrival" ? fallback[1] : fallback[2];
}

function contextualTeamLine(save: SaveGame, incident: Incident, speakerId: OperationsHeroId, teammateId: OperationsHeroId, phase: "arrival" | "mid") {
  const affinity = affinityMissionLines[incident.id]?.[speakerId]?.[phase];
  if (affinity) return affinity;

  const authoredPair = pairDialogue[pairKey(speakerId, teammateId)]?.[phase]?.[speakerId];
  if (authoredPair) return authoredPair;

  const specialty = specialtyMissionLines[speakerId];
  if (specialty) {
    for (const tag of incident.recommendedTags) {
      const line = specialty[tag]?.[phase];
      if (line) return `${line} ${fill(teamTemplates[speakerId][phase], { teammate: heroName(teammateId) })}`;
    }
  }

  const tone = resonanceValue(save, speakerId, teammateId);
  const base = fill(teamTemplates[speakerId][phase], { teammate: heroName(teammateId) });
  if (tone <= -2 && phase === "arrival") return `${base} Vamos manter a comunicação objetiva e não cruzar função.`;
  if (tone >= 2 && phase === "mid") return `${base} Tá encaixando bem.`;
  return base;
}

export function getOperationalChatMessages(save: SaveGame): OperationalChatMessage[] {
  const messages: OperationalChatMessage[] = [
    { id: `day-${save.player.currentDay}-open`, minute: 0, sender: "NEXO", text: `Canal operacional do Dia ${save.player.currentDay} aberto. Durante o expediente, o Analista permanece em modo somente leitura.`, kind: "system" },
  ];

  for (const ambient of ambientMessages) {
    if (ambient.day === save.player.currentDay && save.shift.elapsedGameMinutes >= ambient.minute) {
      messages.push({ id: ambient.id, minute: ambient.minute, sender: heroName(ambient.senderHeroId), text: ambient.text, kind: "agent" });
    }
  }

  for (const incident of incidents) {
    const runtime = save.shift.incidents[incident.id];
    if (!runtime || runtime.status === "scheduled") continue;
    const spawn = runtime.spawnedAtGameMinute ?? incident.spawnMinute;

    const comments = eventComments[incident.id] ?? [];
    comments.slice(0, 2).forEach((comment, index) => {
      const minute = spawn + 2 + index * 3;
      if (save.shift.elapsedGameMinutes >= minute) {
        messages.push({ id: `${incident.id}-comment-${index}`, minute, sender: heroName(comment.heroId), text: comment.text, kind: "agent" });
      }
    });

    if (runtime.dispatchedAtGameMinute != null && runtime.selectedHeroIds?.length) {
      const team = runtime.selectedHeroIds.map(asHeroId);
      const first = team[0];
      const second = team[1];
      const third = team[2];
      const start = runtime.dispatchedAtGameMinute;
      const end = runtime.resolvesAtGameMinute ?? start + incident.missionDurationMinutes;
      const duration = Math.max(1, end - start);
      const arrivalMinute = start + Math.max(8, Math.round(duration * 0.23));
      const midMinute = start + Math.max(18, Math.round(duration * 0.58));

      if (save.shift.elapsedGameMinutes >= start + 2) {
        messages.push({ id: `${incident.id}-depart`, minute: start + 2, sender: heroName(first), text: contextualSoloLine(incident, first, "depart"), kind: "agent" });
      }

      if (save.shift.elapsedGameMinutes >= arrivalMinute) {
        const speaker = second ?? first;
        const text = second ? contextualTeamLine(save, incident, speaker, first, "arrival") : contextualSoloLine(incident, speaker, "arrival");
        messages.push({ id: `${incident.id}-arrival`, minute: arrivalMinute, sender: heroName(speaker), text, kind: "agent" });
      }

      if (save.shift.elapsedGameMinutes >= midMinute && runtime.status === "dispatched") {
        const speaker = third ?? second ?? first;
        const teammate = speaker === first ? second : first;
        const text = teammate ? contextualTeamLine(save, incident, speaker, teammate, "mid") : contextualSoloLine(incident, speaker, "mid");
        messages.push({ id: `${incident.id}-mid`, minute: midMinute, sender: heroName(speaker), text, kind: "agent" });
      }
    }
  }

  for (const report of save.shift.reportQueue) {
    if (save.shift.elapsedGameMinutes < report.completedAtGameMinute) continue;
    const incident = incidents.find((item) => item.id === report.incidentId);
    const first = asHeroId(report.selectedHeroIds[0]);
    const second = report.selectedHeroIds[1] ? asHeroId(report.selectedHeroIds[1]) : undefined;
    const key = outcomeKey(report.outcome);
    const title = incident?.title ?? "a ocorrência";
    const main = fill((outcomeLines[first] ?? outcomeLines.yuki)[key], { incident: title });
    messages.push({
      id: `${report.incidentId}-complete`, minute: report.completedAtGameMinute, sender: heroName(first), text: main,
      kind: report.outcome === "Falha" ? "alert" : "agent",
    });

    if (second && save.shift.elapsedGameMinutes >= report.completedAtGameMinute + 1) {
      const reaction = fill((teamOutcomeReactions[second] ?? teamOutcomeReactions.yuki)[key], { teammate: heroName(first), incident: title });
      messages.push({
        id: `${report.incidentId}-complete-reaction`, minute: report.completedAtGameMinute + 1, sender: heroName(second), text: reaction,
        kind: report.outcome === "Falha" ? "alert" : "agent",
      });
    }
  }

  return messages.filter((message) => message.minute <= save.shift.elapsedGameMinutes)
    .sort((a, b) => a.minute - b.minute || a.id.localeCompare(b.id))
    .slice(-GAMEPLAY_CONFIG.maxVisibleOperationalMessages);
}
