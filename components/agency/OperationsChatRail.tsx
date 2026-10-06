import { getHeroPortrait } from "@/game/data/heroPortraits";
import { formatGameTime } from "@/game/simulation/shift";
import type { OperationalHero } from "@/game/types";
import type { RefObject } from "react";

export type OperationsChatMessage = { id: string; sender: string; minute: number; text: string; kind?: string };

export function OperationsChatRail({ messages, operationalHeroes, feedRef }: { messages: OperationsChatMessage[]; operationalHeroes: OperationalHero[]; feedRef: RefObject<HTMLDivElement | null> }) {
  return <aside className="opsChatRail" aria-label="NEXO operações">
    <header className="chatHeader"><div><span className="chatAppIcon">N</span><div><strong>NEXO</strong><small>AGÊNCIA // OPERAÇÕES</small></div></div><div className="chatHeaderBadges"><span className="placeholderBadge">QA PLACEHOLDER</span><span className="readOnlyBadge">SOMENTE LEITURA</span></div></header>
    <div className="chatFeed" ref={feedRef} aria-live="polite" aria-relevant="additions text">
      {messages.map((chat) => <article key={chat.id} className={`chatMessage ${chat.kind ?? "agent"}`}>
        <div className="chatAvatar">{(() => { const senderHero = operationalHeroes.find((hero) => hero.name === chat.sender); const portrait = senderHero ? getHeroPortrait(senderHero.id) : null; return portrait ? <img src={portrait} alt="" /> : chat.sender === "NEXO" ? "N" : chat.sender.slice(0,2).toUpperCase(); })()}</div>
        <div className="chatBubble"><div><strong>{chat.sender}</strong><time>{formatGameTime(chat.minute)}</time></div><p>{chat.text}</p></div>
      </article>)}
    </div>
    <footer className="chatLocked"><span aria-hidden="true">🔒</span><div><strong>Canal operacional</strong><small>O grupo Guerreiros Elementais é usado em operações e pode ser supervisionado pela Agência. DMs privadas no NEXO não são supervisionadas.</small></div></footer>
  </aside>;
}
