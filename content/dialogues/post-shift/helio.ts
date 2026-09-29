import type { DialogueScene } from "@/game/types";
export const helioPostShift: DialogueScene = {
  id:"dia1-helio-pos-expediente", characterId:"helio", speaker:"Hélio", timeLabel:"19:18 · NEXO",
  opening:"Você costuma revisar cada decisão depois do turno ou hoje foi uma exceção?",
  contextLines:{ whenHeroWasDispatched:"Hélio ficou offline durante alguns minutos antes de procurar o Analista.", whenHeroWasNotDispatched:"Hélio não saiu a campo e parece estar avaliando como o Analista distribuiu a equipe." },
  availability:{minDay:1}, completionFlag:"scene:dia1-helio-pos-expediente:complete",
  choices:[
    {id:"revisar",text:"Reviso. Quero saber onde eu poderia ter decidido melhor.",response:"Então pelo menos você não trata despacho como aposta.",delta:{respect:2},flag:"dia1_helio_revisar"},
    {id:"confiar",text:"Também preciso confiar em vocês depois que saem daqui.",response:"Isso é mais difícil do que parece. Mas é necessário.",delta:{trust:1},flag:"dia1_helio_confiar"},
    {id:"pessoal",text:"Hoje eu queria saber como você está, não como foi a missão.",response:"...Essa pergunta eu não esperava.",delta:{intimacy:1,attraction:1},flag:"dia1_helio_pessoal"},
  ]
};
