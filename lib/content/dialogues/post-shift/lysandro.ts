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

const photoMilkshake: DialogueMessage[] = [{ direction: "incoming", image: "/nexo/lysandro/chat-1-milkshake.webp", imageAlt: "Foto enviada por Lysandro segurando um milkshake." }];
const photoEspelho: DialogueMessage[] = [{ direction: "incoming", image: "/nexo/lysandro/chat-2-espelho.webp", imageAlt: "Foto no espelho enviada por Lysandro depois do expediente." }];
const photoDate2: DialogueMessage[] = [{ direction: "incoming", image: "/nexo/lysandro/chat-3-date2.webp", imageAlt: "Foto no espelho enviada por Lysandro antes do encontro." }];

const day1: DialogueScene = {
  day: 1,
  id: "dia1-lysandro-pos-expediente",
  characterId: "lysandro",
  speaker: "Lysandro",
  timeLabel: "19:11 · NEXO",
  opening: "",
  availability: { minDay: 1, maxDay: 1 },
  completionFlag: "scene:dia1-lysandro-pos-expediente:complete",
  choices: [
    c("base", "Oii, tudo bem? Estou tentando entender como cada um funciona para melhorarmos o grupo como um todo, poderia me falar mais sobre você, inclusive seus poderes também?", "Opa, melhor agora, ainda não tinha conseguido te ver direito, agora já tenho uma ideia bem melhor…", "lysandro:r1:t1:50", 50, { trust: 1 }),
    c("casual", "Oii, tudo certo? Tô conhecendo melhor todo mundo da equipe. Me conta um pouco sobre você e sobre seus poderes?", "Opa, melhor agora, ainda não tinha conseguido te ver direito, agora já tenho uma ideia bem melhor…", "lysandro:r1:t1:30", 30, { respect: 1 }),
    c("provocar", "Oii. Agora que oficialmente sou responsável por organizar vocês, acho justo descobrir com quem eu tô lidando. Quem é você e o que exatamente consegue fazer?", "Opa, melhor agora, ainda não tinha conseguido te ver direito, agora já tenho uma ideia bem melhor…", "lysandro:r1:t1:100", 100, { intimacy: 1, tension: 1 }),
  ],
  followUps: [
    { id: "lysandro:r1:t2", incoming: "", choices: [
      c("base", "Pois é não fomos devidamente apresentados ainda kkkk", "Sobre as informações, uso uma espada muito massa, sou bem forte, poderes acho que não tem não kkkk", "lysandro:r1:t2:50", 50, { trust: 1 }),
      c("casual", "Kkkkk realmente, faltou uma apresentação oficial aí.", "Sobre as informações, uso uma espada muito massa, sou bem forte, poderes acho que não tem não kkkk", "lysandro:r1:t2:30", 30, { respect: 1 }),
      c("flertar", "E essa ideia bem melhor veio só de descobrir quem eu sou? Sei…", "Sobre as informações, uso uma espada muito massa, sou bem forte, poderes acho que não tem não kkkk", "lysandro:r1:t2:100", 100, { attraction: 1, intimacy: 1 }),
    ]},
    { id: "lysandro:r1:t3", incoming: "", choices: [
      c("base", "Como é que é?", "É, acho que esqueceram de avisar que eu sou meio que uma excessão na agência, me chamaram após um problemas de bairro e acharam que eu poderia me encaixar…", "lysandro:r1:t3:50", 50, { trust: 1 }),
      c("surpreso", "Pera. Volta um pouco. Como assim “poderes acho que não tem”? Kkkkk", "É, acho que esqueceram de avisar que eu sou meio que uma excessão na agência, me chamaram após um problemas de bairro e acharam que eu poderia me encaixar…", "lysandro:r1:t3:30", 30, { respect: 1 }),
      c("provocar", "Espada muito massa e muito forte. Excelente relatório técnico, Lysandro.", "É, acho que esqueceram de avisar que eu sou meio que uma excessão na agência, me chamaram após um problemas de bairro e acharam que eu poderia me encaixar…", "lysandro:r1:t3:100", 100, { intimacy: 1, tension: 1 }),
    ]},
    { id: "lysandro:r1:t4", incoming: "", choices: [
      c("base", "Ah sim entendo, então você é um humano que coincidentemente é muito forte e se iguala a herois com poderes, entendo entendo, mas ainda acho que teremos uma grande revelação em relação a isso kkkk", "Qual é kkkk não sei por que disso também, mas no fim estou aqui para ajudar né", "lysandro:r1:t4:50", 50, { trust: 1 }),
      c("curioso", "Então você realmente chegou aqui sem poder nenhum? Isso só aumenta minha curiosidade sobre como você consegue acompanhar o resto da equipe.", "Qual é kkkk não sei por que disso também, mas no fim estou aqui para ajudar né", "lysandro:r1:t4:30", 30, { respect: 1 }),
      c("provocar", "Entendi. Sem poderes, só uma espada “muito massa” e força suficiente pra acompanhar super-heróis. Completamente normal kkkkk", "Qual é kkkk não sei por que disso também, mas no fim estou aqui para ajudar né", "lysandro:r1:t4:100", 100, { intimacy: 1, tension: 1 }),
    ]},
    { id: "lysandro:r1:t5", incoming: "", choices: [
      c("base", "Realmente, agradeço muito pela ajuda, vai me ajudar bastante a organizar a coisas, vou me indo, tchau tchau.", "Precisando to aqui pra qualquer coisa viu, pode chamar!", "lysandro:r1:t5:50", 50, { trust: 1 }),
      c("casual", "E já ajudou bastante. Agora pelo menos sei melhor com quem tô trabalhando kkkk. Vou terminar umas coisas aqui, tchau tchau.", "Precisando to aqui pra qualquer coisa viu, pode chamar!", "lysandro:r1:t5:30", 30, { respect: 1 }),
      c("flertar", "Ajudou sim. Agora eu tenho uma ideia bem melhor de quem você é também… Vou indo, tchau tchau.", "Precisando to aqui pra qualquer coisa viu, pode chamar!", "lysandro:r1:t5:100", 100, { attraction: 1, intimacy: 1 }),
    ]},
  ],
};

const day2: DialogueScene = {
  day: 2,
  id: "placeholder-dia2-lysandro",
  characterId: "lysandro",
  speaker: "Lysandro",
  timeLabel: "19:18 · NEXO",
  opening: "",
  availability: { minDay: 2, maxDay: 2 },
  completionFlag: "scene:placeholder-dia2-lysandro:complete",
  choices: [
    c("base", "Ei, tá tudo certo? Você teve um dia difícil hoje, algumas coisas não deram muito certo mas tá tudo bem…", "To ligado, passei para pegar um milkshake, já tá tudo certo", "lysandro:r2:t1:50", 50, { trust: 1 }, { afterResponse: photoMilkshake }),
    c("casual", "Ei, como você tá? Hoje foi meio complicado pra você.", "To ligado, passei para pegar um milkshake, já tá tudo certo", "lysandro:r2:t1:30", 30, { respect: 1 }, { afterResponse: photoMilkshake }),
    c("preocupado", "Ei, queria saber se você tá bem depois de hoje. Nem tudo saiu como a gente queria.", "To ligado, passei para pegar um milkshake, já tá tudo certo", "lysandro:r2:t1:100", 100, { trust: 1, intimacy: 1 }, { afterResponse: photoMilkshake }),
  ],
  followUps: [
    { id: "lysandro:r2:t2", incoming: "", choices: [
      c("base", "Que bom, amanhã vai ser um dia melhor, certeza.", "Valeu, {{playerForm:fofo|fofa|fofe}}, você foi muito bem, é muito bom no que faz, cuidado vou começar a pedir umas ajudinhas pra você ein….", "lysandro:r2:t2:50", 50, { trust: 1 }),
      c("casual", "Pelo menos o milkshake salvou o final do dia kkkkk. Amanhã vai ser melhor.", "Valeu, {{playerForm:fofo|fofa|fofe}}, você foi muito bem, é muito bom no que faz, cuidado vou começar a pedir umas ajudinhas pra você ein….", "lysandro:r2:t2:30", 30, { respect: 1 }),
      c("provocar", "Então esse é o grande método de recuperação do Lysandro? Milkshake depois de missão ruim?", "Valeu, {{playerForm:fofo|fofa|fofe}}, você foi muito bem, é muito bom no que faz, cuidado vou começar a pedir umas ajudinhas pra você ein….", "lysandro:r2:t2:100", 100, { intimacy: 1, tension: 1 }),
    ]},
    { id: "lysandro:r2:t3", incoming: "", choices: [
      c("base", "Se precisar de mim sabe onde me encontrar…", "Você não cansa de ficar nesse escritório não? Às vezes você podia ir com a gente.", "lysandro:r2:t3:50", 50, { trust: 1 }),
      c("provocar", "Depende muito dessas “ajudinhas” aí…", "Você não cansa de ficar nesse escritório não? Às vezes você podia ir com a gente.", "lysandro:r2:t3:30", 30, { tension: 1 }),
      c("flertar", "Pode pedir. Só não sei se todas as ajudinhas fazem parte do meu contrato…", "Você não cansa de ficar nesse escritório não? Às vezes você podia ir com a gente.", "lysandro:r2:t3:100", 100, { attraction: 1, intimacy: 1 }),
    ]},
    { id: "lysandro:r2:t4", incoming: "", choices: [
      c("base", "Eu com toda certeza estou no lugar que deveria, me daria muito mal lá fora, não sou tão forte e grande que nem você…", "Não tem problema, eu vou estar lá pra te proteger sabe…", "lysandro:r2:t4:50", 50, { trust: 1 }),
      c("casual", "Acho melhor eu continuar com meus monitores mesmo kkkkk. Lá fora eu não durava muito.", "Não tem problema, eu vou estar lá pra te proteger sabe…", "lysandro:r2:t4:30", 30, { respect: 1 }),
      c("provocar", "Ah claro. Vou sair do escritório e acompanhar o cara da espada sem poderes. Parece extremamente seguro.", "Não tem problema, eu vou estar lá pra te proteger sabe…", "lysandro:r2:t4:100", 100, { intimacy: 1, tension: 1 }),
    ]},
    { id: "lysandro:r2:t5", incoming: "", choices: [
      c("base", "Sei sei, talvez numa próxima vida eu nasça pra ir pro campo, enquanto isso ajudo por trás do monitor mesmo… Enfim terminei o relatorio aqui, vou para casa dormir, abraço.", "Abraço, até amanhã.", "lysandro:r2:t5:50", 50, { trust: 1 }),
      c("provocar", "Sei… já arrumou uma desculpa pra ficar me protegendo. Por enquanto continuo atrás do monitor. Terminei o relatório, vou dormir. Abraço.", "Abraço, até amanhã.", "lysandro:r2:t5:30", 30, { tension: 1 }),
      c("flertar", "Com você oferecendo proteção desse jeito até fica mais tentador… Mas por enquanto fico no monitor mesmo. Terminei o relatório, vou dormir. Abraço.", "Abraço, até amanhã.", "lysandro:r2:t5:100", 100, { attraction: 1, intimacy: 1 }),
    ]},
  ],
};

const day3: DialogueScene = {
  day: 3,
  id: "placeholder-dia3-lysandro",
  characterId: "lysandro",
  speaker: "Lysandro",
  timeLabel: "19:26 · NEXO",
  opening: "Acho que me passei naqueles caras, mas eles tavam pedindo, quem mandaram mexer com gente que tava quieta…",
  availability: { minDay: 3, maxDay: 3 },
  completionFlag: "scene:placeholder-dia3-lysandro:complete",
  choices: [
    c("base", "Nada aconteceu, nada sério fora da jurisdição, eles são estão mais quebrados que o normal mas tão bem sabe.", "Concordo, nada sério… Sabe o que seria bem sério? A gente ir no bar do Becos agora tomar uma o que acha? Eu conheço o dono e lá tem uns drinks muito gostosos, vai combinar você e os drinks…", "lysandro:r3:t1:50", 50, { trust: 1 }),
    c("casual", "Oficialmente? Nada demais aconteceu. Talvez eles tenham saído um pouco mais quebrados que o esperado, só isso.", "Concordo, nada sério… Sabe o que seria bem sério? A gente ir no bar do Becos agora tomar uma o que acha? Eu conheço o dono e lá tem uns drinks muito gostosos, vai combinar você e os drinks…", "lysandro:r3:t1:30", 30, { respect: 1 }),
    c("provocar", "Eu vi o relatório, Lysandro. Minha definição de “se passar” e a sua claramente são diferentes kkkkk.", "Concordo, nada sério… Sabe o que seria bem sério? A gente ir no bar do Becos agora tomar uma o que acha? Eu conheço o dono e lá tem uns drinks muito gostosos, vai combinar você e os drinks…", "lysandro:r3:t1:100", 100, { intimacy: 1, tension: 1 }),
  ],
  followUps: [
    { id: "lysandro:r3:t2", incoming: "", choices: [
      c("base", "Como é? Kkkk Beber no meio da semana mesmo será que da bom?", "A gente não encher a cara é só um encontrinho normal po", "lysandro:r3:t2:50", 50, { trust: 1 }),
      c("provocar", "Você saiu de “nada sério” pra me chamar pra beber muito rápido kkkkk.", "A gente não encher a cara é só um encontrinho normal po", "lysandro:r3:t2:30", 30, { tension: 1 }),
      c("flertar", "“Vai combinar você e os drinks”? Essa foi sua maneira de me chamar pra sair?", "A gente não encher a cara é só um encontrinho normal po", "lysandro:r3:t2:100", 100, { attraction: 1, intimacy: 1 }),
    ]},
    { id: "lysandro:r3:t3", incoming: "", choices: [
      c("base", "Encontrinho? Tá, tô finalizando aqui e vou pra lá.", "Beleza, vou te esperar aqui fora mesmo e a gente vai junto…", "lysandro:r3:outing:50", 50, { trust: 1, intimacy: 1 }, { exclusiveOutingDay: 3, vnSceneId: "outing-day3-lysandro" }),
      c("provocar", "Ah, então agora virou “encontrinho”? Interessante… Tá, tô finalizando aqui.", "Beleza, vou te esperar aqui fora mesmo e a gente vai junto…", "lysandro:r3:outing:30", 30, { trust: 1, tension: 1 }, { exclusiveOutingDay: 3, vnSceneId: "outing-day3-lysandro" }),
      c("flertar", "Se é um “encontrinho”, você podia ter começado por aí. Tô finalizando aqui e vou pra lá.", "Beleza, vou te esperar aqui fora mesmo e a gente vai junto…", "lysandro:r3:outing:100", 100, { intimacy: 1, attraction: 2 }, { exclusiveOutingDay: 3, vnSceneId: "outing-day3-lysandro" }),
    ]},
  ],
};

const day4: DialogueScene = {
  day: 4,
  id: "placeholder-dia4-lysandro",
  characterId: "lysandro",
  speaker: "Lysandro",
  timeLabel: "19:11 · NEXO",
  opening: "",
  availability: { minDay: 4, maxDay: 4 },
  completionFlag: "scene:placeholder-dia4-lysandro:complete",
  choices: [
    c("base", "Chegou em casa?", "Sim sim, ainda to cheio de energia…", "lysandro:r4:t1:50", 50, { trust: 1 }),
    c("casual", "Chegou inteiro aí?", "Sim sim, ainda to cheio de energia…", "lysandro:r4:t1:30", 30, { respect: 1 }),
    c("flertar", "Já chegou em casa ou ainda tá pensando no nosso “encontrinho”?", "Sim sim, ainda to cheio de energia…", "lysandro:r4:t1:100", 100, { attraction: 1, intimacy: 1 }),
  ],
  followUps: [
    { id: "lysandro:r4:t2", incoming: "", choices: [
      c("base", "Guerreiro demais ta doido.", "Paia se eu sair pra fazer mais patrulha?", "lysandro:r4:t2:50", 50, { trust: 1 }),
      c("casual", "Como você ainda tem energia depois de hoje? Kkkkk", "Paia se eu sair pra fazer mais patrulha?", "lysandro:r4:t2:30", 30, { respect: 1 }),
      c("provocar", "Isso aí já não é energia normal não.", "Paia se eu sair pra fazer mais patrulha?", "lysandro:r4:t2:100", 100, { intimacy: 1, tension: 1 }),
    ]},
    { id: "lysandro:r4:t3", incoming: "", choices: [
      c("base", "Muito paia, considerado atuação Vigilante ou seja crime e a agência não vai gostar muito, lembra que tem que estar registrado nos turnos de patrulha se não as ruas ficam uma bagunça.", "Obviamente, ainda bem que não faço esse  tipo de coisa humpf", "lysandro:r4:t3:50", 50, { respect: 1, trust: 1 }),
      c("direto", "Muito. Sem turno registrado vira atuação de Vigilante, e a Agência definitivamente não vai gostar disso.", "Obviamente, ainda bem que não faço esse  tipo de coisa humpf", "lysandro:r4:t3:30", 30, { respect: 1 }),
      c("provocar", "Lysandro, eu trabalho organizando os turnos justamente pra vocês não resolverem sair patrulhando quando der vontade kkkkk.", "Obviamente, ainda bem que não faço esse  tipo de coisa humpf", "lysandro:r4:t3:100", 100, { trust: 1, tension: 1 }),
    ]},
    { id: "lysandro:r4:t4", incoming: "", choices: [
      c("base", "Quantas vezes você fez isso?", "Algumas….", "lysandro:r4:t4:50", 50, { trust: 1 }),
      c("desconfiado", "Essa resposta foi específica demais. Quantas vezes?", "Algumas….", "lysandro:r4:t4:30", 30, { respect: 1 }),
      c("provocar", "Lysandro… olha bem pra minha mensagem e pensa antes de responder. Quantas vezes?", "Algumas….", "lysandro:r4:t4:100", 100, { intimacy: 1, tension: 1 }),
    ]},
    { id: "lysandro:r4:t5", incoming: "", afterIncoming: [
      { direction: "outgoing", text: "Quantas?" },
      { direction: "incoming", text: "Quatro…" },
    ], choices: [
      c("base", "Vou fingir que não sei mas se me perguntarem digo que não fez nada pois se não eu saberia, mas nada faça denovo POR FAVOR", "Ok ok desculpa…", "lysandro:r4:t5:50", 50, { trust: 1 }),
      c("direto", "Eu não ouvi isso. Oficialmente você não fez nada, porque se tivesse feito eu saberia. Mas não faz de novo, por favor.", "Ok ok desculpa…", "lysandro:r4:t5:30", 30, { respect: 1 }),
      c("provocar", "Perfeito. Vou apagar mentalmente essa informação antes que ela vire problema pra nós dois. NÃO FAZ DE NOVO.", "Ok ok desculpa…", "lysandro:r4:t5:100", 100, { intimacy: 1, tension: 1 }),
    ]},
    { id: "lysandro:r4:t6", incoming: "", choices: [
      c("base", "Você precisa descansar, tem outras pessoas lidando com isso também, não tenta carregar o mundo nas suas costas ok?", "Eu sei, isso conta para você também tá? Eu sei que você fica com muita coisa nas costas, vamos relaxar um pouco, ok? Às vezes na companhia um do outro, se quiser…", "lysandro:r4:t6:50", 50, { trust: 1, intimacy: 1 }),
      c("cuidadoso", "Você não precisa resolver tudo sem ajuda. Tem uma equipe inteira aqui justamente pra isso. Descansa um pouco, sério.", "Eu sei, isso conta para você também tá? Eu sei que você fica com muita coisa nas costas, vamos relaxar um pouco, ok? Às vezes na companhia um do outro, se quiser…", "lysandro:r4:t6:30", 30, { trust: 1 }),
      c("pessoal", "Eu sei que você quer ajudar, mas não precisa carregar tudo sem ajuda. Deixa outras pessoas cuidarem de você também às vezes.", "Eu sei, isso conta para você também tá? Eu sei que você fica com muita coisa nas costas, vamos relaxar um pouco, ok? Às vezes na companhia um do outro, se quiser…", "lysandro:r4:t6:100", 100, { trust: 1, intimacy: 2 }),
    ]},
    { id: "lysandro:r4:t7", incoming: "", choices: [
      c("base", "Ta com bastante energia ainda pelo jeito, mas fica de boa ai kkkk", "Então vou ficar por aqui hoje :/", "lysandro:r4:t7:50", 50, { trust: 1 }, { afterResponse: photoEspelho }),
      c("provocar", "Você realmente consegue transformar qualquer assunto em convite, né? Kkkkk. Mas fica de boa aí hoje.", "Então vou ficar por aqui hoje :/", "lysandro:r4:t7:30", 30, { tension: 1 }, { afterResponse: photoEspelho }),
      c("flertar", "“Juntos, às vezes”? Vou guardar essa proposta. Mas hoje você vai descansar.", "Então vou ficar por aqui hoje :/", "lysandro:r4:t7:100", 100, { attraction: 1, intimacy: 1 }, { afterResponse: photoEspelho }),
    ]},
  ],
};

const day5: DialogueScene = {
  day: 5,
  id: "placeholder-dia5-lysandro",
  characterId: "lysandro",
  speaker: "Lysandro",
  timeLabel: "20:03 · NEXO",
  opening: "Mandou muito bem hoje!!!",
  availability: { minDay: 5, maxDay: 5 },
  completionFlag: "scene:placeholder-dia5-lysandro:complete",
  choices: [
    c("base", "Você também!!", "Sua capacidade de organização é surreal, queria ser assim na minha vida num geral kkkk", "lysandro:r5:t1:50", 50, { trust: 1 }),
    c("casual", "Valeu!! Vocês facilitaram bastante meu trabalho hoje.", "Sua capacidade de organização é surreal, queria ser assim na minha vida num geral kkkk", "lysandro:r5:t1:30", 30, { respect: 1 }),
    c("flertar", "Você também. Até que trabalhamos bem juntos, né?", "Sua capacidade de organização é surreal, queria ser assim na minha vida num geral kkkk", "lysandro:r5:t1:100", 100, { attraction: 1, intimacy: 1 }),
  ],
  followUps: [
    { id: "lysandro:r5:t2", incoming: "", choices: [
      c("base", "Eu fiz curso, ta? Não é tão fácil assim também, mas se quiser posso te ajudar com algumas coisas…", "Eu sei, você é bom em muitas coisas que eu sei, tô precisando de tanta ajuda com umas coisinhas, você pode me ajudar sabe…", "lysandro:r5:t2:50", 50, { trust: 1 }),
      c("casual", "Eu estudei pra isso, tá? Kkkkk. Mas se precisar organizar alguma coisa eu posso ajudar.", "Eu sei, você é bom em muitas coisas que eu sei, tô precisando de tanta ajuda com umas coisinhas, você pode me ajudar sabe…", "lysandro:r5:t2:30", 30, { respect: 1 }),
      c("provocar", "Finalmente reconhecendo meus talentos. Posso tentar organizar sua vida também, mas não prometo milagres.", "Eu sei, você é bom em muitas coisas que eu sei, tô precisando de tanta ajuda com umas coisinhas, você pode me ajudar sabe…", "lysandro:r5:t2:100", 100, { intimacy: 1, tension: 1 }),
    ]},
    { id: "lysandro:r5:t3", incoming: "", choices: [
      c("base", "Que coisas?", "O tipo de coisa que você tem que ficar bem perto pra entender sabe, não da para simplesmente contar assim, é segredo…", "lysandro:r5:t3:50", 50, { trust: 1 }),
      c("desconfiado", "Eu já não gostei do jeito que você falou “coisinhas”…", "O tipo de coisa que você tem que ficar bem perto pra entender sabe, não da para simplesmente contar assim, é segredo…", "lysandro:r5:t3:30", 30, { tension: 1 }),
      c("flertar", "Depende muito do tipo de ajuda que você tá querendo…", "O tipo de coisa que você tem que ficar bem perto pra entender sabe, não da para simplesmente contar assim, é segredo…", "lysandro:r5:t3:100", 100, { attraction: 1, intimacy: 1 }),
    ]},
    { id: "lysandro:r5:t4", incoming: "", choices: [
      c("base", "Ah sim, entendo… Envolve tipo aquilo que rolou no bar ou algo diferente?", "Assim, às vezes sabe, um poucos dos dois por que nunca se sabe né, tem tanta coisa pra poder fazer…", "lysandro:r5:t4:50", 50, { trust: 1 }),
      c("provocar", "Ah, claro. “Segredo”. E por coincidência eu preciso ficar bem perto pra descobrir, né?", "Assim, às vezes sabe, um poucos dos dois por que nunca se sabe né, tem tanta coisa pra poder fazer…", "lysandro:r5:t4:30", 30, { tension: 1 }),
      c("flertar", "Se envolve ficar perto assim, acho que já tenho uma ideia do tipo de ajuda que você quer…", "Assim, às vezes sabe, um poucos dos dois por que nunca se sabe né, tem tanta coisa pra poder fazer…", "lysandro:r5:t4:100", 100, { attraction: 1, intimacy: 1 }),
    ]},
    { id: "lysandro:r5:t5", incoming: "", choices: [
      c("base", "Aham sei, envolve outras coisas também então, acho que vou precisar me preparar então né, estudar um pouco sobre o assunto, talvez maneiras diferentes pra ajudar.", "Então, combina você me ajuda e eu te ajudo em outros quesitos…", "lysandro:r5:t5:50", 50, { trust: 1 }),
      c("provocar", "Nossa, parece um problema extremamente complexo. Vou precisar de muita pesquisa pra resolver isso aí.", "Então, combina você me ajuda e eu te ajudo em outros quesitos…", "lysandro:r5:t5:30", 30, { tension: 1 }),
      c("flertar", "Então vou ter que estudar bastante. Não quero chegar sem preparação pra uma situação tão complicada dessas.", "Então, combina você me ajuda e eu te ajudo em outros quesitos…", "lysandro:r5:t5:100", 100, { attraction: 1, intimacy: 1 }),
    ]},
    { id: "lysandro:r5:t6", incoming: "", choices: [
      c("base", "Sim Sim, mas ja ta tarde, melhor eu ir antes que atrase tudo para amanha, boa noite!", "Aff kkkk, boa noite!", "lysandro:r5:t6:50", 50, { trust: 1 }),
      c("provocar", "Muito conveniente esse acordo pra você kkkkk. Mas já tá tarde. Boa noite!", "Aff kkkk, boa noite!", "lysandro:r5:t6:30", 30, { tension: 1 }),
      c("flertar", "A proposta é interessante… vou pensar nela. Mas hoje eu preciso ir. Boa noite!", "Aff kkkk, boa noite!", "lysandro:r5:t6:100", 100, { attraction: 1, intimacy: 1 }),
    ]},
  ],
};

const day6: DialogueScene = {
  day: 6,
  id: "placeholder-dia6-lysandro",
  characterId: "lysandro",
  speaker: "Lysandro",
  timeLabel: "19:34 · NEXO",
  opening: "Oiee",
  availability: { minDay: 6, maxDay: 6 },
  completionFlag: "scene:placeholder-dia6-lysandro:complete",
  choices: [
    c("base", "Oii", "Recebemos um maior elogio hoje, sei que você tem dedo nisso…", "lysandro:r6:t1:50", 50, { trust: 1 }),
    c("casual", "Opa, oii", "Recebemos um maior elogio hoje, sei que você tem dedo nisso…", "lysandro:r6:t1:30", 30, { respect: 1 }),
    c("flertar", "Oiee. Veio pedir mais alguma “ajudinha”?", "Recebemos um maior elogio hoje, sei que você tem dedo nisso…", "lysandro:r6:t1:100", 100, { attraction: 1, intimacy: 1 }),
  ],
  followUps: [
    { id: "lysandro:r6:t2", incoming: "", choices: [
      c("base", "Apenas os resultados do trabalho de vocês, eu só organizo todo mundo.", "Acho que devemos comemorar então, conheço um lugar diferente do ultimo, tem umas comidas estranhas que nunca comi, mas acho que vai ser legal!", "lysandro:r6:t2:50", 50, { trust: 1 }),
      c("casual", "O mérito é de vocês. Eu só tento impedir que tudo vire uma bagunça kkkkk.", "Acho que devemos comemorar então, conheço um lugar diferente do ultimo, tem umas comidas estranhas que nunca comi, mas acho que vai ser legal!", "lysandro:r6:t2:30", 30, { respect: 1 }),
      c("flertar", "Talvez eu tenha ajudado um pouquinho… mas vocês fizeram por merecer.", "Acho que devemos comemorar então, conheço um lugar diferente do ultimo, tem umas comidas estranhas que nunca comi, mas acho que vai ser legal!", "lysandro:r6:t2:100", 100, { intimacy: 1 }),
    ]},
    { id: "lysandro:r6:t3", incoming: "", choices: [
      c("base", "Vish será que tenho roupa pra isso?", "Tem sim pô, se não tiver a gente dá um jeito também, deve ter algum lugar aberto…", "lysandro:r6:t3:50", 50, { trust: 1 }),
      c("casual", "Pela descrição desse lugar eu já tô pensando no que vou ter que vestir kkkkk.", "Tem sim pô, se não tiver a gente dá um jeito também, deve ter algum lugar aberto…", "lysandro:r6:t3:30", 30, { respect: 1 }),
      c("flertar", "Outro encontro? Desse jeito vou começar a achar que você gosta da minha companhia.", "Tem sim pô, se não tiver a gente dá um jeito também, deve ter algum lugar aberto…", "lysandro:r6:t3:100", 100, { attraction: 1, intimacy: 1 }),
    ]},
    { id: "lysandro:r6:t4", incoming: "", choices: [
      c("base", "Calma eu tenho sim tava brincando!", "Beleza passo pra te buscar então?", "lysandro:r6:t4:50", 50, { trust: 1 }),
      c("provocar", "Calma kkkkk. Não precisa organizar meu guarda-roupa ainda.", "Beleza passo pra te buscar então?", "lysandro:r6:t4:30", 30, { tension: 1 }),
      c("flertar", "Calma, eu tenho roupa. Pode deixar que eu apareço apresentável pra você.", "Beleza passo pra te buscar então?", "lysandro:r6:t4:100", 100, { attraction: 1, intimacy: 1 }),
    ]},
    { id: "lysandro:r6:t5", incoming: "", choices: [
      c("base", "Sim sim, assim que chegar me avisa.", "Indo", "lysandro:r6:outing:50", 50, { trust: 1, intimacy: 1 }, { exclusiveOutingDay: 6, vnSceneId: "outing-day6-lysandro", afterResponse: photoDate2 }),
      c("casual", "Fechado. Me avisa quando estiver chegando.", "Indo", "lysandro:r6:outing:30", 30, { trust: 1 }, { exclusiveOutingDay: 6, vnSceneId: "outing-day6-lysandro", afterResponse: photoDate2 }),
      c("flertar", "Pode passar. Vou ficar te esperando então.", "Indo", "lysandro:r6:outing:100", 100, { intimacy: 1, attraction: 2 }, { exclusiveOutingDay: 6, vnSceneId: "outing-day6-lysandro", afterResponse: photoDate2 }),
    ]},
  ],
};

export const lysandroPostShiftScenes: DialogueScene[] = [day1, day2, day3, day4, day5, day6];
