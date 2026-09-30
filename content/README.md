# CONTEÚDO EDITÁVEL — RESSONÂNCIA

Esta pasta é a **fonte oficial para autoria**. Se você quer mudar texto, evento, personagem ou balanceamento, comece aqui.

## Onde editar cada coisa

| Quero alterar... | Arquivo/pasta |
|---|---|
| dados/poderes/atributos/técnicas dos heróis | `content/characters/heroes.ts` |
| banco de ocorrências, requisitos, risco, duração e afinidades | `content/incidents/caseBank.ts` |
| composição diária, pesos/cooldown e sorteio | `content/incidents/dailyPool.ts` |
| números de Vida/Energia, XP, chance, custos e curva de dificuldade diária | `content/config/balance.ts` |
| orçamento social, feedback de romance e pesos 100/50/30 | `content/config/social.ts` |
| duração do expediente e tamanho da equipe | `content/config/gameplay.ts` |
| Ressonância e combos | `content/relationships/resonance.ts` |
| mensagens NEXO ligadas a eventos | `content/messages/operations.ts` → `eventComments` |
| mensagens NEXO durante missão | `content/messages/operations.ts` → `missionLines` |
| mensagens do grupo sem relação com eventos | `content/messages/operations.ts` → `ambientMessages` |
| conversas privadas pós-expediente | `content/dialogues/post-shift/` |
| opções que o jogador pode responder | dentro de cada cena em `content/dialogues/post-shift/` |
| conversas longas / turnos adicionais | `followUps` dentro da cena pós-expediente |
| introdução | `content/narrative/introduction.ts` |
| tutorial | `content/narrative/tutorial.ts` |
| textos do menu principal | `content/ui/menu.ts` |

## Regra de ouro

- `content/` = o que o autor edita.
- `game/` = como o jogo calcula/interpreta.
- `app/` e `components/` = como o jogo mostra na tela.

Evite colocar falas novas diretamente em `app/*.tsx`. Se um texto faz parte da história, evento ou UI persistente, ele deve morar aqui.

## v0.1.4 — campanha social de QA D1-D6

- Yuki etapas 1–6 já usa autoria final aprovada. As demais rotas permanecem **PLACEHOLDER** de QA em `dialogues/post-shift/placeholders.ts`, para testar histórico, romance, exclusividade e progressão até receberem roteiro final.
- `narrative/outings.ts`: cenas presenciais **PLACEHOLDER** dos Dias 3 e 6. A rota `/encontro` consome background + texto diretamente daqui.
- Ao substituir pelo conteudo final, preserve IDs sempre que possivel para que saves de teste continuem reconhecendo escolhas ja feitas.

Meta de arquitetura: `docs/design/CONTENT_COMPLETE_ROADMAP.md`.

### Regra de romance por mensagem

- 100: +7 pontos;
- 50: +5 pontos;
- 30: +3 pontos;
- teto diário: 18 por personagem;
- o tamanho da conversa não reduz o valor de cada resposta; ao atingir o teto, mensagens extras continuam narrativamente, mas não aumentam romance naquele dia;
- o percentual de romance não bloqueia saída/date; etapas 3 e 6 liberam os marcos presenciais, respeitando uma saída por noite global.


## v0.2.1 — banco de ocorrências

- `incidents/caseBank.ts`: 48 casos aprovados, 12 por faixa.
- `incidents/dailyPool.ts`: respiro/normal/pressão/pico, sorteio determinístico por jogador+dia, `minDay`, `weight` e `cooldownDays`.
- `powerAffinityHeroIds`: vantagem contextual forte de poder. Cada afinidade ativa vale +10 p.p., com teto +15 p.p. por equipe. Não é requisito exclusivo.
- pesos de atributo: 3=ESSENCIAL, 2=IMPORTANTE, 1=APOIO.
- o antigo `day01.ts` permanece apenas como referência/compatibilidade histórica; não é mais a agenda ativa do Dispatch.

## v0.2.3 — ritmo e pressão

O expediente dura 10 minutos reais. Perfis diários usam 10/11/12/13 ocorrências e o gerador aproxima parte dos spawns em pequenas ondas. Custos de Energia: Sucesso -2, Sucesso com custo -3, Sucesso parcial -4, Falha -5. Afinidade contextual vale +8 p.p., cap +12.

No social, concluir uma etapa bloqueia a próxima etapa daquela mesma personagem até a próxima noite global. Isso impede consumir uma rota inteira no Dia 1 sem impedir conversar com todos os sete no mesmo pós-expediente.

### v0.2.5 — onboarding
`content/narrative/tutorial.ts` controla a cópia do primeiro despacho. Durante tutorial ativo, o motor isola E-04 e só libera o banco normal após o relatório; essa regra mecânica fica em `app/agencia/page.tsx`. O NEXO coletivo é corporativo/supervisionável; DMs privadas não são supervisionadas.

## v0.2.9 — fotos e autoria social

Conversas privadas agora podem anexar imagens autoradas. Use `openingImage`/`openingImageAlt` no primeiro turno ou `incomingImage`/`incomingImageAlt` em `followUps`. Para sequências fixas entre escolhas, use `prefaceOutgoing`, `afterIncoming` e `afterResponse`. Esses campos existem para reproduzir roteiro escrito pelo autor sem hardcodar falas em React.

A rota de Yuki (estágios 1–6) é a primeira rota substituída por conteúdo autoral real. As imagens usadas ficam em `public/nexo/yuki/`; os dates vivem em `content/narrative/outings.ts`.
