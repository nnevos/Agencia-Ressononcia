"use client";

import { MAIN_MENU_TEXT } from "@/content/ui/menu";
import { loadSave } from "@/lib/save";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [continueHref, setContinueHref] = useState<string | null>(null);
  useEffect(() => {
    const save = loadSave();
    if (!save) return;
    setContinueHref(save.flags.includes("onboarding_pending") ? "/introducao" : "/agencia");
  }, []);

  return <main className="mainMenuPage">
    <div className="mainMenuArt" aria-hidden="true"><span>{MAIN_MENU_TEXT.artPlaceholder}</span></div>
    <section className="mainMenuPanel">
      <p className="eyebrow">{MAIN_MENU_TEXT.eyebrow}</p>
      <h1>{MAIN_MENU_TEXT.title}</h1>
      <p className="menuTagline">{MAIN_MENU_TEXT.tagline}</p>
      <p className="menuSubline">{MAIN_MENU_TEXT.subline}</p>
      <nav className="mainMenuActions">
        {continueHref && <Link className="menuPrimary" href={continueHref}>{MAIN_MENU_TEXT.continueLabel}<span>Retomar arquivo atual</span></Link>}
        <Link className={continueHref ? "menuSecondary" : "menuPrimary"} href="/novo-jogo">{MAIN_MENU_TEXT.newGameLabel}<span>Começar como novo Despachante</span></Link>
        <Link className="menuTertiary" href="/login">{MAIN_MENU_TEXT.accessLabel}</Link>
      </nav>
      <p className="menuVersion">{MAIN_MENU_TEXT.versionLabel}</p>
    </section>
  </main>;
}
