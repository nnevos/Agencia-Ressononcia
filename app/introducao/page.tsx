"use client";

import { introductionSequence } from "@/content/narrative/introduction";
import { tutorialSteps } from "@/content/narrative/tutorial";
import { useRouter } from "next/navigation";
import { useState } from "react";

const sequence = [
  ...introductionSequence.map((item) => ({ kind: "intro" as const, title: item.speaker, body: item.text })),
  ...tutorialSteps.map((item) => ({ kind: "tutorial" as const, title: item.title, body: item.body })),
];

export default function IntroductionPage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const current = sequence[index];

  function next() {
    if (index >= sequence.length - 1) router.push("/agencia");
    else setIndex((value) => value + 1);
  }

  return <main className="centerPage">
    <section className="formCard introCard">
      <p className="eyebrow">{current.kind === "intro" ? "INTRODUÇÃO" : "TUTORIAL"} · {index + 1}/{sequence.length}</p>
      <h1>{current.title}</h1>
      <p className="lead">{current.body}</p>
      <div className="actions">
        <button className="button primary" onClick={next}>{index === sequence.length - 1 ? "IR PARA A CENTRAL" : "CONTINUAR"}</button>
        <button className="button ghost" onClick={() => router.push("/agencia")}>PULAR</button>
      </div>
    </section>
  </main>;
}
