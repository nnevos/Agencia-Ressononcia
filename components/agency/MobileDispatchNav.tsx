export type MobilePanel = "incidents" | "map" | "agents" | "nexo";

export function MobileDispatchNav({ current, waitingCount, availableCount, onChange }: { current: MobilePanel; waitingCount: number; availableCount: number; onChange: (panel: MobilePanel) => void }) {
  return <nav className="mobileDispatchNav" aria-label="Navegação da Central">
    <button className={current === "incidents" ? "active" : ""} aria-current={current === "incidents" ? "page" : undefined} onClick={() => onChange("incidents")}>CHAMADOS{waitingCount ? <b>{waitingCount}</b> : null}</button>
    <button className={current === "map" ? "active" : ""} aria-current={current === "map" ? "page" : undefined} onClick={() => onChange("map")}>MAPA</button>
    <button className={current === "agents" ? "active" : ""} aria-current={current === "agents" ? "page" : undefined} onClick={() => onChange("agents")}>AGENTES<b>{availableCount}</b></button>
    <button className={current === "nexo" ? "active" : ""} aria-current={current === "nexo" ? "page" : undefined} onClick={() => onChange("nexo")}>NEXO</button>
  </nav>;
}
