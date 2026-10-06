import { incidents } from "@/game/data/incidents";
import { pairKey } from "@/game/data/resonance";
import { applyMissionEffects } from "@/game/simulation/heroState";
import { getElapsedGameMinutes, syncIncidentRuntime } from "@/game/simulation/shift";
import { FIRST_TUTORIAL_INCIDENT_ID } from "@/content/narrative/tutorial";
import { awardHeroXp } from "@/game/progression/heroProgression";
import type { DispatchResult, SaveGame } from "@/game/types";

export function advanceOperationalState(save: SaveGame, now = Date.now()): SaveGame {
  if (save.shift.status !== "running") return save;
  const tutorialRuntimeBeforeSync = save.shift.incidents[FIRST_TUTORIAL_INCIDENT_ID];
  const tutorialDecisionPaused = save.player.currentDay === 1
    && save.flags.includes("tutorial_active")
    && (tutorialRuntimeBeforeSync?.status === "scheduled" || tutorialRuntimeBeforeSync?.status === "waiting");
  const gameMinute = tutorialDecisionPaused ? save.shift.elapsedGameMinutes : getElapsedGameMinutes(save.shift, now);
  let shift = syncIncidentRuntime(save.shift, gameMinute);

  // O primeiro caso ensina a interface e congela apenas o tempo logico.
  // Nao reancoramos `startedAtEpochMs` a cada tick: isso gerava uma escrita de
  // save por segundo (e, na Beta 1, sincronizacao cloud desnecessaria). O relogio
  // e reancorado uma unica vez no momento do despacho do tutorial.
  if (tutorialDecisionPaused) {
    const tutorialRuntime = shift.incidents[FIRST_TUTORIAL_INCIDENT_ID];
    if (tutorialRuntime?.status === "expired") {
      shift = {
        ...shift,
        incidents: {
          ...shift.incidents,
          [FIRST_TUTORIAL_INCIDENT_ID]: { ...tutorialRuntime, status: "waiting" as const },
        },
      };
    }
  }

  let changed = shift !== save.shift;
  let reportQueue = shift.reportQueue;
  let reportQueueChanged = false;

  for (const incident of incidents) {
    const runtime = shift.incidents[incident.id];
    if (runtime?.status !== "dispatched" || runtime.resolvesAtGameMinute === undefined || runtime.resolvesAtGameMinute > gameMinute || !runtime.result) continue;

    const alreadyQueued = reportQueue.some((item) => item.incidentId === runtime.result?.incidentId && item.completedAtGameMinute === runtime.result?.completedAtGameMinute);
    if (!alreadyQueued) {
      if (!reportQueueChanged) reportQueue = [...reportQueue];
      reportQueue.push(runtime.result);
      reportQueueChanged = true;
    }

    shift = {
      ...shift,
      incidents: {
        ...shift.incidents,
        [incident.id]: { ...runtime, status: "resolved" }
      }
    };
    changed = true;
  }

  if (!changed && !reportQueueChanged) return save;
  if (reportQueueChanged) shift = { ...shift, reportQueue };
  return { ...save, shift, lastDispatch: reportQueue.at(-1) ?? save.lastDispatch };
}

/**
 * O relogio da Central atualiza a UI a cada minuto diegetico, mas o timestamp
 * inicial ja permite reconstruir esse tempo em reload. Persistimos apenas
 * transicoes observaveis do turno (spawn/expiracao/resolucao/fim), evitando
 * centenas de revisoes locais/cloud por expediente.
 */
export function shouldPersistOperationalAdvance(previous: SaveGame, next: SaveGame): boolean {
  return previous.shift.status !== next.shift.status
    || previous.shift.incidents !== next.shift.incidents
    || previous.shift.reportQueue !== next.shift.reportQueue
    || previous.lastDispatch !== next.lastDispatch;
}

export function acknowledgeMissionResult(save: SaveGame, result: DispatchResult): SaveGame {
  const runtime = save.shift.incidents[result.incidentId];
  const queue = save.shift.reportQueue.filter((item) => !(item.incidentId === result.incidentId && item.completedAtGameMinute === result.completedAtGameMinute));

  let heroStates = applyMissionEffects(save.heroStates, result.heroEffects);
  let resonance = { ...save.resonance };
  let heroProgression = { ...save.heroProgression };

  for (const effect of result.heroEffects) {
    const currentProgress = heroProgression[effect.heroId];
    if (currentProgress) heroProgression[effect.heroId] = awardHeroXp(currentProgress, effect.xpAwarded);
  }

  const ids = result.selectedHeroIds;
  for (let i = 0; i < ids.length; i += 1) {
    for (let j = i + 1; j < ids.length; j += 1) {
      const key = pairKey(ids[i], ids[j]);
      const existing = resonance[key] ?? { a: ids[i], b: ids[j], value: 0, missionsTogether: 0 };
      const positive = result.outcome === "Sucesso" || result.outcome === "Sucesso com custo";
      const nextValue = Math.max(-2, Math.min(2, existing.value + (positive && existing.missionsTogether >= 1 ? 1 : 0)));
      resonance[key] = { ...existing, value: nextValue, missionsTogether: existing.missionsTogether + 1 };
    }
  }

  const nextRuntime = runtime ? { ...runtime, status: "resolved" as const } : runtime;

  return {
    ...save,
    heroStates,
    heroProgression,
    resonance,
    shift: {
      ...save.shift,
      reportQueue: queue,
      incidents: nextRuntime ? { ...save.shift.incidents, [result.incidentId]: nextRuntime } : save.shift.incidents
    },
    lastDispatch: result
  };
}
