"use client";

import { publicPath } from "@/lib/publicPath";
import { ProgressiveTutorialCoach } from "@/components/ProgressiveTutorialCoach";
import { EdisonCoach } from "@/components/EdisonCoach";
import { heroes } from "@/game/data/heroes";
import { buildOperationalHeroes } from "@/game/selectors/operationalHeroes";
import { caseById, getIncidentsForDay, incidents } from "@/game/data/incidents";
import { getOperationalChatMessages } from "@/game/data/operationsChat";
import { GAMEPLAY_CONFIG } from "@/content/config/gameplay";
import { FIRST_TUTORIAL_HERO_ID, FIRST_TUTORIAL_INCIDENT_ID, tutorialCopy, tutorialLearned } from "@/content/narrative/tutorial";
import { PROGRESSIVE_TUTORIAL_FLAGS, progressiveTutorialCopy } from "@/content/narrative/progressiveTutorial";
import { calculateHeroMissionEffect, markHeroesOnMission } from "@/game/simulation/heroState";
import { acknowledgeMissionResult, advanceOperationalState, shouldPersistOperationalAdvance } from "@/game/simulation/operations";
import { analyzeTeam, getMissionAssessment, resolveIncident } from "@/game/simulation/resolveIncident";
import { createInitialShift, formatGameTime, resumeShiftClock, SHIFT_GAME_MINUTES, startShift } from "@/game/simulation/shift";
import type { DispatchResult, OperationalHero, SaveGame } from "@/game/types";
import { exportSaveJson, importSaveJson, isPostShiftOnlySave, loadSave, writeSave } from "@/lib/save";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { AgencyHeader } from "@/components/agency/AgencyHeader";
import { OperationsSummary } from "@/components/agency/OperationsSummary";
import { IncidentRail } from "@/components/agency/IncidentRail";
import { TacticalMap } from "@/components/agency/TacticalMap";
import { OperationsChatRail } from "@/components/agency/OperationsChatRail";
import { AgentRoster } from "@/components/agency/AgentRoster";
import { MissionBriefing } from "@/components/agency/MissionBriefing";
import { MobileDispatchNav, type MobilePanel } from "@/components/agency/MobileDispatchNav";
import { MobileDispatchExperience } from "@/components/agency/MobileDispatchExperience";


const DevTools = dynamic(() => import("@/components/DevTools").then((module) => module.DevTools), { ssr: false });
const AgencyManual = dynamic(() => import("@/components/AgencyManual").then((module) => module.AgencyManual), { ssr: false });
const MissionResultModal = dynamic(() => import("@/components/agency/MissionResultModal").then((module) => module.MissionResultModal), { ssr: false });
const HeroDossierModal = dynamic(() => import("@/components/agency/HeroDossierModal").then((module) => module.HeroDossierModal), { ssr: false });


export default function AgencyPage() {
  const router = useRouter();
  const [save, setSave] = useState<SaveGame | null>(null);
  const [incidentId, setIncidentId] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [message, setMessage] = useState("Inicie o expediente para receber os primeiros chamados.");
  const [briefingOpen, setBriefingOpen] = useState(false);
  const [heroInfoId, setHeroInfoId] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [reportResult, setReportResult] = useState<DispatchResult | null>(null);
  const [expiredFlashIds, setExpiredFlashIds] = useState<string[]>([]);
  const [briefingExpiredId, setBriefingExpiredId] = useState<string | null>(null);
  const [mobilePanel, setMobilePanel] = useState<MobilePanel>("incidents");
  const [confirmEndShift, setConfirmEndShift] = useState(false);
  const operationsFeedRef = useRef<HTMLDivElement | null>(null);
  const briefingOriginPanelRef = useRef<MobilePanel>("incidents");
  const clockPausedRef = useRef(false);
  const clockPauseStartedAtRef = useRef<number | null>(null);

  useEffect(() => {
    const current = loadSave();
    if (!current) return router.replace("/novo-jogo");
    if (isPostShiftOnlySave(current)) return router.replace("/conversa");
    if (current.player.developmentRequired) return router.replace("/desenvolvimento");
    const advanced = advanceOperationalState(current);
    if (advanced !== current && shouldPersistOperationalAdvance(current, advanced)) writeSave(advanced);
    setSave(advanced);
  }, [router]);

  useEffect(() => {
    if (!save || save.shift.status !== "not_started" || save.flags.includes("tutorial_active")) return;
    const next = { ...save, shift: startShift(save.shift) };
    writeSave(next);
    setSave(next);
    setMessage("08:00. Central em operação.");
  }, [save]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (clockPausedRef.current) return;
      const current = loadSave();
      if (!current) return;
      const advanced = advanceOperationalState(current);
      const justExpired = incidents.filter((item) => current.shift.incidents[item.id]?.status === "waiting" && advanced.shift.incidents[item.id]?.status === "expired").map((item) => item.id);
      if (justExpired.length) {
        setExpiredFlashIds((previous) => Array.from(new Set([...previous, ...justExpired])));
        window.setTimeout(() => setExpiredFlashIds((previous) => previous.filter((id) => !justExpired.includes(id))), 1300);
      }
      if (advanced !== current) {
        if (shouldPersistOperationalAdvance(current, advanced)) writeSave(advanced);
        setSave(advanced);
      }
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const operationalHeroes = useMemo<OperationalHero[]>(() => {
    if (!save) return [];
    return buildOperationalHeroes(save);
  }, [save?.heroStates, save?.heroProgression]);

  const activeIncidents = useMemo(() => {
    if (!save) return [];
    return incidents.filter((incident) => {
      const status = save.shift.incidents[incident.id]?.status;
      if (status === "waiting" || status === "dispatched") return true;
      if (status === "resolved") return save.shift.reportQueue.some((result) => result.incidentId === incident.id);
      return false;
    });
  }, [save?.shift.incidents, save?.shift.reportQueue]);

  const missedIncidents = useMemo(() => {
    if (!save) return [];
    return incidents.filter((incident) => save.shift.incidents[incident.id]?.status === "expired");
  }, [save?.shift.incidents]);

  useEffect(() => {
    if (briefingOpen && incidentId && save?.shift.incidents[incidentId]?.status === "expired") return;
    if (incidentId && activeIncidents.some((item) => item.id === incidentId)) return;
    const waiting = activeIncidents.find((item) => save?.shift.incidents[item.id]?.status === "waiting");
    setIncidentId(waiting?.id ?? activeIncidents[0]?.id ?? null);
    setSelected([]);
  }, [activeIncidents, incidentId, save?.shift.incidents, briefingOpen]);

  useEffect(() => {
    if (!save || !briefingOpen || !incidentId) return;
    if (save.shift.incidents[incidentId]?.status !== "expired") return;
    const expiredIncident = incidentId ? caseById[incidentId] : undefined;
    setBriefingExpiredId(incidentId);
    setMessage(`${expiredIncident?.title ?? "A ocorrência"} expirou antes do despacho.`);
    const timeout = window.setTimeout(() => {
      setBriefingOpen(false);
      setSelected([]);
      setBriefingExpiredId(null);
      setIncidentId(null);
      setMobilePanel("incidents");
    }, 1500);
    return () => window.clearTimeout(timeout);
  }, [save?.shift.incidents, briefingOpen, incidentId]);

  const incident = useMemo(() => (incidentId ? caseById[incidentId] : undefined) ?? null, [incidentId]);
  const selectedHeroes = useMemo(() => operationalHeroes.filter((hero) => selected.includes(hero.id)), [operationalHeroes, selected]);
  const alerts = useMemo(() => incident && save ? analyzeTeam(incident, selectedHeroes, save.resonance) : [], [incident, selectedHeroes, save?.resonance]);
  const missionAssessment = useMemo(() => incident && save ? getMissionAssessment(incident, selectedHeroes, save.resonance, save.player.currentDay) : null, [incident, selectedHeroes, save?.resonance, save?.player.currentDay]);
  const infoHero = useMemo(() => operationalHeroes.find((hero) => hero.id === heroInfoId) ?? null, [operationalHeroes, heroInfoId]);
  const chatMessages = useMemo(() => save ? getOperationalChatMessages(save) : [], [save]);
  const heroNameById = useMemo(() => Object.fromEntries(operationalHeroes.map((hero) => [hero.id, hero.name])), [operationalHeroes]);
  const progressiveTutorialKey = !save || save.flags.includes("tutorial_active") || !briefingOpen ? null
    : selectedHeroes.length >= 2 && !save.flags.includes(PROGRESSIVE_TUTORIAL_FLAGS.resonance) ? "resonance"
    : missionAssessment?.combos.length && !save.flags.includes(PROGRESSIVE_TUTORIAL_FLAGS.combo) ? "combo"
    : alerts.some((item) => item === "Agente cansado" || item === "Agente machucado") && !save.flags.includes(PROGRESSIVE_TUTORIAL_FLAGS.condition) ? "condition"
    : null;
  const clockPausedByUi = Boolean(heroInfoId || progressiveTutorialKey);

  useEffect(() => {
    const now = Date.now();

    if (clockPausedByUi) {
      if (clockPausedRef.current) return;
      const current = loadSave();
      if (current) {
        const advanced = advanceOperationalState(current, now);
        if (advanced !== current) {
          if (shouldPersistOperationalAdvance(current, advanced)) writeSave(advanced);
          setSave(advanced);
        }
      }
      clockPauseStartedAtRef.current = now;
      clockPausedRef.current = true;
      return;
    }

    if (!clockPausedRef.current) return;
    const pauseStartedAt = clockPauseStartedAtRef.current;
    clockPausedRef.current = false;
    clockPauseStartedAtRef.current = null;
    if (pauseStartedAt == null) return;

    const current = loadSave();
    if (!current || current.shift.status !== "running" || current.shift.startedAtEpochMs == null) return;
    const pauseDurationMs = Math.max(0, now - pauseStartedAt);
    const resumed: SaveGame = {
      ...current,
      shift: {
        ...current.shift,
        startedAtEpochMs: current.shift.startedAtEpochMs + pauseDurationMs,
      },
    };
    writeSave(resumed);
    setSave(resumed);
  }, [clockPausedByUi]);

  useEffect(() => {
    const feed = operationsFeedRef.current;
    if (!feed || chatMessages.length === 0) return;
    const frame = window.requestAnimationFrame(() => {
      feed.scrollTo({ top: feed.scrollHeight, behavior: "smooth" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [chatMessages.length, chatMessages.at(-1)?.id]);

  function beginShift() {
    if (!save) return;
    const tutorialOnly = save.flags.includes("tutorial_active") && save.player.currentDay === 1;
    const preparedShift = tutorialOnly ? {
      ...save.shift,
      incidents: {
        [FIRST_TUTORIAL_INCIDENT_ID]: save.shift.incidents[FIRST_TUTORIAL_INCIDENT_ID] ?? { incidentId: FIRST_TUTORIAL_INCIDENT_ID, status: "scheduled" as const, spawnedAtGameMinute: 0 }
      },
      reportQueue: []
    } : save.shift;
    const next = { ...save, shift: startShift(preparedShift) };
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
    router.push("/");
  }

  function exportCurrentSave() {
    if (!save || typeof window === "undefined") return;
    const blob = new Blob([exportSaveJson(save)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `ressonancia-save-dia-${save.player.currentDay}.json`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    setMessage("Save exportado.");
    setSettingsOpen(false);
  }

  async function importSaveFile(file: File) {
    try {
      const imported = importSaveJson(await file.text());
      if (!imported) { setMessage("O arquivo de save não é válido ou compatível."); return; }
      if (typeof window !== "undefined" && !window.confirm(`Importar o save de ${imported.player.name}, Dia ${imported.player.currentDay}? O progresso local atual será substituído.`)) return;
      writeSave(imported);
      setSave(imported);
      setIncidentId(null);
      setSelected([]);
      setBriefingOpen(false);
      setReportResult(null);
      setSettingsOpen(false);
      setMessage("Save importado com sucesso.");
    } catch {
      setMessage("Não foi possível importar este arquivo de save.");
    }
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
      shift: createInitialShift(save.player.currentDay, save.player.name),
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
    setMessage("Expediente reiniciado. A Central retomará a operação às 08:00.");
  }

  function openResult(result: DispatchResult) {
    setReportResult(result);
  }

  function acknowledgeResult() {
    if (!save || !reportResult) return;
    let next = acknowledgeMissionResult(save, reportResult);
    if (reportResult.incidentId === FIRST_TUTORIAL_INCIDENT_ID && save.flags.includes("tutorial_active")) {
      const remainingCases = getIncidentsForDay(save.player.currentDay, save.player.name).incidents.filter((item) => item.id !== FIRST_TUTORIAL_INCIDENT_ID);
      const releaseMinute = Math.min(SHIFT_GAME_MINUTES - 1, next.shift.elapsedGameMinutes + 6);
      // D1 pós-tutorial: cadência deliberadamente compacta. O último chamado entra
      // com bastante margem antes das 18:00 e nenhum intervalo vira um vazio de horas.
      const firstSpawn = releaseMinute + 8;
      const lastSpawn = Math.min(410, Math.max(firstSpawn, SHIFT_GAME_MINUTES - 190));
      const step = remainingCases.length <= 1 ? 0 : (lastSpawn - firstSpawn) / (remainingCases.length - 1);
      const releasedRuntimes = Object.fromEntries(remainingCases.map((item, index) => [item.id, {
        incidentId: item.id,
        status: "scheduled" as const,
        spawnedAtGameMinute: Math.min(410, Math.round(firstSpawn + step * index))
      }]));
      next = {
        ...next,
        flags: [...next.flags.filter((flag) => flag !== "tutorial_active"), "tutorial_complete"],
        shift: { ...next.shift, incidents: { ...next.shift.incidents, ...releasedRuntimes } }
      };
    }
    writeSave(next);
    setSave(next);
    setReportResult(null);
    setIncidentId(null);
    setMessage(`Relatório de ${caseById[reportResult.incidentId]?.title ?? "ocorrência"} arquivado.`);
  }
  function toggleHero(id: string) {
    const hero = operationalHeroes.find((item) => item.id === id);
    const tutorialLock = save?.flags.includes("tutorial_active") && incident?.id === FIRST_TUTORIAL_INCIDENT_ID;
    if (tutorialLock && id !== FIRST_TUTORIAL_HERO_ID) return setMessage("Neste primeiro despacho, Edison pediu que você teste a afinidade de Hélio com o incêndio.");
    if (!briefingOpen || !incident || selectedRuntime?.status !== "waiting") return;
    if (!hero || hero.status !== "disponivel" || save?.shift.status !== "running") return;
    setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : current.length < GAMEPLAY_CONFIG.maxTeamSize ? [...current, id] : current);
  }

  function openBriefingForIncident(id: string) {
    briefingOriginPanelRef.current = mobilePanel;
    setIncidentId(id);
    setSelected([]);
    // Desktop continues to use MissionBriefing inside TacticalMap. Mobile uses
    // MobileDispatchExperience as an independent sequential surface, so it no
    // longer depends on mounting the MAPA workspace to make the briefing visible.
    setBriefingOpen(true);
  }

  function closeBriefing() {
    setBriefingOpen(false);
    setSelected([]);
    setMobilePanel(briefingOriginPanelRef.current);
  }

  function dispatchFromBriefing() {
    dispatch();
    setBriefingOpen(false);
    setSelected([]);
    // Returning to the queue makes the next operational decision immediately
    // visible on narrow screens after a successful dispatch.
    setMobilePanel("incidents");
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
    if (save.flags.includes("tutorial_active") && incident.id === FIRST_TUTORIAL_INCIDENT_ID && (selected.length !== 1 || selected[0] !== FIRST_TUTORIAL_HERO_ID)) return setMessage("Para o primeiro despacho, selecione apenas Hélio.");

    const chosen = operationalHeroes.filter((hero) => selected.includes(hero.id));
    if (chosen.some((hero) => hero.status !== "disponivel")) return setMessage("Um dos heróis selecionados ficou indisponível.");

    const currentMinute = save.shift.elapsedGameMinutes;
    const tutorialDispatch = save.flags.includes("tutorial_active") && incident.id === FIRST_TUTORIAL_INCIDENT_ID;
    const resolvesAt = Math.min(SHIFT_GAME_MINUTES, currentMinute + (tutorialDispatch ? 12 : incident.missionDurationMinutes));
    let result = resolveIncident(incident, chosen, save.resonance, resolvesAt, save.player.currentDay);
    if (save.flags.includes("tutorial_active") && incident.id === FIRST_TUTORIAL_INCIDENT_ID && chosen.length === 1 && chosen[0].id === FIRST_TUTORIAL_HERO_ID) {
      result = {
        ...result,
        outcome: "Sucesso",
        summary: "Hélio conteve o princípio de incêndio antes que as chamas alcançassem os cilindros e os estabelecimentos próximos. A área foi estabilizada sem vítimas. Sua afinidade com Fogo permitiu controlar a propagação com precisão.",
        decisiveFactors: ["Primeiro despacho acompanhado por Edison.", "Afinidade contextual de poder: Hélio (Fogo).", "O chamado foi estabilizado antes de escalar."],
        heroEffects: chosen.map((hero) => calculateHeroMissionEffect(hero, "Sucesso", incident.risk)),
      };
    }
    const dispatchShift = tutorialDispatch ? resumeShiftClock(save.shift) : save.shift;
    const next: SaveGame = {
      ...save,
      heroStates: markHeroesOnMission(save.heroStates, selected, incident.id, resolvesAt),
      shift: {
        ...dispatchShift,
        incidents: {
          ...dispatchShift.incidents,
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


  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (heroInfoId) return setHeroInfoId(null);
      if (reportResult) return setReportResult(null);
      if (briefingOpen) return closeBriefing();
      if (settingsOpen) setSettingsOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [heroInfoId, reportResult, briefingOpen, settingsOpen]);

  if (!save) return <main className="centerPage"><p>Carregando central...</p></main>;

  const gameMinute = save.shift.elapsedGameMinutes;
  const shiftFinished = save.shift.status === "finished";
  const pendingReports = save.shift.reportQueue.length;
  const waitingCount = activeIncidents.filter((item) => save.shift.incidents[item.id]?.status === "waiting").length;
  const dispatchedCount = activeIncidents.filter((item) => save.shift.incidents[item.id]?.status === "dispatched").length;
  const availableCount = operationalHeroes.filter((hero) => hero.status === "disponivel").length;
  const selectedRuntime = incident ? save.shift.incidents[incident.id] : null;
  const deadlineRemaining = selectedRuntime?.deadlineAtGameMinute != null ? Math.max(0, selectedRuntime.deadlineAtGameMinute - gameMinute) : null;
  const tutorialActive = save.flags.includes("tutorial_active");
  const tutorialDone = save.flags.includes("tutorial_complete");
  const tutorialRuntime = save.shift.incidents[FIRST_TUTORIAL_INCIDENT_ID];
  const tutorialResultPending = save.shift.reportQueue.some((result) => result.incidentId === FIRST_TUTORIAL_INCIDENT_ID);
  const tutorialText = !tutorialActive ? null
    : save.shift.status === "not_started" ? { title: "DIA 1 · PRIMEIRO DESPACHO", body: "Edison acompanhará seu primeiro chamado. Inicie o expediente para abrir o SDH." }
    : tutorialResultPending ? { title: "RESULTADO DISPONÍVEL", body: tutorialCopy.reportBody }
    : tutorialRuntime?.status === "dispatched" ? { title: "HERÓI EM MISSÃO", body: tutorialCopy.waitingBody }
    : briefingOpen && incidentId === FIRST_TUTORIAL_INCIDENT_ID ? { title: selected.includes(FIRST_TUTORIAL_HERO_ID) ? "PRONTO PARA DESPACHAR" : "AFINIDADE DE PODER", body: selected.includes(FIRST_TUTORIAL_HERO_ID) ? tutorialCopy.dispatchBody : tutorialCopy.helioBody }
    : tutorialRuntime?.status === "waiting" ? { title: tutorialCopy.firstCaseTitle, body: tutorialCopy.firstCaseBody }
    : { title: "SISTEMA SDH", body: "Aguarde o primeiro chamado da Central." };

  function dismissProgressiveTutorial() {
    if (!progressiveTutorialKey || !save) return;
    const flag = PROGRESSIVE_TUTORIAL_FLAGS[progressiveTutorialKey];
    const next: SaveGame = { ...save, flags: Array.from(new Set([...save.flags, flag])) };
    writeSave(next);
    setSave(next);
  }

  return (
    <main className={`agencyShell dispatchUi ${shiftFinished ? "shiftIsFinished" : ""}${briefingOpen ? " briefingOpen" : ""}${reportResult ? " resultModalOpen" : ""}${heroInfoId ? " dossierModalOpen" : ""}`}>
      <div className="srOnly" role="status" aria-live="polite" aria-atomic="true">{message}</div>
      <AgencyHeader
        day={save.player.currentDay}
        gameMinute={gameMinute}
        playerName={save.player.name}
        settingsOpen={settingsOpen}
        clockPaused={clockPausedByUi}
        onToggleSettings={() => setSettingsOpen((value) => !value)}
        onSaveNow={saveNow}
        onRestartShift={restartShift}
        onSaveAndExit={saveAndExit}
        onExportSave={exportCurrentSave}
        onImportSave={importSaveFile}
      />

      {save.shift.status === "not_started" && tutorialActive && (
        <section className="shiftStartOverlay">
          <div className="shiftStartCard new edisonShiftStart"><img src={publicPath("/edison.jpg")} alt="Edison" /><div><span className="eyebrow">EDISON · ORIENTAÇÃO</span><h2>Seu primeiro turno</h2><p>Eu poderia te entregar um manual inteiro agora. Você vai aprender mais resolvendo um chamado. Eu acompanho o primeiro; depois, a Central fica nas suas mãos.</p><button className="button primary" onClick={beginShift}>INICIAR TURNO · 08:00</button></div></div>
        </section>
      )}

      <OperationsSummary waiting={waitingCount} dispatched={dispatchedCount} available={availableCount} pendingReports={pendingReports} missed={missedIncidents.length} />

      {shiftFinished && <section className="shiftCompleteStrip" aria-label="Expediente encerrado">
        <div><span className="eyebrow">18:00 · EXPEDIENTE ENCERRADO</span><strong>{pendingReports ? `Há ${pendingReports} relatório(s) pendente(s).` : "Central pronta para o desenvolvimento da equipe."}</strong></div>
        <button className="button primary" disabled={pendingReports > 0 || dispatchedCount > 0} onClick={() => setConfirmEndShift(true)}>ENCERRAR TURNO → DESENVOLVIMENTO</button>
      </section>}

      {progressiveTutorialKey && <ProgressiveTutorialCoach className="dispatchTutorial" {...progressiveTutorialCopy[progressiveTutorialKey]} onDismiss={dismissProgressiveTutorial} actionLabel="REGISTRAR" />}
      {tutorialText && <EdisonCoach
        className={`dispatchCoreTutorial${briefingOpen && incidentId === FIRST_TUTORIAL_INCIDENT_ID ? " firstCaseTutorialBubble" : ""}${reportResult?.incidentId === FIRST_TUTORIAL_INCIDENT_ID ? " firstResultTutorialBubble" : ""}`}
        eyebrow="EDISON · TUTORIAL"
        title={tutorialText.title}
        body={tutorialText.body}
        targetLabel={
          save.shift.status === "not_started" ? "Inicie o turno para abrir a Central"
          : reportResult?.incidentId === FIRST_TUTORIAL_INCIDENT_ID ? "Revise o resultado e arquive quando terminar"
          : briefingOpen && incidentId === FIRST_TUTORIAL_INCIDENT_ID ? (selected.includes(FIRST_TUTORIAL_HERO_ID) ? "Confira a previsão e despache a equipe" : "Selecione Hélio para este primeiro chamado")
          : tutorialResultPending ? "Abra o resultado disponível"
          : tutorialRuntime?.status === "waiting" ? "Abra o chamado E-04"
          : undefined
        }
        showSpotlight={false}
      /> }
      <AgencyManual save={save} className="agencyManualAgency" />
      {tutorialDone && save.player.currentDay === 1 && <aside className="tutorialCompleteCard"><img src={publicPath("/edison.jpg")} alt="Edison" /><div className="tutorialCompleteCopy"><small>{tutorialCopy.completeTitle}</small><strong>Primeiro despacho concluído.</strong><p>Você já conhece o ciclo básico. A Central vai liberar o restante dos chamados do Dia 1.</p><div className="tutorialCompleteSkills">{tutorialLearned.slice(0, 3).map((item) => <span key={item}>✓ {item}</span>)}</div><button onClick={() => { const next = { ...save, flags: save.flags.filter((flag) => flag !== "tutorial_complete") }; writeSave(next); setSave(next); }}>ASSUMIR A CENTRAL →</button></div></aside>}

      <MobileDispatchExperience
        save={save}
        activeIncidents={activeIncidents}
        operationalHeroes={operationalHeroes}
        gameMinute={gameMinute}
        waitingCount={waitingCount}
        dispatchedCount={dispatchedCount}
        availableCount={availableCount}
        pendingReports={pendingReports}
        missedCount={missedIncidents.length}
        incident={incident}
        runtime={selectedRuntime}
        deadlineRemaining={deadlineRemaining}
        assessment={missionAssessment}
        selectedHeroes={selectedHeroes}
        selectedIds={selected}
        alerts={alerts}
        heroNameById={heroNameById}
        chatMessages={chatMessages}
        reportResult={reportResult}
        tutorial={tutorialText ? { ...tutorialText, targetLabel: reportResult?.incidentId === FIRST_TUTORIAL_INCIDENT_ID ? "Revise o resultado e arquive quando terminar" : briefingOpen && incidentId === FIRST_TUTORIAL_INCIDENT_ID ? (selected.includes(FIRST_TUTORIAL_HERO_ID) ? "Confira a previsão e despache a equipe" : "Selecione Hélio para este primeiro chamado") : tutorialResultPending ? "Abra o resultado disponível" : tutorialRuntime?.status === "waiting" ? "Abra o chamado E-04" : undefined } : null}
        progressiveTutorial={progressiveTutorialKey ? progressiveTutorialCopy[progressiveTutorialKey] : null}
        progressiveAction={dismissProgressiveTutorial}
        tutorialActive={tutorialActive}
        tutorialIncidentId={FIRST_TUTORIAL_INCIDENT_ID}
        tutorialHeroId={FIRST_TUTORIAL_HERO_ID}
        onSelectIncident={setIncidentId}
        onOpenBriefing={openBriefingForIncident}
        onCloseBriefing={closeBriefing}
        onOpenResult={openResult}
        onToggleHero={toggleHero}
        onOpenHero={setHeroInfoId}
        onDispatch={dispatchFromBriefing}
        onAcknowledgeResult={acknowledgeResult}
      />

      <MobileDispatchNav current={mobilePanel} waitingCount={waitingCount} availableCount={availableCount} onChange={setMobilePanel} />

      <div className={`opsWorkspace mobilePanel-${mobilePanel}`}>
        <IncidentRail save={save} activeIncidents={activeIncidents} expiredFlashIds={expiredFlashIds} incidentId={incidentId} tutorialActive={tutorialActive} tutorialIncidentId={FIRST_TUTORIAL_INCIDENT_ID} gameMinute={gameMinute} heroNameById={heroNameById} onOpenBriefing={openBriefingForIncident} onOpenResult={openResult} onSelectIncident={setIncidentId} />

        <TacticalMap save={save} activeIncidents={activeIncidents} incidentId={incidentId} gameMinute={gameMinute} onOpenBriefing={openBriefingForIncident} onOpenResult={openResult} onSelectIncident={setIncidentId}>
          {briefingOpen && incident && <MissionBriefing
            incident={incident}
            runtime={selectedRuntime}
            save={save}
            deadlineRemaining={deadlineRemaining}
            assessment={missionAssessment}
            selectedHeroes={selectedHeroes}
            selectedIds={selected}
            alerts={alerts}
            operationalHeroes={operationalHeroes}
            message={message}
            recentOperationsMessages={chatMessages.slice(-3)}
            tutorialActive={tutorialActive}
            tutorialIncidentId={FIRST_TUTORIAL_INCIDENT_ID}
            tutorialHeroId={FIRST_TUTORIAL_HERO_ID}
            expired={briefingExpiredId === incident.id}
            onClose={closeBriefing}
            onToggleHero={toggleHero}
            onOpenHero={setHeroInfoId}
            onDispatch={dispatchFromBriefing}
          />}
        </TacticalMap>

        <OperationsChatRail messages={chatMessages} feedRef={operationsFeedRef} />
        <AgentRoster heroes={operationalHeroes} briefingOpen={briefingOpen} selectedIds={selected} availableCount={availableCount} onSelect={handleHeroBarClick} onInfo={setHeroInfoId} />
      </div>


      {confirmEndShift && <div className="nexoNextDayBackdrop" role="presentation" onMouseDown={() => setConfirmEndShift(false)}>
        <section className="nexoNextDayConfirm" role="dialog" aria-modal="true" aria-labelledby="agency-end-shift-title" onMouseDown={(event) => event.stopPropagation()}>
          <h2 id="agency-end-shift-title">Encerrar o turno?</h2>
          <p>O expediente operacional terminou. Ao confirmar, você seguirá para Desenvolvimento e depois para o NEXO da noite. Relatórios e missões em andamento precisam estar resolvidos antes de avançar.</p>
          <div className="nexoNextDayActions">
            <button type="button" className="button primary" onClick={() => { const next: SaveGame = { ...save, player: { ...save.player, developmentRequired: true } }; writeSave(next); setSave(next); setConfirmEndShift(false); router.push("/desenvolvimento"); }}>CONFIRMAR E ENCERRAR</button>
            <button type="button" className="button" autoFocus onClick={() => setConfirmEndShift(false)}>VOLTAR À CENTRAL</button>
          </div>
        </section>
      </div>}

      {reportResult && (() => { const reportIncident = caseById[reportResult.incidentId]; return reportIncident ? <MissionResultModal result={reportResult} incident={reportIncident} onClose={() => setReportResult(null)} onAcknowledge={acknowledgeResult} /> : null; })()}
      {infoHero && <HeroDossierModal hero={infoHero} onClose={() => setHeroInfoId(null)} />}

      <DevTools save={save} onSave={setSave} onPost={() => router.push("/conversa")} onDevelopment={() => router.push("/desenvolvimento")} />
    </main>
  );
}
