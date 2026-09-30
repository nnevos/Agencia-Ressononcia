"use client";

import { getHeroPortrait } from "@/game/data/heroPortraits";
import type { DialogueScene, DispatchResult, SaveGame } from "@/game/types";
import { canChooseOuting, getCompletedChoice, getCurrentTurn, getDailyRomanceEarned, getDialogueTurns, getRomanceDailyCap, getRomanceGain, getRomanceProgress, getRouteStage, getSceneDay, isDialogueSceneComplete, routeAdvanceFlag } from "@/game/social/dialogue";
import { isSceneAvailable } from "@/content/dialogues/post-shift";
import { updateSave } from "@/lib/save";
import { useEffect, useMemo, useRef, useState } from "react";

export function PhoneDialogueEngine({ scenes, save, lastDispatch, onBack, onSaveChange, onOutingSelected, onFinishDay }: {
  scenes: DialogueScene[];
  save: SaveGame;
  lastDispatch: DispatchResult | null;
  onBack?: () => void;
  onSaveChange: () => void;
  onOutingSelected?: (sceneId: string) => void;
  onFinishDay?: () => void;
}) {
  const sortedScenes = useMemo(() => [...scenes].sort((a, b) => getSceneDay(a) - getSceneDay(b)), [scenes]);
  const routeStage = sortedScenes[0] ? getRouteStage(save, sortedScenes[0].characterId) : 1;
  const currentScene = sortedScenes.find((scene) => getSceneDay(scene) === routeStage && isSceneAvailable(scene, save) && !isDialogueSceneComplete(scene, save)) ?? null;
  const currentTurnInfo = currentScene ? getCurrentTurn(currentScene, save) : null;
  const [draftChoiceId, setDraftChoiceId] = useState<string | null>(null);
  const historyRef = useRef<HTMLDivElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);
  const [showJumpToLatest, setShowJumpToLatest] = useState(false);
  const [expandedImage, setExpandedImage] = useState<{ src: string; alt: string } | null>(null);

  const speaker = sortedScenes[sortedScenes.length - 1]?.speaker ?? "NEXO";
  const characterId = sortedScenes[sortedScenes.length - 1]?.characterId ?? "";
  const portrait = characterId ? getHeroPortrait(characterId) : null;
  const romanceProgress = characterId ? getRomanceProgress(save, characterId) : 0;
  const selectedChoice = currentTurnInfo?.turn.choices.find((choice) => choice.id === draftChoiceId) ?? null;
  const completedMilestones = characterId ? (save.social.outingMilestones[characterId] ?? []) : [];
  const pendingMilestone = routeStage >= 3 && !completedMilestones.includes(3) ? 3 : routeStage >= 6 && !completedMilestones.includes(6) ? 6 : null;
  const pendingOutingState = pendingMilestone && characterId ? canChooseOuting(save, characterId, pendingMilestone, 0) : null;

  const historySignature = useMemo(() => sortedScenes.map((scene) => {
    const flags = getDialogueTurns(scene).flatMap((turn) => turn.choices.filter((choice) => save.flags.includes(choice.flag)).map((choice) => choice.flag));
    return `${scene.id}:${flags.join(",")}`;
  }).join("|"), [sortedScenes, save.flags]);

  function scrollToLatest(behavior: ScrollBehavior = "smooth") {
    const node = historyRef.current;
    if (!node) return;
    node.scrollTo({ top: node.scrollHeight, behavior });
    setShowJumpToLatest(false);
  }

  useEffect(() => {
    const frame = requestAnimationFrame(() => scrollToLatest("auto"));
    return () => cancelAnimationFrame(frame);
  }, [characterId]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => scrollToLatest("smooth"));
    return () => cancelAnimationFrame(frame);
  }, [historySignature]);

  useEffect(() => {
    setDraftChoiceId(null);
  }, [currentScene?.id, currentTurnInfo?.turn.id]);

  function handleHistoryScroll() {
    const node = historyRef.current;
    if (!node) return;
    const distanceFromBottom = node.scrollHeight - node.scrollTop - node.clientHeight;
    setShowJumpToLatest(distanceFromBottom > 140);
  }

  function renderMessage(message: { direction: "incoming" | "outgoing"; text?: string; image?: string; imageAlt?: string }, key: string) {
    if (!message.text && !message.image) return null;
    const alt = message.imageAlt ?? "Imagem enviada no NEXO";
    return <div className={`phoneBubble ${message.direction}`} key={key}>
      {message.image && <button className="nexoChatImageButton" onClick={() => setExpandedImage({ src: message.image!, alt })} aria-label={`Abrir imagem: ${alt}`}>
        <img className="nexoChatImage" src={message.image} alt={alt} />
      </button>}
      {message.text && <p>{message.text.replaceAll("{{playerName}}", save.player.name)}</p>}
      <time>{message.direction === "outgoing" ? "enviada ✓✓" : "agora"}</time>
    </div>;
  }

  function sendChoice() {
    if (!selectedChoice || !currentScene || !currentTurnInfo) return;
    const choice = selectedChoice;
    const outingDay = choice.exclusiveOutingDay;
    const projectedRomanceGain = getRomanceGain(save, currentScene, choice);
    const outingCheck = outingDay ? canChooseOuting(save, currentScene.characterId, outingDay, projectedRomanceGain) : null;
    if (outingCheck && !outingCheck.allowed) return;

    const next = updateSave((current) => {
      if (current.flags.includes(choice.flag)) return current;
      const relationship = current.relationships[currentScene.characterId];
      if (!relationship) return current;

      const updatedRelationship = { ...relationship };
      for (const [key, value] of Object.entries(choice.delta)) {
        const typedKey = key as keyof typeof updatedRelationship;
        updatedRelationship[typedKey] += value ?? 0;
      }

      const romanceGain = getRomanceGain(current, currentScene, choice);
      const currentRomance = current.social.romanceProgress[currentScene.characterId] ?? 0;
      const romanceProgress = Math.min(100, Math.max(0, currentRomance + romanceGain));
      const sceneDay = getSceneDay(currentScene);
      const stageKey = String(sceneDay);
      const stageEarned = { ...(current.social.romanceEarnedByStage[stageKey] ?? {}) };
      stageEarned[currentScene.characterId] = (stageEarned[currentScene.characterId] ?? 0) + romanceGain;
      const isLastTurn = currentTurnInfo.index === currentTurnInfo.turns.length - 1;
      const social = {
        ...current.social,
        romanceProgress: { ...current.social.romanceProgress, [currentScene.characterId]: romanceProgress },
        romanceEarnedByStage: { ...current.social.romanceEarnedByStage, [stageKey]: stageEarned },
        routeStage: { ...current.social.routeStage },
        outingsByGlobalDay: { ...current.social.outingsByGlobalDay },
        outingMilestones: { ...current.social.outingMilestones },
      };
      if (outingDay) social.outingsByGlobalDay[String(current.player.currentDay)] = currentScene.characterId;
      if (isLastTurn && !outingDay) social.routeStage[currentScene.characterId] = Math.min(10, sceneDay + 1);

      const flags = [...current.flags, choice.flag];
      if (isLastTurn && !outingDay) flags.push(routeAdvanceFlag(current.player.currentDay, currentScene.characterId));
      if (outingDay) flags.push(`outing:day${outingDay}:${currentScene.characterId}`);

      if (isLastTurn && currentScene.completionFlag && !flags.includes(currentScene.completionFlag)) flags.push(currentScene.completionFlag);

      return {
        ...current,
        relationships: { ...current.relationships, [currentScene.characterId]: updatedRelationship },
        social,
        flags,
      };
    });

    if (next) {
      setDraftChoiceId(null);
      onSaveChange();
      if (choice.vnSceneId) onOutingSelected?.(choice.vnSceneId);
    }
  }

  const selectedOutingDay = selectedChoice?.exclusiveOutingDay;
  const selectedProjectedGain = selectedChoice && currentScene ? getRomanceGain(save, currentScene, selectedChoice) : 0;
  const outingState = selectedOutingDay && currentScene ? canChooseOuting(save, currentScene.characterId, selectedOutingDay, selectedProjectedGain) : null;

  return <section className="phoneDialoguePanel nexoConversationPane">
    <header className="phoneChatHeader nexoPrivateHeader">
      {onBack && <button className="nexoBackButton" onClick={onBack} aria-label="Voltar às conversas">‹</button>}
      <div className="phoneChatAvatar">
        {portrait ? <img src={portrait} alt="" /> : speaker.slice(0,2).toUpperCase()}
      </div>
      <div className="nexoPrivateIdentity">
        <strong>{speaker}</strong>
        <small>online agora</small>
      </div>
      <div className="nexoRomanceMeter" aria-label={`Progresso romântico ${Math.round(romanceProgress)}%`}>
        <span>ROMANCE</span><strong>{Math.round(romanceProgress)}%</strong>
      </div>
      <div className="nexoHeaderActions" aria-label="Ações da conversa"><span>⌕</span><span>⋮</span>{onFinishDay && <button className="nexoEndNightButton" onClick={onFinishDay}>ENCERRAR NOITE</button>}</div>
    </header>

    <div className="phoneChatHistory nexoChatWallpaper" ref={historyRef} onScroll={handleHistoryScroll}>
      {sortedScenes.map((scene) => {
        const sceneDay = getSceneDay(scene);
        const turns = getDialogueTurns(scene);
        const heroWasDispatched = lastDispatch?.selectedHeroIds.includes(scene.characterId) ?? false;
        const contextLine = scene.contextLines
          ? (heroWasDispatched ? scene.contextLines.whenHeroWasDispatched : scene.contextLines.whenHeroWasNotDispatched)
          : null;
        let canRenderTurn = true;

        return <div className="nexoSceneHistory" key={scene.id}>
          <div className="phoneTimestamp">{scene.timeLabel}</div>
          {scene.placeholder && <div className="phoneSystemNote nexoPlaceholderNote">PLACEHOLDER DE QA · este conteúdo será substituído na autoria final.</div>}
          {contextLine && <div className="phoneSystemNote">{contextLine.replaceAll("{{playerName}}", save.player.name)}</div>}
          {turns.map((turn) => {
            if (!canRenderTurn) return null;
            const completed = getCompletedChoice(turn, save);
            const result = <div className="nexoTurnBlock" key={turn.id}>
              {turn.timeLabel && <div className="nexoInlineTime">{turn.timeLabel}</div>}
              {turn.prefaceOutgoing && renderMessage({ direction:"outgoing", text:turn.prefaceOutgoing }, `${turn.id}:preface`)}
              {renderMessage({ direction:"incoming", text:turn.incoming, image:turn.incomingImage, imageAlt:turn.incomingImageAlt }, `${turn.id}:incoming`)}
              {turn.afterIncoming?.map((message, index) => renderMessage(message, `${turn.id}:after-incoming:${index}`))}
              {completed && <>
                {renderMessage({ direction:"outgoing", text:completed.text }, `${turn.id}:choice`)}
                {renderMessage({ direction:"incoming", text:completed.response }, `${turn.id}:response`)}
                {completed.afterResponse?.map((message, index) => renderMessage(message, `${turn.id}:after-response:${index}`))}
              </>}
            </div>;
            if (!completed) canRenderTurn = false;
            return result;
          })}
        </div>;
      })}
      <div ref={endRef} className="nexoHistoryEnd" aria-hidden="true" />
    </div>

    {showJumpToLatest && <button className="nexoJumpLatest" onClick={() => scrollToLatest("smooth")}>↓ mensagens recentes</button>}

    <footer className="phoneReplyArea nexoComposerArea">
      {currentScene && currentTurnInfo ? <>
        {pendingMilestone && pendingOutingState?.allowed && getSceneDay(currentScene) !== pendingMilestone ? <button className="button primary" onClick={() => {
          updateSave((current) => ({ ...current, social:{ ...current.social, outingsByGlobalDay:{ ...current.social.outingsByGlobalDay, [String(current.player.currentDay)]: characterId } } }));
          onSaveChange();
          onOutingSelected?.(`outing-day${pendingMilestone}-${characterId}`);
        }}>MARCAR {pendingMilestone === 3 ? "PRIMEIRA SAÍDA" : "SEGUNDO DATE"}</button> : null}
        <div className="nexoDailyRomanceHint">
          Afinidade nesta etapa: {Math.round(getDailyRomanceEarned(save, currentScene.characterId, getSceneDay(currentScene)))} / {getRomanceDailyCap(currentScene)}
        </div>
        <div className="nexoReplySuggestions" aria-label="Respostas disponíveis">
          {currentTurnInfo.turn.choices.map((choice) => {
            const projectedGain = getRomanceGain(save, currentScene, choice);
            const outing = choice.exclusiveOutingDay ? canChooseOuting(save, currentScene.characterId, choice.exclusiveOutingDay, projectedGain) : null;
            const blocked = Boolean(outing && !outing.allowed);
            return <button
              key={choice.id}
              className={draftChoiceId === choice.id ? "selected" : ""}
              onClick={() => setDraftChoiceId(choice.id)}
              disabled={blocked}
              title={blocked && outing?.selected && outing.selected !== currentScene.characterId ? "Você já escolheu outra pessoa para sair neste dia." : blocked && outing?.threshold ? `Requer ${outing.threshold}% de romance.` : undefined}
            >{choice.text}</button>;
          })}
        </div>
        {outingState && !outingState.allowed && <div className="nexoOutingHint">
          {outingState.selected && outingState.selected !== currentScene.characterId
            ? "Você já combinou uma saída com outra pessoa nesta noite."
            : `Este marco exige pelo menos ${outingState.threshold}% de romance.`}
        </div>}
        <div className="nexoComposer">
          <button className="nexoComposerIcon" aria-label="Anexos" disabled>＋</button>
          <div className={selectedChoice ? "nexoDraftField filled" : "nexoDraftField"}>
            {selectedChoice?.text ?? "Escolha uma resposta acima..."}
          </div>
          <button className="nexoSendButton" onClick={sendChoice} disabled={!selectedChoice || Boolean(outingState && !outingState.allowed)} aria-label="Enviar mensagem">➤</button>
        </div>
      </> : <div className="nexoConversationDone"><span>✓✓</span>
        {pendingMilestone && pendingOutingState?.allowed ? <button className="button primary" onClick={() => {
          updateSave((current) => ({ ...current, social:{ ...current.social, outingsByGlobalDay:{ ...current.social.outingsByGlobalDay, [String(current.player.currentDay)]: characterId } } }));
          onSaveChange();
          onOutingSelected?.(`outing-day${pendingMilestone}-${characterId}`);
        }}>MARCAR {pendingMilestone === 3 ? "PRIMEIRA SAÍDA" : "SEGUNDO DATE"}</button> : pendingMilestone && pendingOutingState?.threshold ? <small>Continue desenvolvendo a relação: este marco pede {pendingOutingState.threshold}%.</small> : <small>Sem novas mensagens nesta rota agora.</small>}
      </div>}
    </footer>

    {expandedImage && <div className="nexoImageLightbox" role="dialog" aria-modal="true" aria-label={expandedImage.alt} onClick={() => setExpandedImage(null)}>
      <button className="nexoImageLightboxClose" onClick={() => setExpandedImage(null)} aria-label="Fechar imagem">×</button>
      <img src={expandedImage.src} alt={expandedImage.alt} onClick={(event) => event.stopPropagation()} />
    </div>}
  </section>;
}
