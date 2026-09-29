import type { DialogueScene } from "@/game/types";
export const elysiaPostShift: DialogueScene = {
  placeholder:true,
  day:1, id:"dia1-elysia-pos-expediente", characterId:"elysia", speaker:"Elysia", timeLabel:"19:02 · NEXO",
  opening:"{{playerName}}, estou revisando as anotações do turno. Você percebeu alguma coisa que eu deixei passar?",
  contextLines:{ whenHeroWasDispatched:"Elysia anexou algumas observações da missão antes de abrir a DM.", whenHeroWasNotDispatched:"Mesmo fora de campo, Elysia acompanhou as ocorrências e fez anotações próprias." },
  availability:{minDay:1,maxDay:1}, completionFlag:"scene:dia1-elysia-pos-expediente:complete",
  choices:[
    {id:"elogio",text:"Você leu a situação melhor do que eu esperava.",response:"Melhor do que esperava? Vou aceitar a metade que foi elogio.",delta:{respect:1,trust:1},romanceAffinity:50,flag:"dia1_elysia_elogio"},
    {id:"tecnico",text:"Quero comparar suas anotações com o relatório amanhã.",response:"Perfeito. Se tiver padrão escondido, a gente encontra.",delta:{respect:2},romanceAffinity:30,flag:"dia1_elysia_tecnico"},
    {id:"descanso",text:"Por hoje, fecha isso e descansa um pouco.",response:"...Eu ia dizer que não preciso. Mas talvez você tenha razão.",delta:{intimacy:1,trust:1},romanceAffinity:100,flag:"dia1_elysia_descanso"},
  ],
  followUps:[
    { id:"placeholder-dia1-elysia-t2", incoming:"[PLACEHOLDER] Elysia continua online e pergunta o que mais chamou sua atenção no jeito da equipe trabalhar.", choices:[
      { id:"aberta", text:"Quero entender melhor vocês antes de achar que já sei como tudo funciona.", response:"[PLACEHOLDER] Então continua perguntando. É melhor do que fingir certeza.", delta:{trust:1}, romanceAffinity:50, flag:"placeholder-dia1-elysia-t2:50" },
      { id:"proxima", text:"Acho que ainda tem muita coisa interessante para descobrir por aqui.", response:"[PLACEHOLDER] Isso soou quase como entusiasmo. Vou considerar um bom sinal.", delta:{intimacy:1,attraction:1}, romanceAffinity:100, flag:"placeholder-dia1-elysia-t2:100" },
      { id:"profissional", text:"Por enquanto quero só aprender a fazer o trabalho direito.", response:"[PLACEHOLDER] Justo. Um passo de cada vez também funciona.", delta:{respect:1}, romanceAffinity:30, flag:"placeholder-dia1-elysia-t2:30" },
    ]},
    { id:"placeholder-dia1-elysia-t2-t3", incoming:"[PLACEHOLDER] A conversa se estende por mais alguns minutos antes de vocês se despedirem por hoje.", choices:[
      { id:"continuar", text:"Gostei de conversar. Amanhã a gente continua.", response:"[PLACEHOLDER] Combinado. Amanhã eu apareço por aqui de novo.", delta:{trust:1,intimacy:1}, romanceAffinity:50, flag:"placeholder-dia1-elysia-t2:t3:50" },
      { id:"pessoal", text:"Vou cobrar essa continuação. Não some.", response:"[PLACEHOLDER] Agora eu realmente vou ter que aparecer. Boa noite.", delta:{attraction:1}, romanceAffinity:100, flag:"placeholder-dia1-elysia-t2:t3:100" },
      { id:"encerrar", text:"Boa noite. A gente se fala amanhã.", response:"[PLACEHOLDER] Boa noite. Descansa enquanto ainda dá tempo.", delta:{respect:1}, romanceAffinity:30, flag:"placeholder-dia1-elysia-t2:t3:30" },
    ]},
  ]
};
