import type { DialogueScene } from "@/game/types";
export const erosPostShift: DialogueScene = {
  placeholder:true,
  day:1, id:"dia1-eros-pos-expediente", characterId:"eros", speaker:"Eros", timeLabel:"19:38 · NEXO",
  opening:"O canal ficou silencioso rápido. Você vai mesmo deixar a noite acabar assim?",
  contextLines:{ whenHeroWasDispatched:"Eros voltou do campo e parece ainda ter energia para conversar.", whenHeroWasNotDispatched:"Eros passou parte do turno disponível e parece ter usado o tempo para observar o novo Analista." },
  availability:{minDay:1,maxDay:1}, completionFlag:"scene:dia1-eros-pos-expediente:complete",
  choices:[
    {id:"silencio",text:"Depois de dez horas de alertas, silêncio parece ótimo.",response:"Justo. Mas silêncio compartilhado é melhor do que silêncio sozinho.",delta:{intimacy:1},romanceAffinity:50,flag:"dia1_eros_silencio"},
    {id:"amanha",text:"Estou guardando energia para amanhã.",response:"Boa estratégia. Só não esquece que descanso também conta como vida.",delta:{trust:1},romanceAffinity:30,flag:"dia1_eros_amanha"},
    {id:"continuar",text:"Depende. Você tem assunto melhor que os relatórios?",response:"Tenho vários. Só precisava saber se você ia responder.",delta:{attraction:1,trust:1},romanceAffinity:100,flag:"dia1_eros_continuar"},
  ],
  followUps:[
    { id:"placeholder-dia1-eros-t2", incoming:"[PLACEHOLDER] Eros manda mais uma mensagem, agora perguntando se você pretende aprender a rotina ou improvisar até ela fazer sentido.", choices:[
      { id:"aberta", text:"Quero entender melhor vocês antes de achar que já sei como tudo funciona.", response:"[PLACEHOLDER] Então continua perguntando. É melhor do que fingir certeza.", delta:{trust:1}, romanceAffinity:50, flag:"placeholder-dia1-eros-t2:50" },
      { id:"proxima", text:"Acho que ainda tem muita coisa interessante para descobrir por aqui.", response:"[PLACEHOLDER] Isso soou quase como entusiasmo. Vou considerar um bom sinal.", delta:{intimacy:1,attraction:1}, romanceAffinity:100, flag:"placeholder-dia1-eros-t2:100" },
      { id:"profissional", text:"Por enquanto quero só aprender a fazer o trabalho direito.", response:"[PLACEHOLDER] Justo. Um passo de cada vez também funciona.", delta:{respect:1}, romanceAffinity:30, flag:"placeholder-dia1-eros-t2:30" },
    ]},
    { id:"placeholder-dia1-eros-t2-t3", incoming:"[PLACEHOLDER] A conversa se estende por mais alguns minutos antes de vocês se despedirem por hoje.", choices:[
      { id:"continuar", text:"Gostei de conversar. Amanhã a gente continua.", response:"[PLACEHOLDER] Combinado. Amanhã eu apareço por aqui de novo.", delta:{trust:1,intimacy:1}, romanceAffinity:50, flag:"placeholder-dia1-eros-t2:t3:50" },
      { id:"pessoal", text:"Vou cobrar essa continuação. Não some.", response:"[PLACEHOLDER] Agora eu realmente vou ter que aparecer. Boa noite.", delta:{attraction:1}, romanceAffinity:100, flag:"placeholder-dia1-eros-t2:t3:100" },
      { id:"encerrar", text:"Boa noite. A gente se fala amanhã.", response:"[PLACEHOLDER] Boa noite. Descansa enquanto ainda dá tempo.", delta:{respect:1}, romanceAffinity:30, flag:"placeholder-dia1-eros-t2:t3:30" },
    ]},
  ]
};
