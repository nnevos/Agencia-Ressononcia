# NEXO Operacional Contextual v2

Status: implementado em v0.2.63.

## Objetivo

Fazer o grupo `Guerreiros Elementais` reagir ao caso real e à equipe realmente despachada, sem transformar o NEXO em combate jogável nem duplicar regras de Dispatch.

## Hierarquia de seleção de texto

1. Comentário específico da ocorrência após o spawn (`eventComments`).
2. Durante a missão, fala específica de afinidade de poder quando o herói compatível está presente (`affinityMissionLines`).
3. Se não houver afinidade específica, interação autorada do par quando a relação já existe em Ressonância (`pairDialogue`).
4. Se não houver par autorado, fala de especialidade baseada nas tags da ocorrência (`specialtyMissionLines`).
5. Fallback por composição de equipe (`teamTemplates`), sempre citando o colega para evitar mensagens idênticas entre times diferentes.
6. Ao concluir, retorno por personagem + resultado (`outcomeLines`) e, quando há pelo menos dois agentes, reação do segundo membro (`teamOutcomeReactions`).

## Regras

- O texto não altera chance, duração, resultado, afinidade ou Ressonância; ele apenas lê esses dados.
- Afinidade continua sendo vantagem contextual, nunca requisito obrigatório.
- Relações negativas existentes podem produzir coordenação mais seca, mas não inventam rivalidade nova.
- Combos já registrados aparecem através dos pares autorados correspondentes; não criamos combo mecânico novo.
- Times solo continuam recebendo mensagens contextuais por ocorrência/tag.
- Times de 2–3 membros geram falas diferentes conforme quem foi enviado e em qual ordem.
- O canal permanece somente leitura durante o expediente.

## Fonte de autoria

- Runtime: `content/messages/operations.ts`
- Seleção/ordenação: `game/data/operationsChat.ts`
- Documento revisável: `docs/authoring/chat-scripts/NEXO - Guerreiros Elementais.docx`
- Banco de casos: `content/incidents/caseBank.ts`
- Relações/combos: `content/relationships/resonance.ts`

## Cobertura v0.2.63

- 48/48 casos atualmente presentes em `caseBank.ts` têm comentário pré-despacho específico, incluindo os IDs legados `inc-*`.
- 18 casos com afinidade contextual têm linha específica para o(s) herói(s) compatível(is).
- Os pares já declarados em Ressonância e os cinco combos existentes possuem coordenação autorada.
- Qualquer outra composição recebe fallback de equipe com nome do colega, mantendo variação por time.
- Resultados Sucesso / Sucesso com custo / Sucesso parcial / Falha possuem retorno de voz por personagem e reação de companheiro.
