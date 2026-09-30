import type { DialogueChoice, DialogueMessage, DialogueScene } from "@/game/types";

function c(
  id: string,
  text: string,
  response: string,
  flag: string,
  romanceAffinity: 100 | 50 | 30,
  delta: DialogueChoice["delta"],
  extras: Partial<DialogueChoice> = {},
): DialogueChoice {
  return { id, text, response, flag, romanceAffinity, delta, ...extras };
}

const day1Farewell: DialogueMessage[] = [
  { direction: "outgoing", text: "Bom, vou indo. Ainda tenho que fechar esse relatório de hoje." },
  { direction: "incoming", text: "Beleza, bom resto de trabalho!" },
];

const yukiDay1: DialogueScene = {
  day: 1,
  id: "dia1-yuki-pos-expediente",
  characterId: "yuki",
  speaker: "Yuki",
  timeLabel: "18:47 · NEXO",
  openingOutgoing: "Oi, como você está? Você mandou muito hoje!",
  opening: "Oi, tudo certo. Agora descansando um pouco. Obrigado! E você, se deu bem no trabalho novo? Já fez isso antes?",
  availability: { minDay: 1, maxDay: 1 },
  completionFlag: "scene:dia1-yuki-pos-expediente:complete",
  choices: [
    c("estagio-cafe", "Tô no cansaço aqui também. O café daqui é forte, então já ajuda kkk. E sim, só em estágio, nada demais. Vocês que são um grupo de heróis, sabe.", "Ah, então tu veio direto da faculdade, entendi.", "yuki:r1:t1:30", 30, { respect: 1 }),
    c("sobrevivi", "Sobrevivi ao primeiro dia, então considero uma vitória. Já fiz estágio na área, mas trabalhar com heróis é novidade.", "Ah, então tu veio direto da faculdade, entendi.", "yuki:r1:t1:50", 50, { trust: 1 }),
    c("acostumando", "Já trabalhei um pouco com isso em estágio. Ainda tô me acostumando com a Agência... principalmente com vocês.", "Ah, então tu veio direto da faculdade, entendi.", "yuki:r1:t1:100", 100, { trust: 1, intimacy: 1 }),
  ],
  followUps: [
    {
      id: "yuki:r1:t2",
      prefaceOutgoing: "E você? Veio de onde?",
      incoming: "Cê sabe né, tentando achar meu lugar no mundo basicamente…",
      choices: [
        c("todo-mundo", "Entendo. Meio que todo mundo, acho…", "Nah, tem um pessoal aqui que sabe bem o que quer. Mas vamos ver no que vai dar, né.", "yuki:r1:t2:30", 30, { respect: 1 }, { afterResponse: day1Farewell }),
        c("me-avisa", "Justo. Se descobrir onde fica esse tal lugar, me avisa. Tô procurando também.", "Nah, tem um pessoal aqui que sabe bem o que quer. Mas vamos ver no que vai dar, né.", "yuki:r1:t2:50", 50, { trust: 1 }, { afterResponse: day1Farewell }),
        c("talvez-achou", "Pelo menos parece que as coisas estão indo bem por aqui. Talvez tenha encontrado alguma coisa.", "Nah, tem um pessoal aqui que sabe bem o que quer. Mas vamos ver no que vai dar, né.", "yuki:r1:t2:100", 100, { trust: 1, intimacy: 1 }, { afterResponse: day1Farewell }),
      ],
    },
  ],
};

const day2Bridge: DialogueMessage[] = [
  { direction: "outgoing", text: "Acho que já já termino aqui. Vou comprar pra amanhã cedo." },
  { direction: "incoming", text: "Agora vou pra casa. Tenho que terminar de zerar um jogo que comecei." },
  { direction: "outgoing", text: "Qual?" },
  { direction: "incoming", text: "A Sombra do Colosso. É muito bom, bem tranquilo na verdade, pra contrapor o resto do dia né kkkk" },
];

const day2Farewell: DialogueMessage[] = [
  { direction: "incoming", text: "Enfim, vou indo, flw." },
  { direction: "outgoing", text: "Até amanhã!" },
];

const yukiDay2: DialogueScene = {
  day: 2,
  id: "placeholder-dia2-yuki",
  characterId: "yuki",
  speaker: "Yuki",
  timeLabel: "19:18 · NEXO",
  opening: "Recarregando as baterias. Você deveria experimentar esse sabor novo que saiu, muito bom!",
  openingImage: "/nexo/yuki/energetico-dia2.jpg",
  openingImageAlt: "Foto de uma lata de energético sabor espresso enviada por Yuki.",
  availability: { minDay: 2, maxDay: 2 },
  completionFlag: "scene:placeholder-dia2-yuki:complete",
  choices: [
    c("mercadinho", "Caramba, nunca vi desse. Vou tentar achar no mercadinho aqui do lado.", "Foi lá mesmo que achei. Lá tem outros sabores também se quiser experimentar.", "yuki:r2:t1:50", 50, { trust: 1 }, { afterResponse: day2Bridge }),
    c("patrocinio", "Isso é uma recomendação ou você já foi contratado pela marca?", "Foi lá mesmo que achei. Lá tem outros sabores também se quiser experimentar.", "yuki:r2:t1:100", 100, { intimacy: 1, attraction: 1 }, { afterResponse: day2Bridge }),
    c("relatorio", "Se isso conseguir me manter de pé terminando relatório, já ganhou meu dinheiro.", "Foi lá mesmo que achei. Lá tem outros sabores também se quiser experimentar.", "yuki:r2:t1:30", 30, { respect: 1 }, { afterResponse: day2Bridge }),
  ],
  followUps: [
    {
      id: "yuki:r2:t2",
      incoming: "",
      choices: [
        c("lol", "Daora. Atualmente eu só jogo LOL.", "Achei meio deprimente, desculpa…", "yuki:r2:t2:30", 30, { tension: 1 }, { afterResponse: [
          { direction: "outgoing", text: "É só ARAM, coisa tranquila. Nada sério." },
          { direction: "incoming", text: "Sei…" },
          ...day2Farewell,
        ] }),
        c("monstros", "Então você enfrenta monstros gigantes no trabalho e chega em casa pra enfrentar monstros gigantes?", "Kkkkk pior que falando assim realmente parece estranho. Mas é bom, confia.", "yuki:r2:t2:50", 50, { trust: 1 }, { afterResponse: day2Farewell }),
        c("me-mostrar", "Nunca joguei. Qualquer dia você vai ter que me mostrar.", "Kkkkk pior que falando assim realmente parece estranho. Mas é bom, confia.", "yuki:r2:t2:100", 100, { intimacy: 1, attraction: 1 }, { afterResponse: day2Farewell }),
      ],
    },
  ],
};

const day3Invite: DialogueMessage[] = [
  { direction: "outgoing", text: "Sim, tô saindo agora. Queria um café…" },
  { direction: "incoming", text: "Pior que eu também… Conheço uma cafeteria 24 horas. Tá afim de ir lá comigo?" },
];

const yukiDay3: DialogueScene = {
  day: 3,
  id: "placeholder-dia3-yuki",
  characterId: "yuki",
  speaker: "Yuki",
  timeLabel: "19:26 · NEXO",
  openingOutgoing: "Ei! Você tá bem?",
  opening: "Tô de boa 🙂",
  openingImage: "/nexo/yuki/pos-missao-dia3.jpg",
  openingImageAlt: "Foto enviada por Yuki logo depois de uma missão, ainda todo machucado antes de passar na enfermaria.",
  availability: { minDay: 3, maxDay: 3 },
  completionFlag: "scene:placeholder-dia3-yuki:complete",
  choices: [
    c("enfermaria", "Cara, você passou na enfermaria antes de sair?", "Kkkkk passei, relaxa. Essa foto é de antes de passar lá.", "yuki:r3:t1:30", 30, { trust: 1 }),
    c("nao-combina", "YUKI. “Tô de boa” NÃO combina com essa foto.", "Kkkkk passei, relaxa. Essa foto é de antes de passar lá.", "yuki:r3:t1:50", 50, { trust: 1, tension: 1 }),
    c("coracao", "Você tá tentando me matar do coração no terceiro dia de trabalho?", "Kkkkk passei, relaxa. Essa foto é de antes de passar lá.", "yuki:r3:t1:100", 100, { intimacy: 1, attraction: 1 }),
  ],
  followUps: [
    {
      id: "yuki:r3:t2",
      incoming: "",
      choices: [
        c("que-susto", "Ah tá, que susto. Pô, faz isso não…", "Já tô bem melhor na verdade. E tu, tá de boa?", "yuki:r3:t2:30", 30, { trust: 1 }, { afterResponse: day3Invite }),
        c("foto-depois", "Então começa mandando a foto de DEPOIS da enfermaria, criatura.", "Já tô bem melhor na verdade. E tu, tá de boa?", "yuki:r3:t2:50", 50, { trust: 1, intimacy: 1 }, { afterResponse: day3Invite }),
        c("preocupou", "Ainda bem. Isso me preocupou de verdade por um segundo.", "Já tô bem melhor na verdade. E tu, tá de boa?", "yuki:r3:t2:100", 100, { intimacy: 1, attraction: 1 }, { afterResponse: day3Invite }),
      ],
    },
    {
      id: "yuki:r3:t3",
      incoming: "",
      choices: [
        c("claro", "Claro! Manda a localização que já vou pra lá então.", "Beleza. Até daqui a pouco!", "yuki:r3:outing:50", 50, { trust: 1, intimacy: 1 }, { exclusiveOutingDay: 3, vnSceneId: "outing-day3-yuki" }),
        c("me-deve-cafe", "Depois dessa foto você me deve um café mesmo. Manda a localização.", "Beleza. Até daqui a pouco!", "yuki:r3:outing:30", 30, { trust: 1 }, { exclusiveOutingDay: 3, vnSceneId: "outing-day3-yuki" }),
        c("so-nos-dois", "Só nós dois? …Bora. Manda onde é.", "Beleza. Até daqui a pouco!", "yuki:r3:outing:100", 100, { intimacy: 1, attraction: 2 }, { exclusiveOutingDay: 3, vnSceneId: "outing-day3-yuki" }),
      ],
    },
  ],
};

const yukiDay4: DialogueScene = {
  day: 4,
  id: "placeholder-dia4-yuki",
  characterId: "yuki",
  speaker: "Yuki",
  timeLabel: "19:11 · NEXO",
  opening: "Deixei um sabor novo de energético que saiu na sua mesa, você viu?",
  openingAfterIncoming: [
    { direction: "outgoing", text: "Simm! Muito bom, tá. Mas já tava aberto. Você deu um gole antes de deixar aqui, né?" },
    { direction: "incoming", text: "Talvez… Mas foi só pra experimentar. Muito bom inclusive, tá." },
  ],
  availability: { minDay: 4, maxDay: 4 },
  completionFlag: "scene:placeholder-dia4-yuki:complete",
  choices: [
    c("deixo-passar", "Tudo bem, dessa vez eu deixo passar…", "Aliás, como você acha que eu tô indo?", "yuki:r4:t1:30", 30, { trust: 1 }),
    c("dividir-latinha", "Então agora a gente chegou no nível de dividir latinha? Anotado.", "Aliás, como você acha que eu tô indo?", "yuki:r4:t1:100", 100, { intimacy: 1, attraction: 1 }),
    c("comprado-duas", "Você podia simplesmente ter comprado duas, sabia?", "Aliás, como você acha que eu tô indo?", "yuki:r4:t1:50", 50, { trust: 1, tension: 1 }),
  ],
  followUps: [
    {
      id: "yuki:r4:t2",
      prefaceOutgoing: "Seus números estão ótimos, você tá se dando bem com o grupo, o público gosta de você… Por que a pergunta?",
      incoming: "Só tendo certeza que tá tudo certo. Porque tô gostando bastante daqui, sabe? Vai que tô fazendo alguma coisa errada…",
      choices: [
        c("relaxa", "Tá tudo bem. Isso é normal. Você tá indo muito bem, relaxa.", "Tá bom, tá bom. Obrigado por me ouvir. <3", "yuki:r4:t2:30", 30, { trust: 1 }),
        c("eu-falaria", "Yuki, se tivesse alguma coisa errada eu te falaria. Não precisa ficar procurando problema onde não tem.", "Tá bom, tá bom. Obrigado por me ouvir. <3", "yuki:r4:t2:50", 50, { trust: 2 }),
        c("gosto-aqui", "Você quer a resposta profissional ou a minha? Porque profissionalmente, seus números estão ótimos. E falando por mim… eu gosto de ter você aqui.", "Tá bom, tá bom. Obrigado por me ouvir. <3", "yuki:r4:t2:100", 100, { intimacy: 2, attraction: 1 }),
      ],
    },
  ],
};

const yukiDay5: DialogueScene = {
  day: 5,
  id: "placeholder-dia5-yuki",
  characterId: "yuki",
  speaker: "Yuki",
  timeLabel: "20:03 · NEXO",
  openingOutgoing: "Seu uniforme novo ficou muito bonito, na moral.",
  opening: "Gostou? Você precisa de um também…",
  availability: { minDay: 5, maxDay: 5 },
  completionFlag: "scene:placeholder-dia5-yuki:complete",
  choices: [
    c("social", "O meu é uma camisa da empresa e uma calça social. Já é o bastante kkkk.", "Para. Ainda bem que você fica bem no uniforme. Seria paia se ficasse ruim, mas acho difícil alguma coisa ficar ruim em você.", "yuki:r5:t1:30", 30, { trust: 1 }),
    c("mascote", "Não tenho superpoder. Se me botarem de uniforme do lado de vocês eu vou parecer mascote.", "Para. Ainda bem que você fica bem no uniforme. Seria paia se ficasse ruim, mas acho difícil alguma coisa ficar ruim em você.", "yuki:r5:t1:50", 50, { intimacy: 1 }),
    c("voce-escolhe", "Só se você escolher. Já que aparentemente entende de roupa agora.", "Para. Ainda bem que você fica bem no uniforme. Seria paia se ficasse ruim, mas acho difícil alguma coisa ficar ruim em você.", "yuki:r5:t1:100", 100, { attraction: 2 }),
  ],
  followUps: [
    {
      id: "yuki:r5:t2",
      incoming: "",
      choices: [
        c("pijama", "Qual é kkkk. É porque você nunca me viu de pijama e roupa velha.", "Kkkkk tô falando sério. Temos que providenciar um novo, acho importante.", "yuki:r5:t2:30", 30, { trust: 1 }, { afterResponse: [
          { direction: "outgoing", text: "Já está em análise, ok?" },
          { direction: "incoming", text: "Aguardo atualizações então. Com imagens…" },
        ] }),
        c("cantada", "Isso foi uma cantada, Yuki? 🤨", "Kkkkk tô falando sério. Temos que providenciar um novo, acho importante.", "yuki:r5:t2:50", 50, { attraction: 1, tension: 1 }, { afterResponse: [
          { direction: "outgoing", text: "Já está em análise, ok?" },
          { direction: "incoming", text: "Aguardo atualizações então. Com imagens…" },
        ] }),
        c("fora-uniforme", "Cuidado que desse jeito eu vou começar a achar que você tá querendo me ver fora do uniforme.", "Kkkkk tô falando sério. Temos que providenciar um novo, acho importante.", "yuki:r5:t2:100", 100, { intimacy: 1, attraction: 2 }, { afterResponse: [
          { direction: "outgoing", text: "Já está em análise, ok?" },
          { direction: "incoming", text: "Aguardo atualizações então. Com imagens…" },
        ] }),
      ],
    },
    {
      id: "yuki:r5:t3",
      incoming: "",
      choices: [
        c("sem-vergonha", "Sem vergonha kkkkk. Até amanhã!", "Kkkkk até amanhã!", "yuki:r5:t3:30", 30, { trust: 1 }),
        c("merecer", "Vai ter que merecer as imagens.", "Kkkkk até amanhã!", "yuki:r5:t3:100", 100, { attraction: 2, tension: 1 }),
        c("interesse", "Interesse demais nesse uniforme, hein?", "Kkkkk até amanhã!", "yuki:r5:t3:50", 50, { attraction: 1 }),
      ],
    },
  ],
};

const yukiDay6: DialogueScene = {
  day: 6,
  id: "placeholder-dia6-yuki",
  characterId: "yuki",
  speaker: "Yuki",
  timeLabel: "19:34 · NEXO",
  openingOutgoing: "Chegou em casa já?",
  opening: "",
  openingImage: "/nexo/yuki/casa-dia6.jpg",
  openingImageAlt: "Foto enviada por Yuki em casa, sentado perto do videogame depois do expediente.",
  availability: { minDay: 6, maxDay: 6 },
  completionFlag: "scene:placeholder-dia6-yuki:complete",
  choices: [
    c("eita", "Eita kkkkk então beleza.", "Cheguei agora há pouco. Preciso pedir comida ainda e tomar um banho.", "yuki:r6:t1:30", 30, { trust: 1 }, { afterResponse: [
      { direction: "outgoing", text: "Importante mesmo. Pior que preciso da mesma coisa." },
      { direction: "incoming", text: "Acho que vou pedir uma pizza. Não tá afim de vir pra cá não?" },
    ] }),
    c("evidencia", "Perguntei se chegou em casa, não precisava mandar evidência fotográfica… mas não vou reclamar.", "Cheguei agora há pouco. Preciso pedir comida ainda e tomar um banho.", "yuki:r6:t1:50", 50, { intimacy: 1, attraction: 1 }, { afterResponse: [
      { direction: "outgoing", text: "Importante mesmo. Pior que preciso da mesma coisa." },
      { direction: "incoming", text: "Acho que vou pedir uma pizza. Não tá afim de vir pra cá não?" },
    ] }),
    c("informacao", "Ah. Então é assim que você fica em casa. Informação importante.", "Cheguei agora há pouco. Preciso pedir comida ainda e tomar um banho.", "yuki:r6:t1:100", 100, { intimacy: 1, attraction: 2 }, { afterResponse: [
      { direction: "outgoing", text: "Importante mesmo. Pior que preciso da mesma coisa." },
      { direction: "incoming", text: "Acho que vou pedir uma pizza. Não tá afim de vir pra cá não?" },
    ] }),
  ],
  followUps: [
    {
      id: "yuki:r6:t2",
      incoming: "",
      choices: [
        c("sem-abacaxi", "Acho que consigo sim. Sem pizza com abacaxi, pelo amor de Deus.", "O sabor vai ser surpresa então… Quando chegar, só interfonar.", "yuki:r6:outing:30", 30, { trust: 1, intimacy: 1 }, { exclusiveOutingDay: 6, vnSceneId: "outing-day6-yuki" }),
        c("essa-hora", "Você tá me convidando pra sua casa essa hora com pizza? …Tô indo.", "O sabor vai ser surpresa então… Quando chegar, só interfonar.", "yuki:r6:outing:50", 50, { intimacy: 2, attraction: 1 }, { exclusiveOutingDay: 6, vnSceneId: "outing-day6-yuki" }),
        c("suspeito", "Café no Dia 3 e agora pizza na sua casa. Isso tá começando a parecer suspeito, Yuki.", "O sabor vai ser surpresa então… Quando chegar, só interfonar.", "yuki:r6:outing:100", 100, { intimacy: 2, attraction: 2, tension: 1 }, { exclusiveOutingDay: 6, vnSceneId: "outing-day6-yuki" }),
      ],
    },
  ],
};

export const yukiPostShiftScenes: DialogueScene[] = [yukiDay1, yukiDay2, yukiDay3, yukiDay4, yukiDay5, yukiDay6];
export const yukiPostShift = yukiDay1;
