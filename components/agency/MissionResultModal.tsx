import { heroById } from "@/game/data/heroes";
import { formatGameTime } from "@/game/simulation/shift";
import type { DispatchResult, Incident } from "@/game/types";

export function MissionResultModal({ result, incident, onClose, onAcknowledge }: { result: DispatchResult; incident: Incident; onClose: () => void; onAcknowledge: () => void }) {
  const reportTeam = result.selectedHeroIds.flatMap((id) => heroById[id] ? [heroById[id]] : []);
  return <div className="opsModalBackdrop reportResultBackdrop" onMouseDown={onClose}>
    <section className="reportResultModal" role="dialog" aria-modal="true" aria-labelledby="result-title" onMouseDown={(event) => event.stopPropagation()}>
      <header><div><span className="sectionLabel">RESULTADO DA OCORRÊNCIA</span><h2 id="result-title">{incident.title}</h2><p>{incident.district} · concluída às {formatGameTime(result.completedAtGameMinute)}</p></div><span className={`outcomeBadge ${result.outcome === "Sucesso" ? "success" : result.outcome === "Falha" ? "failure" : "cost"}`}>{result.outcome}</span></header>
      <div className="reportIncidentContext"><small>CHAMADO ORIGINAL</small><p>{incident.description}</p></div><p className="reportResultSummary"><small>COMO FOI RESOLVIDO</small>{result.summary}</p>
      <div className="reportResultStats"><span><small>EQUIPE</small><strong>{reportTeam.map((hero) => hero.name).join(" + ")}</strong></span><span><small>ADEQUAÇÃO</small><strong>{Math.round(result.attributeScore * 100)}%</strong></span><span><small>RESSONÂNCIA</small><strong>{result.resonanceScore >= 0 ? "+" : ""}{result.resonanceScore.toFixed(1)}</strong></span></div>
      <div className="reportResultColumns"><div><span className="sectionLabel">FATORES DECISIVOS</span>{result.decisiveFactors.map((factor) => <p key={factor}>• {factor}</p>)}</div><div><span className="sectionLabel">CONSEQUÊNCIAS</span>{result.heroEffects.map((effect) => { const hero = heroById[effect.heroId]; return <p key={effect.heroId}>• {hero?.name}: {effect.healthDelta} Vida, {effect.energyDelta} Energia, +{effect.xpAwarded} XP.</p>; })}</div></div>
      <footer><button className="briefDispatch resultAcknowledge" onClick={onAcknowledge}>ARQUIVAR RESULTADO</button></footer>
    </section>
  </div>;
}
