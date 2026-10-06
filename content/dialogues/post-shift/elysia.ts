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

const elysiaDay1: DialogueScene = {
  day: 1,
  id: "dia1-elysia-pos-expediente",
  characterId: "elysia",
  speaker: "Elysia",
  timeLabel: "19:02 · NEXO",
  opening: "",
  availability: { minDay: 1, maxDay: 1 },
  completionFlag: "scene:dia1-elysia-pos-expediente:complete",
  choices: [
    c("base", "Oi, tudo bem?", "Oi, tudo certo e contigo?", "elysia:r1:t1:50", 50, { trust: 1 }),
    c("casual", "Oii, tudo certo?", "Oi, tudo certo e contigo?", "elysia:r1:t1:100", 100, { intimacy: 1 }),
    c("direta", "Oi, Elysia, tudo bem por aí?", "Oi, tudo certo e contigo?", "elysia:r1:t1:30", 30, { respect: 1 }),
  ],
  followUps: [
    {
      id: "elysia:r1:t2",
      incoming: "",
      choices: [
        c("base", "Que bom. Então, como comecei agora aqui, queria saber mais sobre o pessoal, sabe? Para poder administrar melhor todo mundo...", "Sim, claro, entendo completamente. Sou Elysia, tenho 21 anos, meu pai é dono da empresa Futuro. Como não me vejo seguindo esse ramo, vim para o ramo heroico no intuito de ajudar as pessoas.", "elysia:r1:t2:50", 50, { trust: 1 }),
        c("casual", "Tudo certo também. Como comecei agora aqui, tô tentando conhecer melhor todo mundo. Me conta um pouco sobre você?", "Sim, claro, entendo completamente. Sou Elysia, tenho 21 anos, meu pai é dono da empresa Futuro. Como não me vejo seguindo esse ramo, vim para o ramo heroico no intuito de ajudar as pessoas.", "elysia:r1:t2:100", 100, { trust: 1, intimacy: 1 }),
        c("brincalhona", "Tudo certo. Tô fazendo meu dever de casa e tentando conhecer melhor todo mundo daqui kkkkk. Me conta sobre você?", "Sim, claro, entendo completamente. Sou Elysia, tenho 21 anos, meu pai é dono da empresa Futuro. Como não me vejo seguindo esse ramo, vim para o ramo heroico no intuito de ajudar as pessoas.", "elysia:r1:t2:30", 30, { respect: 1 }),
      ],
    },
    {
      id: "elysia:r1:t3",
      incoming: "Basicamente tenho poderes relacionados a manipular energia. Eu treino bastante, tanto fisicamente quanto academicamente, para entender como funcionam meus poderes, possivelmente poderes de outras pessoas também, para uma resolução de problemas mais adaptável.",
      choices: [
        c("base", "Uau, incrível, agradeço muito. Muitas informações, vai ajudar bastante mesmo!", "Que bom que ajudei, qualquer coisa pode me chamar! 😊", "elysia:r1:t3:50", 50, { respect: 1, trust: 1 }),
        c("interessada", "Uau, você estuda bastante isso então. Vai ajudar muito saber dessas coisas.", "Que bom que ajudei, qualquer coisa pode me chamar! 😊", "elysia:r1:t3:100", 100, { trust: 1, intimacy: 1 }),
        c("brincalhona", "Uau kkkkk pedi para conhecer você e ganhei praticamente uma ficha completa. Vai ajudar bastante.", "Que bom que ajudei, qualquer coisa pode me chamar! 😊", "elysia:r1:t3:30", 30, { tension: 1, trust: 1 }),
      ],
    },
  ],
};

const day2NerdBurst: DialogueMessage[] = [
  { direction: "incoming", text: "Eu acho que ainda dá para melhorar muito. Tenho algumas ideias muito legais do que dá para fazer com ele, mas preciso entender melhor como usar e tenho que fazer meu corpo aguentar o tranco também." },
  { direction: "incoming", text: "Aí, enfim..." },
  { direction: "incoming", text: "Poderia ficar horas falando sobre poderes." },
  { direction: "incoming", text: "Mas enfim, desculpa, nem perguntei nada sobre você. Quem é você, o que gosta, etc..." },
];

const elysiaDay2: DialogueScene = {
  day: 2, id: "placeholder-dia2-elysia", characterId: "elysia", speaker: "Elysia", timeLabel: "19:18 · NEXO", opening: "",
  availability: { minDay: 2, maxDay: 2 }, completionFlag: "scene:placeholder-dia2-elysia:complete",
  choices: [
    c("base", "Oii, mandou muito bem hoje!", "Oii, obrigada!", "elysia:r2:t1:50", 50, { trust: 1 }),
    c("casual", "Oii, parabéns por hoje!", "Oii, obrigada!", "elysia:r2:t1:30", 30, { respect: 1 }),
    c("brincalhona", "Oii, veio mostrar serviço hoje, hein?", "Oii, obrigada!", "elysia:r2:t1:100", 100, { intimacy: 1 }),
  ],
  followUps: [
    { id: "elysia:r2:t2", incoming: "", choices: [
      c("base", "Me intrigou muito seus poderes, achei bem diferenciados. Como eles funcionam especificamente?", "Basicamente, com o controle de energia eu consigo manifestar ela fisicamente, transformando ela em qualquer forma e efeito relacionado, ainda tendo como foco a eletricidade e energia num geral.", "elysia:r2:t2:50", 50, { trust: 1 }, { afterResponse: day2NerdBurst }),
      c("curiosa", "Fiquei pensando nos seus poderes depois de hoje. Como eles funcionam especificamente?", "Basicamente, com o controle de energia eu consigo manifestar ela fisicamente, transformando ela em qualquer forma e efeito relacionado, ainda tendo como foco a eletricidade e energia num geral.", "elysia:r2:t2:100", 100, { trust: 1, intimacy: 1 }, { afterResponse: day2NerdBurst }),
      c("brincalhona", "Lembra que você disse que eu podia perguntar? Então... como exatamente seus poderes funcionam?", "Basicamente, com o controle de energia eu consigo manifestar ela fisicamente, transformando ela em qualquer forma e efeito relacionado, ainda tendo como foco a eletricidade e energia num geral.", "elysia:r2:t2:30", 30, { respect: 1 }, { afterResponse: day2NerdBurst }),
    ]},
    { id: "elysia:r2:t3", incoming: "", choices: [
      c("base", "Tudo bem kkkkk. Terminei a faculdade de Administração Heroica e vim para cá basicamente como meu primeiro emprego. Como não tive sorte de receber nenhum poder e nem tenho tanta capacidade para atuar em campo, esse é o jeito que eu poderia ajudar, né.", "Ah, entendi, veio direto pra cá então. Deve ter estudado vários heróis do passado e como eles usavam seus poderes, né? Deve ter sido muito legal.", "elysia:r2:t3:50", 50, { trust: 1 }),
      c("idealista", "Tudo bem kkkkk. Terminei Administração Heroica e vim direto pra cá. Nunca recebi nenhum poder, então encontrei outra forma de conseguir ajudar.", "Ah, entendi, veio direto pra cá então. Deve ter estudado vários heróis do passado e como eles usavam seus poderes, né? Deve ter sido muito legal.", "elysia:r2:t3:100", 100, { respect: 1, trust: 1 }),
      c("brincalhona", "Kkkkk tudo bem, pode falar. Eu terminei Administração Heroica e vim direto pra cá. Primeiro emprego, zero poderes e agora tenho que dar conta de vocês.", "Ah, entendi, veio direto pra cá então. Deve ter estudado vários heróis do passado e como eles usavam seus poderes, né? Deve ter sido muito legal.", "elysia:r2:t3:30", 30, { tension: 1, trust: 1 }),
    ]},
    { id: "elysia:r2:t4", incoming: "Desculpa, tenho que ir agora, bom resto de dia!", choices: [
      c("base", "Tchau, tchau!", "", "elysia:r2:t4:50", 50, { trust: 1 }),
      c("casual", "Até amanhã!", "", "elysia:r2:t4:30", 30, { respect: 1 }),
      c("brincalhona", "Tchau! Depois você continua a aula sobre poderes kkkkk.", "", "elysia:r2:t4:100", 100, { intimacy: 1 }),
    ]},
  ],
};

const elysiaDay3: DialogueScene = {
  day: 3, id: "placeholder-dia3-elysia", characterId: "elysia", speaker: "Elysia", timeLabel: "19:26 · NEXO",
  opening: "Oi, passei na sua mesa e você não tava. Já foi pra casa?", availability: { minDay: 3, maxDay: 3 }, completionFlag: "scene:placeholder-dia3-elysia:complete",
  choices: [
    c("base", "Oii, foi mal, tava em reunião com a chefia. Acabei de voltar aqui pra arrumar minhas coisas.", "Falando mal da gente, né? Pode falar...", "elysia:r3:t1:50", 50, { trust: 1 }),
    c("casual", "Oii, ainda não. Tava em reunião com a chefia, acabei de voltar pra pegar minhas coisas.", "Falando mal da gente, né? Pode falar...", "elysia:r3:t1:30", 30, { respect: 1 }),
    c("brincalhona", "Oii, ainda tô por aqui. A chefia me sequestrou pra uma reunião kkkkk.", "Falando mal da gente, né? Pode falar...", "elysia:r3:t1:100", 100, { intimacy: 1 }),
  ],
  followUps: [
    { id: "elysia:r3:t2", incoming: "", choices: [
      c("base", "Nada, foi só elogios, vocês estão mandando muito bem.", "OBA! Que bom, que bom.", "elysia:r3:t2:50", 50, { trust: 1 }),
      c("casual", "Nada disso kkkkk, vocês estão mandando muito bem.", "OBA! Que bom, que bom.", "elysia:r3:t2:30", 30, { respect: 1 }),
      c("brincalhona", "Claro, fiz uma lista enorme. Brincadeira, foi só elogio.", "OBA! Que bom, que bom.", "elysia:r3:t2:100", 100, { intimacy: 1, tension: 1 }),
    ]},
    { id: "elysia:r3:t3", incoming: "Aliás, vai fazer alguma coisa agora? Cheguei em casa agora e, como liberaram o time mais cedo, contando com você também, estava pensando em sair.", choices: [
      c("base", "Estou livre, alguma ideia de onde ir?", "Tem uma exposição nova no museu de história sobre como os poderes começaram a surgir no nosso mundo, tá a fim?", "elysia:r3:t3:50", 50, { trust: 1 }),
      c("casual", "Tô livre. Tava pensando em ir onde?", "Tem uma exposição nova no museu de história sobre como os poderes começaram a surgir no nosso mundo, tá a fim?", "elysia:r3:t3:30", 30, { respect: 1 }),
      c("brincalhona", "Por enquanto nada. Isso é um convite? kkkkk", "Tem uma exposição nova no museu de história sobre como os poderes começaram a surgir no nosso mundo, tá a fim?", "elysia:r3:t3:100", 100, { intimacy: 1, attraction: 1 }),
    ]},
    { id: "elysia:r3:t4", incoming: "", choices: [
      c("base", "Claro, claro. Vou passar rapidinho em casa pra tomar um banho e me arrumar e já vou para lá.", "Belezinha então.", "elysia:r3:outing:50", 50, { trust: 1, intimacy: 1 }, { exclusiveOutingDay: 3, vnSceneId: "outing-day3-elysia", afterResponse: [{ direction: "incoming", text: "Indo", image: "/nexo/elysia/espelho-dia3.webp", imageAlt: "Foto no espelho enviada por Elysia antes de sair para o museu." }] }),
      c("animada", "Claro! Vou passar em casa rapidinho e já encontro você lá.", "Belezinha então.", "elysia:r3:outing:100", 100, { trust: 1, intimacy: 1, attraction: 1 }, { exclusiveOutingDay: 3, vnSceneId: "outing-day3-elysia", afterResponse: [{ direction: "incoming", text: "Indo", image: "/nexo/elysia/espelho-dia3.webp", imageAlt: "Foto no espelho enviada por Elysia antes de sair para o museu." }] }),
      c("brincalhona", "Depois da nossa conversa sobre poderes? Claro que eu vou kkkkk.", "Belezinha então.", "elysia:r3:outing:30", 30, { trust: 1 }, { exclusiveOutingDay: 3, vnSceneId: "outing-day3-elysia", afterResponse: [{ direction: "incoming", text: "Indo", image: "/nexo/elysia/espelho-dia3.webp", imageAlt: "Foto no espelho enviada por Elysia antes de sair para o museu." }] }),
    ]},
  ],
};

const gymPhoto: DialogueMessage[] = [
  { direction: "incoming", image: "/nexo/elysia/academia-dia4.webp", imageAlt: "Foto de academia enviada por Elysia." },
  { direction: "incoming", text: "Vamos, vamos, você precisa começar. Te recomendo um treino de boa, juro!" },
];

const bookQuestion: DialogueMessage[] = [
  { direction: "incoming", text: "Aliás, achou aquele livro que recomendei?" },
];

const elysiaDay4: DialogueScene = {
  day: 4, id: "placeholder-dia4-elysia", characterId: "elysia", speaker: "Elysia", timeLabel: "19:11 · NEXO",
  opening: "Hoje foi tranquilo até, ainda bem que deu tudo certo.", availability: { minDay: 4, maxDay: 4 }, completionFlag: "scene:placeholder-dia4-elysia:complete",
  choices: [
    c("base", "Pior que foi, acho que tô pegando o jeito de vocês.", "Você pega o jeito das coisas rápido, bom saber.", "elysia:r4:t1:50", 50, { trust: 1 }),
    c("casual", "Aos poucos acho que tô começando a entender vocês.", "Você pega o jeito das coisas rápido, bom saber.", "elysia:r4:t1:30", 30, { respect: 1 }),
    c("brincalhona", "Não quero me gabar, mas acho que tô pegando o jeito kkkkk.", "Você pega o jeito das coisas rápido, bom saber.", "elysia:r4:t1:100", 100, { intimacy: 1, attraction: 1 }),
  ],
  followUps: [
    { id: "elysia:r4:t2", incoming: "", choices: [
      c("base", "Com um pouco de prática dá para aprender, pô.", "Sim, sim, claro...", "elysia:r4:t2:30", 30, { respect: 1 }, { afterResponse: bookQuestion }),
      c("casual", "É questão de prática mesmo.", "Sim, sim, claro...", "elysia:r4:t2:50", 50, { trust: 1 }, { afterResponse: bookQuestion }),
      c("flertando", "Bom saber por quê? 👀", "Sim, sim, claro...", "elysia:r4:t2:100", 100, { attraction: 2, tension: 1 }, { afterResponse: bookQuestion }),
    ]},
    { id: "elysia:r4:t3", prefaceOutgoing: "Achei sim, coloquei no seu armário, inclusive.", incoming: "Aff, esqueci de olhar antes de sair. Tenho que ir na academia, não posso faltar, amanhã eu pego.", choices: [
      c("base", "Tá tudo bem, esqueci de te avisar também. Preciso começar a ir na academia também, acho que já passou da hora.", "", "elysia:r4:t3:50", 50, { trust: 1 }, { afterResponse: gymPhoto }),
      c("casual", "Amanhã você pega. Eu que esqueci de avisar kkkkk. Inclusive preciso começar a ir pra academia também.", "", "elysia:r4:t3:30", 30, { respect: 1 }, { afterResponse: gymPhoto }),
      c("brincalhona", "Falando em academia, preciso começar a ir também. Já passou da hora.", "", "elysia:r4:t3:100", 100, { intimacy: 1 }, { afterResponse: gymPhoto }),
    ]},
    { id: "elysia:r4:t4", incoming: "", choices: [
      c("base", "Minha nossa, com certeza preciso começar mesmo.", "Enfim, vou treinar, tchaau!", "elysia:r4:t4:50", 50, { trust: 1 }),
      c("brincalhona", "Beleza, mas vou cobrar esse treino de boa aí.", "Enfim, vou treinar, tchaau!", "elysia:r4:t4:30", 30, { tension: 1 }),
      c("flertando", "Depois dessa motivação fica difícil arrumar desculpa pra não começar.", "Enfim, vou treinar, tchaau!", "elysia:r4:t4:100", 100, { attraction: 2, intimacy: 1 }),
    ]},
  ],
};

const deletedFlirt: DialogueMessage[] = [
  { direction: "incoming", text: "Pegar eu?", deleteAfterMs: 1700, deletedText: "Mensagem excluída" },
  { direction: "incoming", text: "Mercado fecha daqui 2 horas, tem tempo ainda..." },
];

const elysiaDay5: DialogueScene = {
  day: 5, id: "placeholder-dia5-elysia", characterId: "elysia", speaker: "Elysia", timeLabel: "20:03 · NEXO",
  opening: "Consegui pegar o livro aqui! Vou começar a ler o mais rápido possível! OBRIGADÃO!!! <3", availability: { minDay: 5, maxDay: 5 }, completionFlag: "scene:placeholder-dia5-elysia:complete",
  choices: [
    c("base", "Que bom que gostou, não foi fácil achar não, viu...", "Eu sei, depois te dou uma recompensa por isso, tá? Você sempre me ajuda com essas coisas.", "elysia:r5:t1:50", 50, { trust: 1 }),
    c("casual", "Sabia que você ia gostar. Deu trabalho achar esse aí.", "Eu sei, depois te dou uma recompensa por isso, tá? Você sempre me ajuda com essas coisas.", "elysia:r5:t1:30", 30, { respect: 1 }),
    c("brincalhona", "Espero que esse <3 pague pelo trabalho que deu pra achar kkkkk.", "Eu sei, depois te dou uma recompensa por isso, tá? Você sempre me ajuda com essas coisas.", "elysia:r5:t1:100", 100, { intimacy: 1, attraction: 1 }),
  ],
  followUps: [
    { id: "elysia:r5:t2", incoming: "", choices: [
      c("base", "Pode ter certeza que vou cobrar essa recompensa...", "", "elysia:r5:t2:50", 50, { trust: 1 }, { afterResponse: [{ direction: "outgoing", text: "Tô tendo que arrumar tudo muito rápido aqui, tenho que passar no mercado antes de fechar e pegar outras coisas no caminho." }, ...deletedFlirt] }),
      c("brincalhona", "Olha que eu não esqueço promessa assim.", "", "elysia:r5:t2:30", 30, { tension: 1 }, { afterResponse: [{ direction: "outgoing", text: "Tô tendo que arrumar tudo muito rápido aqui, tenho que passar no mercado antes de fechar e pegar outras coisas no caminho." }, ...deletedFlirt] }),
      c("flertando", "Agora fiquei com interesse nessa recompensa...", "", "elysia:r5:t2:100", 100, { attraction: 2, intimacy: 1 }, { afterResponse: [{ direction: "outgoing", text: "Tô tendo que arrumar tudo muito rápido aqui, tenho que passar no mercado antes de fechar e pegar outras coisas no caminho." }, ...deletedFlirt] }),
    ]},
    { id: "elysia:r5:t3", incoming: "", choices: [
      c("base", "Eu vi isso aí, hein...", "O quê? Nada aconteceu...", "elysia:r5:t3:50", 50, { trust: 1, tension: 1 }),
      c("brincalhona", "Pode apagar, eu já li kkkkk.", "O quê? Nada aconteceu...", "elysia:r5:t3:30", 30, { tension: 2 }),
      c("flertando", "Ué, por que apagou? Eu ia responder.", "O quê? Nada aconteceu...", "elysia:r5:t3:100", 100, { attraction: 2, intimacy: 1 }),
    ]},
    { id: "elysia:r5:t4", prefaceOutgoing: "Eu sei, mas o trânsito tá uma loucura por conta daquele vilão gigante que atacou hoje.", incoming: "Vai na fé, você consegue chegar a tempo.", choices: [
      c("base", "Vou indo então, até amanhã!", "Até!", "elysia:r5:t4:50", 50, { trust: 1 }),
      c("casual", "Beleza, tô indo. Até amanhã!", "Até!", "elysia:r5:t4:30", 30, { respect: 1 }),
      c("flertando", "Tá bom. Amanhã a gente conversa sobre aquela mensagem apagada.", "Até!", "elysia:r5:t4:100", 100, { attraction: 1, tension: 1 }),
    ]},
  ],
};

const day6Photo: DialogueMessage[] = [
  { direction: "incoming", image: "/nexo/elysia/recompensa-dia6.webp", imageAlt: "Foto provocadora enviada por Elysia antes do segundo encontro." },
  { direction: "incoming", text: "Beleza, a recompensa tá te esperando..." },
];

const elysiaDay6: DialogueScene = {
  day: 6, id: "placeholder-dia6-elysia", characterId: "elysia", speaker: "Elysia", timeLabel: "19:34 · NEXO", opening: "",
  availability: { minDay: 6, maxDay: 6 }, completionFlag: "scene:placeholder-dia6-elysia:complete",
  choices: [
    c("base", "Hoje foi um dos dias mais tensos, tá maluco, muita coisa...", "Nossa sim, hoje foi complicado. Vou passar na locadora de filme antes de ir para casa, eu acho. Tem uns filmes em VHS muito legais lá, a qualidade é diferenciada.", "elysia:r6:t1:50", 50, { trust: 1 }),
    c("casual", "Nossa, hoje foi complicado demais.", "Nossa sim, hoje foi complicado. Vou passar na locadora de filme antes de ir para casa, eu acho. Tem uns filmes em VHS muito legais lá, a qualidade é diferenciada.", "elysia:r6:t1:30", 30, { respect: 1 }),
    c("brincalhona", "Acho que preciso de férias depois de hoje kkkkk.", "Nossa sim, hoje foi complicado. Vou passar na locadora de filme antes de ir para casa, eu acho. Tem uns filmes em VHS muito legais lá, a qualidade é diferenciada.", "elysia:r6:t1:100", 100, { intimacy: 1 }),
  ],
  followUps: [
    { id: "elysia:r6:t2", incoming: "", choices: [
      c("base", "Que legal! Acho que nunca vi filme em VHS...", "Como não?? Vai ver sim, aparece em casa mais tarde que a gente assiste.", "elysia:r6:t2:50", 50, { trust: 1 }),
      c("curiosa", "Sério? Nunca assisti nada em VHS.", "Como não?? Vai ver sim, aparece em casa mais tarde que a gente assiste.", "elysia:r6:t2:30", 30, { respect: 1 }),
      c("brincalhona", "Claro que você também entende de VHS kkkkk. Nunca vi um filme assim.", "Como não?? Vai ver sim, aparece em casa mais tarde que a gente assiste.", "elysia:r6:t2:100", 100, { intimacy: 1, attraction: 1 }),
    ]},
    { id: "elysia:r6:t3", incoming: "", choices: [
      c("base", "Beleza, pode ser então! Pega algum filme bem legal aí, quer que eu leve alguma coisa?", "Só você mesmo, a gente pede alguma coisa por aplicativo mesmo...", "elysia:r6:t3:50", 50, { trust: 1, intimacy: 1 }),
      c("animada", "Fechado! Escolhe um bom aí. Quer que eu leve alguma coisa?", "Só você mesmo, a gente pede alguma coisa por aplicativo mesmo...", "elysia:r6:t3:30", 30, { trust: 1 }),
      c("brincalhona", "Então isso foi um convite? kkkkk. Beleza, o que eu levo?", "Só você mesmo, a gente pede alguma coisa por aplicativo mesmo...", "elysia:r6:t3:100", 100, { intimacy: 1, attraction: 1 }),
    ]},
    { id: "elysia:r6:t4", incoming: "", choices: [
      c("base", "Okay então, vou me arrumar.", "Verdade, tenho que te dar a recompensa do livro também...", "elysia:r6:t4:50", 50, { trust: 1 }),
      c("casual", "Fechado. Vou me arrumar e daqui a pouco apareço.", "Verdade, tenho que te dar a recompensa do livro também...", "elysia:r6:t4:30", 30, { respect: 1 }),
      c("flertando", "“Só você mesmo”... beleza então 👀", "Verdade, tenho que te dar a recompensa do livro também...", "elysia:r6:t4:100", 100, { attraction: 2, tension: 1 }),
    ]},
    { id: "elysia:r6:t5", incoming: "", choices: [
      c("base", "Olha só, quase ia deixar passar.", "Tá vindo?", "elysia:r6:t5:50", 50, { trust: 1 }),
      c("brincalhona", "Eu não esqueci não, viu?", "Tá vindo?", "elysia:r6:t5:30", 30, { tension: 1 }),
      c("flertando", "Sabia que tinha outro motivo pra esse convite.", "Tá vindo?", "elysia:r6:t5:100", 100, { attraction: 2, intimacy: 1 }),
    ]},
    { id: "elysia:r6:t6", prefaceOutgoing: "A caminho!", incoming: "", afterIncoming: day6Photo, choices: [
      c("base", "Estou indo o mais rápido possível, quero muito essa recompensa, digo, ver esse filme.", "", "elysia:r6:outing:50", 50, { intimacy: 1, attraction: 1 }, { exclusiveOutingDay: 6, vnSceneId: "outing-day6-elysia" }),
      c("brincalhona", "E eu achando que a gente realmente ia só ver filme...", "", "elysia:r6:outing:30", 30, { attraction: 1 }, { exclusiveOutingDay: 6, vnSceneId: "outing-day6-elysia" }),
      c("flertando", "Tá bom, agora eu realmente quero saber qual é essa recompensa.", "", "elysia:r6:outing:100", 100, { intimacy: 1, attraction: 2 }, { exclusiveOutingDay: 6, vnSceneId: "outing-day6-elysia" }),
    ]},
  ],
};

export const elysiaPostShiftScenes: DialogueScene[] = [elysiaDay1, elysiaDay2, elysiaDay3, elysiaDay4, elysiaDay5, elysiaDay6];
