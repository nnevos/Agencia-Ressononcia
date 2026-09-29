"use client";

import { PhoneDialogueEngine } from "@/components/PhoneDialogueEngine";
import { postShiftScenes, isSceneAvailable } from "@/content/dialogues/post-shift";
import { getHeroPortrait } from "@/game/data/heroPortraits";
import { getCompletedChoice, getDialogueTurns, getRouteStage, getSceneDay, hasAdvancedRouteToday, isDialogueSceneComplete } from "@/game/social/dialogue";
import type { DialogueScene, SaveGame } from "@/game/types";
import { recoverHeroStates } from "@/game/simulation/heroState";
import { createInitialShift } from "@/game/simulation/shift";
import { loadSave, writeSave } from "@/lib/save";
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

function latestPreview(contact: ConversationContact, save: SaveGame) {
  const scenes = [...contact.scenes].sort((a, b) => getSceneDay(a) - getSceneDay(b));
  const latest = scenes[scenes.length - 1];
  const turns = getDialogueTurns(latest);
  let text = turns[0]?.incoming ?? latest.opening;
  let replied = false;
  for (const turn of turns) {
    const completed = getCompletedChoice(turn, save);
    if (!completed) break;
    text = completed.response;
    replied = true;
  }
  return { text: text.replaceAll("{{playerName}}", save.player.name), replied, time: latest.timeLabel.split(" · ")[0] };
}

export default function ConversationPage() {
  const router = useRouter();
  const [save, setSave] = useState<SaveGame | null>(null);
  const [activeCharacterId, setActiveCharacterId] = useState<string | null>(null);
  const [readCharacterIds, setReadCharacterIds] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState("");

  function refresh() {
    const current = loadSave();
    if (!current) { router.replace("/novo-jogo"); return; }
    setSave(current);
  }

  useEffect(() => { refresh(); }, [router]);

  const visibleScenes = useMemo(() => {
    if (!save) return [];
    // Historico permanece visivel, mas a proxima etapa so entra na thread quando
    // aquela personagem ainda pode avancar nesta noite global.
    return postShiftScenes.filter((scene) => {
      if (sceneHasHistory(scene, save)) return true;
      const stage = getRouteStage(save, scene.characterId);
      const sceneStage = getSceneDay(scene);
      if (sceneStage < stage) return true;
      return sceneStage === stage && !hasAdvancedRouteToday(save, scene.characterId);
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

  const filteredContacts = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("pt-BR");
    if (!normalized) return contacts;
    return contacts.filter((contact) => contact.speaker.toLocaleLowerCase("pt-BR").includes(normalized));
  }, [contacts, query]);

  useEffect(() => {
    if (!activeCharacterId) return;
    setReadCharacterIds((current) => {
      if (current.has(activeCharacterId)) return current;
      const next = new Set(current);
      next.add(activeCharacterId);
      return next;
    });
  }, [activeCharacterId]);

  const activeContact = contacts.find((contact) => contact.characterId === activeCharacterId) ?? null;

  function openContact(contact: ConversationContact) {
    setActiveCharacterId(contact.characterId);
    setReadCharacterIds((current) => {
      const next = new Set(current);
      next.add(contact.characterId);
      return next;
    });
  }

  function finishDay() {
    const current = loadSave();
    if (!current) return router.replace("/novo-jogo");
    const nextDay = current.player.currentDay + 1;
    writeSave({
      ...current,
      player: { ...current.player, currentDay: nextDay, currentChapter: `dia-${nextDay}`, developmentRequired: false },
      heroStates: recoverHeroStates(current.heroStates, current.heroProgression),
      shift: createInitialShift(nextDay, current.player.name),
      lastDispatch: null,
      flags: current.flags.includes(`dia${current.player.currentDay}_encerrado`) ? current.flags : [...current.flags, `dia${current.player.currentDay}_encerrado`]
    });
    router.push("/agencia");
  }

  if (!save) return <main className="centerPage"><p>Carregando NEXO...</p></main>;

  return <main className="phoneScene nexoDesktopScene">
    <div className="nexoMessengerShell">
      <aside className={activeContact ? "nexoConversationList hasActive" : "nexoConversationList"}>
        <header className="nexoSidebarHeader">
          <div className="nexoBrandMark">N</div>
          <div><strong>NEXO</strong></div>
          <button className="nexoMoreButton" aria-label="Mais opções">⋮</button>
        </header>

        <div className="nexoSearchBox">
          <span>⌕</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Pesquisar conversa" aria-label="Pesquisar conversa" />
        </div>

        <div className="nexoListIntro">
          <strong>Conversas</strong>
          <small>{contacts.length} contato{contacts.length === 1 ? "" : "s"}</small>
        </div>

        <div className="nexoContactsScroll">
          {filteredContacts.length ? filteredContacts.map((contact) => {
            const portrait = getHeroPortrait(contact.characterId);
            const preview = latestPreview(contact, save);
            const hasNewScene = contact.scenes.some((scene) => isSceneAvailable(scene, save) && !isDialogueSceneComplete(scene, save));
            const isNew = hasNewScene && !readCharacterIds.has(contact.characterId);
            const active = activeCharacterId === contact.characterId;
            return <button className={`nexoContactRow${active ? " active" : ""}`} key={contact.characterId} onClick={() => openContact(contact)}>
              <div className="nexoContactAvatar">{portrait ? <img src={portrait} alt="" /> : contact.speaker.slice(0,2).toUpperCase()}</div>
              <div className="nexoContactText">
                <div><strong>{contact.speaker}</strong><time>{preview.time}</time></div>
                <p>{preview.replied && <span className="nexoChecks">✓✓ </span>}{preview.text}</p>
              </div>
              {isNew && <span className="nexoUnreadDot" aria-label="Mensagem não lida">1</span>}
            </button>;
          }) : <div className="nexoNoContacts">Nenhuma conversa encontrada.</div>}
        </div>

        <footer className="nexoNightFooter">
          <div><strong>Dia {save.player.currentDay} concluído</strong><small>Conversar é opcional.</small></div>
          <button onClick={finishDay}>ENCERRAR NOITE</button>
        </footer>
      </aside>

      <section className={activeContact ? "nexoConversationStage active" : "nexoConversationStage"}>
        {activeContact ? <PhoneDialogueEngine
          key={activeContact.characterId}
          scenes={activeContact.scenes}
          save={save}
          lastDispatch={save.lastDispatch}
          onBack={() => setActiveCharacterId(null)}
          onSaveChange={refresh}
          onOutingSelected={(sceneId) => router.push(`/encontro/${encodeURIComponent(sceneId)}`)}
          onFinishDay={finishDay}
        /> : <div className="nexoEmptyConversation">
          <div className="nexoEmptyIcon">N</div>
          <h1>NEXO</h1>
          <p>Selecione uma conversa para ler ou responder.</p>
        </div>}
      </section>
    </div>
  </main>;
}
