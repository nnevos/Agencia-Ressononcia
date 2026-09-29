/**
 * MENSAGENS DURANTE O EXPEDIENTE
 * - eventComments: relacionadas a ocorrências específicas.
 * - missionLines: mensagens genéricas durante uma missão por personagem.
 * - ambientMessages: conversas independentes de ocorrências, disparadas por minuto do turno.
 */
export const OPERATIONS_CONTENT_IS_PLACEHOLDER = true;

export const eventComments: Record<string, { heroId: string; text: string }> = {
  "inc-001": { heroId: "alexandra", text: "[PLACEHOLDER] Vi o chamado do Aurora. Se a estrutura estiver cedendo, vão precisar de contenção além de resgate." },
  "inc-002": { heroId: "eros", text: "[PLACEHOLDER] Linha Norte está bem aberta hoje. Se esse alvo subir mais, mobilidade vai fazer diferença." },
  "inc-003": { heroId: "demetria", text: "[PLACEHOLDER] Mercado Velho tem estrutura antiga. Um segundo colapso é bem possível." },
  "inc-004": { heroId: "elysia", text: "[PLACEHOLDER] Pane no hospital e informação baixa... isso pode ser mais do que um gerador ruim." },
  "inc-005": { heroId: "lysandro", text: "[PLACEHOLDER] Reféns e relatos conflitantes. Eu não confiaria na primeira contagem de agressores." },
  "inc-006": { heroId: "alexandra", text: "[PLACEHOLDER] A correnteza da Baixada costuma mudar rápido. Quem entrar precisa pensar na retirada também." },
  "inc-007": { heroId: "helio", text: "[PLACEHOLDER] Artefatos municipais atraem gente que sabe exatamente o que está procurando. Eu trataria isso como alvo planejado." },
  "inc-008": { heroId: "yuki", text: "[PLACEHOLDER] Trem sem frenagem? Se der para controlar o trajeto antes das estações, ainda temos margem." },
  "inc-009": { heroId: "eros", text: "[PLACEHOLDER] Se parte da torre se recusa a evacuar, alguém vai precisar convencer essas pessoas antes da estrutura piorar." },
  "inc-010": { heroId: "demetria", text: "[PLACEHOLDER] Praça cheia muda tudo. Não dá para tratar como uma luta comum." },
};

export const missionLines: Record<string, [string, string, string]> = {
  yuki: ["[PLACEHOLDER] Equipe em movimento. Aviso quando estivermos no local.", "Situação confirmada. Estamos ajustando a abordagem.", "Ainda operando. O cenário mudou um pouco do briefing."],
  elysia: ["[PLACEHOLDER] Recebido. Estamos a caminho.", "Chegamos. Vou fazer uma leitura rápida antes de avançar.", "Tem mais variável aqui do que parecia na chamada."],
  lysandro: ["[PLACEHOLDER] Saindo agora. Deixa o resto com a gente.", "No local. Já deu para entender onde está o problema.", "Seguimos trabalhando. Sem relatório bonito até terminar."],
  helio: ["[PLACEHOLDER] Despacho recebido. A caminho.", "Posição alcançada. Vou manter distância até termos leitura melhor.", "A situação está controlável, mas não está limpa."],
  demetria: ["[PLACEHOLDER] Recebido. Indo para o ponto.", "Chegamos. Primeiro vou garantir que nada mais desabe.", "Ainda tem risco estrutural. Estamos segurando a área."],
  alexandra: ["[PLACEHOLDER] Despacho confirmado. A caminho.", "No local. Vou priorizar civis e estabilização.", "Ainda há fatores que não estavam no chamado inicial."],
  eros: ["[PLACEHOLDER] Recebido. Vou na frente para reconhecer.", "Estou no local. Já consigo ver melhor a situação.", "Atualização: o cenário está mudando, mas seguimos operando."],
};

export const ambientMessages = [
  { id: "ambient-dia1-01", day: 1, minute: 70, senderHeroId: "lysandro", text: "[PLACEHOLDER] Alguém mexeu no café da sala de descanso ou ele sempre foi desse jeito?" },
  { id: "ambient-dia1-02", day: 1, minute: 73, senderHeroId: "elysia", text: "[PLACEHOLDER] Não pergunta. Só aceita que algumas coisas na Agência ainda precisam de investimento." },
] as const;
