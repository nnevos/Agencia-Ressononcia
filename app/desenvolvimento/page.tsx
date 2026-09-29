"use client";

import { HeroRadar } from "@/components/HeroRadar";
import { heroes } from "@/game/data/heroes";
import {
  LEVEL_XP,
  MAX_HERO_LEVEL,
  canLevelUp,
  confirmAttributeLevel,
  developmentComplete,
  getNextLevel,
  rewardLabelForLevel,
  spendAttributePoint,
  unlockTechniqueLevel
} from "@/game/progression/heroProgression";
import type { AttributeKey, HeroProgression, SaveGame } from "@/game/types";
import { loadSave, writeSave } from "@/lib/save";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const attributeLabels: Record<AttributeKey, string> = {
  strength: "Força",
  agility: "Agilidade",
  charisma: "Carisma",
  intelligence: "Inteligência",
  vigor: "Vigor"
};

function nextXp(progress: HeroProgression) {
  if (progress.level >= MAX_HERO_LEVEL) return null;
  return LEVEL_XP[progress.level + 1];
}

export default function DevelopmentPage() {
  const router = useRouter();
  const [save, setSave] = useState<SaveGame | null>(null);
  const [heroId, setHeroId] = useState("yuki");
  const [message, setMessage] = useState("Revise a evolução conquistada neste expediente antes do pós-expediente.");

  useEffect(() => {
    const current = loadSave();
    if (!current) return router.replace("/novo-jogo");
    if (!current.player.developmentRequired || current.shift.status !== "finished") return router.replace("/agencia");
    setSave(current);
  }, [router]);

  const hero = useMemo(() => heroes.find((item) => item.id === heroId) ?? heroes[0], [heroId]);
  const progress = save?.heroProgression[hero.id] ?? null;
  const nextLevel = progress ? getNextLevel(progress) : null;
  const techniques = useMemo(() => nextLevel ? hero.techniques.filter((item) => item.level === nextLevel) : [], [hero, nextLevel]);

  function commitProgress(nextProgress: HeroProgression, text: string) {
    if (!save) return;
    const next: SaveGame = {
      ...save,
      heroProgression: { ...save.heroProgression, [nextProgress.heroId]: nextProgress }
    };
    writeSave(next);
    setSave(next);
    setMessage(text);
  }

  function chooseTechnique(techniqueId: string) {
    if (!progress || !nextLevel || ![2,4,6].includes(nextLevel)) return;
    const technique = hero.techniques.find((item) => item.id === techniqueId);
    if (!technique) return;
    const next = unlockTechniqueLevel(progress, nextLevel as 2 | 4 | 6, techniqueId);
    commitProgress(next, `${hero.name} alcançou o nível ${nextLevel} e desbloqueou ${technique.name}.`);
  }

  function chooseAttribute(attribute: AttributeKey) {
    if (!progress || !nextLevel || ![3,5].includes(nextLevel)) return;
    if (progress.attributes[attribute] >= 5) return setMessage(`${attributeLabels[attribute]} já está no limite atual.`);
    const leveled = confirmAttributeLevel(progress, nextLevel as 3 | 5);
    const next = spendAttributePoint(leveled, attribute);
    commitProgress(next, `${hero.name} alcançou o nível ${nextLevel}: ${attributeLabels[attribute]} aumentou para ${next.attributes[attribute]}.`);
  }

  function continueToPostShift() {
    if (!save) return;
    if (!developmentComplete(save.heroProgression)) {
      setMessage("Ainda existe uma evolução pendente. Resolva os upgrades destacados antes de seguir para o pós-expediente.");
      return;
    }
    const next: SaveGame = { ...save, player: { ...save.player, developmentRequired: false } };
    writeSave(next);
    router.push("/conversa");
  }

  if (!save || !progress) return <main className="centerPage"><p>Carregando desenvolvimento...</p></main>;

  const target = nextXp(progress);
  const previousThreshold = LEVEL_XP[progress.level] ?? 0;
  const progressPercent = target == null ? 100 : Math.max(0, Math.min(100, ((progress.xp - previousThreshold) / (target - previousThreshold)) * 100));
  const anyPending = Object.values(save.heroProgression).some((item) => canLevelUp(item) || item.unspentAttributePoints > 0);

  return (
    <main className="developmentPage">
      <header className="developmentHeader">
        <div><span className="eyebrow">DIA {String(save.player.currentDay).padStart(2,"0")} · PÓS-EXPEDIENTE</span><h1>Desenvolvimento da Equipe</h1><p>Experiência obtida durante o expediente é consolidada agora. Resolva os upgrades antes das cenas de pós-expediente; tudo ficará ativo no próximo dia.</p></div>
        <button className="button primary" onClick={continueToPostShift}>{anyPending ? "CONCLUIR UPGRADES" : "SEGUIR PARA PÓS-EXPEDIENTE"}</button>
      </header>

      <section className="developmentShell">
        <aside className="developmentRoster">
          <span className="sectionLabel">EQUIPE</span>
          {heroes.map((item) => {
            const itemProgress = save.heroProgression[item.id];
            const pending = canLevelUp(itemProgress) || itemProgress.unspentAttributePoints > 0;
            return <button key={item.id} className={`developmentHeroButton ${heroId === item.id ? "active" : ""} ${pending ? "pending" : ""}`} onClick={() => setHeroId(item.id)}>
              <span>{item.name.slice(0,2).toUpperCase()}</span><div><strong>{item.name}</strong><small>NÍVEL {itemProgress.level} · {itemProgress.xp} XP</small></div>{pending && <em>UP</em>}
            </button>;
          })}
        </aside>

        <section className="developmentHeroPanel">
          <div className="developmentIdentity">
            <div className="developmentPortrait">{hero.name.slice(0,2).toUpperCase()}</div>
            <div><span className="eyebrow">{hero.powerName}</span><h2>{hero.name}</h2><p>{hero.className} · {hero.trail}</p><div className="styleTags">{hero.style.map((item)=><span key={item}>{item}</span>)}</div></div>
          </div>

          <div className="developmentStats">
            <div className="developmentRadarCard"><div className="developmentLevel"><span>NÍVEL</span><strong>{progress.level}</strong><small>{progress.xp} XP total</small></div><HeroRadar attributes={progress.attributes} /></div>
            <div className="developmentXpCard">
              <span className="sectionLabel">PROGRESSÃO</span>
              {progress.level >= MAX_HERO_LEVEL ? <><strong>Nível máximo atual</strong><p>O arco de progressão disponível termina no nível 6 nesta versão.</p></> : <>
                <strong>Próximo: Nível {progress.level + 1}</strong>
                <p>{rewardLabelForLevel(progress.level + 1)}</p>
                <div className="developmentXpBar"><i style={{width:`${progressPercent}%`}} /></div>
                <small>{progress.xp} / {target} XP</small>
              </>}
              <div className="milestoneTrack">{[1,2,3,4,5,6].map((level)=><span key={level} className={level < progress.level ? "done" : level === progress.level ? "current" : progress.pendingMilestoneLevels.includes(level) ? "earned" : ""}><b>{level}</b><small>{level===1?"BASE":level===2?"TÉCNICA":level===3?"+ATR":level===4?"ESPEC.":level===5?"+ATR":"EVOL."}</small></span>)}</div>
            </div>
          </div>

          <div className="developmentAction">
            {!nextLevel && <div className="developmentNoUpgrade"><strong>Nenhum level up pendente</strong><p>{progress.level >= MAX_HERO_LEVEL ? "Progressão atual concluída." : `Faltam ${Math.max(0,(target ?? 0)-progress.xp)} XP para o próximo nível.`}</p></div>}
            {nextLevel && [3,5].includes(nextLevel) && <div><span className="sectionLabel">NÍVEL {nextLevel} · +1 ATRIBUTO</span><h3>Escolha onde investir</h3><p>O ponto é permanente. O limite atual de cada atributo é 5.</p><div className="attributeUpgradeGrid">{(Object.keys(attributeLabels) as AttributeKey[]).map((key)=><button key={key} disabled={progress.attributes[key]>=5} onClick={()=>chooseAttribute(key)}><span>{attributeLabels[key]}</span><strong>{progress.attributes[key]} → {Math.min(5,progress.attributes[key]+1)}</strong></button>)}</div></div>}
            {nextLevel && [2,4,6].includes(nextLevel) && <div><span className="sectionLabel">NÍVEL {nextLevel} · {rewardLabelForLevel(nextLevel)}</span><h3>{nextLevel===6?"Escolha a evolução":"Escolha uma nova abordagem"}</h3><p>A escolha amplia as soluções possíveis no Dispatch e passa a fazer parte da build deste personagem.</p><div className="techniqueChoiceGrid">{techniques.map((technique)=><button key={technique.id} onClick={()=>chooseTechnique(technique.id)}><small>{technique.category.toUpperCase()}</small><strong>{technique.name}</strong><p>{technique.description}</p>{technique.grantedTags?.length ? <em>Nova capacidade: {technique.grantedTags.join(", ")}</em> : null}</button>)}</div></div>}
          </div>

          <div className="developmentUnlocked"><span className="sectionLabel">TÉCNICAS DESBLOQUEADAS</span>{progress.unlockedTechniqueIds.length ? <div>{hero.techniques.filter((item)=>progress.unlockedTechniqueIds.includes(item.id)).map((item)=><span key={item.id}><strong>{item.name}</strong><small>{item.description}</small></span>)}</div> : <p>Nenhuma técnica de progressão desbloqueada ainda.</p>}</div>
        </section>
      </section>
      <div className="developmentMessage">{message}</div>
    </main>
  );
}
