import type { DialogueScene } from "@/game/types";
export const lysandroPostShift: DialogueScene = {
  placeholder:true,
  day:1, id:"dia1-lysandro-pos-expediente", characterId:"lysandro", speaker:"Lysandro", timeLabel:"19:11 · NEXO",
  opening:"Fim do turno e você ainda está online. Isso é disciplina ou falta do que fazer?",
  contextLines:{ whenHeroWasDispatched:"Lysandro voltou há pouco e parece disposto a conversar apesar do desgaste.", whenHeroWasNotDispatched:"Lysandro passou boa parte do turno na reserva e claramente notou isso." },
  availability:{minDay:1,maxDay:1}, completionFlag:"scene:dia1-lysandro-pos-expediente:complete",
  choices:[
    {id:"disciplina",text:"Disciplina. Alguém precisa manter isso de pé.",response:"Boa resposta. Só não vira prisioneiro da própria mesa.",delta:{respect:1},romanceAffinity:30,flag:"dia1_lys_disciplina"},
    {id:"provocar",text:"Talvez eu estivesse esperando você mandar mensagem.",response:"Olha só. O Analista também sabe jogar sem mapa.",delta:{attraction:1,tension:1},romanceAffinity:100,flag:"dia1_lys_provocar"},
    {id:"livre",text:"Acabou o expediente. Agora cada um faz o que quiser.",response:"Finalmente alguém falando a minha língua.",delta:{trust:1,intimacy:1},romanceAffinity:50,flag:"dia1_lys_livre"},
  ],
  followUps:[
    { id:"placeholder-dia1-lysandro-t2", incoming:"[PLACEHOLDER] Lysandro reaparece no chat e pergunta se você já escolheu quem parece mais difícil de despachar.", choices:[
      { id:"aberta", text:"Quero entender melhor vocês antes de achar que já sei como tudo funciona.", response:"[PLACEHOLDER] Então continua perguntando. É melhor do que fingir certeza.", delta:{trust:1}, romanceAffinity:50, flag:"placeholder-dia1-lysandro-t2:50" },
      { id:"proxima", text:"Acho que ainda tem muita coisa interessante para descobrir por aqui.", response:"[PLACEHOLDER] Isso soou quase como entusiasmo. Vou considerar um bom sinal.", delta:{intimacy:1,attraction:1}, romanceAffinity:100, flag:"placeholder-dia1-lysandro-t2:100" },
      { id:"profissional", text:"Por enquanto quero só aprender a fazer o trabalho direito.", response:"[PLACEHOLDER] Justo. Um passo de cada vez também funciona.", delta:{respect:1}, romanceAffinity:30, flag:"placeholder-dia1-lysandro-t2:30" },
    ]},
    { id:"placeholder-dia1-lysandro-t2-t3", incoming:"[PLACEHOLDER] A conversa se estende por mais alguns minutos antes de vocês se despedirem por hoje.", choices:[
      { id:"continuar", text:"Gostei de conversar. Amanhã a gente continua.", response:"[PLACEHOLDER] Combinado. Amanhã eu apareço por aqui de novo.", delta:{trust:1,intimacy:1}, romanceAffinity:50, flag:"placeholder-dia1-lysandro-t2:t3:50" },
      { id:"pessoal", text:"Vou cobrar essa continuação. Não some.", response:"[PLACEHOLDER] Agora eu realmente vou ter que aparecer. Boa noite.", delta:{attraction:1}, romanceAffinity:100, flag:"placeholder-dia1-lysandro-t2:t3:100" },
      { id:"encerrar", text:"Boa noite. A gente se fala amanhã.", response:"[PLACEHOLDER] Boa noite. Descansa enquanto ainda dá tempo.", delta:{respect:1}, romanceAffinity:30, flag:"placeholder-dia1-lysandro-t2:t3:30" },
    ]},
  ]
};
