import { eventComments, missionLines, ambientMessages } from "@/content/messages/operations";
import { GAMEPLAY_CONFIG } from "@/content/config/gameplay";
import { heroes } from "@/game/data/heroes";
import { incidents } from "@/game/data/incidents";
import type { SaveGame } from "@/game/types";

export type OperationalChatMessage = {
  id: string;
  minute: number;
  sender: string;
  text: string;
  kind?: "system" | "agent" | "alert";
};

function heroName(id: string) { return heroes.find((hero) => hero.id === id)?.name ?? id; }

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

    if (save.shift.elapsedGameMinutes >= spawn + 2) {
      const comment = eventComments[incident.id];
      if (comment) messages.push({ id: `${incident.id}-comment`, minute: spawn + 2, sender: heroName(comment.heroId), text: comment.text, kind: "agent" });
    }

    if (runtime.dispatchedAtGameMinute != null && runtime.selectedHeroIds?.length) {
      const first = runtime.selectedHeroIds[0];
      const second = runtime.selectedHeroIds[1] ?? first;
      const third = runtime.selectedHeroIds[2] ?? second;
      const start = runtime.dispatchedAtGameMinute;
      const end = runtime.resolvesAtGameMinute ?? start + incident.missionDurationMinutes;
      const duration = Math.max(1, end - start);
      const lines1 = missionLines[first] ?? missionLines.yuki;
      const lines2 = missionLines[second] ?? missionLines.yuki;
      const lines3 = missionLines[third] ?? missionLines.yuki;

      if (save.shift.elapsedGameMinutes >= start + 2) messages.push({ id: `${incident.id}-depart`, minute: start + 2, sender: heroName(first), text: lines1[0], kind: "agent" });
      if (save.shift.elapsedGameMinutes >= start + Math.max(8, Math.round(duration * 0.23))) messages.push({ id: `${incident.id}-arrival`, minute: start + Math.max(8, Math.round(duration * 0.23)), sender: heroName(second), text: lines2[1], kind: "agent" });
      if (save.shift.elapsedGameMinutes >= start + Math.max(18, Math.round(duration * 0.58)) && runtime.status === "dispatched") messages.push({ id: `${incident.id}-mid`, minute: start + Math.max(18, Math.round(duration * 0.58)), sender: heroName(third), text: lines3[2], kind: "agent" });
    }
  }

  for (const report of save.shift.reportQueue) {
    if (save.shift.elapsedGameMinutes < report.completedAtGameMinute) continue;
    const first = report.selectedHeroIds[0];
    messages.push({
      id: `${report.incidentId}-complete`, minute: report.completedAtGameMinute, sender: heroName(first),
      text: report.outcome === "Falha" ? "Estamos voltando. A operação não saiu como planejado. O relatório já foi enviado." : "Operação encerrada. Estamos retornando e o relatório já está na Central.",
      kind: report.outcome === "Falha" ? "alert" : "agent",
    });
  }

  return messages.filter((message) => message.minute <= save.shift.elapsedGameMinutes)
    .sort((a, b) => a.minute - b.minute || a.id.localeCompare(b.id))
    .slice(-GAMEPLAY_CONFIG.maxVisibleOperationalMessages);
}
