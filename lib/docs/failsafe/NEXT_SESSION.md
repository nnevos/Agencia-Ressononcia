# NEXT SESSION — Beta 1 · v0.3.0-beta.16

1. No GitHub Pages, abrir o NEXO com primeiro convite de Date e confirmar que a tela não escurece.
2. Confirmar que o botão `OK` fecha o balão e ele não reaparece após reload/login.
3. Verificar desktop e mobile 320/360/390/430 px; o balão não deve cobrir respostas/CTA essenciais.
4. Confirmar que `IR PARA ENCONTRO` continua funcionando normalmente após dispensar o tutorial.

# NEXT SESSION — Beta 1 · v0.3.0-beta.14

1. QA real em 320/360/390/430 px: Central → Chamado → Equipe → FICHA → Dispatch → Resultado → Arquivar.
2. Confirmar no GitHub Pages que o resultado mobile nunca mostra o modal desktop simultaneamente.
3. Confirmar pausa do relógio/deadline com FICHA e tutorial de Ressonância/Combo/Condição dentro do fluxo mobile novo.
4. Não alterar fórmulas de Dispatch durante esse QA.

# NEXT SESSION — Beta 1 · v0.3.0-beta.12

1. QA browser: completar o DATE 2 do último romance e confirmar transição para `/final`.
2. Em `/final`, validar os sete agentes com DATE 1/2 marcados, mobile 320/360/390/430 px e desktop baixo.
3. Clicar CONTINUAR JOGANDO → NEXO → ENCERRAR NOITE → confirmar novo expediente e Dispatch pós-Dia 6.
4. Voltar ao menu/recarregar depois de ver o final: CONTINUAR não deve reabrir `/final`.
5. Testar um save já 100% completo sem a flag de final: NEXO/menu devem encaminhar uma vez para `/final`.
6. Rodar `next build` no GitHub Actions e smoke test no Pages.

# NEXT SESSION — Beta 1 · v0.3.0-beta.11

1. QA real em 320/360/390/430 px: resultado aberto + tutorial Edison simultâneo; confirmar ausência de cartões/rail sobre o relatório.
2. NEXO mobile: iniciar conversa, selecionar cada uma das 3 respostas, enviar, aguardar mensagens e repetir com teclado virtual aberto.
3. Abrir FICHA durante ocorrência ativa e confirmar pausa do relógio + scroll/fechamento em mobile.
4. Desenvolvimento: testar técnica, atributo e milestones múltiplos em 360/390 px.
5. Manual, confirmação de encerrar turno/noite, Date e Novo Jogo: confirmar CTA sempre visível acima de safe-area.
6. Rodar `next build` no GitHub Actions e smoke test no Pages em Android/iOS reais.

# NEXT SESSION — Beta 1 · v0.3.0-beta.8 (Pausa contextual)

## Primeiro gate — pausa contextual no browser
- Com um chamado aguardando, abrir FICHA por 15–30s e confirmar que relógio e deadline não avançam.
- Fechar a FICHA e confirmar retomada sem salto de tempo.
- Selecionar 2 agentes para disparar tutorial de Ressonância; deixar o tutorial aberto e confirmar relógio congelado.
- Registrar o tutorial e confirmar retomada sem consumir o período de leitura.
- Repetir em 360/390/430 px e desktop.

## Implementado em 2026-10-06
- Abrir briefing a partir de CHAMADOS ativa o painel MAPA antes de mostrar o modal.
- Mobile usa briefing full-screen com uma região rolável e action bar não sobreposta.
- Em <=600 px, agentes usam lista touch; seleção fica visualmente explícita.
- Fechar retorna à aba anterior; despachar/expirar retorna a CHAMADOS.
- QA estático específico: `npm run qa:mobile-dispatch`.

## Próximo gate obrigatório
1. No GitHub Pages, testar 360/390/430 px: CHAMADOS → abrir caso → selecionar/remover 1–3 agentes → FICHA → DESPACHAR.
2. Confirmar que o primeiro E-04 abre imediatamente a partir de CHAMADOS e que o balão de Edison não cobre o CTA.
3. Testar scroll completo do briefing e safe-area em Android/iPhone; nenhuma seção ou botão pode ficar inacessível.
4. Fechar briefing deve voltar à aba de origem; despacho/expiração devem retornar a CHAMADOS.
5. Repetir com ocorrência normal, agente indisponível e equipe de 3 para confirmar estados disabled/selecionados.
6. Depois continuar o gate Beta 1 de save cloud em segundo dispositivo/perfil.

---

# NEXT SESSION — Beta 1 · v0.3.0-beta.6 (auth mobile hotfix)

1. Publicar a beta.6 no GitHub Pages e testar ENTRAR/CRIAR CONTA em ao menos um desktop e celulares 360/390/430 px.
2. Confirmar que tocar em CRIAR CONTA revela Nome de exibição e troca o CTA para CRIAR CONTA.
3. Criar uma conta real sem confirmação de e-mail, fazer logout e login novamente.
4. Confirmar que JOGAR SEM CONTA permanece funcional.
5. Se houver falha apenas em um navegador/dispositivo, registrar navegador, sistema e screenshot antes de mudar Supabase.

## Gate imediato — GitHub Pages build hotfix

1. Subir o pacote hotfix no branch `main`.
2. Confirmar que `Deploy GitHub Pages` conclui o `next build` sem os 10 erros de narrowing anteriores.
3. Se o compilador revelar um erro subsequente que estava mascarado pelos anteriores, registrar o log exato antes de qualquer mudança funcional.
4. Com deploy verde, abrir a URL de Pages e testar novo jogo, conta simples e reload de rota.

# NEXT SESSION — Beta 1 · v0.3.0-beta.5 (auth simples + GitHub Pages)

1. No Supabase de staging, desativar **Authentication > Providers > Email > Confirm email**.
2. No GitHub Pages, testar: criar conta -> login automático -> criar/alterar save -> reload -> logout -> login -> recuperar save cloud.
3. Testar e-mail já cadastrado e senha incorreta; nenhum fluxo deve pedir confirmação de e-mail.
4. Manter os gates de browser/mobile e Supabase já pendentes da Beta 1.

# NEXT SESSION — Beta 1 · v0.3.0-beta.4 (GitHub Pages gate)

## Próximo item obrigatório
1. Subir o pacote em um repositório GitHub e selecionar **Settings → Pages → GitHub Actions**. O `npm ci` local expirou no ambiente atual; usar o workflow como gate de build real.
2. Confirmar workflow `Deploy GitHub Pages` verde e abrir a URL do environment `github-pages`.
3. Testar menu, Introdução, Central, NEXO, Desenvolvimento e ao menos um Date por URL direta/reload.
4. Confirmar imagens do menu, Edison, mapa, heróis, chats e Dates sob `/NOME-DO-REPO/`.
5. Se Supabase for usado, configurar variable/secret e testar Auth + sync na origem `github.io`.
6. Depois continuar o gate runtime/performance/Supabase já pendente da Beta 1.

# NEXT SESSION — Beta 1 · v0.3.0-beta.3 (gate runtime/performance)

## Próximo item obrigatório
1. Em `next dev`, executar um expediente completo e confirmar relógio/spawn/expiração/resolução sem regressão.
2. Com Supabase staging conectado, observar revisões: ticks sem evento não devem criar revisões/uploads; despacho, resultado e mudanças reais devem sincronizar.
3. Deixar o primeiro E-04 parado por alguns minutos reais e confirmar tempo congelado; ao despachar, o relógio deve retomar do mesmo minuto.
4. Testar conflito local/cloud e reconexão offline após a otimização de sync.
5. Rodar golden path completo do Beta 1 e mobile 360/390/430 px.
6. Só depois promover Beta 1 para candidata externa.

# NEXT SESSION — Beta 1 · v0.3.0-beta.2 (Supabase staging + QA runtime)

## Implementado em 2026-10-06
- Arquitetura local-first desacopla gameplay do backend.
- Auth Supabase real via REST: signup/login/refresh/logout.
- Save cloud via `game_saves` + RLS, com um slot `campaign` na Beta 1.
- Sincronização automática após escrita local somente depois do vínculo da conta.
- Conflito local/cloud exige escolha explícita do jogador.
- Menu de conta não usa mais sessão preview/mock.
- Beta 1 identificada como `v0.3.0-beta.2`; save schema continua v10.
- QA estático 44/44, assets 35/35 e QA arquitetura Beta 1 17/17.

## Próximo item obrigatório — gate Beta 1
1. Criar projeto Supabase de staging, executar `supabase/migrations/001_beta1_game_saves.sql` e configurar `.env.local` a partir de `.env.example`.
2. Em `next dev`, testar criar conta com confirmação de e-mail habilitada e desabilitada; depois login, refresh de token e logout.
3. Criar save como convidado, entrar numa conta sem save remoto e confirmar upload inicial + sincronização após progresso.
4. Abrir a mesma conta em outro navegador/perfil e confirmar download do save remoto.
5. Produzir divergência local/cloud, entrar novamente e validar os dois caminhos `USAR LOCAL` e `USAR NUVEM` sem sobrescrita silenciosa.
6. Desconectar rede durante gameplay: progressão local deve continuar; reconectar e confirmar envio posterior após nova escrita.
7. Reexecutar golden path do tutorial/Dispatch/Desenvolvimento/NEXO/Date e migração v9→v10 em browser real.
8. Só após esse gate marcar Beta 1 como candidata a distribuição externa.

---

# NEXT SESSION — v0.2.65 (Edison Tutorial UX v3; QA runtime pendente)

## Implementado em 2026-10-06
- `EdisonCoach` unifica tutorial do primeiro Dispatch e tutoriais progressivos, com retrato, tons, pista de alvo e spotlight.
- Desenvolvimento marca tutorial por ação real: selecionar `UP`, escolher técnica e confirmar atributo.
- NEXO marca pós-expediente ao abrir conversa e Date ao usar `IR PARA ENCONTRO`.
- Manual da Agência disponível em Central, Desenvolvimento e NEXO, com entradas desbloqueadas por flags existentes.
- Primeiro turno recebeu apresentação visual de Edison; responsividade mobile do coach/manual incluída.
- Save schema permanece v10; gameplay/balanceamento/cânone não mudaram.
- QA estático 44/44 PASS; assets sociais 35/35 PASS.

## Próximo item obrigatório
1. Em `next dev`, executar Novo Jogo → primeira introdução de Edison → E-04 e confirmar spotlight/alvos sem bloquear cliques.
2. No Desenvolvimento, testar técnica e atributo: coach deve permanecer até a ação real e a flag deve persistir após reload.
3. Forçar dois milestones consecutivos e confirmar que o coach acompanha a etapa atual sem liberar o pós-expediente antes da hora.
4. No Dispatch, testar Ressonância, Combo e Condição em desktop e 360/390/430 px; confirmar que o spotlight não cobre botões essenciais.
5. No NEXO, confirmar que abrir uma conversa registra o tutorial pós-expediente e que o tutorial de Date só é concluído ao clicar `IR PARA ENCONTRO`.
6. Abrir o Manual da Agência nas três superfícies, testar entradas bloqueadas/desbloqueadas e navegação mobile.
7. Continuar o gate geral de E2E, nome/pronomes e migração v9→v10.

---

# NEXT SESSION — v0.2.64 (Tutorial Progressivo v2; QA runtime pendente)

## Implementado em 2026-10-06
- Tutoriais contextuais persistentes para Desenvolvimento, técnica, atributo, Maestria, equipe/Ressonância, combo, condição, NEXO pós-expediente e Date.
- Save schema permanece v10; nenhuma fórmula de Dispatch, XP, recompensa, rota ou Date foi alterada.
- QA estático 39/39 PASS; assets sociais 35/35 PASS.

## Próximo item obrigatório
1. Em `next dev`, executar o golden path: Novo Jogo → E-04 → restante do expediente → relatório → Desenvolvimento → upgrade → NEXO → próxima noite.
2. Forçar XP suficiente para dois milestones no mesmo agente e confirmar que ambos aparecem em sequência e que o pós-expediente só libera após resolver todos.
3. Testar pela primeira vez um nível 2/4/6 e um nível 3/5, confirmando tutorial único, preview de atributo e persistência das flags após reload.
4. No Dispatch, selecionar 2+ agentes, depois uma dupla com combo e um agente cansado/machucado; confirmar que cada orientação aparece uma vez e não altera chance estimada.
5. No NEXO, confirmar tutorial de pós-expediente e depois o tutorial de primeiro convite de Date; validar que convite persiste e apenas uma saída presencial pode ser reservada por noite.
6. Testar Maestria após Nv6 e confirmar que o tutorial só aparece quando `masteryRank > 0`.
7. Continuar o gate geral de browser/E2E, nome/pronomes e migração v9→v10 já pendente.

---

# NEXT SESSION — v0.2.63 (NEXO operacional contextual v2; QA runtime pendente)

## Implementado em 2026-10-06
- 48/48 ocorrências do banco ativo possuem comentários pré-despacho contextualizados.
- Afinidades de poder geram fala própria quando o herói compatível foi realmente despachado; `inc-006`/Alexandra também foi coberto.
- A equipe altera o diálogo: pares já registrados em Ressonância/combos têm interação própria; demais composições usam fallback com o colega real.
- Falas por tags/especialidade cobrem casos sem afinidade/par autorado.
- Conclusão diferencia sucesso, sucesso com custo, sucesso parcial e falha; equipes de 2+ podem ter reação do segundo membro.
- DOCX revisável sincronizado em `docs/authoring/chat-scripts/NEXO - Guerreiros Elementais.docx`.
- QA estático 33/33 PASS; assets 35/35 PASS; save schema permanece v10.

## Próximo item obrigatório
1. Em `next dev`, escolher a **mesma ocorrência** e comparar ao menos duas composições de equipe diferentes; confirmar que a conversa muda de acordo com os membros enviados.
2. Testar uma ocorrência com afinidade (ex.: E-04/Hélio, `inc-006`/Alexandra ou C-03/Yuki+Hélio) com e sem o herói afim, confirmando prioridade correta sem alterar a chance mecânica.
3. Testar pares positivos/negativos e combos já registrados, incluindo Elysia+Hélio, Demétria+Eros e Alexandra+Elysia; confirmar que não surgem relações novas fora do cânone.
4. Testar equipes de 1, 2 e 3 agentes e os quatro resultados (`success`, `cost`, `partial`, `failure`), verificando ordem temporal, scroll e reação do segundo membro.
5. Depois continuar o gate geral de browser/E2E, nome/pronomes e migração v9→v10 já pendente.

---

# NEXT SESSION — v0.2.62 (grupo NEXO autorado; QA runtime pendente)

## Implementado em 2026-10-06
- Respostas iniciais dos sete Guerreiros Elementais foram reescritas com base na voz dos chats individuais já autorados.
- Comentários de ocorrência, mensagens de missão e conversa ambiente do grupo deixaram de ser placeholders.
- Documento revisável criado em `docs/authoring/chat-scripts/NEXO - Guerreiros Elementais.docx`.
- Estrutura/cadência do grupo não mudou; somente o texto autoral foi revisado.
- Save schema permanece v10.

## Próximo item obrigatório
1. Em `next dev`, repetir o onboarding e revisar a sequência das sete respostas do grupo, verificando voz, timing, scroll e indicador de digitação.
2. Durante o expediente, observar comentários de ocorrência, atualizações de missão e conversa ambiente no grupo; confirmar que não há `[PLACEHOLDER]` nessas superfícies.
3. Se houver revisão textual, alterar primeiro o DOCX do grupo e sincronizar a versão aprovada com `introduction.ts`/`operations.ts`.
4. Continuar o gate geral já pendente de E2E, nome/pronomes e migração v9→v10.

---

# NEXT SESSION — v0.2.61 (NEXO activity + onboarding safety)

## Implementado em 2026-10-06
- Contatos do NEXO reordenam por atividade real; envio registra `nexo:activity:*`; turno ainda não iniciado não sobe por `timeLabel`.
- Respostas iniciais do grupo Guerreiros Elementais aparecem uma por vez com indicador de digitação.
- Retrato de Alexandra atualizado com o novo asset fornecido.
- Primeiro E-04 congela o relógio enquanto aguarda o despacho, impedindo expiração/softlock do tutorial.
- Save schema permanece v10.

## Próximo item obrigatório
1. Em `next dev`, confirmar visualmente que responder/enviar em uma DM move esse contato para o topo e que DMs ainda não iniciadas não aparecem acima de mensagens novas.
2. Repetir o onboarding desde Novo Jogo e confirmar a cadência de 7 respostas do grupo, inclusive scroll e botão bloqueado durante a entrega.
3. Deixar E-04 aberto por mais de 75 minutos diegéticos/equivalente e confirmar que o relógio permanece pausado, o caso continua despachável e o tutorial segue após Hélio.
4. Confirmar o novo retrato de Alexandra no roster, NEXO e demais superfícies que usam `getHeroPortrait`.
5. Continuar o gate geral já pendente de E2E/nome-pronomes/migração v9→v10.

---

# NEXT SESSION — v0.2.60 (hotfix validação social)

## Corrigido em 2026-10-06
- Alexandra D2–D6 não é mais duplicada pelo gerador placeholder.
- Eros D1–D6 possui exatamente 3 respostas em todos os turnos; base autoral preservada.
- Convites de Date D3/D6 do Eros estão presentes em todas as respostas finais.
- `validateEditableContent()` PASS; `qa:flow:static` 25/25; assets 35/35.

## Próximo item obrigatório
1. Reabrir o projeto em `next dev` e confirmar que `app/layout.tsx` passa por `validateEditableContent()` sem Runtime Error.
2. Em `/qa/social`, abrir Alexandra D2–D6 e Eros D1–D6; confirmar uma única cena por estágio, três respostas por turno e CTA de Date em D3/D6.
3. Depois continuar o gate já registrado de nome/pronomes (Ele/dele, Ela/dela, Elu/delu) e migração v9→v10.

---

# NEXT SESSION — v0.2.59 (nome/pronomes + normalização editorial)

## Implementado em 2026-10-06
- Novo Jogo coleta nome e pronomes: Ele/dele, Ela/dela ou Elu/delu.
- Save schema atualizado para v10; migração de v9 preserva saves e usa Ele/dele como compatibilidade histórica.
- `lib/playerText.ts` centraliza interpolação de nome, pronome, possessivo e flexão excepcional.
- NEXO, previews, engine de diálogo e Dates usam a mesma interpolação.
- Rotas sociais e Dates foram normalizados para reduzir gênero do protagonista sem mudar eventos, intenção romântica, cânone ou resultado das cenas.
- Os sete DOCX autorais recebidos nesta sessão foram atualizados em `docs/authoring/chat-scripts/`.

## Próximo item obrigatório
1. Executar o harness E2E em ambiente com Playwright/Chromium e validar Novo Jogo com as três opções de pronome.
2. Em `/qa/social`, revisar visualmente as sete rotas e os Dates procurando token não resolvido (`{{...}}`) ou flexão residual do protagonista.
3. Testar importação de um save v9 e confirmar migração para v10 sem perda de rota/progresso.
4. Só após harness verde continuar o backlog visual/runtime já registrado abaixo.

---

# NEXT SESSION — v0.2.58 (E2E tentado em 2026-10-06; runtime/browser ainda pendente)

## Integração Eros — 2026-10-06
- Eros D1–D6 integrado a partir do texto fornecido pelo autor nesta sessão, sem correção/reautoria das falas e narração.
- As três fotos fornecidas foram adicionadas em `public/nexo/eros/chat-1.jpg`, `chat-2.jpg` e `chat-3.jpg`, nos pontos FOTO CHAT 1/2/3 indicados pelo autor.
- Dates 1/2 de Eros substituem os placeholders em `content/narrative/outings.ts`; nenhum background novo de Date foi fornecido, portanto o retrato já existente de Eros continua como fundo provisório, sem criação de asset/cânone.
- Eros foi removido dos geradores placeholder e marcado `authored: true`.
- [Histórico v0.2.58, superseded em v0.2.60] A primeira integração de Eros tinha uma única escolha; o estado atual usa 3 respostas por turno preservando a fala-base.
- `npm run qa:flow:static`: **24/24 PASS**. `npm run validate:social-assets`: **35/35 PASS**.
- Versão permanece **v0.2.58**; save schema permanece **v9**. QA runtime/browser continua pendente.


## Retomada desta sessão — 2026-10-06
- Baseline exclusiva: ZIP `Agencia-Ressonancia-v0.2.58-Alexandra-Chat-Dates-2026-10-05.zip` fornecido nesta sessão.
- Versão confirmada: `package.json` 0.2.58; save schema v9; Foundation v0.1.0 permanece a baseline de origem arquitetural.
- `PROJECT_CONTEXT.md`, `EDIT_HERE.md`, `content/README.md` e os arquivos de `docs/failsafe/`, `docs/authoring/`, `docs/design/` e `docs/canon/` foram lidos antes de qualquer alteração de código; o banco de casos DOCX também foi processado.
- Executado `TESTAR_JOGO.sh` conforme o próximo item obrigatório. O ambiente encerrou a etapa de instalação/E2E com `TransportTimeoutError`; isso não é um FAIL funcional do harness e não autoriza mudança de gameplay.
- Revalidações disponíveis: `npm run qa:flow:static` = 22/22 PASS; `npm run validate:social-assets` = 32/32 PASS.
- Nenhum código de gameplay, conteúdo narrativo, cânone, balanceamento ou schema de save foi alterado.

## Próximo item obrigatório
1. Executar `TESTAR_JOGO.bat` (Windows) ou `TESTAR_JOGO.sh` em ambiente com Node/npm, rede estável e permissão para concluir a instalação do Playwright/Chromium.
2. Só se o E2E produzir FAIL real, abrir `qa/playtest/reports/html/index.html` e inspecionar trace/screenshot/vídeo antes de modificar gameplay.
3. Com o harness verde, em `/qa/social`, testar Alexandra D1–D6: exatamente três opções por turno, histórico/reload e progressão de `routeStage`.
4. Conferir fotos de Alexandra em D3/D5/D6 e Dates 1/2 em desktop e 360/390/430 px; ajustar somente crop/CSS se necessário, sem alterar autoria.
5. Validar CTA persistente, reload, replay/QA e Memórias → Dates nos marcos 3/6 de Alexandra; repetir `npm run validate:social-assets` e a validação de conteúdo/runtime antes do próximo handoff.

# NEXT SESSION — v0.2.58 (Alexandra D1–D6 + Dates 1/2 integrados; QA runtime/visual pendente)

## Autoria Alexandra integrada em 2026-10-05
- Rota Alexandra D1–D6 autorada com as três opções fornecidas em cada turno; opção 1 permanece a fala-base.
- Fotos: D3 vestido branco, D5 parque, D6 elevador. Dates: D3 teatro/ballet contemporâneo, D6 apartamento do Analista.
- `SOCIAL_ROUTE_MANIFEST`: Alexandra `authored: true`; placeholders de outing D3/D6 removidos.
- `npm run validate:social-assets`: 32/32 OK. `npm run qa:flow:static`: 22/22 PASS.
- Save schema v9 e versão 0.2.58 preservados. Nenhuma mecânica/balanceamento foi alterado.

## Próximo item obrigatório
1. Em ambiente com dependências completas e navegador, executar o harness E2E já pendente (`TESTAR_JOGO.bat`/`.sh`) antes de alterar gameplay.
2. Com o harness verde, em `/qa/social`, testar Alexandra D1–D6: exatamente três opções por turno, histórico/reload e progressão de `routeStage`.
3. Conferir fotos de Alexandra em D3/D5/D6 e os Dates 1/2 em desktop e 360/390/430 px; ajustar somente crop/CSS se necessário, sem alterar autoria.
4. Validar CTA persistente, reload, replay/QA e Memórias → Dates nos marcos 3/6 de Alexandra.
5. Repetir `npm run validate:social-assets` e a validação de conteúdo/runtime antes do próximo handoff.

---

# NEXT SESSION — v0.2.58 (E2E tentado novamente; ambiente ainda bloqueia instalação)

## Retomada desta sessão — 2026-10-05
- Baseline exclusiva: ZIP `Agencia-Ressonancia-v0.2.58-Playtest-Automatizado-2026-10-05.zip`.
- Versão confirmada: `package.json` 0.2.58; save schema v9.
- `PROJECT_CONTEXT.md`, `EDIT_HERE.md`, `content/README.md` e os arquivos de `docs/failsafe/`, `docs/authoring/`, `docs/design/` e `docs/canon/` foram processados antes de qualquer alteração.
- O próximo item obrigatório foi executado via equivalente shell `TESTAR_JOGO.sh`; o processo foi encerrado pelo ambiente com `TransportTimeoutError` durante a etapa de instalação/E2E. Isso não é um FAIL funcional do harness e não autoriza alteração de gameplay.
- Validações disponíveis após a tentativa: `npm run qa:flow:static` = 20/20 PASS; `npm run validate:social-assets` = 28/28 PASS; `node --check` aprovou os arquivos JS/MJS do harness.
- Nenhum código de gameplay, conteúdo narrativo, cânone, balanceamento ou save foi alterado.

## Próximo item obrigatório
1. Executar `TESTAR_JOGO.bat` (Windows) ou `TESTAR_JOGO.sh` em máquina com Node/npm, internet estável e permissão para instalar Playwright/Chromium.
2. Só se o E2E produzir FAIL real, abrir `qa/playtest/reports/html/index.html` e inspecionar trace/screenshot/vídeo antes de modificar gameplay.
3. Priorizar falhas de continuidade: Date gate/reload/reentrada, milestone/routeStage, avanço Noites 1–7 e guards do modo Só pós-expediente.
4. Com o harness verde, continuar o QA visual/runtime de Hélio D1–D6 e Dates 1/2 já descrito nos blocos anteriores.

---

# NEXT SESSION — v0.2.58 (harness automatizado adicionado; executar E2E em máquina com rede)

## Sistema de teste adicionado em 2026-10-05
- Harness isolado: `qa/playtest/`.
- Entrada simples: `TESTAR_JOGO.bat` no Windows ou `TESTAR_JOGO.sh` em shell.
- `npm run qa:flow:static`: 20/20 PASS nesta sessão.
- `npm run validate:social-assets`: 28/28 PASS.
- O harness E2E usa Playwright + Chromium em desktop e viewport 390 px, gera HTML/JSON e preserva trace/screenshot/vídeo em falha.
- Instalação do Playwright expirou neste ambiente; browser E2E permanece pendente e não deve ser considerado aprovado.

## Próximo item obrigatório
1. Rodar `TESTAR_JOGO.bat` em uma máquina com Node/npm e acesso à internet.
2. Se houver FAIL, abrir `qa/playtest/reports/html/index.html` e inspecionar trace/screenshot/vídeo antes de alterar gameplay.
3. Priorizar qualquer falha que indique impossibilidade de continuar: Date gate/reload/reentrada, milestone/routeStage, avanço Noites 1–7 e guards de modo.
4. Depois do harness verde, continuar o QA runtime/visual de Hélio já registrado abaixo.

---

# NEXT SESSION — v0.2.58 (playtest estrutural concluído; browser ainda obrigatório)

## Playtest de continuidade em 2026-10-05
- Não foi identificado hardlock/softlock reproduzível na inspeção estrutural de campanha, pós-expediente, convites D3/D6, Dates, virada de noite e encerramento operacional.
- `npm run validate:social-assets`: 28/28 OK.
- `npm ci --no-audit --no-fund` expirou novamente; não considerar browser, build ou typecheck aprovados.

## Próximo item obrigatório
1. Em ambiente com dependências completas e navegador, executar o QA runtime do hotfix de entrada no Date: convite D3/D6 → última mensagem → CTA → `/encontro/<sceneId>?launch=1`; testar reload, saída/reentrada, acesso manual sem launch, replay e QA.
2. Fazer smoke test completo de campanha: novo jogo → Introdução → Central → Desenvolvimento → NEXO → próximo dia, incluindo expiração/despacho/relatório e salvar/recarregar em cada fronteira.
3. Fazer smoke test do modo Só pós-expediente por pelo menos Noites 1–7, incluindo convite pendente atravessando noite, Date incompleto, conclusão e reentrada.
4. Depois executar QA visual/runtime de Hélio D1–D6 e Dates 1/2 conforme os blocos já registrados abaixo.

---

# NEXT SESSION — v0.2.58 (runtime/browser continua bloqueado)

## Retomada em 2026-10-05
- Baseline única: ZIP `Agencia-Ressonancia-v0.2.58-Lysandro-Hero-Photo.zip`. Versão 0.2.58; save schema v9.
- Toda a documentação obrigatória de retomada foi relida antes de qualquer alteração.
- `npm ci --no-audit --no-fund` expirou novamente e deixou `node_modules` parcial. Não considerar dependências completas e não empacotar essa pasta.
- `npm run validate:social-assets`: 28/28 OK.
- Hélio foi conferido estaticamente: D1–D6 autorado, três opções por turno, fotos D4/D5/D6, convites D3/D6 e Dates 1/2 com as cinco mídias presentes. Não houve alteração de autoria.

## Próximo item obrigatório
1. Em ambiente com dependências completas e navegador, executar primeiro o QA runtime do hotfix de entrada no Date: convite D3/D6 → última mensagem permanece → `IR PARA ENCONTRO` → `/encontro/<sceneId>?launch=1`; reload deve manter a cena; acesso manual sem `launch=1` deve voltar ao NEXO; replay/QA devem permanecer read-only.
2. Depois, em `/qa/social`, executar o QA visual de Hélio D1–D6, fotos D4/D5/D6, histórico/reload e `routeStage`.
3. Testar Hélio Date 1 e Date 2: CTA persistente, reload, replay/QA e Memórias → Dates.
4. Conferir as cinco imagens em desktop e 360/390/430 px; alterar somente crop/CSS se necessário, sem tocar no texto autoral.
5. Repetir `npm run validate:social-assets` e a validação de conteúdo em runtime antes do próximo handoff.

---

# NEXT SESSION — v0.2.58 (QA runtime + QA Hélio padronizado pendentes)

## Padronização Hélio concluída em 2026-10-02
- Hélio D1–D6 segue agora o padrão textual tomado de Demétria: opção 1 preserva a fala-base do autor; opções 2/3 são variações adicionais aprovadas nesta sessão.
- Texto-base de Hélio e Dates 1/2 foi mantido sem correção editorial automática; Dates continuam lineares e sem opções.
- Fotos D4/D5/D6 e backgrounds dos Dates continuam nos mesmos pontos.
- Convites D3/D6 mantêm `exclusiveOutingDay` e `vnSceneId`; save schema continua v9.
- `npm run validate:social-assets`: 28/28 OK.

## Backlog após concluir todos os chats
- Fazer uma revisão contextual global de todas as novas opções de diálogo adicionadas ao Analista. Para cada opção, verificar se ela conduz naturalmente à próxima mensagem fixa do personagem; corrigir apenas alternativas adicionais que criem quebra de contexto, preservando sempre o texto-base/autoral e o cânone existente.
- Este item só deve ser executado quando **todos os chats estiverem prontos e padronizados**.

## Próximo item obrigatório
1. Com dependências completas, executar o QA runtime do hotfix de entrada no Date já pendente.
2. Em `/qa/social`, testar Hélio D1–D6 e conferir visualmente que cada turno oferece exatamente as três opções aprovadas, mantendo a opção 1 como texto-base.
3. Conferir fotos em D4/D5/D6, histórico/reload e progressão de `routeStage`.
4. Testar Hélio Date 1 e Date 2, confirmando texto linear, CTA persistente, reload, replay/QA e Memórias → Dates.
5. Confirmar enquadramento das cinco imagens em desktop e 360/390/430 px; ajustar apenas crop/CSS se necessário, sem alterar autoria.
6. Repetir `npm run validate:social-assets` e validação de conteúdo em runtime antes do próximo handoff.

---

# NEXT SESSION — v0.2.58 (QA runtime + QA Hélio pendentes)

## Autoria Hélio integrada em 2026-10-02
- Hélio agora possui rota autorada D1–D6, três fotos de chat e Dates 1/2 com as imagens fornecidas pelo autor.
- As falas-base fornecidas foram preservadas e receberam duas alternativas por escolha, seguindo o padrão das rotas já autoradas.
- Hélio foi removido dos geradores placeholder e marcado `authored: true`.
- `npm run validate:social-assets` passou com 28/28 referências locais existentes.
- Save schema continua v9; versão continua 0.2.58.

## Próximo item obrigatório
1. Com dependências completas, executar o QA runtime do hotfix de entrada no Date já pendente abaixo.
2. Em `/qa/social`, testar Hélio D1–D6: três opções por turno, fotos em D4/D5/D6, histórico/reload e progressão de `routeStage`.
3. Testar Hélio Date 1 (convenção) e Date 2 (apartamento), incluindo CTA persistente, reload, replay/QA e Memórias → Dates.
4. Confirmar enquadramento das cinco imagens em desktop e 360/390/430 px; ajustar apenas `backgroundPosition*`/CSS se necessário, sem alterar autoria.
5. Rodar novamente `npm run validate:social-assets` e validação de conteúdo em runtime antes do handoff.

---

# NEXT SESSION — v0.2.58 (QA runtime ainda pendente)

## Estado da retomada em 2026-10-02
- Baseline única confirmada: ZIP `Agencia-Ressonancia-v0.2.58-Hotfix-Date-Entry.zip`; `package.json` = 0.2.58; save schema = v9.
- QA estático do gate de Date: **10/10 verificações aprovadas**. O CTA persiste `outingsByGlobalDay` e navega com `?launch=1`; acesso normal sem `launch=1` retorna ao NEXO; replay/QA ignoram o gate; a seleção persistida da noite continua validada.
- `game/social/outingLaunch.ts` ainda existe como helper órfão da v0.2.57, mas não possui consumidores no código atual. **Não reativar esse gate por sessionStorage.**
- `npm ci --no-audit --no-fund` expirou no ambiente em 2026-10-02 e deixou `node_modules` parcial. Nenhum item de browser/runtime foi marcado como aprovado.
- Não houve alteração de gameplay, conteúdo narrativo, cânone ou schema de save nesta retomada.

## Próximo item obrigatório — executar em navegador com dependências completas
1. Concluir um convite D3/D6 e confirmar que a última mensagem permanece no chat.
2. Pressionar `IR PARA ENCONTRO` e confirmar abertura imediata da tela `CENA PRESENCIAL`, sem retorno inesperado ao NEXO.
3. Recarregar a página do Date e confirmar que a cena permanece acessível.
4. Abrir `/encontro/<sceneId>` manualmente sem `?launch=1` e confirmar retorno ao NEXO.
5. Confirmar replay (`?replay=1`) e QA (`?qa=1`) sem regressão e sem mutação de progresso.
6. Confirmar que sair voluntariamente do Date e reentrar pelo CTA mantém o convite/seleção coerentes.
7. Save schema deve permanecer v9.

---

# QA prioritário — hotfix de entrada no Date v0.2.58
1. Concluir um convite D3/D6 e confirmar que a última mensagem permanece no chat.
2. Pressionar `IR PARA ENCONTRO` e confirmar abertura imediata da tela `CENA PRESENCIAL`, sem retorno inesperado ao NEXO.
3. Recarregar a página do Date e confirmar que a cena permanece acessível.
4. Abrir `/encontro/<sceneId>` manualmente sem `?launch=1` e confirmar retorno ao NEXO.
5. Confirmar replay (`?replay=1`) e QA (`?qa=1`) sem regressão.
6. Save schema permanece v9.

# NEXT SESSION — v0.2.58

# QA prioritário — gate explícito de Date v0.2.57
1. Concluir a última mensagem de um convite D3/D6 e confirmar que a thread permanece aberta e legível; nenhuma navegação automática deve ocorrer.
2. Confirmar que o compositor mostra `IR PARA ENCONTRO` apenas depois da entrega final.
3. Pressionar o CTA e confirmar que somente então aparece a tela presencial `CENA PRESENCIAL / DATE 1|2`.
4. Tentar abrir manualmente `/encontro/<sceneId>` antes do clique e confirmar retorno ao NEXO.
5. Depois do clique, recarregar a página no meio do Date e confirmar retomada normal.
6. Usar `Voltar ao NEXO` antes de concluir e confirmar que reentrar exige novo clique no CTA, sem perder o convite.
7. Regressão: replay e QA preview continuam abrindo sem reservar noite nem alterar progresso; save schema permanece v9.

# NEXT SESSION — v0.2.57

# QA prioritário — robustez social v0.2.56
1. Abrir `/qa/social` e testar `D1 + abrir` até `D6 + abrir` para Yuki, Elysia, Lysandro e Demétria.
2. Em cada rota, alternar `Simular não lida` / `Marcar lida`, voltar ao NEXO e confirmar badge/preview sem duplicação após reload.
3. Concluir/reabrir Date 1 e Date 2 pelo QA e conferir Memórias → Dates, replay e `routeStage` coerentes.
4. No meio de chat, convite e Date, executar reload completo e confirmar que escolhas/flags/milestones não duplicam nem somem.
5. Rodar `npm run validate:social-assets` e `validateEditableContent()` antes de handoff de novas rotas.
6. Importar um save v9 válido e confirmar que normalização não altera progresso legítimo; testar cópia com mapas sociais parciais para confirmar hidratação.
7. Regressão: modo Só pós-expediente avança noites; campanha completa continua intacta; Fotos/Dates/autoscroll/mobile continuam funcionando.

# NEXT SESSION — v0.2.56

# NEXT SESSION — v0.2.55

# QA prioritário — mobile v0.2.54
1. Em 360/390/430 px: abrir `Fotos`, rolar a galeria e usar `Conversas` para voltar à lista.
2. Abrir `Dates`, rolar o arquivo, voltar à lista e reabrir um replay.
3. Durante Date normal/replay/QA, usar o botão superior de retorno e confirmar volta ao NEXO sem conclusão indevida; reabrir Date normal na mesma noite e confirmar retomada da página.
4. Conferir conversa privada → lista pelo botão `‹`, lightbox → fechar, modal Próxima Noite → Voltar.
5. Validar iPhone/Android com barras do navegador visíveis: rodapé, compositor e CTAs não devem ficar sob a safe area.
6. Depois continuar o QA social e a autoria das rotas pendentes.

# NEXT SESSION — v0.2.54

## QA prioritário — hotfix visual NEXO
1. Abrir `/conversa` em desktop (~1024x768 e maior) e confirmar que Conversas/Fotos/Dates aparecem como barra compacta.
2. Confirmar que a lista de contatos ocupa o restante da coluna e possui scroll interno.
3. Repetir em mobile <=780px e verificar troca entre lista, memórias e conversa.
4. Depois continuar o QA do pacote social v0.2.52 e autoria das rotas pendentes.

- NEXO: confirmar contador de novidades persistente por turno; abrir contato deve remover o badge e reload não deve recriá-lo para o mesmo turno.
- Fotos: concluir turnos com imagens de Yuki/Elysia/Lysandro/Demétria e validar que apenas mídias já alcançadas aparecem em Fotos; lightbox fecha por clique e Escape.
- Dates: concluir Date 1/2, abrir Memórias → Dates → REVER e confirmar que replay não altera `routeStage`, milestone, saída da noite ou flags.
- Entrada de Date: convite → transição → cartão DATE → Começar Date; movimento reduzido deve remover o delay.
- Leitor: validar Anterior, Continuar, ←/→, paginação e transição de beats do Lysandro.
- Mobile 360/390/430 px: abas do NEXO, galeria 2 colunas, arquivo de Dates, modal Próxima Noite e leitor sem overflow.
- `/qa/social`: testar Noite 1–6, D1–D6, abertura direta de chat, previews Date 1/2, flags e resets sociais; confirmar que Dispatch/XP/atributos são preservados.
- Rodar validação de conteúdo em runtime de desenvolvimento para confirmar o manifesto D1–D6 + Dates 3/6.

## QA prioritário — Dates v0.2.51
- Abrir Date 1 e Date 2 de Yuki, Elysia, Lysandro e Demétria; confirmar texto e ordem integralmente preservados.
- Confirmar paginação em cenas longas, contador `1/N` e barra de progresso.
- No Date 2 de Lysandro, validar que `Ir para a casa de Lysandro` aparece somente no fim do beat do restaurante e troca o background corretamente.
- Sair e reabrir um encontro na mesma noite: deve retomar a página atual.
- Finalizar o Date: milestone/routeStage/completion flag só devem ser gravados no botão final; retorno deve ser para o NEXO.
- Tentar abrir novamente pela URL um Date já concluído: deve mostrar estado concluído e oferecer apenas `Voltar ao NEXO`.
- Validar desktop e mobile, inclusive texto longo sem botão escondido ou overflow.

## QA prioritário — NEXO v0.2.50
- Confirmar badge de mensagem nova até abrir o contato; após abrir, o badge some.
- Confirmar ✓ em conversas concluídas e badge DATE em convites persistentes.
- Validar indicador NOITE/DIA na lista e no cabeçalho da thread em desktop/mobile.
- Com conversa não lida e/ou convite pendente, abrir Próxima Noite e conferir o aviso contextual; Voltar não altera o save.
- Confirmar fotos com enquadramento consistente, clique para ampliar e fechamento do lightbox.
- Selecionar uma resposta: demais opções ficam bloqueadas; desmarcar a escolhida restaura as opções; enviar integra a escolha ao histórico.
- Confirmar autoscroll quando perto do fim e botão de mensagens recentes quando o usuário estiver lendo acima.
- Confirmar que fim de conteúdo mostra conversa concluída, sem aparência de erro.

## Hotfix v0.2.49 — QA prioritário

1. Iniciar **Só pós-expediente** e concluir/ignorar conversas da Noite 1.
2. Pressionar **PRÓXIMA NOITE** e confirmar que abre o modal “Deseja ir para o próximo dia?”.
3. Testar **Voltar**: modal fecha e a noite não muda.
4. Testar **Ir para próximo dia**: contador muda imediatamente para Noite 2, a thread aberta fecha e as etapas elegíveis do próximo dia aparecem sem recarregar a página.
5. Repetir Noite 2 → 3 e validar que o avanço continua funcionando.
6. Confirmar que o modo campanha normal continua usando o fluxo existente para `/agencia`.


## QA prioritário — fluxo de entrada
- Desktop 1920×1080, 1440×900 e 1366×768: abrir e voltar entre todos os painéis sem overflow ou perda do fade da cidade.
- CONTINUAR: validar rotas para onboarding, Central, Desenvolvimento e pós-expediente conforme o estado do save.
- NOVO JOGO: com e sem save existente; confirmação não pode apagar nada se cancelada.
- CARREGAR JOGO: continuar slot local, exportar JSON, importar save válido e rejeitar arquivo inválido.
- CONTA / ACESSO: Entrar, Criar Conta e Jogar sem Conta; confirmar que nenhuma senha aparece no localStorage.
- CONFIGURAÇÕES: movimento reduzido persiste; velocidade RÁPIDA reduz a cadência das bolhas do NEXO; tela cheia falha com mensagem amigável quando indisponível.
- SALVAR E SAIR: Central, Desenvolvimento e NEXO devem retornar ao menu e CONTINUAR deve retomar o mesmo estado.
- Mobile 360/390/430 px: todos os painéis devem caber com scroll interno natural e botões de toque confortáveis.

## Regressão obrigatória
- Yuki e Elysia D1–D6, convites persistentes e dates lineares inalterados.
- Briefing da Central continua overlay do mapa; menu não pode vazar CSS para `/agencia`.
- Save schema permanece v9; não resetar saves para QA.
- `app/login` e `app/novo-jogo` continuam funcionando como aliases de compatibilidade para os painéis do menu.


## Regressão v0.2.41
- Conferir os sete dossiês em desktop/mobile: idade, altura e peso devem caber sem sobreposição.
- Confirmar Elysia com 21 anos tanto na ficha quanto na apresentação do NEXO (correção autoral de 2026-10-06).


## QA prioritário — Lysandro
- Validar etapas 1–6 completas no NEXO, incluindo iniciativa correta de quem começa cada conversa.
- Conferir as três fotos: milkshake após a primeira resposta do estágio 2; espelho após a última troca do estágio 4; foto do estágio 6 após “Indo”.
- Validar convites persistentes do Bar do Becos (estágio 3) e restaurante/casa (estágio 6): não avançar a rota antes do date e manter IR PARA ENCONTRO em dias seguintes.
- Conferir Date 1/Date 2 como texto corrido e confirmar que o segundo termina exatamente em “fechando a porta.”
- Confirmar que placeholders D2–D6 de Lysandro não aparecem mais e que apenas Hélio, Demétria, Alexandra e Eros continuam placeholder nas etapas principais.


## v0.2.43 — mídia de Lysandro
- As três fotos de NEXO de Lysandro foram substituídas pelos arquivos autorais mais recentes, preservando os mesmos pontos da rota D2/D4/D6.
- Date 1 de Lysandro agora usa background autoral do Bar do Becos em `public/outings/lysandro/date-1-bar.webp`.
- Date 2 de Lysandro agora usa background autoral do restaurante em `public/outings/lysandro/date-2-restaurante.webp`.
- Nenhuma fala, escolha, progressão de rota ou regra de save foi alterada. Save permanece schema v9.


## Primeiro passo — QA runtime do modo Só pós-expediente
- Em `NOVO JOGO`, criar um save com **Só pós-expediente** e confirmar entrada direta em `/conversa`, sem Introdução/Central/Desenvolvimento.
- Confirmar que a lista NEXO e as rotas começam na etapa 1 normalmente.
- Concluir uma etapa de rota, pressionar `PRÓXIMA NOITE` e confirmar: `currentDay + 1`, permanência em `/conversa`, mesma rota social persistida e nova etapa liberada apenas na noite seguinte.
- Confirmar que uma saída presencial por noite continua valendo e que convite pendente sobrevive à virada de noite.
- Tentar abrir `/introducao`, `/agencia` e `/desenvolvimento` manualmente: todos devem voltar para `/conversa`.
- Confirmar que a **Campanha completa** continua iniciando pela Introdução e segue o fluxo anterior sem regressão.

## Depois — QA runtime do Date 2 de Lysandro
- A estrutura estática já foi validada em v0.2.45; falta confirmar em navegador porque a instalação de dependências expirou nesta sessão.
- Abrir `outing-day6-lysandro` por um save válido com convite pendente: o primeiro beat deve usar o restaurante.
- Pressionar `Ir para a casa de Lysandro`: deve trocar para `date-2-casa.webp` sem registrar milestone, completion flag ou avanço de rota ainda.
- Pressionar apenas o botão final no segundo beat: então registrar o outing 6, avançar a rota e voltar ao NEXO.
- Não resetar save para executar esse QA.

## Depois do Date 2
- Continuar o QA prioritário de Lysandro D1–D6, fotos e convites persistentes já listado acima.
- Em seguida, retomar os itens de QA do fluxo de entrada e as rotas autorais pendentes Hélio/Demétria/Alexandra/Eros conforme roadmap, sem inventar texto fora dos arquivos de autoria recebidos.

## Backlog registrado — não antecipar antes das conversas individuais
- Após finalizar as rotas/conversas individuais: revisar grupos do NEXO por personalidade + equipes; avaliar/prototipar interação social de fim de expediente; implementar adaptador global de nome/pronomes.
- A especificação detalhada está em `docs/failsafe/ROADMAP.md`, seção **Backlog pós-finalização das conversas individuais**.

### Lembrete pós-chats
Quando TODOS os chats estiverem prontos, executar o bloco `Pós-chats — padronização e identidade do jogador` de ROADMAP.md: padronização global pelo modelo Demétria, revisão de continuidade das opções, nome do jogador + seletor de pronomes, revisão contextual de `Analista` nos Dates/game e QA textual/migração de saves.

## Continuação obrigatória após v0.2.59
1. Rodar E2E/browser do fluxo Novo Jogo -> NEXO -> Date com **Ele/dele**, **Ela/dela** e **Elu/delu**; procurar tokens literais, concordância quebrada e regressões de gate.
2. Em `/qa/social`, percorrer todos os personagens/dias e confirmar visualmente `{{playerName}}` e `{{playerForm:...}}` resolvidos.
3. Importar um save v9 real e confirmar migração para v10 com `player.pronouns = "ele-dele"`, sem perda de relações, estágios ou flags.
4. Só depois desses gates, continuar o próximo item de gameplay/conteúdo registrado no backlog; não reverter a arquitetura de interpolação centralizada.


## Correção autoral aplicada — Elysia/Yuki (2026-10-06)
- Usar somente `docs/authoring/chat-scripts/Elysia - Chat.docx` e `Yuki - Chat.docx` atuais; versões anteriores desses dois roteiros estão superseded.
- QA prioritário: conferir D1–D6 de Elysia/Yuki contra os DOCX, especialmente falas fixas que não devem virar escolhas.
- Confirmar Elysia = 21 anos na ficha e no D1.
- O próximo gate geral continua sendo E2E/browser das três opções de pronome + migração v9→v10.


## QA adicional — Beta 1 tutorial visual
- Abrir E-04 em 1920x1080, 1366x768 e mobile; confirmar que o balão do Edison não comprime briefing nem cobre o botão de despacho.
- Abrir o resultado do E-04 e confirmar que o balão permanece visível, sem blackout adicional, e não cobre ARQUIVAR RESULTADO.
- Capturar screenshot do briefing e do resultado para confirmar persistência visual do coach.

- QA beta.14: testar conta existente em desktop e mobile: ENTRAR -> e-mail -> senha -> ENTRAR; depois alternar criar conta -> voltar por JÁ TENHO CONTA -> ENTRAR.
