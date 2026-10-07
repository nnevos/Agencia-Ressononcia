import { useRef, type ChangeEvent } from "react";
import { formatGameTime } from "@/game/simulation/shift";

type AgencyHeaderProps = {
  day: number;
  gameMinute: number;
  playerName: string;
  settingsOpen: boolean;
  clockPaused?: boolean;
  onToggleSettings: () => void;
  onSaveNow: () => void;
  onRestartShift: () => void;
  onSaveAndExit: () => void;
  onSignOut: () => void | Promise<void>;
  onExportSave: () => void;
  onImportSave: (file: File) => void | Promise<void>;
};

export function AgencyHeader({
  day,
  gameMinute,
  playerName,
  settingsOpen,
  clockPaused = false,
  onToggleSettings,
  onSaveNow,
  onRestartShift,
  onSaveAndExit,
  onSignOut,
  onExportSave,
  onImportSave,
}: AgencyHeaderProps) {
  const importInputRef = useRef<HTMLInputElement | null>(null);

  function handleImport(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) void onImportSave(file);
    event.target.value = "";
  }

  return <header className="opsHeader">
    <div className="brandLockup"><span className="brandMark">R</span><div><span>AGÊNCIA</span><strong>RESSONÂNCIA</strong></div></div>
    <div className={`shiftClock ${clockPaused ? "isPaused" : ""}`}><small>DIA {String(day).padStart(2, "0")} · EXPEDIENTE</small><strong>{formatGameTime(gameMinute)}</strong><span>{clockPaused ? "PAUSADO · LEITURA" : "08:00 — 18:00"}</span></div>
    <div className="headerActions settingsHost">
      <button className={`settingsButton ${settingsOpen ? "active" : ""}`} onClick={onToggleSettings} aria-expanded={settingsOpen} aria-haspopup="menu" aria-label="Abrir configurações">⚙<span>CONFIGURAÇÕES</span></button>
      {settingsOpen && <div className="settingsMenu" role="menu" aria-label="Configurações e salvamento">
        <div className="settingsIdentity"><small>ANALISTA</small><strong>{playerName}</strong><span>Dia {day} · salvamento local automático</span></div>
        <button role="menuitem" onClick={onSaveNow}>SALVAR AGORA</button>
        <button role="menuitem" onClick={onExportSave}>EXPORTAR SAVE</button>
        <button role="menuitem" className="settingsImport" onClick={() => importInputRef.current?.click()}>IMPORTAR SAVE</button>
        <input ref={importInputRef} className="settingsImportInput" type="file" accept="application/json,.json" onChange={handleImport} tabIndex={-1} aria-hidden="true" />
        <button role="menuitem" onClick={onRestartShift}>REINICIAR EXPEDIENTE</button>
        <button role="menuitem" className="settingsExit" onClick={onSaveAndExit}>SALVAR E SAIR</button>
        <button role="menuitem" className="settingsSignOut" onClick={() => void onSignOut()}>SAIR DA CONTA</button>
      </div>}
    </div>
  </header>;
}
