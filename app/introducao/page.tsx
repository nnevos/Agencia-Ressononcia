"use client";

import { introAfterNexo, introductionSequence, introNexoChoices, introNexoReplies, INTRO_HERO_IDS } from "@/content/narrative/introduction";
import { loadSave, writeSave } from "@/lib/save";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Phase = "agency" | "nexo" | "replies" | "sdh";

export default function IntroductionPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("agency");
  const [index, setIndex] = useState(0);
  const [playerName, setPlayerName] = useState("Despachante");
  const [sentMessage, setSentMessage] = useState("");

  useEffect(() => {
    const save = loadSave();
    if (!save) return router.replace("/novo-jogo");
    setPlayerName(save.player.name);
  }, [router]);

  function markTutorial(active: boolean) {
    const save = loadSave();
    if (!save) return;
    const remove = new Set(["onboarding_pending", "tutorial_active", "tutorial_skipped", "intro_complete"]);
    const flags = save.flags.filter((flag) => !remove.has(flag));
    flags.push("intro_complete", active ? "tutorial_active" : "tutorial_skipped");
    writeSave({ ...save, flags });
  }

  function skipTutorial() {
    markTutorial(false);
    router.push("/agencia");
  }

  function nextAgency() {
    if (index < introductionSequence.length - 1) return setIndex(index + 1);
    setPhase("nexo"); setIndex(0);
  }

  function chooseNexo(choice: typeof introNexoChoices[number]) {
    const save = loadSave();
    if (save) {
      const relationships = { ...save.relationships };
      for (const id of INTRO_HERO_IDS) {
        const current = relationships[id];
        relationships[id] = {
          ...current,
          trust: current.trust + (choice.delta.trust ?? 0),
          respect: current.respect + (choice.delta.respect ?? 0),
          intimacy: current.intimacy + (choice.delta.intimacy ?? 0),
          tension: current.tension + (choice.delta.tension ?? 0),
          attraction: current.attraction + (choice.delta.attraction ?? 0),
        };
      }
      writeSave({ ...save, relationships, flags: [...save.flags.filter((f) => !f.startsWith("intro_nexo_")), `intro_nexo_${choice.tone}`] });
    }
    setSentMessage(choice.text);
    setPhase("replies");
  }

  function continueFromReplies() { setPhase("sdh"); setIndex(0); }
  function nextSdh() {
    if (index < introAfterNexo.length - 1) return setIndex(index + 1);
    markTutorial(true);
    router.push("/agencia");
  }

  const line = phase === "agency" ? introductionSequence[index] : phase === "sdh" ? introAfterNexo[index] : null;
  const backdropClass = phase === "agency" && index === 0 ? "storyBackdrop storyBackdropExterior" : phase === "agency" ? "storyBackdrop storyBackdropOffice" : "storyBackdrop storyBackdropSystem";

  return <main className="storyIntroPage">
    <div className={backdropClass}><div className="storyOfficeGlow" />{phase === "sdh" && <div className="storyOfficeScreen">AGÊNCIA<br/><strong>RESSONÂNCIA</strong></div>}</div>
    <header className="storyTopbar"><span>RESSONÂNCIA · DIA 1</span><button onClick={skipTutorial}>PULAR TUTORIAL</button></header>

    {(phase === "agency" || phase === "sdh") && line && <section className="storyDialogue">
      <div className="storySpeakerRow">
        {line.speaker.toLowerCase() === "edison" && <span className="storySpeakerAvatar" aria-hidden="true" />}
        <div className="storySpeaker">{line.speaker}</div>
      </div>
      <p>{line.text}</p>
      <div className="storyActions"><small>{phase === "agency" ? `${index + 1}/${introductionSequence.length}` : `SDH · ${index + 1}/${introAfterNexo.length}`}</small><button onClick={phase === "agency" ? nextAgency : nextSdh}>{phase === "sdh" && index === introAfterNexo.length - 1 ? "IR PARA A CENTRAL" : "CONTINUAR →"}</button></div>
    </section>}

    {phase === "nexo" && <section className="introPhone">
      <header><div><small>NEXO</small><strong>Guerreiros Elementais</strong></div><span>7 membros</span></header>
      <div className="introPhoneHistory"><div className="systemBubble">Você foi adicionado ao grupo <strong>Guerreiros Elementais</strong>.</div><div className="tutorialBubble"><strong>NEXO</strong><br/>Este grupo é um canal corporativo da Agência e pode ser acompanhado durante as operações. Suas mensagens podem afetar como a equipe percebe você.</div></div>
      <div className="introChoices"><small>ESCOLHA SUA PRIMEIRA MENSAGEM</small>{introNexoChoices.map((choice) => <button key={choice.id} onClick={() => chooseNexo(choice)}>{choice.text}</button>)}</div>
    </section>}

    {phase === "replies" && <section className="introPhone">
      <header><div><small>NEXO</small><strong>Guerreiros Elementais</strong></div><span>online</span></header>
      <div className="introPhoneHistory scroll"><div className="playerBubble"><small>{playerName}</small>{sentMessage}</div>{introNexoReplies.map((reply) => <div className="heroBubble" key={reply.speaker}><strong>{reply.speaker}</strong><span>{reply.text}</span></div>)}<div className="tutorialBubble">O grupo Guerreiros Elementais é usado em operações e pode ser supervisionado pela Agência. DMs privadas no NEXO não são supervisionadas.</div></div>
      <footer><button onClick={continueFromReplies}>MINIMIZAR NEXO →</button></footer>
    </section>}
  </main>;
}
