"use client";

import { introAfterNexo, introductionSequence, introNexoChoices, introNexoReplies, INTRO_HERO_IDS } from "@/content/narrative/introduction";
import { isPostShiftOnlySave, loadSave, writeSave } from "@/lib/save";
import { useRouter } from "next/navigation";
import { publicPath } from "@/lib/publicPath";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

type Phase = "agency" | "nexo" | "replies" | "sdh";

export default function IntroductionPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("agency");
  const [index, setIndex] = useState(0);
  const [playerName, setPlayerName] = useState("Despachante");
  const [sentMessage, setSentMessage] = useState("");
  const [replyRevealCount, setReplyRevealCount] = useState(0);
  const repliesHistoryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const save = loadSave();
    if (!save) return router.replace("/novo-jogo");
    if (isPostShiftOnlySave(save)) return router.replace("/conversa");
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
    setReplyRevealCount(0);
    setPhase("replies");
  }

  useEffect(() => {
    if (phase !== "replies" || replyRevealCount >= introNexoReplies.length) return;
    const delay = replyRevealCount === 0 ? 520 : 760;
    const timer = window.setTimeout(() => {
      setReplyRevealCount((count) => Math.min(introNexoReplies.length, count + 1));
    }, delay);
    return () => window.clearTimeout(timer);
  }, [phase, replyRevealCount]);

  useEffect(() => {
    if (phase !== "replies") return;
    const node = repliesHistoryRef.current;
    if (!node) return;
    const frame = window.requestAnimationFrame(() => node.scrollTo({ top: node.scrollHeight, behavior: "smooth" }));
    return () => window.cancelAnimationFrame(frame);
  }, [phase, replyRevealCount]);

  function continueFromReplies() { setPhase("sdh"); setIndex(0); }
  function nextSdh() {
    if (index < introAfterNexo.length - 1) return setIndex(index + 1);
    markTutorial(true);
    router.push("/agencia");
  }

  const line = phase === "agency" ? introductionSequence[index] : phase === "sdh" ? introAfterNexo[index] : null;
  const backdropClass = phase === "agency" && index === 0 ? "storyBackdrop storyBackdropExterior" : phase === "agency" ? "storyBackdrop storyBackdropOffice" : "storyBackdrop storyBackdropSystem";
  const introStyle = {
    "--story-exterior-image": `url(${publicPath("/agencia-exterior.webp")})`,
    "--story-office-image": `url(${publicPath("/agencia-escritorio.webp")})`,
  } as CSSProperties;

  return <main className="storyIntroPage" style={introStyle}>
    <div className={backdropClass}><div className="storyOfficeGlow" />{phase === "sdh" && <div className="storyOfficeScreen">AGÊNCIA<br/><strong>RESSONÂNCIA</strong></div>}</div>
    <header className="storyTopbar"><span>RESSONÂNCIA · DIA 1</span><button onClick={skipTutorial}>PULAR TUTORIAL</button></header>

    {(phase === "agency" || phase === "sdh") && line && <section className="storyDialogue">
      <div className="storySpeakerRow">
        {line.speaker.toLowerCase() === "edison" && <span className="storySpeakerAvatar" aria-hidden="true"><img src={publicPath("/edison.jpg")} alt="" /></span>}
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
      <div className="introPhoneHistory scroll" ref={repliesHistoryRef}><div className="playerBubble"><small>{playerName}</small>{sentMessage}</div>{introNexoReplies.slice(0, replyRevealCount).map((reply) => <div className="heroBubble nexoBubbleArrive" key={reply.speaker}><strong>{reply.speaker}</strong><span>{reply.text}</span></div>)}{replyRevealCount < introNexoReplies.length ? <div className="nexoTypingIndicator introGroupTyping" aria-label="Alguém está digitando"><span></span><span></span><span></span></div> : <div className="tutorialBubble">O grupo Guerreiros Elementais é usado em operações e pode ser supervisionado pela Agência. DMs privadas no NEXO não são supervisionadas.</div>}</div>
      <footer><button onClick={continueFromReplies} disabled={replyRevealCount < introNexoReplies.length}>{replyRevealCount < introNexoReplies.length ? "AGUARDANDO RESPOSTAS..." : "MINIMIZAR NEXO →"}</button></footer>
    </section>}
  </main>;
}
