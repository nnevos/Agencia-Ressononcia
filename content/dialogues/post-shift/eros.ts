import type { DialogueChoice, DialogueMessage, DialogueScene } from "@/game/types";

function c(
  id:string,
  text:string,
  response:string,
  flag:string,
  romanceAffinity:100|50|30,
  delta:DialogueChoice["delta"],
  extras:Partial<DialogueChoice>={}
):DialogueChoice {
  return { id, text, response, flag, romanceAffinity, delta, ...extras };
}

function standardChoices(
  prefix:string,
  base:string,
  alternativa:string,
  aberta:string,
  response:string,
  extras:Partial<DialogueChoice>={}
):DialogueChoice[] {
  return [
    c("base", base, response, `${prefix}:50`, 50, {trust:1}, extras),
    c("alternativa", alternativa, response, `${prefix}:30`, 30, {respect:1}, extras),
    c("aberta", aberta, response, `${prefix}:100`, 100, {intimacy:1}, extras),
  ];
}

const photo1: DialogueMessage[] = [{ direction:"incoming", image:"/nexo/eros/chat-1.jpg", imageAlt:"Foto enviada por Eros antes do primeiro encontro." }];
const photo2: DialogueMessage[] = [{ direction:"incoming", image:"/nexo/eros/chat-2.jpg", imageAlt:"Foto enviada por Eros no chat." }];
const photo3: DialogueMessage[] = [{ direction:"incoming", image:"/nexo/eros/chat-3.jpg", imageAlt:"Foto enviada por Eros saindo de casa." }];

const day1: DialogueScene = {
  day:1,id:"dia1-eros-pos-expediente",characterId:"eros",speaker:"Eros",timeLabel:"19:38 · NEXO",
  openingOutgoing:"Boa tarde! Sou {{playerName}}, comecei hoje como Analista.",opening:"Boa tarde! Vi mesmo que tinha alguem começando hoje, prazer em te conhecer.",
  availability:{minDay:1,maxDay:1},completionFlag:"scene:dia1-eros-pos-expediente:complete",
  choices:standardChoices(
    "eros:r1:t1",
    "Então estou juntando informações de todo mundo, poderia me ajudar?",
    "Estou juntando algumas informações sobre todo mundo. Pode me ajudar?",
    "Quero conhecer melhor o pessoal da equipe. Me conta um pouco sobre você?",
    "Claro, eu sou tipo um ventilador, eu faço ventos, coisas voarem, ar e coisas do tipo, entende?"
  ),
  followUps:[
    {id:"eros:r1:t2",incoming:"",choices:standardChoices(
      "eros:r1:t2",
      "Por que não ar condicionado?",
      "Então é mais ventilador do que ar condicionado?",
      "Tá, mas por que não ar condicionado? kkkkk",
      "Aí mexe com temperatura né, não é minha praia, talvez com o Yuki ou com Hélio ai da para fazer esse combo mas eu só faço vento mesmo na temperatura que estiver kkkk"
    )},
    {id:"eros:r1:t3",incoming:"",choices:standardChoices(
      "eros:r1:t3",
      "Entendi, agradeço muito vai ajudar bastante kkkkk",
      "Entendi kkkkk, valeu, isso vai ajudar bastante.",
      "Kkkkk agora ficou claro. Obrigado, vai ajudar bastante.",
      ""
    )},
  ],
};

const day2: DialogueScene = {
  day:2,id:"dia2-eros-pos-expediente",characterId:"eros",speaker:"Eros",timeLabel:"19:18 · NEXO",
  openingOutgoing:"Boa tarde, você se atrasou hoje, poderia saber o motivo?",opening:"Foi mal, tive um problema ali saindo de casa, sabe como é né",
  availability:{minDay:2,maxDay:2},completionFlag:"scene:dia2-eros-pos-expediente:complete",
  choices:standardChoices(
    "eros:r2:t1",
    "Espero ter certeza que isso não vai acontecer de novo, estamos entendidos?",
    "Tudo bem, mas preciso ter certeza de que isso não vai se repetir. Estamos entendidos?",
    "Imprevistos acontecem, mas preciso poder contar com você no horário. Combinado?",
    "Sim claro, peço desculpas, as vezes acontece mas vou tentar ao máximo chegar nos horários, ok?"
  ),
  followUps:[
    {id:"eros:r2:t2",incoming:"",choices:standardChoices(
      "eros:r2:t2",
      "Que bom que nos entendemos.",
      "Certo, então estamos entendidos.",
      "Beleza, era isso que eu precisava saber.",
      "Com certeza, mas você precisa maneirar sabe, relaxar um pouco…"
    )},
    {id:"eros:r2:t3",incoming:"",choices:standardChoices(
      "eros:r2:t3",
      "Eu faço isso, mas não quando envolve a vida de outras pessoas né.",
      "Eu relaxo, só não quando outras pessoas dependem da gente.",
      "Eu sei relaxar kkkkk, mas no trabalho tem vida de outras pessoas envolvida.",
      "Justo. Se quiser relaxar ou coisa assim me chama tlgd a gente inventa algo."
    )},
    {id:"eros:r2:t4",incoming:"",choices:standardChoices(
      "eros:r2:t4",
      "Beleza pode deixar, tenho que terminar os relatórios, tchau.",
      "Pode deixar. Agora tenho que terminar os relatórios, até amanhã.",
      "Kkkkk vou lembrar disso. Tenho que fechar os relatórios agora, tchau.",
      ""
    )},
  ],
};

const day3: DialogueScene = {
  day:3,id:"dia3-eros-pos-expediente",characterId:"eros",speaker:"Eros",timeLabel:"19:26 · NEXO",opening:"Ei ta afim de fazer alguma coisa?",
  availability:{minDay:3,maxDay:3},completionFlag:"scene:dia3-eros-pos-expediente:complete",
  choices:standardChoices(
    "eros:r3:t1",
    "Como assim?",
    "Fazer o que?",
    "Assim do nada? O que você tá pensando?",
    "Alguma coisa pô, tava pensando em sair e pensei em te chamar."
  ),
  followUps:[
    {id:"eros:r3:t2",incoming:"",choices:standardChoices(
      "eros:r3:t2",
      "Mas para fazer o que?",
      "E qual seria o plano?",
      "Você me chamou antes de decidir o que a gente vai fazer? kkkkk",
      "A gente arranja alguma coisa, estou de moto, a gente pode passear e a gente decide no caminho."
    )},
    {id:"eros:r3:t3",incoming:"",choices:standardChoices(
      "eros:r3:t3",
      "Assim do nada?",
      "Então o plano é não ter plano?",
      "Você realmente quer só sair por aí e decidir no caminho?",
      "Sim?"
    )},
    {id:"eros:r3:t4",incoming:"",choices:[
      c("base","É surpreendente a ousadia, mas ta bom acho que podemos fazer alguma coisa","Vamos ser uma experiência.\nJá passo aí pra te pegar.","eros:r3:t4:outing",100,{intimacy:1,attraction:2},{exclusiveOutingDay:3,vnSceneId:"outing-day3-eros",afterResponse:photo1}),
      c("alternativa","Kkkkk você realmente não planejou nada. Tá bom, eu topo.","Vamos ser uma experiência.\nJá passo aí pra te pegar.","eros:r3:t4:50",50,{trust:1,intimacy:1},{exclusiveOutingDay:3,vnSceneId:"outing-day3-eros",afterResponse:photo1}),
      c("aberta","Isso parece uma ideia bem espontânea... bora.","Vamos ser uma experiência.\nJá passo aí pra te pegar.","eros:r3:t4:30",30,{respect:1,trust:1},{exclusiveOutingDay:3,vnSceneId:"outing-day3-eros",afterResponse:photo1}),
    ]},
  ],
};

const day4: DialogueScene = {
  day:4,id:"dia4-eros-pos-expediente",characterId:"eros",speaker:"Eros",timeLabel:"19:11 · NEXO",opening:"Oii, como você ta?",
  availability:{minDay:4,maxDay:4},completionFlag:"scene:dia4-eros-pos-expediente:complete",
  choices:standardChoices(
    "eros:r4:t1",
    "Bem e você?",
    "Tô bem, e você?",
    "Tudo tranquilo por aqui. E contigo?",
    "Bem bem, acho que a sincronia hoje do time foi muito daora, graças a você né."
  ),
  followUps:[
    {id:"eros:r4:t2",incoming:"",choices:standardChoices(
      "eros:r4:t2",
      "Agradeço, que isso, vocês fazem a maior parte do trabalho.",
      "Valeu, mas vocês fazem a parte mais difícil.",
      "Obrigado, mas eu só tento organizar daqui. Vocês que fazem acontecer.",
      "Os dois âmbitos são importantes tlgd"
    )},
    {id:"eros:r4:t3",incoming:"",choices:standardChoices(
      "eros:r4:t3",
      "Sim sim.",
      "Justo.",
      "Verdade, um depende do outro.",
      "",
      {afterResponse:photo2}
    )},
    {id:"eros:r4:t4",incoming:"Se liga que bolo feio kkkkkkk",choices:standardChoices(
      "eros:r4:t4",
      "Kkkkk que coisa tenebrosa",
      "Kkkkk meu deus, que bolo é esse?",
      "Kkkkk isso aí foi feito com raiva, só pode.",
      "Ja estou atrasado pra um compromisso tenho que ir, abraço!"
    )},
    {id:"eros:r4:t5",incoming:"",choices:standardChoices(
      "eros:r4:t5",
      "Abraço!",
      "Abraço, até amanhã!",
      "Vai lá kkkkk, abraço!",
      ""
    )},
  ],
};

const day5: DialogueScene = {
  day:5,id:"dia5-eros-pos-expediente",characterId:"eros",speaker:"Eros",timeLabel:"20:03 · NEXO",opening:"Ai {{playerForm:bonito|bonita|bonite}}!",
  availability:{minDay:5,maxDay:5},completionFlag:"scene:dia5-eros-pos-expediente:complete",
  choices:standardChoices(
    "eros:r5:t1",
    "Oii, eu?",
    "Eu?",
    "Essa foi pra mim? kkkkk",
    "Claro pó, deixei um presente pra você, achei bonito e pensei que combinava contigo."
  ),
  followUps:[
    {id:"eros:r5:t2",incoming:"",choices:standardChoices(
      "eros:r5:t2",
      "Meu deus.",
      "Pera, você deixou um presente pra mim?",
      "Eros... o que você aprontou? kkkkk",
      "É uma jaqueta pra andar de moto, vai que você pega paixão que nem eu sabe, a gente pode sair junto dai."
    )},
    {id:"eros:r5:t3",incoming:"",choices:standardChoices(
      "eros:r5:t3",
      "Eu amei, valeu muito!",
      "Nossa, eu gostei muito. Valeu mesmo!",
      "Você não precisava fazer isso... mas eu amei, obrigado!",
      "Nada, vai ficar mais {{playerForm:bonito|bonita|bonite}} ainda vestindo ela."
    )},
    {id:"eros:r5:t4",incoming:"",choices:[
      c("base","Pelo menos diferente de você vou usar uma camisa por baixo kkkk","Qual é kkkk","eros:r5:t4:50",100,{intimacy:1,attraction:1}),
      c("alternativa","Kkkkk valeu. Só vou usar com uma camisa por baixo, ao contrário de alguém.","Qual é kkkk","eros:r5:t4:30",30,{respect:1,attraction:1}),
      c("aberta","Vai ficar bonita mesmo, principalmente porque eu pretendo usar camisa por baixo kkkkk","Qual é kkkk","eros:r5:t4:100",50,{trust:1,intimacy:1}),
    ]},
  ],
};

const day6: DialogueScene = {
  day:6,id:"dia6-eros-pos-expediente",characterId:"eros",speaker:"Eros",timeLabel:"19:34 · NEXO",opening:"Vai fazer alguma coisa hoje?",
  availability:{minDay:6,maxDay:6},completionFlag:"scene:dia6-eros-pos-expediente:complete",
  choices:standardChoices(
    "eros:r6:t1",
    "Pior que nem vou, quer fazer alguma coisa?",
    "Hoje eu tô livre. Quer fazer alguma coisa?",
    "Não tenho nada planejado. Já tá inventando outro rolê?",
    "Sim sim vamos vamos"
  ),
  followUps:[
    {id:"eros:r6:t2",incoming:"",choices:standardChoices(
      "eros:r6:t2",
      "Pior que aquela feira que a gente foi da ultima vez ta rolando, tem uma lojinha que queria ir.",
      "Aquela feira da outra vez tá rolando de novo. Tem uma lojinha que eu queria ir.",
      "Podemos voltar naquela feira? Fiquei querendo passar em uma lojinha de lá.",
      "Claro vamos pra la denovo."
    )},
    {id:"eros:r6:t3",incoming:"",choices:[
      c("base","Beleza vou me arrumar. Usar a jaqueta que você me deu.","Beleza vou me arrumar também.\nSaindo de Casa.","eros:r6:t3:outing",100,{intimacy:2,attraction:2},{exclusiveOutingDay:6,vnSceneId:"outing-day6-eros",afterResponse:photo3}),
      c("alternativa","Fechado, vou me arrumar. Acho que já sei qual jaqueta usar.","Beleza vou me arrumar também.\nSaindo de Casa.","eros:r6:t3:50",50,{trust:1,intimacy:1},{exclusiveOutingDay:6,vnSceneId:"outing-day6-eros",afterResponse:photo3}),
      c("aberta","Tá combinado. Vou estrear direito a jaqueta que você me deu.","Beleza vou me arrumar também.\nSaindo de Casa.","eros:r6:t3:30",30,{respect:1,trust:1},{exclusiveOutingDay:6,vnSceneId:"outing-day6-eros",afterResponse:photo3}),
    ]},
  ],
};

export const erosPostShiftScenes: DialogueScene[] = [day1,day2,day3,day4,day5,day6];
