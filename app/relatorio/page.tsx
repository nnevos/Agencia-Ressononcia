"use client";

import { heroes } from "@/game/data/heroes";
import { incidents } from "@/game/data/incidents";
import { formatGameTime } from "@/game/simulation/shift";
import { acknowledgeMissionResult } from "@/game/simulation/operations";
import { loadSave, writeSave } from "@/lib/save";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { DispatchResult, SaveGame } from "@/game/types";

export default function ReportPage() {
  const router = useRouter();
  const [result, setResult] = useState<DispatchResult | null>(null);
  const [save, setSave] = useState<SaveGame | null>(null);

  useEffect(() => {
    const current = loadSave();
    if (!current) return router.replace("/novo-jogo");
    const queued = current.shift.reportQueue[0] ?? current.lastDispatch;
    if (!queued) return router.replace("/agencia");
    setSave(current);
    setResult(queued);
  }, [router]);

  const incident = useMemo(() => incidents.find((item) => item.id === result?.incidentId), [result]);
  const team = useMemo(() => heroes.filter((hero) => result?.selectedHeroIds.includes(hero.id)), [result]);

  function acknowledge() {
    const current = loadSave();
    if (!current || !result) return router.push("/agencia");
    const next = acknowledgeMissionResult(current, result);
    writeSave(next);
    const queue = next.shift.reportQueue;
    if (queue.length) {
      setSave(next);
      setResult(queue[0]);
    } else router.push("/agencia");
  }

  if (!result || !incident || !save) return <main className="centerPage"><p>Carregando relatório...</p></main>;

  return (
    <main className="reportPage">
      <section className="reportCard">
        <p className="eyebrow">RELATÓRIO DE RETORNO · {formatGameTime(result.completedAtGameMinute)}</p>
        <div className="reportHeader"><div><h1>{incident.title}</h1><p>{incident.district} · confiabilidade {incident.reliability.toLowerCase()}</p></div><span className={`outcomeBadge ${result.outcome === "Sucesso" ? "success" : result.outcome === "Falha" ? "failure" : "cost"}`}>{result.outcome}</span></div>
        <p className="reportSummary">{result.summary}</p>
        <div className="reportGrid">
          <div><span>Equipe</span><strong>{team.map((hero) => hero.name).join(" + ")}</strong></div>
          <div><span>Adequação</span><strong>{Math.round(result.attributeScore * 100)}%</strong></div>
          <div><span>Ressonância</span><strong>{result.resonanceScore >= 0 ? "+" : ""}{result.resonanceScore.toFixed(1)}</strong></div>
        </div>
        {!!result.specialCombos.length && <div className="comboCallout"><span className="eyebrow">COMBINAÇÃO ATIVADA</span><strong>{result.specialCombos.join(" · ")}</strong></div>}
        <div className="factorList"><h2>Fatores decisivos</h2>{result.decisiveFactors.map((factor) => <p key={factor}>• {factor}</p>)}</div>
        <div className="factorList"><h2>Consequências na equipe</h2>{result.heroEffects.map((effect) => { const hero = heroes.find((item) => item.id === effect.heroId); return <p key={effect.heroId}>• {hero?.name}: {effect.healthDelta} Vida, {effect.energyDelta} Energia, +{effect.xpAwarded} XP. Estado final: {effect.healthAfter} Vida / {effect.energyAfter} Energia.</p>; })}</div>
        <div className="reportActions"><button className="button primary" onClick={acknowledge}>{save.shift.reportQueue.length > 1 ? `Próximo relatório (${save.shift.reportQueue.length - 1})` : "Voltar à central"}</button></div>
      </section>
    </main>
  );
}
