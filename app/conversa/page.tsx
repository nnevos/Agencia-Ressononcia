"use client";

import { PhoneDialogueEngine } from "@/components/PhoneDialogueEngine";
import { postShiftScenes, isSceneAvailable } from "@/content/dialogues/post-shift";
import { getHeroPortrait } from "@/game/data/heroPortraits";
import type { DialogueScene, SaveGame } from "@/game/types";
import { recoverHeroStates } from "@/game/simulation/heroState";
import { createInitialShift } from "@/game/simulation/shift";
import { loadSave, writeSave } from "@/lib/save";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function ConversationPage() {
  const router = useRouter();
  const [save, setSave] = useState<SaveGame | null>(null);
  const [activeScene, setActiveScene] = useState<DialogueScene | null>(null);

  function refresh() {
    const current = loadSave();
    if (!current) { router.replace("/novo-jogo"); return; }
    setSave(current);
  }

  useEffect(() => { refresh(); }, [router]);

  const availableScenes = useMemo(() => save ? postShiftScenes.filter((scene) => isSceneAvailable(scene, save)) : [], [save]);

  function finishDay() {
    const current = loadSave();
    if (!current) return router.replace("/novo-jogo");
    const nextDay = current.player.currentDay + 1;
    writeSave({
      ...current,
      player: { ...current.player, currentDay: nextDay, currentChapter: `dia-${nextDay}`, developmentRequired: false },
      heroStates: recoverHeroStates(current.heroStates, current.heroProgression),
      shift: createInitialShift(nextDay),
      lastDispatch: null,
      flags: current.flags.includes(`dia${current.player.currentDay}_encerrado`) ? current.flags : [...current.flags, `dia${current.player.currentDay}_encerrado`]
    });
    router.push("/agencia");
  }

  if (!save) return <main className="centerPage"><p>Carregando NEXO...</p></main>;

  if (activeScene) {
    return <main className="phoneScene"><div className="phoneSceneShell">
      <div className="phoneSceneBrand"><span>N</span><div><strong>NEXO</strong><small>PÓS-EXPEDIENTE · MENSAGENS PRIVADAS</small></div></div>
      <PhoneDialogueEngine scene={activeScene} save={save} lastDispatch={save.lastDispatch} onComplete={() => { setActiveScene(null); refresh(); }} />
    </div></main>;
  }

  return <main className="phoneScene"><div className="postShiftHub">
    <header className="postShiftHeader"><div><span className="eyebrow">NEXO // PÓS-EXPEDIENTE</span><h1>Com quem você quer falar?</h1><p>Conversas são opcionais. Você pode falar com vários agentes ou encerrar a noite agora.</p></div><button className="button ghost" onClick={finishDay}>ENCERRAR NOITE</button></header>
    <section className="postShiftContacts">
      {availableScenes.length ? availableScenes.map((scene) => {
        const portrait = getHeroPortrait(scene.characterId);
        return <button className="postShiftContact" key={scene.id} onClick={() => setActiveScene(scene)}>
          {portrait ? <img src={portrait} alt="" /> : <span>{scene.speaker.slice(0,2).toUpperCase()}</span>}
          <strong>{scene.speaker}</strong><small>NOVA MENSAGEM</small>
        </button>;
      }) : <div className="postShiftEmpty"><strong>Nenhuma conversa nova.</strong><p>Você pode encerrar a noite e seguir para o próximo dia.</p></div>}
    </section>
  </div></main>;
}
