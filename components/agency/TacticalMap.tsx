import { publicPath } from "@/lib/publicPath";
import { formatGameTime } from "@/game/simulation/shift";
import type { DispatchResult, Incident, SaveGame } from "@/game/types";
import type { ReactNode } from "react";

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

export function TacticalMap({ save, activeIncidents, incidentId, gameMinute, onOpenBriefing, onOpenResult, onSelectIncident, children }: { save: SaveGame; activeIncidents: Incident[]; incidentId: string | null; gameMinute: number; onOpenBriefing: (id: string) => void; onOpenResult: (result: DispatchResult) => void; onSelectIncident: (id: string) => void; children?: ReactNode }) {
  return <section className="mapStage mapStageWorkspace">
    <div className="mapToolbar"><span>MAPA TÁTICO</span><small>REDE MUNICIPAL / TEMPO REAL</small></div>
    <div className="cityMap cityMapPrimary">
      <img className="cityMapArtwork" src={publicPath("/maps/central-city-map.webp")} alt="Mapa urbano da área operacional" />
      <div className="mapImageShade" aria-hidden="true" />
      {activeIncidents.map((item) => {
        const runtime = save.shift.incidents[item.id];
        const remaining = runtime.deadlineAtGameMinute != null ? Math.max(0, runtime.deadlineAtGameMinute - gameMinute) : 0;
        const isResolved = runtime.status === "resolved";
        return <button key={item.id} style={incidentMapPosition(item.id, item.district)} className={`incidentMapMarker freeMarker ${item.priority.toLowerCase()} ${runtime.status} ${incidentId === item.id ? "active" : ""}`} onClick={() => isResolved && runtime.result ? onOpenResult(runtime.result) : runtime.status === "waiting" ? onOpenBriefing(item.id) : onSelectIncident(item.id)} title={`${item.title} · ${isResolved ? "resultado disponível" : runtime.status === "dispatched" ? `retorno ${formatGameTime(runtime.resolvesAtGameMinute ?? gameMinute)}` : `${remaining} min restantes`}`} aria-label={`${item.title}. ${isResolved ? "Resultado disponível" : runtime.status === "dispatched" ? "Equipe em operação" : `${remaining} minutos para decidir`}`}>
          <b>{isResolved ? "✓" : runtime.status === "dispatched" ? "↗" : "!"}</b>
        </button>;
      })}
    </div>
    {children}
  </section>;
}
