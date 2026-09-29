import { createInitialHeroStates } from "@/game/simulation/heroState";
import { advanceOperationalState } from "@/game/simulation/operations";
import { createInitialShift, REAL_MS_PER_GAME_MINUTE, SHIFT_GAME_MINUTES, startShift } from "@/game/simulation/shift";
import type { SaveGame } from "@/game/types";

function runningAt(save: SaveGame, targetMinute: number, now = Date.now()): SaveGame {
  const baseShift = save.shift.status === "not_started" ? startShift(save.shift, now) : save.shift;
  const clamped = Math.max(0, Math.min(SHIFT_GAME_MINUTES, targetMinute));
  return {
    ...save,
    shift: {
      ...baseShift,
      status: "running",
      elapsedGameMinutes: Math.min(baseShift.elapsedGameMinutes, clamped),
      startedAtEpochMs: now - clamped * REAL_MS_PER_GAME_MINUTE
    }
  };
}

export function devAdvanceMinutes(save: SaveGame, minutes: number, now = Date.now()): SaveGame {
  const target = Math.min(SHIFT_GAME_MINUTES, save.shift.elapsedGameMinutes + Math.max(0, minutes));
  return advanceOperationalState(runningAt(save, target, now), now);
}

export function devResolveAllAndFinish(save: SaveGame, now = Date.now()): SaveGame {
  const advanced = advanceOperationalState(runningAt(save, SHIFT_GAME_MINUTES, now), now);
  return {
    ...advanced,
    player: { ...advanced.player, developmentRequired: true },
    shift: {
      ...advanced.shift,
      status: "finished",
      elapsedGameMinutes: SHIFT_GAME_MINUTES
    }
  };
}

export function devSkipToPostShift(save: SaveGame, now = Date.now()): SaveGame {
  const finished = devResolveAllAndFinish(save, now);
  return {
    ...finished,
    player: { ...finished.player, developmentRequired: false },
    lastDispatch: finished.shift.reportQueue.at(-1) ?? finished.lastDispatch,
    shift: { ...finished.shift, reportQueue: [] },
    flags: finished.flags.includes("dev_skipped_to_post") ? finished.flags : [...finished.flags, "dev_skipped_to_post"]
  };
}

export function devResetShift(save: SaveGame): SaveGame {
  return {
    ...save,
    heroStates: createInitialHeroStates(),
    shift: createInitialShift(save.player.currentDay),
    lastDispatch: null,
    flags: save.flags.filter((flag) => !flag.startsWith("despacho_") && flag !== "dev_skipped_to_post")
  };
}
