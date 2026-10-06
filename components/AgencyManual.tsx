"use client";

import { agencyManualSections } from "@/content/narrative/agencyManual";
import type { SaveGame } from "@/game/types";
import { useState } from "react";

export function AgencyManual({ save, className = "" }: { save: SaveGame; className?: string }) {
  const [open, setOpen] = useState(false);
  const [sectionId, setSectionId] = useState(agencyManualSections[0].id);
  const section = agencyManualSections.find((item) => item.id === sectionId) ?? agencyManualSections[0];
  const unlockedCount = agencyManualSections.flatMap((item) => item.entries).filter((entry) => !entry.unlockFlag || save.flags.includes(entry.unlockFlag)).length;

  return <>
    <button type="button" className={`agencyManualLauncher ${className}`.trim()} onClick={() => setOpen(true)} aria-label="Abrir Manual da Agência" title="Manual da Agência">
      <span>?</span><b>MANUAL</b><small>{unlockedCount}</small>
    </button>
    {open ? <div className="agencyManualBackdrop" onMouseDown={() => setOpen(false)}>
      <section className="agencyManualModal" role="dialog" aria-modal="true" aria-labelledby="agency-manual-title" onMouseDown={(event) => event.stopPropagation()}>
        <header><div><small>ARQUIVO DE CAMPO · EDISON</small><h2 id="agency-manual-title">Manual da Agência</h2><p>Orientações descobertas durante a campanha ficam registradas aqui.</p></div><button type="button" onClick={() => setOpen(false)} aria-label="Fechar Manual">×</button></header>
        <div className="agencyManualLayout">
          <nav aria-label="Seções do manual">{agencyManualSections.map((item) => <button key={item.id} className={item.id === section.id ? "active" : ""} onClick={() => setSectionId(item.id)}>{item.title}</button>)}</nav>
          <div className="agencyManualEntries">{section.entries.map((entry) => {
            const unlocked = !entry.unlockFlag || save.flags.includes(entry.unlockFlag);
            return <article key={entry.id} className={unlocked ? "unlocked" : "locked"}><small>{unlocked ? "REGISTRADO" : "NÃO DESCOBERTO"}</small><strong>{entry.title}</strong><p>{unlocked ? entry.body : "Continue jogando para registrar esta orientação."}</p></article>;
          })}</div>
        </div>
      </section>
    </div> : null}
  </>;
}
