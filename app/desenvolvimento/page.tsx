"use client";

import { HeroRadar } from "@/components/HeroRadar";
import { ProgressiveTutorialCoach } from "@/components/ProgressiveTutorialCoach";
import { AgencyManual } from "@/components/AgencyManual";
import { getHeroPortrait } from "@/game/data/heroPortraits";
import { PROGRESSIVE_TUTORIAL_FLAGS, progressiveTutorialCopy } from "@/content/narrative/progressiveTutorial";
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
import { isPostShiftOnlySave, loadSave, writeSave } from "@/lib/save";
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

function firstPendingHeroId(progressions: Record<string, HeroProgression>) {
  return heroes.find((item) => {
    const progress = progressions[item.id];
    return progress && (canLevelUp(progress) || progress.pendingMilestoneLevels.length > 0 || progress.unspentAttributePoints > 0);
  })?.id ?? null;
}

export default function DevelopmentPage() {
  const router = useRouter();
  const [save, setSave] = useState<SaveGame | null>(null);
  const [heroId, setHeroId] = useState("yuki");
  const [pendingAttribute, setPendingAttribute] = useState<AttributeKey | null>(null);
  const [message, setMessage] = useState("XP é acumulado ao arquivar relatórios. Quando um nível é alcançado, escolha a melhoria do agente destacado antes de seguir.");

  useEffect(() => {
    const current = loadSave();
    if (!current) return router.replace("/novo-jogo");
    if (isPostShiftOnlySave(current)) return router.replace("/conversa");
    if (!current.player.developmentRequired || current.shift.status !== "finished") return router.replace("/agencia");
    setSave(current);
    const pendingHero = firstPendingHeroId(current.heroProgression);
    if (pendingHero) setHeroId(pendingHero);
    else if (!current.flags.includes(PROGRESSIVE_TUTORIAL_FLAGS.mastery)) {
      const masteryHero = heroes.find((item) => (current.heroProgression[item.id]?.masteryRank ?? 0) > 0);
      if (masteryHero) setHeroId(masteryHero.id);
    }
  }, [router]);

  const hero = useMemo(() => heroes.find((item) => item.id === heroId) ?? heroes[0], [heroId]);
  const progress = save?.heroProgression[hero.id] ?? null;
  const nextLevel = progress ? getNextLevel(progress) : null;
  const techniques = useMemo(() => nextLevel ? hero.techniques.filter((item) => item.level === nextLevel) : [], [hero, nextLevel]);
  const previewAttributes = useMemo(() => {
    if (!progress || !pendingAttribute || !nextLevel || ![3,5].includes(nextLevel)) return progress?.attributes;
    return { ...progress.attributes, [pendingAttribute]: Math.min(5, progress.attributes[pendingAttribute] + 1) };
  }, [progress, pendingAttribute, nextLevel]);

  useEffect(() => {
    setPendingAttribute(null);
  }, [heroId, nextLevel]);

  function markTutorialFlag(flag: string, source: SaveGame = save!) {
    const next = { ...source, flags: Array.from(new Set([...source.flags, flag])) };
    writeSave(next);
    setSave(next);
    return next;
  }

  function commitProgress(nextProgress: HeroProgression, text: string, addFlags: string[] = []) {
    if (!save) return;
    const next: SaveGame = {
      ...save,
      flags: Array.from(new Set([...save.flags, ...addFlags])),
      heroProgression: { ...save.heroProgression, [nextProgress.heroId]: nextProgress }
    };
    writeSave(next);
    setSave(next);
    setMessage(text);
    const pendingHero = firstPendingHeroId(next.heroProgression);
    if (pendingHero) setHeroId(pendingHero);
  }

  function chooseTechnique(techniqueId: string) {
    if (!progress || !nextLevel || ![2,4,6].includes(nextLevel)) return;
    const technique = hero.techniques.find((item) => item.id === techniqueId);
    if (!technique) return;
    const next = unlockTechniqueLevel(progress, nextLevel as 2 | 4 | 6, techniqueId);
    commitProgress(next, `${hero.name} alcançou o nível ${nextLevel} e desbloqueou ${technique.name}.`, [PROGRESSIVE_TUTORIAL_FLAGS.technique]);
  }

  function selectAttribute(attribute: AttributeKey) {
    if (!progress || !nextLevel || ![3,5].includes(nextLevel)) return;
    if (progress.attributes[attribute] >= 5) {
      setMessage(`${attributeLabels[attribute]} já está no limite atual.`);
      return;
    }
    setPendingAttribute(attribute);
    setMessage(`${attributeLabels[attribute]} selecionado. Confira a prévia no radar e confirme para aplicar o ponto.`);
  }

  function confirmSelectedAttribute() {
    if (!progress || !nextLevel || !pendingAttribute || ![3,5].includes(nextLevel)) return;
    const leveled = confirmAttributeLevel(progress, nextLevel as 3 | 5);
    const next = spendAttributePoint(leveled, pendingAttribute);
    commitProgress(next, `${hero.name} alcançou o nível ${nextLevel}: ${attributeLabels[pendingAttribute]} aumentou para ${next.attributes[pendingAttribute]}.`, [PROGRESSIVE_TUTORIAL_FLAGS.attribute]);
    setPendingAttribute(null);
  }

  function focusNextPendingUpgrade() {
    if (!save) return;
    const pendingHero = firstPendingHeroId(save.heroProgression);
    if (pendingHero) {
      setHeroId(pendingHero);
      const pendingProgress = save.heroProgression[pendingHero];
      const pendingHeroData = heroes.find((item) => item.id === pendingHero);
      setMessage(`${pendingHeroData?.name ?? pendingHero} possui uma evolução pendente. Escolha a melhoria abaixo.`);
    }
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
  const anyPending = Object.values(save.heroProgression).some((item) => canLevelUp(item) || item.pendingMilestoneLevels.length > 0 || item.unspentAttributePoints > 0);
  const anyMastery = progress.masteryRank > 0;
  const tutorialKey = anyPending && !save.flags.includes(PROGRESSIVE_TUTORIAL_FLAGS.development) ? "development"
    : nextLevel && [2,4,6].includes(nextLevel) && !save.flags.includes(PROGRESSIVE_TUTORIAL_FLAGS.technique) ? "technique"
    : nextLevel && [3,5].includes(nextLevel) && !save.flags.includes(PROGRESSIVE_TUTORIAL_FLAGS.attribute) ? "attribute"
    : anyMastery && !save.flags.includes(PROGRESSIVE_TUTORIAL_FLAGS.mastery) ? "mastery"
    : null;

  function dismissTutorial() {
    if (!tutorialKey || !save) return;
    const flag = PROGRESSIVE_TUTORIAL_FLAGS[tutorialKey];
    const next = { ...save, flags: Array.from(new Set([...save.flags, flag])) };
    writeSave(next);
    setSave(next);
  }

  return (
    <main className="developmentPage">
      {tutorialKey && <ProgressiveTutorialCoach className="developmentTutorial" {...progressiveTutorialCopy[tutorialKey]} onDismiss={tutorialKey === "mastery" ? dismissTutorial : undefined} actionLabel={tutorialKey === "mastery" ? "REGISTRAR NO MANUAL" : undefined} />}
      <AgencyManual save={save} className="agencyManualDevelopment" />
      <header className="developmentHeader">
        <div><span className="eyebrow">DIA {String(save.player.currentDay).padStart(2,"0")} · PÓS-EXPEDIENTE</span><h1>Desenvolvimento da Equipe</h1><p>Experiência obtida durante o expediente é consolidada agora. Resolva os upgrades antes das cenas de pós-expediente; tudo ficará ativo no próximo dia.</p></div>
        <div className="developmentHeaderActions">
          <button className="button" onClick={() => { writeSave(save); router.push("/"); }}>SALVAR E SAIR</button>
          <button className="button primary" onClick={anyPending ? focusNextPendingUpgrade : continueToPostShift}>{anyPending ? "VER PRÓXIMO UPGRADE" : "SEGUIR PARA PÓS-EXPEDIENTE"}</button>
        </div>
      </header>

      <section className="developmentShell">
        <aside className={`developmentRoster ${tutorialKey === "development" ? "tutorialTarget" : ""}`}>
          <span className="sectionLabel">EQUIPE</span>
          {heroes.map((item) => {
            const itemProgress = save.heroProgression[item.id];
            const pending = canLevelUp(itemProgress) || itemProgress.pendingMilestoneLevels.length > 0 || itemProgress.unspentAttributePoints > 0;
            const portrait = getHeroPortrait(item.id);
            return <button key={item.id} className={`developmentHeroButton ${heroId === item.id ? "active" : ""} ${pending ? "pending" : ""}`} onClick={() => { setHeroId(item.id); if (pending && !save.flags.includes(PROGRESSIVE_TUTORIAL_FLAGS.development)) markTutorialFlag(PROGRESSIVE_TUTORIAL_FLAGS.development); }}>
              <span className="developmentRosterPortrait">{portrait ? <img src={portrait} alt="" /> : item.name.slice(0,2).toUpperCase()}</span><div><strong>{item.name}</strong><small>NÍVEL {itemProgress.level} · {itemProgress.xp} XP</small></div>{pending && <em>UP</em>}
            </button>;
          })}
        </aside>

        <section className="developmentHeroPanel">
          <div className="developmentIdentity">
            <div className="developmentPortrait">{getHeroPortrait(hero.id) ? <img src={getHeroPortrait(hero.id)!} alt={`Retrato de ${hero.name}`} /> : hero.name.slice(0,2).toUpperCase()}</div>
            <div><span className="eyebrow">{hero.powerName}</span><h2>{hero.name}</h2><p>{hero.className} · {hero.trail}</p><div className="styleTags">{hero.style.map((item)=><span key={item}>{item}</span>)}</div></div>
          </div>

          <div className="developmentStats developmentStatsReworked">
            <div className="developmentRadarCard developmentRadarWorkbench">
              <div className={`developmentLevel ${tutorialKey === "mastery" ? "tutorialTarget" : ""}`}><span>NÍVEL</span><strong>{progress.level}</strong><small>{progress.xp} XP total · MAESTRIA {progress.masteryRank}/5</small></div>

              {nextLevel && [3,5].includes(nextLevel) ? (
                <div className={`developmentAttributeWorkbench ${tutorialKey === "attribute" ? "tutorialTarget" : ""}`}>
                  <div className="developmentAttributeControls" aria-label="Escolha de atributo">
                    {(Object.keys(attributeLabels) as AttributeKey[]).map((key) => {
                      const current = progress.attributes[key];
                      const selected = pendingAttribute === key;
                      return <div key={key} className={`developmentAttributeRow ${selected ? "selected" : ""}`}>
                        <span>{attributeLabels[key]}</span>
                        <button type="button" aria-label={`Remover seleção de ${attributeLabels[key]}`} disabled={!selected} onClick={() => setPendingAttribute(null)}>−</button>
                        <strong>{selected ? Math.min(5,current + 1) : current}</strong>
                        <button type="button" aria-label={`Investir em ${attributeLabels[key]}`} disabled={current >= 5} onClick={() => selectAttribute(key)}>+</button>
                      </div>;
                    })}
                  </div>
                  <div className="developmentRadarPreview">
                    <HeroRadar attributes={previewAttributes ?? progress.attributes} />
                    <small>O radar mostra a prévia antes da confirmação.</small>
                  </div>
                  <div className="developmentAttributeActions">
                    <button type="button" className="button" disabled={!pendingAttribute} onClick={() => setPendingAttribute(null)}>LIMPAR</button>
                    <button type="button" className="button primary" disabled={!pendingAttribute} onClick={confirmSelectedAttribute}>CONFIRMAR +1</button>
                  </div>
                </div>
              ) : nextLevel && [2,4,6].includes(nextLevel) ? (
                <div className={`developmentTechniqueWorkbench ${tutorialKey === "technique" ? "tutorialTarget" : ""}`}>
                  <div className="developmentTechniqueLead">
                    <span className="sectionLabel">NÍVEL {nextLevel} · {rewardLabelForLevel(nextLevel)}</span>
                    <h3>{nextLevel===6?"Escolha a evolução":"Escolha uma nova abordagem"}</h3>
                    <p>A escolha amplia as soluções possíveis no Dispatch e passa a fazer parte da build deste personagem.</p>
                  </div>
                  <div className="techniqueChoiceGrid techniqueChoiceGridFeatured">{techniques.map((technique)=><button key={technique.id} onClick={()=>chooseTechnique(technique.id)}><small>{technique.category.toUpperCase()}</small><strong>{technique.name}</strong><p>{technique.description}</p>{technique.grantedTags?.length ? <em>Nova capacidade: {technique.grantedTags.join(", ")}</em> : null}</button>)}</div>
                </div>
              ) : (
                <div className="developmentRadarOnly"><HeroRadar attributes={progress.attributes} /></div>
              )}
            </div>

            <div className="developmentXpCard developmentProgressWorkbench">
              <div className="developmentProgressTop">
                <span className="sectionLabel">PROGRESSÃO</span>
                {progress.level >= MAX_HERO_LEVEL ? <><strong>Nível máximo atual</strong><p>O arco de progressão disponível termina no nível 6 nesta versão.</p></> : <>
                  <strong>Próximo: Nível {progress.level + 1}</strong>
                  <p>{rewardLabelForLevel(progress.level + 1)}</p>
                  <div className="developmentXpBar"><i style={{width:`${progressPercent}%`}} /></div>
                  <small>{progress.xp} / {target} XP</small>
                </>}
                <div className="milestoneTrack">{[1,2,3,4,5,6].map((level)=><span key={level} className={level < progress.level ? "done" : level === progress.level ? "current" : progress.pendingMilestoneLevels.includes(level) ? "earned" : ""}><b>{level}</b><small>{level===1?"BASE":level===2?"TÉCNICA":level===3?"+ATR":level===4?"ESPEC.":level===5?"+ATR":"EVOL."}</small></span>)}</div>
              </div>

              <div className="developmentProgressAction">
                {!nextLevel && <div className="developmentNoUpgrade"><strong>Nenhum level up pendente</strong><p>{progress.level >= MAX_HERO_LEVEL ? "Nível principal concluído. XP futuro aumenta a Maestria automaticamente (até 5), melhorando a consistência solo no Dispatch." : `Faltam ${Math.max(0,(target ?? 0)-progress.xp)} XP para o próximo nível.`}</p></div>}
                {nextLevel && [3,5].includes(nextLevel) && <div className="developmentAttributeHint"><span className="sectionLabel">NÍVEL {nextLevel} · +1 ATRIBUTO</span><strong>Escolha no painel ao lado</strong><p>Use + para pré-visualizar o ponto no radar. O limite atual de cada atributo é 5.</p></div>}
                {nextLevel && [2,4,6].includes(nextLevel) && <div className="developmentTechniquePrompt"><span className="sectionLabel">UPGRADE PENDENTE</span><strong>A escolha está destacada no painel principal</strong><p>Selecione uma das abordagens à esquerda para concluir este nível.</p></div>}
              </div>

              <div className="developmentUnlocked developmentUnlockedInline"><span className="sectionLabel">TÉCNICAS DESBLOQUEADAS</span>{progress.unlockedTechniqueIds.length ? <div>{hero.techniques.filter((item)=>progress.unlockedTechniqueIds.includes(item.id)).map((item)=><span key={item.id}><strong>{item.name}</strong><small>{item.description}</small></span>)}</div> : <p>Nenhuma técnica de progressão desbloqueada ainda.</p>}</div>
            </div>
          </div>
        </section>
      </section>
      <div className="developmentMessage">{message}</div>
    </main>
  );
}
