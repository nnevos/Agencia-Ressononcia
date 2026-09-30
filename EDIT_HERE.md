# EDIT HERE — RESSONÂNCIA v0.2.8

Se você quer alterar o jogo sem procurar código, comece aqui.

## Conteúdo

- **Heróis:** `content/characters/heroes.ts`
- **Fotos:** `content/characters/portraits.ts`
- **Banco de eventos/ocorrências:** `content/incidents/caseBank.ts`
- **Composição diária / sorteio:** `content/incidents/dailyPool.ts`
- **Balanceamento operacional:** `content/config/balance.ts`
- **Balanceamento social/romance:** `content/config/social.ts`
- **Turno/equipe:** `content/config/gameplay.ts`
- **Mensagens durante o expediente:** `content/messages/operations.ts`
- **Conversas pós-expediente:** `content/dialogues/post-shift/`
- **Introdução:** `content/narrative/introduction.ts`
- **Tutorial:** `content/narrative/tutorial.ts`
- **Menu:** `content/ui/menu.ts`
- **Ressonância:** `content/relationships/resonance.ts`

## Manuais

- `content/README.md`
- `docs/authoring/WHERE_TO_EDIT.md`
- `docs/authoring/CONTENT_SCHEMA.md`
- `docs/authoring/ARCHITECTURE.md`

## Regra

Se você quer mudar **o que está escrito ou o que aparece**, altere `content/`.
Se quer mudar **como o jogo calcula**, altere `game/` e atualize o GDD/failsafe.

## Campanha social D1-D6 (v0.1.5)

Para testar agora: `content/dialogues/post-shift/placeholders.ts`.
Para substituir saidas/dates: `content/narrative/outings.ts`.

Esses arquivos contem PLACEHOLDERS de QA. A tela e o motor ja sao data-driven; quando chegarem os dialogos finais, troque o conteudo preservando IDs sempre que possivel.

Roadmap ate o estado em que so falta conteudo: `docs/design/CONTENT_COMPLETE_ROADMAP.md`.

## Balanceamento social atual

`content/config/social.ts`: 100 = +7, 50 = +5, 30 = +3 por mensagem; teto diário 18 por personagem; thresholds 30% (etapa 3) e 70% (etapa 6).

## Progressão atual

`content/config/balance.ts`: thresholds de nível 2–6 = 50, 130, 230, 360 e 520 XP acumulado.


## Dev Mode QA

Na Central, abra `DEV` e use `FINALIZAR EXPEDIENTE 100%` para resolver o restante do expediente com Sucesso e ir diretamente para Desenvolvimento. Implementação: `components/DevTools.tsx` + `game/simulation/devTools.ts`.


## Atualização v0.2.0 (2026-09-29)
Rotas sociais agora são individuais por personagem e independentes do dia global. Campanha continua após Dia 6. Técnicas relevantes têm efeito direto (+6 p.p., cap +12), XP pós-Nv6 alimenta Maestria 1–5 e dificuldade pós-D6 alterna ondas sem inflação infinita. Save schema v9. Ver `docs/design/ROUTE_AND_LATEGAME_SYSTEM.md`.


## Banco de ocorrências v0.2.1

Fonte editorial aprovada: `docs/design/RESSONANCIA_BANCO_DE_CASOS_v0_2_1_APROVADO.docx`. Para editar texto, requisitos, tags, peso, cooldown, afinidades e tempos já implementados, altere `content/incidents/caseBank.ts`. Para alterar quantidades por tipo de dia ou lógica de sorteio, altere `content/incidents/dailyPool.ts`.

## Playtest v0.2.4

- Ritmo do turno: `content/config/gameplay.ts` (10 minutos reais).
- Quantidade/ondas de casos: `content/incidents/dailyPool.ts` (10 respiro / 11 normal / 12 pressão / 13 pico).
- Curva, condição e bônus: `content/config/balance.ts`.
- Regra social: no máximo uma etapa de rota por personagem por noite global; o jogador ainda pode conversar com todos na mesma noite.
- A lista de contatos não mostra barra, porcentagem ou número de rota; o percentual de ROMANCE aparece apenas no cabeçalho da conversa privada.


## Onboarding v0.2.4
- roteiro/apresentação: `content/narrative/introduction.ts`
- textos do tutorial operacional: `content/narrative/tutorial.ts`
- menu: `content/ui/menu.ts`
- o primeiro caso usa `pool-e-04`; preserve esse ID enquanto o onboarding depender dele.


## Atualização v0.2.6 (2026-09-29)

Polimento do onboarding após playtest: texto de privacidade do NEXO reduzido à regra essencial; imagem autoral de Edison integrada à introdução e aos elementos do tutorial; card de conclusão redesenhado; chat operacional passa a acompanhar automaticamente a mensagem mais recente usando scroll interno; e a liberação do banco após E-04 usa cadência compacta, com último spawn bem antes do fim do turno para evitar vazios longos e chamados tardios. Save permanece v9.


## Rota Yuki autorada — v0.2.8

- Conversas etapas 1–6: `content/dialogues/post-shift/yuki.ts`.
- Fotos: `public/nexo/yuki/`.
- Primeiro outing e segundo date: `content/narrative/outings.ts` (`outing-day3-yuki` e `outing-day6-yuki`).
- Os outros personagens ainda usam placeholders de QA.
- Para anexar foto a uma DM, use os campos documentados em `content/README.md`; não hardcode imagem no componente.
