"use client";

import { heroes } from "@/game/data/heroes";
import { getHeroPortrait } from "@/game/data/heroPortraits";
import { hasCompletedAllRomances, markRomanceEndingSeen } from "@/game/social/ending";
import type { SaveGame } from "@/game/types";
import { isPostShiftOnlySave, loadSave, writeSave } from "@/lib/save";
import { publicPath } from "@/lib/publicPath";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function FinalPage() {
  const router = useRouter();
  const [save, setSave] = useState<SaveGame | null>(null);

  useEffect(() => {
    const current = loadSave();
    if (!current) {
      router.replace("/");
      return;
    }
    if (!hasCompletedAllRomances(current)) {
      router.replace("/conversa");
      return;
    }
    const marked = markRomanceEndingSeen(current);
    if (marked !== current) writeSave(marked);
    setSave(marked);
  }, [router]);

  if (!save) return <main className="centerPage"><p>Carregando conclusão...</p></main>;

  const postShiftOnly = isPostShiftOnlySave(save);

  return <main className="romanceEndingPage">
    <div className="romanceEndingBackdrop" style={{ backgroundImage: `url(${publicPath("/menu/cidade-noturna.webp")})` }} aria-hidden="true" />
    <section className="romanceEndingCard" aria-labelledby="ending-title">
      <div className="romanceEndingEyebrow">CAMPANHA CONCLUÍDA</div>
      <h1 id="ending-title">Todos os romances foram concluídos.</h1>
      <p className="romanceEndingLead">
        {save.player.name}, você concluiu os dois marcos românticos de todos os agentes da Ressonância.
        A campanha social chegou ao fim, mas a Agência continua operando.
      </p>

      <div className="romanceEndingRoster" aria-label="Rotas românticas concluídas">
        {heroes.map((hero) => {
          const portrait = getHeroPortrait(hero.id);
          const milestones = save.social.outingMilestones[hero.id] ?? [];
          return <div className="romanceEndingHero" key={hero.id}>
            <div className="romanceEndingAvatar">{portrait ? <img src={portrait} alt="" /> : hero.name.slice(0, 1)}</div>
            <div>
              <strong>{hero.name}</strong>
              <span>DATE 1 {milestones.includes(3) ? "✓" : "—"} · DATE 2 {milestones.includes(6) ? "✓" : "—"}</span>
            </div>
          </div>;
        })}
      </div>

      <div className="romanceEndingInfinite">
        <strong>LOOP INFINITO LIBERADO</strong>
        <p>{postShiftOnly ? "Você pode voltar ao NEXO e continuar avançando noites sociais sem limite." : "Você pode voltar ao NEXO, encerrar a noite normalmente e continuar jogando novos expedientes e despachos sem limite."}</p>
      </div>

      <div className="romanceEndingActions">
        <button className="button primary" onClick={() => router.replace("/conversa")}>CONTINUAR JOGANDO</button>
        <button className="button" onClick={() => router.replace("/")}>VOLTAR AO MENU</button>
      </div>
    </section>
  </main>;
}
