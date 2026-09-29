import type { DialogueScene } from "@/game/types";
export const alexandraPostShift: DialogueScene = {
  id:"dia1-alexandra-pos-expediente", characterId:"alexandra", speaker:"Alexandra", timeLabel:"19:31 · NEXO",
  opening:"{{playerName}}, antes de encerrar: alguma decisão de hoje ficou sem resposta para você?",
  contextLines:{ whenHeroWasDispatched:"Alexandra escreveu depois de revisar o próprio relatório.", whenHeroWasNotDispatched:"Alexandra acompanhou o expediente da reserva e parece interessada na lógica das decisões." },
  availability:{minDay:1}, completionFlag:"scene:dia1-alexandra-pos-expediente:complete",
  choices:[
    {id:"responsabilidade",text:"Ainda estou aprendendo onde termina minha responsabilidade.",response:"Talvez não termine. Mas você pode aprender a carregá-la melhor.",delta:{trust:1,respect:1},flag:"dia1_alex_responsabilidade"},
    {id:"perguntar",text:"Quero entender como você avalia risco antes de entrar.",response:"Amanhã eu te mostro como faço essa leitura.",delta:{respect:2},flag:"dia1_alex_perguntar"},
    {id:"pessoal",text:"A pergunta que ficou é se você sempre fala de trabalho a essa hora.",response:"Nem sempre. Só quando ainda não decidi se quero mudar de assunto.",delta:{intimacy:1,attraction:1},flag:"dia1_alex_pessoal"},
  ]
};
