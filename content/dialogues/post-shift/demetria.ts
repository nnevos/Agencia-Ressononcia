import type { DialogueScene } from "@/game/types";
export const demetriaPostShift: DialogueScene = {
  id:"dia1-demetria-pos-expediente", characterId:"demetria", speaker:"Demétria", timeLabel:"19:24 · NEXO",
  opening:"Primeiro dia terminado. Sobreviveu à Central?",
  contextLines:{ whenHeroWasDispatched:"Demétria encerrou a operação e foi direta para a conversa.", whenHeroWasNotDispatched:"Demétria ficou disponível por parte do turno e acompanhou as decisões de longe." },
  availability:{minDay:1}, completionFlag:"scene:dia1-demetria-pos-expediente:complete",
  choices:[
    {id:"sobrevivi",text:"Por pouco, mas sobrevivi.",response:"Ótimo. Amanhã a cidade tenta de novo.",delta:{trust:1},flag:"dia1_dem_sobrevivi"},
    {id:"equipe",text:"Ficou mais fácil quando entendi melhor vocês.",response:"Continua observando. Saber quem mandar é metade do trabalho.",delta:{respect:1,trust:1},flag:"dia1_dem_equipe"},
    {id:"convite",text:"Pergunta de novo quando estivermos fora do expediente de verdade.",response:"Isso foi um convite? Vou guardar para cobrar depois.",delta:{attraction:1,intimacy:1},flag:"dia1_dem_convite"},
  ]
};
