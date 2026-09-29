import type { DialogueChoice, DialogueScene, DialogueTurn } from "@/game/types";

/**
 * PLACEHOLDERS DE TESTE D2-D6.
 *
 * Estes textos existem somente para validar o motor de campanha social ate o Dia 6.
 * Ao receber dialogos finais do autor, substitua APENAS os textos/respostas/deltas e
 * preserve os IDs sempre que possivel para nao quebrar saves de teste.
 */

type PlaceholderProfile = {
  id: string;
  speaker: string;
  voice: string;
  day2Topic: string;
  day3Plan: string;
  day4Memory: string;
  day5Flirt: string;
  day6Plan: string;
};

const profiles: PlaceholderProfile[] = [
  { id:"yuki", speaker:"Yuki", voice:"direto, mas atento", day2Topic:"uma disputa boba sobre qual lanche sobrevive melhor a um plantao", day3Plan:"dar uma volta e comprar alguma coisa gelada", day4Memory:"a caminhada e a conversa sem pressa", day5Flirt:"o jeito como voce sempre percebe quando ele esta cansado", day6Plan:"um passeio mais demorado, longe da Agencia" },
  { id:"elysia", speaker:"Elysia", voice:"rapida e provocadora", day2Topic:"um teste inutil para descobrir qual de voces organiza melhor uma mesa", day3Plan:"visitar uma cafeteria e discutir teorias absurdas", day4Memory:"a cafeteria e a quantidade de assuntos que surgiram", day5Flirt:"a facilidade com que ela consegue tirar uma resposta sua", day6Plan:"um lugar com luzes da cidade e tempo para conversar" },
  { id:"lysandro", speaker:"Lysandro", voice:"contido e seco", day2Topic:"uma discussao seria demais sobre o jeito certo de preparar cafe", day3Plan:"caminhar por um lugar tranquilo e comer alguma coisa", day4Memory:"o silencio confortavel durante a saida", day5Flirt:"o fato de ele ter ficado tempo demais olhando para voce", day6Plan:"um jantar simples seguido de uma caminhada" },
  { id:"helio", speaker:"Helio", voice:"pratico com humor discreto", day2Topic:"uma aposta sobre quem erra primeiro uma previsao de filme", day3Plan:"ver alguma coisa juntos e pegar comida no caminho", day4Memory:"as piadas durante o filme", day5Flirt:"a forma como ele inventa desculpas para continuar a conversa", day6Plan:"uma noite fora da rotina, sem falar de trabalho" },
  { id:"demetria", speaker:"Demetria", voice:"franca e calorosa", day2Topic:"uma conversa sobre comidas que todo mundo defende sem motivo", day3Plan:"ir a uma feira e escolher alguma coisa para comer", day4Memory:"a feira e a competicao improvisada entre voces", day5Flirt:"o jeito como ela ficou perto demais sem parecer se importar", day6Plan:"um lugar aberto, comida boa e nenhuma pressa" },
  { id:"alexandra", speaker:"Alexandra", voice:"gentil e observadora", day2Topic:"uma lista de pequenas coisas que melhoram um dia ruim", day3Plan:"ir a um lugar calmo perto da agua", day4Memory:"o tempo que voces passaram conversando sem olhar o relogio", day5Flirt:"a maneira como ela lembra detalhes que voce disse dias atras", day6Plan:"um passeio tranquilo seguido de jantar" },
  { id:"eros", speaker:"Eros", voice:"brincalhao e espontaneo", day2Topic:"um ranking completamente injusto das melhores desculpas para evitar reunioes", day3Plan:"sair sem roteiro e decidir o caminho na hora", day4Memory:"o tanto que voces riram sem planejar nada", day5Flirt:"a quantidade de vezes que ele chama isso de coincidencia", day6Plan:"uma noite improvisada que claramente parece um encontro" },
];

function choice(id: string, text: string, response: string, flag: string, romanceAffinity: 100 | 50 | 30, delta: DialogueChoice["delta"], extras: Partial<DialogueChoice> = {}): DialogueChoice {
  return { id, text, response, flag, romanceAffinity, delta, ...extras };
}

function standardChoices(profile: PlaceholderProfile, day: number, turn: number): DialogueChoice[] {
  const base = `placeholder:d${day}:${profile.id}:t${turn}`;
  return [
    choice("proximo", "Eu gosto quando a conversa vai parar nesses assuntos aleatorios.", "Entao ainda bem que eu tenho uma reserva quase inesgotavel deles.", `${base}:100`, 100, { intimacy:1, attraction:1 }),
    choice("leve", "Isso foi estranhamente divertido. Podemos repetir qualquer hora.", "Anotado. Sem transformar em compromisso oficial, prometo.", `${base}:50`, 50, { trust:1 }),
    choice("neutro", "Vou registrar que essa conversa aconteceu e negar se perguntarem.", "Perfeito. Eu tambem nao tenho nenhuma prova. Quase nenhuma.", `${base}:30`, 30, { respect:1 }),
  ];
}

function day2(profile: PlaceholderProfile): DialogueScene {
  return {
    placeholder:true,
    day:2,
    id:`placeholder-dia2-${profile.id}`,
    characterId:profile.id,
    speaker:profile.speaker,
    timeLabel:"19:18 · NEXO",
    opening:`[PLACEHOLDER] ${profile.speaker} puxou ${profile.day2Topic}. A conversa nao tem nada a ver com ocorrencias e isso parece ser exatamente o ponto.`,
    availability:{minDay:2,maxDay:2},
    completionFlag:`scene:placeholder-dia2-${profile.id}:complete`,
    choices:standardChoices(profile,2,1),
    followUps:[{
      id:`placeholder-dia2-${profile.id}:followup`,
      incoming:`[PLACEHOLDER] "Certo, ultima pergunta antes de eu deixar voce em paz: voce sempre entra nessas conversas ou hoje eu dei sorte?"`,
      choices:standardChoices(profile,2,2),
    },{
      id:`placeholder-dia2-${profile.id}:followup-2`,
      incoming:`[PLACEHOLDER] A conversa continua por mais alguns minutos com outra pergunta boba antes da despedida.`,
      choices:standardChoices(profile,2,3),
    }],
  };
}

function day3(profile: PlaceholderProfile): DialogueScene {
  const base=`placeholder:d3:${profile.id}`;
  return {
    placeholder:true,
    day:3,
    id:`placeholder-dia3-${profile.id}`,
    characterId:profile.id,
    speaker:profile.speaker,
    timeLabel:"19:26 · NEXO",
    opening:`[PLACEHOLDER] Depois de alguns minutos de conversa ${profile.voice}, ${profile.speaker} comenta que seria bom fazer alguma coisa fora da Agencia.`,
    availability:{minDay:3,maxDay:3},
    completionFlag:`scene:placeholder-dia3-${profile.id}:complete`,
    choices:standardChoices(profile,3,1),
    followUps:[{
      id:`placeholder-dia3-${profile.id}:aquecimento`,
      incoming:`[PLACEHOLDER] Antes do convite, ${profile.speaker} prolonga a conversa para ver se voce realmente quer continuar falando fora do trabalho.`,
      choices:standardChoices(profile,3,2),
    },{
      id:`placeholder-dia3-${profile.id}:convite`,
      incoming:`[PLACEHOLDER] "Eu estava pensando em ${profile.day3Plan}. Sem uniforme, sem relatorio, sem desculpa de trabalho. O que acha?"`,
      choices:[
        choice("aceitar", "Eu topo. Vamos fazer isso hoje.", "Entao esta combinado. Me encontra quando estiver pronto.", `${base}:outing`, 100, { intimacy:1, attraction:2 }, { exclusiveOutingDay:3, vnSceneId:`outing-day3-${profile.id}` }),
        choice("quase", "Eu queria, mas hoje prefiro continuar por aqui. Fica para outra.", "Tudo bem. Eu vou cobrar esse 'outra' em algum momento.", `${base}:50`, 50, { trust:1 }),
        choice("nao", "Hoje eu vou ficar na minha. Mas valeu pelo convite.", "Justo. Melhor perguntar do que ficar imaginando a resposta.", `${base}:30`, 30, { respect:1 }),
      ],
    }],
  };
}

function day4(profile: PlaceholderProfile): DialogueScene {
  return {
    placeholder:true,
    day:4,
    id:`placeholder-dia4-${profile.id}`,
    characterId:profile.id,
    speaker:profile.speaker,
    timeLabel:"19:11 · NEXO",
    opening:`[PLACEHOLDER] ${profile.speaker} volta ao assunto de ${profile.day4Memory} e admite que pensou nisso mais vezes do que esperava.`,
    availability:{minDay:4,maxDay:4},
    completionFlag:`scene:placeholder-dia4-${profile.id}:complete`,
    choices:standardChoices(profile,4,1),
    followUps:[{
      id:`placeholder-dia4-${profile.id}:followup`,
      incoming:`[PLACEHOLDER] "Nao precisa parecer tao satisfeito. Eu so disse que foi bom. Muito bom, talvez."`,
      choices:standardChoices(profile,4,2),
    },{
      id:`placeholder-dia4-${profile.id}:followup-2`,
      incoming:`[PLACEHOLDER] ${profile.speaker} muda de assunto, mas volta ao encontro anterior pouco depois, como se ainda nao tivesse terminado de falar sobre ele.`,
      choices:standardChoices(profile,4,3),
    }],
  };
}

function day5(profile: PlaceholderProfile): DialogueScene {
  return {
    placeholder:true,
    day:5,
    id:`placeholder-dia5-${profile.id}`,
    characterId:profile.id,
    speaker:profile.speaker,
    timeLabel:"20:03 · NEXO",
    opening:`[PLACEHOLDER] A conversa fica mais pessoal. ${profile.speaker} comenta sobre ${profile.day5Flirt} e deixa a frase aberta por tempo demais para parecer acidental.`,
    availability:{minDay:5,maxDay:5},
    completionFlag:`scene:placeholder-dia5-${profile.id}:complete`,
    choices:standardChoices(profile,5,1),
    followUps:[{
      id:`placeholder-dia5-${profile.id}:aquecimento`,
      incoming:`[PLACEHOLDER] A conversa fica mais longa do que o normal e ${profile.speaker} encontra outra desculpa para nao encerrar o chat.`,
      choices:standardChoices(profile,5,2),
    },{
      id:`placeholder-dia5-${profile.id}:followup`,
      incoming:`[PLACEHOLDER] "Voce percebe que eu estou flertando, certo? So para eu saber se preciso ser mais obvio."`,
      choices:[
        choice("corresponder", "Percebi. E nao precisa diminuir o ritmo.", "Otimo. Isso simplifica bastante as coisas.", `placeholder:d5:${profile.id}:t3:100`, 100, { intimacy:1, attraction:2 }),
        choice("brincar", "Eu estava esperando voce admitir primeiro.", "Cruel. E eficiente. Eu respeito isso.", `placeholder:d5:${profile.id}:t3:50`, 50, { attraction:1, tension:1 }),
        choice("desviar", "Eu achei que era so seu jeito de conversar.", "Pode continuar fingindo. Eu deixo por enquanto.", `placeholder:d5:${profile.id}:t3:30`, 30, { trust:1 }),
      ],
    }],
  };
}

function day6(profile: PlaceholderProfile): DialogueScene {
  const base=`placeholder:d6:${profile.id}`;
  return {
    placeholder:true,
    day:6,
    id:`placeholder-dia6-${profile.id}`,
    characterId:profile.id,
    speaker:profile.speaker,
    timeLabel:"19:34 · NEXO",
    opening:`[PLACEHOLDER] ${profile.speaker} nao tenta esconder a intencao desta vez. A conversa comeca leve, mas rapidamente vira um convite implicito.`,
    availability:{minDay:6,maxDay:6},
    completionFlag:`scene:placeholder-dia6-${profile.id}:complete`,
    choices:standardChoices(profile,6,1),
    followUps:[{
      id:`placeholder-dia6-${profile.id}:aquecimento`,
      incoming:`[PLACEHOLDER] ${profile.speaker} deixa claro que esta conversa nao e so continuacao dos outros dias e espera sua reacao antes de fazer o convite.`,
      choices:standardChoices(profile,6,2),
    },{
      id:`placeholder-dia6-${profile.id}:date`,
      incoming:`[PLACEHOLDER] "Quero ${profile.day6Plan}. E, para evitar qualquer ambiguidade: estou te chamando para um encontro. Vem comigo?"`,
      choices:[
        choice("date", "Sim. Dessa vez pode chamar de encontro sem nenhuma ressalva.", "Entao pronto. Eu passo a noite inteira lembrando que voce disse isso.", `${base}:outing`, 100, { intimacy:2, attraction:2 }, { exclusiveOutingDay:6, vnSceneId:`outing-day6-${profile.id}` }),
        choice("adiar", "Eu gosto de voce, mas hoje nao quero transformar isso em um encontro.", "Eu prefiro uma resposta honesta. A conversa continua daqui.", `${base}:50`, 50, { trust:1, intimacy:1 }),
        choice("amizade", "Eu quero continuar perto de voce, mas nao como date.", "Entendido. Obrigado por falar sem rodeio.", `${base}:30`, 30, { respect:1, trust:1 }),
      ],
    }],
  };
}

function recoveryStage(profile: PlaceholderProfile, stage: 7 | 8 | 9 | 10): DialogueScene {
  return {
    placeholder:true, day:stage, id:`placeholder-rota${stage}-${profile.id}`, characterId:profile.id, speaker:profile.speaker, timeLabel:"19:40 · NEXO",
    opening:`[PLACEHOLDER] ${profile.speaker} retoma a conversa em outra noite. Esta etapa existe para testar rotas lentas sem perder o progresso individual.`,
    availability:{minDay:stage,maxDay:stage}, completionFlag:`scene:placeholder-rota${stage}-${profile.id}:complete`,
    choices:standardChoices(profile,stage,1),
    followUps:[{ id:`placeholder-rota${stage}-${profile.id}:followup`, incoming:"[PLACEHOLDER] A conversa continua sem pressa e abre mais espaço para desenvolver a relação.", choices:standardChoices(profile,stage,2) }],
  };
}

export const placeholderPostShiftScenes: DialogueScene[] = profiles.flatMap((profile) => [
  day2(profile), day3(profile), day4(profile), day5(profile), day6(profile), recoveryStage(profile,7), recoveryStage(profile,8), recoveryStage(profile,9), recoveryStage(profile,10),
]);
