"use client";

import { MissionRequirementRadar } from "@/components/MissionRequirementRadar";
import { GAMEPLAY_CONFIG } from "@/content/config/gameplay";
import { getHeroPortrait } from "@/game/data/heroPortraits";
import { heroById } from "@/game/data/heroes";
import { caseById } from "@/game/data/incidents";
import { formatGameTime } from "@/game/simulation/shift";
import { publicPath } from "@/lib/publicPath";
import type { DispatchResult, Incident, IncidentRuntime, OperationalHero, SaveGame } from "@/game/types";
import type { getMissionAssessment } from "@/game/simulation/resolveIncident";
import { useEffect, useState } from "react";
import type { OperationsChatMessage } from "@/components/agency/OperationsChatRail";

type Assessment = ReturnType<typeof getMissionAssessment>;
type Screen = "central" | "incident" | "team" | "agents" | "nexo";

type TutorialCopy = { title: string; body: string; targetLabel?: string } | null;
type ProgressiveCopy = { eyebrow?: string; title: string; body: string; targetLabel?: string } | null;

function InlineEdison({ tutorial, actionLabel, onAction }: { tutorial: TutorialCopy | ProgressiveCopy; actionLabel?: string; onAction?: () => void }) {
  if (!tutorial) return null;
  return <aside className="mobileEdisonInline">
    <img src={publicPath("/edison.jpg")} alt="Edison" />
    <div>
      <small>{"eyebrow" in tutorial && tutorial.eyebrow ? tutorial.eyebrow : "EDISON · TUTORIAL"}</small>
      <strong>{tutorial.title}</strong>
      <p>{tutorial.body}</p>
      {tutorial.targetLabel ? <span>→ {tutorial.targetLabel}</span> : null}
      {onAction ? <button type="button" onClick={onAction}>{actionLabel ?? "REGISTRAR"}</button> : null}
    </div>
  </aside>;
}

function IncidentCard({ incident, runtime, gameMinute, heroNameById, tutorial, onOpen, onResult }: {
  incident: Incident; runtime: IncidentRuntime; gameMinute: number; heroNameById: Record<string,string>; tutorial: boolean;
  onOpen: () => void; onResult: (result: DispatchResult) => void;
}) {
  const remaining = runtime.deadlineAtGameMinute != null ? Math.max(0, runtime.deadlineAtGameMinute - gameMinute) : 0;
  const end = runtime.resolvesAtGameMinute ?? gameMinute;
  const names = (runtime.selectedHeroIds ?? []).map((id) => heroNameById[id] ?? id).join(" + ");
  const label = runtime.status === "resolved" ? "RESULTADO DISPONÍVEL" : runtime.status === "waiting" ? "AGUARDANDO DESPACHO" : "EM OPERAÇÃO";
  return <button type="button" className={`mobileIncidentCard ${runtime.status}`} onClick={() => runtime.status === "resolved" && runtime.result ? onResult(runtime.result) : onOpen()}>
    <div className="mobileIncidentCardTop"><span>{label}</span><b>{incident.priority}</b></div>
    <strong>{incident.title}</strong>
    <p>{incident.district}</p>
    <small>{runtime.status === "waiting" ? (tutorial ? "SEM LIMITE NO TUTORIAL" : `${remaining} min para decidir`) : runtime.status === "dispatched" ? `${names || "Equipe"} · retorno ${formatGameTime(end)}` : "Toque para revisar e arquivar"}</small>
  </button>;
}

export function MobileMissionResult({ result, incident, tutorial, onAcknowledge }: { result: DispatchResult; incident: Incident; tutorial: TutorialCopy; onAcknowledge: () => void }) {
  const team = result.selectedHeroIds.flatMap((id) => heroById[id] ? [heroById[id]] : []);
  return <section className="mobileDispatchPage mobileMissionResult" aria-label="Resultado da ocorrência">
    <header className="mobileDispatchPageHeader"><div><small>RESULTADO DA OCORRÊNCIA</small><h1>{incident.title}</h1><p>{incident.district} · concluída às {formatGameTime(result.completedAtGameMinute)}</p></div><span className={`mobileOutcome ${result.outcome === "Sucesso" ? "success" : result.outcome === "Falha" ? "failure" : "cost"}`}>{result.outcome}</span></header>
    <div className="mobileDispatchScroll">
      <section className="mobileDispatchCard"><small>CHAMADO ORIGINAL</small><p>{incident.description}</p></section>
      <section className="mobileDispatchCard"><small>COMO FOI RESOLVIDO</small><p>{result.summary}</p></section>
      <div className="mobileResultStats"><span><small>EQUIPE</small><strong>{team.map((h)=>h.name).join(" + ")}</strong></span><span><small>ADEQUAÇÃO</small><strong>{Math.round(result.attributeScore*100)}%</strong></span><span><small>RESSONÂNCIA</small><strong>{result.resonanceScore >= 0 ? "+" : ""}{result.resonanceScore.toFixed(1)}</strong></span></div>
      <section className="mobileDispatchCard"><small>FATORES DECISIVOS</small>{result.decisiveFactors.map((f)=><p key={f}>• {f}</p>)}</section>
      <section className="mobileDispatchCard"><small>CONSEQUÊNCIAS</small>{result.heroEffects.map((e)=><p key={e.heroId}>• {heroById[e.heroId]?.name}: {e.healthDelta} Vida, {e.energyDelta} Energia, +{e.xpAwarded} XP.</p>)}</section>
      <InlineEdison tutorial={tutorial} />
    </div>
    <footer className="mobileDispatchActionBar"><button type="button" onClick={onAcknowledge}>ARQUIVAR RESULTADO</button></footer>
  </section>;
}

export function MobileDispatchExperience(props: {
  save: SaveGame; activeIncidents: Incident[]; operationalHeroes: OperationalHero[]; gameMinute: number;
  waitingCount: number; dispatchedCount: number; availableCount: number; pendingReports: number; missedCount: number;
  incident: Incident | null; runtime: IncidentRuntime | null | undefined; deadlineRemaining: number | null; assessment: Assessment | null;
  selectedHeroes: OperationalHero[]; selectedIds: string[]; alerts: string[]; heroNameById: Record<string,string>; chatMessages: OperationsChatMessage[];
  reportResult: DispatchResult | null; tutorial: TutorialCopy; progressiveTutorial: ProgressiveCopy; progressiveAction?: () => void;
  tutorialActive: boolean; tutorialIncidentId: string; tutorialHeroId: string;
  onSelectIncident: (id:string)=>void; onOpenBriefing:(id:string)=>void; onCloseBriefing:()=>void; onOpenResult:(r:DispatchResult)=>void; onToggleHero:(id:string)=>void; onOpenHero:(id:string)=>void; onDispatch:()=>void; onAcknowledgeResult:()=>void;
}) {
  const [screen,setScreen] = useState<Screen>("central");
  useEffect(()=>{ if (props.reportResult) return; if (!props.incident && (screen === "incident" || screen === "team")) setScreen("central"); },[props.reportResult, props.incident, screen]);
  const currentTutorial = props.tutorial;
  const resultIncident = props.reportResult ? caseById[props.reportResult.incidentId] ?? props.incident : null;
  if (props.reportResult && resultIncident) return <MobileMissionResult result={props.reportResult} incident={resultIncident} tutorial={currentTutorial} onAcknowledge={props.onAcknowledgeResult}/>;

  const openIncident = (id:string) => { props.onSelectIncident(id); props.onOpenBriefing(id); setScreen("incident"); };
  const goCentral = () => { props.onCloseBriefing(); setScreen("central"); };
  const goSection = (next: Screen) => { if (screen === "incident" || screen === "team") props.onCloseBriefing(); setScreen(next); };
  const goTeam = () => setScreen("team");
  const isTutorialIncident = props.tutorialActive && props.incident?.id === props.tutorialIncidentId;

  return <section className="mobileDispatchExperience">
    <nav className="mobileDispatchPrimaryNav" aria-label="Central mobile">
      <button className={screen==="central"||screen==="incident"||screen==="team"?"active":""} onClick={goCentral}>CENTRAL{props.waitingCount+props.pendingReports>0?<b>{props.waitingCount+props.pendingReports}</b>:null}</button>
      <button className={screen==="nexo"?"active":""} onClick={()=>goSection("nexo")}>NEXO</button>
      <button className={screen==="agents"?"active":""} onClick={()=>goSection("agents")}>AGENTES<b>{props.availableCount}</b></button>
    </nav>

    {screen === "central" && <div className="mobileDispatchScreen">
      <div className="mobileOpsSummary"><span><small>AGUARDANDO</small><strong>{props.waitingCount}</strong></span><span><small>EM MISSÃO</small><strong>{props.dispatchedCount}</strong></span><span><small>RELATÓRIOS</small><strong>{props.pendingReports}</strong></span><span><small>PERDIDOS</small><strong>{props.missedCount}</strong></span></div>
      <InlineEdison tutorial={currentTutorial} />
      <header className="mobileScreenTitle"><small>CENTRAL OPERACIONAL</small><h2>Chamados e missões</h2><p>Abra um chamado para revisar o caso. No celular, cada etapa ocupa uma tela própria.</p></header>
      <div className="mobileIncidentList">{props.activeIncidents.length ? props.activeIncidents.map((inc)=>{ const rt=props.save.shift.incidents[inc.id]; return rt?<IncidentCard key={inc.id} incident={inc} runtime={rt} gameMinute={props.gameMinute} heroNameById={props.heroNameById} tutorial={props.tutorialActive&&inc.id===props.tutorialIncidentId} onOpen={()=>openIncident(inc.id)} onResult={props.onOpenResult}/>:null;}) : <div className="mobileEmptyState">SEM CHAMADOS ATIVOS</div>}</div>
    </div>}

    {screen === "incident" && props.incident && <div className="mobileDispatchPage">
      <header className="mobileDispatchPageHeader"><button className="mobileBack" onClick={goCentral}>← CENTRAL</button><div><small>CHAMADO · {props.incident.district.toUpperCase()}</small><h1>{props.incident.title}</h1></div></header>
      <div className="mobileDispatchScroll">
        <InlineEdison tutorial={currentTutorial} />
        <section className="mobileDispatchCard"><small>O QUE ESTÁ ACONTECENDO</small><p>{props.incident.description}</p></section>
        <div className="mobileMetaGrid"><span><small>RISCO</small><strong>{props.incident.risk}</strong></span><span><small>CONFIABILIDADE</small><strong>{props.incident.reliability}</strong></span><span><small>TEMPO</small><strong>{isTutorialIncident?"SEM LIMITE":`${props.deadlineRemaining ?? 0} min`}</strong></span><span><small>DURAÇÃO</small><strong>{isTutorialIncident?12:props.incident.missionDurationMinutes} min</strong></span></div>
        <section className="mobileDispatchCard"><small>REQUISITOS RECOMENDADOS</small><div className="mobileTagList">{props.incident.recommendedTags.map((tag)=><span key={tag}>{tag}</span>)}</div>{props.incident.powerAffinityHeroIds?.length?<p className="mobileAffinity">Afinidade: {props.incident.powerAffinityHeroIds.map((id)=>heroById[id]?.name ?? id).join(" · ")}</p>:null}</section>
      </div>
      <footer className="mobileDispatchActionBar"><button type="button" disabled={props.runtime?.status!=="waiting"} onClick={goTeam}>{props.runtime?.status==="waiting"?"MONTAR EQUIPE →":"MISSÃO JÁ DESPACHADA"}</button></footer>
    </div>}

    {screen === "team" && props.incident && <div className="mobileDispatchPage">
      <header className="mobileDispatchPageHeader"><button className="mobileBack" onClick={()=>setScreen("incident")}>← CHAMADO</button><div><small>MONTAR EQUIPE</small><h1>{props.incident.title}</h1></div></header>
      <div className="mobileDispatchScroll">
        <InlineEdison tutorial={props.progressiveTutorial ?? currentTutorial} actionLabel="REGISTRAR" onAction={props.progressiveTutorial ? props.progressiveAction : undefined}/>
        <section className="mobileTeamForecast"><div><small>CHANCE ESTIMADA</small><strong>{props.selectedHeroes.length?`${props.assessment?.successChance ?? 0}%`:"—"}</strong></div><div><small>SELEÇÃO</small><strong>{props.selectedIds.length}/{GAMEPLAY_CONFIG.maxTeamSize}</strong></div></section>
        {props.alerts.length?<div className="mobileAlertList">{props.alerts.map((a)=><span key={a}>{a}</span>)}</div>:null}
        {props.assessment?<section className="mobileDispatchCard mobileForecastDetail"><small>PREVISÃO DA EQUIPE</small><MissionRequirementRadar heroes={props.selectedHeroes} requirements={props.assessment.requirements}/><div className="mobileTagList">{props.incident.recommendedTags.map((tag)=><span key={tag} className={props.assessment?.matchedTags.includes(tag)?"covered":"missing"}>{props.assessment?.matchedTags.includes(tag)?"✓ ":"○ "}{tag}</span>)}</div></section>:null}
        <div className="mobileHeroList">{props.operationalHeroes.map((hero)=>{ const portrait=getHeroPortrait(hero.id); const selected=props.selectedIds.includes(hero.id); const selectable=hero.status==="disponivel"&&props.save.shift.status==="running"&&(!isTutorialIncident||hero.id===props.tutorialHeroId); return <article key={hero.id} className={`mobileHeroRow ${selected?"selected":""} ${hero.status}`}><button type="button" disabled={!selectable} aria-pressed={selected} onClick={()=>props.onToggleHero(hero.id)}>{portrait?<img src={portrait} alt=""/>:<span>{hero.name.slice(0,2)}</span>}<div><strong>{hero.name}</strong><small>{hero.className} · {hero.trail}</small><em>{hero.status.replace("_"," ").toUpperCase()}</em></div><b>{selected?"✓":"+"}</b></button><button type="button" className="mobileHeroInfo" onClick={()=>props.onOpenHero(hero.id)}>FICHA</button></article>;})}</div>
      </div>
      <footer className="mobileDispatchActionBar"><div><small>EQUIPE</small><strong>{props.selectedHeroes.length?props.selectedHeroes.map((h)=>h.name).join(" + "):"Nenhum agente selecionado"}</strong></div><button type="button" disabled={!props.selectedIds.length||props.runtime?.status!=="waiting"||props.save.shift.status!=="running"} onClick={()=>{props.onDispatch();setScreen("central");}}>DESPACHAR EQUIPE</button></footer>
    </div>}

    {screen === "agents" && <div className="mobileDispatchScreen"><header className="mobileScreenTitle"><small>AGENTES</small><h2>Equipe operacional</h2></header><div className="mobileHeroList">{props.operationalHeroes.map((hero)=>{const p=getHeroPortrait(hero.id);return <article key={hero.id} className={`mobileHeroRow ${hero.status}`}><button type="button" onClick={()=>props.onOpenHero(hero.id)}>{p?<img src={p} alt=""/>:<span>{hero.name.slice(0,2)}</span>}<div><strong>{hero.name}</strong><small>{hero.className} · {hero.trail}</small><em>{hero.status.replace("_"," ").toUpperCase()}</em></div><b>›</b></button></article>;})}</div></div>}

    {screen === "nexo" && <div className="mobileDispatchScreen mobileNexoScreen"><header className="mobileScreenTitle"><small>NEXO · OPERAÇÕES</small><h2>Guerreiros Elementais</h2><p>Canal operacional somente leitura.</p></header><div className="mobileOpsFeed">{props.chatMessages.map((m)=><article key={m.id}><div><strong>{m.sender}</strong><time>{formatGameTime(m.minute)}</time></div><p>{m.text}</p></article>)}</div></div>}
  </section>;
}
