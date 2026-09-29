# CONTEÚDO EDITÁVEL — RESSONÂNCIA

Esta pasta é a **fonte oficial para autoria**. Se você quer mudar texto, evento, personagem ou balanceamento, comece aqui.

## Onde editar cada coisa

| Quero alterar... | Arquivo/pasta |
|---|---|
| dados/poderes/atributos/técnicas dos heróis | `content/characters/heroes.ts` |
| ocorrências, horários, requisitos, risco e duração | `content/incidents/day01.ts` |
| números de Vida/Energia, XP, chance e custos | `content/config/balance.ts` |
| duração do expediente e tamanho da equipe | `content/config/gameplay.ts` |
| Ressonância e combos | `content/relationships/resonance.ts` |
| mensagens NEXO ligadas a eventos | `content/messages/operations.ts` → `eventComments` |
| mensagens NEXO durante missão | `content/messages/operations.ts` → `missionLines` |
| mensagens do grupo sem relação com eventos | `content/messages/operations.ts` → `ambientMessages` |
| conversas privadas pós-expediente | `content/dialogues/post-shift/` |
| opções que o jogador pode responder | dentro de cada cena em `content/dialogues/post-shift/` |
| introdução | `content/narrative/introduction.ts` |
| tutorial | `content/narrative/tutorial.ts` |
| textos do menu principal | `content/ui/menu.ts` |

## Regra de ouro

- `content/` = o que o autor edita.
- `game/` = como o jogo calcula/interpreta.
- `app/` e `components/` = como o jogo mostra na tela.

Evite colocar falas novas diretamente em `app/*.tsx`. Se um texto faz parte da história, evento ou UI persistente, ele deve morar aqui.
