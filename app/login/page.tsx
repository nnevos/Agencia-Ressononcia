"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    localStorage.setItem("ressonancia.session", JSON.stringify({ email, mock: true }));
    const save = localStorage.getItem("ressonancia.save");
    router.push(save ? "/agencia" : "/novo-jogo");
  }

  return (
    <main className="centerPage">
      <form className="formCard" onSubmit={submit}>
        <p className="eyebrow">ACESSO DO ANALISTA</p>
        <h1>Entrar</h1>
        <label>E-mail<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="analista@exemplo.com" /></label>
        <label>Senha<input required type="password" minLength={4} placeholder="••••••••" /></label>
        <button className="button primary" type="submit">Acessar central</button>
        <p className="microcopy">Nesta fase, o login é simulado no navegador.</p>
        <Link href="/novo-jogo">Criar arquivo de jogo</Link>
      </form>
    </main>
  );
}
