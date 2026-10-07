# EDIT HERE — RESSONÂNCIA v0.2.39

Se você quer alterar o jogo sem procurar código, comece aqui.

## Conteúdo

- **Heróis:** `content/characters/heroes.ts`
- **Fotos:** `content/characters/portraits.ts`
- **Banco de eventos/ocorrências:** `content/incidents/caseBank.ts`
- **Composição diária / sorteio:** `content/incidents/dailyPool.ts`
- **Balanceamento operacional:** `content/config/balance.ts`
- **Configuração social/romance:** `content/config/social.ts` — pesos 100/50/30 são metadados; a porcentagem é derivada da etapa da rota.
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

`content/config/social.ts`: 100 = +7, 50 = +5, 30 = +3 por mensagem; teto por etapa 18 por personagem. O percentual é feedback de afinidade e NÃO bloqueia dates; etapas 3 e 6 liberam os encontros.

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


## Regra de autoria de dates — v0.2.10
Não criar botão externo/genérico para milestones 3/6. O convite deve existir no texto da própria conversa e a escolha que aceita a saída deve carregar `exclusiveOutingDay` e `vnSceneId`. Assim, terminar a etapa anterior nunca dispara o encontro.


## Regra de percentual de romance — v0.2.11

Não escrever conteúdo supondo ganho de XP romântico. O percentual exibido é estrutural: etapas concluídas / total de etapas da rota. As escolhas 100/50/30 podem alterar confiança, intimidade, atração, tensão etc., mas não mudam a porcentagem.


## Fluxo de iniciativa no NEXO — v0.2.15
Para o Analista iniciar um turno, use `openingOutgoing` (abertura da cena) ou `prefaceOutgoing` (follow-up): o jogador precisará apertar Enviar. Para o personagem iniciar, use `opening`/`incoming`; essa mensagem pode aparecer como recebida/não lida antes de abrir a thread.

## v0.2.21 — briefing desktop
O briefing desktop foi redistribuído para caber na primeira viewport: equipe sob narrativa à esquerda, requisitos/radar à direita, CTA no rodapé. Não reintroduzir scroll como solução padrão antes de redistribuir espaço ocioso. Mobile mantém layout próprio.


## v0.2.22 — briefing / requisitos
- Layout desktop da seleção: `app/globals.css` (bloco v0.2.22).
- Quantização de requisito de atributo: `game/simulation/resolveIncident.ts`, dentro de `getMissionAssessment`.
- Requisitos passam a pontos inteiros com `Math.round(baseRequired * dayScale)`.
- Não reintroduzir casas decimais na UI sem decisão explícita de design.


## v0.2.23 — briefing sobre mapa / seleção pela barra de agentes
- Estrutura do briefing e integração com o roster: `app/agencia/page.tsx`.
- Layout desktop contextual sobre o mapa: `app/agencia/agency.css` (regra consolidada; origem histórica v0.2.23).
- Clique no retrato do roster usa `onSelect`; o botão `ABRIR FICHA` continua separado: `components/HeroCard.tsx`.
- No desktop não duplicar os sete cards dentro do briefing. No mobile, a seleção interna continua disponível porque a barra de agentes não permanece visível atrás do full-screen.


### v0.2.24 — legibilidade do briefing
- Ajustes visuais do briefing contextual ficam no bloco `v0.2.24` ao final de `app/globals.css`.
- Não alterar fórmulas/requisitos para reproduzir este ajuste: ele é somente tipográfico.


### v0.2.25 — legibilidade global da Central
- A regra histórica `v0.2.25`, hoje consolidada em `app/agencia/agency.css`, amplia apenas tipografia funcional no desktop.
- Não aumentar o radar para resolver legibilidade textual.


## Central v0.2.26–v0.2.29
- Orquestração/estado: `app/agencia/page.tsx`.
- Superfícies visuais: `components/agency/`.
- CSS da Central: `app/agencia/agency.css`.
- Save/export/import: `lib/save.ts` + `components/agency/AgencyHeader.tsx`.
- Crop de encontros: campos `backgroundPositionDesktop` / `backgroundPositionMobile` em `content/narrative/outings.ts`.
Não mover falas, casos ou regras de cálculo para os componentes de UI.


## Menu v0.2.38
- Textos: `content/ui/menu.ts`
- Layout: `app/page.tsx`
- Estilo/fade/crop: bloco `v0.2.38` no final de `app/globals.css`
- Background: `public/menu/cidade-noturna.webp`


## Menu v0.2.39
- Fluxo/painéis: `app/page.tsx`.
- Sessão local preparada para backend: `lib/account.ts` (não armazena senha).
- Preferências locais: `lib/settings.ts`.
- Timing de mensagens do NEXO lê `dialogueRevealDelay()` em `components/PhoneDialogueEngine.tsx`.
- Estilo/transições: bloco `v0.2.39` no final de `app/globals.css`.
- `app/login/page.tsx` e `app/novo-jogo/page.tsx` são aliases de compatibilidade que retornam aos painéis do menu.


- Lysandro D1–D6 já está autorado em `content/dialogues/post-shift/lysandro.ts`; não voltar aos placeholders principais.
## Música ambiente (Beta 1)

- Dispatch/Central: `public/audio/aphex-twin-tha.mp3`
- NEXO/chat: `public/audio/aphex-twin-delphium.mp3`
- Mapeamento de rota/player: `components/BackgroundMusic.tsx`
- Volume padrão/persistência: `lib/settings.ts` (`musicVolume`, padrão `0.1`)
- Controle da engrenagem da Central: `components/agency/AgencyHeader.tsx`

Não altere o save schema para volume: essa preferência é local da instalação e não pertence à campanha.

