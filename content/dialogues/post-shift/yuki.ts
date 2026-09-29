import type { DialogueScene } from "@/game/types";
export const yukiPostShift: DialogueScene = {
  placeholder:true,
  day: 1, id: "dia1-yuki-pos-expediente", characterId: "yuki", speaker: "Yuki", timeLabel: "18:47 · NEXO",
  opening: "{{playerName}}, você ainda está acordado depois daquele turno?",
  contextLines: {
    whenHeroWasDispatched: "Yuki ficou alguns minutos offline depois de voltar da ocorrência. Agora o indicador de digitação aparece no NEXO.",
    whenHeroWasNotDispatched: "Yuki não foi enviado a campo hoje, mas esperou o expediente terminar antes de abrir uma conversa privada no NEXO."
  },
  availability: { minDay: 1, maxDay: 1 }, completionFlag: "scene:dia1-yuki-pos-expediente:complete",
  choices: [
    { id:"preocupado", text:"Estava preocupado com vocês.", response:"Então não finge que não se importa. Eu percebo essas coisas.", delta:{trust:1,intimacy:1}, romanceAffinity:50,flag:"dia1_yuki_preocupacao" },
    { id:"relatorios", text:"Alguém precisa terminar os relatórios.", response:"Claro. Trabalho. Sempre trabalho. Você é consistente, pelo menos.", delta:{respect:1}, romanceAffinity:30,flag:"dia1_yuki_profissional" },
    { id:"provocar", text:"E você veio conferir por quê?", response:"Talvez eu só quisesse saber se você ia responder. Agora eu sei.", delta:{attraction:1,tension:1}, romanceAffinity:100,flag:"dia1_yuki_flerte" },
  ],
  followUps:[
    { id:"placeholder-dia1-yuki-t2", incoming:"[PLACEHOLDER] Yuki continua no chat e pergunta qual parte da função pareceu mais estranha no primeiro dia.", choices:[
      { id:"aberta", text:"Quero entender melhor vocês antes de achar que já sei como tudo funciona.", response:"[PLACEHOLDER] Então continua perguntando. É melhor do que fingir certeza.", delta:{trust:1}, romanceAffinity:50, flag:"placeholder-dia1-yuki-t2:50" },
      { id:"proxima", text:"Acho que ainda tem muita coisa interessante para descobrir por aqui.", response:"[PLACEHOLDER] Isso soou quase como entusiasmo. Vou considerar um bom sinal.", delta:{intimacy:1,attraction:1}, romanceAffinity:100, flag:"placeholder-dia1-yuki-t2:100" },
      { id:"profissional", text:"Por enquanto quero só aprender a fazer o trabalho direito.", response:"[PLACEHOLDER] Justo. Um passo de cada vez também funciona.", delta:{respect:1}, romanceAffinity:30, flag:"placeholder-dia1-yuki-t2:30" },
    ]},
    { id:"placeholder-dia1-yuki-t2-t3", incoming:"[PLACEHOLDER] A conversa se estende por mais alguns minutos antes de vocês se despedirem por hoje.", choices:[
      { id:"continuar", text:"Gostei de conversar. Amanhã a gente continua.", response:"[PLACEHOLDER] Combinado. Amanhã eu apareço por aqui de novo.", delta:{trust:1,intimacy:1}, romanceAffinity:50, flag:"placeholder-dia1-yuki-t2:t3:50" },
      { id:"pessoal", text:"Vou cobrar essa continuação. Não some.", response:"[PLACEHOLDER] Agora eu realmente vou ter que aparecer. Boa noite.", delta:{attraction:1}, romanceAffinity:100, flag:"placeholder-dia1-yuki-t2:t3:100" },
      { id:"encerrar", text:"Boa noite. A gente se fala amanhã.", response:"[PLACEHOLDER] Boa noite. Descansa enquanto ainda dá tempo.", delta:{respect:1}, romanceAffinity:30, flag:"placeholder-dia1-yuki-t2:t3:30" },
    ]},
  ]
};
