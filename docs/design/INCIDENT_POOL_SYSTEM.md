# Banco de Ocorrências e Afinidades de Poder — v0.2.2

## Fonte editorial aprovada

O banco oficial de pré-produção é `docs/design/RESSONANCIA_BANCO_DE_CASOS_v0_2_1_APROVADO.docx`.
Ele contém 48 casos aprovados para implementação mecânica: 12 fáceis, 12 médios, 12 difíceis e 12 crises.

Os textos, atributos, tags, prazo, duração, `minDay`, `weight`, `cooldown` e intenções de design desse documento foram convertidos para `content/incidents/caseBank.ts`.

## Seleção diária

O expediente não usa mais uma lista fixa de 10 ocorrências. `content/incidents/dailyPool.ts` monta o dia de forma determinística a partir de jogador + dia global.

Perfis de dia:

- **respiro**: 5 fáceis / 4 médias / 1 difícil / 0 crises;
- **normal**: 4 fáceis / 5 médias / 2 difíceis / 0 crises;
- **pressão**: 3 fáceis / 5 médias / 4 difíceis / 0 crises;
- **pico**: 2 fáceis / 5 médias / 5 difíceis / 1 crise.

Dias 1–6: respiro → normal → normal → pressão → pressão → pico.
Depois do Dia 6, o padrão acompanha a filosofia de ondas: respiro / normal / pressão / normal / pressão / pico / respiro / normal e repete.

## Regras de elegibilidade

- `minDay`: caso não aparece antes do dia permitido;
- `weight`: peso relativo de sorteio dentro da faixa;
- `cooldownDays`: reduz fortemente o peso de um caso durante esse intervalo; repetição no dia imediatamente seguinte recebe penalidade ainda maior;
- cooldown é uma supressão probabilística determinística, não um bloqueio absoluto, para que a composição do expediente nunca trave por falta de casos;
- a seleção é determinística para o mesmo jogador/dia, portanto save/reload não rerrola o expediente.

## Atributos

Os pesos editoriais passam a ser interpretados literalmente:

- peso 3 = **ESSENCIAL**;
- peso 2 = **IMPORTANTE**;
- peso 1 = **APOIO**.

Na adequação global, categorias presentes recebem pesos 60% / 30% / 10%, normalizados quando uma categoria não existe. Isso evita tratar automaticamente os dois primeiros atributos como essenciais.

## Afinidade contextual de poder

Alguns casos têm `powerAffinityHeroIds`. Afinidade é uma solução extraordinária particularmente adequada ao contexto, não um requisito exclusivo.

- cada herói selecionado com afinidade contextual concede **+8 p.p.** à estimativa;
- bônus de afinidade tem teto de **+12 p.p. por equipe**;
- a UI mostra a afinidade recomendada e marca quando o herói correspondente está selecionado;
- técnicas continuam sendo outro sistema: +6 p.p. quando uma técnica desbloqueada cobre capacidade recomendada, até +12 p.p. por equipe;
- afinidade e técnica podem coexistir porque representam coisas diferentes: natureza do poder vs. aplicação aprendida.

Exemplos aprovados no banco:

- Demétria/Terra: colapsos, túneis, sustentação estrutural;
- Alexandra/Água: alagamentos, pressão e infraestrutura hidráulica;
- Elysia/Energia: rede elétrica, arcos e panes energéticas;
- Eros/Ar: evacuação, multidões, reconhecimento e reposicionamento;
- Yuki/Frio: controle térmico e contenção;
- Hélio/Fogo: incêndio/calor quando aplicação controlada ajuda;
- Lysandro: ruptura, contenção/interceptação física quando explicitamente indicado pelo caso.

## Compatibilidade

Os dez IDs antigos `inc-001`…`inc-010` foram preservados dentro do banco para que saves em andamento continuem encontrando as ocorrências históricas. Casos novos usam IDs estáveis `pool-e-*`, `pool-m-*`, `pool-h-*` e `pool-c-*`.

O save permanece schema v9: a composição do dia é materializada em `shift.incidents`, então não foi necessário adicionar estado persistente novo.

## Rebalance de playtest v0.2.2
Perfis usam 10/11/12/13 casos. Spawns ficam mais próximos em pequenas ondas. Afinidade contextual vale +8 p.p. por match, teto +12. Escala D1-D6: 0.60/0.68/0.76/0.86/0.96/1.05. O objetivo é criar disputa pelo roster já nos primeiros dias sem manter todos os dias em pressão máxima.
