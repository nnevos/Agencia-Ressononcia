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

  return (
    <main className="centerPage">
      <form className="formCard" onSubmit={createGame}>
        <p className="eyebrow">NOVO ARQUIVO</p>
        <h1>Quem está na central?</h1>
        <p>Você é o novo analista de despacho da Agência Ressonância.</p>
        <label>Nome do analista<input required minLength={2} maxLength={24} value={name} onChange={(e) => setName(e.target.value)} placeholder="Digite seu nome" /></label>
        <button className="button primary" type="submit">Iniciar primeiro turno</button>
      </form>
    </main>
  );
}
