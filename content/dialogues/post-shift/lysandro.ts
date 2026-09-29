import type { DialogueScene } from "@/game/types";
export const lysandroPostShift: DialogueScene = {
  id:"dia1-lysandro-pos-expediente", characterId:"lysandro", speaker:"Lysandro", timeLabel:"19:11 · NEXO",
  opening:"Fim do turno e você ainda está online. Isso é disciplina ou falta do que fazer?",
  contextLines:{ whenHeroWasDispatched:"Lysandro voltou há pouco e parece disposto a conversar apesar do desgaste.", whenHeroWasNotDispatched:"Lysandro passou boa parte do turno na reserva e claramente notou isso." },
  availability:{minDay:1}, completionFlag:"scene:dia1-lysandro-pos-expediente:complete",
  choices:[
    {id:"disciplina",text:"Disciplina. Alguém precisa manter isso de pé.",response:"Boa resposta. Só não vira prisioneiro da própria mesa.",delta:{respect:1},flag:"dia1_lys_disciplina"},
    {id:"provocar",text:"Talvez eu estivesse esperando você mandar mensagem.",response:"Olha só. O Analista também sabe jogar sem mapa.",delta:{attraction:1,tension:1},flag:"dia1_lys_provocar"},
    {id:"livre",text:"Acabou o expediente. Agora cada um faz o que quiser.",response:"Finalmente alguém falando a minha língua.",delta:{trust:1,intimacy:1},flag:"dia1_lys_livre"},
  ]
};
