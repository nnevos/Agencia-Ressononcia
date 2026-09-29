"use client";

import type { DialogueScene, DispatchResult, SaveGame } from "@/game/types";
import { updateSave } from "@/lib/save";
import { useMemo, useState } from "react";

export function PhoneDialogueEngine({ scene, save, lastDispatch, onComplete }: {
  scene: DialogueScene;
  save: SaveGame;
  lastDispatch: DispatchResult | null;
  onComplete: () => void;
}) {
  const completedChoice = scene.choices.find((choice) => save.flags.includes(choice.flag));
  const [selectedText, setSelectedText] = useState<string | null>(completedChoice?.text ?? null);
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
        relationships: { ...current.relationships, [scene.characterId]: updatedRelationship },
        flags: [...current.flags, choice.flag],
      };
    });
    setSelectedText(choice.text);
    setResponse(choice.response);
  }

  function finishConversation() {
    if (scene.completionFlag) {
      updateSave((current) => current.flags.includes(scene.completionFlag!) ? current : { ...current, flags: [...current.flags, scene.completionFlag!] });
    }
    onComplete();
  }

  return <section className="phoneDialoguePanel">
    <header className="phoneChatHeader">
      <div className="phoneChatAvatar">{scene.speaker.slice(0,2).toUpperCase()}</div>
      <div><strong>{scene.speaker}</strong><small>online agora</small></div>
      <span>NEXO // PRIVADO</span>
    </header>
    <div className="phoneChatHistory">
      <div className="phoneTimestamp">{scene.timeLabel}</div>
      {contextLine && <div className="phoneSystemNote">{contextLine}</div>}
      <div className="phoneBubble incoming"><strong>{scene.speaker}</strong><p>{opening}</p></div>
      {selectedText && <div className="phoneBubble outgoing"><strong>{save.player.name}</strong><p>{selectedText}</p></div>}
      {response && <div className="phoneBubble incoming"><strong>{scene.speaker}</strong><p>{response}</p></div>}
    </div>
    <footer className="phoneReplyArea">
      {!response ? <>
        <span>ESCOLHA UMA RESPOSTA</span>
        <div className="phoneReplyChoices">{scene.choices.map((choice, index) => <button key={choice.id} onClick={() => choose(index)}>{choice.text}</button>)}</div>
      </> : <button className="phoneContinue" onClick={finishConversation}>VOLTAR ÀS CONVERSAS</button>}
    </footer>
  </section>;
}
