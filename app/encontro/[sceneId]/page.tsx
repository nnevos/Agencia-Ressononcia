"use client";

import { getOutingScene } from "@/content/narrative/outings";
import { getHeroPortrait } from "@/game/data/heroPortraits";
import { routeAdvanceFlag } from "@/game/social/dialogue";
import type { OutingScene, SaveGame } from "@/game/types";
import { loadSave, updateSave } from "@/lib/save";
import { formatPlayerText } from "@/lib/playerText";
import { publicPath } from "@/lib/publicPath";
import { loadSettings } from "@/lib/settings";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

type StoryPage = {
  beatIndex: number;
  paragraphs: string[];
  backgroundImage?: string;
  backgroundPositionDesktop?: string;
  backgroundPositionMobile?: string;
  continueLabel?: string;
};

function paginateParagraphs(paragraphs: string[], maxCharacters = 920, maxParagraphs = 4) {
  const pages: string[][] = [];
  let current: string[] = [];
  let characters = 0;
  for (const paragraph of paragraphs) {
    const nextLength = characters + paragraph.length;
    if (current.length > 0 && (current.length >= maxParagraphs || nextLength > maxCharacters)) {
      pages.push(current); current = []; characters = 0;
    }
    current.push(paragraph); characters += paragraph.length;
  }
  if (current.length) pages.push(current);
  return pages.length ? pages : [[]];
}

function buildStoryPages(scene: OutingScene): StoryPage[] {
  const beats = scene.beats?.length ? scene.beats : [{
    backgroundImage: scene.backgroundImage,
    backgroundPositionDesktop: scene.backgroundPositionDesktop,
    backgroundPositionMobile: scene.backgroundPositionMobile,
    paragraphs: scene.paragraphs,
    continueLabel: undefined,
  }];
  return beats.flatMap((beat, beatIndex) => paginateParagraphs(beat.paragraphs).map((paragraphs, pageInBeat, all) => ({
    beatIndex,
    paragraphs,
    backgroundImage: beat.backgroundImage ?? scene.backgroundImage,
    backgroundPositionDesktop: beat.backgroundPositionDesktop ?? scene.backgroundPositionDesktop,
    backgroundPositionMobile: beat.backgroundPositionMobile ?? beat.backgroundPositionDesktop ?? scene.backgroundPositionMobile ?? scene.backgroundPositionDesktop,
    continueLabel: pageInBeat === all.length - 1 ? beat.continueLabel : undefined,
  })));
}

function dateLabel(scene: OutingScene) { return scene.day === 3 ? "DATE 1" : "DATE 2"; }

export default function OutingPage() {
  const router = useRouter();
  const params = useParams<{ sceneId: string }>();
  const sceneId = typeof params?.sceneId === "string" ? decodeURIComponent(params.sceneId) : null;
  const [previewKind, setPreviewKind] = useState<"normal" | "replay" | "qa">("normal");
  const replayMode = previewKind === "replay";
  const qaMode = previewKind === "qa";
  const previewMode = previewKind !== "normal";
  const scene = useMemo(() => getOutingScene(sceneId), [sceneId]);
  const pages = useMemo(() => scene ? buildStoryPages(scene) : [], [scene]);
  const [save, setSave] = useState<SaveGame | null>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [launchGate, setLaunchGate] = useState<"checking" | "allowed" | "denied">("checking");
  const textBoxRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const kind = params.get("qa") === "1" ? "qa" : params.get("replay") === "1" ? "replay" : "normal";
    const isPreview = kind !== "normal";
    setPreviewKind(kind);
    setReducedMotion(loadSettings().reducedMotion);

    const current = loadSave();
    if (!current) { router.replace("/novo-jogo"); return; }
    setSave(current);

    if (!scene) { setLaunchGate("allowed"); return; }
    if (isPreview) { setLaunchGate("allowed"); return; }

    const completed = current.social.outingMilestones[scene.characterId]?.includes(scene.day) ?? false;
    if (completed) { setLaunchGate("allowed"); return; }

    // Segurança de fluxo: uma cena presencial normal só abre depois do clique
    // explícito em IR PARA ENCONTRO no NEXO. O CTA navega com ?launch=1; assim
    // o gate não depende de sessionStorage e continua válido em reload da cena.
    // A reserva persistida da noite é validada abaixo antes de renderizar o Date.
    if (params.get("launch") !== "1") {
      setLaunchGate("denied");
      router.replace("/conversa");
      return;
    }
    setLaunchGate("allowed");

    const progressKey = `ressonancia:outing-progress:${scene.id}:day:${current.player.currentDay}`;
    const stored = Number.parseInt(sessionStorage.getItem(progressKey) ?? "0", 10);
    if (Number.isFinite(stored) && stored >= 0 && stored < pages.length) {
      setPageIndex(stored);
      if (stored > 0) setStarted(true);
    }
  }, [router, scene, pages.length]);

  useEffect(() => {
    if (!save || !scene || pages.length === 0 || previewMode || !started) return;
    sessionStorage.setItem(`ressonancia:outing-progress:${scene.id}:day:${save.player.currentDay}`, String(pageIndex));
  }, [pageIndex, pages.length, save, scene, previewMode, started]);

  useEffect(() => { textBoxRef.current?.scrollTo({ top: 0, behavior: "smooth" }); }, [pageIndex]);

  useEffect(() => {
    function keydown(event: KeyboardEvent) {
      if (!started || leaving) return;
      if (event.key === "ArrowRight" || event.key === "Enter") {
        const target = event.target as HTMLElement | null;
        if (target?.tagName === "BUTTON") return;
        event.preventDefault();
        if (pageIndex < pages.length - 1) setPageIndex((value) => value + 1);
      }
      if (event.key === "ArrowLeft" && pageIndex > 0) { event.preventDefault(); setPageIndex((value) => value - 1); }
      if (event.key === "Escape" && previewMode) router.push("/conversa");
    }
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, [started, leaving, pageIndex, pages.length, previewMode, router]);

  if (!save || launchGate === "checking") return <main className="centerPage"><p>Carregando cena...</p></main>;
  if (launchGate === "denied") return <main className="centerPage"><p>Voltando ao NEXO...</p></main>;
  if (!scene) return <main className="centerPage"><div className="heroPanel"><h1>Cena indisponível</h1><p>O encontro selecionado não existe no pacote de conteúdo.</p><button className="button primary" onClick={() => router.replace("/conversa")}>Voltar ao NEXO</button></div></main>;

  const completed = save.social.outingMilestones[scene.characterId]?.includes(scene.day) ?? false;
  if (completed && !previewMode) return <main className="centerPage"><div className="heroPanel"><span className="eyebrow">{dateLabel(scene)} · CONCLUÍDO</span><h1>{formatPlayerText(scene.title, save.player)}</h1><p>Este encontro já foi concluído. Use Memórias → Dates no NEXO para reler a cena sem alterar o progresso.</p><button className="button primary" onClick={() => router.replace("/conversa")}>Voltar ao NEXO</button></div></main>;

  const selected = save.social.outingsByGlobalDay[String(save.player.currentDay)];
  if (!previewMode && selected !== scene.characterId) return <main className="centerPage"><div className="heroPanel"><h1>Encontro não selecionado</h1><p>Esta cena só abre para o personagem escolhido nesta noite.</p><button className="button primary" onClick={() => router.replace("/conversa")}>Voltar ao NEXO</button></div></main>;

  const safePageIndex = Math.min(pageIndex, Math.max(0, pages.length - 1));
  const activePage = pages[safePageIndex];
  const rawBackground = activePage?.backgroundImage ?? scene.backgroundImage ?? getHeroPortrait(scene.characterId) ?? "";
  const background = publicPath(rawBackground);
  const isLastPage = safePageIndex >= pages.length - 1;
  const progress = pages.length ? ((safePageIndex + 1) / pages.length) * 100 : 100;

  function goBackToNexo() {
    setLeaving(true);
    window.setTimeout(() => router.push("/conversa"), reducedMotion ? 0 : 180);
  }

  function finishScene() {
    if (!scene) return;
    if (previewMode) { goBackToNexo(); return; }
    updateSave((current) => {
      const milestones = current.social.outingMilestones[scene.characterId] ?? [];
      const nextMilestones = milestones.includes(scene.day) ? milestones : [...milestones, scene.day];
      return {
        ...current,
        social: {
          ...current.social,
          outingMilestones: { ...current.social.outingMilestones, [scene.characterId]: nextMilestones },
          routeStage: { ...current.social.routeStage, [scene.characterId]: scene.day === 3 ? Math.max(current.social.routeStage[scene.characterId] ?? 3, 4) : Math.max(current.social.routeStage[scene.characterId] ?? 6, 7) },
        },
        flags: Array.from(new Set([...current.flags, scene.completionFlag, routeAdvanceFlag(current.player.currentDay, scene.characterId)])),
      };
    });
    sessionStorage.removeItem(`ressonancia:outing-progress:${scene.id}:day:${save.player.currentDay}`);
    goBackToNexo();
  }

  function continueScene() {
    if (isLastPage) { finishScene(); return; }
    setPageIndex((current) => Math.min(current + 1, pages.length - 1));
  }

  const outingStyle = background ? ({
    backgroundImage:`linear-gradient(180deg,rgba(2,7,11,.08),rgba(2,7,11,.82)),url(${background})`,
    "--outing-bg-position-desktop": activePage?.backgroundPositionDesktop ?? scene.backgroundPositionDesktop ?? "center center",
    "--outing-bg-position-mobile": activePage?.backgroundPositionMobile ?? activePage?.backgroundPositionDesktop ?? scene.backgroundPositionMobile ?? scene.backgroundPositionDesktop ?? "center center",
  } as CSSProperties) : undefined;

  if (!started) return <main className={`outingScene outingIntroScene${leaving ? " isLeaving" : ""}${reducedMotion ? " motionReduced" : ""}`} style={outingStyle}>
    <section className="outingIntroCard" aria-labelledby="outing-intro-title">
      <span className="eyebrow">{qaMode ? "QA PREVIEW" : replayMode ? "REPLAY" : "CENA PRESENCIAL"}</span>
      <div className="outingIntroDate">{dateLabel(scene)}</div>
      <h1 id="outing-intro-title">{formatPlayerText(scene.title, save.player)}</h1>
      <p>{scene.speaker}</p>
      <div className="outingIntroActions">
        <button className="button primary" autoFocus onClick={() => setStarted(true)}>{previewMode ? "Rever cena" : "Começar Date"}</button>
        <button className="button" onClick={goBackToNexo}>Voltar ao NEXO</button>
      </div>
    </section>
  </main>;

  const buttonLabel = isLastPage ? (previewMode ? "Encerrar replay" : (scene.continueLabel ?? "Voltar ao NEXO")) : (activePage?.continueLabel ?? "Continuar");

  return <main className={`outingScene${leaving ? " isLeaving" : ""}${reducedMotion ? " motionReduced" : ""}`} style={outingStyle}>
    <header className="outingSceneHeader">
      <div className="outingHeaderLeft">
        <button type="button" className="outingExitButton" onClick={goBackToNexo} aria-label="Voltar ao NEXO">‹ <span>Voltar ao NEXO</span></button>
        <div className="outingTopTag">{scene.speaker.toUpperCase()} · {dateLabel(scene)}{previewMode ? " · REPLAY" : ""}</div>
      </div>
      <div className="outingProgressMeta" aria-live="polite"><span>CENA PRESENCIAL</span><strong>{safePageIndex + 1}/{pages.length}</strong></div>
    </header>
    <section className="outingTextBox" ref={textBoxRef} aria-label={`${dateLabel(scene)} com ${scene.speaker}`}>
      <div className="outingProgressTrack" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
      <div className="outingTitleRow"><div><span className="eyebrow">{dateLabel(scene)}{previewMode ? " · REPLAY" : ""}</span><h1>{formatPlayerText(scene.title, save.player)}</h1></div><span className="outingPageCounter">{safePageIndex + 1} de {pages.length}</span></div>
      <div className="outingStoryPage" key={`${scene.id}-${safePageIndex}`}>{activePage?.paragraphs.map((paragraph, index) => <p key={`${safePageIndex}-${index}`}>{formatPlayerText(paragraph, save.player)}</p>)}</div>
      <div className="outingFooter">
        <div className="outingReaderNav">
          <button className="button outingPrevious" disabled={safePageIndex === 0} onClick={() => setPageIndex((current) => Math.max(0, current - 1))}>Anterior</button>
          <small>{isLastPage ? (previewMode ? "Fim do replay" : "Fim da cena") : "←/→ também navegam entre páginas"}</small>
        </div>
        <button className="button primary outingContinue" onClick={continueScene}>{buttonLabel}</button>
      </div>
    </section>
  </main>;
}
