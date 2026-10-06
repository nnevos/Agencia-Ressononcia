import { getHeroPortrait } from "@/game/data/heroPortraits";
import { incidents } from "@/game/data/incidents";
import { formatGameTime } from "@/game/simulation/shift";
import type { DispatchResult, Incident, SaveGame } from "@/game/types";

function priorityClass(priority: string) { return priority.toLowerCase(); }

export function IncidentRail({
  save,
  activeIncidents,
  expiredFlashIds,
  incidentId,
  tutorialActive,
  tutorialIncidentId,
  gameMinute,
  heroNameById,
  onOpenBriefing,
  onOpenResult,
  onSelectIncident,
}: {
  save: SaveGame;
  activeIncidents: Incident[];
  expiredFlashIds: string[];
  incidentId: string | null;
  tutorialActive: boolean;
  tutorialIncidentId: string;
  gameMinute: number;
  heroNameById: Record<string, string>;
  onOpenBriefing: (id: string) => void;
  onOpenResult: (result: DispatchResult) => void;
  onSelectIncident: (id: string) => void;
}) {
  return <aside className="incidentRail" aria-label="Ocorrências ativas">
    <header className="railHeader"><div><span>OCORRÊNCIAS</span><small>FILA OPERACIONAL</small></div><strong>{activeIncidents.length}</strong></header>
    <div className="incidentRailList">
      {expiredFlashIds.map((id) => { const expired = incidents.find((item) => item.id === id); return expired ? <div key={`expired-${id}`} className="incidentRailCard expired incidentExpiryFlash" role="status"><div className="incidentRailTop"><span className="incidentState"><i />TEMPO ESGOTADO</span></div><strong className="incidentRailTitle">{expired.title}</strong><div className="incidentRailMeta"><span>{expired.district}</span><span>ocorrência perdida</span></div></div> : null; })}
      {activeIncidents.length === 0 && expiredFlashIds.length === 0 && <div className="railEmpty"><strong>SEM CHAMADOS ATIVOS</strong><span>A Central está aguardando novas ocorrências.</span></div>}
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
        const isTutorialTarget = tutorialActive && item.id === tutorialIncidentId;
        const stateLabel = isResolved ? "RESULTADO DISPONÍVEL" : isWaiting ? "AGUARDANDO DESPACHO" : "EM OPERAÇÃO";
        return <button key={item.id} className={`incidentRailCard ${runtime.status} ${priorityClass(item.priority)} ${incidentId === item.id ? "active" : ""} ${isTutorialTarget ? "tutorialTarget" : ""}`} onClick={() => isResolved && runtime.result ? onOpenResult(runtime.result) : isWaiting ? onOpenBriefing(item.id) : onSelectIncident(item.id)} aria-pressed={incidentId === item.id}>
          <div className="incidentRailTop"><span className="incidentState"><i />{stateLabel}</span></div>
          <strong className="incidentRailTitle">{item.title}</strong>
          <div className="incidentRailMeta"><span>{item.district}</span><span>{isResolved ? "clique para ver resultado" : isWaiting ? (isTutorialTarget ? "sem limite no tutorial" : `${remaining} min para decidir`) : `retorno ${formatGameTime(end)}`}</span></div>
          {isWaiting ? <div className="deadlineBar" aria-hidden="true"><i style={{ width: isTutorialTarget ? "100%" : `${Math.max(6, Math.min(100, (remaining / Math.max(1, item.deadlineMinutes)) * 100))}%` }} /></div> : <>
            <div className="fieldTeamMini">{runtime.selectedHeroIds?.map((heroId) => { const name = heroNameById[heroId] ?? heroId; const portrait = getHeroPortrait(heroId); return <span key={heroId} title={name}>{portrait ? <img src={portrait} alt="" /> : name.slice(0,2).toUpperCase()}</span>; })}<small>{selectedNames.join(" + ")}</small></div>
            <div className="missionProgress" aria-hidden="true"><i style={{ width: `${progress}%` }} /></div>
            <div className="progressLabel"><span>{Math.round(progress)}%</span><span>{isResolved ? "RELATÓRIO PRONTO" : `${Math.max(0, end - gameMinute)} min restantes`}</span></div>
          </>}
        </button>;
      })}
    </div>
  </aside>;
}
