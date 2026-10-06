import { HeroCard } from "@/components/HeroCard";
import { GAMEPLAY_CONFIG } from "@/content/config/gameplay";
import type { OperationalHero } from "@/game/types";

export function AgentRoster({ heroes, briefingOpen, selectedIds, availableCount, onSelect, onInfo }: { heroes: OperationalHero[]; briefingOpen: boolean; selectedIds: string[]; availableCount: number; onSelect: (id: string) => void; onInfo: (id: string) => void }) {
  return <section className="heroCommandBar workspaceRoster" aria-label="Agentes">
    <div className="heroCommandHeader"><div><span>{briefingOpen ? "SELECIONE A EQUIPE" : "AGENTES"}</span><small>{briefingOpen ? `${selectedIds.length}/${GAMEPLAY_CONFIG.maxTeamSize} selecionados · clique no retrato para adicionar/remover · VER FICHA abre o dossiê` : `${availableCount}/7 livres · clique em qualquer retrato para abrir a ficha`}</small></div></div>
    <div className="heroBottomStrip">{heroes.map((hero) => <HeroCard key={hero.id} hero={hero} selected={briefingOpen && selectedIds.includes(hero.id)} disabled={false} selectDisabled={briefingOpen && hero.status !== "disponivel"} onSelect={() => onSelect(hero.id)} onInfo={() => onInfo(hero.id)} />)}</div>
  </section>;
}
