import type { DialogueChoice, DialogueMessage, DialogueScene } from "@/game/types";

function c(id:string,text:string,response:string,flag:string,romanceAffinity:100|50|30,delta:DialogueChoice["delta"],extras:Partial<DialogueChoice>={}):DialogueChoice {
  return { id, text, response, flag, romanceAffinity, delta, ...extras };
}

const photoWhiteDress: DialogueMessage[] = [{ direction:"incoming", image:"/nexo/alexandra/chat-1-vestido-branco.jpg", imageAlt:"Foto enviada por Alexandra usando um vestido branco antes do evento beneficente." }];
const photoPark: DialogueMessage[] = [
  { direction:"incoming", image:"/nexo/alexandra/chat-2-parque.png", imageAlt:"Foto das plantas e flores do parque enviada por Alexandra." },
  { direction:"incoming", text:"Tirei foto da plantas…" },
  { direction:"incoming", text:"Do parque no caso de hoje…" },
];
const photoElevator: DialogueMessage[] = [
  { direction:"incoming", image:"/nexo/alexandra/chat-3-elevador.jpg", imageAlt:"Foto enviada por Alexandra no elevador a caminho do apartamento de {{playerName}}." },
  { direction:"incoming", text:"Abre a porta." },
];

const day1: DialogueScene = {
  day:1,id:"dia1-alexandra-pos-expediente",characterId:"alexandra",speaker:"Alexandra",timeLabel:"19:31 · NEXO",
  opening:"Olá, muito bom te conhecer, sou Alexandra, estou no time Guerreiros Elementais, gostaria de saber mais sobre o seu background.",
  availability:{minDay:1,maxDay:1},completionFlag:"scene:dia1-alexandra-pos-expediente:complete",
  choices:[
    c("base","Olá, tudo bem? Eu sou {{playerName}}, comecei hoje como analista de vocês, cursei Administração Heroica por 4 anos, me formei recentemente, antes daqui tive experiências em estágios não remunerados.","Qual faculdade?","alexandra:r1:t1:50",50,{trust:1}),
    c("alternativa","Olá! Sou {{playerName}}, comecei como analista de vocês hoje. Me formei recentemente em Administração Heroica, depois de 4 anos de curso e alguns estágios não remunerados.","Qual faculdade?","alexandra:r1:t1:30",30,{respect:1}),
    c("aberta","Oii, prazer Alexandra! Sou {{playerName}}, comecei hoje como analista. Fiz Administração Heroica por 4 anos e me formei recentemente, antes daqui só tive algumas experiências em estágios.","Qual faculdade?","alexandra:r1:t1:100",100,{intimacy:1}),
  ],followUps:[
    {id:"alexandra:r1:t2",incoming:"",choices:[
      c("base","Universidade de Nova Aurora…","Entendi, Obrigado.","alexandra:r1:t2:50",50,{trust:1}),
      c("alternativa","Me formei na Universidade de Nova Aurora.","Entendi, Obrigado.","alexandra:r1:t2:30",30,{respect:1}),
      c("aberta","Universidade de Nova Aurora, conhece?","Entendi, Obrigado.","alexandra:r1:t2:100",100,{intimacy:1}),
    ]},
    {id:"alexandra:r1:t3",incoming:"",choices:[
      c("base","A gente pode virar um pouco essa entrevista? Gostaria de saber de você também.","Sou Alexandra, heroína de campo e responsável pela divisão de projetos sociais da agência, meus poderes são especializados em combate de média e longa distância, utilizando construtos de Água e tudo relacionado a isso.","alexandra:r1:t3:50",50,{trust:1}),
      c("alternativa","Agora posso fazer algumas perguntas também? Gostaria de conhecer mais sobre você.","Sou Alexandra, heroína de campo e responsável pela divisão de projetos sociais da agência, meus poderes são especializados em combate de média e longa distância, utilizando construtos de Água e tudo relacionado a isso.","alexandra:r1:t3:30",30,{respect:1}),
      c("aberta","Bom, agora que você já sabe um pouco sobre mim, acho justo eu saber mais sobre você também, né?","Sou Alexandra, heroína de campo e responsável pela divisão de projetos sociais da agência, meus poderes são especializados em combate de média e longa distância, utilizando construtos de Água e tudo relacionado a isso.","alexandra:r1:t3:100",100,{intimacy:1}),
    ]},
    {id:"alexandra:r1:t4",incoming:"",choices:[
      c("base","Agradeço muito, isso vai me ajudar bastante. Espero ter te ajudado também.","Claro, se eu precisar de alguma coisa eu te chamo, certo? Até mais então.","alexandra:r1:t4:50",50,{trust:1}),
      c("alternativa","Entendi, vai ser muito bom saber disso na hora de organizar os casos. Agradeço por me explicar.","Claro, se eu precisar de alguma coisa eu te chamo, certo? Até mais então.","alexandra:r1:t4:30",30,{respect:1}),
      c("aberta","Perfeito, já consigo ter uma ideia melhor de como trabalhar com você. Espero que minha apresentação tenha ajudado também.","Claro, se eu precisar de alguma coisa eu te chamo, certo? Até mais então.","alexandra:r1:t4:100",100,{intimacy:1}),
    ]},
    {id:"alexandra:r1:t5",incoming:"",choices:[
      c("base","Isso, até mais…","","alexandra:r1:t5:50",50,{trust:1}),
      c("alternativa","Claro, pode me chamar. Até mais!","","alexandra:r1:t5:30",30,{respect:1}),
      c("aberta","Combinado, qualquer coisa estou por aqui. Até mais!","","alexandra:r1:t5:100",100,{intimacy:1}),
    ]},
  ]
};

const day2: DialogueScene = {
  day:2,id:"placeholder-dia2-alexandra",characterId:"alexandra",speaker:"Alexandra",timeLabel:"19:19 · NEXO",opening:"",availability:{minDay:2,maxDay:2},completionFlag:"scene:placeholder-dia2-alexandra:complete",
  choices:[
    c("base","Oii Alexandra, você foi muito bem hoje, meus parabéns!","Agradeço, ainda acho que poderia ter me enviado em mais casos.","alexandra:r2:t1:50",50,{trust:1}),
    c("alternativa","Oii Alexandra, parabéns pelo trabalho de hoje, você foi muito bem!","Agradeço, ainda acho que poderia ter me enviado em mais casos.","alexandra:r2:t1:30",30,{respect:1}),
    c("aberta","Oii, queria te dar os parabéns por hoje, você mandou muito bem!","Agradeço, ainda acho que poderia ter me enviado em mais casos.","alexandra:r2:t1:100",100,{intimacy:1}),
  ],followUps:[
    {id:"alexandra:r2:t2",incoming:"",choices:[
      c("base","Entendo, mas não posso mandar você para todas, ainda tem que prezar que esteja bem e viva depois do expediente.","Então sabe que eu poderia estar fazendo mais?","alexandra:r2:t2:50",50,{trust:1}),
      c("alternativa","Eu sei, mas também preciso tomar cuidado para não te sobrecarregar, não posso mandar você para todos os casos que aparecem.","Então sabe que eu poderia estar fazendo mais?","alexandra:r2:t2:30",30,{respect:1}),
      c("aberta","Você provavelmente conseguiria fazer mais, mas também preciso garantir que você chegue inteira no final do expediente.","Então sabe que eu poderia estar fazendo mais?","alexandra:r2:t2:100",100,{intimacy:1}),
    ]},
    {id:"alexandra:r2:t3",incoming:"",choices:[
      c("base","É claro, você é muito boa, não posso deixar você se passar e se machucar no processo.","Então me mande para mais casos na próxima, te mostro que consigo aguentar.","alexandra:r2:t3:50",50,{trust:1}),
      c("alternativa","Sei que poderia, você mostrou isso hoje. Só não quero exagerar e acabar te colocando em risco por isso.","Então me mande para mais casos na próxima, te mostro que consigo aguentar.","alexandra:r2:t3:30",30,{respect:1}),
      c("aberta","Claro que sei, não estou duvidando de você. Só também preciso saber a hora de não te mandar para outro caso.","Então me mande para mais casos na próxima, te mostro que consigo aguentar.","alexandra:r2:t3:100",100,{intimacy:1}),
    ]},
    {id:"alexandra:r2:t4",incoming:"",choices:[
      c("base","Vou ver o que posso fazer por você, ok?","Certo, agradeço.","alexandra:r2:t4:50",50,{trust:1}),
      c("alternativa","Certo, na próxima vou tentar te dar um pouco mais de trabalho então.","Certo, agradeço.","alexandra:r2:t4:30",30,{respect:1}),
      c("aberta","Beleza, vou lembrar disso na próxima. Depois não vale reclamar que eu te mandei para muita coisa.","Certo, agradeço.","alexandra:r2:t4:100",100,{intimacy:1}),
    ]},
  ]
};

const day3: DialogueScene = {
  day:3,id:"placeholder-dia3-alexandra",characterId:"alexandra",speaker:"Alexandra",timeLabel:"19:27 · NEXO",opening:"Boa tarde, a Agência te notificou sobre o evento beneficente?",availability:{minDay:3,maxDay:3},completionFlag:"scene:placeholder-dia3-alexandra:complete",
  choices:[
    c("base","Boa tarde! Sim sim, pelo jeito vamos juntos.","Sim, é um evento beneficente de arte e cultura da cidade, Mostra Cultural de Ballet Contemporâneo, que a agência está financiando.","alexandra:r3:t1:50",50,{trust:1}),
    c("alternativa","Boa tarde! Sim, recebi a notificação, parece que nós dois vamos representar a Agência.","Sim, é um evento beneficente de arte e cultura da cidade, Mostra Cultural de Ballet Contemporâneo, que a agência está financiando.","alexandra:r3:t1:30",30,{respect:1}),
    c("aberta","Oii, notificou sim! Vi que vamos juntos para o evento.","Sim, é um evento beneficente de arte e cultura da cidade, Mostra Cultural de Ballet Contemporâneo, que a agência está financiando.","alexandra:r3:t1:100",100,{intimacy:1}),
  ],followUps:[
    {id:"alexandra:r3:t2",incoming:"",choices:[
      c("base","Beleza, vou me organizar aqui e vou para a apresentação. Te encontro lá?","Sim, para me achar mais fácil estou usando um vestido branco.","alexandra:r3:t2:50",50,{trust:1},{afterResponse:photoWhiteDress}),
      c("alternativa","Entendi, vou terminar minhas coisas aqui e me organizar para ir. A gente se encontra por lá?","Sim, para me achar mais fácil estou usando um vestido branco.","alexandra:r3:t2:30",30,{respect:1},{afterResponse:photoWhiteDress}),
      c("aberta","Parece interessante, vou me arrumar depois do expediente e vou para lá. Te encontro no evento?","Sim, para me achar mais fácil estou usando um vestido branco.","alexandra:r3:t2:100",100,{intimacy:1},{afterResponse:photoWhiteDress}),
    ]},
    {id:"alexandra:r3:t3",incoming:"",choices:[
      c("base","Ótimo, ficou perfeito nela, vou me arrumar de acordo.","A gente não precisa combinar, você sabe né?","alexandra:r3:t3:50",50,{trust:1,intimacy:1}),
      c("alternativa","Ficou muito bonito em você, pelo menos agora vai ser fácil te encontrar. Vou me arrumar também.","A gente não precisa combinar, você sabe né?","alexandra:r3:t3:30",30,{trust:1}),
      c("aberta","Ficou perfeito em você, acho que já sei até como vou me arrumar para ir então.","A gente não precisa combinar, você sabe né?","alexandra:r3:t3:100",100,{intimacy:1,attraction:2}),
    ]},
    {id:"alexandra:r3:t4",incoming:"",choices:[
      c("base","Sim.","","alexandra:r3:outing:50",50,{trust:1,intimacy:1},{exclusiveOutingDay:3,vnSceneId:"outing-day3-alexandra"}),
      c("alternativa","Eu sei kkkkk","","alexandra:r3:outing:30",30,{trust:1},{exclusiveOutingDay:3,vnSceneId:"outing-day3-alexandra"}),
      c("aberta","Claro, pura coincidência se acontecer.","","alexandra:r3:outing:100",100,{intimacy:1,attraction:2},{exclusiveOutingDay:3,vnSceneId:"outing-day3-alexandra"}),
    ]},
  ]
};

const day4: DialogueScene = {
  day:4,id:"placeholder-dia4-alexandra",characterId:"alexandra",speaker:"Alexandra",timeLabel:"19:16 · NEXO",opening:"",availability:{minDay:4,maxDay:4},completionFlag:"scene:placeholder-dia4-alexandra:complete",
  choices:[
    c("base","Oii, gostou daquele caso que mandei você hoje? Achei que combinava com você…","Ah sim, resolvi rapidinho, sem problemas.","alexandra:r4:t1:50",50,{trust:1}),
    c("alternativa","Oii, o que achou daquele caso que te mandei hoje? Quando apareceu achei que seria perfeito para você.","Ah sim, resolvi rapidinho, sem problemas.","alexandra:r4:t1:30",30,{respect:1}),
    c("aberta","Oii Alexandra, gostou do caso de hoje? Na hora que apareceu pensei em mandar você.","Ah sim, resolvi rapidinho, sem problemas.","alexandra:r4:t1:100",100,{intimacy:1}),
  ],followUps:[
    {id:"alexandra:r4:t2",incoming:"",choices:[
      c("base","Estava pensando de um jeito para melhorar a dinâmica do time, e acho que ontem me ajudou muito a ter outra visão sabe?","Tipo o que?","alexandra:r4:t2:50",50,{trust:1}),
      c("alternativa","Estava pensando em algumas formas de melhorar a dinâmica do time, e depois de ontem acho que tive algumas ideias.","Tipo o que?","alexandra:r4:t2:30",30,{respect:1}),
      c("aberta","Sabe que fiquei pensando em algumas coisas que você falou ontem? Acho que me ajudou a pensar diferente sobre a dinâmica do time.","Tipo o que?","alexandra:r4:t2:100",100,{intimacy:1}),
    ]},
    {id:"alexandra:r4:t3",incoming:"",choices:[
      c("base","Sabe, as vezes as pessoas precisam deixar o movimento acontecer, algumas coisas acontecem naturalmente, falando sobre os casos né, outras coisas também…","Aham, entendo, acho que concordo, talvez alguns casos resolvidos em grupo podem ajudar na dinâmica do time.","alexandra:r4:t3:50",50,{trust:1}),
      c("alternativa","Aquilo que você falou sobre deixar um movimento levar ao próximo, acho que algumas coisas funcionam melhor quando acontecem naturalmente, nos casos e em outras coisas também…","Aham, entendo, acho que concordo, talvez alguns casos resolvidos em grupo podem ajudar na dinâmica do time.","alexandra:r4:t3:30",30,{respect:1}),
      c("aberta","Talvez nem tudo precise ser tão planejado, às vezes é melhor deixar as coisas acontecerem naturalmente. Nos casos, claro… mas acho que serve para outras coisas.","Aham, entendo, acho que concordo, talvez alguns casos resolvidos em grupo podem ajudar na dinâmica do time.","alexandra:r4:t3:100",100,{intimacy:1,attraction:1}),
    ]},
    {id:"alexandra:r4:t4",incoming:"",choices:[
      c("base","Sim sim a dinâmica do time, pensando que também faço parte do time, acho que se aplica a mim também, como fizemos ontem sabe, a gente se deu muito bem…","Aham, com certeza, tipo dinâmica de time né kkkk","alexandra:r4:t4:50",50,{intimacy:1}),
      c("alternativa","Exatamente, mas como eu também faço parte do time acho que isso vale para nós dois, ontem mesmo acho que a gente funcionou muito bem juntos…","Aham, com certeza, tipo dinâmica de time né kkkk","alexandra:r4:t4:30",30,{trust:1}),
      c("aberta","Sim, claro, estou falando da dinâmica do time kkkkk mas pensando em ontem também, acho que nós dois nos demos muito bem.","Aham, com certeza, tipo dinâmica de time né kkkk","alexandra:r4:t4:100",100,{intimacy:1,attraction:2}),
    ]},
    {id:"alexandra:r4:t5",incoming:"Vou indo agora, abraço!",choices:[
      c("base","Abraço kkkk","","alexandra:r4:t5:50",50,{trust:1}),
      c("alternativa","Kkkkk abraço, até amanhã!","","alexandra:r4:t5:30",30,{respect:1}),
      c("aberta","Tá bom, vou fingir que era só sobre isso kkkkk abraço!","","alexandra:r4:t5:100",100,{intimacy:1,attraction:1}),
    ]},
  ]
};

const day5: DialogueScene = {
  day:5,id:"placeholder-dia5-alexandra",characterId:"alexandra",speaker:"Alexandra",timeLabel:"19:23 · NEXO",opening:"Oii, você foi muito bem hoje, sabia?",availability:{minDay:5,maxDay:5},completionFlag:"scene:placeholder-dia5-alexandra:complete",
  choices:[
    c("base","Oii, vindo de você é um grande elogio… Agradeço!","Ainda podemos analisar tudo depois para ver se errou mas não se empolgue muito…","alexandra:r5:t1:50",50,{trust:1}),
    c("alternativa","Oii, agradeço! Principalmente vindo de você, vou considerar um baita elogio.","Ainda podemos analisar tudo depois para ver se errou mas não se empolgue muito…","alexandra:r5:t1:30",30,{respect:1}),
    c("aberta","Oii, olha só, finalmente consegui um elogio seu kkkkk agradeço!","Ainda podemos analisar tudo depois para ver se errou mas não se empolgue muito…","alexandra:r5:t1:100",100,{intimacy:1}),
  ],followUps:[
    {id:"alexandra:r5:t2",incoming:"",choices:[
      c("base","Tá bom vamos com calma né, mas você já está me mandando elogios, isso é bom…","Ah, você estava prestando mais atenção nisso?","alexandra:r5:t2:50",50,{trust:1}),
      c("alternativa","Kkkkk claro que tinha alguma coisa depois do elogio, mas já é um avanço.","Ah, você estava prestando mais atenção nisso?","alexandra:r5:t2:30",30,{respect:1}),
      c("aberta","Tudo bem, depois a gente procura os erros. Por enquanto vou aproveitar que você me elogiou.","Ah, você estava prestando mais atenção nisso?","alexandra:r5:t2:100",100,{intimacy:1}),
    ]},
    {id:"alexandra:r5:t3",incoming:"",choices:[
      c("base","Vindo de você? Óbvio…","Então guarde bem eles pois não são fáceis de ganhar.","alexandra:r5:t3:50",50,{intimacy:1}),
      c("alternativa","Claro, não é todo dia que ganho um elogio seu.","Então guarde bem eles pois não são fáceis de ganhar.","alexandra:r5:t3:30",30,{trust:1}),
      c("aberta","Em você? Eu presto atenção em bastante coisa…","Então guarde bem eles pois não são fáceis de ganhar.","alexandra:r5:t3:100",100,{intimacy:1,attraction:2}),
    ]},
    {id:"alexandra:r5:t4",incoming:"",choices:[
      c("base","Pode deixar!","","alexandra:r5:t4:50",50,{trust:1},{afterResponse:photoPark}),
      c("alternativa","Pode deixar, vou guardar esse então.","","alexandra:r5:t4:30",30,{respect:1},{afterResponse:photoPark}),
      c("aberta","Agora que sei que são raros vou valorizar ainda mais.","","alexandra:r5:t4:100",100,{intimacy:1},{afterResponse:photoPark}),
    ]},
    {id:"alexandra:r5:t5",incoming:"",choices:[
      c("base","Fofo","Sii","alexandra:r5:t5:50",50,{trust:1}),
      c("alternativa","Ficaram bonitas kkkkk","Sii","alexandra:r5:t5:30",30,{respect:1}),
      c("aberta","Gostei, você lembrou de me mandar?","Sii","alexandra:r5:t5:100",100,{intimacy:1,attraction:1}),
    ]},
  ]
};

const day6: DialogueScene = {
  day:6,id:"placeholder-dia6-alexandra",characterId:"alexandra",speaker:"Alexandra",timeLabel:"19:37 · NEXO",opening:"Queria ter feito mais hoje, mas foi tão corrido…",availability:{minDay:6,maxDay:6},completionFlag:"scene:placeholder-dia6-alexandra:complete",
  choices:[
    c("base","Tá tudo bem, você foi bem, dias como esse acontecem.","Queria fazer alguma coisa a mais hoje.","alexandra:r6:t1:50",50,{trust:1}),
    c("alternativa","Você fez bastante coisa hoje, não precisa se cobrar tanto. Tem dia que é corrido mesmo.","Queria fazer alguma coisa a mais hoje.","alexandra:r6:t1:30",30,{respect:1}),
    c("aberta","Relaxa, você foi muito bem hoje. Nem todo dia dá para fazer tudo que a gente queria.","Queria fazer alguma coisa a mais hoje.","alexandra:r6:t1:100",100,{intimacy:1}),
  ],followUps:[
    {id:"alexandra:r6:t2",incoming:"",choices:[
      c("base","Saiu um filme novo no streaming Corvo Branco, é de ballet, quer ver?","Ah sim! Eu vi que ia sair, não achei que era hoje já.","alexandra:r6:t2:50",50,{trust:1}),
      c("alternativa","Vi que saiu Corvo Branco hoje no streaming, aquele filme de ballet. Quer assistir?","Ah sim! Eu vi que ia sair, não achei que era hoje já.","alexandra:r6:t2:30",30,{respect:1}),
      c("aberta","Se ainda quer fazer alguma coisa, saiu um filme novo de ballet hoje, Corvo Branco. Quer ver?","Ah sim! Eu vi que ia sair, não achei que era hoje já.","alexandra:r6:t2:100",100,{intimacy:1}),
    ]},
    {id:"alexandra:r6:t3",incoming:"",choices:[
      c("base","Se quiser, pode vir aqui em casa e a gente vê…","Tá me chamando pra sua casa assim sem mais nem menos?","alexandra:r6:t3:50",50,{intimacy:1}),
      c("alternativa","Então, se quiser assistir, pode vir aqui em casa e a gente vê junto.","Tá me chamando pra sua casa assim sem mais nem menos?","alexandra:r6:t3:30",30,{trust:1}),
      c("aberta","Já que nós dois queremos ver, podia vir aqui em casa assistir comigo…","Tá me chamando pra sua casa assim sem mais nem menos?","alexandra:r6:t3:100",100,{intimacy:1,attraction:2}),
    ]},
    {id:"alexandra:r6:t4",incoming:"",choices:[
      c("base","Não é sem mais nem menos po","Tá, eu vou.","alexandra:r6:t4:50",50,{trust:1,intimacy:1}),
      c("alternativa","Kkkkk não é assim sem mais nem menos, já tem um contexto.","Tá, eu vou.","alexandra:r6:t4:30",30,{trust:1}),
      c("aberta","Depois de tudo isso você ainda acha que é sem mais nem menos?","Tá, eu vou.","alexandra:r6:t4:100",100,{intimacy:1,attraction:2}),
    ]},
    {id:"alexandra:r6:t5",incoming:"",choices:[
      c("base","Pode vir, quando chegar só avisar que está subindo aqui no meu apartamento.","Já to no seu elevador","alexandra:r6:outing:50",50,{trust:1,intimacy:1},{afterResponse:photoElevator,exclusiveOutingDay:6,vnSceneId:"outing-day6-alexandra"}),
      c("alternativa","Beleza, pode vir. Quando estiver chegando me avisa.","Já to no seu elevador","alexandra:r6:outing:30",30,{trust:1},{afterResponse:photoElevator,exclusiveOutingDay:6,vnSceneId:"outing-day6-alexandra"}),
      c("aberta","Então vem kkkkk quando chegar aqui só me avisa que está subindo.","Já to no seu elevador","alexandra:r6:outing:100",100,{intimacy:1,attraction:2},{afterResponse:photoElevator,exclusiveOutingDay:6,vnSceneId:"outing-day6-alexandra"}),
    ]},
  ]
};

export const alexandraPostShiftScenes: DialogueScene[] = [day1,day2,day3,day4,day5,day6];
export const alexandraPostShift = day1;
