# Tutorial Progressivo v2

## Objetivo
Ensinar sistemas quando eles se tornam acionáveis, sem interromper o jogador com explicações antecipadas e sem alterar balanceamento.

## Regra
- O tutorial inicial de Dispatch continua restrito ao primeiro E-04.
- Tutoriais contextuais posteriores usam flags persistentes no save v10 e aparecem apenas uma vez por campanha.
- As flags não são gates mecânicos: dispensar uma explicação nunca muda chance, XP, recompensa ou disponibilidade.
- Edison explica a regra; o NEXO e a interface continuam reforçando o sistema organicamente.

## Gatilhos
1. **Desenvolvimento** — primeira entrada com qualquer evolução obrigatória pendente.
2. **Técnica / especialização / evolução** — primeira vez que o próximo nível for 2, 4 ou 6.
3. **Atributo** — primeira vez que o próximo nível for 3 ou 5.
4. **Maestria** — primeira entrada em Desenvolvimento em que o agente exibido tenha Maestria > 0.
5. **Equipe e Ressonância** — primeira vez que 2+ agentes forem selecionados no briefing após o tutorial inicial.
6. **Combo** — primeira vez que a equipe selecionada ativar um combo especial registrado.
7. **Condição** — primeira vez que o briefing sinalizar agente cansado ou machucado.
8. **NEXO pós-expediente** — primeira entrada na tela social da campanha.
9. **Date** — primeira noite em que houver convite presencial pendente.

## Desenvolvimento
O fluxo oficial permanece:
`XP arquivado -> milestones enfileirados -> Desenvolvimento -> resolver todos os upgrades -> pós-expediente`.

Se XP suficiente gerar vários níveis, cada milestone deve ser resolvido em sequência. O botão de continuação só libera quando `developmentComplete()` for verdadeiro.

- Níveis 2/4/6: escolha de técnica/especialização/evolução.
- Níveis 3/5: prévia de +1 atributo no radar e confirmação explícita.
- Pós-Nv6: XP continua alimentando Maestria 1–5 automaticamente.

## Dispatch
Equipe maior não recebe bônus automático. O tutorial contextual deve reforçar que múltiplos agentes só ajudam ao cobrir requisitos, tags, condição, Ressonância ou combos.

Combos só são explicados quando descobertos por seleção real. Não revelar lista completa antecipadamente.

## NEXO e Dates
Pós-expediente permite conversar com vários contatos ou nenhum; cada rota avança no máximo uma etapa por noite.

Convite de Date é persistente e separado da conversa. `IR PARA ENCONTRO` continua usando o gate explícito já existente e apenas uma saída presencial pode ser escolhida por noite.
