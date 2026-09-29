"use client";

import type { DialogueScene, DispatchResult, SaveGame } from "@/game/types";
import { updateSave } from "@/lib/save";
import { useMemo, useState } from "react";

export function DialogueEngine({ scene, save, lastDispatch, onComplete }: {
  scene: DialogueScene;
  save: SaveGame;
  lastDispatch: DispatchResult | null;
  onComplete: () => void;
}) {
  const completedChoice = scene.choices.find((choice) => save.flags.includes(choice.flag));
  const [response, setResponse] = useState<string | null>(completedChoice?.response ?? null);

  const opening = scene.opening.replaceAll("{{playerName}}", save.player.name);
  const heroWasDispatched = lastDispatch?.selectedHeroIds.includes(scene.characterId) ?? false;
  const contextLine = useMemo(() => {
    if (!scene.contextLines) return null;
    return heroWasDispatched ? scene.contextLines.whenHeroWasDispatched : scene.contextLines.whenHeroWasNotDispatched;
  }, [heroWasDispatched, scene.contextLines]);

  function choose(index: number) {
    const choice = scene.choices[index];
    updateSave((current) => {
      if (current.flags.includes(choice.flag)) return current;
      const relationship = current.relationships[scene.characterId];
      if (!relationship) return current;

      const updatedRelationship = { ...relationship };
      for (const [key, value] of Object.entries(choice.delta)) {
        const typedKey = key as keyof typeof updatedRelationship;
        updatedRelationship[typedKey] += value ?? 0;
      }

      return {
        ...current,
        relationships: {
          ...current.relationships,
          [scene.characterId]: updatedRelationship
        },
        flags: current.flags.includes(choice.flag) ? current.flags : [...current.flags, choice.flag]
      };
    });
    setResponse(choice.response);
  }

  return (
    <section className="dialogueBox">
      <strong>{scene.speaker}</strong>
      {contextLine && !response && <p className="contextLine">{contextLine}</p>}
      <p>{response ?? opening}</p>
      {!response ? (
        <div className="choiceList">
          {scene.choices.map((choice, index) => (
            <button key={choice.id} onClick={() => choose(index)}>{choice.text}</button>
          ))}
        </div>
      ) : (
        <button className="button primary" onClick={onComplete}>Próximo dia</button>
      )}
    </section>
  );
}
