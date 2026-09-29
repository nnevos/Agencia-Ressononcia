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
