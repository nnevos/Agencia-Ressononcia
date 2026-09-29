import type { DialogueScene } from "@/game/types";
export const erosPostShift: DialogueScene = {
  id:"dia1-eros-pos-expediente", characterId:"eros", speaker:"Eros", timeLabel:"19:38 · NEXO",
  opening:"O canal ficou silencioso rápido. Você vai mesmo deixar a noite acabar assim?",
  contextLines:{ whenHeroWasDispatched:"Eros voltou do campo e parece ainda ter energia para conversar.", whenHeroWasNotDispatched:"Eros passou parte do turno disponível e parece ter usado o tempo para observar o novo Analista." },
  availability:{minDay:1}, completionFlag:"scene:dia1-eros-pos-expediente:complete",
  choices:[
    {id:"silencio",text:"Depois de dez horas de alertas, silêncio parece ótimo.",response:"Justo. Mas silêncio compartilhado é melhor do que silêncio sozinho.",delta:{intimacy:1},flag:"dia1_eros_silencio"},
    {id:"amanha",text:"Estou guardando energia para amanhã.",response:"Boa estratégia. Só não esquece que descanso também conta como vida.",delta:{trust:1},flag:"dia1_eros_amanha"},
    {id:"continuar",text:"Depende. Você tem assunto melhor que os relatórios?",response:"Tenho vários. Só precisava saber se você ia responder.",delta:{attraction:1,trust:1},flag:"dia1_eros_continuar"},
  ]
};
