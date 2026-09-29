import type { DialogueScene } from "@/game/types";
export const alexandraPostShift: DialogueScene = {
  placeholder:true,
  day:1, id:"dia1-alexandra-pos-expediente", characterId:"alexandra", speaker:"Alexandra", timeLabel:"19:31 · NEXO",
  opening:"{{playerName}}, antes de encerrar: alguma decisão de hoje ficou sem resposta para você?",
  contextLines:{ whenHeroWasDispatched:"Alexandra escreveu depois de revisar o próprio relatório.", whenHeroWasNotDispatched:"Alexandra acompanhou o expediente da reserva e parece interessada na lógica das decisões." },
  availability:{minDay:1,maxDay:1}, completionFlag:"scene:dia1-alexandra-pos-expediente:complete",
  choices:[
    {id:"responsabilidade",text:"Ainda estou aprendendo onde termina minha responsabilidade.",response:"Talvez não termine. Mas você pode aprender a carregá-la melhor.",delta:{trust:1,respect:1},romanceAffinity:50,flag:"dia1_alex_responsabilidade"},
    {id:"perguntar",text:"Quero entender como você avalia risco antes de entrar.",response:"Amanhã eu te mostro como faço essa leitura.",delta:{respect:2},romanceAffinity:30,flag:"dia1_alex_perguntar"},
    {id:"pessoal",text:"A pergunta que ficou é se você sempre fala de trabalho a essa hora.",response:"Nem sempre. Só quando ainda não decidi se quero mudar de assunto.",delta:{intimacy:1,attraction:1},romanceAffinity:100,flag:"dia1_alex_pessoal"},
  ],
  followUps:[
    { id:"placeholder-dia1-alexandra-t2", incoming:"[PLACEHOLDER] Antes de sair, Alexandra pergunta se você prefere decidir rápido ou ter mais informação antes de agir.", choices:[
      { id:"aberta", text:"Quero entender melhor vocês antes de achar que já sei como tudo funciona.", response:"[PLACEHOLDER] Então continua perguntando. É melhor do que fingir certeza.", delta:{trust:1}, romanceAffinity:50, flag:"placeholder-dia1-alexandra-t2:50" },
      { id:"proxima", text:"Acho que ainda tem muita coisa interessante para descobrir por aqui.", response:"[PLACEHOLDER] Isso soou quase como entusiasmo. Vou considerar um bom sinal.", delta:{intimacy:1,attraction:1}, romanceAffinity:100, flag:"placeholder-dia1-alexandra-t2:100" },
      { id:"profissional", text:"Por enquanto quero só aprender a fazer o trabalho direito.", response:"[PLACEHOLDER] Justo. Um passo de cada vez também funciona.", delta:{respect:1}, romanceAffinity:30, flag:"placeholder-dia1-alexandra-t2:30" },
    ]},
    { id:"placeholder-dia1-alexandra-t2-t3", incoming:"[PLACEHOLDER] A conversa se estende por mais alguns minutos antes de vocês se despedirem por hoje.", choices:[
      { id:"continuar", text:"Gostei de conversar. Amanhã a gente continua.", response:"[PLACEHOLDER] Combinado. Amanhã eu apareço por aqui de novo.", delta:{trust:1,intimacy:1}, romanceAffinity:50, flag:"placeholder-dia1-alexandra-t2:t3:50" },
      { id:"pessoal", text:"Vou cobrar essa continuação. Não some.", response:"[PLACEHOLDER] Agora eu realmente vou ter que aparecer. Boa noite.", delta:{attraction:1}, romanceAffinity:100, flag:"placeholder-dia1-alexandra-t2:t3:100" },
      { id:"encerrar", text:"Boa noite. A gente se fala amanhã.", response:"[PLACEHOLDER] Boa noite. Descansa enquanto ainda dá tempo.", delta:{respect:1}, romanceAffinity:30, flag:"placeholder-dia1-alexandra-t2:t3:30" },
    ]},
  ]
};
