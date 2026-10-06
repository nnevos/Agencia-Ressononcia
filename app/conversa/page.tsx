"use client";

import { PhoneDialogueEngine } from "@/components/PhoneDialogueEngine";
import { ProgressiveTutorialCoach } from "@/components/ProgressiveTutorialCoach";
import { AgencyManual } from "@/components/AgencyManual";
import { postShiftScenes, isSceneAvailable } from "@/content/dialogues/post-shift";
import { PROGRESSIVE_TUTORIAL_FLAGS, progressiveTutorialCopy } from "@/content/narrative/progressiveTutorial";
import { getHeroPortrait } from "@/game/data/heroPortraits";
import { dialogueIntroOutgoingFlag, getCompletedChoice, getCurrentTurn, getDialogueTurns, getRouteStage, getSceneDay, hasAdvancedRouteToday, isDialogueSceneComplete } from "@/game/social/dialogue";
import type { DialogueScene, SaveGame } from "@/game/types";
import { recoverHeroStates } from "@/game/simulation/heroState";
import { createInitialShift, SHIFT_GAME_MINUTES } from "@/game/simulation/shift";
import { isPostShiftOnlySave, loadSave, writeSave } from "@/lib/save";
import { loadSettings } from "@/lib/settings";
import { formatPlayerText } from "@/lib/playerText";
import { collectCompletedOutings, collectUnlockedNexoPhotos, getNexoActivity, isNexoContactRead, nexoReadFlag } from "@/game/social/nexoLibrary";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type ConversationContact = {
  characterId: string;
  speaker: string;
  scenes: DialogueScene[];
};

function sceneHasHistory(scene: DialogueScene, save: SaveGame) {
  if (scene.completionFlag && save.flags.includes(scene.completionFlag)) return true;
  return getDialogueTurns(scene).some((turn) => turn.choices.some((choice) => save.flags.includes(choice.flag)));
}


function getPendingOutingForContact(contact: ConversationContact, save: SaveGame) {
  const routeStage = getRouteStage(save, contact.characterId);
  const scene = [...contact.scenes].reverse().find((candidate) => getSceneDay(candidate) === routeStage);
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
}

function contactHasNewIncoming(contact: ConversationContact, save: SaveGame) {
  return contact.scenes.some((scene) => {
    if (!isSceneAvailable(scene, save) || isDialogueSceneComplete(scene, save)) return false;
    const currentTurn = getCurrentTurn(scene, save);
    if (!currentTurn) return false;
    if (currentTurn.turn.prefaceOutgoing && !save.flags.includes(dialogueIntroOutgoingFlag(currentTurn.turn.id))) return false;
    return Boolean(currentTurn.turn.incoming || currentTurn.turn.incomingImage);
  });
}

function contactIsCompleteForNow(contact: ConversationContact, save: SaveGame) {
  if (getPendingOutingForContact(contact, save)) return false;
  return !contact.scenes.some((scene) => isSceneAvailable(scene, save) && !isDialogueSceneComplete(scene, save));
}

function previewText(text: string | undefined, hasImage = false) {
  const cleaned = text?.trim();
  return cleaned || (hasImage ? "📷 Foto" : "Conversa disponível");
}

function timeToMinutes(time: string) {
  const match = time.match(/(\d{1,2}):(\d{2})/);
  if (!match) return -1;
  return Number(match[1]) * 60 + Number(match[2]);
}

function latestPreview(contact: ConversationContact, save: SaveGame) {
  const scenes = [...contact.scenes].sort((a, b) => getSceneDay(a) - getSceneDay(b));
  const latest = scenes[scenes.length - 1];
  const turns = getDialogueTurns(latest);
  const currentTurn = getCurrentTurn(latest, save);
  const awaitingPlayerStart = Boolean(currentTurn?.turn.prefaceOutgoing && !save.flags.includes(dialogueIntroOutgoingFlag(currentTurn.turn.id)));

  let text = previewText(latest.opening);
  let direction: "incoming" | "outgoing" = "incoming";
  let time = latest.timeLabel.split(" · ")[0];

  for (const turn of turns) {
    const completed = getCompletedChoice(turn, save);
    if (!completed) break;

    const trailing = [...(completed.afterResponse ?? [])].reverse().find((message) => message.text || message.image);
    if (trailing) {
      text = previewText(trailing.text, Boolean(trailing.image));
      direction = trailing.direction;
    } else if (completed.response) {
      text = completed.response;
      direction = "incoming";
    } else {
      text = completed.text;
      direction = "outgoing";
    }
    if (turn.timeLabel) time = turn.timeLabel.split(" · ")[0];
  }

  // Se existe um novo turno recebido, o preview deve mostrar essa mensagem,
  // não a resposta antiga do turno anterior. Turnos iniciados pelo Analista
  // continuam exibindo o CTA neutro até o envio manual.
  if (currentTurn) {
    if (awaitingPlayerStart) {
      text = "Toque para iniciar a conversa";
      direction = "outgoing";
    } else if (currentTurn.turn.incoming || currentTurn.turn.incomingImage) {
      text = previewText(currentTurn.turn.incoming, Boolean(currentTurn.turn.incomingImage));
      direction = "incoming";
    }
    if (currentTurn.turn.timeLabel) time = currentTurn.turn.timeLabel.split(" · ")[0];
  }

  const runtimeActivity = getNexoActivity(save, contact.characterId);
  let authoredActivityMinutes = -1;
  for (const scene of scenes) {
    const sceneTurns = getDialogueTurns(scene);
    for (const turn of sceneTurns) {
      const completed = getCompletedChoice(turn, save);
      const turnTime = timeToMinutes((turn.timeLabel ?? scene.timeLabel).split(" · ")[0]);
      if (completed) {
        authoredActivityMinutes = turnTime;
        continue;
      }
      const isCurrent = scene.id === latest.id && currentTurn?.turn.id === turn.id;
      const waitingForPlayer = Boolean(turn.prefaceOutgoing && !save.flags.includes(dialogueIntroOutgoingFlag(turn.id)));
      if (isCurrent && !waitingForPlayer && (turn.incoming || turn.incomingImage)) authoredActivityMinutes = turnTime;
      break;
    }
  }

  return {
    text: formatPlayerText(text, save.player),
    direction,
    awaitingPlayerStart,
    time,
    activityDay: runtimeActivity?.day ?? (authoredActivityMinutes >= 0 ? save.player.currentDay : -1),
    activityAt: runtimeActivity?.at ?? -1,
    authoredActivityMinutes,
  };
}

export default function ConversationPage() {
  const router = useRouter();
  const [save, setSave] = useState<SaveGame | null>(null);
  const [activeCharacterId, setActiveCharacterId] = useState<string | null>(null);
  const [readCharacterIds, setReadCharacterIds] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState("");
  const [confirmNextDay, setConfirmNextDay] = useState(false);
  const [libraryView, setLibraryView] = useState<"chats" | "photos" | "dates">("chats");
  const [expandedLibraryImage, setExpandedLibraryImage] = useState<{ src: string; alt: string } | null>(null);
  const [dateTransitionSceneId, setDateTransitionSceneId] = useState<string | null>(null);

  function refresh() {
    const current = loadSave();
    if (!current) { router.replace("/novo-jogo"); return; }
    setSave(current);
  }

  useEffect(() => { refresh(); }, [router]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (expandedLibraryImage) setExpandedLibraryImage(null);
      else if (confirmNextDay) setConfirmNextDay(false);
      else if (activeCharacterId) setActiveCharacterId(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [expandedLibraryImage, confirmNextDay, activeCharacterId]);

  const visibleScenes = useMemo(() => {
    if (!save) return [];
    // Historico permanece visivel, mas a proxima etapa so entra na thread quando
    // aquela personagem ainda pode avancar nesta noite global.
    return postShiftScenes.filter((scene) => {
      if (sceneHasHistory(scene, save)) return true;
      const stage = getRouteStage(save, scene.characterId);
      const sceneStage = getSceneDay(scene);
      if (sceneStage < stage) return true;
      return sceneStage === stage && !hasAdvancedRouteToday(save, scene.characterId) && isSceneAvailable(scene, save);
    });
  }, [save]);

  const contacts = useMemo<ConversationContact[]>(() => {
    const grouped = new Map<string, ConversationContact>();
    for (const scene of visibleScenes) {
      const current = grouped.get(scene.characterId);
      if (current) current.scenes.push(scene);
      else grouped.set(scene.characterId, { characterId: scene.characterId, speaker: scene.speaker, scenes: [scene] });
    }
    return [...grouped.values()].map((contact) => ({
      ...contact,
      scenes: [...contact.scenes].sort((a, b) => getSceneDay(a) - getSceneDay(b)),
    }));
  }, [visibleScenes]);

  const orderedContacts = useMemo(() => {
    if (!save) return contacts;
    return [...contacts].sort((a, b) => {
      const previewA = latestPreview(a, save);
      const previewB = latestPreview(b, save);
      if (previewB.activityDay !== previewA.activityDay) return previewB.activityDay - previewA.activityDay;
      const aHasRuntimeActivity = previewA.activityAt >= 0;
      const bHasRuntimeActivity = previewB.activityAt >= 0;
      if (aHasRuntimeActivity !== bHasRuntimeActivity) return bHasRuntimeActivity ? 1 : -1;
      if (aHasRuntimeActivity && previewB.activityAt !== previewA.activityAt) return previewB.activityAt - previewA.activityAt;
      if (previewB.authoredActivityMinutes !== previewA.authoredActivityMinutes) return previewB.authoredActivityMinutes - previewA.authoredActivityMinutes;
      return a.speaker.localeCompare(b.speaker, "pt-BR");
    });
  }, [contacts, save]);

  const filteredContacts = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("pt-BR");
    if (!normalized) return orderedContacts;
    return orderedContacts.filter((contact) => contact.speaker.toLocaleLowerCase("pt-BR").includes(normalized));
  }, [orderedContacts, query]);


  const activeContact = contacts.find((contact) => contact.characterId === activeCharacterId) ?? null;

  function openContact(contact: ConversationContact) {
    if (!save) return;
    setLibraryView("chats");
    setActiveCharacterId(contact.characterId);
    setReadCharacterIds((current) => {
      const next = new Set(current);
      next.add(contact.characterId);
      return next;
    });
    const flag = nexoReadFlag(save, contact.characterId);
    const flagsToAdd = [flag];
    if (!save.flags.includes(PROGRESSIVE_TUTORIAL_FLAGS.postShiftNexo)) flagsToAdd.push(PROGRESSIVE_TUTORIAL_FLAGS.postShiftNexo);
    const nextFlags = Array.from(new Set([...save.flags, ...flagsToAdd]));
    if (nextFlags.length !== save.flags.length) {
      const next = { ...save, flags: nextFlags };
      writeSave(next);
      setSave(next);
    }
  }


  useEffect(() => {
    if (!save || !activeCharacterId) return;
    const flag = nexoReadFlag(save, activeCharacterId);
    if (save.flags.includes(flag)) return;
    const next = { ...save, flags: [...save.flags, flag] };
    writeSave(next);
    setSave(next);
  }, [save, activeCharacterId]);

  useEffect(() => {
    if (!save || activeCharacterId || libraryView !== "chats" || contacts.length === 0) return;
    const qaContact = sessionStorage.getItem("ressonancia:qa-open-contact");
    if (!qaContact) return;
    const contact = contacts.find((item) => item.characterId === qaContact);
    sessionStorage.removeItem("ressonancia:qa-open-contact");
    if (contact) openContact(contact);
  }, [save, contacts, activeCharacterId, libraryView]);

  const nightStatus = useMemo(() => {
    if (!save) return { unread: 0, pendingOutings: 0 };
    let unread = 0;
    let pendingOutings = 0;
    for (const contact of contacts) {
      if (contactHasNewIncoming(contact, save) && !readCharacterIds.has(contact.characterId) && !isNexoContactRead(save, contact.characterId)) unread += 1;
      if (getPendingOutingForContact(contact, save)) pendingOutings += 1;
    }
    return { unread, pendingOutings };
  }, [contacts, readCharacterIds, save]);

  const unlockedPhotos = useMemo(() => save ? collectUnlockedNexoPhotos(save) : [], [save]);
  const completedOutings = useMemo(() => save ? collectCompletedOutings(save) : [], [save]);

  useEffect(() => {
    const previous = document.title;
    document.title = nightStatus.unread ? `(${nightStatus.unread}) NEXO · Ressonância` : "NEXO · Ressonância";
    return () => { document.title = previous; };
  }, [nightStatus.unread]);

  function finishDay() {
    const current = loadSave();
    if (!current) return router.replace("/novo-jogo");
    const nextDay = current.player.currentDay + 1;
    const postShiftOnly = isPostShiftOnlySave(current);
    const nextShift = createInitialShift(nextDay, current.player.name);
    const nextSave: SaveGame = {
      ...current,
      player: { ...current.player, currentDay: nextDay, currentChapter: `dia-${nextDay}`, developmentRequired: false },
      heroStates: recoverHeroStates(current.heroStates, current.heroProgression),
      shift: postShiftOnly ? { ...nextShift, elapsedGameMinutes: SHIFT_GAME_MINUTES, status: "finished" } : nextShift,
      lastDispatch: null,
      flags: current.flags.includes(`dia${current.player.currentDay}_encerrado`) ? current.flags : [...current.flags, `dia${current.player.currentDay}_encerrado`]
    };
    writeSave(nextSave);
    setConfirmNextDay(false);

    if (postShiftOnly) {
      // /conversa -> /conversa nao remonta a pagina no App Router.
      // Atualizar o estado local e fechar a thread garante que a nova noite apareca imediatamente.
      setActiveCharacterId(null);
      setReadCharacterIds(new Set());
      setSave(nextSave);
      return;
    }

    router.push("/agencia");
  }

  function requestFinishDay() {
    if (postShiftOnly) {
      setConfirmNextDay(true);
      return;
    }
    finishDay();
  }

  if (!save) return <main className="centerPage"><p>Carregando NEXO...</p></main>;

  const postShiftOnly = isPostShiftOnlySave(save);
  const progressiveTutorialKey = !save.flags.includes(PROGRESSIVE_TUTORIAL_FLAGS.postShiftNexo) ? "postShiftNexo"
    : nightStatus.pendingOutings > 0 && !save.flags.includes(PROGRESSIVE_TUTORIAL_FLAGS.date) ? "date"
    : null;

  function dismissProgressiveTutorial() {
    if (!progressiveTutorialKey) return;
    const flag = PROGRESSIVE_TUTORIAL_FLAGS[progressiveTutorialKey];
    const next = { ...save, flags: Array.from(new Set([...save.flags, flag])) };
    writeSave(next);
    setSave(next);
  }

  return <main className="phoneScene nexoDesktopScene">
    {progressiveTutorialKey && <ProgressiveTutorialCoach className="nexoTutorial" {...progressiveTutorialCopy[progressiveTutorialKey]} onDismiss={undefined} />}
    <AgencyManual save={save} className="agencyManualNexo" />
    <div className="nexoMessengerShell">
      <aside className={(activeContact || libraryView !== "chats") ? "nexoConversationList hasActive" : "nexoConversationList"}>
        <header className="nexoSidebarHeader">
          <div className="nexoBrandMark">N</div>
          <div><strong>NEXO</strong></div>
          <button className="nexoMoreButton nexoSaveExitButton" aria-label="Salvar e sair" title="Salvar e sair" onClick={() => { writeSave(save); router.push("/"); }}>↩</button>
        </header>

        <div className="nexoSearchBox">
          <span>⌕</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Pesquisar conversa" aria-label="Pesquisar conversa" />
        </div>

        <div className="nexoListIntro">
          <div><strong>NEXO</strong><span className="nexoNightChip">{postShiftOnly ? `NOITE ${save.player.currentDay}` : `DIA ${save.player.currentDay}`}</span></div>
          <small>{nightStatus.unread ? `${nightStatus.unread} nova${nightStatus.unread === 1 ? "" : "s"}` : `${contacts.length} contato${contacts.length === 1 ? "" : "s"}`}</small>
        </div>

        <nav className="nexoLibraryTabs" aria-label="Áreas do NEXO">
          <button className={libraryView === "chats" ? "active" : ""} onClick={() => { setLibraryView("chats"); setActiveCharacterId(null); }}>Conversas{nightStatus.unread ? <span>{nightStatus.unread}</span> : null}</button>
          <button className={libraryView === "photos" ? "active" : ""} onClick={() => { setLibraryView("photos"); setActiveCharacterId(null); }}>Fotos<span>{unlockedPhotos.length}</span></button>
          <button className={libraryView === "dates" ? "active" : ""} onClick={() => { setLibraryView("dates"); setActiveCharacterId(null); }}>Dates<span>{completedOutings.length}</span></button>
        </nav>

        <div className={`nexoContactsScroll ${progressiveTutorialKey === "postShiftNexo" || progressiveTutorialKey === "date" ? "tutorialTarget" : ""}`}>
          {filteredContacts.length ? filteredContacts.map((contact) => {
            const portrait = getHeroPortrait(contact.characterId);
            const preview = latestPreview(contact, save);
            const hasNewIncoming = contactHasNewIncoming(contact, save);
            const isNew = hasNewIncoming && !readCharacterIds.has(contact.characterId) && !isNexoContactRead(save, contact.characterId);
            const pendingOuting = getPendingOutingForContact(contact, save);
            const completeForNow = contactIsCompleteForNow(contact, save);
            const active = activeCharacterId === contact.characterId;
            const rowState = pendingOuting ? " outingPending" : completeForNow ? " complete" : isNew ? " unread" : "";
            return <button className={`nexoContactRow${active ? " active" : ""}${rowState}${progressiveTutorialKey === "date" && pendingOuting ? " tutorialTarget" : ""}`} key={contact.characterId} onClick={() => openContact(contact)}>
              <div className="nexoContactAvatar">{portrait ? <img src={portrait} alt="" /> : contact.speaker.slice(0,2).toUpperCase()}</div>
              <div className="nexoContactText">
                <div><strong>{contact.speaker}</strong><time>{preview.time}</time></div>
                <p className={preview.awaitingPlayerStart ? "awaitingPlayer" : undefined}>{preview.direction === "outgoing" && !preview.awaitingPlayerStart ? <span className="nexoPreviewYou">Você: </span> : null}{preview.text}</p>
                <div className="nexoContactMeta"><span>{pendingOuting ? "Convite pendente" : completeForNow ? "Conversa concluída" : isNew ? "Mensagem nova" : "Conversa disponível"}</span><span>{(save.social.outingMilestones[contact.characterId] ?? []).includes(3) ? "DATE 1 ✓" : ""}{(save.social.outingMilestones[contact.characterId] ?? []).includes(6) ? " · DATE 2 ✓" : ""}</span></div>
              </div>
              <div className="nexoContactState">
                {pendingOuting ? <span className="nexoOutingBadge" aria-label="Convite pendente">DATE</span>
                  : isNew ? <span className="nexoUnreadDot" aria-label="Mensagem não lida" />
                  : completeForNow ? <span className="nexoCompleteMark" aria-label="Conversa concluída">✓</span>
                  : null}
              </div>
            </button>;
          }) : <div className="nexoNoContacts">Nenhuma conversa encontrada.</div>}
        </div>

        <footer className="nexoNightFooter">
          <div><strong>{postShiftOnly ? `Noite ${save.player.currentDay}` : `Dia ${save.player.currentDay} concluído`}</strong><small>{nightStatus.pendingOutings ? `${nightStatus.pendingOutings} convite${nightStatus.pendingOutings === 1 ? "" : "s"} pendente${nightStatus.pendingOutings === 1 ? "" : "s"}` : nightStatus.unread ? `${nightStatus.unread} conversa${nightStatus.unread === 1 ? "" : "s"} não lida${nightStatus.unread === 1 ? "" : "s"}` : "Conversar é opcional."}</small></div>
          <button onClick={requestFinishDay}>{postShiftOnly ? "PRÓXIMA NOITE" : "ENCERRAR NOITE"}</button>
        </footer>
      </aside>

      <section className={(activeContact || libraryView !== "chats") ? "nexoConversationStage active" : "nexoConversationStage"}>
        {libraryView === "photos" ? <div className="nexoLibraryPanel">
          <div className="nexoMobileLibraryBar"><button type="button" onClick={() => setLibraryView("chats")} aria-label="Voltar às conversas">‹ <span>Conversas</span></button><strong>Fotos</strong></div>
          <header><span className="eyebrow">MEMÓRIAS DO NEXO</span><h1>Fotos recebidas</h1><p>Apenas imagens que já apareceram em conversas concluídas até o ponto em que foram entregues.</p></header>
          {unlockedPhotos.length ? <div className="nexoPhotoGallery">{unlockedPhotos.map((photo) => <button key={photo.src} onClick={() => setExpandedLibraryImage({ src: photo.src, alt: photo.alt })}><img src={photo.src} alt={photo.alt} /><span>{photo.speaker}</span></button>)}</div> : <div className="nexoLibraryEmpty">Nenhuma foto desbloqueada ainda.</div>}
        </div> : libraryView === "dates" ? <div className="nexoLibraryPanel">
          <div className="nexoMobileLibraryBar"><button type="button" onClick={() => setLibraryView("chats")} aria-label="Voltar às conversas">‹ <span>Conversas</span></button><strong>Dates</strong></div>
          <header><span className="eyebrow">MEMÓRIAS DO NEXO</span><h1>Dates concluídos</h1><p>Releia encontros já concluídos. O replay não altera rota, flags ou progresso.</p></header>
          {completedOutings.length ? <div className="nexoDateArchive">{completedOutings.map((outing) => <article key={outing.id}><div><span>{outing.day === 3 ? "DATE 1" : "DATE 2"}</span><strong>{outing.speaker}</strong><small>{outing.title}</small></div><button onClick={() => router.push(`/encontro/${encodeURIComponent(outing.id)}?replay=1`)}>REVER</button></article>)}</div> : <div className="nexoLibraryEmpty">Nenhum Date concluído ainda.</div>}
        </div> : activeContact ? <PhoneDialogueEngine
          key={activeContact.characterId}
          scenes={activeContact.scenes}
          save={save}
          lastDispatch={save.lastDispatch}
          onBack={() => setActiveCharacterId(null)}
          onSaveChange={refresh}
          highlightOutingTutorial={progressiveTutorialKey === "date"}
          onOutingSelected={(sceneId) => {
            const current = loadSave();
            if (current && !current.flags.includes(PROGRESSIVE_TUTORIAL_FLAGS.date)) {
              const next = { ...current, flags: [...current.flags, PROGRESSIVE_TUTORIAL_FLAGS.date] };
              writeSave(next); setSave(next);
            }
            setDateTransitionSceneId(sceneId);
            window.setTimeout(() => router.push(`/encontro/${encodeURIComponent(sceneId)}?launch=1`), loadSettings().reducedMotion ? 0 : 220);
          }}
          onFinishDay={requestFinishDay}
        /> : <div className="nexoEmptyConversation">
          <div className="nexoEmptyIcon">N</div>
          <h1>NEXO</h1>
          <p>Selecione uma conversa para ler ou responder.</p>
        </div>}
      </section>
    </div>

    {dateTransitionSceneId && <div className="nexoDateTransition" role="status" aria-live="polite"><div><span className="eyebrow">NEXO</span><strong>Iniciando encontro...</strong></div></div>}

    {expandedLibraryImage && <div className="nexoImageLightbox" role="dialog" aria-modal="true" aria-label={expandedLibraryImage.alt} onClick={() => setExpandedLibraryImage(null)}>
      <button className="nexoImageLightboxClose" onClick={() => setExpandedLibraryImage(null)} aria-label="Fechar imagem">×</button>
      <img src={expandedLibraryImage.src} alt={expandedLibraryImage.alt} onClick={(event) => event.stopPropagation()} />
    </div>}

    {confirmNextDay && <div className="nexoNextDayBackdrop" role="presentation" onMouseDown={() => setConfirmNextDay(false)}>
      <section className="nexoNextDayConfirm" role="dialog" aria-modal="true" aria-labelledby="nexo-next-day-title" onMouseDown={(event) => event.stopPropagation()}>
        <h2 id="nexo-next-day-title">Deseja ir para o próximo dia?</h2>
        <p>{nightStatus.pendingOutings || nightStatus.unread
          ? <>Ainda há {nightStatus.unread ? `${nightStatus.unread} conversa${nightStatus.unread === 1 ? "" : "s"} não lida${nightStatus.unread === 1 ? "" : "s"}` : ""}{nightStatus.unread && nightStatus.pendingOutings ? " e " : ""}{nightStatus.pendingOutings ? `${nightStatus.pendingOutings} convite${nightStatus.pendingOutings === 1 ? "" : "s"} pendente${nightStatus.pendingOutings === 1 ? "" : "s"}` : ""}. Se avançar, o NEXO seguirá para a próxima noite; convites persistentes continuarão disponíveis.</>
          : <>As conversas disponíveis desta noite foram verificadas. O NEXO avançará para a próxima noite.</>}</p>
        <div className="nexoNextDayActions">
          <button type="button" className="button primary" autoFocus onClick={finishDay}>Ir para próximo dia</button>
          <button type="button" className="button" onClick={() => setConfirmNextDay(false)}>Voltar</button>
        </div>
      </section>
    </div>}
  </main>;
}
