import type { OutingScene } from "@/game/types";

/**
 * PLACEHOLDERS DE TESTE para as cenas presenciais dos Dias 3 e 6.
 * A tela e o pipeline sao definitivos; imagens e textos abaixo devem ser trocados
 * pelos arquivos finais de autoria sem alterar componentes React.
 */

const people = [
  { id:"yuki", speaker:"Yuki", image:"/heroes/yuki.png", d3:"uma caminhada curta, uma parada para algo gelado e uma conversa que foi ficando menos casual sem nenhum dos dois anunciar isso", d6:"um passeio longo fora da rota habitual, jantar simples e tempo suficiente para os silencios deixarem de ser desconfortaveis" },
  { id:"elysia", speaker:"Elysia", image:"/heroes/elysia.jpg", d3:"uma cafeteria, duas bebidas esquecidas esfriando e uma discussao que comecou como brincadeira e virou historia pessoal", d6:"uma noite olhando as luzes da cidade, comida dividida e a sensacao de que nenhum dos dois tinha pressa de encerrar" },
  { id:"lysandro", speaker:"Lysandro", image:"/heroes/lysandro.jpg", d3:"uma caminhada tranquila e uma refeicao sem formalidade; ele falou pouco, mas ficou ate mais tarde do que precisava", d6:"um jantar discreto e uma volta demorada, com uma conversa direta sobre o que mudou entre voces" },
  { id:"helio", speaker:"Helio", image:"/heroes/helio.png", d3:"comida no caminho e um filme escolhido quase no cara ou coroa; metade da diversao foi comentar tudo no pior momento possivel", d6:"uma noite planejada para nao ter nada de trabalho, com conversa, piadas e um intervalo raro em que ele nao precisou estar pronto para reagir" },
  { id:"demetria", speaker:"Demetria", image:"/heroes/demetria.jpg", d3:"uma feira cheia, comida demais para duas pessoas e uma competicao improvisada que nenhum de voces soube explicar depois", d6:"um lugar aberto, uma mesa cheia e horas de conversa sem a sensacao de que havia um relogio contando" },
  { id:"alexandra", speaker:"Alexandra", image:"/heroes/alexandra.jpg", d3:"um passeio perto da agua, uma parada longa demais num banco e uma conversa que ficou mais pessoal aos poucos", d6:"um passeio calmo, jantar e uma noite em que pequenos detalhes pareceram mais importantes do que qualquer grande gesto" },
  { id:"eros", speaker:"Eros", image:"/heroes/eros.jpg", d3:"uma saida sem roteiro, tres mudancas de plano e risadas suficientes para transformar o improviso em parte da graca", d6:"uma noite que comecou sem plano e terminou parecendo cuidadosamente montada, apesar de ele insistir que foi coincidencia" },
] as const;

export const outingScenes: OutingScene[] = people.flatMap((person) => ([3, 6] as const).map((day) => ({
  id:`outing-day${day}-${person.id}`,
  day,
  characterId:person.id,
  speaker:person.speaker,
  title: day === 3 ? `Saida com ${person.speaker}` : `Encontro com ${person.speaker}`,
  backgroundImage:person.image,
  paragraphs:[
    `[PLACEHOLDER DE TESTE] ${day === 3 ? person.d3 : person.d6}.`,
    day === 3
      ? "Foi uma cena curta, mais sobre finalmente estarem no mesmo lugar sem uma ocorrencia no meio do que sobre fazer algo grandioso. Quando acabou, ficou material suficiente para a conversa do dia seguinte parecer diferente."
      : "Desta vez nao houve muita margem para chamar de outra coisa. O clima foi de date, com espaco para intimidade e para a rota assumir que a relacao chegou a um marco importante.",
    "Este texto e a imagem de fundo sao substituiveis em content/narrative/outings.ts. A tela, o save e a transicao nao precisam ser reescritos quando entrar a versao final.",
  ],
  continueLabel:"Voltar ao NEXO",
  completionFlag:`scene:outing-day${day}-${person.id}:complete`,
})));

export function getOutingScene(id: string | null | undefined) {
  return outingScenes.find((scene) => scene.id === id) ?? null;
}
