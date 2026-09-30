import type { RelationshipDelta } from "@/game/types";

/**
 * Abertura oficial do Dia 1. Edison e a supervisor do Analista na Agencia.
 * Texto e estrutura narrativa ficam aqui; a tela apenas interpreta os blocos.
 */
export const INTRO_HERO_IDS = ["yuki", "elysia", "lysandro", "helio", "demetria", "alexandra", "eros"] as const;

export const introductionSequence = [
  { id: "intro-001", speaker: "Edison", text: "Bem-vindo ao seu primeiro dia como Despachante de Heróis." },
  { id: "intro-002", speaker: "Edison", text: "Aqui na Agência Ressonância, somos especializados em heróis com poderes elementais." },
  { id: "intro-003", speaker: "Edison", text: "Analisamos seu currículo antes de contratá-lo. Sua capacidade de adaptação e, principalmente, sua habilidade em gestão de pessoas chamaram nossa atenção." },
  { id: "intro-004", speaker: "Edison", text: "Por isso, sua responsabilidade aqui será gerenciar nosso novo time de heróis: os Guerreiros Elementais." },
  { id: "intro-005", speaker: "Edison", text: "Todos estão no início de suas carreiras. Alguns acabaram de despertar seus poderes. Outros ainda estão aprendendo a trabalhar em equipe." },
  { id: "intro-006", speaker: "Edison", text: "Seu trabalho será ajudá-los a evoluir individualmente... e também como grupo." },
  { id: "intro-007", speaker: "Edison", text: "Ser um herói não significa apenas ter um poder extraordinário. É preciso saber quando agir, com quem agir e, principalmente, confiar nas pessoas ao seu lado." },
  { id: "intro-008", speaker: "Edison", text: "Vou adicionar você ao grupo do NEXO. Ele é nosso canal corporativo para operações e assuntos da equipe. As conversas privadas continuam privadas entre os participantes." },
] as const;

export type IntroNexoChoice = {
  id: string;
  text: string;
  tone: "profissional" | "confiante" | "descontraido" | "autoritario";
  delta: RelationshipDelta;
};

export const introNexoChoices: IntroNexoChoice[] = [
  { id: "intro-nexo-profissional", text: "Boa tarde, pessoal! Sou o novo Despachante de vocês. É um prazer conhecer todos!", tone: "profissional", delta: { trust: 1, respect: 1 } },
  { id: "intro-nexo-confiante", text: "Fala, pessoal. Espero que vocês sejam bons no que fazem.", tone: "confiante", delta: { respect: 1, tension: 1 } },
  { id: "intro-nexo-descontraido", text: "Oi. Vamos tentar não destruir a cidade no primeiro dia, beleza?", tone: "descontraido", delta: { intimacy: 1, tension: -1 } },
  { id: "intro-nexo-autoritario", text: "Olá. A partir de agora, vocês seguem minhas ordens.", tone: "autoritario", delta: { respect: -1, trust: -1, tension: 2 } },
];

export const introNexoReplies = [
  { speaker: "Yuki", text: "Entendido. Prazer em conhecê-lo." },
  { speaker: "Elysia", text: "Oi!! Finalmente mandaram alguém pra gente!" },
  { speaker: "Lysandro", text: "Bem-vindo." },
  { speaker: "Hélio", text: "E aí! Quando começa a ação?" },
  { speaker: "Demétria", text: "Seja bem-vindo à equipe." },
  { speaker: "Alexandra", text: "Prazer em conhecê-lo. Espero que possamos trabalhar bem juntos." },
  { speaker: "Eros", text: "👋" },
] as const;

export const introAfterNexo = [
  { id: "intro-sdh-01", speaker: "Edison", text: "Agora vamos ao que realmente interessa. Este é o Sistema de Despache de Heróis." },
  { id: "intro-sdh-02", speaker: "Edison", text: "Aqui você receberá os chamados da cidade e decidirá quais heróis deverão ser enviados para cada ocorrência." },
  { id: "intro-sdh-03", speaker: "Edison", text: "Parece que já temos trabalho. Vou acompanhar seu primeiro despacho pela Central." },
] as const;
