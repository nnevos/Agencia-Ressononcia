# SCHEMA DE CONTEÚDO

## Ocorrência

Exemplo mínimo:

```ts
{
  id: "inc-011",
  title: "Nome do chamado",
  district: "Centro",
  priority: "P2", // interno; a UI não precisa exibir P1/P2/P3
  reliability: "Média",
  description: "O que o Analista sabe no briefing.",
  recommendedTags: ["resgate", "controle"],
  attributeWeights: { intelligence: 3, vigor: 2 },
  spawnMinute: 120,
  deadlineMinutes: 60,
  missionDurationMinutes: 90,
  risk: "Médio"
}
```

Pesos de atributo atuais: 3 = principal, 2 = importante, 1 = apoio.

## Mensagem operacional ligada a evento

```ts
"inc-011": {
  heroId: "elysia",
  text: "Mensagem exata que aparecerá no NEXO."
}
```

## Mensagem operacional ambiente

```ts
{
  id: "ambient-dia1-03",
  day: 1,
  minute: 180,
  senderHeroId: "eros",
  text: "Mensagem não relacionada diretamente a uma ocorrência."
}
```

## Cena pós-expediente

```ts
{
  id: "dia2-elysia-cena-01",
  characterId: "elysia",
  speaker: "Elysia",
  timeLabel: "19:10 · NEXO",
  opening: "Texto exato da primeira mensagem.",
  availability: {
    minDay: 2,
    requiredFlags: ["alguma_flag"],
    blockedFlags: ["outra_flag"]
  },
  completionFlag: "scene:dia2-elysia-cena-01:complete",
  choices: [
    {
      id: "resposta-a",
      text: "Texto exato que o jogador envia.",
      response: "Texto exato da resposta da personagem.",
      delta: { trust: 1, respect: 1 },
      flag: "elysia_resposta_a"
    }
  ]
}
```

## Flags

Use nomes descritivos e estáveis. Exemplo:
- `despacho_inc-003`
- `scene:dia1-yuki-pos-expediente:complete`
- `dia1_elysia_tecnico`

Não reutilize uma flag para dois significados diferentes.

## Regras de segurança editorial

1. IDs únicos e estáveis.
2. Personagens precisam usar IDs existentes em `content/characters/heroes.ts`.
3. Não escrever cânone novo sem registrar na Bíblia da AU.
4. Texto narrativo fica em `content/`, não em motor de simulação.
5. Alterações de regra mecânica devem atualizar GDD + failsafe.

## Conversa pós-expediente longa — v0.1.2

Uma cena continua começando com `opening + choices`, mas pode ganhar quantos turnos adicionais forem necessários em `followUps`:

```ts
{
  id: "dia2-personagem-cena-01",
  day: 2,
  characterId: "personagem",
  speaker: "Nome",
  timeLabel: "19:10 · NEXO",
  opening: "Primeira mensagem autorada.",
  availability: { minDay: 2, maxDay: 2 },
  completionFlag: "scene:dia2-personagem-cena-01:complete",
  choices: [
    {
      id: "a",
      text: "Resposta autorada do jogador.",
      response: "Resposta autorada do personagem.",
      delta: { trust: 1 },
      romanceAffinity: 100,
      flag: "dia2_personagem_a"
    },
    {
      id: "b",
      text: "Outra resposta.",
      response: "Resposta correspondente.",
      delta: {},
      romanceAffinity: 50,
      flag: "dia2_personagem_b"
    },
    {
      id: "c",
      text: "Terceira resposta.",
      response: "Resposta correspondente.",
      delta: {},
      romanceAffinity: 30,
      flag: "dia2_personagem_c"
    }
  ],
  followUps: [
    {
      id: "assunto-02",
      incoming: "Próxima mensagem autorada do personagem.",
      choices: [/* novamente 3 escolhas autoradas */]
    }
  ]
}
```

Regras:
- `romanceAffinity` aceita `100 | 50 | 30` e mede contribuição relativa para a rota romântica; não é chance aleatória.
- O orçamento romântico diário é dividido entre os turnos da cena para que conversas longas não gerem progresso extra só pelo tamanho.
- `exclusiveOutingDay: 3` ou `exclusiveOutingDay: 6` marca uma escolha que confirma o único encontro presencial daquele marco.
- `vnSceneId` pode apontar futuramente para uma cena presencial/VN autorada.
- Não criar fala automática para preencher `followUps`; cada mensagem continua escrita explicitamente em `content/`.


## Ocorrência v0.2.1

Campos adicionais do banco ativo:

```ts
{
  caseCode: "H-07",
  tier: "hard",
  minDay: 3,
  weight: 2,
  cooldownDays: 10,
  powerAffinityHeroIds: ["demetria"],
  effectSuggestion: "...",
  designIntent: "..."
}
```

`attributeWeights` usa 3=ESSENCIAL, 2=IMPORTANTE e 1=APOIO. `powerAffinityHeroIds` concede vantagem contextual; não é requisito exclusivo. `spawnMinute` do banco fica 0 e é materializado pelo gerador diário ao criar o turno.

## NEXO privado com mídia — v0.2.8

O schema atual aceita mídia e mensagens fixas diretamente no conteúdo:

```ts
{
  openingImage: "/nexo/personagem/foto.jpg",
  openingImageAlt: "Descrição curta da foto.",
  openingOutgoing: "Mensagem fixa anterior, quando necessária.",
  openingAfterIncoming: [
    { direction: "outgoing", text: "Mensagem fixa do Analista." }
  ],
  choices: [{
    id: "a",
    text: "Escolha interativa.",
    response: "Resposta do personagem.",
    romanceAffinity: 50,
    afterResponse: [
      { direction: "incoming", text: "Continuação fixa." },
      { direction: "outgoing", text: "Resposta fixa do Analista." }
    ]
  }],
  followUps: [{
    id: "turno-02",
    prefaceOutgoing: "Mensagem fixa antes do próximo incoming.",
    incoming: "Nova mensagem.",
    incomingImage: "/nexo/personagem/outra-foto.jpg",
    incomingImageAlt: "Descrição da foto.",
    afterIncoming: [{ direction: "outgoing", text: "Reação fixa." }],
    choices: [/* três escolhas autoradas */]
  }]
}
```

Regras atuais:
- imagem é conteúdo autorado e deve ter `Alt` descritivo;
- a interface abre a imagem em lightbox, sem navegar para fora da conversa;
- `afterResponse`, `afterIncoming` e `prefaceOutgoing` existem para preservar sequências escritas pelo autor sem transformar cada frase em uma escolha;
- cada personagem avança no máximo uma etapa de rota por noite global;
- o teto romântico é por etapa social/personagem, não por calendário global;
- marcos presenciais atuais ficam nas etapas 3 e 6 da rota individual, com thresholds 30% e 70%;
- não adicionar texto narrativo em componentes React para completar lacunas de autoria.
