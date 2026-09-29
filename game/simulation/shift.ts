import { incidents } from "@/game/data/incidents";
import { GAMEPLAY_CONFIG } from "@/content/config/gameplay";
import type { IncidentRuntime, ShiftState } from "@/game/types";

export const SHIFT_START_HOUR = GAMEPLAY_CONFIG.shiftStartHour;
export const SHIFT_END_HOUR = GAMEPLAY_CONFIG.shiftEndHour;
export const SHIFT_GAME_MINUTES = (SHIFT_END_HOUR - SHIFT_START_HOUR) * 60;
export const SHIFT_REAL_DURATION_MS = GAMEPLAY_CONFIG.shiftRealDurationMinutes * 60 * 1000;
export const REAL_MS_PER_GAME_MINUTE = SHIFT_REAL_DURATION_MS / SHIFT_GAME_MINUTES;

export function createInitialShift(day: number): ShiftState {
  return {
    day,
    startedAtEpochMs: null,
    elapsedGameMinutes: 0,
    status: "not_started",
    incidents: Object.fromEntries(incidents.map((incident) => [incident.id, { incidentId: incident.id, status: "scheduled" as const }])),
    reportQueue: []
  };
}

export function getElapsedGameMinutes(shift: ShiftState, now = Date.now()) {
  if (shift.status !== "running" || !shift.startedAtEpochMs) return shift.elapsedGameMinutes;
  const elapsedRealMs = Math.max(0, now - shift.startedAtEpochMs);
  return Math.min(SHIFT_GAME_MINUTES, Math.floor(elapsedRealMs / REAL_MS_PER_GAME_MINUTE));
}

export function formatGameTime(gameMinute: number) {
  const total = SHIFT_START_HOUR * 60 + Math.max(0, Math.min(SHIFT_GAME_MINUTES, gameMinute));
  const hour = Math.floor(total / 60);
  const minute = total % 60;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

export function getRemainingSeconds(shift: ShiftState, now = Date.now()) {
  if (shift.status === "finished") return 0;
  if (shift.status !== "running" || !shift.startedAtEpochMs) return Math.round(SHIFT_REAL_DURATION_MS / 1000);
  return Math.max(0, Math.ceil((SHIFT_REAL_DURATION_MS - (now - shift.startedAtEpochMs)) / 1000));
}

export function startShift(shift: ShiftState, now = Date.now()): ShiftState {
  if (shift.status !== "not_started") return shift;
  return { ...shift, startedAtEpochMs: now, status: "running", elapsedGameMinutes: 0 };
}

export function syncIncidentRuntime(shift: ShiftState, gameMinute: number): ShiftState {
  const nextIncidents: Record<string, IncidentRuntime> = { ...shift.incidents };
  for (const incident of incidents) {
    const runtime = nextIncidents[incident.id] ?? { incidentId: incident.id, status: "scheduled" };
    if (runtime.status === "scheduled" && gameMinute >= incident.spawnMinute) {
      const deadlineAtGameMinute = incident.spawnMinute + incident.deadlineMinutes;
      nextIncidents[incident.id] = {
        ...runtime,
        status: gameMinute > deadlineAtGameMinute ? "expired" : "waiting",
        spawnedAtGameMinute: incident.spawnMinute,
        deadlineAtGameMinute
      };
      continue;
    }
    if (runtime.status === "waiting" && runtime.deadlineAtGameMinute !== undefined && gameMinute > runtime.deadlineAtGameMinute) {
      nextIncidents[incident.id] = { ...runtime, status: "expired" };
    }
  }
  const finished = gameMinute >= SHIFT_GAME_MINUTES;
  return {
    ...shift,
    elapsedGameMinutes: gameMinute,
    status: finished ? "finished" : shift.status,
    incidents: nextIncidents
  };
}
