"use client";

import { createNewSave, writeSave } from "@/lib/save";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function NewGamePage() {
  const router = useRouter();
  const [name, setName] = useState("");

  function createGame(event: FormEvent) {
    event.preventDefault();
    writeSave(createNewSave(name));
    router.push("/introducao");
  }

  return <main className="newGamePage">
    <div className="newGameArt"><span>ARTE / AGÊNCIA</span></div>
    <form className="newGamePanel" onSubmit={createGame}>
      <LinkBack />
      <p className="eyebrow">NOVO ARQUIVO</p>
      <h1>Primeiro dia.</h1>
      <p>Você acaba de ser contratado como Despachante da Agência Ressonância.</p>
      <label>Nome do Despachante<input autoFocus required minLength={2} maxLength={24} value={name} onChange={(e) => setName(e.target.value)} placeholder="Digite seu nome" /></label>
      <button className="button primary" type="submit">ENTRAR NA AGÊNCIA →</button>
      <small>O tutorial pode ser pulado a qualquer momento durante a apresentação.</small>
    </form>
  </main>;
}

function LinkBack() { return <a className="newGameBack" href="/">← MENU PRINCIPAL</a>; }
