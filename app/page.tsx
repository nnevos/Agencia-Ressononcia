"use client";

import { MAIN_MENU_TEXT } from "@/content/ui/menu";
import { accountBackendAvailable, clearAccountSession, createAccount, loadAccountSession, signInAccount, startGuestSession, type AccountSession } from "@/lib/account";
import { createNewSave, exportSaveJson, importSaveJson, isPostShiftOnlySave, loadSave, writeSave, type NewGameMode } from "@/lib/save";
import { DEFAULT_SETTINGS, loadSettings, writeSettings, type RessonanciaSettings } from "@/lib/settings";
import { reconcileCloudSave, resolveCloudConflict } from "@/lib/cloudSync";
import type { PlayerPronouns, SaveGame } from "@/game/types";
import { PLAYER_PRONOUN_OPTIONS } from "@/lib/playerText";
import { publicPath } from "@/lib/publicPath";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type MenuPanel = "main" | "new" | "load" | "account" | "settings";

function resumeHref(save: SaveGame) {
  if (isPostShiftOnlySave(save)) return "/conversa";
  if (save.flags.includes("onboarding_pending")) return "/introducao";
  if (save.player.developmentRequired) return "/desenvolvimento";
  if (save.shift.status === "finished") return "/conversa";
  return "/agencia";
}

function saveStatus(save: SaveGame) {
  if (isPostShiftOnlySave(save)) return `Noite ${save.player.currentDay} · modo pós-expediente`;
  if (save.flags.includes("onboarding_pending")) return "Introdução pendente";
  if (save.player.developmentRequired) return "Desenvolvimento da equipe";
  if (save.shift.status === "finished") return "Pós-expediente";
  if (save.shift.status === "running") return "Expediente em andamento";
  return "Próximo expediente";
}

export default function Home() {
  const router = useRouter();
  const importRef = useRef<HTMLInputElement | null>(null);
  const [panel, setPanel] = useState<MenuPanel>("account");
  const [save, setSave] = useState<SaveGame | null>(null);
  const [account, setAccount] = useState<AccountSession | null>(null);
  const [settings, setSettings] = useState<RessonanciaSettings>(DEFAULT_SETTINGS);
  const [transitioning, setTransitioning] = useState(false);
  const [notice, setNotice] = useState("");
  const [newName, setNewName] = useState("");
  const [newPronouns, setNewPronouns] = useState<PlayerPronouns>("ele-dele");
  const [newGameMode, setNewGameMode] = useState<NewGameMode>("campaign");
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [accountBusy, setAccountBusy] = useState(false);
  const [cloudConflict, setCloudConflict] = useState<{ remoteDay: number; remotePlayerName: string } | null>(null);
  const [accountMode, setAccountMode] = useState<"login" | "create">("login");

  useEffect(() => {
    setSave(loadSave());
    const restoredAccount = loadAccountSession();
    setAccount(restoredAccount);
    setPanel(restoredAccount ? "main" : "account");
    setSettings(loadSettings());
    const requested = new URLSearchParams(window.location.search).get("panel");
    if (restoredAccount) {
      if (requested === "new") setPanel("new");
      if (requested === "load") setPanel("load");
      if (requested === "account") setPanel("account");
      if (requested === "settings") setPanel("settings");
    }
  }, []);

  const destination = useMemo(() => save ? resumeHref(save) : null, [save]);

  function go(href: string) {
    setTransitioning(true);
    window.setTimeout(() => router.push(href), settings.reducedMotion ? 0 : 260);
  }

  function open(next: MenuPanel) {
    setNotice("");
    setPanel(next);
  }

  function setAuthMode(next: "login" | "create") {
    if (accountBusy) return;
    setNotice("");
    setAccountMode(next);
  }

  function createGame(event: FormEvent) {
    event.preventDefault();
    if (save && !window.confirm("Iniciar um novo jogo? O progresso local atual será substituído.")) return;
    const created = createNewSave(newName.trim(), newPronouns, newGameMode);
    writeSave(created);
    setSave(created);
    go(newGameMode === "post-shift-only" ? "/conversa" : "/introducao");
  }

  function exportCurrentSave() {
    if (!save) return;
    const blob = new Blob([exportSaveJson(save)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `ressonancia-save-dia-${save.player.currentDay}.json`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    setNotice("Save exportado.");
  }

  async function importFile(file: File) {
    const imported = importSaveJson(await file.text());
    if (!imported) { setNotice("Arquivo de save inválido ou incompatível."); return; }
    if (save && !window.confirm(`Substituir o arquivo atual pelo save de ${imported.player.name}, Dia ${imported.player.currentDay}?`)) return;
    writeSave(imported);
    setSave(imported);
    setNotice(`Save de ${imported.player.name} importado.`);
  }

  async function finishCloudLogin(session: AccountSession) {
    setAccount(session);
    if (session.mode !== "supabase") return;
    const result = await reconcileCloudSave();
    if (result.status === "conflict") {
      setCloudConflict({ remoteDay: result.remoteDay, remotePlayerName: result.remotePlayerName });
      setNotice("Há um save local e outro na nuvem. Escolha qual versão manter antes de sincronizar.");
      return;
    }
    setCloudConflict(null);
    setSave(loadSave());
    const messages: Record<string, string> = {
      "empty": "Conta conectada. A nuvem está pronta para o primeiro save.",
      "uploaded-local": "Conta conectada. Seu save local foi enviado para a nuvem.",
      "downloaded-cloud": "Conta conectada. Seu save da nuvem foi carregado neste dispositivo.",
      "in-sync": "Conta conectada. Save local e nuvem já estão sincronizados.",
    };
    setNotice(messages[result.status] ?? "Conta conectada.");
    setPanel("main");
  }

  async function submitAccount(event: FormEvent) {
    event.preventDefault();
    if (!accountBackendAvailable()) { setNotice("Supabase não configurado. Use .env.local e execute a migration incluída em supabase/migrations."); return; }
    setAccountBusy(true);
    setNotice("");
    try {
      if (accountMode === "create") {
        await finishCloudLogin(await createAccount(email.trim(), password, displayName.trim()));
      } else {
        await finishCloudLogin(await signInAccount(email.trim(), password));
      }
      setPassword("");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Não foi possível conectar à conta.");
    } finally {
      setAccountBusy(false);
    }
  }

  function useGuest() {
    setAccount(startGuestSession());
    setNotice("Modo sem conta ativo. Seu save continua apenas neste navegador.");
    setPanel("main");
  }

  async function signOut() {
    await clearAccountSession();
    setAccount(null);
    setCloudConflict(null);
    setNotice("Sessão encerrada. O save local continua neste navegador.");
    setPanel("account");
  }

  async function chooseConflict(choice: "local" | "cloud") {
    setAccountBusy(true);
    try {
      const resolved = await resolveCloudConflict(choice);
      setSave(resolved);
      setCloudConflict(null);
      setNotice(choice === "local" ? "Save local mantido e enviado para a nuvem." : "Save da nuvem carregado neste dispositivo.");
      setPanel("main");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Não foi possível resolver o conflito de save.");
    } finally {
      setAccountBusy(false);
    }
  }

  function updateSettings(next: RessonanciaSettings) {
    setSettings(next);
    writeSettings(next);
  }

  async function toggleFullscreen() {
    try {
      if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
      else await document.exitFullscreen();
    } catch {
      setNotice("Tela cheia não está disponível neste navegador.");
    }
  }

  return (
    <main className={`mainMenuPage ${settings.reducedMotion ? "motionReduced" : ""} ${transitioning ? "isLeaving" : ""}`}>
      <div className="mainMenuBackdrop" style={{ backgroundImage: `url(${publicPath("/menu/cidade-noturna.webp")})` }} aria-hidden="true" />
      <div className="mainMenuFade" aria-hidden="true" />
      <div className="mainMenuVignette" aria-hidden="true" />

      <section className="mainMenuPanel" aria-label="Menu principal">
        <header className="mainMenuBrand">
          <p className="mainMenuAgency">{MAIN_MENU_TEXT.eyebrow}</p>
          <h1>{MAIN_MENU_TEXT.title}</h1>
          <p className="menuTagline">{MAIN_MENU_TEXT.tagline}</p>
        </header>

        <div className="mainMenuBody">
          {panel === "main" && <nav className="mainMenuActions" aria-label="Ações principais">
            <button className="mainMenuAction" disabled={!destination} onClick={() => destination && go(destination)}>
              <strong>{MAIN_MENU_TEXT.continueLabel}</strong>
              <span>{save ? `Dia ${save.player.currentDay} · ${saveStatus(save)}` : "Nenhum arquivo em andamento"}</span>
            </button>
            <button className="mainMenuAction" onClick={() => open("new")}><strong>NOVO JOGO</strong><span>Começar uma nova campanha</span></button>
            <button className="mainMenuAction" onClick={() => open("load")}><strong>CARREGAR JOGO</strong><span>Save local, importar ou exportar</span></button>
            <button className="mainMenuAction" onClick={() => open("account")}><strong>CONTA / ACESSO</strong><span>{account ? account.mode === "guest" ? "Jogando sem conta" : account.email : "Entrar, criar conta ou jogar localmente"}</span></button>
            <button className="mainMenuAction" onClick={() => open("settings")}><strong>CONFIGURAÇÕES</strong><span>Interface, texto e tela</span></button>
          </nav>}

          {panel !== "main" && <section className="menuSubPanel" aria-live="polite">
            {(panel !== "account" || account) && <button className="menuBackButton" onClick={() => open("main")}>← MENU PRINCIPAL</button>}

            {panel === "new" && <form className="menuPanelForm" onSubmit={createGame}>
              <p className="menuPanelEyebrow">NOVO JOGO</p><h2>Primeiro dia.</h2>
              <p>Escolha se quer jogar a experiência completa ou entrar direto nas relações pós-expediente.</p>
              {save && <div className="menuWarning"><strong>Arquivo atual detectado</strong><span>Dia {save.player.currentDay} · {save.player.name}. Criar outro jogo substituirá este save local.</span></div>}
              <label>Nome do Analista<input autoFocus required minLength={2} maxLength={24} value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Digite seu nome" /></label>
              <fieldset className="newGameModePicker pronounPicker">
                <legend>Pronomes</legend>
                {PLAYER_PRONOUN_OPTIONS.map((option) => <label key={option.value} className={newPronouns === option.value ? "selected" : ""}>
                  <input type="radio" name="player-pronouns" value={option.value} checked={newPronouns === option.value} onChange={() => setNewPronouns(option.value)} />
                  <span><strong>{option.label}</strong><small>Usados apenas quando o texto não puder ser naturalmente neutro.</small></span>
                </label>)}
              </fieldset>
              <fieldset className="newGameModePicker">
                <legend>Modo de jogo</legend>
                <label className={newGameMode === "campaign" ? "selected" : ""}>
                  <input type="radio" name="new-game-mode" value="campaign" checked={newGameMode === "campaign"} onChange={() => setNewGameMode("campaign")} />
                  <span><strong>Campanha completa</strong><small>Introdução, expediente, Desenvolvimento e pós-expediente.</small></span>
                </label>
                <label className={newGameMode === "post-shift-only" ? "selected" : ""}>
                  <input type="radio" name="new-game-mode" value="post-shift-only" checked={newGameMode === "post-shift-only"} onChange={() => setNewGameMode("post-shift-only")} />
                  <span><strong>Só pós-expediente</strong><small>Pula a Central e joga apenas NEXO, rotas sociais e encontros.</small></span>
                </label>
              </fieldset>
              <button className="menuPrimaryButton" type="submit">{newGameMode === "post-shift-only" ? "INICIAR PÓS-EXPEDIENTE →" : "INICIAR NOVA CAMPANHA →"}</button>
            </form>}

            {panel === "load" && <div className="menuPanelStack">
              <p className="menuPanelEyebrow">CARREGAR JOGO</p><h2>Arquivos de campanha</h2>
              {save ? <article className="saveSlotCard">
                <div><span>ARQUIVO LOCAL</span><strong>{save.player.name}</strong><p>Dia {save.player.currentDay} · {saveStatus(save)}</p></div>
                <button onClick={() => go(resumeHref(save))}>CONTINUAR</button>
              </article> : <div className="menuEmptyState">Nenhum save local encontrado.</div>}
              <div className="menuButtonRow">
                <button className="menuSecondaryButton" disabled={!save} onClick={exportCurrentSave}>EXPORTAR SAVE</button>
                <button className="menuSecondaryButton" onClick={() => importRef.current?.click()}>IMPORTAR SAVE</button>
                <input ref={importRef} type="file" accept="application/json,.json" hidden onChange={(event) => { const file = event.target.files?.[0]; if (file) void importFile(file); event.target.value = ""; }} />
              </div>
            </div>}

            {panel === "account" && <div className="menuPanelStack">
              <p className="menuPanelEyebrow">CONTA / ACESSO</p><h2>Como você quer jogar?</h2>
              {account ? <div className="accountCurrentCard"><span>SESSÃO ATUAL</span><strong>{account.mode === "guest" ? "Sem conta" : account.displayName || account.email}</strong><p>{account.mode === "guest" ? "Progresso salvo apenas neste navegador." : "Conta Supabase conectada · save local-first com sincronização cloud."}</p>{cloudConflict && <div className="menuWarning"><strong>CONFLITO DE SAVE</strong><span>Nuvem: {cloudConflict.remotePlayerName}, Dia {cloudConflict.remoteDay}. Escolha qual arquivo será a fonte desta conta.</span><div className="menuButtonRow"><button disabled={accountBusy} onClick={() => void chooseConflict("local")}>USAR LOCAL</button><button disabled={accountBusy} onClick={() => void chooseConflict("cloud")}>USAR NUVEM</button></div></div>}<button className="menuSecondaryButton" disabled={accountBusy} onClick={() => void signOut()}>ENCERRAR SESSÃO</button></div> : <>
                <div className="accountModeSwitch" role="tablist" aria-label="Escolha entre entrar ou criar conta">
                  <button type="button" role="tab" aria-selected={accountMode === "login"} className={accountMode === "login" ? "active" : ""} onClick={() => setAuthMode("login")}>
                    <strong>ENTRAR</strong><span>Já tenho conta</span>
                  </button>
                  <button type="button" role="tab" aria-selected={accountMode === "create"} className={accountMode === "create" ? "active" : ""} onClick={() => setAuthMode("create")}>
                    <strong>CRIAR CONTA</strong><span>Primeiro acesso</span>
                  </button>
                </div>
                <form className="menuPanelForm compact accountForm" onSubmit={submitAccount}>
                  {accountMode === "create" && <label>Nome de exibição<input required minLength={2} value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Como quer aparecer" /></label>}
                  <label>E-mail<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="analista@exemplo.com" /></label>
                  <label>Senha<input required type="password" minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" autoComplete={accountMode === "create" ? "new-password" : "current-password"} /></label>
                  <button className="menuPrimaryButton" disabled={accountBusy || !accountBackendAvailable()} type="submit">{accountBusy ? "CONECTANDO..." : accountMode === "create" ? "CRIAR CONTA" : "ENTRAR"}</button>
                  <button className="accountModeFallback" type="button" disabled={accountBusy} onClick={() => setAuthMode(accountMode === "login" ? "create" : "login")}>
                    {accountMode === "login" ? "NÃO TEM CONTA? CRIAR CONTA" : "JÁ TEM CONTA? ENTRAR"}
                  </button>
                  <small>{accountBackendAvailable() ? "Conta simples via Supabase: criar conta entra automaticamente. O jogo continua local-first e sincroniza o save quando a conta está ativa." : "Supabase ainda não configurado nesta instalação. Jogue sem conta ou configure .env.local."}</small>
                </form>
                <div className="accountDivider"><span>OU</span></div>
                <button type="button" className="menuSecondaryButton wide" onClick={useGuest}>JOGAR SEM CONTA</button>
              </>}
            </div>}

            {panel === "settings" && <div className="menuPanelStack">
              <p className="menuPanelEyebrow">CONFIGURAÇÕES</p><h2>Interface</h2>
              <div className="settingsRows">
                <div><span><strong>Movimento</strong><small>Transições e animação ambiente do menu.</small></span><button onClick={() => updateSettings({ ...settings, reducedMotion: !settings.reducedMotion })}>{settings.reducedMotion ? "REDUZIDO" : "ATIVO"}</button></div>
                <div><span><strong>Velocidade das mensagens</strong><small>Intervalo entre bolhas automáticas do NEXO.</small></span><button onClick={() => updateSettings({ ...settings, textSpeed: settings.textSpeed === "normal" ? "fast" : "normal" })}>{settings.textSpeed === "fast" ? "RÁPIDA" : "NORMAL"}</button></div>
                <div><span><strong>Tela cheia</strong><small>Alterna o navegador para o modo de tela cheia.</small></span><button onClick={() => void toggleFullscreen()}>ALTERNAR</button></div>
              </div>
            </div>}

            {notice && <p className="menuNotice" role="status">{notice}</p>}
          </section>}
        </div>

        <footer className="mainMenuFooter"><span>{MAIN_MENU_TEXT.subline}</span><span>{MAIN_MENU_TEXT.versionLabel}</span></footer>
      </section>
      <div className="menuTransitionCurtain" aria-hidden="true" />
    </main>
  );
}
