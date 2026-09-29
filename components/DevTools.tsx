"use client";

import { devAdvanceMinutes, devPerfectFinishShift, devResetShift, devResolveAllAndFinish, devSkipToPostShift } from "@/game/simulation/devTools";
import type { SaveGame } from "@/game/types";
import { writeSave } from "@/lib/save";
import { useState } from "react";

export function DevTools({ save, onSave, onPost, onDevelopment }: { save: SaveGame; onSave: (save: SaveGame) => void; onPost: () => void; onDevelopment: () => void }) {
  const [open, setOpen] = useState(false);

  function apply(next: SaveGame) {
    writeSave(next);
    onSave(next);
  }

  return <>
    <button className={`devFab ${open ? "active" : ""}`} onClick={() => setOpen((value) => !value)} title="Ferramentas de desenvolvimento">DEV</button>
    {open && <aside className="devPanel">
      <div className="devHeader"><div><span className="eyebrow">DEV TOOLS</span><strong>Controle de teste</strong></div><button onClick={() => setOpen(false)}>×</button></div>
      <p>Altere o relógio e o fluxo apenas para testar conteúdo. Essas ações modificam o save atual.</p>
      <div className="devGrid">
        <button onClick={() => apply(devAdvanceMinutes(save, 30))}>+30 min</button>
        <button onClick={() => apply(devAdvanceMinutes(save, 60))}>+1 hora</button>
        <button onClick={() => apply(devAdvanceMinutes(save, 180))}>+3 horas</button>
        <button onClick={() => apply(devResolveAllAndFinish(save))}>Ir para 18:00</button>
      </div>
      <button className="devPrimary devPerfectFinish" onClick={() => { const next = devPerfectFinishShift(save); apply(next); onDevelopment(); }}>FINALIZAR EXPEDIENTE 100%</button>
      <small className="devPerfectHint">QA rápido: todas as ocorrências ainda não arquivadas viram Sucesso, aplicam XP/custo normal de Sucesso e o jogo segue para Desenvolvimento.</small>
      <button className="devPrimary" onClick={() => { const next = devSkipToPostShift(save); apply(next); onPost(); }}>Pular direto para pós-expediente</button>
      <button className="devDanger" onClick={() => apply(devResetShift(save))}>Resetar expediente atual</button>
      <small>Uso recomendado: testes de UI, diálogos, saves, progressão e fluxo narrativo.</small>
    </aside>}
  </>;
}
