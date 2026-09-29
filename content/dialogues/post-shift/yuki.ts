import type { DialogueScene } from "@/game/types";
export const yukiPostShift: DialogueScene = {
  id: "dia1-yuki-pos-expediente", characterId: "yuki", speaker: "Yuki", timeLabel: "18:47 · NEXO",
  opening: "{{playerName}}, você ainda está acordado depois daquele turno?",
  contextLines: {
    whenHeroWasDispatched: "Yuki ficou alguns minutos offline depois de voltar da ocorrência. Agora o indicador de digitação aparece no NEXO.",
    whenHeroWasNotDispatched: "Yuki não foi enviado a campo hoje, mas esperou o expediente terminar antes de abrir uma conversa privada no NEXO."
  },
  availability: { minDay: 1 }, completionFlag: "scene:dia1-yuki-pos-expediente:complete",
  choices: [
    { id:"preocupado", text:"Estava preocupado com vocês.", response:"Então não finge que não se importa. Eu percebo essas coisas.", delta:{trust:1,intimacy:1}, flag:"dia1_yuki_preocupacao" },
    { id:"relatorios", text:"Alguém precisa terminar os relatórios.", response:"Claro. Trabalho. Sempre trabalho. Você é consistente, pelo menos.", delta:{respect:1}, flag:"dia1_yuki_profissional" },
    { id:"provocar", text:"E você veio conferir por quê?", response:"Talvez eu só quisesse saber se você ia responder. Agora eu sei.", delta:{attraction:1,tension:1}, flag:"dia1_yuki_flerte" },
  ]
};
