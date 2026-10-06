# CURRENT STATE — Beta 1 · v0.3.0-beta.5 (2026-10-06)

- Auth simplificado para beta fechado: CRIAR CONTA gera sessão imediata e entra automaticamente.
- Confirmação de e-mail não faz parte do produto; Supabase deve usar Email com `Confirm email` desativado.
- Login, logout, guest e sync local-first/cloud permanecem; save schema continua v10.
- Se o Supabase devolver signup sem sessão, a UI informa a configuração incorreta em vez de iniciar fluxo de confirmação.

# CURRENT STATE — Beta 1 · v0.3.0-beta.4 (2026-10-06)

- GitHub Pages/static export preparado com basePath automático por repositório.
- Deploy oficial via `.github/workflows/pages.yml`; artifact é `out/`.
- Assets públicos são basePath-aware; Dates dinâmicos são pré-gerados para export.
- Supabase continua opcional/local-first; credenciais públicas de staging podem ser injetadas no build via GitHub vars/secrets.
- Save schema v10; gameplay, conteúdo e balanceamento preservados.
- QA GitHub Pages estático: 12/12 PASS. `npm ci` voltou a expirar neste ambiente, portanto o build real fica para o próprio GitHub Actions.
- Próximo gate: workflow real no GitHub + smoke test da URL Pages e rotas diretas.

# CURRENT STATE — Beta 1 · v0.3.0-beta.3 (2026-10-06)

- Refatoração/otimização concluída sem mudança de gameplay/cânone.
- Writes idempotentes não incrementam revisão local nem disparam cloud sync.
- Tick operacional persiste apenas transições relevantes; relógio continua atualizando UI normalmente.
- Cloud sync impede uploads simultâneos e consolida escrita pendente.
- QA: flow 44/44, assets 35/35, Beta1 17/17, refactor 15/15; transpile 90 TS/TSX PASS.
- Save schema v10.

# CURRENT STATE — Beta 1 · v0.3.0-beta.2 (2026-10-06)

- Baseline funcional anterior: v0.2.65 Edison Tutorial UX v3.
- Beta 1 mantém save schema v10 e todo gameplay/content da v0.2.65.
- Persistência agora é local-first com metadados de revisão; `lib/save.ts` continua como API síncrona do gameplay.
- Supabase Auth/save cloud está implementado e pronto para ativação por env + migration/RLS.
- Menu de Conta deixa de ser preview/mock: login/signup reais são usados quando Supabase está configurado; guest continua disponível.
- Conflito no primeiro vínculo entre save local e cloud exige escolha explícita; sincronização automática só começa depois do vínculo.
- `supabase/migrations/001_beta1_game_saves.sql`, `.env.example` e docs de arquitetura/release adicionados.
- QA estático legado: 44/44 PASS; assets sociais: 35/35 PASS; QA arquitetura Beta 1: 17/17 PASS.
- Typecheck global ainda é bloqueado neste pacote limpo pela ausência de `node_modules`; transpile sintático dos arquivos alterados: PASS.
- Gate externo ainda pendente: executar migration/configuração em Supabase de staging e testar signup/login/refresh/logout/sync/conflitos em browser real.

# CURRENT STATE — v0.2.63 · NEXO operacional contextual v2

## v0.2.63 — NEXO operacional contextual v2
- Banco ativo confirmado com 48 ocorrências (12 easy / 12 medium / 12 hard / 12 crisis); 48/48 agora possuem comentário contextual pré-despacho.
- Runtime de `game/data/operationsChat.ts` usa prioridade: afinidade explícita > interação de par já registrada > especialidade/tag > fallback de equipe.
- A composição enviada importa no texto: pares conhecidos conversam entre si e equipes arbitrárias recebem fala que referencia o colega real.
- Retorno distingue sucesso, custo, parcial e falha; segundo membro pode reagir após a conclusão.
- DOCX editorial atualizado em `docs/authoring/chat-scripts/NEXO - Guerreiros Elementais.docx`.
- QA estático: 33/33 PASS; mídia social: 35/35 PASS. Browser/runtime ainda pendente. Save schema v10.
- `tsc --noEmit` não fecha neste ZIP limpo por ausência das dependências/tipos React/Next; não houve erro listado em `operations.ts`/`operationsChat.ts`.

## v0.2.62 — grupo NEXO
- Mensagens coletivas/operacionais revisadas por voz de personagem; documento editorial criado em `docs/authoring/chat-scripts/NEXO - Guerreiros Elementais.docx`.
- Nenhuma regra de gameplay/save foi alterada; QA de navegador dessas mensagens continua pendente.

## Hotfix runtime — 2026-10-06
- Erro de boot reproduzido/diagnosticado a partir da v0.2.59: Alexandra D2–D6 estava registrada duas vezes (autoria + gerador placeholder) e Eros ainda tinha apenas uma resposta por turno.
- Alexandra foi removida apenas dos placeholders principais D2–D6; sua autoria, IDs, falas, fotos e Dates foram preservados.
- Eros agora cumpre exatamente 3 respostas por turno. A opção base é o texto autoral já aprovado; as duas adicionais são variações de resposta do Analista e não mudam falas de Eros, eventos ou cânone.
- D3/D6 de Eros mantêm o mesmo Date em todas as três respostas finais.
- `validateEditableContent()`: PASS; QA estático 25/25; mídia social 35/35.
- Build incremental: **v0.2.60**. Save schema: **v10**.
- Browser E2E completo ainda é o próximo gate geral.

## Integração Eros — 2026-10-06
- Eros D1–D6 integrado a partir do texto fornecido pelo autor nesta sessão, sem correção/reautoria das falas e narração.
- As três fotos fornecidas foram adicionadas em `public/nexo/eros/chat-1.jpg`, `chat-2.jpg` e `chat-3.jpg`, nos pontos FOTO CHAT 1/2/3 indicados pelo autor.
- Dates 1/2 de Eros substituem os placeholders em `content/narrative/outings.ts`; nenhum background novo de Date foi fornecido, portanto o retrato já existente de Eros continua como fundo provisório, sem criação de asset/cânone.
- Eros foi removido dos geradores placeholder e marcado `authored: true`.
- [Histórico v0.2.58, superseded em v0.2.60] Eros inicialmente entrou com uma única escolha; o contrato atual exige 3 respostas por turno mantendo a base autoral intacta.
- `npm run qa:flow:static`: **24/24 PASS**. `npm run validate:social-assets`: **35/35 PASS**.
- Versão permanece **v0.2.58**; save schema permanece **v9**. QA runtime/browser continua pendente.


## QA da retomada — 2026-10-06
- Baseline usada exclusivamente: `Agencia-Ressonancia-v0.2.58-Alexandra-Chat-Dates-2026-10-05.zip`.
- Build permanece **v0.2.58** e save schema permanece **v9**.
- O próximo item de `NEXT_SESSION.md` foi executado por `TESTAR_JOGO.sh`; o ambiente interrompeu instalação/E2E com `TransportTimeoutError`, sem FAIL funcional reproduzido.
- QA estático disponível nesta baseline: `npm run qa:flow:static` = **22/22 PASS**.
- Validação de mídia social: `npm run validate:social-assets` = **32/32 PASS**.
- Nenhum gameplay, narrativa, cânone, balanceamento ou save foi alterado; QA runtime/browser do gate de Date e da rota Alexandra continua pendente.

## QA automatizado de fluxo — 2026-10-05
- Adicionado harness isolado em `qa/playtest/`; ele não é importado pelo gameplay.
- `TESTAR_JOGO.bat` / `TESTAR_JOGO.sh` executam auditoria estática, instalam dependências e rodam Playwright/Chromium.
- Cobertura inicial: gate explícito de Date, reload, URL manual sem `launch=1`, saída/reentrada, conclusão/milestone, replay/QA read-only, Noites 1–7 no modo Só pós-expediente e guards de Introdução/Central/Desenvolvimento.
- Auditoria estática nova: 20/20 PASS. `validate:social-assets`: 28/28 PASS.
- Browser E2E não foi executado neste ambiente porque a instalação do pacote Playwright também expirou por timeout de rede. Não marcar runtime como aprovado até rodar o harness em máquina com dependências completas.


## Baseline
- Base funcional: v0.1.0 Foundation.
- Build incremental atual: **v0.2.58**.
- Save schema: **v9**.
- `content/` continua sendo a fonte oficial de autoria.

## Onboarding / Dispatch
- Fluxo v0.2.7 preservado: menu → onboarding de Edison → grupo NEXO → SDH → primeiro incêndio guiado → Dia 1 normal.
- Edison é homem e deve ser referido no masculino.
- Tutorial continua pulável e o primeiro chamado continua isolado.

## NEXO / Social
- Rotas são individuais por personagem e independentes do dia global.
- Cada personagem avança no máximo uma etapa de rota por noite global.
- Lista de contatos continua sem barra/ROTA; romance aparece apenas dentro da conversa.
- DMs privadas suportam **fotos autoradas**, com visualização ampliada dentro do NEXO.
- O schema de diálogo suporta mensagens fixas do Analista antes/depois de mensagens do personagem, sem hardcode em React (`openingOutgoing`, `prefaceOutgoing`, `afterIncoming`, `afterResponse`).
- Sequências fixas agora chegam **uma bolha por vez**, com pausa/indicador de digitação; as opções só aparecem depois do fim da sequência corrente.
- Romance 0–100% é feedback visual derivado das etapas concluídas da rota; escolhas 100/50/30 não alteram a porcentagem e **não bloqueiam** as saídas das etapas 3 e 6.
- O scroll continua isolado ao histórico interno.

## Yuki — primeira rota autorada real
- Estágios 1–6 de Yuki substituem os placeholders de QA por texto autoral aprovado.
- Estágio 2 usa foto de energético.
- Estágio 3 usa foto pós-missão e abre a primeira saída na cafeteria.
- Estágio 6 usa foto em casa e abre o segundo date no apartamento.
- Dates 3/6 usam os textos enviados pelo autor em `content/narrative/outings.ts`.
- Placeholders de recuperação 7–10 de Yuki permanecem apenas para QA de rota lenta quando o segundo marco ainda não foi concluído; ficam bloqueados após o segundo date.
- Elysia agora também possui autoria final nas etapas 1–6 e dois dates lineares. As outras cinco rotas continuam placeholder de QA.

## Assets novos
- `public/nexo/yuki/energetico-dia2.jpg`
- `public/nexo/yuki/pos-missao-dia3.jpg`
- `public/nexo/yuki/casa-dia6.jpg`

## Cânone / AU
- Fundamentos pessoais e ritmos românticos dos sete foram registrados na Bíblia markdown.
- `RESSONANCIA_BIBLIA_AU_V3_4_LORE_ROTAS.docx` foi incorporada ao projeto.
- Yuki: slow burn baseado em experiências → amizade → romance.

## Validação
- TypeScript completo continua limitado pela ausência de pacotes React/Next no ambiente da entrega.
- Nenhum save reset foi introduzido; schema continua v9.


## v0.2.10 — hotfix ativo
Corrigido bug em que finalizar a etapa 2 podia exibir `MARCAR PRIMEIRA SAÍDA` porque a rota já havia sido incrementada para 3. O CTA genérico foi removido. Dates são acionados exclusivamente pelas escolhas autoradas da etapa 3/6. Save schema segue v9.

- Compatibilidade: ao carregar, v0.2.10 detecta o estado impossível de v0.2.9 em que o outing 3 do Yuki foi concluído sem nenhuma escolha `yuki:r3:*`; nesse caso restaura Yuki para a etapa 3 e remove apenas o outing prematuro, preservando o restante do save.


## v0.2.11 — percentual social estrutural

- `ROMANCE %` é derivado de etapas principais concluídas / total de etapas principais da rota da rota.
- Nenhuma escolha concede XP de romance.
- Pesos 100/50/30 permanecem como metadado autoral e podem alterar relações, mas não a porcentagem.
- Campos antigos de romance permanecem no schema v9 apenas por compatibilidade.
- Dates seguem sem hardlock percentual: apenas convite autorado + marco 3/6 + uma saída por noite.

## v0.2.12 — asset da Elysia
- Retrato oficial em uso: `public/heroes/elysia.jpg`, substituído pelo arquivo fornecido pelo autor.
- Nenhuma mecânica ou schema de save mudou.

## QA de retomada — 2026-09-30
- ZIP `v0.2.12` confirmado como única baseline usada nesta sessão.
- Auditoria estática passou para a cadência do NEXO: bolhas automáticas são reveladas incrementalmente (620 ms), há indicador de digitação entre entregas e as escolhas permanecem ocultas até a sequência corrente terminar.
- Autoscroll continua implementado via `scrollTo` no `phoneChatHistory`; não há `scrollIntoView` no `PhoneDialogueEngine`.
- Lightbox de fotos continua presente.
- `ROMANCE %` continua derivado de `routeStage`; `minRomanceProgress` não participa de `isSceneAvailable`.
- As três escolhas 30/50/100 dos convites de Yuki nas etapas 3 e 6 carregam `vnSceneId` e `exclusiveOutingDay`; elas concluem o chat e habilitam `IR PARA ENCONTRO`, sem reservar automaticamente a noite ou criar hardlock por afinidade.
- QA visual/runtime em navegador permanece pendente porque `npm ci` expirou duas vezes no ambiente. Nenhum código de jogo precisou ser alterado nesta passagem.


## v0.2.13 — UX da Central e Desenvolvimento
- `Preparar expediente` foi removido do loop recorrente. Fora do tutorial do Dia 1, um turno `not_started` inicia automaticamente ao entrar na Central.
- O onboarding autorado continua sendo a exceção: com `tutorial_active`, `Seu primeiro turno` e o CTA manual permanecem.
- O CTA de fim de expediente não flutua mais sobre a interface; agora aparece numa faixa horizontal integrada entre o resumo operacional e o workspace.
- Desenvolvimento agora usa os retratos oficiais do projeto no roster e no painel principal, incluindo o retrato atual de Elysia de v0.2.12.
- Save schema permanece v9; não houve alteração de regra de XP, técnica, atributos ou rota social.
- QA runtime/visual continua necessário, pois `npm ci` voltou a expirar neste ambiente.


## v0.2.15 — iniciativa de DM e autoscroll contextual
- `openingOutgoing`/`prefaceOutgoing` do turno ativo não aparecem mais como bolha automática: o texto autorado fica no compositor e o jogador precisa pressionar Enviar.
- A confirmação desse envio é persistida em `flags` (`social:intro-outgoing-sent:*`), mantendo save schema v9 e evitando reenviar a abertura após reload.
- Conversas iniciadas pelo personagem continuam chegando como mensagem recebida e podem mostrar indicador de não lida na lista; conversas que dependem do Analista iniciar não exibem falso unread.
- A lista usa `Toque para iniciar a conversa` enquanto a primeira mensagem do Analista ainda não foi enviada, sem fingir que a resposta do personagem já chegou.
- Autoscroll segue novas mensagens quando o usuário está até ~96 px do fim ou quando acabou de enviar algo; se estiver lendo acima, a posição é preservada e o botão de recentes informa novas mensagens.
- Imagens que terminam de carregar respeitam o mesmo estado de acompanhamento ao fim.
- Nenhum texto narrativo, cânone, rota, afinidade ou regra de romance foi modificado.
- Validação sintática: 57 arquivos TS/TSX analisados com 0 erros de parse. Typecheck completo segue bloqueado localmente pela ausência de dependências React/Next instaladas.


## v0.2.16 — simplificação transversal + mobile Dispatch
- Direção de UX: complexidade continua no motor; a primeira camada mostra somente o necessário para decidir. Não introduzir siglas técnicas/jargão de cálculo na UI sem definição autoral.
- Briefing remove da primeira camada a grade completa de atributos/requisitos e explicações matemáticas; mantém contexto, risco/tempo, necessidades legíveis, chance estimada e até três alertas relevantes da equipe.
- A mecânica de cálculo não mudou: a simplificação é somente de apresentação.
- Mobile da Central usa quatro painéis exclusivos: Chamados, Mapa, Agentes e NEXO. Não empilha mais a Central desktop inteira verticalmente.
- Briefing mobile ocupa a tela e mantém o CTA de despacho fixo no rodapé.
- Mapa tático usa o asset autoral `public/maps/central-city-map.jpg`; eventos continuam sendo botões/markers dinâmicos posicionados pelo jogo.
- Save schema permanece v9. Nenhuma narrativa, regra de rota ou balanceamento foi alterado.
- `npm run build` não pôde executar neste ambiente porque `node_modules` não está instalado (`next: not found`). QA runtime/visual segue obrigatório.


## v0.2.17 — correção de direção do briefing
- A grade de requisitos por atributo da v0.2.15 foi restaurada: barras, valor fornecido, faixa recomendada e importância voltam a responder à composição selecionada.
- Tags e afinidade contextual voltam a ficar visíveis no briefing.
- A diretriz de simplificação deve preservar indicadores que comunicam diretamente a relação entre caso e equipe; reduzir densidade deve ocorrer por hierarquia, espaçamento e camadas, não pela remoção desse feedback.
- Mobile por painéis e novo mapa da v0.2.16 permanecem. Save schema v9.


## v0.2.18 — radar equipe × necessário
- As cinco barras separadas do briefing foram substituídas por um único radar comparativo, preservando os cinco atributos e a leitura mecânica do caso.
- Área cyan preenchida = atributos somados da equipe selecionada.
- Contorno âmbar pontilhado = valores necessários/recomendados para a ocorrência; pontos de requisito permanecem ligados à importância mecânica.
- Os números por eixo continuam visíveis; eixos sem requisito explícito são identificados como `sem exigência`.
- Tags recomendadas, afinidade contextual e chance estimada permanecem visíveis abaixo/ao lado do radar.
- Nenhuma fórmula, peso, requisito, afinidade, progressão ou resultado foi alterado. Save schema permanece v9.


## v0.2.19 — enquadramento e dossiê
- Briefing desktop não corta mais a faixa inferior quando a viewport é baixa: o modal aceita rolagem interna e mantém cabeçalho/rodapé de despacho acessíveis.
- O radar reduz moderadamente em desktop com menos de 900 px de altura para preservar espaço para seleção da equipe.
- A ficha de agente usa o retrato oficial acima do nome na coluna de identidade, aproveitando o espaço antes vazio.
- Save permanece v9; mecânicas e conteúdo narrativo permanecem inalterados.


## v0.2.20 — radar compacto
- Rótulos e valores dos cinco atributos ficam mais próximos dos vértices do radar.
- O raio visual do pentágono foi ampliado dentro do mesmo viewBox para reduzir o vazio entre gráfico e números.
- O bloco do radar ficou menor em desktop/mobile, especialmente em alturas abaixo de 900 px, sem remover chance, requisitos, tags ou afinidade.
- Nenhuma fórmula ou mecânica mudou. Save permanece v9.


## v0.2.21 — briefing sem rolagem como padrão desktop
- A decisão de v0.2.19 de aceitar rolagem interna no briefing desktop foi supersedida para a faixa desktop normal.
- A seleção de equipe agora ocupa o espaço antes ocioso sob a narrativa, enquanto o radar/requisitos permanecem na coluna direita.
- Cabeçalho, contexto, radar, equipe e CTA de despacho devem caber juntos na primeira viewport em desktop comum; alturas muito baixas usam compactação responsiva, não uma longa página rolável.
- Mobile continua com seu fluxo full-screen próprio.
- Nenhuma fórmula, requisito, chance, conteúdo narrativo ou schema de save mudou. Save v9.


## v0.2.22 — agentes em faixa total e requisitos discretos
- No desktop, a seleção dos sete agentes ocupa toda a largura da faixa inferior do briefing, em uma linha de sete cards, logo acima do rodapé de composição/despacho.
- O modal não cresce para acomodar isso; cards e espaçamento foram compactados para aproveitar a área que estava ociosa.
- Requisitos de atributo do Dispatch agora são números inteiros após a escala diária. O valor usado no radar e no cálculo é o mesmo valor inteiro.
- Motivo: atributos e soma de equipe são discretos; alvos decimais como 4.2 ou 5.3 criavam uma precisão visual que o sistema de atributos não oferece.
- Alertas visíveis não mostram mais `p.p.` para técnica/afinidade; o motor continua usando os mesmos bônus internos.
- Save schema permanece v9.


## v0.2.23 — briefing contextual e seleção persistente
- Desktop: o briefing ocupa somente o canal central, sobre o Mapa Tático. Ocorrências, NEXO e barra de agentes permanecem visíveis.
- A barra inferior é a superfície de seleção: clicar no retrato adiciona/remove o agente quando há briefing aguardando despacho; `ABRIR FICHA` permanece dedicado ao dossiê.
- O briefing desktop não repete os sete cards. Ele preserva contexto, metadados, radar, chance, tags, afinidade, alertas de composição, composição atual e CTA.
- Mobile conserva o briefing full-screen e seus cards internos de seleção.
- Requisitos inteiros da v0.2.22 permanecem. Save schema v9.


## v0.2.26 — consolidação técnica da Central
- `app/agencia/page.tsx` agora concentra estado e handlers; renderização foi decomposta em `components/agency/`.
- CSS ativo da fase mobile/radar/briefing/legibilidade foi separado em `app/agencia/agency.css`, preservando ordem de cascata após `globals.css`.
- Nenhuma fórmula, regra de seleção, estado de turno ou conteúdo narrativo foi alterado nesta etapa.

## v0.2.27 — polish
- Acessibilidade: Escape fecha overlays principais; briefing/resultado/dossiê usam semântica de diálogo; NEXO operacional e mensagem de sistema têm `aria-live`; foco visível e alvos de toque foram reforçados; movimento reduzido é respeitado.
- Save: export/import JSON em Configurações. Importação usa a mesma migração/validação do carregamento normal e não muda o schema v9.
- Outings: crop responsivo data-driven por `backgroundPositionDesktop` / `backgroundPositionMobile`; Yuki Date 1 e Date 2 receberam posições mobile próprias.
- Assets: mapa, Yuki, backgrounds da Agência e dois outings de Yuki usam WebP; referências antigas desses arquivos foram removidas.
- Validação estática: 68 arquivos TS/TSX com 0 erros de parse; CSS com chaves balanceadas. Build/runtime completo segue pendente porque `npm ci` expirou no ambiente.


## v0.2.28 — hotfix briefing contextual
- Corrigida regressão da v0.2.26/v0.2.27 em que o `MissionBriefing`, após virar filho de `TacticalMap`, ainda usava regras de grid da estrutura antiga e criava uma coluna implícita dentro do mapa.
- No desktop, `.mapBriefingLayer` volta a ser overlay absoluto sobre a área útil do mapa, abaixo da toolbar.
- Mapa, roster, fila e NEXO preservam suas dimensões durante a abertura do briefing.
- Mobile continua usando briefing full-screen.
- Save schema permanece v9.


## v0.2.30 — Desenvolvimento workbench integrado
- A faixa inferior da v0.2.29 foi removida no desktop; escolha de atributo passa a viver dentro do painel do radar.
- Níveis 3/5: controles +/− permitem pré-visualizar exatamente um ponto antes da confirmação; o radar reage à prévia sem gravar o save.
- `CONFIRMAR +1` aplica a mesma regra anterior (`confirmAttributeLevel` + `spendAttributePoint`); `LIMPAR` cancela somente a prévia.
- Progressão, milestones, escolhas de técnica/evolução e técnicas desbloqueadas ficam na coluna direita.
- Mobile mantém fluxo responsivo e rolável.
- Nenhum valor de XP, threshold, atributo, técnica, Maestria ou schema foi alterado. Save v9.

## Elysia — segunda rota autorada real
- Etapas 1–6 implementadas a partir do roteiro autoral aprovado.
- Etapa 3: convite para exposição sobre poderes e Date 1 linear no Museu de História.
- Etapa 4: foto de academia e início do flerte mais explícito.
- Etapa 5: “Pegar eu?” aparece ao vivo e, após ~1,7 s, troca para “Mensagem excluída” antes da continuação.
- Etapa 6: convite para assistir VHS, foto provocadora e Date 2 linear na casa de Elysia.
- Assets: `public/nexo/elysia/espelho-dia3.webp`, `academia-dia4.webp`, `recompensa-dia6.webp`.
- Dates não possuem escolhas internas; `/encontro` continua sendo narrativa linear data-driven.


## v0.2.34 — Elysia outing backgrounds
- Os dois dates autorados da Elysia agora possuem backgrounds próprios enviados pelo autor: Museu de História e casa da Elysia.
- Assets otimizados em WebP; narrativa e save schema v9 preservados.


## v0.2.35 — Elysia validation hotfix
- `elysia:r4:t3` possui novamente exatamente 3 respostas, eliminando o erro fatal de `validateEditableContent()`.


## v0.2.36 — encontros pendentes no NEXO
- Etapas 3/6 podem terminar o chat e deixar um convite presencial pendente.
- `IR PARA ENCONTRO` aparece no rodapé da conversa concluída e persiste entre dias.
- A noite só é reservada quando o jogador aciona o CTA.
- Uma saída já usada naquela noite não bloqueia finalizar outros chats; apenas impede iniciar outro encontro até o próximo dia.
- A rota do personagem não avança além do marco enquanto o date estiver pendente.
- Save continua v9.

## v0.2.37 — estrutura conversacional de Yuki
- Yuki continua com o mesmo roteiro/voz e os mesmos marcos presenciais, mas agora evita sequências longas em que o Analista fala automaticamente sem participação do jogador.
- Beats relevantes de D1, D2, D3, D4, D5 e D6 foram transformados em turnos de 3 respostas, seguindo o padrão estrutural consolidado pela rota da Elysia.
- Escolhas principais antigas e flags de convite foram preservadas; novos beats receberam flags próprias.
- Nenhuma mudança nos dois outings de Yuki, no CTA persistente, em romance por estágio ou no save schema v9.

## v0.2.38 — menu principal com key art da cidade
- `app/page.tsx` usa um background full-screen com `public/menu/cidade-noturna.webp`.
- O fade é uma camada separada (`.mainMenuFade`) que percorre toda a largura: forte sob logo/menu à esquerda e progressivamente transparente até a borda direita.
- O menu segue uma hierarquia mais cinematográfica: marca no topo, ações verticais, footer discreto.
- `CONTINUAR` fica visível porém desabilitado quando não existe save, evitando mudança de layout entre sessões.
- Mobile usa crop próprio e fade mais forte para preservar legibilidade.
- Nenhuma regra de jogo, narrativa ou schema de save foi alterada. Save v9.



## v0.2.40 — fluxo de entrada consolidado
- Menu principal mantém cidade noturna e fade contínuo, com painéis internos para Novo Jogo, Carregar, Conta e Configurações.
- CONTINUAR mostra Dia + fase atual e retoma introdução, desenvolvimento, pós-expediente ou Central conforme o save.
- Carregar usa o slot local existente e import/export JSON já compatível com migrações do save.
- Conta tem modo guest e preview para backend futuro; nenhuma senha é persistida.
- Configuração `textSpeed` altera o intervalo entre bolhas automáticas do NEXO (normal 620 ms; rápida 360 ms).
- Configuração `reducedMotion` desliga drift/transições do menu e permanece em localStorage.
- SALVAR E SAIR grava e retorna ao `/` na Central, Desenvolvimento e NEXO.
- Save schema permanece v9.


## v0.2.41 — dados físicos dos agentes
- Ficha/dossiê exibe IDADE, ALTURA e PESO para todos os sete agentes.
- Esses dados são somente informativos e não afetam atributos, Vida, Energia, Dispatch ou progressão.
- Elysia: correção autoral de 2026-10-06 define 21 anos; ficha e apresentação do NEXO foram sincronizadas para 21.
- Save schema permanece v9.


## v0.2.42 — Lysandro autorado
- Etapas 1–6 de Lysandro substituem os placeholders principais por texto autoral fornecido pelo usuário e alternativas diagramadas para o sistema.
- Três fotos no NEXO: milkshake (etapa 2), espelho (etapa 4) e preparação para o segundo encontro (etapa 6).
- Etapas 3 e 6 usam o CTA persistente IR PARA ENCONTRO; a rota só avança após concluir o date.
- Dates 1/2 são lineares e usam o texto autoral atual; sem escolhas internas.
- Placeholders de recuperação 7–10 de Lysandro permanecem apenas para QA pós-rota quando aplicável.
- Save schema permanece v9.


## v0.2.43 — mídia de Lysandro
- As três fotos de NEXO de Lysandro foram substituídas pelos arquivos autorais mais recentes, preservando os mesmos pontos da rota D2/D4/D6.
- Date 1 de Lysandro agora usa background autoral do Bar do Becos em `public/outings/lysandro/date-1-bar.webp`.
- Date 2 de Lysandro agora usa background autoral do restaurante em `public/outings/lysandro/date-2-restaurante.webp`.
- Nenhuma fala, escolha, progressão de rota ou regra de save foi alterada. Save permanece schema v9.


## v0.2.44 — Date 2 de Lysandro em dois backgrounds
- O Date 2 continua linear e sem escolhas, mas `/encontro` agora suporta beats opcionais de apresentação.
- Beat 1 usa `date-2-restaurante.webp` e mostra o trecho do restaurante.
- Ao continuar, Beat 2 inicia em “Voltando para casa...” e troca para `date-2-casa.webp`.
- Nenhum texto autoral foi reescrito; save permanece schema v9.


## v0.2.45 — QA estático do Date 2 de Lysandro
- Baseline desta sessão: ZIP fornecido pelo autor; versão interna de origem confirmada em `package.json` como v0.2.44.
- `outing-day6-lysandro` possui exatamente dois `beats`: restaurante (`date-2-restaurante.webp`) e casa (`date-2-casa.webp`).
- Em `app/encontro/[sceneId]/page.tsx`, enquanto existe próximo beat o CTA executa apenas `setBeatIndex(...)`; `finishScene()` é chamado somente no último beat.
- O segundo beat contém os dois últimos parágrafos autorados e o texto final continua terminando em “fechando a porta.”.
- Ambos os assets de background existem no pacote.
- `npm ci --no-audit --no-fund` expirou no ambiente; QA visual/runtime em navegador permanece pendente e deve ser o primeiro passo da próxima sessão.
- Nenhum código de gameplay, conteúdo narrativo, cânone ou schema de save foi alterado; save continua v9.


## v0.2.49 — Novo Jogo pode iniciar somente no pós-expediente
- `NOVO JOGO` oferece **Campanha completa** (padrão) ou **Só pós-expediente**.
- O modo social-only usa flag `mode:post-shift-only`; não altera o schema v9 nem exige migração.
- Novo save social-only nasce com Introdução/Tutorial considerados pulados e `shift.status = finished`, entrando direto em `/conversa`.
- Ao escolher `PRÓXIMA NOITE`, o dia global aumenta em 1, heróis recuperam estado, um novo shift é criado já como `finished` e o jogador permanece no NEXO.
- `/introducao`, `/agencia` e `/desenvolvimento` redirecionam ao NEXO neste modo.
- Contextos textuais que dependem de ter havido expediente são suprimidos apenas no modo social-only.
- Regras sociais continuam iguais: uma etapa por personagem/noite, convites persistentes e no máximo um encontro presencial por noite.
- Campanha completa segue inalterada como opção padrão.


## v0.2.49 — hotfix de avanço no modo só pós-expediente

- `PRÓXIMA NOITE` agora atualiza o save e o estado React do NEXO no mesmo evento; não depende de navegar de `/conversa` para a própria rota.
- Antes de avançar, o jogador recebe confirmação com **Ir para próximo dia** e **Voltar**.
- Save schema continua v9.


## v0.2.51 — leitor de Dates
- `/encontro/[sceneId]` continua totalmente linear e sem escolhas.
- Textos autorais não foram reescritos; o leitor apenas divide cenas longas em páginas de leitura.
- Cabeçalho identifica DATE 1/DATE 2, personagem e progresso da cena.
- Beats autorais de background continuam funcionando; rótulos autorais de transição são preservados no fim do beat correspondente.
- A página atual é lembrada durante a mesma noite via `sessionStorage`, permitindo sair/reabrir o encontro sem reiniciar imediatamente a leitura.
- Encontros já concluídos são bloqueados contra reabertura manual pela URL.
- Save schema permanece v9.


## v0.2.52 — biblioteca social, replay e QA
- NEXO possui abas Conversas/Fotos/Dates. Fotos só entram no arquivo após o respectivo turno ter sido alcançado; Dates só entram após milestone concluído.
- Replays oficiais usam `/encontro/<id>?replay=1` e são somente leitura: não alteram save.
- `/encontro` ganhou cartão de entrada, transição de saída, botão Anterior e teclado ←/→; a configuração de movimento reduzido elimina os delays de transição.
- Leitura de mensagens usa flags `nexo:read:*` por noite/personagem/turno; continua save schema v9 porque `flags` já é extensível.
- `content/social/routeManifest.ts` define a estrutura comum D1–D6 + Dates 3/6; o validador editorial verifica presença única desses marcos.
- Ferramenta `/qa/social`: seleção de personagem/noite/estágio, abertura direta de chat, Date 1/2 em QA preview, inspeção de flags e reset somente social.
- Rota autoral final atual: Yuki, Elysia, Lysandro e Demétria. Hélio, Alexandra e Eros continuam com conteúdo de QA onde ainda não receberam roteiro final.
- Nenhuma fala, Date autoral, balanceamento, Dispatch ou schema de save foi alterado.
- Validação: 73 TS/TSX com 0 erros de sintaxe e `validateEditableContent()` aprovado; browser QA ainda pendente.


## v0.2.53 — hotfix visual NEXO
- Barra Conversas/Fotos/Dates compacta.
- Grid lateral agora possui linha explícita para as abas: header, busca, intro, abas, contatos flexíveis e footer.
- Corrigido o defeito que fazia as três abas ocuparem quase toda a altura da coluna esquerda em resoluções desktop menores.


## v0.2.54 — revisão de navegação mobile
- Bibliotecas `Fotos` e `Dates` do NEXO agora têm barra mobile persistente com retorno explícito para `Conversas`.
- Leitor de Dates ganhou retorno explícito para o NEXO durante a cena, sem precisar chegar ao fim; o progresso da página continua preservado em `sessionStorage` na mesma noite.
- Rodapé do NEXO, compositor, lightbox, Date reader e modais respeitam safe areas e alvos de toque em mobile.
- Arquivo de Dates empilha CTA em telas estreitas e controles principais usam mínimo de 44 px.
- Nenhum texto narrativo, flag de rota, regra social ou schema de save foi alterado. Save permanece v9.


## v0.2.55 — ordem de conversas e autoscroll do NEXO
- A lista de contatos é ordenada por horário da atividade mais recente (mais recente primeiro), sem depender de leitura/não leitura para reordenar.
- O preview mostra o conteúdo mais recente disponível no estágio atual e usa `Você:` quando a última mensagem exibida é do Analista.
- Mensagem nova usa indicador por ponto, sem sugerir contagem falsa de uma mensagem.
- Linhas da lista foram padronizadas em densidade, truncamento e hierarquia visual, com ajustes específicos para mobile.
- O autoscroll usa limiar proporcional à área visível; se o jogador sobe para ler mensagens antigas, novas mensagens não o puxam de volta.
- Alterações de conteúdo/imagens e mudanças de altura do compositor mantêm o fim ancorado apenas quando o jogador já estava acompanhando a conversa.
- O botão de mensagens recentes acompanha dinamicamente a altura do compositor, evitando ficar escondido atrás das respostas no mobile.
- Save permanece schema v9; nenhuma rota ou fala foi alterada.


## v0.2.56 — robustez social
- `content/validate.ts` valida duplicidade de flags/IDs, completion flags, alt de mídia, referências `vnSceneId`, coerência personagem/marco e convites finais de rotas autoradas.
- `scripts/validate-social-assets.mjs` confere se mídias sociais locais referenciadas existem em `public/`.
- `game/social/integrity.ts` audita e repara de forma conservadora inconsistências do save social (flags duplicadas, mapas ausentes, milestones e etapas de Date).
- Carregamento de save v9 hidrata mapas sociais/relacionamentos ausentes antes da validação estrita, preservando progresso existente.
- `/qa/social` agora permite simular lido/não lido, preparar+abrir D1–D6, concluir/reabrir Dates para QA e executar diagnóstico/reload/reparo do estado social.
- Save continua schema v9; nenhuma fala ou rota autoral foi alterada.


## v0.2.57 — gate explícito para entrada em Date
- Última mensagem e desbloqueio de convite não navegam para a cena presencial.
- Entrada normal em `/encontro` exige autorização de sessão criada exclusivamente pelo CTA `IR PARA ENCONTRO`.
- Reload em Date iniciado é preservado; saída voluntária remove o gate para exigir nova confirmação do jogador.
- Replay/QA não são afetados. Save v9 e narrativa inalterados.


## v0.2.58 — hotfix de entrada no Date
- O gate efêmero em `sessionStorage` da v0.2.57 foi substituído por autorização explícita na URL (`?launch=1`) criada somente pelo CTA `IR PARA ENCONTRO`.
- A reserva da noite continua persistida em `social.outingsByGlobalDay`; sem CTA/seleção válida, `/encontro` retorna ao NEXO.
- Reload durante a cena mantém a autorização porque o parâmetro permanece na URL.
- Nenhuma fala, Date, milestone ou schema de save mudou.

## v0.2.58 — retomada QA estática do gate de Date (2026-10-02)
- ZIP fornecido nesta sessão tratado como única baseline válida; versão interna confirmada em `package.json` como 0.2.58 e save schema v9.
- Verificação estática automatizada do fluxo de entrada em Date aprovou 10/10 condições: CTA com `?launch=1`, persistência de `outingsByGlobalDay`, bloqueio de acesso normal sem autorização, manutenção da autorização em reload, exceções read-only de replay/QA e validação da seleção da noite.
- `game/social/outingLaunch.ts` permanece no pacote sem referências consumidoras; é legado órfão da v0.2.57 e não deve ser reativado.
- `npm ci --no-audit --no-fund` expirou e deixou instalação parcial; por isso QA real em navegador do clique/reload/acesso manual/replay/QA continua pendente.
- Nenhum código de gameplay, conteúdo narrativo, cânone ou schema de save foi alterado nesta retomada.


## Atualização 2026-10-02 — rota Hélio
- Rota Hélio D1–D6 autorada com base integral no material fornecido pelo autor; duas alternativas adicionadas por escolha para o padrão do NEXO.
- Fotos autoradas: D4 treino, D5 vinho, D6 pós-banho. Dates autorados: D3 convenção, D6 apartamento.
- Hélio agora `authored: true`; removido dos placeholders genéricos de chat e outing.
- Validação de assets sociais: 28/28 OK. QA visual/runtime segue pendente por dependências incompletas.
- Versão 0.2.58; save schema v9.

## Atualização 2026-10-02 — padronização textual Hélio
- Hélio D1–D6 agora segue o padrão usado como referência em `Demétria - Chat`: opção 1 = texto-base do autor; opções 2/3 = variações adicionais, sem criar novos acontecimentos.
- Falas-base e Dates de Hélio foram mantidos no texto fornecido pelo autor, sem normalização/correção editorial silenciosa.
- Dates continuam sem escolhas; apenas a divisão técnica em parágrafos do reader foi mantida.
- Fotos, convites D3/D6, `vnSceneId`, `exclusiveOutingDay`, flags e save schema v9 não mudaram.
- Assets sociais revalidados: 28/28 OK. QA visual/runtime continua pendente.

## v0.2.58 — retomada 2026-10-05
- Fonte exclusiva desta retomada: `Agencia-Ressonancia-v0.2.58-Lysandro-Hero-Photo.zip`.
- `package.json` = 0.2.58; `CURRENT_SAVE_VERSION` = 9.
- Documentação obrigatória de contexto/autoria/design/cânone/failsafe relida antes de mudanças.
- Primeiro item pendente continua sendo QA runtime/browser do gate de Date v0.2.58. A instalação `npm ci --no-audit --no-fund` expirou novamente, deixando `node_modules` parcial; portanto clique/reload/acesso manual/replay/QA não foram marcados como aprovados.
- Validação disponível: `npm run validate:social-assets` = 28/28 OK.
- Hélio: inspeção estática confirma rota D1–D6 no arquivo autoral, três respostas por turno, fotos nos dias 4/5/6, convites nos marcos 3/6 e Dates 1/2 apontando para cinco arquivos existentes.
- O manifesto social marca Hélio como `authored: true`; metadados de failsafe que ainda o listavam como placeholder foram corrigidos.
- Nenhuma fala, cena, cânone, gameplay, balanceamento ou schema de save foi alterado.


## Playtest de continuidade / softlocks — 2026-10-05
- Revisão estrutural focada em hardlocks, softlocks e estados que poderiam impedir continuação do jogo.
- Fluxo social D3/D6: convite final mantém `routeStage` no marco até o Date; CTA persiste `outingsByGlobalDay`; Date só avança a rota na conclusão; convite pendente sobrevive à virada de noite; reserva de noite anterior não bloqueia a noite seguinte.
- Gate de Date: acesso normal exige `?launch=1` e seleção persistida da noite; replay/QA ignoram o gate sem concluir progresso; reload conserva o parâmetro da URL. A validação real de navegador continua pendente.
- Ciclo operacional: o avanço para 18:00 sincroniza incidentes e resolve despachos vencidos antes do estado final; Desenvolvimento permanece bloqueado enquanto houver relatório/despacho pendente.
- Guards de campanha e `mode:post-shift-only` permanecem separados; Introdução/Central/Desenvolvimento redirecionam saves pós-expediente ao NEXO.
- `npm run validate:social-assets`: 28/28 OK.
- `npm ci --no-audit --no-fund` voltou a expirar neste ambiente; `tsc`, build e playtest real em navegador não foram marcados como aprovados.
- Nenhum hardlock/softlock reproduzível foi identificado por inspeção e simulação estrutural. Nenhum código, autoria, cânone, balanceamento ou schema foi alterado.


## v0.2.58 — nova tentativa do harness E2E (2026-10-05)
- A baseline usada foi exclusivamente `Agencia-Ressonancia-v0.2.58-Playtest-Automatizado-2026-10-05.zip`.
- `TESTAR_JOGO.sh` foi iniciado como equivalente do launcher Windows recomendado em `NEXT_SESSION.md`, mas o ambiente encerrou a execução com `TransportTimeoutError` durante instalação/E2E.
- O resultado não foi classificado como falha de jogo ou do harness. Nenhuma correção de gameplay foi feita sem evidência runtime.
- `npm run qa:flow:static`: 20/20 PASS. `npm run validate:social-assets`: 28/28 PASS. Arquivos JS/MJS do harness passaram em `node --check`.
- Browser E2E continua pendente; versão 0.2.58 e save schema v9 permanecem inalterados.

## v0.2.58 — autoria da rota Alexandra (2026-10-05)
- Alexandra D1–D6 integrada a partir do material fornecido pelo autor, com três opções por turno e opção 1 preservando a fala-base.
- Fotos autorais integradas: D3 vestido branco, D5 parque e D6 elevador.
- Dates autorados: D3 Mostra Cultural de Ballet Contemporâneo e D6 apartamento do Analista, usando as duas imagens fornecidas.
- Convites dos marcos 3/6 usam `exclusiveOutingDay` + `vnSceneId`; IDs existentes `outing-day3-alexandra` e `outing-day6-alexandra` foram preservados.
- Alexandra agora está `authored: true` e foi removida dos outings placeholder D3/D6.
- `npm run validate:social-assets`: 32/32 referências locais OK. `npm run qa:flow:static`: 22/22 PASS.
- Versão permanece 0.2.58; save schema permanece v9. QA visual/runtime da rota continua pendente.


## v0.2.59 — identidade do protagonista
- Nome dinâmico e pronomes configuráveis integrados ao runtime e ao conteúdo social.
- Preferência editorial: neutralidade > nome > pronome > flexão excepcional.
- Save schema atual: v10; migração v9→v10 não apaga progresso.

## Identidade do jogador - v0.2.59
- Save schema atual: **v10**.
- `player.name` continua sendo o nome escolhido no Novo Jogo.
- `player.pronouns`: `ele-dele`, `ela-dela` ou `elu-delu`.
- Regra editorial: neutralizar primeiro; usar tokens de pronome/flexão somente quando a frase realmente exigir.
- Interpolação é centralizada em `lib/playerText.ts`; não criar `replaceAll` local para nome/pronomes nos componentes.
- `Analista` permanece quando for cargo/identidade funcional. Tratamento pessoal e narração devem usar nome dinâmico ou construção neutra.
- Os 7 roteiros DOCX estão em `docs/authoring/chat-scripts/` com a mesma convenção.
- Último QA: `qa:flow:static` 25/25 e `validate:social-assets` 35/35; DOCX renderizados e revisados visualmente.


## Correção autoral Elysia/Yuki — 2026-10-06
- Os DOCX reenviados de Elysia e Yuki substituem integralmente as versões usadas na primeira passagem de v0.2.59.
- Elysia: idade autoral corrigida para 21 anos e sincronizada com `content/characters/heroes.ts` e o NEXO.
- Falas fixas do Analista em Elysia/Yuki voltaram a ser mensagens fixas; alternativas que não existiam nos DOCX corrigidos foram removidas do runtime.
- Neutralização foi reaplicada somente onde necessária, sem mudar eventos, flerte, piadas ou resultados dos Dates.

## v0.2.61 — NEXO activity / onboarding safety (2026-10-06)
- Lista de contatos corrigida para não usar apenas o `timeLabel` editorial como ordenação. Atividade de envio é persistida em flags `nexo:activity:<characterId>:<day>:<epoch>`; recebimentos usam horário autorado quando ainda não há atividade runtime.
- Turnos iniciados pelo Analista sem envio não são considerados atividade recente, corrigindo contatos como Eros aparecendo acima de mensagens realmente recebidas.
- Grupo inicial Guerreiros Elementais agora entrega uma resposta por vez, com typing indicator e CTA bloqueado até terminar.
- `public/heroes/alexandra.jpg` foi substituído pelo retrato fornecido nesta sessão.
- Primeiro caso E-04 não expira no tutorial: o relógio operacional pausa em `scheduled/waiting` e retoma do mesmo minuto ao despachar.
- QA estático e assets devem ser reexecutados no handoff; browser/runtime permanece obrigatório. Save v10 inalterado.


## v0.2.64 — Tutorial Progressivo v2 (2026-10-06)
- Onboarding deixa de concentrar toda explicação no E-04: sistemas posteriores são ensinados na primeira situação em que ficam acionáveis.
- Flags persistentes no `save.flags` registram Desenvolvimento, técnica, atributo, Maestria, equipe/Ressonância, combo, condição, NEXO pós-expediente e Date. Save schema continua v10.
- Desenvolvimento só dispara orientação inicial quando existe upgrade obrigatório; níveis 2/4/6 e 3/5 possuem explicações específicas; Maestria aparece somente quando `masteryRank > 0`.
- Briefing de Dispatch ensina composição com 2+ agentes, combo descoberto e condição cansado/machucado sem alterar chance de missão.
- NEXO explica múltiplas conversas opcionais e, separadamente, o gate de Date persistente/uma saída por noite.
- `npm run qa:flow:static`: 39/39 PASS. `npm run validate:social-assets`: 35/35 PASS. Browser/E2E continua pendente neste ambiente sem `node_modules`.


## v0.2.65 — Edison Tutorial UX v3 (2026-10-06)
- Tutorial visual unificado em `components/EdisonCoach.tsx`, com retrato oficial de Edison, tons contextuais, spotlight e alvo destacado.
- `Manual da Agência` consultável em Central/Desenvolvimento/NEXO; conteúdo em `content/narrative/agencyManual.ts`.
- Desenvolvimento agora considera tutorial aprendido por ação real: agente UP selecionado, técnica escolhida e atributo confirmado.
- NEXO considera o pós-expediente demonstrado ao abrir conversa; Date somente ao usar o CTA explícito.
- Histórico v0.2.65: o primeiro Dispatch reutilizava EdisonCoach dentro e fora do briefing; em Beta 1 beta.2 o coach interno foi removido para evitar compressão.
- QA estático: 44/44 PASS; assets sociais: 35/35 PASS; save v10.


## Hotfix Beta 1 · v0.3.0-beta.2
- Primeiro tutorial do Dispatch usa o mesmo balão flutuante do restante do Edison UX; não ocupa uma linha interna do briefing.
- O primeiro caso e o resultado não escurecem a tela com spotlight global; apenas o alvo relevante pulsa.
- O balão permanece acima do modal de resultado para ser visível durante revisão/captura.
