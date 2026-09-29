import type { DialogueScene } from "@/game/types";
export const demetriaPostShift: DialogueScene = {
  placeholder:true,
  day:1, id:"dia1-demetria-pos-expediente", characterId:"demetria", speaker:"Demétria", timeLabel:"19:24 · NEXO",
  opening:"Primeiro dia terminado. Sobreviveu à Central?",
  contextLines:{ whenHeroWasDispatched:"Demétria encerrou a operação e foi direta para a conversa.", whenHeroWasNotDispatched:"Demétria ficou disponível por parte do turno e acompanhou as decisões de longe." },
  availability:{minDay:1,maxDay:1}, completionFlag:"scene:dia1-demetria-pos-expediente:complete",
  choices:[
    {id:"sobrevivi",text:"Por pouco, mas sobrevivi.",response:"Ótimo. Amanhã a cidade tenta de novo.",delta:{trust:1},romanceAffinity:30,flag:"dia1_dem_sobrevivi"},
    {id:"equipe",text:"Ficou mais fácil quando entendi melhor vocês.",response:"Continua observando. Saber quem mandar é metade do trabalho.",delta:{respect:1,trust:1},romanceAffinity:50,flag:"dia1_dem_equipe"},
    {id:"convite",text:"Pergunta de novo quando estivermos fora do expediente de verdade.",response:"Isso foi um convite? Vou guardar para cobrar depois.",delta:{attraction:1,intimacy:1},romanceAffinity:100,flag:"dia1_dem_convite"},
  ],
  followUps:[
    { id:"placeholder-dia1-demetria-t2", incoming:"[PLACEHOLDER] Demétria manda outra mensagem dizendo que o primeiro turno sempre revela mais sobre a equipe do que qualquer ficha.", choices:[
      { id:"aberta", text:"Quero entender melhor vocês antes de achar que já sei como tudo funciona.", response:"[PLACEHOLDER] Então continua perguntando. É melhor do que fingir certeza.", delta:{trust:1}, romanceAffinity:50, flag:"placeholder-dia1-demetria-t2:50" },
      { id:"proxima", text:"Acho que ainda tem muita coisa interessante para descobrir por aqui.", response:"[PLACEHOLDER] Isso soou quase como entusiasmo. Vou considerar um bom sinal.", delta:{intimacy:1,attraction:1}, romanceAffinity:100, flag:"placeholder-dia1-demetria-t2:100" },
      { id:"profissional", text:"Por enquanto quero só aprender a fazer o trabalho direito.", response:"[PLACEHOLDER] Justo. Um passo de cada vez também funciona.", delta:{respect:1}, romanceAffinity:30, flag:"placeholder-dia1-demetria-t2:30" },
    ]},
    { id:"placeholder-dia1-demetria-t2-t3", incoming:"[PLACEHOLDER] A conversa se estende por mais alguns minutos antes de vocês se despedirem por hoje.", choices:[
      { id:"continuar", text:"Gostei de conversar. Amanhã a gente continua.", response:"[PLACEHOLDER] Combinado. Amanhã eu apareço por aqui de novo.", delta:{trust:1,intimacy:1}, romanceAffinity:50, flag:"placeholder-dia1-demetria-t2:t3:50" },
      { id:"pessoal", text:"Vou cobrar essa continuação. Não some.", response:"[PLACEHOLDER] Agora eu realmente vou ter que aparecer. Boa noite.", delta:{attraction:1}, romanceAffinity:100, flag:"placeholder-dia1-demetria-t2:t3:100" },
      { id:"encerrar", text:"Boa noite. A gente se fala amanhã.", response:"[PLACEHOLDER] Boa noite. Descansa enquanto ainda dá tempo.", delta:{respect:1}, romanceAffinity:30, flag:"placeholder-dia1-demetria-t2:t3:30" },
    ]},
  ]
};
