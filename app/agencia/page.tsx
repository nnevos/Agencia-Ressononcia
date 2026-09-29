"use client";

import { getHeroPortrait } from "@/game/data/heroPortraits";

import { DevTools } from "@/components/DevTools";
import { HeroCard } from "@/components/HeroCard";
import { HeroRadar } from "@/components/HeroRadar";
import { heroes } from "@/game/data/heroes";
import { incidents } from "@/game/data/incidents";
import { getOperationalChatMessages } from "@/game/data/operationsChat";
import { GAMEPLAY_CONFIG } from "@/content/config/gameplay";
import { getEnergyState, getHealthState, getMaxEnergy, getMaxHealth, markHeroesOnMission } from "@/game/simulation/heroState";
import { acknowledgeMissionResult, advanceOperationalState } from "@/game/simulation/operations";
import { analyzeTeam, getMissionAssessment, resolveIncident } from "@/game/simulation/resolveIncident";
import { createInitialShift, formatGameTime, SHIFT_GAME_MINUTES, startShift } from "@/game/simulation/shift";
import type { DispatchResult, OperationalHero, SaveGame } from "@/game/types";
import { loadSave, writeSave } from "@/lib/save";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const districtLabels = [
  { name: "NORTE", left: 47, top: 16 },
  { name: "OESTE", left: 22, top: 45 },
  { name: "CENTRO", left: 49, top: 47 },
  { name: "LESTE", left: 82, top: 44 },
  { name: "SUL", left: 50, top: 78 },
];

const districtAnchors: Record<string, { x: number; y: number }> = {
  Norte: { x: 48, y: 24 }, Oeste: { x: 24, y: 48 }, Centro: { x: 50, y: 48 }, Leste: { x: 78, y: 48 }, Sul: { x: 50, y: 76 },
};

function incidentMapPosition(id: string, district: string) {
  const anchor = districtAnchors[district] ?? { x: 50, y: 50 };
  const seed = [...id].reduce((sum, char, index) => sum + char.charCodeAt(0) * (index + 3), 0);
  const angle = (seed % 360) * Math.PI / 180;
  const radiusX = 5 + (seed % 8);
  const radiusY = 4 + ((seed >> 2) % 7);
  return { left: `${Math.max(7, Math.min(93, anchor.x + Math.cos(angle) * radiusX))}%`, top: `${Math.max(10, Math.min(88, anchor.y + Math.sin(angle) * radiusY))}%` };
}


function priorityClass(priority: string) {
  return priority.toLowerCase();
}

export default function AgencyPage() {
  const router = useRouter();
  const [save, setSave] = useState<SaveGame | null>(null);
  const [incidentId, setIncidentId] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [message, setMessage] = useState("Inicie o expediente para receber os primeiros chamados.");
  const [briefingOpen, setBriefingOpen] = useState(false);
  const [heroInfoId, setHeroInfoId] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [reportResult, setReportResult] = useState<DispatchResult | null>(null);

  useEffect(() => {
    const current = loadSave();
    if (!current) return router.replace("/novo-jogo");
    if (current.player.developmentRequired) return router.replace("/desenvolvimento");
    const advanced = advanceOperationalState(current);
    if (advanced !== current) writeSave(advanced);
    setSave(advanced);
  }, [router]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(Date.now());
      const current = loadSave();
      if (!current) return;
      const advanced = advanceOperationalState(current);
      writeSave(advanced);
      setSave(advanced);
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const operationalHeroes = useMemo<OperationalHero[]>(() => {
    if (!save) return [];
    return heroes.map((hero) => {
      const progression = save.heroProgression[hero.id];
      const unlockedTags = hero.techniques.filter((technique) => progression?.unlockedTechniqueIds.includes(technique.id)).flatMap((technique) => technique.grantedTags ?? []);
      return { ...hero, ...save.heroStates[hero.id], ...progression, attributes: progression?.attributes ?? hero.attributes, tags: Array.from(new Set([...hero.tags, ...unlockedTags])) };
    }).filter((hero) => !!hero.heroId);
  }, [save]);

  const activeIncidents = useMemo(() => {
    if (!save) return [];
    return incidents.filter((incident) => {
      const status = save.shift.incidents[incident.id]?.status;
      if (status === "waiting" || status === "dispatched") return true;
      if (status === "resolved") return save.shift.reportQueue.some((result) => result.incidentId === incident.id);
      return false;
    });
  }, [save]);

  const missedIncidents = useMemo(() => {
    if (!save) return [];
    return incidents.filter((incident) => save.shift.incidents[incident.id]?.status === "expired");
  }, [save]);

  useEffect(() => {
    if (incidentId && activeIncidents.some((item) => item.id === incidentId)) return;
    const waiting = activeIncidents.find((item) => save?.shift.incidents[item.id]?.status === "waiting");
    setIncidentId(waiting?.id ?? activeIncidents[0]?.id ?? null);
    setSelected([]);
  }, [activeIncidents, incidentId, save]);

  const incident = useMemo(() => incidents.find((item) => item.id === incidentId) ?? null, [incidentId]);
  const selectedHeroes = useMemo(() => operationalHeroes.filter((hero) => selected.includes(hero.id)), [operationalHeroes, selected]);
  const alerts = useMemo(() => incident && save ? analyzeTeam(incident, selectedHeroes, save.resonance) : [], [incident, selectedHeroes, save]);
  const missionAssessment = useMemo(() => incident && save ? getMissionAssessment(incident, selectedHeroes, save.resonance) : null, [incident, selectedHeroes, save]);
  const infoHero = useMemo(() => operationalHeroes.find((hero) => hero.id === heroInfoId) ?? null, [operationalHeroes, heroInfoId]);
  const chatMessages = useMemo(() => save ? getOperationalChatMessages(save) : [], [save]);
  const heroNameById = useMemo(() => Object.fromEntries(operationalHeroes.map((hero) => [hero.id, hero.name])), [operationalHeroes]);

  function beginShift() {
    if (!save) return;
    const next = { ...save, shift: startShift(save.shift) };
    writeSave(next);
    setSave(next);
    setMessage("Expediente iniciado. O relógio operacional está correndo.");
  }


  function saveNow() {
    if (!save) return;
    writeSave(save);
    setMessage("Progresso salvo localmente.");
    setSettingsOpen(false);
  }

  function saveAndExit() {
    if (!save) return;
    writeSave(save);
    setSettingsOpen(false);
    router.push("/login");
  }

  function restartShift() {
    if (!save) return;
    if (typeof window !== "undefined" && !window.confirm("Reiniciar o expediente atual? Chamados, despachos e relatórios deste turno serão limpos.")) return;
    const resetHeroStates = Object.fromEntries(Object.entries(save.heroStates).map(([id, state]) => [id, {
      ...state,
      status: state.health <= 0 || state.energy <= 0 ? "desmaiado" as const : "disponivel" as const,
      missionId: null,
      busyUntilGameMinute: null
    }]));
    const next: SaveGame = {
      ...save,
      heroStates: resetHeroStates,
      shift: createInitialShift(save.player.currentDay),
      lastDispatch: null,
      flags: save.flags.filter((flag) => !flag.startsWith("despacho_"))
    };
    writeSave(next);
    setSave(next);
    setIncidentId(null);
    setSelected([]);
    setBriefingOpen(false);
    setReportResult(null);
    setSettingsOpen(false);
    setMessage("Expediente reiniciado. Pressione INICIAR TURNO para começar novamente.");
  }

  function openResult(result: DispatchResult) {
    setReportResult(result);
  }

  function acknowledgeResult() {
    if (!save || !reportResult) return;
    const next = acknowledgeMissionResult(save, reportResult);
    writeSave(next);
    setSave(next);
    setReportResult(null);
    setIncidentId(null);
    setMessage(`Relatório de ${incidents.find((item) => item.id === reportResult.incidentId)?.title ?? "ocorrência"} arquivado.`);
  }
  function toggleHero(id: string) {
    const hero = operationalHeroes.find((item) => item.id === id);
    if (!briefingOpen || !incident || selectedRuntime?.status !== "waiting") return;
    if (!hero || hero.status !== "disponivel" || save?.shift.status !== "running") return;
    setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : current.length < GAMEPLAY_CONFIG.maxTeamSize ? [...current, id] : current);
  }

  function openBriefingForIncident(id: string) {
    setIncidentId(id);
    setSelected([]);
    setBriefingOpen(true);
  }

  function closeBriefing() {
    setBriefingOpen(false);
    setSelected([]);
  }

  function handleHeroBarClick(id: string) {
    if (briefingOpen && incident && selectedRuntime?.status === "waiting") {
      toggleHero(id);
      return;
    }
    setHeroInfoId(id);
  }

  function dispatch() {
    if (!save || !incident) return;
    if (save.shift.status !== "running") return setMessage("O expediente ainda não está em andamento.");
    const runtime = save.shift.incidents[incident.id];
    if (runtime?.status !== "waiting") return setMessage("Esta ocorrência não está mais aguardando despacho.");
    if (selected.length === 0) return setMessage("Você precisa selecionar pelo menos um herói.");

    const chosen = operationalHeroes.filter((hero) => selected.includes(hero.id));
    if (chosen.some((hero) => hero.status !== "disponivel")) return setMessage("Um dos heróis selecionados ficou indisponível.");

    const currentMinute = save.shift.elapsedGameMinutes;
    const resolvesAt = Math.min(SHIFT_GAME_MINUTES, currentMinute + incident.missionDurationMinutes);
    const result = resolveIncident(incident, chosen, save.resonance, resolvesAt);
    const next: SaveGame = {
      ...save,
      heroStates: markHeroesOnMission(save.heroStates, selected, incident.id, resolvesAt),
      shift: {
        ...save.shift,
        incidents: {
          ...save.shift.incidents,
          [incident.id]: {
            ...runtime,
            status: "dispatched",
            dispatchedAtGameMinute: currentMinute,
            resolvesAtGameMinute: resolvesAt,
            selectedHeroIds: [...selected],
            result
          }
        }
      },
      flags: save.flags.includes(`despacho_${incident.id}`) ? save.flags : [...save.flags, `despacho_${incident.id}`]
    };
    writeSave(next);
    setSave(next);
    setSelected([]);
    setMessage(`${chosen.map((hero) => hero.name).join(" + ")} enviados. Retorno estimado às ${formatGameTime(resolvesAt)}.`);
  }

  if (!save) return <main className="centerPage"><p>Carregando central...</p></main>;

  const gameMinute = save.shift.elapsedGameMinutes;
  const shiftFinished = save.shift.status === "finished";
  const pendingReports = save.shift.reportQueue.length;
  const waitingCount = activeIncidents.filter((item) => save.shift.incidents[item.id]?.status === "waiting").length;
  const dispatchedCount = activeIncidents.filter((item) => save.shift.incidents[item.id]?.status === "dispatched").length;
  const availableCount = operationalHeroes.filter((hero) => hero.status === "disponivel").length;
  const selectedRuntime = incident ? save.shift.incidents[incident.id] : null;
  const deadlineRemaining = selectedRuntime?.deadlineAtGameMinute != null ? Math.max(0, selectedRuntime.deadlineAtGameMinute - gameMinute) : null;

  return (
    <main className="agencyShell dispatchUi">
      <header className="opsHeader">
        <div className="brandLockup"><span className="brandMark">R</span><div><span>AGÊNCIA</span><strong>RESSONÂNCIA</strong></div></div>
        <div className="shiftClock"><small>DIA {String(save.player.currentDay).padStart(2, "0")} · EXPEDIENTE</small><strong>{formatGameTime(gameMinute)}</strong><span>08:00 — 18:00</span></div>
        <div className="headerActions settingsHost">
          <button className={`settingsButton ${settingsOpen ? "active" : ""}`} onClick={() => setSettingsOpen((value) => !value)} aria-expanded={settingsOpen} aria-label="Abrir configurações">⚙<span>CONFIGURAÇÕES</span></button>
          {settingsOpen && <div className="settingsMenu">
            <div className="settingsIdentity"><small>ANALISTA</small><strong>{save.player.name}</strong><span>Dia {save.player.currentDay} · salvamento local automático</span></div>
            <button onClick={saveNow}>SALVAR AGORA</button>
            <button onClick={restartShift}>REINICIAR EXPEDIENTE</button>
            <button className="settingsExit" onClick={saveAndExit}>SALVAR E SAIR</button>
          </div>}
        </div>
      </header>

      {save.shift.status === "not_started" && (
        <section className="shiftStartOverlay">
          <div className="shiftStartCard new"><span className="eyebrow">CENTRAL OFFLINE</span><h2>Preparar expediente</h2><p>O turno simula 10 horas operacionais em 15 minutos reais. Ocorrências surgem simultaneamente e equipes permanecem ocupadas até o retorno.</p><button className="button primary" onClick={beginShift}>INICIAR TURNO · 08:00</button></div>
        </section>
      )}

      <section className="opsSummary">
        <div><span className="summaryDot urgent" /><small>AGUARDANDO</small><strong>{waitingCount}</strong></div>
        <div><span className="summaryDot field" /><small>EM CAMPO</small><strong>{dispatchedCount}</strong></div>
        <div><span className="summaryDot available" /><small>DISPONÍVEIS</small><strong>{availableCount}/7</strong></div>
        <div><span className="summaryDot result" /><small>RESULTADOS</small><strong>{pendingReports}</strong></div>
        <div><span className="summaryDot missed" /><small>NÃO ATENDIDAS</small><strong>{missedIncidents.length}</strong></div>
      </section>

      <div className="opsWorkspace">
        <aside className="incidentRail" aria-label="Ocorrências ativas">
          <header className="railHeader"><div><span>OCORRÊNCIAS</span><small>FILA OPERACIONAL</small></div><strong>{activeIncidents.length}</strong></header>
          <div className="incidentRailList">
            {activeIncidents.length === 0 && <div className="railEmpty"><strong>SEM CHAMADOS ATIVOS</strong><span>A Central está aguardando novas ocorrências.</span></div>}
            {activeIncidents.map((item) => {
              const runtime = save.shift.incidents[item.id];
              const isWaiting = runtime.status === "waiting";
              const isResolved = runtime.status === "resolved";
              const remaining = runtime.deadlineAtGameMinute != null ? Math.max(0, runtime.deadlineAtGameMinute - gameMinute) : 0;
              const start = runtime.dispatchedAtGameMinute ?? gameMinute;
              const end = runtime.resolvesAtGameMinute ?? start;
              const missionDuration = Math.max(1, end - start);
              const progress = isResolved ? 100 : runtime.status === "dispatched" ? Math.max(0, Math.min(100, ((gameMinute - start) / missionDuration) * 100)) : 0;
              const selectedNames = (runtime.selectedHeroIds ?? []).map((id) => heroNameById[id] ?? id);
              const stateLabel = isResolved ? "RESULTADO DISPONÍVEL" : isWaiting ? "AGUARDANDO DESPACHO" : "EM OPERAÇÃO";
              return <button key={item.id} className={`incidentRailCard ${runtime.status} ${priorityClass(item.priority)} ${incidentId === item.id ? "active" : ""}`} onClick={() => isResolved && runtime.result ? openResult(runtime.result) : isWaiting ? openBriefingForIncident(item.id) : setIncidentId(item.id)}>
                <div className="incidentRailTop"><span className="incidentState"><i />{stateLabel}</span></div>
                <strong className="incidentRailTitle">{item.title}</strong>
                <div className="incidentRailMeta"><span>{item.district}</span><span>{isResolved ? "clique para ver resultado" : isWaiting ? `${remaining} min para decidir` : `retorno ${formatGameTime(end)}`}</span></div>
                {isWaiting ? <div className="deadlineBar"><i style={{ width: `${Math.max(6, Math.min(100, (remaining / Math.max(1, item.deadlineMinutes)) * 100))}%` }} /></div> : <>
                  <div className="fieldTeamMini">{runtime.selectedHeroIds?.map((heroId) => { const name = heroNameById[heroId] ?? heroId; const portrait = getHeroPortrait(heroId); return <span key={heroId} title={name}>{portrait ? <img src={portrait} alt="" /> : name.slice(0,2).toUpperCase()}</span>; })}<small>{selectedNames.join(" + ")}</small></div>
                  <div className="missionProgress"><i style={{ width: `${progress}%` }} /></div>
                  <div className="progressLabel"><span>{Math.round(progress)}%</span><span>{isResolved ? "RELATÓRIO PRONTO" : `${Math.max(0, end - gameMinute)} min restantes`}</span></div>
                </>}
              </button>;
            })}
          </div>
        </aside>

        <section className="mapStage mapStageWorkspace">
          <div className="mapToolbar"><span>MAPA TÁTICO</span><small>REDE MUNICIPAL / TEMPO REAL</small></div>
          <div className="cityMap cityMapPrimary">
            <div className="mapGridLines" />
            {districtLabels.map((district) => <span key={district.name} className="districtMapLabel" style={{ left: `${district.left}%`, top: `${district.top}%` }}>{district.name}</span>)}
            {activeIncidents.map((item) => {
              const runtime = save.shift.incidents[item.id];
              const remaining = runtime.deadlineAtGameMinute != null ? Math.max(0, runtime.deadlineAtGameMinute - gameMinute) : 0;
              const isResolved = runtime.status === "resolved";
              return <button key={item.id} style={incidentMapPosition(item.id, item.district)} className={`incidentMapMarker freeMarker ${priorityClass(item.priority)} ${runtime.status} ${incidentId === item.id ? "active" : ""}`} onClick={() => isResolved && runtime.result ? openResult(runtime.result) : runtime.status === "waiting" ? openBriefingForIncident(item.id) : setIncidentId(item.id)} title={`${item.title} · ${isResolved ? "resultado disponível" : runtime.status === "dispatched" ? `retorno ${formatGameTime(runtime.resolvesAtGameMinute ?? gameMinute)}` : `${remaining} min restantes`}`}>
                <b>{isResolved ? "✓" : runtime.status === "dispatched" ? "↗" : "!"}</b>
              </button>;
            })}
          </div>
        </section>

        <aside className="opsChatRail" aria-label="NEXO operações">
          <header className="chatHeader"><div><span className="chatAppIcon">N</span><div><strong>NEXO</strong><small>AGÊNCIA // OPERAÇÕES</small></div></div><span className="readOnlyBadge">SOMENTE LEITURA</span></header>
          <div className="chatFeed">
            {chatMessages.map((chat) => <article key={chat.id} className={`chatMessage ${chat.kind ?? "agent"}`}>
              <div className="chatAvatar">{(() => { const senderHero = operationalHeroes.find((hero) => hero.name === chat.sender); const portrait = senderHero ? getHeroPortrait(senderHero.id) : null; return portrait ? <img src={portrait} alt="" /> : chat.sender === "NEXO" ? "N" : chat.sender.slice(0,2).toUpperCase(); })()}</div>
              <div className="chatBubble"><div><strong>{chat.sender}</strong><time>{formatGameTime(chat.minute)}</time></div><p>{chat.text}</p></div>
            </article>)}
          </div>
          <footer className="chatLocked"><span>🔒</span><div><strong>Canal operacional</strong><small>Durante o expediente, o Analista acompanha as mensagens sem responder.</small></div></footer>
        </aside>

        <section className="heroCommandBar workspaceRoster">
          <div className="heroCommandHeader"><div><span>AGENTES</span><small>{availableCount}/7 livres · clique em qualquer retrato para abrir a ficha</small></div></div>
          <div className="heroBottomStrip">{operationalHeroes.map((hero) => <HeroCard key={hero.id} hero={hero} selected={briefingOpen && selected.includes(hero.id)} disabled={false} onSelect={() => handleHeroBarClick(hero.id)} onInfo={() => setHeroInfoId(hero.id)} />)}</div>
        </section>
      </div>

      {briefingOpen && incident && <div className="opsModalBackdrop" onMouseDown={closeBriefing}>
        <section className="missionBriefModal" onMouseDown={(event) => event.stopPropagation()}>
          <header><div><small>BRIEFING OPERACIONAL · {incident.district.toUpperCase()}</small><h2>{incident.title}</h2></div><button className="modalClose" onClick={closeBriefing}>×</button></header>
          <div className="briefGrid">
            <div className="briefNarrative"><span className="sectionLabel">O QUE ESTÁ ACONTECENDO</span><p>{incident.description}</p><div className="briefMeta"><span><small>RISCO</small><b>{incident.risk}</b></span><span><small>CONFIABILIDADE</small><b>{incident.reliability}</b></span><span><small>TEMPO PARA DECIDIR</small><b>{deadlineRemaining ?? 0} min</b></span><span><small>DURAÇÃO EST.</small><b>{incident.missionDurationMinutes} min</b></span></div></div>
            <div className="briefRequirements"><div className="requirementsHeading"><span className="sectionLabel">O QUE A MISSÃO EXIGE</span><div className={`successEstimate ${(missionAssessment?.successChance ?? 0) >= 75 ? "high" : (missionAssessment?.successChance ?? 0) >= 50 ? "medium" : "low"}`}><small>CHANCE ESTIMADA</small><strong>{selectedHeroes.length ? `${missionAssessment?.successChance ?? 0}%` : "—"}</strong></div></div><div className="requirementList">{missionAssessment?.requirements.map((req) => { const pct = Math.min(100, (req.provided / Math.max(req.required, 1)) * 100); return <div key={req.attribute} className={req.importance === "ESSENCIAL" ? "essential" : "important"}><div className="requirementTitle"><strong>{({strength:"Força",agility:"Agilidade",charisma:"Carisma",intelligence:"Inteligência",vigor:"Vigor"} as Record<string,string>)[req.attribute]}</strong><span>{req.importance}</span></div><div className="requirementNumbers"><b>{req.provided}</b><small>/ {req.required} recomendado</small></div><div className="requirementMeter"><i style={{width:`${pct}%`}} /><em style={{left:"100%"}} /></div></div>})}</div><div className="missionTagNeeds">{incident.recommendedTags.map((tag)=><span key={tag}>{tag}</span>)}</div><small className="briefHint">A marca indica a faixa recomendada, não uma exigência absoluta. A chance também considera poderes, especialidades, condição, Ressonância e incerteza das informações.</small></div>
          </div>
          <div className="briefTeam"><div className="briefTeamHeader"><div><span className="sectionLabel">SELECIONE {GAMEPLAY_CONFIG.minTeamSize}–{GAMEPLAY_CONFIG.maxTeamSize} HERÓIS</span><strong>{selected.length}/{GAMEPLAY_CONFIG.maxTeamSize} selecionados</strong></div><div className="briefAlerts">{alerts.map((alert)=><span key={alert}>{alert}</span>)}</div></div><div className="briefHeroGrid">{operationalHeroes.map((hero)=><article key={hero.id} className={`briefHero ${selected.includes(hero.id)?"selected":""} ${hero.status}`}><button className="briefHeroSelect" disabled={hero.status!=="disponivel" || save.shift.status!=="running"} onClick={()=>toggleHero(hero.id)}><span className="briefHeroPortrait">{getHeroPortrait(hero.id) ? <img src={getHeroPortrait(hero.id)!} alt={`Retrato de ${hero.name}`} /> : hero.name.slice(0,2).toUpperCase()}</span><strong>{hero.name}</strong><small>{hero.className} · {hero.trail}</small><em>{hero.status==="disponivel"?"DISPONÍVEL":hero.status==="em_missao"?"EM MISSÃO":hero.status==="desmaiado"?"DESMAIADO":"RECUPERAÇÃO"}</em></button><button className="briefHeroInfo" onClick={()=>setHeroInfoId(hero.id)}>VER FICHA</button></article>)}</div></div>
          <footer><div><small>COMPOSIÇÃO</small><strong>{selectedHeroes.length ? selectedHeroes.map((hero)=>hero.name).join(" + ") : "Selecione a equipe"}</strong><p>{message}</p></div><button className="briefDispatch" disabled={selected.length===0 || selectedRuntime?.status!=="waiting" || save.shift.status!=="running"} onClick={()=>{dispatch();setBriefingOpen(false);}}>DESPACHAR EQUIPE →</button></footer>
        </section>
      </div>}

      {reportResult && (() => {
        const reportIncident = incidents.find((item) => item.id === reportResult.incidentId);
        const reportTeam = heroes.filter((hero) => reportResult.selectedHeroIds.includes(hero.id));
        if (!reportIncident) return null;
        return <div className="opsModalBackdrop reportResultBackdrop" onMouseDown={() => setReportResult(null)}>
          <section className="reportResultModal" onMouseDown={(event) => event.stopPropagation()}>
            <header>
              <div><span className="sectionLabel">RESULTADO DA OCORRÊNCIA</span><h2>{reportIncident.title}</h2><p>{reportIncident.district} · concluída às {formatGameTime(reportResult.completedAtGameMinute)}</p></div>
              <span className={`outcomeBadge ${reportResult.outcome === "Sucesso" ? "success" : reportResult.outcome === "Falha" ? "failure" : "cost"}`}>{reportResult.outcome}</span>
            </header>
            <p className="reportResultSummary">{reportResult.summary}</p>
            <div className="reportResultStats">
              <span><small>EQUIPE</small><strong>{reportTeam.map((hero) => hero.name).join(" + ")}</strong></span>
              <span><small>ADEQUAÇÃO</small><strong>{Math.round(reportResult.attributeScore * 100)}%</strong></span>
              <span><small>RESSONÂNCIA</small><strong>{reportResult.resonanceScore >= 0 ? "+" : ""}{reportResult.resonanceScore.toFixed(1)}</strong></span>
            </div>
            <div className="reportResultColumns">
              <div><span className="sectionLabel">FATORES DECISIVOS</span>{reportResult.decisiveFactors.map((factor) => <p key={factor}>• {factor}</p>)}</div>
              <div><span className="sectionLabel">CONSEQUÊNCIAS</span>{reportResult.heroEffects.map((effect) => { const hero = heroes.find((item) => item.id === effect.heroId); return <p key={effect.heroId}>• {hero?.name}: {effect.healthDelta} Vida, {effect.energyDelta} Energia, +{effect.xpAwarded} XP.</p>; })}</div>
            </div>
            <footer><button className="briefDispatch resultAcknowledge" onClick={acknowledgeResult}>ARQUIVAR RESULTADO</button></footer>
          </section>
        </div>;
      })()}

      {infoHero && <div className="opsModalBackdrop heroInfoBackdrop" onMouseDown={()=>setHeroInfoId(null)}><section className="heroInfoModal heroInfoModalClean" onMouseDown={(event)=>event.stopPropagation()}>
        <button className="modalClose heroInfoClose" onClick={()=>setHeroInfoId(null)}>×</button>
        <div className="heroInfoBody heroInfoBodyClean">
          <aside className="heroIdentity heroIdentityClean"><span className="eyebrow">DOSSIÊ DE AGENTE</span><h2>{infoHero.name}</h2><p className="heroRoleLine">{infoHero.powerName} · {infoHero.className} / {infoHero.trail}</p><div className="styleTags">{infoHero.style.map((tag)=><span key={tag}>{tag}</span>)}</div><p>{infoHero.profile}</p><div className="conditionPanel conditionVitals"><span><small>VIDA · {getHealthState(infoHero.health, getMaxHealth(infoHero.attributes))}</small><b>{infoHero.health}/{getMaxHealth(infoHero.attributes)}</b><i className="vitalTrack"><i className={`vitalFill health ${infoHero.health / getMaxHealth(infoHero.attributes) <= .35 ? "critical" : infoHero.health / getMaxHealth(infoHero.attributes) <= .65 ? "warning" : ""}`} style={{width:`${(infoHero.health/getMaxHealth(infoHero.attributes))*100}%`}} /></i></span><span><small>ENERGIA · {getEnergyState(infoHero.energy, getMaxEnergy(infoHero.attributes))}</small><b>{infoHero.energy}/{getMaxEnergy(infoHero.attributes)}</b><i className="vitalTrack"><i className={`vitalFill energy ${infoHero.energy / getMaxEnergy(infoHero.attributes) <= .35 ? "critical" : infoHero.energy / getMaxEnergy(infoHero.attributes) <= .65 ? "warning" : ""}`} style={{width:`${(infoHero.energy/getMaxEnergy(infoHero.attributes))*100}%`}} /></i></span></div></aside>
          <div className="heroCapabilities"><div className="heroStatHeader"><div><span className="sectionLabel">ATRIBUTOS PESSOAIS</span><strong>NÍVEL {infoHero.level}</strong><small>{infoHero.xp} XP</small></div><span>Escala fixa 1–5</span></div><HeroRadar attributes={infoHero.attributes} /><div className="attributeRows compactFive">{Object.entries(infoHero.attributes).map(([key,value])=><div key={key}><span>{({strength:"Força",agility:"Agilidade",charisma:"Carisma",intelligence:"Inteligência",vigor:"Vigor"} as Record<string,string>)[key]}</span><i><b style={{width:`${value*20}%`}} /></i><strong>{value}/5</strong></div>)}</div><div className="capabilityColumns"><div><span className="sectionLabel">PONTOS FORTES</span>{infoHero.strengths.map((item)=><p key={item}>+ {item}</p>)}</div><div><span className="sectionLabel">LIMITAÇÕES</span>{infoHero.limitations.map((item)=><p key={item}>! {item}</p>)}</div></div></div>
        </div>
      </section></div>}

      {shiftFinished && <div className="shiftEndBar"><div><strong>18:00 · EXPEDIENTE ENCERRADO</strong><span>{pendingReports ? `Há ${pendingReports} relatório(s) pendente(s).` : "Central pronta para o desenvolvimento da equipe."}</span></div><button className="button primary" disabled={pendingReports > 0 || dispatchedCount > 0} onClick={() => { const next = { ...save, player: { ...save.player, developmentRequired: true } }; writeSave(next); setSave(next); router.push("/desenvolvimento"); }}>IR PARA DESENVOLVIMENTO</button></div>}

      <DevTools save={save} onSave={(next) => { setSave(next); setNow(Date.now()); }} onPost={() => router.push("/conversa")} />
    </main>
  );
}
