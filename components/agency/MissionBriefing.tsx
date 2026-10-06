import { MissionRequirementRadar } from "@/components/MissionRequirementRadar";
import { GAMEPLAY_CONFIG } from "@/content/config/gameplay";
import { getHeroPortrait } from "@/game/data/heroPortraits";
import { heroById } from "@/game/data/heroes";
import { formatGameTime } from "@/game/simulation/shift";
import type { OperationsChatMessage } from "@/components/agency/OperationsChatRail";
import type { Incident, IncidentRuntime, OperationalHero, SaveGame } from "@/game/types";
import type { getMissionAssessment } from "@/game/simulation/resolveIncident";

type Assessment = ReturnType<typeof getMissionAssessment>;

function PowerAffinityList({ incident, selectedIds }: { incident: Incident; selectedIds: string[] }) {
  if (!incident.powerAffinityHeroIds?.length) return null;
  return <div className="powerAffinityNeeds">
    <small>AFINIDADE CONTEXTUAL DE PODER</small>
    <div>{incident.powerAffinityHeroIds.map((heroId) => {
      const hero = heroById[heroId];
      const active = selectedIds.includes(heroId);
      return <span key={heroId} className={active ? "active" : ""}>{active ? "✓ " : "◇ "}{hero?.powerName ?? heroId}{hero ? ` · ${hero.name}` : ""}</span>;
    })}</div>
  </div>;
}

function BriefHeroCard({
  hero,
  selected,
  selectable,
  tutorialTarget,
  onToggle,
  onOpen,
}: {
  hero: OperationalHero;
  selected: boolean;
  selectable: boolean;
  tutorialTarget: boolean;
  onToggle: () => void;
  onOpen: () => void;
}) {
  const portrait = getHeroPortrait(hero.id);
  const statusLabel = hero.status === "disponivel" ? "DISPONÍVEL"
    : hero.status === "em_missao" ? "EM MISSÃO"
    : hero.status === "desmaiado" ? "DESMAIADO"
    : "RECUPERAÇÃO";

  return <article className={`briefHero ${selected ? "selected" : ""} ${hero.status} ${tutorialTarget ? "tutorialTarget" : ""}`}>
    <button type="button" className="briefHeroSelect" disabled={!selectable} onClick={onToggle} aria-pressed={selected} aria-label={`${selected ? "Remover" : "Selecionar"} ${hero.name} da equipe`}>
      <span className="briefHeroPortrait">{portrait ? <img src={portrait} alt={`Retrato de ${hero.name}`} /> : hero.name.slice(0, 2).toUpperCase()}</span>
      <strong>{hero.name}</strong>
      <small>{hero.className} · {hero.trail}</small>
      <em>{statusLabel}</em>
      <i className="briefHeroSelectionMark" aria-hidden="true">{selected ? "✓" : "+"}</i>
    </button>
    <button type="button" className="briefHeroInfo" onClick={onOpen}>FICHA</button>
  </article>;
}

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
  recentOperationsMessages,
  tutorialActive,
  tutorialIncidentId,
  tutorialHeroId,
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
  recentOperationsMessages: OperationsChatMessage[];
  tutorialActive: boolean;
  tutorialIncidentId: string;
  tutorialHeroId: string;
  expired: boolean;
  onClose: () => void;
  onToggleHero: (id: string) => void;
  onOpenHero: (id: string) => void;
  onDispatch: () => void;
}) {
  const isTutorialIncident = tutorialActive && incident.id === tutorialIncidentId;
  const tutorialHeroSelected = selectedIds.includes(tutorialHeroId);

  return <div className="mapBriefingLayer" role="presentation">
    <section className={`missionBriefModal${expired ? " incidentExpiredModal" : ""}`} role="dialog" aria-modal="true" aria-labelledby="mission-brief-title">
      <header>
        <div><small>BRIEFING OPERACIONAL · {incident.district.toUpperCase()}</small><h2 id="mission-brief-title">{incident.title}</h2></div>
        <button type="button" className="modalClose" onClick={onClose} aria-label="Fechar briefing">×</button>
      </header>

      {expired && <div className="incidentExpiredBanner" role="status">TEMPO ESGOTADO · ESTA OCORRÊNCIA NÃO ACEITA MAIS DESPACHO</div>}

      <div className="briefScrollBody">
      <div className="briefGrid">
        <div className="briefNarrative">
          <span className="sectionLabel">O QUE ESTÁ ACONTECENDO</span>
          <p>{incident.description}</p>
          <div className="briefMeta">
            <span><small>RISCO</small><b>{incident.risk}</b></span>
            <span><small>CONFIABILIDADE</small><b>{incident.reliability}</b></span>
            <span><small>TEMPO PARA DECIDIR</small><b>{isTutorialIncident ? "SEM LIMITE" : `${deadlineRemaining ?? 0} min`}</b></span>
            <span><small>DURAÇÃO EST.</small><b>{isTutorialIncident ? 12 : incident.missionDurationMinutes} min</b></span>
          </div>
        </div>

        <div className={`briefRequirements ${isTutorialIncident && tutorialHeroSelected ? "tutorialTarget" : ""}`}>
          <div className="requirementsHeading">
            <span className="sectionLabel">O QUE A MISSÃO EXIGE</span>
            <div className={`successEstimate ${(assessment?.successChance ?? 0) >= 75 ? "high" : (assessment?.successChance ?? 0) >= 50 ? "medium" : "low"}`}>
              <small>CHANCE ESTIMADA</small><strong>{selectedHeroes.length ? `${assessment?.successChance ?? 0}%` : "—"}</strong>
            </div>
          </div>
          {assessment && <MissionRequirementRadar heroes={selectedHeroes} requirements={assessment.requirements} />}
          <div className="missionTagNeeds">{incident.recommendedTags.map((tag) => <span key={tag} className={assessment?.matchedTags?.includes(tag) ? "covered" : "missing"}>{assessment?.matchedTags?.includes(tag) ? "✓ " : "○ "}{tag}</span>)}</div>
          <PowerAffinityList incident={incident} selectedIds={selectedIds} />
          <small className="briefHint">O contorno pontilhado mostra o necessário para o caso; a área preenchida mostra a equipe selecionada. Afinidade de poder continua sendo uma vantagem contextual, nunca uma exigência exclusiva. A chance também considera técnicas, condição, Ressonância e incerteza das informações.</small>
        </div>
      </div>

      {recentOperationsMessages.length > 0 && <section className="briefOpsMessages" aria-label="Mensagens operacionais recentes">
        <header><div><small>NEXO · OPERAÇÕES</small><strong>Mensagens recentes</strong></div><span>somente leitura</span></header>
        <div className="briefOpsMessageList">{recentOperationsMessages.map((chat) => <article key={chat.id} className={`briefOpsMessage ${chat.kind ?? "agent"}`}>
          <div><strong>{chat.sender}</strong><time>{formatGameTime(chat.minute)}</time></div>
          <p>{chat.text}</p>
        </article>)}</div>
      </section>}

      <div className="briefTeam mobileBriefTeam">
        <div className="briefTeamHeader">
          <div><span className="sectionLabel">SELECIONE {GAMEPLAY_CONFIG.minTeamSize}–{GAMEPLAY_CONFIG.maxTeamSize} HERÓIS</span><strong>{selectedIds.length}/{GAMEPLAY_CONFIG.maxTeamSize} selecionados</strong></div>
          <div className="briefAlerts">{alerts.map((alert) => <span key={alert}>{alert}</span>)}</div>
        </div>
        <div className="briefHeroGrid">{operationalHeroes.map((hero) => <BriefHeroCard
          key={hero.id}
          hero={hero}
          selected={selectedIds.includes(hero.id)}
          selectable={hero.status === "disponivel" && save.shift.status === "running" && (!isTutorialIncident || hero.id === tutorialHeroId)}
          tutorialTarget={isTutorialIncident && hero.id === tutorialHeroId && !tutorialHeroSelected}
          onToggle={() => onToggleHero(hero.id)}
          onOpen={() => onOpenHero(hero.id)}
        />)}</div>
      </div>
      </div>

      <footer>
        <div className="briefFooterCopy">
          <small>COMPOSIÇÃO</small>
          <strong>{selectedHeroes.length ? selectedHeroes.map((hero) => hero.name).join(" + ") : "Selecione a equipe na barra de agentes"}</strong>
          <p>{message}</p>
          <div className="briefDesktopAlerts">{alerts.map((alert) => <span key={alert}>{alert}</span>)}</div>
        </div>
        <button type="button" className={`briefDispatch ${isTutorialIncident && tutorialHeroSelected ? "tutorialTarget" : ""}`} disabled={selectedIds.length === 0 || runtime?.status !== "waiting" || save.shift.status !== "running"} onClick={onDispatch}>DESPACHAR EQUIPE →</button>
      </footer>
    </section>
  </div>;
}
