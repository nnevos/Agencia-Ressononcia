import type { DialogueChoice, DialogueMessage, DialogueScene } from "@/game/types";

function c(id:string,text:string,response:string,flag:string,romanceAffinity:100|50|30,delta:DialogueChoice["delta"],extras:Partial<DialogueChoice>={}):DialogueChoice {
  return { id, text, response, flag, romanceAffinity, delta, ...extras };
}

const photoTraining: DialogueMessage[] = [{ direction:"incoming", image:"/nexo/helio/chat-1-treino.jpg", imageAlt:"Foto enviada por Hélio depois do treino." }];
const photoWine: DialogueMessage[] = [{ direction:"incoming", image:"/nexo/helio/chat-2-vinho.jpg", imageAlt:"Foto enviada por Hélio mostrando o vinho que deixou de presente." }];
const photoShower: DialogueMessage[] = [{ direction:"incoming", image:"/nexo/helio/chat-3-banho.jpg", imageAlt:"Foto enviada por Hélio logo depois do banho." }];

const day1: DialogueScene = {
  day:1,id:"dia1-helio-pos-expediente",characterId:"helio",speaker:"Hélio",timeLabel:"19:18 · NEXO",
  openingOutgoing:"Oi, tudo bem? Estou juntando informações da equipe? Poderia me ajudar?",opening:"Oi, tudo certo, você começou hoje como analista, certo?",availability:{minDay:1,maxDay:1},completionFlag:"scene:dia1-helio-pos-expediente:complete",
  choices:[
    c("base","Isso, comecei hoje e preciso começar a me adaptar e conhecer com quem vou trabalhar kkkk","Claro, meus poderes são baseados em fogo, especificamente mais quentes que o normal tornando-os na coloração azul, tenho um foco maior em combate de médio alcance mas consigo me virar em curto e longo distância mas com limitações.","helio:r1:t1:50",50,{trust:1}),
    c("profissional","Isso mesmo, comecei hoje e estou tentando conhecer melhor todo mundo com quem vou trabalhar kkkk","Claro, meus poderes são baseados em fogo, especificamente mais quentes que o normal tornando-os na coloração azul, tenho um foco maior em combate de médio alcance mas consigo me virar em curto e longo distância mas com limitações.","helio:r1:t1:30",30,{respect:1}),
    c("aberta","Sou eu mesmo kkkk comecei hoje, então ainda estou tentando me adaptar e conhecer todo mundo.","Claro, meus poderes são baseados em fogo, especificamente mais quentes que o normal tornando-os na coloração azul, tenho um foco maior em combate de médio alcance mas consigo me virar em curto e longo distância mas com limitações.","helio:r1:t1:100",100,{intimacy:1}),
  ],followUps:[
    {id:"helio:r1:t2",incoming:"",choices:[
      c("base","Entendi, e com a equipe? Você já é integrado? Se dá bem com todo mundo?","Eu sou mais na minha, pessoal não vai muito com a minha cara, mas tudo bem, o importante é fazer o trabalho…","helio:r1:t2:50",50,{trust:1}),
      c("profissional","Entendi. E em relação ao restante da equipe? Você já conseguiu se integrar bem?","Eu sou mais na minha, pessoal não vai muito com a minha cara, mas tudo bem, o importante é fazer o trabalho…","helio:r1:t2:30",30,{respect:1}),
      c("aberta","Interessante. E trabalhando com o pessoal daqui, como é? Você se dá bem com todo mundo?","Eu sou mais na minha, pessoal não vai muito com a minha cara, mas tudo bem, o importante é fazer o trabalho…","helio:r1:t2:100",100,{intimacy:1}),
    ]},
    {id:"helio:r1:t3",incoming:"",choices:[
      c("base","Entendo, não é fácil mesmo, mas vamos tentar resolver da melhor maneira, enfim, agradeço muito, até amanhã!","Estou à disposição para ajudar, até amanhã.","helio:r1:t3:50",50,{trust:1}),
      c("profissional","Entendo, essas coisas acabam sendo complicadas mesmo. Mas vamos tentar melhorar isso com o tempo. Agradeço pela ajuda, até amanhã!","Estou à disposição para ajudar, até amanhã.","helio:r1:t3:30",30,{respect:1}),
      c("aberta","Imagino que não seja fácil, mas pelo menos podemos tentar fazer as coisas funcionarem da melhor forma. Agradeço pela conversa, até amanhã!","Estou à disposição para ajudar, até amanhã.","helio:r1:t3:100",100,{intimacy:1}),
    ]},
  ]
};

const day2: DialogueScene = {
  day:2,id:"placeholder-dia2-helio",characterId:"helio",speaker:"Hélio",timeLabel:"19:21 · NEXO",openingOutgoing:"Opa Hélio, então, estava olhando sua ficha aqui, existem ligações com um antigo vilão, já preso, poderiamos conversar sobre isso?",opening:"Meu pai no caso, meu pai é o antigo vilão. Não tenho contato com ele, abomino tudo que ele fez no passado, e hoje estou tentando compensar por tudo isso, não precisa se preocupar com isso.",availability:{minDay:2,maxDay:2},completionFlag:"scene:placeholder-dia2-helio:complete",
  choices:[
    c("base","Certo, eu precisava ter certeza dessa situação, não é comum então são coisas diferentes para lidar.","Como eu disse, pessoal não vai muito com a minha cara, então essa parte vai ser complicada mesmo, mas te asseguro, estou nisso de cabeça, para ajudar qualquer um que necessite, por mim.","helio:r2:t1:50",50,{trust:1}),
    c("profissional","Entendi. Eu precisava confirmar isso diretamente com você, é uma situação incomum e precisamos saber como lidar.","Como eu disse, pessoal não vai muito com a minha cara, então essa parte vai ser complicada mesmo, mas te asseguro, estou nisso de cabeça, para ajudar qualquer um que necessite, por mim.","helio:r2:t1:30",30,{respect:1}),
    c("aberta","Certo, era importante ouvir isso de você. Não é exatamente uma situação comum por aqui.","Como eu disse, pessoal não vai muito com a minha cara, então essa parte vai ser complicada mesmo, mas te asseguro, estou nisso de cabeça, para ajudar qualquer um que necessite, por mim.","helio:r2:t1:100",100,{trust:1,intimacy:1}),
  ],followUps:[
    {id:"helio:r2:t2",incoming:"",choices:[
      c("base","Tudo bem Hélio, pode confiar em mim, vou te ajudar com tudo que precisar, confio em você também.","Com certeza. Seguimos bem?","helio:r2:t2:50",50,{trust:2}),
      c("profissional","Pode ficar tranquilo, Hélio. Da minha parte você pode confiar em mim, e eu também vou confiar em você.","Com certeza. Seguimos bem?","helio:r2:t2:30",30,{respect:2}),
      c("aberta","Entendi, Hélio. Se precisar de ajuda com qualquer coisa pode contar comigo, não vou te julgar pelo passado do seu pai.","Com certeza. Seguimos bem?","helio:r2:t2:100",100,{trust:1,intimacy:1}),
    ]},
    {id:"helio:r2:t3",incoming:"",choices:[
      c("base","Com certeza, bom resto de dia!","Igualmente.","helio:r2:t3:50",50,{trust:1}),
      c("profissional","Com certeza. Estamos bem sim, bom resto de dia!","Igualmente.","helio:r2:t3:30",30,{respect:1}),
      c("aberta","Claro que sim. Por mim está tudo certo, tenha um bom resto de dia!","Igualmente.","helio:r2:t3:100",100,{intimacy:1}),
    ]},
  ]
};

const day3: DialogueScene = {
  day:3,id:"placeholder-dia3-helio",characterId:"helio",speaker:"Hélio",timeLabel:"19:27 · NEXO",openingOutgoing:"Boa tarde, Hélio. Falam com você já sobre hoje a noite?",opening:"Sim, já me comunicaram sobre a convenção, pelo jeito sou o unico que vai pode comparecer.",availability:{minDay:3,maxDay:3},completionFlag:"scene:placeholder-dia3-helio:complete",
  choices:[
    c("base","Certo, eu também vou, então podemos nos acompanhar, vai ser mais tranquilo desse jeito.","Claro, pelo jeito precisamos encontrar uma forma de conversar com o primeiro ministro para uma aprovação da nossa agência, assim melhorando nossos apoios?","helio:r3:t1:50",50,{trust:1}),
    c("profissional","Eu também vou estar lá, então podemos ir juntos. Acho que facilita bastante.","Claro, pelo jeito precisamos encontrar uma forma de conversar com o primeiro ministro para uma aprovação da nossa agência, assim melhorando nossos apoios?","helio:r3:t1:30",30,{respect:1}),
    c("aberta","Ótimo, porque eu também vou. Podemos nos acompanhar durante a convenção então.","Claro, pelo jeito precisamos encontrar uma forma de conversar com o primeiro ministro para uma aprovação da nossa agência, assim melhorando nossos apoios?","helio:r3:t1:100",100,{intimacy:1,attraction:1}),
  ],followUps:[
    {id:"helio:r3:t2",incoming:"",choices:[
      c("base","Exatamente, essa ponte vai ser muito importante, vamos nos esforçar para isso.","Acho melhor irmos juntos então, eu passo para te buscar, pode ser?","helio:r3:t2:50",50,{trust:1}),
      c("profissional","Isso mesmo. Conseguir essa aproximação vai ser muito importante para a Agência.","Acho melhor irmos juntos então, eu passo para te buscar, pode ser?","helio:r3:t2:30",30,{respect:1}),
      c("aberta","Exatamente. Se conseguirmos abrir essa ponte com ele, podemos melhorar bastante o apoio à Agência.","Acho melhor irmos juntos então, eu passo para te buscar, pode ser?","helio:r3:t2:100",100,{intimacy:1}),
    ]},
    {id:"helio:r3:t3",incoming:"",choices:[
      c("base","Concordo, assim que estiver pronto pode vir.","A Caminho.","helio:r3:outing:50",50,{trust:1,intimacy:1},{exclusiveOutingDay:3,vnSceneId:"outing-day3-helio"}),
      c("profissional","Pode ser, acho melhor irmos juntos mesmo. Quando estiver pronto pode passar aqui.","A Caminho.","helio:r3:outing:30",30,{trust:1},{exclusiveOutingDay:3,vnSceneId:"outing-day3-helio"}),
      c("aberta","Fechado. Me avisa quando estiver vindo que eu já vou me preparando.","A Caminho.","helio:r3:outing:100",100,{intimacy:1,attraction:2},{exclusiveOutingDay:3,vnSceneId:"outing-day3-helio"}),
    ]},
  ]
};

const day4: DialogueScene = {
  day:4,id:"placeholder-dia4-helio",characterId:"helio",speaker:"Hélio",timeLabel:"19:14 · NEXO",opening:"Oii, entregou o relatório de ontem?",availability:{minDay:4,maxDay:4},completionFlag:"scene:placeholder-dia4-helio:complete",
  choices:[
    c("base","Oii, entreguei sim e o pessoal de cima amou, nos parabenizou e tudo mais, momentos raros…","Que bom que deu tudo certo! Vai ser muito bom para a agência.","helio:r4:t1:50",50,{trust:1}),
    c("profissional","Oii, entreguei sim. E por incrível que pareça o pessoal de cima adorou, até nos parabenizaram kkkk","Que bom que deu tudo certo! Vai ser muito bom para a agência.","helio:r4:t1:30",30,{respect:1}),
    c("aberta","Entreguei sim! Deu tudo certo, o pessoal de cima gostou muito e ainda fomos parabenizados. Milagre…","Que bom que deu tudo certo! Vai ser muito bom para a agência.","helio:r4:t1:100",100,{intimacy:1}),
  ],followUps:[
    {id:"helio:r4:t2",incoming:"",choices:[
      c("base","Pois é, comentei como você se saiu e ficaram muito interessados, estão pensando em te mandar em missões do tipo.","Apesar de gosta muito do trabalho de campo, realmente gosto dessa outra parte. Tenho mais treinamento para fazer hoje, então vou me apressar aqui.","helio:r4:t2:50",50,{trust:1}),
      c("profissional","Sim, e eu comentei bastante sobre como você se saiu. Pelo jeito ficaram interessados em te colocar em outras missões desse tipo.","Apesar de gosta muito do trabalho de campo, realmente gosto dessa outra parte. Tenho mais treinamento para fazer hoje, então vou me apressar aqui.","helio:r4:t2:30",30,{respect:1}),
      c("aberta","Com certeza. Inclusive falei sobre sua atuação ontem e eles ficaram bem interessados, talvez você receba mais missões assim.","Apesar de gosta muito do trabalho de campo, realmente gosto dessa outra parte. Tenho mais treinamento para fazer hoje, então vou me apressar aqui.","helio:r4:t2:100",100,{intimacy:1,attraction:1}),
    ]},
    {id:"helio:r4:t3",incoming:"",choices:[
      c("base","É verdade, você treina todos os dias?","Sim, tenho que me manter em forma, os combates nos casos são coisas sérias. ","helio:r4:t3:50",50,{trust:1},{afterResponse:photoTraining}),
      c("profissional","Você realmente leva os treinos a sério né? Treina todos os dias?","Sim, tenho que me manter em forma, os combates nos casos são coisas sérias. ","helio:r4:t3:30",30,{respect:1},{afterResponse:photoTraining}),
      c("aberta","Mais treinamento? Você costuma treinar todo dia?","Sim, tenho que me manter em forma, os combates nos casos são coisas sérias. ","helio:r4:t3:100",100,{intimacy:1,attraction:1},{afterResponse:photoTraining}),
    ]},
    {id:"helio:r4:t4",incoming:"",choices:[
      c("base","Oloco dá para ver que treina bastante mesmo kkkk","kkkk Trabalhei duro para isso","helio:r4:t4:50",50,{intimacy:1}),
      c("profissional","Tá explicado então kkkkk dá para perceber que você não falta muito nos treinos.","kkkk Trabalhei duro para isso","helio:r4:t4:30",30,{respect:1}),
      c("aberta","Caramba Hélio kkkk realmente não estava brincando quando falou que treina bastante.","kkkk Trabalhei duro para isso","helio:r4:t4:100",100,{intimacy:1,attraction:2}),
    ]},
    {id:"helio:r4:t5",incoming:"",choices:[
      c("base","Enfim vai lá, abraço!","Abraço!","helio:r4:t5:50",50,{trust:1}),
      c("profissional","E dá para perceber kkkk. Vai lá treinar então, abraço!","Abraço!","helio:r4:t5:30",30,{respect:1}),
      c("aberta","O esforço definitivamente apareceu kkkk. Não vou te atrapalhar mais, bom treino!","Abraço!","helio:r4:t5:100",100,{intimacy:1}),
    ]},
  ]
};

const day5: DialogueScene = {
  day:5,id:"placeholder-dia5-helio",characterId:"helio",speaker:"Hélio",timeLabel:"19:22 · NEXO",opening:"Achou o presente que deixei ai na sua mesa?",availability:{minDay:5,maxDay:5},completionFlag:"scene:placeholder-dia5-helio:complete",
  choices:[
    c("base","Meu deus você não fez isso…","Fui comprar um pra mim e acabei por levar dois, ai pensei, por que não?","helio:r5:t1:50",50,{trust:1},{afterResponse:photoWine}),
    c("profissional","Hélio… me diz que você não comprou isso para mim.","Fui comprar um pra mim e acabei por levar dois, ai pensei, por que não?","helio:r5:t1:30",30,{respect:1},{afterResponse:photoWine}),
    c("aberta","Meu deus, eu vi agora. Você realmente fez isso?","Fui comprar um pra mim e acabei por levar dois, ai pensei, por que não?","helio:r5:t1:100",100,{intimacy:1},{afterResponse:photoWine}),
  ],followUps:[
    {id:"helio:r5:t2",incoming:"",choices:[
      c("base","Nunca experimentei um vinho dessa marca, vai ser a primeira vez, agradeço muito, te compenso depois por isso….","Compensar como?","helio:r5:t2:50",50,{trust:1}),
      c("profissional","Nunca bebi um vinho dessa marca. Você não precisava ter feito isso, agradeço muito. Depois eu compenso…","Compensar como?","helio:r5:t2:30",30,{respect:1}),
      c("aberta","Vai ser minha primeira vez experimentando um vinho desses. Agradeço muito mesmo, agora vou ter que encontrar um jeito de te compensar…","Compensar como?","helio:r5:t2:100",100,{intimacy:1,attraction:1}),
    ]},
    {id:"helio:r5:t3",incoming:"",choices:[
      c("base","Se um dia precisar de alguém para dividir um vinho, pode me chamar, tá?","Ah sim, com certeza, gosto bastante de vinho, talvez logo logo eu precise de companhia, beber no meio da semana é complicado.","helio:r5:t3:50",50,{trust:1,intimacy:1}),
      c("profissional","Bom… se estiver procurando companhia para abrir um vinho desses algum dia, pode me chamar.","Ah sim, com certeza, gosto bastante de vinho, talvez logo logo eu precise de companhia, beber no meio da semana é complicado.","helio:r5:t3:30",30,{trust:1}),
      c("aberta","Posso começar oferecendo companhia. Quando quiser dividir uma garrafa de vinho, sabe quem chamar.","Ah sim, com certeza, gosto bastante de vinho, talvez logo logo eu precise de companhia, beber no meio da semana é complicado.","helio:r5:t3:100",100,{intimacy:1,attraction:2}),
    ]},
    {id:"helio:r5:t4",incoming:"",choices:[
      c("base","Entendo, tem que manter a forma né? Acho mais fácil o vinho perder a forma do que você, seus braços são grandes demais para se preocupar com isso.","Vish não sabia que você andava prestando atenção neles…","helio:r5:t4:50",50,{intimacy:1,attraction:1}),
      c("profissional","Faz sentido, tem que manter a forma né? Apesar de que olhando para você acho difícil uma taça de vinho causar algum problema kkkk.","Vish não sabia que você andava prestando atenção neles…","helio:r5:t4:30",30,{respect:1}),
      c("aberta","Justo, não pode atrapalhar os treinos. Mas sinceramente acho que você está bem longe de precisar se preocupar com a forma.","Vish não sabia que você andava prestando atenção neles…","helio:r5:t4:100",100,{intimacy:1,attraction:2}),
    ]},
    {id:"helio:r5:t5",incoming:"",choices:[
      c("base","Presto atenção em muitas coisas, te conto mais sobre isso outro dia… Até amanhã!","Fico no aguardo então, até amanhã!","helio:r5:t5:50",50,{intimacy:1,attraction:1}),
      c("profissional","Talvez eu tenha reparado em uma coisa ou outra… O resto eu deixo para te contar outro dia. Até amanhã!","Fico no aguardo então, até amanhã!","helio:r5:t5:30",30,{trust:1}),
      c("aberta","Digamos que meus olhos funcionam muito bem kkkk. Mas essa conversa fica para outro dia… Até amanhã!","Fico no aguardo então, até amanhã!","helio:r5:t5:100",100,{intimacy:1,attraction:2}),
    ]},
  ]
};

const day6: DialogueScene = {
  day:6,id:"placeholder-dia6-helio",characterId:"helio",speaker:"Hélio",timeLabel:"19:36 · NEXO",opening:"Chegou em casa?",availability:{minDay:6,maxDay:6},completionFlag:"scene:placeholder-dia6-helio:complete",
  choices:[
    c("base","Cheguei sim e você?","Também, acabei de sair do banho","helio:r6:t1:50",50,{trust:1},{afterResponse:photoShower}),
    c("profissional","Cheguei agora pouco. E você, já chegou?","Também, acabei de sair do banho","helio:r6:t1:30",30,{trust:1},{afterResponse:photoShower}),
    c("aberta","Sim, finalmente em casa kkkk. E você?","Também, acabei de sair do banho","helio:r6:t1:100",100,{intimacy:1,attraction:1},{afterResponse:photoShower}),
  ],followUps:[
    {id:"helio:r6:t2",incoming:"",choices:[
      c("base","Preciso muito descansar um pouco, sorte que essa semana já acabou.","Também preciso… Inclusive, posso estar cobrando aquela companhia para um vinho?","helio:r6:t2:50",50,{trust:1}),
      c("profissional","Nossa, eu também preciso descansar bastante. Ainda bem que finalmente acabou a semana.","Também preciso… Inclusive, posso estar cobrando aquela companhia para um vinho?","helio:r6:t2:30",30,{respect:1}),
      c("aberta","Nem me fala, estou precisando muito descansar. Pelo menos sobrevivemos à semana kkkk.","Também preciso… Inclusive, posso estar cobrando aquela companhia para um vinho?","helio:r6:t2:100",100,{intimacy:1,attraction:2}),
    ]},
    {id:"helio:r6:t3",incoming:"",choices:[
      c("base","Com toda certeza!","Então se arruma que eu vou passar ai pra te buscar.","helio:r6:t3:50",50,{trust:1,intimacy:1}),
      c("profissional","Claro, eu disse que podia cobrar kkkk.","Então se arruma que eu vou passar ai pra te buscar.","helio:r6:t3:30",30,{trust:1}),
      c("aberta","Com certeza. Estava esperando você cobrar, inclusive.","Então se arruma que eu vou passar ai pra te buscar.","helio:r6:t3:100",100,{intimacy:1,attraction:2}),
    ]},
    {id:"helio:r6:t4",incoming:"",choices:[
      c("base","Já estou me arrumando.","Chegando então.","helio:r6:outing:50",50,{trust:1,intimacy:1},{exclusiveOutingDay:6,vnSceneId:"outing-day6-helio"}),
      c("profissional","Beleza, vou me arrumar então. Me avisa quando estiver chegando.","Chegando então.","helio:r6:outing:30",30,{trust:1},{exclusiveOutingDay:6,vnSceneId:"outing-day6-helio"}),
      c("aberta","Fechado, já vou começar a me arrumar.","Chegando então.","helio:r6:outing:100",100,{intimacy:1,attraction:2},{exclusiveOutingDay:6,vnSceneId:"outing-day6-helio"}),
    ]},
  ]
};

export const helioPostShiftScenes: DialogueScene[] = [day1, day2, day3, day4, day5, day6];
export const helioPostShift = day1;
