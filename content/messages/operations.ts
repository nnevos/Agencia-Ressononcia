/**
 * NEXO // GUERREIROS ELEMENTAIS — CANAL OPERACIONAL CONTEXTUAL
 *
 * Camadas de autoria:
 * 1) eventComments: observações específicas ao chamado antes do despacho.
 * 2) affinityMissionLines: falas específicas quando um herói com afinidade contextual participa.
 * 3) specialtyMissionLines: falas por especialidade/tag do caso.
 * 4) pairDialogue: interação específica entre pares cuja relação já existe no cânone/AU.
 * 5) teamTemplates: fallback que ainda considera quem está junto na equipe.
 * 6) outcomeLines/teamOutcomeReactions: retorno contextualizado pelo resultado.
 *
 * A seleção e prioridade dessas camadas ficam em game/data/operationsChat.ts.
 */
export const OPERATIONS_CONTENT_IS_PLACEHOLDER = false;

export type OperationsHeroId = "yuki" | "elysia" | "lysandro" | "helio" | "demetria" | "alexandra" | "eros";
export type MissionPhase = "depart" | "arrival" | "mid";
export type MissionOutcomeKey = "success" | "cost" | "partial" | "failure";

export type EventComment = { heroId: OperationsHeroId; text: string };
export type MissionLineSet = Partial<Record<MissionPhase, string>>;

/** Comentários ligados aos IDs reais do banco v0.2.1+. */
export const eventComments: Record<string, EventComment[]> = {
  "inc-002": [
    { heroId: "lysandro", text: "Perseguição na Linha Norte? Se o alvo ainda tá em movimento, eu tentaria fechar a rota antes de transformar isso numa corrida pela cidade inteira." },
    { heroId: "eros", text: "Se ele estiver pulando acesso e viaduto eu consigo acompanhar por cima e passar a direção. Só não deixa sumir no trânsito kkkkk." },
  ],
  "inc-004": [
    { heroId: "elysia", text: "Hospital sem energia é prioridade de sistema crítico. Antes de religar qualquer coisa eu quero saber o que caiu junto e o que ainda tá sustentando equipamento essencial." },
    { heroId: "alexandra", text: "Enquanto resolvem a pane, alguém precisa garantir acesso, evacuação e suporte pros setores que não podem parar." },
  ],
  "inc-006": [
    { heroId: "alexandra", text: "A Baixada já tá acumulando água. Se eu entrar, consigo desviar parte do fluxo e ganhar tempo pra evacuação antes do nível subir mais." },
    { heroId: "demetria", text: "Com água subindo, eu evitaria concentrar todo mundo na mesma rota. Precisamos de saída segura e ponto alto antes de qualquer outra coisa." },
  ],
  "inc-007": [
    { heroId: "lysandro", text: "Ataque a depósito municipal costuma ter objetivo além de quebrar coisa. Eu fecharia as saídas e descobriria o que eles vieram buscar." },
    { heroId: "helio", text: "Se houver combustível, munição ou material sensível lá dentro, não quero troca de ataque perto do estoque. Primeiro isolamos a área." },
  ],
  "inc-001": [
    { heroId: "yuki", text: "Incêndio em prédio alto complica por fumaça e rota de saída. Se tiver gente presa acima do foco, abrir um corredor seguro vale mais do que só apagar o fogo." },
    { heroId: "helio", text: "Quero saber onde o incêndio começou e até onde o calor já avançou. Atacar o foco errado pode empurrar a situação pra outro andar." },
  ],
  "inc-003": [
    { heroId: "demetria", text: "Mercado velho e estrutura cedendo: ninguém entra correndo antes de saber o que ainda tá sustentando o teto. Eu consigo estabilizar e abrir uma passagem." },
    { heroId: "eros", text: "Se tiver gente presa em ponto aberto eu consigo localizar por cima. Melhor achar primeiro do que começar a mexer em entulho no escuro." },
  ],
  "inc-005": [
    { heroId: "alexandra", text: "Reféns no terminal pedem controle. Muita gente, muitas rotas e pouca margem pra ação impulsiva. Precisamos saber onde estão civis e ameaças antes de avançar." },
    { heroId: "lysandro", text: "Se der pra separar os sequestradores dos reféns, eu entro rápido. Até lá, melhor não dar motivo pra eles mudarem de posição." },
  ],
  "inc-008": [
    { heroId: "elysia", text: "Trem fora de controle é sistema, energia e tempo. Se eu conseguir entender o que ainda responde nos controles, talvez dê pra reduzir velocidade antes da interceptação física." },
    { heroId: "eros", text: "Eu consigo acompanhar o trem e verificar a linha à frente. Se tiver obstáculo ou gente no caminho, aviso antes de virar surpresa." },
  ],
  "inc-009": [
    { heroId: "demetria", text: "Evacuar uma torre inteira exige distribuir o fluxo. Se todo mundo descer pelo mesmo núcleo ao mesmo tempo, a própria evacuação vira risco." },
    { heroId: "alexandra", text: "Vou priorizar rotas e grupos vulneráveis. Quanto mais previsível for a saída, menos gente vai tentar improvisar por conta própria." },
  ],
  "inc-010": [
    { heroId: "lysandro", text: "Confronto em praça cívica significa público em volta. Eu tiro a briga do meio das pessoas primeiro; vencer vem depois." },
    { heroId: "eros", text: "Praça aberta ajuda. Consigo afastar curiosos e quebrar aproximação sem jogar todo mundo pro mesmo lado." },
  ],
  "pool-e-01": [
    { heroId: "eros", text: "Plataforma cedendo em fachada? Se ainda tiver espaço pra aproximação por fora, dá pra tirar a pessoa sem colocar mais peso na estrutura." },
  ],
  "pool-e-02": [
    { heroId: "elysia", text: "Três cruzamentos fora de sincronia ao mesmo tempo parece mais problema de controle do que força. Eu tentaria descobrir onde o ciclo começou a falhar antes de mexer em tudo." },
  ],
  "pool-e-03": [
    { heroId: "alexandra", text: "Drone pesado em baixa altitude. Se alguém for interceptar, precisa corrigir a trajetória sem derrubar a carga em cima dos galpões." },
  ],
  "pool-e-04": [
    { heroId: "helio", text: "Oficina com cilindros pressurizados muda o risco. O fogo pequeno é só metade do problema; não dá pra deixar o calor chegar neles." },
  ],
  "pool-e-05": [
    { heroId: "demetria", text: "Quatro pessoas presas e uma em crise de ansiedade. Antes de forçar qualquer coisa, eu manteria contato com elas e confirmaria se a cabine tá estável." },
  ],
  "pool-e-06": [
    { heroId: "alexandra", text: "Esse hidrante tá com pressão suficiente pra alagar a rua inteira. Se eu entrar, consigo trabalhar o fluxo enquanto fecham a linha principal." },
  ],
  "pool-e-07": [
    { heroId: "eros", text: "Animal preso lá em cima? Tá, esse eu consigo pelo menos chegar perto sem montar uma operação de escalada inteira kkkkk." },
  ],
  "pool-e-08": [
    { heroId: "elysia", text: "Curto em subestação eu prefiro tratar como circuito ainda energizado até provarem o contrário. Dá pra fazer uma leitura antes de alguém encostar em qualquer coisa." },
  ],
  "pool-e-09": [
    { heroId: "demetria", text: "Se o letreiro já começou a ceder, não basta segurar a peça. Tem que tirar quem tá embaixo e garantir que o suporte não leve mais coisa junto." },
  ],
  "pool-e-10": [
    { heroId: "lysandro", text: "Galeria de serviço é estreita. Se a pessoa ainda tá se movendo lá dentro, alguém rápido pra fechar a saída vale mais do que entrar quebrando tudo." },
  ],
  "pool-e-11": [
    { heroId: "demetria", text: "Passarela móvel travada com gente em cima? Primeiro imobiliza o mecanismo. Depois tira o peso aos poucos pra não criar outro problema." },
  ],
  "pool-e-12": [
    { heroId: "eros", text: "Praça de alimentação lotada é aquele tipo de coisa que piora se todo mundo resolver correr ao mesmo tempo. Alguém precisa abrir espaço e acalmar o fluxo." },
  ],
  "pool-m-05": [
    { heroId: "yuki", text: "Estacionamento subterrâneo segura fumaça e calor. Se eu baixar a temperatura e abrir uma rota limpa, o resgate fica bem menos ruim." },
  ],
  "pool-m-06": [
    { heroId: "demetria", text: "Viaduto com carga envolvida: eu não mexeria nos veículos antes de saber o que ainda tá sustentando o peso. Uma coisa errada pode puxar o resto." },
  ],
  "pool-m-07": [
    { heroId: "eros", text: "Torre de comunicação sabotada... se ainda tiver alguém lá em cima, consigo fazer uma varredura externa sem depender dos acessos internos." },
  ],
  "pool-m-08": [
    { heroId: "demetria", text: "Passarela estrutural em colapso é prioridade de contenção. Se ela continuar trabalhando enquanto evacuam, o caminho de saída pode desaparecer." },
  ],
  "pool-m-09": [
    { heroId: "lysandro", text: "Roubo em movimento? Melhor fechar a rota antes de tentar parar o veículo no meio da avenida." },
  ],
  "pool-m-10": [
    { heroId: "alexandra", text: "Escola com vazamento pede evacuação organizada. Criança assustada vira outro risco se a saída não estiver bem definida." },
  ],
  "pool-m-11": [
    { heroId: "eros", text: "Briga super-humana no meio de rua residencial é péssima combinação. Posso separar espaço entre eles e as casas se me mandarem." },
  ],
  "pool-m-12": [
    { heroId: "alexandra", text: "Se as bombas da drenagem pararam, o nível vai subir mesmo sem chuva nova. Eu consigo ganhar tempo controlando o fluxo enquanto alguém resolve a energia." },
  ],
  "pool-h-07": [
    { heroId: "demetria", text: "Ponte parcialmente colapsada ainda pode estar redistribuindo carga. Eu quero saber onde o concreto tá trabalhando antes de mandar gente atravessar." },
  ],
  "pool-h-08": [
    { heroId: "helio", text: "Equipe presa dentro de incêndio industrial. Se houver combustível ou produto químico, eu preciso saber antes de abrir qualquer passagem no fogo." },
  ],
  "pool-h-09": [
    { heroId: "elysia", text: "Interferência energética espalhada por área comercial não parece uma falha simples. Se a fonte estiver mudando, eu consigo acompanhar a assinatura." },
  ],
  "pool-h-10": [
    { heroId: "lysandro", text: "Comboio médico sob ataque significa duas tarefas: parar quem tá atacando e não deixar o transporte parar junto. Tem que dividir bem a equipe." },
  ],
  "pool-h-11": [
    { heroId: "demetria", text: "Torre residencial com falha estrutural: evacuar rápido sem concentrar todo mundo no mesmo trecho. Se eu for, consigo reforçar as zonas mais críticas." },
  ],
  "pool-h-12": [
    { heroId: "eros", text: "Túnel é ruim pra perseguição, mas bom pra prever saída. Se eu pegar a vibração e o fluxo certo, dá pra descobrir pra onde tá indo." },
  ],
  "pool-c-01": [
    { heroId: "elysia", text: "Falha em cascata na rede central não se resolve religando tudo. Precisa descobrir qual trecho tá devolvendo a carga errada antes de criar outra queda." },
  ],
  "pool-c-02": [
    { heroId: "alexandra", text: "Rede de trens com colisão iminente: qualquer desaceleração parcial já compra segundos. Aqui precisão importa tanto quanto potência." },
  ],
  "pool-c-03": [
    { heroId: "yuki", text: "Vários blocos pegando fogo ao mesmo tempo... consigo segurar propagação e abrir zonas frias, mas vai precisar de alguém atacando a fonte também." },
    { heroId: "helio", text: "Com várias frentes, eu consigo cortar o avanço de uma área por vez. Se o Yuki estiver junto, dá pra dividir calor e rota de resgate." },
  ],
  "pool-c-04": [
    { heroId: "alexandra", text: "Barreira de água rompida é volume e direção. Se eu conseguir desviar o fluxo principal, a equipe ganha tempo pra tirar as pessoas da frente." },
  ],
  "pool-c-05": [
    { heroId: "lysandro", text: "Confronto coordenado em área cívica significa que eles vão tentar puxar a gente pra mais de um ponto. Não dá pra perseguir o primeiro alvo que aparecer." },
  ],
  "pool-c-06": [
    { heroId: "demetria", text: "Complexo de eventos cheio e estrutura caindo: eu consigo segurar setores, mas a evacuação tem que acontecer junto. Não adianta salvar teto e esquecer as pessoas." },
  ],
  "pool-c-07": [
    { heroId: "elysia", text: "Terminal inteiro fora e com falha de energia? Eu consigo rastrear o que ainda tá energizado. Só preciso que alguém mantenha acesso e evacuação funcionando." },
    { heroId: "eros", text: "Terminal lotado sem energia vira um labirinto rapidinho. Posso fazer reconhecimento por cima e abrir corredor pra tirar gente." },
  ],
  "pool-c-08": [
    { heroId: "demetria", text: "Acidente em cadeia no viaduto: cada veículo mexido muda a carga do conjunto. Primeiro estabiliza, depois abre corredor de resgate." },
  ],
  "pool-c-09": [
    { heroId: "elysia", text: "Hospital sem energia não pode esperar diagnóstico por tentativa. Eu consigo isolar os circuitos críticos e procurar a origem da pane." },
    { heroId: "alexandra", text: "Enquanto a energia é isolada, eu consigo manter rotas de resgate e sistemas que dependam de fluxo sob controle. Mas precisamos coordenar bem." },
  ],
  "pool-c-10": [
    { heroId: "demetria", text: "Desabamento em túnel: eu quero leitura estrutural antes de abrir passagem. Escavar rápido demais pode fechar o espaço que ainda resta." },
  ],
  "pool-c-11": [
    { heroId: "alexandra", text: "Evacuação em massa com ameaça incerta é justamente quando não dá pra deixar o medo definir o fluxo. Primeiro informação, depois rota segura." },
  ],
  "pool-c-12": [
    { heroId: "eros", text: "Ataques simultâneos na infraestrutura? Se forem coordenados, alguém precisa enxergar o desenho geral. Posso circular rápido entre os pontos e passar posição." },
  ],
};

/** Fallback de voz quando nenhuma camada mais específica se aplica. */
export const missionLines: Record<OperationsHeroId, [string, string, string]> = {
  yuki: [
    "Beleza, tô indo. Aviso quando chegar lá.",
    "Cheguei. Vou entender o que mudou desde o chamado antes de mexer em qualquer coisa.",
    "Ainda por aqui. Mudou umas coisas do briefing, mas tá dando pra trabalhar.",
  ],
  elysia: [
    "Recebido! Tô indo. Quando chegar faço uma leitura rápida do cenário.",
    "Cheguei! Tem bastante variável aqui, vou separar o que é causa do que é consequência primeiro.",
    "Atualização: tinha mais coisa envolvida do que parecia no chamado. Ainda tô analisando, mas seguimos bem.",
  ],
  lysandro: [
    "Tô saindo. Deixa comigo.",
    "Cheguei. Já deu pra entender onde tá o problema.",
    "Ainda resolvendo. Quando acabar eu mando a versão bonita pro relatório.",
  ],
  helio: [
    "Recebido. Estou a caminho.",
    "Cheguei. Vou observar primeiro e agir quando tiver uma abertura segura.",
    "Ainda em operação. Está sob controle, mas não terminou.",
  ],
  demetria: [
    "Recebido, tô indo! Aviso quando chegar.",
    "Cheguei. Vou garantir primeiro que a área está segura antes da gente avançar.",
    "Ainda tem risco aqui, mas estamos segurando bem. Qualquer mudança eu aviso.",
  ],
  alexandra: [
    "Despacho confirmado. Estou a caminho.",
    "Cheguei ao local. Vou priorizar os civis e estabilizar a situação antes de avançar.",
    "Atualização: existem fatores que não estavam no chamado inicial. Estou ajustando a abordagem.",
  ],
  eros: [
    "Fechou, tô indo. Vou dar uma olhada por cima quando chegar.",
    "Cheguei. Daqui já dá pra entender bem melhor o que tá acontecendo.",
    "Mudou um pouco aqui kkkkk, mas tá tranquilo. A gente continua.",
  ],
};

/** Falas por especialidade. O runtime usa a primeira tag do caso que tenha texto para o herói. */
export const specialtyMissionLines: Partial<Record<OperationsHeroId, Record<string, MissionLineSet>>> = {
  yuki: {
    controle: { arrival: "Cheguei. Vou segurar a área primeiro e abrir espaço pra equipe trabalhar.", mid: "Consegui estabilizar uma parte. Agora dá pra avançar sem tudo mudar ao mesmo tempo." },
    resgate: { arrival: "Tô no local. Vou abrir uma rota segura e tirar quem estiver mais exposto primeiro.", mid: "Rota de retirada tá funcionando. Ainda tem gente pra tirar, mas ficou bem mais controlado." },
    mobilidade: { arrival: "Cheguei. Dá pra usar o terreno a nosso favor, vou ganhar posição primeiro.", mid: "Já consegui cortar bastante caminho. Tô reposicionando pro próximo ponto." },
  },
  elysia: {
    energia: { arrival: "Cheguei. Vou medir a assinatura antes de encostar no sistema; tem coisa demais aqui pra chutar.", mid: "Achei o padrão principal. Agora consigo separar o que tá alimentando a falha do que só tá sofrendo com ela." },
    precisao: { arrival: "Tô no local. Isso aqui pede ajuste fino, não potência. Vou mapear os pontos antes.", mid: "Boa, já isolei os pontos mais sensíveis. Agora dá pra agir sem espalhar o problema." },
    reconhecimento: { arrival: "Cheguei! Vou fazer uma leitura completa e cruzar o que a gente viu com o briefing.", mid: "Tem uma diferença importante no cenário real. Já marquei onde ela começa." },
  },
  lysandro: {
    combate: { arrival: "Cheguei. Vou manter a ameaça ocupada longe de quem não tem nada a ver com isso.", mid: "Ainda de pé. O alvo parou de ditar o ritmo, agora é com a gente." },
    interceptacao: { arrival: "Tô vendo a rota. Vou cortar a saída antes de ir direto no alvo.", mid: "Fechei o caminho mais óbvio. Se tentar fugir agora vai ter que mudar o plano." },
    velocidade: { arrival: "Cheguei. Vou encurtar a distância antes que isso vire outra ocorrência.", mid: "Já tô em cima. Não ganhou o espaço que queria." },
  },
  helio: {
    controle: { arrival: "No local. Vou limitar a área de risco antes de aumentar a intensidade.", mid: "Perímetro mais estável. Posso concentrar o próximo ataque sem espalhar o problema." },
    precisao: { arrival: "Cheguei. Tenho linha limpa. Vou trabalhar com rajadas curtas.", mid: "Ajustei o ângulo. Agora consigo atingir o ponto certo sem abrir dano ao redor." },
    resistencia: { arrival: "Cheguei. O ambiente está pesado, mas consigo sustentar posição.", mid: "Continuo operacional. O desgaste aumentou, mas ainda tenho margem." },
  },
  demetria: {
    contenção: { arrival: "Cheguei. Vou travar o que ainda tá se movendo antes de tirar alguém daqui.", mid: "Estrutura mais estável. Agora dá pra abrir passagem sem jogar o peso pra outro ponto." },
    resistencia: { arrival: "Tô no local. Eu seguro a parte pesada; organizem a retirada enquanto isso.", mid: "Ainda segurando. Dá pra continuar, mas não quero ninguém demorando na zona de risco." },
    resgate: { arrival: "Cheguei. Primeiro civis, depois o resto. Vou abrir um caminho seguro.", mid: "Primeiro grupo saiu. Tô reforçando a rota pra buscar o restante." },
  },
  alexandra: {
    controle: { arrival: "Cheguei. Vou reduzir a instabilidade primeiro; depois a equipe avança com mais segurança.", mid: "Fluxo estabilizado. A situação ainda exige atenção, mas já temos uma janela segura." },
    resgate: { arrival: "No local. Vou organizar uma rota de retirada antes de aumentar a pressão sobre a área.", mid: "A evacuação está andando. Vou manter o corredor livre enquanto a equipe termina." },
    precisao: { arrival: "Cheguei. Vou trabalhar em pequenos ajustes; aqui qualquer excesso piora o cenário.", mid: "A resposta está estável. Mantendo o controle fino até a equipe concluir." },
  },
  eros: {
    mobilidade: { arrival: "Cheguei. Vou circular por fora e achar o caminho mais rápido pra entrar e sair.", mid: "Já achei uma rota melhor. Dá pra cortar bastante tempo por aqui." },
    reconhecimento: { arrival: "Tô no local. Vou dar uma volta por cima e ver o que o briefing não conseguiu enxergar.", mid: "Achei o ponto que tava escondido. Vou marcar pra vocês e continuo olhando o resto." },
    controle: { arrival: "Cheguei. Vou mexer no fluxo aos poucos pra não empurrar o problema pra outro lugar.", mid: "Tá respondendo bem. Consigo manter assim enquanto vocês avançam." },
  },
};

/** Afinidades explícitas do banco. Têm prioridade sobre specialtyMissionLines. */
export const affinityMissionLines: Record<string, Partial<Record<OperationsHeroId, MissionLineSet>>> = {
  "inc-006": { alexandra: { arrival: "Cheguei na Baixada. Vou desviar o fluxo principal e aliviar as ruas mais baixas enquanto a evacuação avança.", mid: "Consegui segurar o nível nas rotas principais. Ainda tem muita água entrando, mas a saída ficou estável." } },
  "pool-e-04": { helio: { arrival: "Cheguei na oficina. Vou conter o calor perto dos cilindros antes de qualquer entrada.", mid: "Cilindros fora da zona crítica. Agora dá pra terminar o controle do foco sem risco de explosão." } },
  "pool-e-06": { alexandra: { arrival: "Cheguei no hidrante. Vou quebrar a pressão do jato e desviar a água da área comercial.", mid: "Fluxo principal já tá sob controle. Dá pra fechar a linha sem a rua continuar enchendo." } },
  "pool-e-08": { elysia: { arrival: "Tô na subestação. Ainda tem carga circulando; vou absorver e isolar antes de alguém tocar nos painéis.", mid: "Circuito perigoso isolado. Achei onde o curto tá realimentando a rede." } },
  "pool-m-05": { yuki: { arrival: "Cheguei no estacionamento. Vou baixar a temperatura e segurar a fumaça longe da rota de resgate.", mid: "A rota fria tá aberta. A equipe consegue entrar e sair sem atravessar o pior do calor." } },
  "pool-m-11": { eros: { arrival: "Cheguei. Vou manter a briga longe das casas e quebrar a aproximação entre eles com rajadas curtas.", mid: "Consegui separar os dois da área residencial. Agora dá pra resolver sem jogar parede na cabeça de ninguém kkkkk." } },
  "pool-m-12": { alexandra: { arrival: "Tô na drenagem. Vou redirecionar o volume que tá chegando enquanto as bombas ficam fora.", mid: "Nível parou de subir. Não resolve a pane, mas comprou tempo suficiente pra equipe trabalhar." } },
  "pool-h-07": { demetria: { arrival: "Cheguei na ponte. Vou sentir onde a carga ainda tá distribuída antes de reforçar os apoios.", mid: "Reforcei o trecho mais crítico. A estrutura parou de transferir peso pro vão danificado." } },
  "pool-h-08": { helio: { arrival: "Cheguei. Vou abrir uma zona de menor calor até a equipe presa sem espalhar o incêndio industrial.", mid: "Corredor térmico aberto. Consigo manter enquanto retiram o pessoal." } },
  "pool-h-09": { elysia: { arrival: "No local. A interferência tá mudando de frequência; vou seguir a assinatura até a fonte.", mid: "Achei a origem principal. Isolando agora pra parar de contaminar o resto da área." } },
  "pool-h-11": { demetria: { arrival: "Cheguei na torre. Vou reforçar os pontos que ainda estão transferindo carga pra rota de evacuação.", mid: "Estrutura estabilizada o bastante pra continuar a retirada. Não quero ninguém fora do corredor marcado." } },
  "pool-c-03": {
    yuki: { arrival: "Tô no primeiro bloco. Vou criar uma faixa fria entre os focos e as rotas de resgate.", mid: "Faixa de contenção funcionando. O fogo parou de saltar pro próximo bloco." },
    helio: { arrival: "Cheguei no lado leste. Vou cortar a frente mais quente sem atravessar a rota do Yuki.", mid: "Frente leste reduzida. Posso avançar pro segundo foco." },
  },
  "pool-c-04": { alexandra: { arrival: "Cheguei na barreira. Vou puxar o fluxo principal pra uma área vazia e aliviar a pressão sobre a evacuação.", mid: "Desvio segurando. A água ainda vem forte, mas parou de avançar na direção dos civis." } },
  "pool-c-06": { demetria: { arrival: "Cheguei no complexo. Vou sustentar os trechos críticos e abrir corredores entre os setores.", mid: "Dois corredores seguros. Continuem a evacuação; eu mantenho a carga fora deles." } },
  "pool-c-07": {
    elysia: { arrival: "Tô no terminal. Vou mapear o que ainda tem energia e separar os circuitos perigosos.", mid: "Rede crítica identificada. Já consigo devolver energia só onde não atrapalha a evacuação." },
    eros: { arrival: "Cheguei por cima. Vou marcar as áreas lotadas e abrir um fluxo de saída sem depender das escadas rolantes.", mid: "Corredor norte tá limpo. Tô puxando o pessoal pro acesso que ainda funciona." },
  },
  "pool-c-09": {
    elysia: { arrival: "Cheguei no hospital. Vou isolar os circuitos de suporte e descobrir onde a pane tá derrubando tudo.", mid: "Circuitos críticos separados. Dá pra manter equipamento essencial enquanto eu sigo na falha principal." },
    alexandra: { arrival: "No hospital. Vou manter acesso e resgate funcionando sem colocar água perto do sistema que a Elysia ainda não isolou.", mid: "Rotas limpas e setores prioritários atendidos. Continuo dando suporte enquanto a rede volta." },
  },
  "pool-c-10": { demetria: { arrival: "Cheguei no túnel. Vou estabilizar o teto e localizar vazios antes de abrir passagem.", mid: "Achei um corredor viável. Reforcei as laterais; agora dá pra avançar no resgate." } },
  "pool-c-12": { eros: { arrival: "Tô circulando entre os pontos. Já dá pra ver que os ataques estão seguindo uma ordem; vou marcar a próxima rota provável.", mid: "Cruzei os deslocamentos. Tem um corredor comum entre os ataques; vou acompanhar por cima." } },
};

/**
 * Interações para pares cuja relação já está registrada em content/relationships/resonance.ts.
 * As chaves são alfabetizadas para permanecer estáveis.
 */
export const pairDialogue: Record<string, { arrival: Partial<Record<OperationsHeroId, string>>; mid: Partial<Record<OperationsHeroId, string>> }> = {
  "elysia|yuki": {
    arrival: {
      yuki: "Elysia, eu seguro o campo enquanto você entende o que tá alimentando isso.",
      elysia: "Yuki, me dá alguns segundos de estabilidade que eu consigo separar as variáveis daqui.",
    },
    mid: {
      yuki: "Tá mais estável. Pode fazer sua parte sem o cenário mudar toda hora.",
      elysia: "Boa! Já achei o padrão. Segura desse jeito que eu fecho o resto.",
    },
  },
  "lysandro|yuki": {
    arrival: {
      yuki: "Lysandro, eu travo a área. Você pega o que tentar passar.",
      lysandro: "Yuki, segura o terreno. O que escapar dele fica comigo.",
    },
    mid: {
      yuki: "Fechei a rota maior. Tem uma passagem sobrando do seu lado.",
      lysandro: "Vi. Já tô nela.",
    },
  },
  "alexandra|yuki": {
    arrival: {
      yuki: "Alexandra, controla o fluxo e eu congelo só onde você abrir janela.",
      alexandra: "Yuki, espera eu reduzir o movimento primeiro. Quando estabilizar, congela apenas o ponto que eu marcar.",
    },
    mid: {
      yuki: "Fechou. Mantive só a área que você marcou.",
      alexandra: "Perfeito. Mantém assim; eu cuido do restante do fluxo.",
    },
  },
  "eros|yuki": {
    arrival: {
      yuki: "Eros, me dá direção e eu fecho a área que você empurrar.",
      eros: "Yuki, eu puxo o fluxo pra esquerda e você transforma isso numa parede, fechou?",
    },
    mid: {
      yuki: "Peguei. O lado esquerdo tá travado.",
      eros: "Aí sim kkkkk. Vou usar isso pra abrir o corredor do outro lado.",
    },
  },
  "elysia|lysandro": {
    arrival: {
      elysia: "Lysandro, me compra um pouco de tempo. Quero entender isso antes de descarregar energia à toa.",
      lysandro: "Analisa. Eu mantenho o problema ocupado até você terminar.",
    },
    mid: {
      elysia: "Achei o ponto certo. Pode tirar pressão do lado direito.",
      lysandro: "Finalmente. Tava ficando entediado.",
    },
  },
  "elysia|helio": {
    arrival: {
      elysia: "Hélio, não dispara ainda. Quero medir o que isso faz com a energia do lugar.",
      helio: "Eu sei. Me avisa quando terminar a análise.",
    },
    mid: {
      elysia: "Pronto. Agora pode aumentar a potência, mas só no ponto que eu marquei.",
      helio: "Finalmente. Mantém a leitura e eu concentro ali.",
    },
  },
  "demetria|eros": {
    arrival: {
      demetria: "Eros, eu estabilizo a estrutura. Você abre uma rota de saída sem jogar pressão em cima dela.",
      eros: "Fechou. Segura isso aí que eu acho o caminho mais rápido pra tirar o pessoal.",
    },
    mid: {
      demetria: "Corredor estabilizado. Pode trazer eles.",
      eros: "Já tô puxando o fluxo pra lá. Sabia que a gente funcionava bem junto kkkkk.",
    },
  },
  "demetria|lysandro": {
    arrival: {
      demetria: "Lysandro, eu seguro a parte pesada. Você mantém o caminho livre.",
      lysandro: "Segura. Eu não deixo nada chegar até você.",
    },
    mid: {
      demetria: "Estrutura firme. Dá pra avançar mais um setor.",
      lysandro: "Caminho limpo. Vai.",
    },
  },
  "helio|yuki": {
    arrival: {
      yuki: "Hélio, só me avisa antes de subir a temperatura onde eu tô controlando.",
      helio: "Se você não congelar minha linha, não teremos problema.",
    },
    mid: {
      yuki: "Minha rota tá fechada. Pode trabalhar do seu lado.",
      helio: "Ótimo. Então não cruza a minha agora.",
    },
  },
  "alexandra|elysia": {
    arrival: {
      alexandra: "Elysia, eu mantenho o ambiente estável. Me avisa quando a parte elétrica estiver isolada.",
      elysia: "Alexandra, segura o fluxo longe dos circuitos por alguns segundos. Eu te dou uma janela limpa.",
    },
    mid: {
      alexandra: "Fluxo contido. Pode liberar o setor quando estiver seguro.",
      elysia: "Agora. Circuito isolado; pode entrar com água sem transformar tudo numa péssima ideia kkkkk.",
    },
  },
};

/** Fallback de equipe: ainda menciona e coordena com o colega, então composições diferentes geram texto diferente. */
export const teamTemplates: Record<OperationsHeroId, { arrival: string; mid: string }> = {
  yuki: { arrival: "{teammate}, eu começo segurando a área. Me chama se precisar que eu mude o campo.", mid: "{teammate}, estabilizei meu lado. Dá pra avançar daí?" },
  elysia: { arrival: "{teammate}, segura a situação por alguns segundos enquanto eu faço uma leitura completa.", mid: "{teammate}, achei o ponto principal. Vou marcar o que vale atacar primeiro." },
  lysandro: { arrival: "{teammate}, faz sua parte. Eu fico com o que tentar passar por você.", mid: "{teammate}, meu lado tá limpo. Precisa de espaço aí?" },
  helio: { arrival: "{teammate}, mantenha distância da minha linha de ação. Eu aviso antes de aumentar a potência.", mid: "{teammate}, área sob controle do meu lado. Continue." },
  demetria: { arrival: "{teammate}, eu seguro o risco maior. Usa essa janela pra fazer sua parte.", mid: "{teammate}, tá estável aqui. Pode avançar mais um pouco." },
  alexandra: { arrival: "{teammate}, vou estabilizar o cenário primeiro. Avança quando eu confirmar a abertura.", mid: "{teammate}, janela segura aberta. Pode prosseguir." },
  eros: { arrival: "{teammate}, vou circular por fora e te passo a melhor entrada assim que achar.", mid: "{teammate}, achei um caminho mais limpo. Vou puxar o fluxo pra você." },
};

/** Resultado principal por personagem. {incident} é substituído pelo título do caso. */
export const outcomeLines: Record<OperationsHeroId, Record<MissionOutcomeKey, string>> = {
  yuki: {
    success: "{incident} resolvido. Deu pra fechar tudo sem deixar a situação escapar.",
    cost: "Terminamos {incident}. Deu certo, mas cobrou mais da equipe do que eu queria.",
    partial: "A gente segurou o pior em {incident}, mas não ficou perfeito. O relatório vai explicar o que sobrou.",
    failure: "Estamos voltando de {incident}. Não conseguimos fechar a situação como precisava.",
  },
  elysia: {
    success: "{incident} encerrado! Funcionou. Já mandei no relatório o que realmente estava causando o problema.",
    cost: "Fechamos {incident}. Funcionou, mas teve custo e eu deixei tudo detalhado no relatório.",
    partial: "Conseguimos estabilizar {incident}, mas ficou coisa pendente. Já marquei exatamente o que não fechou.",
    failure: "Voltando de {incident}. A leitura não foi suficiente pra resolver tudo e o relatório já tá na Central.",
  },
  lysandro: {
    success: "{incident} acabou. Problema resolvido.",
    cost: "{incident} resolvido. Não foi bonito, mas funcionou.",
    partial: "Seguramos {incident}, mas não deu pra fechar tudo. Tá no relatório.",
    failure: "Voltando de {incident}. Dessa vez não deu.",
  },
  helio: {
    success: "{incident} concluído. Situação neutralizada e equipe retornando.",
    cost: "{incident} concluído com desgaste. O objetivo foi cumprido.",
    partial: "{incident} estabilizado parcialmente. A área ainda exige acompanhamento.",
    failure: "{incident} não foi concluído como previsto. Estamos retornando.",
  },
  demetria: {
    success: "Terminamos {incident}. Área segura e todo mundo voltando.",
    cost: "{incident} resolvido, mas a operação pesou. Depois eu explico melhor no relatório.",
    partial: "A gente conteve o principal em {incident}, mas ficou trabalho pra equipe local continuar.",
    failure: "Estamos voltando de {incident}. Não deu pra resolver como a gente queria.",
  },
  alexandra: {
    success: "{incident} encerrado. A situação foi estabilizada e a equipe está retornando.",
    cost: "{incident} concluído, embora com custo operacional maior do que o previsto.",
    partial: "{incident} está sob controle parcial. O risco imediato foi reduzido, mas ainda há pendências.",
    failure: "Estamos retornando de {incident}. Não foi possível atingir o objetivo operacional.",
  },
  eros: {
    success: "{incident} resolvido kkkkk. Tamo voltando e já mandei tudo pro relatório.",
    cost: "Fechamos {incident}. Deu certo, mas essa aí fez a gente trabalhar viu kkkkk.",
    partial: "Seguramos o pior de {incident}. Não ficou 100%, mas ninguém largou o problema solto.",
    failure: "Voltando de {incident}. Hoje a ocorrência ganhou essa, infelizmente.",
  },
};

/** Pequena reação do segundo membro ao resultado; reforça que a equipe realmente conversou entre si. */
export const teamOutcomeReactions: Record<OperationsHeroId, Record<MissionOutcomeKey, string>> = {
  yuki: { success: "Boa. Funcionou bem com {teammate} dessa vez.", cost: "Vou precisar recarregar depois dessa. Valeu pela cobertura, {teammate}.", partial: "Podia ter sido melhor, mas a gente segurou junto, {teammate}.", failure: "Foi mal, {teammate}. A gente revê isso depois." },
  elysia: { success: "Boa, {teammate}! Essa combinação funcionou melhor do que eu esperava.", cost: "Funcionou, mas eu quero revisar os dados depois. Obrigada pela cobertura, {teammate}.", partial: "Ainda quero entender onde perdemos eficiência, {teammate}. Depois a gente compara.", failure: "{teammate}, depois quero reconstruir o que aconteceu. Tem alguma coisa aqui que a gente pode melhorar." },
  lysandro: { success: "Boa, {teammate}. Funcionou.", cost: "Já tive dias melhores. Valeu por segurar junto, {teammate}.", partial: "Não fechou tudo, mas também não deixamos piorar. Tá valendo, {teammate}.", failure: "Acontece. Próxima a gente acerta, {teammate}." },
  helio: { success: "Boa execução, {teammate}.", cost: "Objetivo cumprido. Precisamos administrar melhor o desgaste da próxima vez, {teammate}.", partial: "O resultado não foi completo. Ainda assim, sua cobertura ajudou, {teammate}.", failure: "Vamos revisar a coordenação depois, {teammate}." },
  demetria: { success: "Boa, {teammate}! A equipe encaixou bem.", cost: "Deu certo. Agora descansa um pouco também, {teammate}.", partial: "A gente fez o que dava com o cenário, {teammate}. Depois vê onde melhorar.", failure: "Não fica remoendo agora, {teammate}. A gente revisa e aprende com isso." },
  alexandra: { success: "Boa coordenação, {teammate}. A execução ficou limpa.", cost: "Concluímos, {teammate}. Depois precisamos revisar onde o custo aumentou.", partial: "Reduzimos o risco, {teammate}. Agora é importante registrar exatamente o que permaneceu pendente.", failure: "Vamos revisar a sequência com calma depois, {teammate}." },
  eros: { success: "Aí sim, {teammate} kkkkk. Funcionou bonito.", cost: "Deu certo, {teammate}. Agora eu aceito oficialmente um descanso kkkkk.", partial: "Podia ter sido melhor, mas seguramos bem, {teammate}.", failure: "É, {teammate}... essa foi feia. Próxima a gente compensa." },
};

export const ambientMessages = [
  { id: "ambient-dia1-01", day: 1, minute: 70, senderHeroId: "lysandro", text: "Pergunta séria: o café da sala de descanso sempre foi ruim assim ou fizeram isso só pra receber a gente?" },
  { id: "ambient-dia1-02", day: 1, minute: 73, senderHeroId: "elysia", text: "Kkkkk não questiona. Eu já decidi tratar aquele café como mais um risco ocupacional da Agência." },
] as const;
