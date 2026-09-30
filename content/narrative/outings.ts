import type { OutingScene } from "@/game/types";

const yukiOutings: OutingScene[] = [
  {
    id:"outing-day3-yuki",
    day:3,
    characterId:"yuki",
    speaker:"Yuki",
    title:"Cafeteria 24 horas",
    backgroundImage:"/heroes/yuki.png",
    paragraphs:[
      "Os dois chegam na cafeteria, nem parece que se viram durante o expediente todo. Yuki se aproxima e vocês se cumprimentam com um abraço meio vergonhoso, logo seguindo para o balcão. Sem nem perceber, os dois falam ao mesmo tempo, pedindo um café preto com açúcar. Vocês se olham por um instante e riem da coincidência, finalmente indo para a mesa.",
      "Vocês sentam um do lado do outro, bem próximos, mais próximos do que imaginavam, tal qual aquela relação que estavam criando. Após um silêncio constrangedor, os cafés finalmente chegam, salvando um pouco a situação.",
      "Os dois aproveitam aquele café quente juntos, comentando sobre como foi o dia, as coisas que aconteceram durante o expediente e como era bom finalmente ter um pouco de descanso. Depois de um dia inteiro de trabalho, poder relaxar já era bom. Com alguém próximo, melhor ainda.",
    ],
    continueLabel:"Voltar ao NEXO",
    completionFlag:"scene:outing-day3-yuki:complete",
  },
  {
    id:"outing-day6-yuki",
    day:6,
    characterId:"yuki",
    speaker:"Yuki",
    title:"Apartamento do Yuki",
    backgroundImage:"/heroes/yuki.png",
    paragraphs:[
      "Ao chegar, você é recebido logo depois de interfonar. Yuki recebe você com um grande abraço, e dá pra sentir que ele acabou de sair do banho. Vocês sobem pelo elevador rindo sobre a possibilidade da pizza ter ou não abacaxi.",
      "Quando chegam ao apartamento, Yuki começa a mostrar o lugar: a sala, a cozinha, o quarto e, por fim, o banheiro. Ele entrega uma toalha e avisa que o chuveiro esquenta rápido e bastante, então é melhor tomar cuidado, indo para a cozinha logo em seguida.",
      "Você liga o chuveiro, tira a roupa e entra no box, deixando a porta do banheiro aberta para trás.",
      "Yuki escuta o barulho do chuveiro alto demais para um lugar fechado e vai verificar o que está acontecendo. Ao perceber a porta aberta, ele bate antes de entrar.",
      "Você finge que não escuta.",
      "Yuki bate novamente.",
      "Dessa vez, você responde que pode entrar.",
      "A porta se fecha.",
      "Por alguns segundos, apenas o barulho do chuveiro pode ser ouvido. Você estranha o silêncio, mas, logo depois, a porta do box começa a se abrir.",
      "Yuki aparece do outro lado e pergunta: \"Posso entrar mesmo?\"",
    ],
    continueLabel:"Voltar ao NEXO",
    completionFlag:"scene:outing-day6-yuki:complete",
  },
];

/**
 * PLACEHOLDERS DE TESTE para as cenas presenciais das demais rotas.
 * Yuki já possui autoria real nos marcos 3 e 6.
 */
const people = [
  { id:"elysia", speaker:"Elysia", image:"/heroes/elysia.jpg", d3:"uma cafeteria, duas bebidas esquecidas esfriando e uma discussao que comecou como brincadeira e virou historia pessoal", d6:"uma noite olhando as luzes da cidade, comida dividida e a sensacao de que nenhum dos dois tinha pressa de encerrar" },
  { id:"lysandro", speaker:"Lysandro", image:"/heroes/lysandro.jpg", d3:"uma caminhada tranquila e uma refeicao sem formalidade; ele falou pouco, mas ficou ate mais tarde do que precisava", d6:"um jantar discreto e uma volta demorada, com uma conversa direta sobre o que mudou entre voces" },
  { id:"helio", speaker:"Helio", image:"/heroes/helio.png", d3:"comida no caminho e um filme escolhido quase no cara ou coroa; metade da diversao foi comentar tudo no pior momento possivel", d6:"uma noite planejada para nao ter nada de trabalho, com conversa, piadas e um intervalo raro em que ele nao precisou estar pronto para reagir" },
  { id:"demetria", speaker:"Demetria", image:"/heroes/demetria.jpg", d3:"uma feira cheia, comida demais para duas pessoas e uma competicao improvisada que nenhum de voces soube explicar depois", d6:"um lugar aberto, uma mesa cheia e horas de conversa sem a sensacao de que havia um relogio contando" },
  { id:"alexandra", speaker:"Alexandra", image:"/heroes/alexandra.jpg", d3:"um passeio perto da agua, uma parada longa demais num banco e uma conversa que ficou mais pessoal aos poucos", d6:"um passeio calmo, jantar e uma noite em que pequenos detalhes pareceram mais importantes do que qualquer grande gesto" },
  { id:"eros", speaker:"Eros", image:"/heroes/eros.jpg", d3:"uma saida sem roteiro, tres mudancas de plano e risadas suficientes para transformar o improviso em parte da graca", d6:"uma noite que comecou sem plano e terminou parecendo cuidadosamente montada, apesar de ele insistir que foi coincidencia" },
] as const;

const placeholderOutings: OutingScene[] = people.flatMap((person) => ([3, 6] as const).map((day) => ({
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

export const outingScenes: OutingScene[] = [...yukiOutings, ...placeholderOutings];

export function getOutingScene(id: string | null | undefined) {
  return outingScenes.find((scene) => scene.id === id) ?? null;
}
