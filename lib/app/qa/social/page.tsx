"use client";

import { postShiftScenes } from "@/content/dialogues/post-shift";
import { outingScenes } from "@/content/narrative/outings";
import { SOCIAL_ROUTE_MANIFEST, SOCIAL_ROUTE_STAGES } from "@/content/social/routeManifest";
import { dialogueIntroOutgoingFlag, getDialogueTurns } from "@/game/social/dialogue";
import { auditSocialSave, repairSocialSave } from "@/game/social/integrity";
import { nexoReadFlag } from "@/game/social/nexoLibrary";
import type { SaveGame } from "@/game/types";
import { createInitialShift, SHIFT_GAME_MINUTES } from "@/game/simulation/shift";
import { isPostShiftOnlySave, loadSave, writeSave } from "@/lib/save";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const emptyRelationship = () => ({ trust: 0, respect: 0, intimacy: 0, tension: 0, attraction: 0 });

function knownCharacterSocialFlags(characterId: string) {
  const flags = new Set<string>();
  for (const scene of postShiftScenes.filter((item) => item.characterId === characterId)) {
    if (scene.completionFlag) flags.add(scene.completionFlag);
    for (const turn of getDialogueTurns(scene)) {
      flags.add(dialogueIntroOutgoingFlag(turn.id));
      for (const choice of turn.choices) flags.add(choice.flag);
    }
  }
  for (const outing of outingScenes.filter((item) => item.characterId === characterId)) flags.add(outing.completionFlag);
  return flags;
}

function stripCharacterSocialFlags(save: SaveGame, characterId: string) {
  const known = knownCharacterSocialFlags(characterId);
  return save.flags.filter((flag) => {
    if (known.has(flag)) return false;
    if (flag.startsWith("social:route-advanced:day:") && flag.endsWith(`:${characterId}`)) return false;
    if (flag.startsWith("social:intro-outgoing-sent:") && flag.includes(characterId)) return false;
    if (flag.startsWith("nexo:read:") && flag.includes(`:${characterId}:`)) return false;
    if (flag.startsWith("outing:day") && flag.endsWith(`:${characterId}`)) return false;
    return true;
  });
}

export default function SocialQaPage() {
  const router = useRouter();
  const [save, setSave] = useState<SaveGame | null>(null);
  const [characterId, setCharacterId] = useState<string>(SOCIAL_ROUTE_MANIFEST[0].characterId);
  const [lastAction, setLastAction] = useState("Nenhuma ação executada nesta sessão.");

  useEffect(() => {
    const current = loadSave();
    if (!current) { router.replace("/novo-jogo"); return; }
    setSave(current);
  }, [router]);

  const character = SOCIAL_ROUTE_MANIFEST.find((item) => item.characterId === characterId) ?? SOCIAL_ROUTE_MANIFEST[0];
  const characterFlags = useMemo(() => save ? save.flags.filter((flag) => flag.includes(characterId)).sort() : [], [save, characterId]);
  const integrityIssues = useMemo(() => save ? auditSocialSave(save) : [], [save]);
  const currentReadFlag = useMemo(() => save ? nexoReadFlag(save, characterId) : null, [save, characterId]);

  function apply(next: SaveGame, message = "Save social atualizado.") {
    writeSave(next);
    setSave(next);
    setLastAction(message);
  }

  function setDay(day: number) {
    if (!save) return;
    const shift = createInitialShift(day, save.player.name);
    apply({
      ...save,
      player: { ...save.player, currentDay: day, currentChapter: `dia-${day}`, developmentRequired: false },
      shift: isPostShiftOnlySave(save) ? { ...shift, elapsedGameMinutes: SHIFT_GAME_MINUTES, status: "finished" } : shift,
      lastDispatch: null,
      flags: save.flags.filter((flag) => !flag.startsWith(`social:route-advanced:day:${day}:`) && !flag.startsWith(`nexo:read:${day}:`)),
    }, `Noite global preparada para ${day}.`);
  }

  function prepareStage(stage: number) {
    if (!save) return null;
    const flags = stripCharacterSocialFlags(save, characterId);
    const milestones = stage >= 4 ? [3] : [];
    const outingsByGlobalDay = Object.fromEntries(Object.entries(save.social.outingsByGlobalDay).filter(([, id]) => id !== characterId));
    const next: SaveGame = {
      ...save,
      relationships: { ...save.relationships, [characterId]: emptyRelationship() },
      social: {
        ...save.social,
        routeStage: { ...save.social.routeStage, [characterId]: stage },
        romanceProgress: { ...save.social.romanceProgress, [characterId]: 0 },
        romanceEarnedByStage: Object.fromEntries(Object.entries(save.social.romanceEarnedByStage).filter(([key]) => !key.includes(characterId))),
        outingMilestones: { ...save.social.outingMilestones, [characterId]: milestones },
        outingsByGlobalDay,
      },
      flags,
    };
    apply(next, `${character.speaker} preparado em D${stage}.`);
    return next;
  }

  function prepareAndOpen(stage: number) {
    const next = prepareStage(stage);
    if (!next) return;
    sessionStorage.setItem("ressonancia:qa-open-contact", characterId);
    router.push("/conversa");
  }

  function resetCharacter() { prepareStage(1); }

  function resetAllSocial() {
    if (!save) return;
    let flags = save.flags;
    for (const item of SOCIAL_ROUTE_MANIFEST) flags = stripCharacterSocialFlags({ ...save, flags }, item.characterId);
    const relationships = Object.fromEntries(SOCIAL_ROUTE_MANIFEST.map((item) => [item.characterId, emptyRelationship()]));
    const routeStage = Object.fromEntries(SOCIAL_ROUTE_MANIFEST.map((item) => [item.characterId, 1]));
    const romanceProgress = Object.fromEntries(SOCIAL_ROUTE_MANIFEST.map((item) => [item.characterId, 0]));
    const outingMilestones = Object.fromEntries(SOCIAL_ROUTE_MANIFEST.map((item) => [item.characterId, []]));
    apply({ ...save, relationships, social: { ...save.social, routeStage, romanceProgress, romanceEarnedByStage: {}, outingsByGlobalDay: {}, outingMilestones }, flags }, "Todo o progresso social foi limpo.");
  }

  function openChat() {
    sessionStorage.setItem("ressonancia:qa-open-contact", characterId);
    router.push("/conversa");
  }

  function setReadState(read: boolean) {
    if (!save || !currentReadFlag) return;
    const flags = save.flags.filter((flag) => flag !== currentReadFlag);
    if (read) flags.push(currentReadFlag);
    apply({ ...save, flags: Array.from(new Set(flags)) }, read ? "Contato marcado como lido no turno atual." : "Turno atual marcado como não lido.");
  }

  function setDateCompleted(stage: 3 | 6, completed: boolean) {
    if (!save) return;
    const scene = outingScenes.find((item) => item.characterId === characterId && item.day === stage);
    if (!scene) return;
    let milestones = [...(save.social.outingMilestones[characterId] ?? [])];
    let flags = save.flags.filter((flag) => flag !== scene.completionFlag);
    let routeStage = save.social.routeStage[characterId] ?? 1;

    if (completed) {
      if (stage === 6 && !milestones.includes(3)) milestones.push(3);
      if (!milestones.includes(stage)) milestones.push(stage);
      flags.push(scene.completionFlag);
      const date1 = outingScenes.find((item) => item.characterId === characterId && item.day === 3);
      if (stage === 6 && date1 && !flags.includes(date1.completionFlag)) flags.push(date1.completionFlag);
      routeStage = Math.max(routeStage, stage === 3 ? 4 : 7);
    } else {
      if (stage === 3) {
        milestones = milestones.filter((value) => value !== 3 && value !== 6);
        for (const outing of outingScenes.filter((item) => item.characterId === characterId)) flags = flags.filter((flag) => flag !== outing.completionFlag);
        routeStage = Math.min(routeStage, 3);
      } else {
        milestones = milestones.filter((value) => value !== 6);
        routeStage = Math.min(routeStage, 6);
      }
    }

    apply({
      ...save,
      social: {
        ...save.social,
        routeStage: { ...save.social.routeStage, [characterId]: routeStage },
        outingMilestones: { ...save.social.outingMilestones, [characterId]: Array.from(new Set(milestones)).sort((a, b) => a - b) },
      },
      flags: Array.from(new Set(flags)),
    }, `${character.speaker}: Date ${stage === 3 ? 1 : 2} ${completed ? "marcado como concluído" : "reaberto para QA"}.`);
  }

  function runRepair() {
    if (!save) return;
    const result = repairSocialSave(save);
    if (!result.changed) { setLastAction("Diagnóstico limpo: nenhuma reparação necessária."); return; }
    apply(result.save, `Reparo aplicado: ${result.repaired.join("; ")}.`);
  }

  function reloadFromStorage() {
    const current = loadSave();
    if (!current) return;
    setSave(current);
    setLastAction("Save recarregado do localStorage sem reiniciar a página.");
  }

  if (!save) return <main className="centerPage"><p>Carregando QA social...</p></main>;

  return <main className="qaSocialPage">
    <header className="qaSocialHeader">
      <div><span className="eyebrow">DEV TOOLS</span><h1>QA social</h1><p>Atalhos de teste e diagnóstico. Não adicionam conteúdo narrativo; modificações são restritas ao save local quando indicado.</p></div>
      <div className="qaHeaderActions"><button className="button" onClick={() => router.push("/conversa")}>Abrir NEXO</button><button className="button" onClick={() => router.push("/agencia")}>Voltar à Central</button></div>
    </header>

    <section className="qaSocialGrid">
      <article className="qaCard">
        <span className="eyebrow">PERSONAGEM</span>
        <select value={characterId} onChange={(event) => setCharacterId(event.target.value)}>{SOCIAL_ROUTE_MANIFEST.map((item) => <option key={item.characterId} value={item.characterId}>{item.speaker}{item.authored ? " · autorado" : " · QA placeholder"}</option>)}</select>
        <div className="qaStatus"><strong>{character.speaker}</strong><span>Etapa atual: {save.social.routeStage[characterId] ?? 1}</span><span>Dates: {(save.social.outingMilestones[characterId] ?? []).join(", ") || "nenhum"}</span><span>Leitura atual: {currentReadFlag && save.flags.includes(currentReadFlag) ? "lida" : "não lida"}</span></div>
        <button className="button primary" onClick={openChat}>Abrir conversa no NEXO</button>
        <div className="qaInlineActions"><button onClick={() => setReadState(false)}>Simular não lida</button><button onClick={() => setReadState(true)}>Marcar lida</button></div>
      </article>

      <article className="qaCard">
        <span className="eyebrow">NOITE GLOBAL</span>
        <div className="qaButtonGrid">{SOCIAL_ROUTE_STAGES.map((day) => <button key={day} className={save.player.currentDay === day ? "active" : ""} onClick={() => setDay(day)}>Noite {day}</button>)}</div>
        <small>Altera o calendário para QA. No modo só conversa, mantém o expediente encerrado.</small>
      </article>

      <article className="qaCard">
        <span className="eyebrow">ETAPA DA ROTA</span>
        <div className="qaButtonGrid">{SOCIAL_ROUTE_STAGES.map((stage) => <button key={stage} className={(save.social.routeStage[characterId] ?? 1) === stage ? "active" : ""} onClick={() => prepareStage(stage)}>D{stage}</button>)}</div>
        <div className="qaButtonGrid">{SOCIAL_ROUTE_STAGES.map((stage) => <button key={`open-${stage}`} onClick={() => prepareAndOpen(stage)}>D{stage} + abrir</button>)}</div>
        <small>Prepara a etapa limpa. D4–D6 consideram o Date 1 concluído.</small>
      </article>

      <article className="qaCard">
        <span className="eyebrow">DATES</span>
        <div className="qaStack">
          <button onClick={() => router.push(`/encontro/outing-day3-${characterId}?qa=1`)}>Abrir Date 1 · QA preview</button>
          <div className="qaInlineActions"><button onClick={() => setDateCompleted(3, true)}>Concluir Date 1</button><button onClick={() => setDateCompleted(3, false)}>Reabrir Date 1</button></div>
          <button onClick={() => router.push(`/encontro/outing-day6-${characterId}?qa=1`)}>Abrir Date 2 · QA preview</button>
          <div className="qaInlineActions"><button onClick={() => setDateCompleted(6, true)}>Concluir Date 2</button><button onClick={() => setDateCompleted(6, false)}>Reabrir Date 2</button></div>
        </div>
        <small>Preview não conclui Date. Os botões de estado servem apenas para testar arquivo, replay e progressão.</small>
      </article>

      <article className="qaCard qaIntegrityCard">
        <span className="eyebrow">INTEGRIDADE / RELOAD</span>
        <div className={`qaIntegritySummary ${integrityIssues.length ? "warning" : "ok"}`}><strong>{integrityIssues.length ? `${integrityIssues.length} inconsistência(s)` : "Save social consistente"}</strong><span>{lastAction}</span></div>
        {integrityIssues.length > 0 && <div className="qaIntegrityList">{integrityIssues.map((issue, index) => <code key={`${issue.code}-${index}`}>{issue.code}: {issue.message}</code>)}</div>}
        <div className="qaInlineActions"><button onClick={reloadFromStorage}>Recarregar localStorage</button><button onClick={runRepair}>Reparar social</button></div>
        <button onClick={() => window.location.reload()}>Reload completo da página</button>
        <small>Use durante conversas, convites e Dates para verificar se o estado sobrevive ao reload sem duplicar flags/progresso.</small>
      </article>

      <article className="qaCard qaFlagsCard">
        <span className="eyebrow">FLAGS DO PERSONAGEM</span>
        <div className="qaFlags">{characterFlags.length ? characterFlags.map((flag) => <code key={flag}>{flag}</code>) : <small>Nenhuma flag contendo “{characterId}”.</small>}</div>
      </article>

      <article className="qaCard">
        <span className="eyebrow">RESET SOCIAL</span>
        <div className="qaStack"><button className="devDanger" onClick={resetCharacter}>Limpar somente {character.speaker}</button><button className="devDanger" onClick={resetAllSocial}>Limpar todo progresso social</button></div>
        <small>Dispatch, XP, atributos, configurações e modo de jogo são preservados.</small>
      </article>
    </section>
  </main>;
}
