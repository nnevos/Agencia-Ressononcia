import { getHeroPortrait } from "@/game/data/heroPortraits";
import { heroes } from "@/game/data/heroes";
import { formatGameTime } from "@/game/simulation/shift";
import type { RefObject } from "react";

export type OperationsChatMessage = { id: string; sender: string; minute: number; text: string; kind?: string };

const HERO_ID_BY_NAME = new Map(heroes.map((hero) => [hero.name, hero.id] as const));

function senderAvatar(sender: string) {
  const heroId = HERO_ID_BY_NAME.get(sender);
  const portrait = heroId ? getHeroPortrait(heroId) : null;
  if (portrait) return <img src={portrait} alt="" />;
  return sender === "NEXO" ? "N" : sender.slice(0, 2).toUpperCase();
}

export function OperationsChatRail({ messages, feedRef }: { messages: OperationsChatMessage[]; feedRef: RefObject<HTMLDivElement | null> }) {
  return <aside className="opsChatRail" aria-label="NEXO operações">
    <header className="chatHeader"><div><span className="chatAppIcon">N</span><div><strong>NEXO</strong><small>AGÊNCIA // OPERAÇÕES</small></div></div><div className="chatHeaderBadges"><span className="placeholderBadge">QA PLACEHOLDER</span><span className="readOnlyBadge">SOMENTE LEITURA</span></div></header>
    <div className="chatFeed" ref={feedRef} aria-live="polite" aria-relevant="additions text">
      {messages.map((chat) => <article key={chat.id} className={`chatMessage ${chat.kind ?? "agent"}`}>
        <div className="chatAvatar">{senderAvatar(chat.sender)}</div>
        <div className="chatBubble"><div><strong>{chat.sender}</strong><time>{formatGameTime(chat.minute)}</time></div><p>{chat.text}</p></div>
      </article>)}
    </div>
    <footer className="chatLocked"><span aria-hidden="true">🔒</span><div><strong>Canal operacional</strong><small>O grupo Guerreiros Elementais é usado em operações e pode ser supervisionado pela Agência. DMs privadas no NEXO não são supervisionadas.</small></div></footer>
  </aside>;
}
