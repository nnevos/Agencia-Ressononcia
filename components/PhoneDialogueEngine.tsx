"use client";

import { dialogueRevealDelay } from "@/lib/settings";
import { getHeroPortrait } from "@/game/data/heroPortraits";
import type { DialogueMessage, DialogueScene, DialogueTurn, DispatchResult, SaveGame } from "@/game/types";
import { canChooseOuting, dialogueIntroOutgoingFlag, getCompletedChoice, getCurrentTurn, getDialogueTurns, getRomanceProgress, getRouteStage, getSceneDay, isDialogueSceneComplete, routeAdvanceFlag } from "@/game/social/dialogue";
import { isSceneAvailable } from "@/content/dialogues/post-shift";
import { isPostShiftOnlySave, updateSave } from "@/lib/save";
import { formatPlayerText } from "@/lib/playerText";
import { publicPath } from "@/lib/publicPath";
import { recordNexoActivity } from "@/game/social/nexoLibrary";
import { useEffect, useMemo, useRef, useState } from "react";

type PendingDelivery = {
  messages: DialogueMessage[];
  visibleCount: number;
};


function DialogueBubble({ message, messageKey, live, player, onOpenImage, onImageLoad }: {
  message: DialogueMessage;
  messageKey: string;
  live: boolean;
  player: SaveGame["player"];
  onOpenImage: (src: string, alt: string) => void;
  onImageLoad: () => void;
}) {
  const canDelete = Boolean(message.deleteAfterMs);
  const [deleted, setDeleted] = useState(canDelete && !live);

  useEffect(() => {
    setDeleted(canDelete && !live);
    if (!canDelete || !live) return;
    const timer = window.setTimeout(() => setDeleted(true), message.deleteAfterMs);
    return () => window.clearTimeout(timer);
  }, [canDelete, live, message.deleteAfterMs, messageKey]);

  if (!message.text && !message.image) return null;
  const alt = message.imageAlt ?? "Imagem enviada no NEXO";
  const visibleText = deleted ? (message.deletedText ?? "Mensagem excluída") : message.text;
  return <div className={`phoneBubble ${message.direction} nexoBubbleArrive${deleted ? " deleted" : ""}`} key={messageKey}>
    {!deleted && message.image && <button className="nexoChatImageButton" onClick={() => onOpenImage(message.image!, alt)} aria-label={`Abrir imagem: ${alt}`}>
      <img className="nexoChatImage" src={publicPath(message.image)} alt={alt} onLoad={onImageLoad} />
    </button>}
    {visibleText && <p>{formatPlayerText(visibleText, player)}</p>}
    <time>{message.direction === "outgoing" ? "enviada ✓✓" : "agora"}</time>
  </div>;
}

function getTurnIntroMessages(turn: DialogueTurn): DialogueMessage[] {
  const messages: DialogueMessage[] = [];
  if (turn.prefaceOutgoing) messages.push({ direction: "outgoing", text: turn.prefaceOutgoing });
  if (turn.incoming || turn.incomingImage) messages.push({ direction: "incoming", text: turn.incoming, image: turn.incomingImage, imageAlt: turn.incomingImageAlt });
  messages.push(...(turn.afterIncoming ?? []));
  return messages.filter((message) => Boolean(message.text || message.image));
}

export function PhoneDialogueEngine({ scenes, save, lastDispatch, onBack, onSaveChange, onOutingSelected, onFinishDay, highlightOutingTutorial = false }: {
  scenes: DialogueScene[];
  save: SaveGame;
  lastDispatch: DispatchResult | null;
  onBack?: () => void;
  onSaveChange: () => void;
  onOutingSelected?: (sceneId: string) => void;
  onFinishDay?: () => void;
  highlightOutingTutorial?: boolean;
}) {
  const sortedScenes = useMemo(() => [...scenes].sort((a, b) => getSceneDay(a) - getSceneDay(b)), [scenes]);
  const routeStage = sortedScenes[0] ? getRouteStage(save, sortedScenes[0].characterId) : 1;
  const currentScene = sortedScenes.find((scene) => getSceneDay(scene) === routeStage && isSceneAvailable(scene, save) && !isDialogueSceneComplete(scene, save)) ?? null;
  const currentTurnInfo = currentScene ? getCurrentTurn(currentScene, save) : null;
  const [draftChoiceId, setDraftChoiceId] = useState<string | null>(null);
  const historyRef = useRef<HTMLDivElement | null>(null);
  const composerRef = useRef<HTMLElement | null>(null);
  const [composerHeight, setComposerHeight] = useState(0);
  const [showJumpToLatest, setShowJumpToLatest] = useState(false);
  const [unseenMessageCount, setUnseenMessageCount] = useState(0);
  const nearBottomRef = useRef(true);
  const forceFollowRef = useRef(false);
  const [expandedImage, setExpandedImage] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    if (!expandedImage) return;
    function closeOnEscape(event: KeyboardEvent) { if (event.key === "Escape") setExpandedImage(null); }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [expandedImage]);
  const [introRevealCount, setIntroRevealCount] = useState(0);
  const [pendingDelivery, setPendingDelivery] = useState<PendingDelivery | null>(null);

  const speaker = sortedScenes[sortedScenes.length - 1]?.speaker ?? "NEXO";
  const characterId = sortedScenes[sortedScenes.length - 1]?.characterId ?? "";
  const portrait = characterId ? getHeroPortrait(characterId) : null;
  const romanceProgress = characterId ? getRomanceProgress(save, characterId) : 0;
  const postShiftOnly = isPostShiftOnlySave(save);
  const selectedChoice = currentTurnInfo?.turn.choices.find((choice) => choice.id === draftChoiceId) ?? null;
  const activeIntroMessages = useMemo(() => currentTurnInfo ? getTurnIntroMessages(currentTurnInfo.turn) : [], [currentTurnInfo?.turn.id]);
  const introReady = !currentTurnInfo || activeIntroMessages.length === 0 || introRevealCount >= activeIntroMessages.length;
  const introStartsWithOutgoing = activeIntroMessages[0]?.direction === "outgoing";
  const introOutgoingFlag = currentTurnInfo ? dialogueIntroOutgoingFlag(currentTurnInfo.turn.id) : null;
  const introOpeningSent = !introStartsWithOutgoing || Boolean(introOutgoingFlag && save.flags.includes(introOutgoingFlag));
  const needsManualIntroSend = Boolean(currentTurnInfo && introStartsWithOutgoing && !introOpeningSent);
  const manualIntroMessage = needsManualIntroSend ? activeIntroMessages[0] : null;

  const historySignature = useMemo(() => sortedScenes.map((scene) => {
    const flags = getDialogueTurns(scene).flatMap((turn) => turn.choices.filter((choice) => save.flags.includes(choice.flag)).map((choice) => choice.flag));
    return `${scene.id}:${flags.join(",")}`;
  }).join("|"), [sortedScenes, save.flags]);

  function scrollToLatest(behavior: ScrollBehavior = "smooth") {
    const node = historyRef.current;
    if (!node) return;
    node.scrollTo({ top: node.scrollHeight, behavior });
    nearBottomRef.current = true;
    setShowJumpToLatest(false);
    setUnseenMessageCount(0);
  }

  useEffect(() => {
    const frame = requestAnimationFrame(() => scrollToLatest("auto"));
    return () => cancelAnimationFrame(frame);
  }, [characterId]);

  useEffect(() => {
    const node = historyRef.current;
    if (!node || typeof MutationObserver === "undefined") return;
    let frame = 0;
    const observer = new MutationObserver(() => {
      if (!nearBottomRef.current) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => scrollToLatest("auto"));
    });
    observer.observe(node, { childList: true, subtree: true, characterData: true });
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [characterId]);

  useEffect(() => {
    const node = composerRef.current;
    if (!node || typeof ResizeObserver === "undefined") return;
    let frame = 0;
    const observer = new ResizeObserver(([entry]) => {
      setComposerHeight(Math.ceil(entry.contentRect.height));
      if (!nearBottomRef.current) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => scrollToLatest("auto"));
    });
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [characterId]);

  useEffect(() => {
    const shouldFollow = nearBottomRef.current || forceFollowRef.current;
    if (shouldFollow) {
      const behavior: ScrollBehavior = forceFollowRef.current ? "smooth" : "auto";
      forceFollowRef.current = false;
      const frame = requestAnimationFrame(() => scrollToLatest(behavior));
      return () => cancelAnimationFrame(frame);
    }
    setShowJumpToLatest(true);
    setUnseenMessageCount((count) => count + 1);
  }, [historySignature, introRevealCount, pendingDelivery?.visibleCount]);

  useEffect(() => {
    setDraftChoiceId(null);
    setPendingDelivery(null);
    if (!activeIntroMessages.length) {
      setIntroRevealCount(0);
    } else if (activeIntroMessages[0]?.direction === "outgoing" && currentTurnInfo && !save.flags.includes(dialogueIntroOutgoingFlag(currentTurnInfo.turn.id))) {
      setIntroRevealCount(0);
    } else {
      setIntroRevealCount(1);
    }
  }, [currentScene?.id, currentTurnInfo?.turn.id]);

  useEffect(() => {
    if (pendingDelivery || !currentTurnInfo || !introOpeningSent || introRevealCount >= activeIntroMessages.length) return;
    const timer = window.setTimeout(() => {
      setIntroRevealCount((current) => Math.min(activeIntroMessages.length, current + 1));
    }, dialogueRevealDelay());
    return () => window.clearTimeout(timer);
  }, [pendingDelivery, currentTurnInfo?.turn.id, introOpeningSent, introRevealCount, activeIntroMessages.length]);

  useEffect(() => {
    if (!pendingDelivery) return;
    if (pendingDelivery.visibleCount < pendingDelivery.messages.length) {
      const lastVisibleMessage = pendingDelivery.messages[pendingDelivery.visibleCount - 1];
      const revealDelay = lastVisibleMessage?.deleteAfterMs ? lastVisibleMessage.deleteAfterMs + 260 : dialogueRevealDelay();
      const timer = window.setTimeout(() => {
        setPendingDelivery((current) => current ? { ...current, visibleCount: Math.min(current.messages.length, current.visibleCount + 1) } : current);
      }, revealDelay);
      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(() => {
      setPendingDelivery(null);
      onSaveChange();
    }, 420);
    return () => window.clearTimeout(timer);
  }, [pendingDelivery, onSaveChange]);

  function handleHistoryScroll() {
    const node = historyRef.current;
    if (!node) return;
    const distanceFromBottom = node.scrollHeight - node.scrollTop - node.clientHeight;
    // Em telas pequenas, 96px era pouco: uma bolha alta fazia o NEXO concluir
    // cedo demais que o jogador tinha "saído" do fim da conversa. O limiar
    // acompanha a altura útil do histórico sem ficar grande demais no desktop.
    const followThreshold = Math.max(112, Math.min(190, node.clientHeight * 0.24));
    const nearBottom = distanceFromBottom <= followThreshold;
    nearBottomRef.current = nearBottom;
    setShowJumpToLatest(!nearBottom);
    if (nearBottom) setUnseenMessageCount(0);
  }

  function renderMessage(message: DialogueMessage, key: string, live = false) {
    return <DialogueBubble
      key={key}
      message={message}
      messageKey={key}
      live={live}
      player={save.player}
      onOpenImage={(src, alt) => setExpandedImage({ src, alt })}
      onImageLoad={() => { if (nearBottomRef.current) requestAnimationFrame(() => scrollToLatest("auto")); }}
    />;
  }

  function sendIntroOpening() {
    if (!currentTurnInfo || !manualIntroMessage?.text || !introOutgoingFlag) return;
    const next = updateSave((current) => {
      if (current.flags.includes(introOutgoingFlag)) return current;
      return recordNexoActivity({ ...current, flags: [...current.flags, introOutgoingFlag] }, characterId);
    });
    if (!next) return;
    forceFollowRef.current = true;
    setIntroRevealCount(1);
    onSaveChange();
  }

  function sendChoice() {
    if (!selectedChoice || !currentScene || !currentTurnInfo || pendingDelivery || !introReady) return;
    const choice = selectedChoice;
    const outingDay = choice.exclusiveOutingDay;

    const next = updateSave((current) => {
      if (current.flags.includes(choice.flag)) return current;
      const relationship = current.relationships[currentScene.characterId];
      if (!relationship) return current;

      const updatedRelationship = { ...relationship };
      for (const [key, value] of Object.entries(choice.delta)) {
        const typedKey = key as keyof typeof updatedRelationship;
        updatedRelationship[typedKey] += value ?? 0;
      }

      const sceneDay = getSceneDay(currentScene);
      const isLastTurn = currentTurnInfo.index === currentTurnInfo.turns.length - 1;
      const social = {
        ...current.social,
        routeStage: { ...current.social.routeStage },
      };
      // Escolhas que oferecem encontro concluem o chat, mas nao reservam a noite
      // nem avancam a rota. O jogador decide quando sair pelo CTA persistente.
      if (isLastTurn && !outingDay) social.routeStage[currentScene.characterId] = Math.min(10, sceneDay + 1);

      const flags = [...current.flags, choice.flag];
      if (isLastTurn && !outingDay) flags.push(routeAdvanceFlag(current.player.currentDay, currentScene.characterId));

      if (isLastTurn && currentScene.completionFlag && !flags.includes(currentScene.completionFlag)) flags.push(currentScene.completionFlag);

      return recordNexoActivity({
        ...current,
        relationships: { ...current.relationships, [currentScene.characterId]: updatedRelationship },
        social,
        flags,
      }, currentScene.characterId);
    });

    if (!next) return;

    const deliveryMessages: DialogueMessage[] = [];
    deliveryMessages.push({ direction: "outgoing", text: choice.text });
    if (choice.response) deliveryMessages.push({ direction: "incoming", text: choice.response });
    deliveryMessages.push(...(choice.afterResponse ?? []));

    setDraftChoiceId(null);
    forceFollowRef.current = true;
    if (deliveryMessages.length) {
      setPendingDelivery({ messages: deliveryMessages, visibleCount: 1 });
    } else {
      onSaveChange();
    }
  }

  const pendingOuting = useMemo(() => {
    const scene = [...sortedScenes].reverse().find((candidate) => getSceneDay(candidate) === routeStage);
    if (!scene) return null;
    const turns = getDialogueTurns(scene);
    const finalTurn = turns[turns.length - 1];
    if (!finalTurn) return null;
    const completedChoice = getCompletedChoice(finalTurn, save);
    const stage = completedChoice?.exclusiveOutingDay;
    const sceneId = completedChoice?.vnSceneId;
    if (!completedChoice || !stage || !sceneId) return null;
    if (save.social.outingMilestones[scene.characterId]?.includes(stage)) return null;
    return { characterId: scene.characterId, stage, sceneId };
  }, [sortedScenes, routeStage, save]);

  const pendingOutingState = pendingOuting ? canChooseOuting(save, pendingOuting.characterId, pendingOuting.stage) : null;

  function startPendingOuting() {
    if (!pendingOuting || !pendingOutingState?.allowed) return;
    const next = updateSave((current) => {
      const currentCheck = canChooseOuting(current, pendingOuting.characterId, pendingOuting.stage);
      if (!currentCheck.allowed) return current;
      const dayKey = String(current.player.currentDay);
      const outingFlag = `outing:day${pendingOuting.stage}:${pendingOuting.characterId}`;
      return {
        ...current,
        social: {
          ...current.social,
          outingsByGlobalDay: { ...current.social.outingsByGlobalDay, [dayKey]: pendingOuting.characterId },
        },
        flags: current.flags.includes(outingFlag) ? current.flags : [...current.flags, outingFlag],
      };
    });
    if (!next) return;

    // O Date só pode ser aberto depois de uma ação explícita do jogador neste CTA.
    // A própria navegação recebe a autorização de entrada; a reserva da noite já
    // foi persistida acima em outingsByGlobalDay. Isso evita depender de
    // sessionStorage para atravessar a mudança de rota.
    onSaveChange();
    onOutingSelected?.(pendingOuting.sceneId);
  }

  return <section className="phoneDialoguePanel nexoConversationPane">
    <header className="phoneChatHeader nexoPrivateHeader">
      {onBack && <button className="nexoBackButton" onClick={onBack} aria-label="Voltar às conversas">‹</button>}
      <div className="phoneChatAvatar">
        {portrait ? <img src={portrait} alt="" /> : speaker.slice(0,2).toUpperCase()}
      </div>
      <div className="nexoPrivateIdentity">
        <strong>{speaker}</strong>
        <small>online agora · {postShiftOnly ? `Noite ${save.player.currentDay}` : `Dia ${save.player.currentDay}`}</small>
      </div>
      <div className="nexoRomanceMeter" aria-label={`Progresso romântico ${Math.round(romanceProgress)}%`} title="Progresso da rota. A porcentagem sobe conforme etapas da conversa são concluídas.">
        <span>ROMANCE</span><strong>{Math.round(romanceProgress)}%</strong>
      </div>
      <div className="nexoHeaderActions" aria-label="Ações da conversa"><span>⌕</span><span>⋮</span>{onFinishDay && <button className="nexoEndNightButton" onClick={onFinishDay}>{postShiftOnly ? "PRÓXIMA NOITE" : "ENCERRAR NOITE"}</button>}</div>
    </header>

    <div className="phoneChatHistory nexoChatWallpaper" ref={historyRef} onScroll={handleHistoryScroll}>
      {sortedScenes.map((scene) => {
        const turns = getDialogueTurns(scene);
        const heroWasDispatched = lastDispatch?.selectedHeroIds.includes(scene.characterId) ?? false;
        const contextLine = !postShiftOnly && scene.contextLines
          ? (heroWasDispatched ? scene.contextLines.whenHeroWasDispatched : scene.contextLines.whenHeroWasNotDispatched)
          : null;
        let canRenderTurn = true;

        return <div className="nexoSceneHistory" key={scene.id}>
          <div className="phoneTimestamp">{scene.timeLabel}</div>
          {scene.placeholder && <div className="phoneSystemNote nexoPlaceholderNote">PLACEHOLDER DE QA · este conteúdo será substituído na autoria final.</div>}
          {contextLine && <div className="phoneSystemNote">{formatPlayerText(contextLine, save.player)}</div>}
          {turns.map((turn) => {
            if (!canRenderTurn) return null;
            const completed = getCompletedChoice(turn, save);
            const isActiveIncompleteTurn = !completed && currentScene?.id === scene.id && currentTurnInfo?.turn.id === turn.id;
            const result = <div className="nexoTurnBlock" key={turn.id}>
              {turn.timeLabel && <div className="nexoInlineTime">{turn.timeLabel}</div>}
              {isActiveIncompleteTurn ? <>
                {getTurnIntroMessages(turn).slice(0, introRevealCount).map((message, index) => renderMessage(message, `${turn.id}:intro:${index}`))}
              </> : <>
                {turn.prefaceOutgoing && renderMessage({ direction:"outgoing", text:turn.prefaceOutgoing }, `${turn.id}:preface`)}
                {renderMessage({ direction:"incoming", text:turn.incoming, image:turn.incomingImage, imageAlt:turn.incomingImageAlt }, `${turn.id}:incoming`)}
                {turn.afterIncoming?.map((message, index) => renderMessage(message, `${turn.id}:after-incoming:${index}`))}
              </>}
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

      {pendingDelivery && <div className="nexoPendingDelivery" aria-live="polite">
        {pendingDelivery.messages.slice(0, pendingDelivery.visibleCount).map((message, index) => renderMessage(message, `pending:${index}`, true))}
        {pendingDelivery.visibleCount < pendingDelivery.messages.length && <div className="nexoTypingIndicator"><span></span><span></span><span></span></div>}
      </div>}
    </div>

    {showJumpToLatest && <button className="nexoJumpLatest" style={composerHeight ? { bottom: composerHeight + 12 } : undefined} onClick={() => scrollToLatest("smooth")}>↓ {unseenMessageCount > 0 ? `${unseenMessageCount} nova${unseenMessageCount === 1 ? "" : "s"}` : "mensagens recentes"}</button>}

    <footer ref={composerRef} className="phoneReplyArea nexoComposerArea">
      {pendingDelivery ? <div className="nexoComposerWaiting"><span className="nexoTypingIndicator"><span></span><span></span><span></span></span><small>mensagens chegando...</small></div> : currentScene && currentTurnInfo ? <>
        {needsManualIntroSend && manualIntroMessage?.text ? <div className="nexoManualIntroComposer">
          <small>Sua mensagem</small>
          <div className="nexoComposer">
            <button className="nexoComposerIcon" aria-label="Anexos" disabled>＋</button>
            <div className="nexoDraftField filled">{formatPlayerText(manualIntroMessage.text, save.player)}</div>
            <button className="nexoSendButton" onClick={sendIntroOpening} aria-label="Enviar mensagem">➤</button>
          </div>
        </div> : !introReady ? <div className="nexoComposerWaiting"><span className="nexoTypingIndicator"><span></span><span></span><span></span></span><small>aguarde a resposta...</small></div> : <>
          <div className="nexoReplySuggestions" aria-label="Respostas disponíveis">
            {currentTurnInfo.turn.choices.map((choice) => <button
              key={choice.id}
              className={draftChoiceId === choice.id ? "selected" : ""}
              disabled={Boolean(draftChoiceId && draftChoiceId !== choice.id)}
              onClick={() => setDraftChoiceId((current) => current === choice.id ? null : choice.id)}
            >{formatPlayerText(choice.text, save.player)}</button>)}
          </div>
          <div className={`nexoComposer nexoChoiceComposer ${selectedChoice ? "hasSelection" : "awaitingSelection"}`}>
            <button className="nexoComposerIcon" aria-label="Anexos" disabled>＋</button>
            <div className={selectedChoice ? "nexoDraftField filled" : "nexoDraftField"}>
              {selectedChoice?.text ?? "Escolha uma resposta acima..."}
            </div>
            <button className="nexoSendButton" onClick={sendChoice} disabled={!selectedChoice} aria-label="Enviar mensagem">➤</button>
          </div>
        </>}
      </> : pendingOuting ? <div className="nexoPendingOuting">
        <div>
          <strong>Convite em aberto</strong>
          <small>O chat fica neste estágio até você fazer o encontro. Você pode sair hoje ou deixar para outra noite.</small>
        </div>
        {pendingOutingState && !pendingOutingState.allowed && pendingOutingState.selected && pendingOutingState.selected !== pendingOuting.characterId &&
          <div className="nexoOutingHint">Você já teve um encontro nesta noite. Este convite continuará disponível no próximo dia.</div>}
        <button className={`nexoOutingButton ${highlightOutingTutorial ? "tutorialTarget" : ""}`} onClick={startPendingOuting} disabled={Boolean(pendingOutingState && !pendingOutingState.allowed)}>
          {pendingOutingState?.selected === pendingOuting.characterId ? "CONTINUAR ENCONTRO" : "IR PARA ENCONTRO"}
        </button>
      </div> : <div className="nexoConversationDone"><span>✓✓</span>
        <small>Conversa concluída por enquanto. Novas mensagens aparecem quando houver uma próxima etapa disponível.</small>
      </div>}
    </footer>

    {expandedImage && <div className="nexoImageLightbox" role="dialog" aria-modal="true" aria-label={expandedImage.alt} onClick={() => setExpandedImage(null)}>
      <button className="nexoImageLightboxClose" onClick={() => setExpandedImage(null)} aria-label="Fechar imagem">×</button>
      <img src={publicPath(expandedImage.src)} alt={expandedImage.alt} onClick={(event) => event.stopPropagation()} />
    </div>}
  </section>;
}
