"use client";

import { getOutingScene } from "@/content/narrative/outings";
import { getHeroPortrait } from "@/game/data/heroPortraits";
import { loadSave, updateSave } from "@/lib/save";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { SaveGame } from "@/game/types";
import { routeAdvanceFlag } from "@/game/social/dialogue";

export default function OutingPage() {
  const router = useRouter();
  const params = useParams<{ sceneId: string }>();
  const sceneId = typeof params?.sceneId === "string" ? decodeURIComponent(params.sceneId) : null;
  const scene = useMemo(() => getOutingScene(sceneId), [sceneId]);
  const [save, setSave] = useState<SaveGame | null>(null);

  useEffect(() => {
    const current = loadSave();
    if (!current) { router.replace("/novo-jogo"); return; }
    setSave(current);
  }, [router]);

  if (!save) return <main className="centerPage"><p>Carregando cena...</p></main>;
  if (!scene) return <main className="centerPage"><div className="heroPanel"><h1>Cena indisponivel</h1><p>O encontro selecionado nao existe no pacote de conteudo.</p><button className="button primary" onClick={() => router.replace("/conversa")}>Voltar ao NEXO</button></div></main>;

  const selected = save.social.outingsByGlobalDay[String(save.player.currentDay)];
  if (selected !== scene.characterId) return <main className="centerPage"><div className="heroPanel"><h1>Encontro nao selecionado</h1><p>Esta cena so abre para o personagem escolhido neste marco.</p><button className="button primary" onClick={() => router.replace("/conversa")}>Voltar ao NEXO</button></div></main>;

  const background = scene.backgroundImage ?? getHeroPortrait(scene.characterId) ?? "";

  function finishScene() {
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
        flags: Array.from(new Set([...current.flags, scene.completionFlag, routeAdvanceFlag(current.player.currentDay, scene.characterId)]))
      };
    });
    router.push("/conversa");
  }

  return <main className="outingScene" style={background ? { backgroundImage:`linear-gradient(180deg,rgba(2,7,11,.12),rgba(2,7,11,.82)),url(${background})` } : undefined}>
    <div className="outingTopTag">{scene.speaker.toUpperCase()} · ENCONTRO</div>
    <section className="outingTextBox">
      <span className="eyebrow">CENA PRESENCIAL</span>
      <h1>{scene.title}</h1>
      {scene.paragraphs.map((paragraph, index) => <p key={index}>{paragraph.replaceAll("{{playerName}}", save.player.name)}</p>)}
      <button className="button primary outingContinue" onClick={finishScene}>{scene.continueLabel ?? "Continuar"}</button>
    </section>
  </main>;
}
