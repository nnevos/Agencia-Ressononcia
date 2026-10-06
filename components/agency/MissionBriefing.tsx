import { MissionRequirementRadar } from "@/components/MissionRequirementRadar";
import { GAMEPLAY_CONFIG } from "@/content/config/gameplay";
import { getHeroPortrait } from "@/game/data/heroPortraits";
import { heroes } from "@/game/data/heroes";
import type { Incident, IncidentRuntime, OperationalHero, SaveGame } from "@/game/types";
import type { getMissionAssessment } from "@/game/simulation/resolveIncident";

export type TutorialBrief = { title: string; body: string } | null;

type Assessment = ReturnType<typeof getMissionAssessment>;

export function MissionBriefing({
  incident,
  runtime,
  save,
  deadlineRemaining,
  assessment,
  selectedHeroes,
  selectedIds,
  alerts,
  operationalHeroes,
  message,
  tutorialActive,
  tutorialIncidentId,
  tutorialHeroId,
  tutorialText,
  expired,
  onClose,
  onToggleHero,
  onOpenHero,
  onDispatch,
}: {
  incident: Incident;
  runtime: IncidentRuntime | null | undefined;
  save: SaveGame;
  deadlineRemaining: number | null;
  assessment: Assessment | null;
  selectedHeroes: OperationalHero[];
  selectedIds: string[];
  alerts: string[];
  operationalHeroes: OperationalHero[];
  message: string;
  tutorialActive: boolean;
  tutorialIncidentId: string;
  tutorialHeroId: string;
  tutorialText: TutorialBrief;
  expired: boolean;
  onClose: () => void;
  onToggleHero: (id: string) => void;
  onOpenHero: (id: string) => void;
  onDispatch: () => void;
}) {
  return <div className="mapBriefingLayer" role="presentation">
    <section className={`missionBriefModal${expired ? " incidentExpiredModal" : ""}`} role="dialog" aria-modal="true" aria-labelledby="mission-brief-title">
      <header><div><small>BRIEFING OPERACIONAL · {incident.district.toUpperCase()}</small><h2 id="mission-brief-title">{incident.title}</h2></div><button className="modalClose" onClick={onClose} aria-label="Fechar briefing">×</button></header>
      {expired && <div className="incidentExpiredBanner" role="status">TEMPO ESGOTADO · ESTA OCORRÊNCIA NÃO ACEITA MAIS DESPACHO</div>}
      <div className="briefGrid">
        <div className="briefNarrative"><span className="sectionLabel">O QUE ESTÁ ACONTECENDO</span><p>{incident.description}</p><div className="briefMeta"><span><small>RISCO</small><b>{incident.risk}</b></span><span><small>CONFIABILIDADE</small><b>{incident.reliability}</b></span><span><small>TEMPO PARA DECIDIR</small><b>{tutorialActive && incident.id === tutorialIncidentId ? "SEM LIMITE" : `${deadlineRemaining ?? 0} min`}</b></span><span><small>DURAÇÃO EST.</small><b>{tutorialActive && incident.id === tutorialIncidentId ? 12 : incident.missionDurationMinutes} min</b></span></div></div>
        <div className={`briefRequirements ${tutorialActive && incident.id === tutorialIncidentId && selectedIds.includes(tutorialHeroId) ? "tutorialTarget" : ""}`}><div className="requirementsHeading"><span className="sectionLabel">O QUE A MISSÃO EXIGE</span><div className={`successEstimate ${(assessment?.successChance ?? 0) >= 75 ? "high" : (assessment?.successChance ?? 0) >= 50 ? "medium" : "low"}`}><small>CHANCE ESTIMADA</small><strong>{selectedHeroes.length ? `${assessment?.successChance ?? 0}%` : "—"}</strong></div></div>{assessment && <MissionRequirementRadar heroes={selectedHeroes} requirements={assessment.requirements} />}<div className="missionTagNeeds">{incident.recommendedTags.map((tag)=><span key={tag} className={assessment?.matchedTags?.includes(tag) ? "covered" : "missing"}>{assessment?.matchedTags?.includes(tag) ? "✓ " : "○ "}{tag}</span>)}</div>{incident.powerAffinityHeroIds?.length ? <div className="powerAffinityNeeds"><small>AFINIDADE CONTEXTUAL DE PODER</small><div>{incident.powerAffinityHeroIds.map((heroId) => { const hero = heroes.find((item) => item.id === heroId); const active = selectedIds.includes(heroId); return <span key={heroId} className={active ? "active" : ""}>{active ? "✓ " : "◇ "}{hero?.powerName ?? heroId}{hero ? ` · ${hero.name}` : ""}</span>; })}</div></div> : null}<small className="briefHint">O contorno pontilhado mostra o necessário para o caso; a área preenchida mostra a equipe selecionada. Afinidade de poder continua sendo uma vantagem contextual, nunca uma exigência exclusiva. A chance também considera técnicas, condição, Ressonância e incerteza das informações.</small></div>
      </div>
      <div className="briefTeam mobileBriefTeam"><div className="briefTeamHeader"><div><span className="sectionLabel">SELECIONE {GAMEPLAY_CONFIG.minTeamSize}–{GAMEPLAY_CONFIG.maxTeamSize} HERÓIS</span><strong>{selectedIds.length}/{GAMEPLAY_CONFIG.maxTeamSize} selecionados</strong></div><div className="briefAlerts">{alerts.map((alert)=><span key={alert}>{alert}</span>)}</div></div><div className="briefHeroGrid">{operationalHeroes.map((hero)=><article key={hero.id} className={`briefHero ${selectedIds.includes(hero.id)?"selected":""} ${hero.status} ${tutorialActive && incident.id === tutorialIncidentId && hero.id === tutorialHeroId && !selectedIds.includes(tutorialHeroId) ? "tutorialTarget" : ""}`}><button className="briefHeroSelect" disabled={hero.status!=="disponivel" || save.shift.status!=="running" || (tutorialActive && incident.id === tutorialIncidentId && hero.id !== tutorialHeroId)} onClick={()=>onToggleHero(hero.id)}><span className="briefHeroPortrait">{getHeroPortrait(hero.id) ? <img src={getHeroPortrait(hero.id)!} alt={`Retrato de ${hero.name}`} /> : hero.name.slice(0,2).toUpperCase()}</span><strong>{hero.name}</strong><small>{hero.className} · {hero.trail}</small><em>{hero.status==="disponivel"?"DISPONÍVEL":hero.status==="em_missao"?"EM MISSÃO":hero.status==="desmaiado"?"DESMAIADO":"RECUPERAÇÃO"}</em></button><button className="briefHeroInfo" onClick={()=>onOpenHero(hero.id)}>VER FICHA</button></article>)}</div></div>
      <footer><div className="briefFooterCopy"><small>COMPOSIÇÃO</small><strong>{selectedHeroes.length ? selectedHeroes.map((hero)=>hero.name).join(" + ") : "Selecione a equipe na barra de agentes"}</strong><p>{message}</p><div className="briefDesktopAlerts">{alerts.map((alert)=><span key={alert}>{alert}</span>)}</div></div><button className={`briefDispatch ${tutorialActive && incident.id === tutorialIncidentId && selectedIds.includes(tutorialHeroId) ? "tutorialTarget" : ""}`} disabled={selectedIds.length===0 || runtime?.status!=="waiting" || save.shift.status!=="running"} onClick={onDispatch}>DESPACHAR EQUIPE →</button></footer>
    </section>
  </div>;
}
