import type { DialogueScene } from "@/game/types";
export const elysiaPostShift: DialogueScene = {
  id:"dia1-elysia-pos-expediente", characterId:"elysia", speaker:"Elysia", timeLabel:"19:02 · NEXO",
  opening:"{{playerName}}, estou revisando as anotações do turno. Você percebeu alguma coisa que eu deixei passar?",
  contextLines:{ whenHeroWasDispatched:"Elysia anexou algumas observações da missão antes de abrir a DM.", whenHeroWasNotDispatched:"Mesmo fora de campo, Elysia acompanhou as ocorrências e fez anotações próprias." },
  availability:{minDay:1}, completionFlag:"scene:dia1-elysia-pos-expediente:complete",
  choices:[
    {id:"elogio",text:"Você leu a situação melhor do que eu esperava.",response:"Melhor do que esperava? Vou aceitar a metade que foi elogio.",delta:{respect:1,trust:1},flag:"dia1_elysia_elogio"},
    {id:"tecnico",text:"Quero comparar suas anotações com o relatório amanhã.",response:"Perfeito. Se tiver padrão escondido, a gente encontra.",delta:{respect:2},flag:"dia1_elysia_tecnico"},
    {id:"descanso",text:"Por hoje, fecha isso e descansa um pouco.",response:"...Eu ia dizer que não preciso. Mas talvez você tenha razão.",delta:{intimacy:1,trust:1},flag:"dia1_elysia_descanso"},
  ]
};
