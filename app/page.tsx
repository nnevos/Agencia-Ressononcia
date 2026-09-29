"use client";

import { MAIN_MENU_TEXT } from "@/content/ui/menu";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [hasSave, setHasSave] = useState(false);
  useEffect(() => { setHasSave(Boolean(localStorage.getItem("ressonancia.save"))); }, []);

  return <main className="centerPage">
    <section className="heroPanel">
      <p className="eyebrow">{MAIN_MENU_TEXT.eyebrow}</p>
      <h1>{MAIN_MENU_TEXT.title}</h1>
      <p className="lead">{MAIN_MENU_TEXT.tagline}</p>
      <div className="actions">
        {hasSave && <Link className="button primary" href="/agencia">{MAIN_MENU_TEXT.continueLabel}</Link>}
        <Link className={hasSave ? "button ghost" : "button primary"} href="/novo-jogo">{MAIN_MENU_TEXT.newGameLabel}</Link>
        <Link className="button ghost" href="/login">{MAIN_MENU_TEXT.accessLabel}</Link>
      </div>
      <p className="microcopy">{MAIN_MENU_TEXT.versionLabel}</p>
    </section>
  </main>;
}
