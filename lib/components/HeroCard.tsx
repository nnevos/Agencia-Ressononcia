import type { OperationalHero } from "@/game/types";
import { getHeroPortrait } from "@/game/data/heroPortraits";
import { getMaxEnergy, getMaxHealth } from "@/game/simulation/heroState";

export function HeroCard({ hero, selected, disabled, selectDisabled, onSelect, onInfo }: { hero: OperationalHero; selected: boolean; disabled?: boolean; selectDisabled?: boolean; onSelect: () => void; onInfo: () => void }) {
  const unavailable = hero.status !== "disponivel";
  const statusText = hero.status === "desmaiado" ? "DESMAIADO" : hero.status === "recuperacao" ? "RECUPERAÇÃO" : "EM CAMPO";
  const portrait = getHeroPortrait(hero.id);
  const maxHealth = getMaxHealth(hero.attributes);
  const maxEnergy = getMaxEnergy(hero.attributes);
  const healthRatio = hero.health / maxHealth;
  const energyRatio = hero.energy / maxEnergy;

  return <article className={`heroStripCard compactPortrait ${selected ? "selected" : ""} ${hero.status}`} title={`${hero.name} · selecionar agente ou abrir ficha`}>
    <button className="heroPortraitButton" onClick={onSelect} disabled={disabled || selectDisabled} aria-pressed={selected} aria-label={`${selected ? "Remover" : "Selecionar"} ${hero.name} da equipe`}>
      <span className="heroPortraitPlaceholder">{portrait ? <img src={portrait} alt={`Retrato de ${hero.name}`} /> : <span>{hero.name.slice(0,2).toUpperCase()}</span>}</span>
      {unavailable && <span className="heroStatusOverlay">{statusText}</span>}
    </button>
    <strong className="heroRosterName">{hero.name}</strong>
    <div className="heroMiniVitals" aria-label={`Vida ${hero.health} de ${maxHealth}; Energia ${hero.energy} de ${maxEnergy}`}>
      <span title={`Vida ${hero.health}/${maxHealth}`}><i className={`miniVitalFill health ${healthRatio <= .35 ? "critical" : healthRatio <= .65 ? "warning" : ""}`} style={{width:`${healthRatio*100}%`}} /></span>
      <span title={`Energia ${hero.energy}/${maxEnergy}`}><i className={`miniVitalFill energy ${energyRatio <= .35 ? "critical" : energyRatio <= .65 ? "warning" : ""}`} style={{width:`${energyRatio*100}%`}} /></span>
    </div>
    <button className="heroRosterInfo" onClick={onInfo} disabled={disabled}>ABRIR FICHA</button>
  </article>;
}
