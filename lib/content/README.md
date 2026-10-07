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
| mensagens NEXO por afinidade/tag/time/resultado | `content/messages/operations.ts` → `affinityMissionLines`, `specialtyMissionLines`, `pairDialogue`, `teamTemplates`, `outcomeLines` |
| fallback de voz NEXO durante missão | `content/messages/operations.ts` → `missionLines` |
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

- Yuki, Elysia, Lysandro, Hélio, Demétria, Alexandra e Eros etapas 1–6 já possuem autoria integrada. Eros preserva cada fala-base fornecida pelo autor como opção base; desde v0.2.60, os turnos recebem duas alternativas estruturais adicionais do Analista para cumprir o padrão de exatamente 3 respostas, sem alterar as falas de Eros, os acontecimentos ou o cânone.
- `narrative/outings.ts`: Yuki, Elysia, Lysandro, Hélio, Demétria, Alexandra e Eros possuem dates autorados nos marcos 3 e 6. A rota `/encontro` consome background + texto diretamente daqui.
- Ao substituir pelo conteudo final, preserve IDs sempre que possivel para que saves de teste continuem reconhecendo escolhas ja feitas.

Meta de arquitetura: `docs/design/CONTENT_COMPLETE_ROADMAP.md`.

### Regra de romance por etapa

- A porcentagem `ROMANCE` é calculada por etapas principais concluídas / total de etapas principais da rota da rota.
- Pesos 100/50/30 continuam nas escolhas como metadado autoral e podem acompanhar deltas relacionais, mas não concedem pontos.
- Não existe teto de XP romântico por mensagem; campos antigos permanecem apenas por compatibilidade do save.
- O percentual não bloqueia saída/date; etapas 3 e 6 liberam os marcos presenciais pelo convite autorado, respeitando uma saída por noite global.


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

Desde v0.2.14, `openingOutgoing` e `prefaceOutgoing` significam que **o Analista inicia aquele turno**: a UI prepara o texto autorado no compositor e espera o jogador apertar Enviar. Não use esses campos para uma mensagem que já deveria existir no histórico ao abrir a thread. Se o personagem inicia a conversa, deixe o início como `opening`/`incoming`; essa mensagem pode aparecer como recebida/não lida antes de o chat ser aberto.

A rota de Yuki (estágios 1–6) é a primeira rota substituída por conteúdo autoral real. As imagens usadas ficam em `public/nexo/yuki/`; os dates vivem em `content/narrative/outings.ts`.


### Dates e convites (v0.2.10)
O encontro não é inferido apenas por `routeStage`. A etapa 3/6 precisa terminar em uma escolha autorada com `exclusiveOutingDay` + `vnSceneId`; depois dessa escolha, o NEXO exibe um CTA persistente `IR PARA ENCONTRO`. A escolha conclui o chat, mas não reserva a noite nem avança a rota. O CTA permanece entre dias até o encontro ser concluído.


### v0.2.11 — percentual por etapa de rota

- `ROMANCE %` não usa mais pontos por mensagem.
- A UI calcula o valor a partir de `routeStage` e da quantidade de etapas autoradas daquela rota.
- `romanceAffinity: 100 | 50 | 30` continua válido como metadado de intenção/afinidade da escolha e pode acompanhar deltas relacionais, mas não concede percentual.
- Campos antigos `romanceProgress`, `romanceEarnedByStage` e `minRomanceProgress` são legado de compatibilidade e não devem orientar nova autoria.


## Outings — enquadramento responsivo (v0.2.27)
`content/narrative/outings.ts` pode definir `backgroundPositionDesktop` e `backgroundPositionMobile` por cena. Use esses campos para ajustar crop de uma imagem sem criar CSS ou página específica para personagem.

## v0.2.37 — padrão de conversa aplicado à Yuki

A rota de Yuki mantém o roteiro autoral existente, mas falas automáticas importantes do Analista foram convertidas em turnos de escolha. O padrão recomendado para rotas finais é: beats curtos, exatamente 3 respostas por turno, uma alternativa de tom neutro/casual e variações mais brincalhonas/íntimas conforme o estágio. Não transformar a voz dos personagens para uniformizar: o padrão é estrutural, não de personalidade.


## Dates — leitor linear v0.2.51
`content/narrative/outings.ts` continua armazenando o texto completo e os `beats` de cada Date. A UI pode paginar automaticamente um bloco longo para leitura, mas não altera nem duplica a autoria. Dates permanecem sem escolhas. Use `beats` somente quando a narrativa realmente troca de ambiente/background; `continueLabel` do beat aparece no fim daquele trecho.


## Estrutura social e memórias — v0.2.52
- `content/social/routeManifest.ts` declara os sete personagens da rota social e o padrão principal D1–D6 com Dates nos marcos 3/6.
- `content/validate.ts` verifica que cada rota possui exatamente uma cena principal em cada estágio 1–6 e exatamente um Date em 3/6.
- O NEXO cria uma galeria apenas a partir de imagens que já foram alcançadas em turnos respondidos; não é necessário duplicar cadastro de fotos.
- Dates concluídos podem ser relidos em modo REPLAY. Replay e QA preview não alteram flags, milestones ou `routeStage`.
- `/qa/social` é ferramenta interna de teste; não é conteúdo narrativo nem substitui o fluxo normal.


## Robustez social v0.2.56
- `content/validate.ts` agora também protege IDs/flags únicos, mídia com alt, referências de Date e coerência dos convites finais nas rotas autoradas.
- Ao adicionar imagens locais ao NEXO/Dates, rode `npm run validate:social-assets` para confirmar que todos os caminhos existem em `public/`.
- Validações não devem inventar ou reescrever conteúdo: apenas rejeitam estrutura inconsistente.


## v0.2.59 — nome e pronomes do jogador
- O Novo Jogo coleta nome e pronomes (`Ele/dele`, `Ela/dela`, `Elu/delu`) e salva essa preferência no perfil do jogador.
- Textos autorais devem preferir construção neutra. Use `{{playerName}}` quando o nome realmente melhora a frase; não substitua cegamente “Analista”.
- Quando um pronome for necessário, use `{{playerSubject}}`, `{{playerSubjectCap}}`, `{{playerPossessive}}` e `{{playerPossessiveCap}}`.
- Para preservar uma fala cuja flexão é parte da voz do personagem, use excepcionalmente `{{playerForm:masculino|feminino|neutro}}`.
- “Analista” pode permanecer quando é cargo/função. Em narração, prefira reescrever a frase de modo neutro em vez de usar artigo generificado.


## v0.2.61 — NEXO e tutorial seguro
- A lista de contatos do NEXO usa atividade real recente para reordenar threads. O motor registra a última atividade de envio em flags `nexo:activity:*`; mensagens recebidas ainda não respondidas usam a hora autorada como fallback.
- Conversas cujo turno começa pelo Analista e ainda não foi enviado não devem ganhar prioridade apenas pelo horário editorial da cena.
- A abertura coletiva do grupo NEXO revela respostas em sequência; o texto continua vindo de `content/narrative/introduction.ts`.
- O caso tutorial E-04 permanece o primeiro chamado, mas o relógio do expediente fica pausado enquanto o jogador ainda decide o primeiro despacho, impedindo expiração/softlock do onboarding.


## v0.2.62 — mensagens do grupo NEXO
- A abertura do grupo `Guerreiros Elementais` continua em `content/narrative/introduction.ts`, agora com respostas revisadas conforme a voz dos sete chats autorados.
- Mensagens operacionais do grupo ficam em `content/messages/operations.ts`: comentários de ocorrência, três atualizações genéricas de missão por herói e conversa ambiente.
- `OPERATIONS_CONTENT_IS_PLACEHOLDER` agora é `false`; esses textos são conteúdo autorado/revisável.
- A cópia editorial para revisão está em `docs/authoring/chat-scripts/NEXO - Guerreiros Elementais.docx`. Alterações aprovadas no DOCX devem ser sincronizadas com os dois arquivos de runtime.


## v0.2.63 — NEXO Operacional Contextual v2
- Os 48 casos ativos do banco possuem comentário pré-despacho específico, incluindo os dez IDs legados `inc-*`.
- Mensagens de missão consideram, em prioridade, afinidade contextual, par de Ressonância, especialidade/tag e composição da equipe.
- Times de 2+ agentes produzem interação entre membros e reação pós-resultado; times diferentes deixam de compartilhar a mesma sequência genérica.
- O sistema é apenas narrativo: não altera chance, resultado, duração, afinidade nem valores de Ressonância.
- Revisão autoral: `docs/authoring/chat-scripts/NEXO - Guerreiros Elementais.docx`.


## Tutorial progressivo
- Cópias e flags dos tutoriais contextuais: `content/narrative/progressiveTutorial.ts`.
- Regras de design: `docs/design/TUTORIAL_PROGRESSIVO_V2.md`.


## v0.2.65 — Edison Tutorial UX v3
- Cópia curta/contextual continua em `narrative/progressiveTutorial.ts`.
- O registro consultável do tutorial fica em `narrative/agencyManual.ts`.
- A camada visual unificada de Edison vive em `components/EdisonCoach.tsx`; não hardcode nova cópia tutorial em páginas quando puder ser dado.
- Flags representam ação demonstrada sempre que existir uma ação concreta (upgrade, atributo, abertura de conversa, CTA de Date).

## Beta 1 — regra de infraestrutura
Conteúdo em `content/` não deve importar `lib/supabase/*` nem depender de sessão remota. Supabase sincroniza estado de save; não é fonte de autoria/cânone nesta Beta.
