import type { DialogueScene } from "@/game/types";
export const helioPostShift: DialogueScene = {
  placeholder:true,
  day:1, id:"dia1-helio-pos-expediente", characterId:"helio", speaker:"Hélio", timeLabel:"19:18 · NEXO",
  opening:"Você costuma revisar cada decisão depois do turno ou hoje foi uma exceção?",
  contextLines:{ whenHeroWasDispatched:"Hélio ficou offline durante alguns minutos antes de procurar o Analista.", whenHeroWasNotDispatched:"Hélio não saiu a campo e parece estar avaliando como o Analista distribuiu a equipe." },
  availability:{minDay:1,maxDay:1}, completionFlag:"scene:dia1-helio-pos-expediente:complete",
  choices:[
    {id:"revisar",text:"Reviso. Quero saber onde eu poderia ter decidido melhor.",response:"Então pelo menos você não trata despacho como aposta.",delta:{respect:2},romanceAffinity:30,flag:"dia1_helio_revisar"},
    {id:"confiar",text:"Também preciso confiar em vocês depois que saem daqui.",response:"Isso é mais difícil do que parece. Mas é necessário.",delta:{trust:1},romanceAffinity:50,flag:"dia1_helio_confiar"},
    {id:"pessoal",text:"Hoje eu queria saber como você está, não como foi a missão.",response:"...Essa pergunta eu não esperava.",delta:{intimacy:1,attraction:1},romanceAffinity:100,flag:"dia1_helio_pessoal"},
  ],
  followUps:[
    { id:"placeholder-dia1-helio-t2", incoming:"[PLACEHOLDER] Hélio volta à conversa e pergunta qual decisão do turno você repetiria sem mudar nada.", choices:[
      { id:"aberta", text:"Quero entender melhor vocês antes de achar que já sei como tudo funciona.", response:"[PLACEHOLDER] Então continua perguntando. É melhor do que fingir certeza.", delta:{trust:1}, romanceAffinity:50, flag:"placeholder-dia1-helio-t2:50" },
      { id:"proxima", text:"Acho que ainda tem muita coisa interessante para descobrir por aqui.", response:"[PLACEHOLDER] Isso soou quase como entusiasmo. Vou considerar um bom sinal.", delta:{intimacy:1,attraction:1}, romanceAffinity:100, flag:"placeholder-dia1-helio-t2:100" },
      { id:"profissional", text:"Por enquanto quero só aprender a fazer o trabalho direito.", response:"[PLACEHOLDER] Justo. Um passo de cada vez também funciona.", delta:{respect:1}, romanceAffinity:30, flag:"placeholder-dia1-helio-t2:30" },
    ]},
    { id:"placeholder-dia1-helio-t2-t3", incoming:"[PLACEHOLDER] A conversa se estende por mais alguns minutos antes de vocês se despedirem por hoje.", choices:[
      { id:"continuar", text:"Gostei de conversar. Amanhã a gente continua.", response:"[PLACEHOLDER] Combinado. Amanhã eu apareço por aqui de novo.", delta:{trust:1,intimacy:1}, romanceAffinity:50, flag:"placeholder-dia1-helio-t2:t3:50" },
      { id:"pessoal", text:"Vou cobrar essa continuação. Não some.", response:"[PLACEHOLDER] Agora eu realmente vou ter que aparecer. Boa noite.", delta:{attraction:1}, romanceAffinity:100, flag:"placeholder-dia1-helio-t2:t3:100" },
      { id:"encerrar", text:"Boa noite. A gente se fala amanhã.", response:"[PLACEHOLDER] Boa noite. Descansa enquanto ainda dá tempo.", delta:{respect:1}, romanceAffinity:30, flag:"placeholder-dia1-helio-t2:t3:30" },
    ]},
  ]
};
