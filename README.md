# Agência Ressonância — v0.2.6 · Banco de casos + afinidades de poder

Novo baseline consolidado a partir da linha funcional v0.9.14.

## Executar

No Windows, use `Ressonancia.exe` como launcher local. O projeto continua sendo Next.js/React/TypeScript.

## Onde editar conteúdo

Comece por:

- `content/README.md`
- `docs/authoring/WHERE_TO_EDIT.md`
- `docs/authoring/CONTENT_SCHEMA.md`

A regra é simples: **conteúdo em `content/`; lógica em `game/`; telas em `app/`**.

## Fluxo jogável atual

Menu → Novo jogo → Introdução/Tutorial → Central → Briefing/Despacho → Resultado → Desenvolvimento → NEXO pós-expediente → próximo dia.

No pós-expediente, o jogador pode conversar com qualquer personagem com cena disponível, com vários ou com ninguém. Cada personagem mantém uma thread contínua no NEXO, com suporte a conversas longas, autoscroll e progresso romântico opcional.

## Documentação de continuidade

Leia `PROJECT_CONTEXT.md` e `docs/failsafe/` antes de continuar desenvolvimento em outra sessão.


## v0.2.1

Dispatch agora usa banco data-driven de 48 ocorrências aprovadas, composição diária em ondas e afinidades contextuais de poder. Veja `docs/design/INCIDENT_POOL_SYSTEM.md`.

## v0.2.6
Playtest rebalance: NEXO limitado a uma etapa/personagem/noite, lista de contatos limpa, relatórios contextuais, turno de 10 minutos, mais ocorrências/overlap e fadiga mais relevante.
