## Beta 1 · v0.3.0-beta.4 — GitHub Pages
- [x] `output: export` e `trailingSlash`.
- [x] basePath configurável sem quebrar execução local.
- [x] assets públicos prefixados em runtime.
- [x] Dates com params estáticos.
- [x] workflow Pages publica `out/`.
- [x] QA estático GitHub Pages incluído.
- [ ] Executar workflow real no GitHub e smoke test da URL publicada.

## Beta 1 · v0.3.0-beta.3
- [x] Save schema continua v10.
- [x] Gameplay/cânone/balanceamento preservados.
- [x] QA flow 44/44.
- [x] Assets sociais 35/35.
- [x] QA Beta1 17/17.
- [x] QA refactor 15/15.
- [x] Transpile sintático 90 TS/TSX PASS.
- [ ] QA browser/Supabase staging conforme NEXT_SESSION.

## Beta 1 · v0.3.0-beta.2
- [x] baseline v0.2.65 preservada como origem da Beta 1;
- [x] save schema permanece v10;
- [x] gameplay continua local-first e sem dependência de rede;
- [x] Supabase isolado em adapters/contratos;
- [x] migration com RLS incluída;
- [x] service role não exposta;
- [x] conta preview removida;
- [x] conflito local/cloud não sobrescreve silenciosamente;
- [x] 44/44 QA fluxo estático;
- [x] 35/35 assets sociais;
- [x] 17/17 QA arquitetura Beta 1;
- [ ] staging Supabase configurado e QA remoto/browser concluído.

# CHECKLIST BEFORE HANDOFF

## v0.2.63 — NEXO operacional contextual v2
- [x] 48/48 IDs do banco ativo possuem comentário pré-despacho.
- [x] Afinidades explícitas podem sobrepor fala genérica quando o herói afim participa.
- [x] Pares/combos já registrados possuem interações próprias; composição arbitrária possui fallback por colega.
- [x] Resultado possui variantes success/cost/partial/failure e reação opcional do segundo membro.
- [x] Nenhuma fórmula de Dispatch, chance, duração, recompensa ou save schema foi alterada.
- [x] DOCX de revisão atualizado e renderizado para QA visual.
- [x] `npm run qa:flow:static`: 33/33 PASS.
- [x] `npm run validate:social-assets`: 35/35 PASS.
- [x] Typecheck tentado; bloqueado pelas dependências React/Next ausentes no pacote limpo, sem erro específico nos arquivos NEXO alterados.
- [ ] QA browser/runtime com múltiplas composições, afinidades e resultados.


## v0.2.62 — grupo NEXO
- [x] Respostas iniciais dos sete personagens revisadas por voz.
- [x] Mensagens operacionais deixam de ser placeholder.
- [x] DOCX revisável criado e renderizado para QA visual.
- [ ] QA de navegador do grupo e das mensagens operacionais.

## v0.2.61 — NEXO + onboarding safety
- [x] Ordenação da lista usa atividade efetiva e não promove conversa ainda não iniciada apenas por `timeLabel`.
- [x] Envio em DM registra atividade persistente sem alterar schema de save.
- [x] Grupo inicial revela as 7 respostas em sequência e bloqueia avanço até concluir.
- [x] Retrato principal de Alexandra substituído pelo asset recebido.
- [x] E-04 não pode expirar enquanto o tutorial aguarda a decisão; relógio operacional pausa nessa etapa.
- [x] `npm run qa:flow:static` executado.
- [x] `npm run validate:social-assets` executado.
- [ ] QA visual/runtime em `next dev` das quatro correções.
- [x] Save schema permanece v10.


## v0.2.60 — hotfix Runtime Error social
- [x] Alexandra removida dos placeholders principais D2–D6 sem apagar a rota autorada.
- [x] Nenhuma cena principal Alexandra D1–D6 duplicada após o hotfix.
- [x] Eros possui exatamente 3 respostas em todos os turnos D1–D6.
- [x] Opção base do Eros preserva o texto autoral anterior.
- [x] Todas as respostas finais D3/D6 do Eros apontam para o mesmo Date correto.
- [x] `validateEditableContent()` executado com PASS.
- [x] `npm run qa:flow:static`: 25/25 PASS.
- [x] `npm run validate:social-assets`: 35/35 PASS.
- [x] DOCX de Eros atualizado e renderizado; 6/6 páginas inspecionadas sem clipping/overlap.
- [x] Save schema permanece v10.
- [ ] Reabrir `next dev`/browser e confirmar ausência do Runtime Error no ambiente do usuário.

## v0.2.58 — retomada 2026-10-06
- [x] Baseline exclusiva do ZIP de Alexandra confirmada: v0.2.58 / save v9.
- [x] Documentação obrigatória processada antes de alterações de código, incluindo o DOCX de banco de casos.
- [x] `TESTAR_JOGO.sh` iniciado conforme o próximo item de `NEXT_SESSION.md`.
- [ ] Playwright/Chromium E2E concluído — ambiente encerrou a instalação/execução com `TransportTimeoutError`.
- [x] Auditoria estática: 22/22 PASS.
- [x] Assets sociais: 32/32 PASS.
- [x] Nenhuma mudança narrativa, canônica, de gameplay, balanceamento ou save.
- [x] Failsafes atualizados preservando a pendência real de runtime/browser e o QA visual de Alexandra.

## v0.2.58 — nova tentativa E2E 2026-10-05
- [x] Baseline exclusiva do ZIP de playtest automatizado confirmada: v0.2.58 / save v9.
- [x] Documentação obrigatória processada antes de alterações.
- [x] `TESTAR_JOGO.sh` iniciado conforme próximo item de `NEXT_SESSION.md`.
- [ ] Playwright/Chromium E2E concluído — ambiente encerrou a instalação/execução com `TransportTimeoutError`.
- [x] Auditoria estática: 20/20 PASS.
- [x] Assets sociais: 28/28 PASS.
- [x] JS/MJS do harness: `node --check` sem erro.
- [x] Nenhuma mudança narrativa, canônica, de gameplay, balanceamento ou save.
- [x] Failsafes atualizados para preservar a pendência real.

## v0.2.58 — harness de playtest 2026-10-05
- [x] Harness separado em `qa/playtest/`, sem imports no gameplay.
- [x] Scripts de um clique Windows/shell adicionados.
- [x] Auditoria estática: 20/20 PASS.
- [x] Assets sociais: 28/28 PASS.
- [x] Sintaxe dos arquivos JS/MJS do harness validada com `node --check`.
- [ ] Playwright/Chromium E2E executado — bloqueado por timeout de instalação neste ambiente.
- [x] Nenhuma mudança narrativa/canônica/gameplay/save.
- [x] ZIP final sem `.next`/`node_modules`.

## v0.2.58 — retomada 2026-10-05
- [x] Baseline exclusiva do ZIP fornecido confirmada; versão 0.2.58 e save v9.
- [x] Documentação obrigatória de contexto/autoria/design/cânone/failsafe relida.
- [x] `npm run validate:social-assets`: 28/28 OK.
- [x] Hélio D1–D6/Dates/mídias conferidos estaticamente sem alterar autoria.
- [ ] QA browser/runtime do gate de Date e da rota Hélio — bloqueado porque `npm ci` expirou novamente.
- [x] `node_modules` parcial removido antes do empacotamento.
- [x] CURRENT_STATE, NEXT_SESSION, CHANGELOG e PROJECT_STATE.json atualizados.

## v0.2.58 — retomada QA estática em 2026-10-02
- [x] Baseline exclusiva v0.2.58 e save v9 confirmados.
- [x] 10/10 assertivas estáticas do gate de Date aprovadas.
- [x] Replay/QA possuem bypass explícito do gate em código.
- [x] Acesso normal sem `launch=1` possui retorno explícito ao NEXO.
- [ ] QA browser/runtime do clique, reload, acesso manual e replay/QA — bloqueado por timeout de `npm ci`.

## v0.2.58 — hotfix de entrada no Date
- [ ] `IR PARA ENCONTRO` abre `/encontro/<sceneId>?launch=1`.
- [ ] Cena normal não abre sem `launch=1` e seleção válida em `outingsByGlobalDay`.
- [ ] Reload no Date mantém a cena.
- [ ] Replay/QA continuam funcionando.
- [ ] Save schema continua v9.

## v0.2.57 — gate de Date
- [ ] Última mensagem permanece legível; não há navegação automática.
- [ ] `/encontro` normal só abre após `IR PARA ENCONTRO`.
- [ ] Reload durante Date iniciado funciona; sair exige novo clique para reentrar.
- [ ] Replay/QA permanecem read-only.

- [ ] mudanças de conteúdo foram colocadas em `content/` quando possível
- [ ] IDs novos são únicos e estáveis
- [ ] TypeScript/sintaxe validada na medida disponível
- [ ] fluxo principal testado ou limitações registradas
- [ ] PROJECT_CONTEXT atualizado
- [ ] CURRENT_STATE atualizado
- [ ] NEXT_SESSION atualizado
- [ ] CHANGELOG atualizado
- [ ] PROJECT_STATE.json atualizado
- [ ] GDD atualizado se houve mudança mecânica
- [ ] Bíblia AU atualizada se houve mudança canônica/narrativa durável
- [ ] ZIP final não inclui `.next` nem `node_modules`

## v0.2.56 — robustez social
- [x] `validateEditableContent()` executado com sucesso.
- [x] `npm run validate:social-assets` equivalente executado: 24 referências locais encontradas.
- [x] 74 arquivos TS/TSX passaram por transpile/syntax check sem diagnóstico.
- [x] teste de reparo de inconsistência social: 6 issues → 0 após reparo.
- [x] teste de hidratação de save v9 parcial preservou import e restaurou chaves ausentes.
- [ ] QA visual/browser de reload no meio de conversa/Date permanece pendente.

## Hélio — autoria integrada em v0.2.58
- [x] D1–D6 substituem placeholders e oferecem 3 opções por escolha.
- [x] Fotos D4/D5/D6 referenciadas e presentes em `public/nexo/helio/`.
- [x] Date 1/2 referenciados e presentes em `public/outings/helio/`.
- [x] Manifesto social marca Hélio como autorado; placeholders genéricos removidos.
- [x] `npm run validate:social-assets` passou (28 referências).
- [ ] QA runtime/visual de Hélio em desktop/mobile, dependente de instalação completa.

## Hélio — padronização textual pelo modelo Demétria (2026-10-02)
- [x] Opção 1 de cada turno mantém a fala-base fornecida pelo autor.
- [x] Opções 2/3 seguem o conjunto aprovado nesta sessão e não adicionam acontecimentos novos.
- [x] Respostas de Hélio permanecem no texto-base fornecido.
- [x] Dates 1/2 permanecem lineares, sem opções, com o texto autoral restaurado.
- [x] Fotos e convites D3/D6 permanecem conectados aos mesmos pontos.
- [x] `npm run validate:social-assets` passou com 28 referências locais.
- [x] Save schema permanece v9; nenhuma migração adicionada.
- [ ] QA runtime/visual em navegador continua pendente.

## Alexandra — autoria integrada em v0.2.58
- [x] D1–D6 substituem a rota placeholder principal e oferecem 3 opções por turno.
- [x] Opção 1 preserva a fala-base fornecida; opções 2/3 são as alternativas fornecidas pelo autor.
- [x] Fotos D3/D5/D6 presentes em `public/nexo/alexandra/`.
- [x] Dates 1/2 presentes em `public/outings/alexandra/` e ligados aos marcos 3/6.
- [x] Manifesto social marca Alexandra como autorada; outings placeholder D3/D6 removidos.
- [x] `npm run validate:social-assets` passou com 32 referências.
- [x] `npm run qa:flow:static` passou com 22/22 verificações.
- [x] Save schema permanece v9; nenhuma migração adicionada.
- [ ] QA runtime/visual de Alexandra em desktop/mobile permanece pendente.

## Handoff Eros — 2026-10-06
- [x] Texto autoral D1–D6 preservado sem reescrita.
- [x] FOTO CHAT 1/2/3 adicionadas e referências validadas.
- [x] Dates 1/2 autorados substituem placeholders.
- [x] Eros `authored: true` e removido dos geradores placeholder.
- [x] `qa:flow:static` 24/24 e `validate:social-assets` 35/35.
- [ ] QA runtime/browser ainda pendente.
- [ ] Padronização global de nome/pronomes e alternativas editoriais continua backlog separado.

- [ ] Validar nome/pronomes nas três opções do Novo Jogo e procurar tokens `{{...}}` não resolvidos no NEXO/Dates.

### v0.2.59 - identidade dinâmica
- [x] Nome do jogador interpolado por `formatPlayerText`.
- [x] Novo Jogo oferece Ele/dele, Ela/dela e Elu/delu.
- [x] Save v10 persiste pronomes e migra v9 sem invalidar o save.
- [x] Textos autorados priorizam neutralidade; `playerForm` é exceção deliberada.
- [x] 7 DOCX de chat atualizados e renderizados para QA visual.
- [x] `npm run qa:flow:static` = 25/25.
- [x] `npm run validate:social-assets` = 35/35.
- [ ] Executar E2E/browser com as três opções de pronome em ambiente com Playwright/Chromium funcional.
- [ ] Importar pelo menos um save v9 real e confirmar migração v10 em runtime.


## v0.2.64 — Tutorial Progressivo v2
- [x] Save schema continua v10; tutoriais usam apenas flags persistentes.
- [x] Primeiro upgrade só ensina Desenvolvimento quando há decisão pendente.
- [x] Técnica (2/4/6), atributo (3/5) e Maestria possuem gatilhos próprios.
- [x] Dispatch contextual cobre 2+ agentes/Ressonância, combo e condição.
- [x] NEXO pós-expediente e primeiro Date possuem orientação própria.
- [x] `npm run qa:flow:static` = 39/39.
- [x] `npm run validate:social-assets` = 35/35.
- [ ] QA runtime/browser do golden path e milestones múltiplos permanece pendente.


## v0.2.65 — Edison Tutorial UX v3
- [x] EdisonCoach único aplicado ao primeiro Dispatch e tutoriais progressivos.
- [x] Spotlight não intercepta interação; `.tutorialTarget` destaca o alvo real.
- [x] Desenvolvimento marca técnica/atributo por ação confirmada.
- [x] Date só marca tutorial ao CTA `IR PARA ENCONTRO`.
- [x] Manual da Agência adicionado às três superfícies principais.
- [x] `npm run qa:flow:static` = 44/44 PASS.
- [x] `npm run validate:social-assets` = 35/35 PASS.
- [ ] QA visual/browser e mobile pendente.
