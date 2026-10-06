## Beta 1 · v0.3.0-beta.10 — Confirmação de encerramento + clareza do NEXO (2026-10-06)

- Encerrar a noite agora sempre exige confirmação explícita, inclusive na campanha completa.
- O NEXO informa que conversar é opcional e que o jogador pode falar com todos os contatos disponíveis.
- Para avançar uma rota, a UI/tutorial explicita que é preciso abrir o contato e enviar/responder a mensagem disponível.
- Ao fim do expediente, avançar para Desenvolvimento agora passa por confirmação explícita de encerramento do turno.
- Nenhuma regra de Dispatch, social, Supabase ou save schema foi alterada.

## Beta 1 · v0.3.0-beta.9 — Dispatch responsive messaging (2026-10-06)
- Feed NEXO operacional endurecido para telas estreitas/baixas: scroll, min-height e wrapping corrigidos.
- Briefing passa a espelhar as 3 mensagens operacionais mais recentes em layouts comprimidos e mobile.
- Chrome do NEXO é compactado em desktop baixo sem reduzir legibilidade do feed.
- Novo QA `qa:dispatch-responsive` com 9 verificações. Save schema permanece v10.

## Beta 1 · v0.3.0-beta.8 — Pausa contextual de leitura (2026-10-06)
- FICHA de agente congela o relógio operacional enquanto aberta, inclusive com ocorrência ativa.
- Tutoriais bloqueantes de Ressonância/Combo/Condição congelam o relógio até serem fechados.
- Retomada reancora `startedAtEpochMs` uma única vez pelo tempo real pausado, preservando deadlines e duração de missão.
- Cabeçalho sinaliza `PAUSADO · LEITURA`.
- Novo QA estático `qa:clock-pause`.

## Beta 1 · v0.3.0-beta.7 — Dispatch mobile reliability (2026-10-06)
- Corrigido bug estrutural: briefing é filho do MAPA e podia ficar invisível ao abrir um chamado pela aba CHAMADOS; abertura agora ativa MAPA antes do modal.
- Fechar briefing restaura aba de origem; despacho/expiração retornam a CHAMADOS.
- Briefing mobile reorganizado em header + scroll interno + action bar, sem footer fixed cobrindo conteúdo.
- Agentes ganham alvos touch maiores, lista vertical em telas estreitas, estado `aria-pressed` e marcador +/✓.
- Edison do primeiro caso fica no topo no mobile para não cobrir DESPACHAR.
- Nenhuma fórmula, chance, duração, conteúdo ou save schema foi alterado.

## Beta 1 · v0.3.0-beta.6 — hotfix cadastro mobile (2026-10-06)
- ENTRAR/CRIAR CONTA migrados para controles de modo `type="button"`, sem semântica de submit.
- Área de toque e z-index/pointer-events reforçados; mobile empilha os modos para evitar sobreposição.
- Atalho redundante no formulário permite alternar login/cadastro mesmo se o controle superior estiver fora da área confortável.
- Supabase, RLS, save v10 e gameplay sem mudanças.

## 2026-10-06 — GitHub Pages TypeScript build hotfix

- Corrigidos os narrowing errors reportados pelo `next build` do GitHub Actions em `app/agencia/page.tsx`, `app/conversa/page.tsx` e `app/encontro/[sceneId]/page.tsx`.
- Callbacks de tutorial agora revalidam `save` antes de montar `SaveGame`; `finishScene` revalida `scene` antes de closures que a utilizam.
- Nenhuma regra de gameplay, conteúdo, save schema, autenticação ou persistência foi alterada.
- QAs estáticos: flow 44/44, assets 35/35, arquitetura 17/17, refactor 15/15, GitHub Pages 12/12, auth 5/5.
- `npm ci` voltou a expirar no ambiente de execução; o gate final continua sendo o `next build` no GitHub Actions.

## Beta 1 · v0.3.0-beta.5 — autenticação simples (2026-10-06)
- Removido o fluxo de confirmação de e-mail da Beta 1.
- Criar conta agora exige sessão imediata e faz login automático.
- Setup documenta `Confirm email` desativado no Supabase.
- Sem mudança de gameplay ou save schema (v10).

## Beta 1 · v0.3.0-beta.4 — GitHub Pages/static export (2026-10-06)
- Next passa a gerar site estático em `out/`.
- Deploy automático por GitHub Actions/Pages.
- `basePath` e assets `public/` funcionam em project pages (`/repo/`).
- Dates dinâmicos pré-gerados via `generateStaticParams`.
- README e documentação explicam que a página do repositório mostra README e a URL Pages executa o jogo.
- Save v10 e gameplay preservados.

## Beta 1 · v0.3.0-beta.3 — refatoração e otimização (2026-10-06)
- Persistência operacional transition-only e dedupe de save local.
- CloudSyncBridge single-flight.
- `OperationalHero` centralizado em seletor compartilhado.
- Índices `heroById`/`caseById`, structural sharing no turno e code splitting da Central.
- MissionBriefing reorganizado sem alteração funcional.
- Save schema v10; QA 44/44 + 35/35 + 17/17 + 15/15.

## Beta 1 · v0.3.0-beta.2 — hotfix visual do primeiro tutorial (2026-10-06)

- O primeiro briefing deixa de embutir Edison dentro do grid: o tutorial volta ao balão flutuante padrão, preservando espaço para narrativa, requisitos e roster.
- O primeiro caso e o resultado do E-04 não usam mais blackout/spotlight global; apenas o alvo relevante recebe destaque pulsante.
- O balão do Edison permanece acima do modal de resultado e orienta revisar/arquivar o relatório, inclusive em capturas de tela.
- Adicionados tamanhos/posições específicos para desktop, viewport intermediária e mobile, reduzindo sobreposição com o briefing/resultado.
- QA: 44/44 fluxo estático, 35/35 assets sociais, 17/17 arquitetura Beta 1. Save schema permanece v10.

## Beta 1 · v0.3.0-beta.1 — arquitetura Supabase local-first (2026-10-06)
- Separada persistência local de domínio do save via `lib/persistence/*`.
- Adapters Supabase REST para Auth e `game_saves`; nenhuma dependência do SDK foi adicionada ao bundle.
- Adicionado `CloudSyncBridge` com debounce e vínculo explícito por usuário.
- Adicionado reconcile seguro: upload, download, in-sync ou conflito manual.
- Conta preview removida; menu usa Supabase real quando configurado e guest caso contrário.
- Migration SQL com RLS adicionada; `.env.example` documenta apenas URL + anon key.
- Docs `BETA1_SUPABASE_ARCHITECTURE.md` e `BETA1_RELEASE_CHECKLIST.md` adicionados.
- Versionamento do produto passa a `0.3.0-beta.1`; save schema permanece v10.
- QA: 44/44 fluxo estático, 35/35 assets, 17/17 arquitetura Beta 1.

# CHANGELOG

## v0.2.63 — NEXO operacional contextual v2 (2026-10-06)
- Expandido o grupo operacional para responder ao chamado, aos heróis realmente despachados e ao resultado da missão.
- Comentários específicos cobrem 48/48 ocorrências do banco, inclusive os IDs legados `inc-*`.
- Adicionadas camadas de afinidade de poder, especialidade/tag, interação entre pares registrados, fallback por composição e reação pós-resultado.
- O sistema é narrativo: não altera cálculo de sucesso, requisitos, duração ou recompensas.
- DOCX `NEXO - Guerreiros Elementais.docx` sincronizado para revisão editorial.
- QA estático 33/33 e assets 35/35; save permanece v10; QA browser/runtime pendente.


## v0.2.62 — voz autorada do grupo NEXO (2026-10-06)
- Reescritas as respostas iniciais do grupo Guerreiros Elementais conforme os chats individuais.
- `operations.ts` deixa de ser placeholder: comentários de ocorrência, missão e ambiente agora têm voz específica por herói.
- Criado `NEXO - Guerreiros Elementais.docx` para revisão editorial. Save permanece v10.

## v0.2.60 — hotfix de validação Alexandra/Eros (2026-10-06)
- Corrigida duplicação de Alexandra D2–D6: a rota autorada agora recebe apenas estágios de recuperação 7–10 do gerador placeholder, sem uma segunda cena principal por estágio.
- Preservados os IDs existentes de Alexandra para compatibilidade de saves; nenhuma fala/date de Alexandra foi reescrita.
- Eros D1–D6 passou a ter exatamente 3 respostas por turno, mantendo a fala-base autoral como opção base e adicionando duas variações editoriais do Analista sem novo evento/cânone.
- Todas as respostas finais D3/D6 de Eros preservam o mesmo convite/Date e suas fotos.
- `validateEditableContent()` executado: PASS. `npm run qa:flow:static`: 25/25 PASS. `npm run validate:social-assets`: 35/35 PASS.
- Save schema permanece v10.

## v0.2.58 — autoria Eros integrada (2026-10-06)
- Eros D1–D6 e Dates 1/2 integrados exatamente a partir do texto fornecido pelo autor; nenhuma correção editorial automática foi aplicada.
- Adicionadas as três fotos de chat fornecidas pelo autor nos marcadores FOTO CHAT 1/2/3.
- Eros removido dos placeholders e marcado como rota autorada.
- Falas do Analista permanecem como escolha única nesta rodada; alternativas adicionais não foram inventadas.
- QA estático: 24/24 PASS; assets sociais: 35/35 PASS. Versão 0.2.58 e save schema v9 preservados.


## v0.2.58 — retomada e nova tentativa E2E (2026-10-06)
- Retomada feita exclusivamente a partir do ZIP `Agencia-Ressonancia-v0.2.58-Alexandra-Chat-Dates-2026-10-05.zip`.
- Documentação obrigatória de contexto, autoria, design, cânone e failsafe foi relida antes de qualquer alteração de código, incluindo o banco de casos DOCX.
- Executado `TESTAR_JOGO.sh` conforme `NEXT_SESSION.md`; o ambiente encerrou instalação/E2E com `TransportTimeoutError`, sem FAIL funcional reproduzido.
- `npm run qa:flow:static`: 22/22 PASS. `npm run validate:social-assets`: 32/32 PASS.
- Nenhum código de gameplay, conteúdo narrativo, cânone, balanceamento ou schema de save foi alterado. Versão permanece 0.2.58 e save schema permanece v9.

## v0.2.58 — retomada da baseline e QA disponível (2026-10-05)
- Baseline única confirmada a partir do ZIP `Agencia-Ressonancia-v0.2.58-Lysandro-Hero-Photo.zip`; `package.json` permanece 0.2.58 e save schema permanece v9.
- Releitura obrigatória concluída para `PROJECT_CONTEXT.md`, `EDIT_HERE.md`, `content/README.md` e os arquivos de `docs/failsafe/`, `docs/authoring/`, `docs/design/` e `docs/canon/`, incluindo o banco de casos DOCX.
- O próximo item de `NEXT_SESSION.md` continua sendo o QA runtime/browser do hotfix de entrada em Date. `npm ci --no-audit --no-fund` expirou novamente neste ambiente e deixou `node_modules` parcial; nenhum fluxo runtime/browser foi declarado aprovado.
- `npm run validate:social-assets` passou com 28/28 referências locais. Inspeção estática confirmou Hélio D1–D6 autorado, três opções por turno, fotos em D4/D5/D6, convites D3/D6 e Dates 1/2 apontando para as cinco mídias presentes.
- Corrigido apenas o metadado de failsafe que ainda listava Hélio como rota placeholder; o manifesto autoritativo já o marca `authored: true`.
- Nenhum código de gameplay, fala, cânone, balanceamento ou schema de save foi alterado.

## v0.2.58 — retomada QA estática do hotfix de Date (2026-10-02)
- Baseline confirmada exclusivamente a partir do ZIP v0.2.58 fornecido nesta sessão.
- Gate de Date validado estaticamente em 10/10 assertivas: CTA usa `?launch=1`, reserva da noite é persistida antes da navegação, acesso normal sem autorização volta ao NEXO, reload mantém autorização pela URL e replay/QA permanecem fora do gate.
- Confirmado que a rota normal ainda exige correspondência em `social.outingsByGlobalDay`.
- `game/social/outingLaunch.ts` está órfão e sem consumidores; não foi reativado nem removido nesta rodada.
- `npm ci --no-audit --no-fund` expirou no ambiente; QA browser/runtime permanece pendente e não foi declarado aprovado.
- Sem mudanças em narrativa, cânone, gameplay ou save; schema continua v9.

## v0.2.58 — hotfix do gate de Date
- Corrigido bug em que `IR PARA ENCONTRO` podia reservar o encontro mas a rota presencial recusava a entrada.
- Removida a dependência de `sessionStorage` para atravessar a navegação NEXO → `/encontro`.
- O CTA normal agora navega com `?launch=1`; a cena normal exige esse marcador e a seleção persistida da noite.
- Última mensagem continua legível; não há abertura automática de Date.
- Replay/QA, conteúdo autoral e save schema v9 inalterados.

## v0.2.57 — Date somente após CTA explícito
- A cena presencial normal não abre mais apenas porque a última mensagem foi concluída ou o convite foi desbloqueado.
- `IR PARA ENCONTRO` cria autorização temporária na sessão e só então navega para `/encontro`.
- A rota `/encontro` bloqueia abertura normal sem essa autorização e retorna ao NEXO.
- Reload no meio do Date permanece compatível; sair para o NEXO exige novo clique para reentrar.
- Replay/QA e conteúdo autoral inalterados; save schema v9.

## v0.2.53 — hotfix visual das abas do NEXO (2026-10-01)

## v0.2.56 — robustez social
- Validação editorial social ampliada: IDs/flags duplicadas, mídias sem alt, referências de Date e convites finais de rotas autoradas.
- Novo `npm run validate:social-assets` para detectar mídia social local ausente.
- Save v9 recebe hidratação/reparo conservador de estado social parcial ou inconsistente durante load/import.
- QA social ampliado com lido/não lido, D1–D6 + abrir, controle de milestones de Date e diagnóstico/reload/reparo.
- Nenhum conteúdo narrativo alterado; save schema permanece v9.

## v0.2.55 — ordem da lista + preview + autoscroll do NEXO
- contatos agora aparecem por atividade mais recente, com horário decrescente;
- preview passa a refletir o último conteúdo disponível/alcançado e identifica mensagem do jogador com `Você:`;
- indicador de não lida virou ponto visual, evitando contagem enganosa;
- densidade e truncamento das linhas foram padronizados, especialmente no mobile;
- autoscroll ganhou limiar responsivo e acompanhamento de mudanças de DOM/altura do compositor sem interromper leitura de histórico antigo;
- botão de mensagens recentes fica dinamicamente acima do compositor;
- narrativa, rotas e save schema v9 inalterados.


- Corrigido o grid lateral do NEXO após a inclusão das abas Conversas/Fotos/Dates.
- As abas agora ocupam uma linha compacta própria em vez de expandirem pela área destinada à lista de contatos.
- Lista de contatos volta a usar todo o espaço flexível restante.
- Reforçado `align-self:start` e espaçamento compacto da barra de abas.
- Nenhuma alteração em conteúdo, rotas, Dates, flags ou save. Schema permanece v9.

## v0.2.52 — NEXO memórias + replay de Dates + QA social (2026-10-01)
- Adicionadas abas Conversas/Fotos/Dates no NEXO.
- Novidades persistem por turno via flags `nexo:read:*`; contador também aparece no título da página.
- Galeria lista somente fotos de turnos já alcançados e mantém lightbox.
- Dates concluídos entram no arquivo e podem ser relidos em modo REPLAY sem qualquer mutação de save.
- Dates ganham cartão de entrada, transição NEXO→Date/retorno, botão Anterior e atalhos de teclado.
- Criado `content/social/routeManifest.ts`; validador exige D1–D6 e Dates 3/6 para os sete personagens.
- Criado `/qa/social` para preparar noite/etapa, abrir chat, visualizar Dates em preview, inspecionar flags e resetar somente social.
- Polimento responsivo e de foco/teclado nas novas superfícies; movimento reduzido respeitado nas transições.
- Nenhuma fala, cena autoral, balanceamento ou regra narrativa mudou. Save schema permanece v9.
- Validação estática: 73 TS/TSX, 0 erros de sintaxe; `validateEditableContent()` executado com sucesso, incluindo o manifesto D1–D6 + Dates 3/6; QA browser ainda pendente.

## v0.2.51 — sistema de Dates: leitor linear e progresso de cena (2026-10-01)
- `/encontro/[sceneId]` passa a apresentar cenas longas em páginas de leitura, sem adicionar escolhas e sem alterar texto autoral.
- Adicionados DATE 1/DATE 2, contador/progresso de leitura e layout mais confortável em desktop/mobile.
- Beats com troca de background continuam data-driven e mantêm seus rótulos autorais de transição.
- Progresso da página é lembrado na mesma noite via `sessionStorage`; concluir a cena limpa esse estado temporário.
- Encontro já concluído não pode mais ser reaberto manualmente pela URL.
- Save schema permanece v9; nenhuma rota, fala ou milestone foi alterada.

## v0.2.50 — NEXO: clareza de estados e feedback de interface (2026-10-01)

- Lista de contatos diferencia mensagem nova, conversa concluída e convite presencial pendente.
- Noite/dia atual ganhou indicador visível na lista e também no cabeçalho da conversa, inclusive no mobile.
- Rodapé resume conversas não lidas ou convites pendentes antes do avanço.
- Confirmação de Próxima Noite avisa conteúdo ainda não lido e convites pendentes; convites persistentes continuam disponíveis.
- Fotos do chat mantêm clique para ampliar e agora usam enquadramento/tamanho máximo mais uniforme no histórico.
- Escolher uma resposta bloqueia temporariamente as alternativas até enviar ou desmarcar a escolha; após envio, a resposta segue integrada ao histórico pelo fluxo existente.
- Autoscroll contextual, contador de mensagens recentes e lightbox foram preservados; conversa sem etapa disponível exibe estado de conclusão explícito.
- Nenhuma fala, rota, regra de romance ou save schema foi alterada. Save permanece v9.

## v0.2.49 — atualização de fotos da Demétria (2026-10-01)

- Substituída a foto do Dia 4 / academia (`chat-2-academia.webp`) pela nova imagem aprovada.
- Substituída a foto do Dia 6 / convite para o Date 2 (`chat-3-date2.webp`) pela nova imagem aprovada.
- Nenhuma alteração em diálogos, progressão, dates ou save schema (permanece v9).

## v0.2.48 — hotfix modo só pós-expediente: avanço de noite + confirmação (2026-10-01)

- Corrige `PRÓXIMA NOITE` no modo só pós-expediente: `/conversa -> /conversa` não remontava a página e deixava o estado React preso na noite anterior.
- O avanço agora grava o save e atualiza imediatamente o estado local do NEXO, fechando a thread aberta e liberando as conversas da nova noite.
- Adicionada confirmação antes do avanço: **Deseja ir para o próximo dia?** com **Ir para próximo dia** e **Voltar**.
- A confirmação é usada pelo botão do rodapé da lista e pelo botão equivalente dentro da conversa.
- Save schema permanece v9; nenhuma rota ou conteúdo narrativo foi alterado.

## v0.2.47 — Demétria: rota autorada + mídia (2026-10-01)
- Substituídos os placeholders principais D1–D6 de Demétria pelo roteiro autoral recebido, com duas alternativas adicionais por resposta do Analista.
- Integradas três fotos autorais no NEXO em `public/nexo/demetria/`: faculdade, academia e convite do segundo encontro.
- Dates 1/2 de Demétria substituem os placeholders e permanecem cenas lineares, sem escolhas; fundos autorais em `public/outings/demetria/`.
- Convites das etapas 3/6 reutilizam o sistema persistente existente.
- Save schema permanece v9.

## v0.2.46 — modo opcional Só pós-expediente (2026-10-01)
- `NOVO JOGO` ganhou seletor entre **Campanha completa** e **Só pós-expediente**.
- Social-only entra diretamente no NEXO e transforma `ENCERRAR NOITE` em `PRÓXIMA NOITE`, avançando o calendário sem abrir expediente.
- Introdução, Central e Desenvolvimento redirecionam para o NEXO enquanto a flag `mode:post-shift-only` estiver ativa.
- Linhas contextuais dependentes de despacho são omitidas nesse modo.
- Rotas, romance por estágio, convites persistentes, dates e limite de uma saída/noite foram reutilizados sem alteração.
- Campanha completa continua sendo o padrão. Save schema permanece v9.
- Sintaxe/transpilação dos arquivos alterados validada com TypeScript 5.8.3; QA runtime/browser ainda pendente.

## v0.2.45 — QA estático do Date 2 de Lysandro (2026-10-01)
- Confirmados dois beats lineares em `outing-day6-lysandro`: restaurante no primeiro, casa no segundo.
- Confirmado que o CTA intermediário apenas avança `beatIndex` e não chama `finishScene()`; somente o CTA do último beat conclui o outing.
- Confirmados `date-2-restaurante.webp` e `date-2-casa.webp` presentes no pacote.
- Texto autoral preservado integralmente, terminando em “fechando a porta.”; nenhuma fala/cena nova foi criada.
- `npm ci --no-audit --no-fund` expirou no ambiente, portanto QA runtime/browser continua pendente.
- Save schema permanece v9; nenhuma regra de rota, mecânica ou cânone foi alterado.

## v0.2.40 — ajuste de fala da Elysia

- Dia/estágio 4: após a foto da academia, Elysia agora diz “Vamos juntos!! Te recomendo um treino de boa, juro!” no lugar de “Vamos, vamos, você precisa começar...”.
- Nenhuma mecânica, progressão, date ou save foi alterado; schema permanece v9.

## v0.2.28 — hotfix do briefing contextual
- Corrigida regressão de layout após a decomposição da Central: o briefing passou a ser filho de `TacticalMap`, mas ainda usava `grid-column/grid-row` da estrutura anterior.
- `.mapBriefingLayer` agora é overlay absoluto sobre a área do mapa, abaixo da toolbar, evitando coluna implícita que comprimia o mapa e fazia o briefing desaparecer/quebrar.
- Mobile permanece full-screen; nenhuma regra de Dispatch, conteúdo ou save foi alterada.

## v0.2.27 — polish, acessibilidade, save e assets
- Adicionados foco visível, Escape em overlays, `aria-live`, semântica de diálogo, alvos de toque e `prefers-reduced-motion`.
- Seleção do roster expõe `aria-pressed` e bloqueia apenas seleção de indisponíveis durante briefing.
- Configurações ganharam export/import de save JSON validado/migrado; schema continua v9.
- Outings aceitam crop desktop/mobile data-driven; Yuki Date 1/2 configurados.
- Convertidos para WebP os assets pesados em uso: Yuki, mapa, Agência exterior/interior e backgrounds dos dois dates de Yuki.
- Validação sintática: 68 TS/TSX, 0 erros; CSS balanceado. `npm ci` expirou no ambiente, então build/runtime integral fica para QA seguinte.

## v0.2.26 — consolidação técnica da Central
- Decomposto `app/agencia/page.tsx` em componentes de `components/agency/` sem mudança funcional deliberada.
- Movidos os overrides ativos da Central v0.2.16–v0.2.25 para `app/agencia/agency.css`, reduzindo a cascata dentro de `globals.css` e preservando a ordem de importação.
- Mantidas regras de jogo em `game/` e conteúdo em `content/`.

## v0.2.25 — legibilidade global da Central (2026-09-30)
- Passe tipográfico desktop na Central inteira: cabeçalho/status, fila de ocorrências, textos do mapa, roster, NEXO e briefing contextual.
- Radar não foi ampliado; geometria, mecânicas, balanceamento e save v9 permanecem inalterados.
- Objetivo: eliminar microtexto difícil de ler em resoluções desktop mantendo a hierarquia e o layout atual.

## v0.2.24 — legibilidade tipográfica do briefing (2026-09-30)
- Aumentada a tipografia das áreas de leitura do briefing contextual: cabeçalho/título, narrativa, metadados, necessário/sem exigência do radar, legenda, tags, afinidade, explicação, composição, alertas e CTA.
- Geometria do radar, mecânicas, requisitos e save não foram alterados.

## v0.2.23 — briefing sobre mapa + roster seletor (2026-09-30)
- Briefing desktop passa a abrir somente sobre o Mapa Tático, em vez de bloquear toda a Central.
- Ocorrências, NEXO e barra de agentes permanecem visíveis durante a decisão.
- Retrato da barra de agentes passa a selecionar/remover durante briefing; `ABRIR FICHA` continua abrindo o dossiê.
- Cards de seleção duplicados são removidos do briefing desktop; alertas e composição permanecem no rodapé do briefing.
- Mobile mantém briefing full-screen com cards internos de seleção.
- Nenhuma fórmula, requisito, narrativa, balanceamento ou save schema foi alterado. Save v9.

## v0.2.22 — faixa de agentes + requisitos inteiros (2026-09-30)
- Seleção dos sete agentes passa a ocupar toda a largura inferior do briefing desktop, em uma única linha.
- Cards foram compactados sem aumentar o modal; composição/CTA continuam no rodapé.
- Requisitos de atributos são arredondados para pontos inteiros após a escala diária e o mesmo alvo inteiro alimenta radar e chance.
- Removida a sigla `p.p.` dos alertas visíveis de técnica e afinidade.
- Save schema permanece v9.

## v0.2.21 — briefing desktop redistribuído (2026-09-30)
- Remove a rolagem interna como comportamento padrão do briefing desktop.
- Usa o espaço ocioso sob a narrativa para a seleção dos sete agentes.
- Radar/requisitos permanecem na coluna direita; composição e CTA ficam visíveis na mesma viewport.
- Breakpoint de baixa altura compacta espaçamentos, cards e radar sem alterar dados ou mecânicas.
- Save schema permanece v9.

## v0.2.20 — radar do briefing mais compacto (2026-09-30)
- Aproximados rótulos e números dos atributos dos vértices correspondentes.
- Aumentado o raio útil do pentágono e reduzido o tamanho total do bloco para cortar espaço vazio.
- Ajuste também vale para desktop de baixa altura e mobile, preservando legibilidade.
- Sem alteração em requisitos, fórmulas, chance, balanceamento, narrativa ou save schema v9.

## v0.2.19 — enquadramento do briefing + retrato no dossiê (2026-09-30)
- Briefing desktop passa a rolar internamente quando a altura disponível não comporta todo o roster, evitando corte dos cards inferiores.
- Cabeçalho e rodapé de despacho ficam sticky no desktop durante essa rolagem; em alturas menores o radar reduz moderadamente sem perder a comparação EQUIPE × NECESSÁRIO.
- Dossiê dos sete agentes passa a exibir o retrato oficial acima do nome, com fallback técnico e crop responsivo.
- Nenhuma fórmula, narrativa, balanceamento ou save schema foi alterado.

## v0.2.18 — radar comparativo do briefing (2026-09-30)
- Substituídas as cinco barras separadas de atributos por um radar SVG único.
- Polígono preenchido mostra a equipe selecionada; contorno pontilhado mostra o necessário para o caso.
- Valores dos cinco atributos e alvos do caso continuam visíveis e atualizam com a composição.
- Tags, afinidade contextual e chance estimada foram preservadas.
- Mudança exclusivamente de UX/UI; fórmulas e save schema v9 permanecem inalterados.

## v0.2.17 — restauração da leitura de atributos no briefing (2026-09-30)
- Restaurada no briefing a grade visual de Força, Agilidade, Carisma, Inteligência e Vigor da v0.2.15, incluindo barras que reagem à equipe selecionada e a marca da faixa recomendada.
- Restaurados os indicadores de importância, valores fornecido/recomendado, tags e afinidades contextuais no briefing.
- Mantidos o mapa autoral e a navegação mobile por Chamados / Mapa / Agentes / NEXO introduzidos na v0.2.16.
- A simplificação de UX deixa de significar remover indicadores decisivos: deve priorizar hierarquia, legibilidade e revelação progressiva sem apagar o feedback visual central da escolha de equipe.
- Nenhuma fórmula, balanceamento, narrativa ou save schema foi alterado; save permanece v9.

## v0.2.16 — Central simplificada + Dispatch mobile + mapa autoral (2026-09-30)
- Nova direção transversal de UX: menos densidade na primeira camada, mantendo a profundidade mecânica no motor.
- Briefing simplificado para decisão rápida; cálculo de Dispatch permanece inalterado.
- Mobile passa a usar painéis Chamados / Mapa / Agentes / NEXO em vez de empilhar a UI desktop.
- Briefing mobile full-screen com CTA de despacho fixo.
- `mapa-maringa-800.jpg` integrado como `public/maps/central-city-map.jpg`; markers continuam dinâmicos.
- Save schema v9; sem texto narrativo novo.
- Build runtime pendente: dependências Next/React não estão instaladas no ambiente de entrega.

## v0.2.15 — backgrounds dos dates de Yuki (2026-09-30)
- Date 1 de Yuki usa a imagem autoral da cafeteria.
- Date 2 de Yuki usa a imagem autoral do apartamento.
- Apenas assets/referências visuais foram alterados; narrativa, mecânicas e save v9 permanecem intactos.

# CHANGELOG

## v0.2.15 — fluxo de DMs + scroll contextual (2026-09-30)
- Mensagens iniciais autoradas do Analista (`openingOutgoing`/`prefaceOutgoing`) agora exigem ação explícita de Enviar antes de entrarem no histórico.
- A resposta do personagem deixa de aparecer prematuramente quando o Analista ainda não iniciou a conversa.
- Conversas iniciadas pelo personagem continuam aparecendo como recebidas/não lidas na lista de contatos.
- Autoscroll passa a acompanhar o fim somente quando o jogador está perto das mensagens recentes ou acabou de enviar; ao reler histórico antigo, novas bolhas preservam a posição e incrementam o atalho de recentes.
- Persistência do envio inicial usa flags técnicas no save v9; sem migração de schema.
- Nenhum conteúdo narrativo/canônico foi alterado.
- Parser TypeScript: 57 TS/TSX, 0 erros de sintaxe; typecheck/runtime ainda dependem de instalar React/Next.

## v0.2.13 — fluxo diário + Desenvolvimento visual (2026-09-30)
- Removido o modal recorrente `Preparar expediente` dos dias normais; turnos não-tutorial começam automaticamente ao entrar na Central.
- Mantida a abertura manual apenas no primeiro turno com `tutorial_active`, preservando o onboarding de Edison.
- Substituído o CTA flutuante de fim de expediente por uma faixa de transição integrada à shell da Central.
- Desenvolvimento passa a mostrar os retratos oficiais no roster e no painel do personagem selecionado.
- Nenhuma narrativa, cânone, progressão ou save schema alterados; schema continua v9.
- QA runtime/visual pendente porque `npm ci` expirou no ambiente.

## v0.2.12 — auditoria de continuidade / QA estático (2026-09-30)
- ZIP v0.2.12 tratado como única baseline válida; documentação obrigatória relida antes de qualquer alteração.
- Verificada estaticamente a entrega cadenciada do NEXO, typing indicator, bloqueio das escolhas até o fim da sequência e autoscroll restrito ao histórico interno.
- Confirmados lightbox de fotos, romance derivado de etapa, ausência de gate por `minRomanceProgress` e convites 30/50/100 de Yuki nas etapas 3 e 6.
- Nenhum código de jogo, conteúdo narrativo, cânone, asset ou save schema foi alterado.
- QA runtime/browser continua pendente porque `npm ci` expirou no ambiente.

## v0.2.12 — retrato da Elysia (2026-09-29)
- Substituído `public/heroes/elysia.jpg` pela nova imagem fornecida pelo autor.
- Nenhuma regra, save ou conteúdo narrativo alterado.

# CHANGELOG

## v0.2.11 — romance por etapa de rota (2026-09-29)

- `ROMANCE %` deixa de usar XP/pontos 100/50/30.
- Percentual passa a representar `etapas principais concluídas / total de etapas principais da rota`.
- Yuki (6 etapas) progride aproximadamente 0 → 17 → 33 → 50 → 67 → 83 → 100%.
- Choices 100/50/30 continuam como metadado autoral/relacional, sem alterar a porcentagem.
- `minRomanceProgress` deixa de bloquear disponibilidade; campos antigos permanecem apenas para compatibilidade do save v9.
- Dates continuam sem hardlock e presos aos convites autorados das etapas 3/6.

## v0.2.9 — NEXO paced delivery + romance sem hardlock (2026-09-29)
- Sequências automáticas do NEXO passam a chegar uma bolha por vez, com curta pausa e indicador de digitação.
- As três respostas ficam ocultas até a sequência corrente terminar.
- Encontros das etapas 3 e 6 deixam de exigir 30%/70%; o percentual de romance vira feedback/estado narrativo, não trava de conteúdo.
- Pesos 100/50/30 e ganhos de romance permanecem para caracterização e futuras variações.
- Regra de uma saída presencial por noite global permanece.
- Save continua v9.


## v0.2.7 — Dialogue Speaker Avatar
- Adicionado avatar circular de Edison ao lado do nome nas caixas de diálogo da introdução e apresentação do SDH.
- Mantida separação entre retrato (`edison.jpg`) e backgrounds da Agência.
- Ajuste responsivo do avatar para telas menores.
## v0.2.3 — First Dispatch / onboarding
- Implementado roteiro autoral do início do Dia 1 com Edison, Guerreiros Elementais e grupo NEXO.
- Quatro apresentações iniciais do jogador têm efeitos relacionais discretos; rótulos de qualidade não são mostrados ao jogador.
- Primeiro despacho guiado usa E-04 + Hélio, ensina afinidade, indisponibilidade, relatório e Energia; sucesso é controlado no tutorial.
- Tutorial pode ser pulado e não interfere no Dispatch normal.
- Menu principal e criação de jogo redesenhados com conteúdo à esquerda e área reservada para futura arte de fundo.
- Edison substitui `Coordenação` como decisão [AU-APROVADO].
- Save permanece schema v9.

# v0.2.2 — 2026-09-29
- Corrigido avanço infinito de rotas na mesma noite: máximo 1 etapa/personagem/noite global.
- Lista de contatos do NEXO simplificada; progresso romântico apenas dentro da conversa.
- Relatórios recuperam contexto e descrição da resolução.
- Turno acelerado 15 → 10 minutos reais.
- Mais casos por dia e spawns em ondas para gerar sobreposição/disputa pelo roster.
- Curva D1–D5 fortalecida; chance excessivamente permissiva reduzida.
- Custos de Energia aumentados para tornar fadiga relevante.
- Afinidade contextual recalibrada para +8 p.p./cap +12 e cobertura de Alexandra corrigida em dois casos de água.

# Changelog

## v0.2.1 — banco de ocorrências + afinidades de poder (2026-09-29)

- 48 casos aprovados convertidos para `content/incidents/caseBank.ts`.
- Dispatch diário agora é montado por pool easy/medium/hard/crisis com `minDay`, `weight`, cooldown e seed jogador+dia.
- Perfis de expediente: respiro, normal, pressão e pico; pós-D6 continua em ondas sustentáveis.
- Pesos 3/2/1 agora significam ESSENCIAL/IMPORTANTE/APOIO literalmente.
- Afinidades contextuais de poder implementadas: +10 p.p. por herói compatível, teto +15 p.p. por equipe.
- Briefing mostra afinidades contextuais e quando estão ativas.
- IDs históricos `inc-001`…`inc-010` preservados; save segue schema v9.
- Documento editorial aprovado copiado para `docs/design/RESSONANCIA_BANCO_DE_CASOS_v0_2_1_APROVADO.docx`.
- GDD atualizado para v4.5 / projeto v0.2.1.

## v0.2.0 — rotas individuais + late game sustentável (2026-09-29)

- Dia global deixou de avançar as rotas sociais; cada personagem possui `routeStage` persistente.
- Histórico social permanece acessível e personagens ignorados começam pela própria etapa 1 mesmo em dias globais tardios.
- Primeiro encontro/segundo date viraram marcos individuais de rota; apenas uma saída presencial pode ocorrer por noite global.
- Campanha não termina no Dia 6; 100% social exige os dois marcos presenciais dos sete personagens.
- Placeholders de recuperação 7–10 permitem QA de rotas lentas.
- Romance passa a limitar ganho por etapa individual; thresholds de QA: 30% e 70%.
- Técnicas relevantes agora dão +6 p.p. de chance cada (máx. +12 p.p.) além das tags, tornando o desbloqueio perceptível no Dispatch.
- XP continua após nível 6 via Maestria 1–5; Maestria melhora consistência solo sem elevar atributos acima de 5.
- Dificuldade pós-D6 usa ciclo sustentável de respiro/normal/pressão/pico em vez de crescimento infinito.
- Save schema v9 com migração de v8 e anteriores.
- GDD atualizado para v4.4 / projeto v0.2.0.

## v0.1.6 — atalho DEV para expediente perfeito (2026-09-29)

- Adicionado `FINALIZAR EXPEDIENTE 100%` ao painel DEV.
- O atalho força `Sucesso` em todas as ocorrências ainda não arquivadas, sem RNG.
- Custos e XP continuam usando a regra normal de `Sucesso`; resultados já arquivados não são premiados novamente.
- Relatórios pendentes são consumidos automaticamente, o turno fecha às 18:00 e o jogador segue direto para Desenvolvimento.
- Distribuição automática de ocorrências entre agentes favorece encaixe de atributos/tags e evita concentrar todos os testes em um único personagem.
- Save permanece em schema v8.
- Parse sintático dos arquivos alterados aprovado; `tsc --noEmit` continua bloqueado pelos pacotes de tipos ausentes no ambiente.

## v0.1.4 — progressão corrigida + romance por mensagem + QA placeholder total (2026-09-29)

- Save schema v8; migração preserva progresso e adiciona controle de ganho romântico diário.
- Romance passa a ganhar pontos por mensagem: 100=+7, 50=+5, 30=+3, teto 18 por personagem/dia.
- Threshold de saída considera o ganho da própria resposta de aceite.
- Placeholders D1–D6 possuem múltiplos turnos para testar conversas longas; todo texto atual de agentes é explicitamente QA placeholder.
- `ENCERRAR NOITE` disponível dentro do chat ativo, corrigindo bloqueio prático em mobile/segunda noite.
- Progressão rebalanceada para seis dias: níveis 2–6 em 50/130/230/360/520 XP.
- Desenvolvimento guia para o próximo upgrade pendente e saves carregados reconstroem milestones a partir do XP.
- Roadmap CONTENT-READY refinado com sequência objetiva até congelar o motor e receber apenas conteúdo final.
- Verificação sintática TS/TSX concluída; `tsc` completo segue impedido por tipos React/Node incompletos no ambiente.

## 0.1.1 — NEXO pós-expediente multi-chat (2026-09-29)

- Redesenhado `/conversa` como mensageiro persistente com lista de contatos e conversa ativa.
- Adicionadas busca por contato, prévia da última mensagem autorada, horários, indicador de não lida na sessão e estado visual de resposta enviada.
- Conversas respondidas continuam visíveis como histórico durante a noite.
- Jogador pode entrar, sair e alternar entre DMs sem concluir uma antes de abrir outra.
- Respostas autoradas agora passam por compositor: selecionar opção → revisar no campo → enviar.
- Envio aplica relacionamento/flags e `completionFlag` uma única vez.
- Retratos oficiais passaram a aparecer nos avatares do pós-expediente.
- Layout responsivo: duas colunas em desktop e navegação lista/chat em telas estreitas.
- Nenhum texto narrativo novo, cânone ou cena foi adicionado; `content/` permaneceu inalterado.
- Save permanece schema v6.
- `npm ci` voltou a expirar no ambiente; validação TypeScript/runtime/browser fica pendente.

## 0.9.2 — Equipe contextual / correção de seleção fantasma

- Corrigido bug em que clicar nos cards dos heróis fora de um briefing adicionava personagens a uma equipe invisível.
- Cards dos heróis na Central agora abrem ficha por padrão.
- `toggleHero` só aceita seleção quando há briefing aberto de ocorrência aguardando despacho.
- Fechar briefing limpa a composição.
- Abrir ocorrência pelo mapa inicia composição vazia.
- Indicador de equipe só aparece no contexto de briefing.
- TypeScript validado com `tsc --noEmit`.


## 0.9.1 — Correção de usabilidade da Central

- Corrigido bug que impedia/atrapalhava cliques nos marcadores de ocorrência: pseudo-elementos e grid decorativo agora ignoram eventos de ponteiro.
- Corrigido conflito de `transform` dos marcadores; offsets de múltiplas ocorrências agora preservam a centralização/hitbox.
- Marcadores aumentados para 54px e receberam área de clique extra, z-index, hover e foco visíveis.
- Central passou a usar grid vertical explícito para Header / Resumo / Mapa / Agentes / Comando, evitando sobreposição por cálculos frágeis de altura.
- `Situação Operacional` deixou de consumir uma faixa fixa entre mapa e heróis e virou painel flutuante dentro do mapa.
- Faixa dos 7 heróis aumentada para 214px e cards para ~151px.
- Cards agora mostram poder, nível, fadiga e estresse sem abrir a ficha.
- Botão INFO renomeado para `ABRIR FICHA` e ficou maior.
- Rodapé de comando ganhou mais altura e separação visual.
- Breakpoints adaptados para 1200px/900px; em telas estreitas o roster vira faixa horizontal rolável.
- TypeScript validado com `tsc --noEmit`.

## 0.9.0 — Central map-first e sistema visual unificado

- Central redesenhada em torno do mapa como superfície dominante.
- Ocorrências passaram a aparecer como marcadores clicáveis diretamente no mapa.
- Barra lateral de heróis foi substituída por faixa inferior permanente com os sete agentes.
- Seleção rápida de herói + INFO preservadas.
- Briefing e ficha de herói migrados do visual bege/claro para o mesmo azul-escuro/ciano da Central.
- Desenvolvimento da Equipe também migrou para a linguagem operacional escura.
- Login, novo jogo, relatório, visual novel e Dev Tools receberam materiais/cores coerentes com a Central.
- Radar pentagonal passou a usar ciano e linhas frias.
- Paleta semântica registrada: ciano informação/seleção, verde disponibilidade, laranja atenção e vermelho urgência.
- TypeScript validado com `tsc --noEmit`.

## 0.8.1 — Progressão no fim do próprio expediente

- Corrigido o fluxo de progressão conforme regra aprovada.
- XP continua sendo ganho durante as missões desde o Dia 1.
- Ao encerrar o expediente e concluir relatórios, o jogador vai para `/desenvolvimento`.
- Upgrades são resolvidos ainda no mesmo dia, antes do pós-expediente/VN.
- Depois do pós-expediente, o próximo dia começa diretamente na Central com as melhorias já ativas.
- A regra antiga “Dia 2+ antes do expediente” foi removida de código e documentação.


## 0.4.0 — 2026-09-28

- Implementados 8 atributos operacionais nos 7 heróis.
- Implementado sistema inicial de Ressonância por dupla (-2 a +2).
- Implementadas 5 combinações especiais iniciais.
- Save migrado para v3, preservando migração de saves v1/v2.
- Criado `ShiftState` persistente.
- Expediente definido como 08:00–18:00 em 15 minutos reais.
- Adicionadas 10 ocorrências com spawn, prazo e duração próprios.
- Despacho passou a manter heróis indisponíveis enquanto estão em missão.
- Missões resolvem de forma assíncrona e entram em fila de relatórios.
- Novas ocorrências podem surgir enquanto equipes estão fora.
- Ocorrências não atendidas expiram.
- Central ganhou indicadores de chamadas aguardando, missões ativas, disponibilidade e chamadas perdidas.
- Preview da equipe ganhou feedback qualitativo baseado em atributos e Ressonância.
- Motor de resolução agora usa atributos, tags, condição, Ressonância e combos.
- Relatório passou a exibir adequação, Ressonância e combos.
- Pós-expediente só é liberado após o encerramento das 18:00 e leitura dos relatórios pendentes.
- Criado `docs/design/CORE_LOOP_EXPEDIENTE.md` para preservar a decisão de design.
- TypeScript validado com `tsc --noEmit` sem erros.

## 0.3.0 — 2026-09-28

- Adicionados estados persistentes dos 7 heróis: fadiga, estresse, ferimentos e disponibilidade.
- Adicionadas consequências de missão e recuperação entre dias.
- Save migrado para v2.

## 0.5.0 — UX de central, Dev Tools e launcher Windows

- Redesenhada a tela da Agência em layout de central de operações.
- Chamados agora usam rail lateral com prioridade e prazo.
- Adicionado mapa tático estilizado por distritos e beacons de ocorrência.
- Cards de herói compactados com status, fadiga e estresse.
- Composição de 1–3 heróis ganhou dock fixo inferior com análise qualitativa.
- Criado `components/DevTools.tsx` e `game/simulation/devTools.ts`.
- Dev Tools: +30 min, +1h, +3h, 18:00, pular para pós-expediente e resetar turno.
- Criado `Ressonancia.exe` (Windows x64 GUI) para iniciar `npm run dev` de forma oculta e abrir o navegador.
- Save permanece v3; sem migração necessária.
- TypeScript validado sem erros.


## 0.7.0
- Rebase explícito na v0.5.0 funcional.
- Briefing modal de ocorrência e seleção de equipe no contexto.
- Ficha modal de herói com dados expandidos.
- Cards da central simplificados.
- Bíblia AU/cânone incorporada.
- Direção UI/UX Dispatch documentada.
- TypeScript validado.

## 0.8.0 — Progressão, cinco atributos e Desenvolvimento da Equipe

- Substituídos os 8 atributos operacionais por 5 atributos pessoais: Força, Agilidade, Carisma, Inteligência e Vigor.
- Escala definida como 1–5.
- Todos os heróis partem de base 1 em tudo + 4 pontos extras distribuídos individualmente.
- Adicionado gráfico radar/pentagonal à ficha INFO.
- Incidentes remapeados para os cinco atributos, mantendo tags/poderes como camada separada.
- Adicionado XP por missão e thresholds de nível 1–6.
- Adicionado sistema de técnicas/especializações/evolução de poder.
- Técnicas podem conceder novas tags operacionais.
- [SUPERADO EM 0.8.1] Na 0.8.0, `/desenvolvimento` ficava antes do expediente a partir do Dia 2.
- Níveis 3 e 5 permitem escolher +1 atributo; teto atual 5.
- Níveis 2, 4 e 6 apresentam escolhas de técnica/especialização/evolução.
- Relatório passa a mostrar XP recebido.
- Pós-expediente encaminha ao Desenvolvimento do dia seguinte.
- Save migrado para v4 com `heroProgression` e `developmentRequired`.
- Documentação GDD/AU/design/failsafe atualizada.

## 0.9.3 — limpeza da Central após playtest
- Remove a faixa `Situação Operacional`; chamados são acessados diretamente pelo mapa.
- Remove o dock redundante `Comando atual / Revisar-Despachar`; despacho continua no Briefing.
- Distritos deixam de ser placas/quadrados e viram rótulos geográficos discretos em uma cidade contínua.
- Ocorrências recebem posições determinísticas variadas dentro da região em vez de nascerem no mesmo ponto do distrito.
- Faixa dos agentes ganha mais altura e cards preparados para retratos 3x4 futuros.
- Cards mostram somente retrato/placeholder, nome, estado e `ABRIR FICHA`; poder, nível, fadiga e estresse saem do roster.
- Ficha do herói deixa de ter retrato-placeholder gigante, cabeçalho vazio e footer contextual.
- Ficha é sempre consulta; não contém mais `SELECIONAR PARA O CHAMADO`/`REMOVER DA EQUIPE`.
- Montagem de equipe permanece exclusivamente no Briefing.

## 0.9.4 — Leitura operacional e resolução probabilística
- Briefing ganhou mais espaço negativo, tipografia maior e controle X mais evidente.
- Removidos alertas redundantes "Boa/Média/Pouca" de atributos.
- Requisitos agora mostram pontos fornecidos pela equipe versus faixa recomendada e barra visual dinâmica.
- Briefing mostra CHANCE ESTIMADA DE SUCESSO em tempo real conforme a equipe muda.
- A faixa recomendada não é requisito binário: equipes abaixo dela ainda podem vencer e equipes acima ainda podem falhar.
- Resolução passou a realizar rolagem probabilística real; chance máxima é 94% para preservar risco residual.
- Chance considera adequação de atributos, tags/especialidades, condição, tamanho da equipe, Ressonância, combos e confiabilidade da informação.
- Relatório registra a estimativa pré-despacho e a rolagem operacional.

## 0.9.5 — moldura operacional / espaço negativo lateral
- Central ganhou largura operacional máxima centralizada em desktop.
- Mapa e faixa de agentes compartilham a mesma moldura e alinhamento lateral.
- Corredores laterais escuros passam a fazer parte deliberada da composição visual, seguindo a referência aprovada.
- Margens diminuem responsivamente em telas menores para preservar área útil.

## 0.9.6 — fila operacional + NEXO
- Central reorganizada em três canais: ocorrências / mapa / chat operacional.
- Coluna esquerda mostra chamados aguardando e missões despachadas com equipe, barra de progresso e retorno estimado.
- NEXO operacional adicionado em modo somente leitura durante o expediente.
- Mensagens são derivadas do estado do turno e das equipes despachadas.
- Pós-expediente passou de VN padrão para DM no NEXO; cenas presenciais ficam reservadas para eventos especiais futuros.
- Mantidas chance estimada probabilística e barras de requisitos da v0.9.4/v0.9.5.

## 0.9.7 — Central em largura total 20/60/20

- Removido o `max-width` da Central que comprimia a interface no centro da tela.
- Workspace operacional agora ocupa 100% da largura útil da viewport.
- Proporção desktop oficial: 20% Ocorrências / 60% Mapa + Agentes / 20% NEXO.
- Margens laterais grandes da v0.9.5 deixam de fazer parte da Central de expediente; ficam apenas pequenos gutters internos.
- Faixa de Agentes permanece vinculada à coluna central de 60%, abaixo do mapa.
- Breakpoint móvel continua reorganizando a interface em uma coluna quando necessário.


## 0.9.9 — Viewport fit, resultados integrados e roster compacto
- Central desktop ajustada para caber em 100dvh sem scroll da página.
- Removido segundo timer `FIM DO TURNO`; relógio operacional central é a única referência.
- Header recebe menu Configurações com salvar, reiniciar expediente e salvar/sair.
- Aba/botão global de Relatórios removido da Central.
- Missão concluída permanece verde na fila como `RESULTADO DISPONÍVEL`.
- Relatório abre em modal na própria Central; arquivar libera agentes e aplica consequências/XP/Ressonância.
- Roster inferior reduzido a retratos 3x4; indisponibilidade vira overlay sobre o retrato.
- Briefing compactado para evitar scroll interno em desktop 1080p.


## 0.9.9 — retratos oficiais
- Sete retratos enviados pelo autor integrados como assets oficiais.
- Roster, briefing, NEXO e mini-equipes usam imagens quadradas com object-fit cover.
- Estados EM CAMPO/RECUPERACAO continuam sobrepostos ao retrato sem bloquear a ficha.


## 0.9.10 — nome e ação da ficha restaurados no roster
- Retratos oficiais continuam quadrados.
- Nome do agente volta a aparecer sob o retrato.
- Botão `ABRIR FICHA` volta a ser explícito.
- `EM CAMPO`/`RECUPERAÇÃO` permanece como overlay apenas sobre a imagem.


## 0.9.11
- Roster inferior recebeu altura real suficiente para exibir retrato, nome e ABRIR FICHA sem corte.
- P1/P2/P3 deixaram de ser exibidos na Central, mapa, briefing e relatório; prioridade continua interna para balanceamento.
- Urgência visual passa a depender de cor, prazo e contexto, sem siglas técnicas.

## 0.9.12 — Vida, Energia e consequências operacionais
- Condição antiga (fadiga/estresse/ferimento categórico) substituída por Vida 0–100 e Energia 0–100.
- Roster mostra duas barras compactas antes de ABRIR FICHA.
- Dossiê mostra barras, valores e estados: Saudável/Ferido/Machucado/Gravemente ferido e Descansado/Estável/Cansado/Exausto.
- Vida/Energia entram na estimativa de sucesso; condição ruim gera desvantagem, não bloqueio automático.
- Resultado agora produz custos explícitos de Vida/Energia; risco e exaustão podem aumentar dano.
- Save schema v5 com migração de saves antigos: fadiga -> Energia e ferimento -> faixa de Vida; turno em andamento reinicia por segurança.
- GDD atualizado para v3.2 / projeto v0.9.12.

## 0.9.13 — escala curta de Vida/Energia e DESMAIADO
- Vida máxima = 9 + Vigor; Energia máxima = 9 + Agilidade.
- Custos oficiais por agente: Sucesso 0 Vida/-1 Energia; Sucesso com custo -1/-2; Sucesso parcial -2/-3; Falha -5/-5.
- Risco da ocorrência não adiciona dano extra nesta regra: o resultado já concentra a consequência mecânica.
- Se Vida OU Energia chegar a 0, o agente entra em DESMAIADO e fica indisponível pelo restante do expediente.
- No dia seguinte, Vida e Energia voltam aos máximos atuais e o agente retorna a DISPONÍVEL.
- Chance de sucesso usa a proporção atual/máxima individual, respeitando diferenças de Vigor e Agilidade.
- Save schema v6; saves v5 em 0–100 migram proporcionalmente para a escala curta.
- GDD atualizado para v3.3 / projeto v0.9.13.


## 0.9.14 — hotfix da ficha de agente
- Corrigido Runtime ReferenceError ao abrir dossiê: `getMaxHealth` e `getMaxEnergy` agora são importados em `app/agencia/page.tsx`.
- Nenhuma regra de Vida/Energia, balanceamento ou save foi alterada.

## 0.1.0 Foundation — refatoração de autoria e baseline estável
- Consolidada a linha funcional v0.9.14 como novo baseline de projeto.
- Criada pasta `content/` como fonte oficial de personagens, ocorrências, mensagens, diálogos, narrativa, UI textual, Ressonância e balanceamento.
- `game/data/heroes.ts`, `incidents.ts` e `resonance.ts` mantidos como compatibilidade/re-export onde aplicável.
- Balanceamento de Vida/Energia, XP e chance movido para `content/config/balance.ts`.
- Configuração de turno/equipe movida para `content/config/gameplay.ts`.
- Mensagens do NEXO separadas em comentários de evento, falas de missão e mensagens ambientes.
- Pós-expediente virou hub opcional de conversas com os sete personagens; uma conversa não encerra mais automaticamente o dia.
- Criadas cenas iniciais editáveis separadamente por personagem em `content/dialogues/post-shift/`.
- Introdução/tutorial inicial passou a ser data-driven.
- Menu principal passou a consumir textos de `content/ui/menu.ts` e oferece Continuar quando existe save local.
- Criados `docs/authoring/WHERE_TO_EDIT.md`, `CONTENT_SCHEMA.md` e `ARCHITECTURE.md`.
- Criada validação leve de conteúdo em desenvolvimento para IDs e referências básicas.
- TypeScript completo aprovado no handoff.
- Build Next não concluiu porque o ambiente sem rede tentou baixar SWC Linux; limitação registrada, não tratada como falha de código.
- Documentos antigos movidos para `docs/archive/`; documentos atuais e guia `EDIT_HERE.md` destacados.

## 0.1.0 Foundation — verificação de retomada (2026-09-29)
- ZIP recebido tratado como única baseline válida; documentação obrigatória de contexto, autoria, design, cânone e failsafe relida antes de qualquer alteração.
- Confirmados `package.json` v0.1.0, save schema v6 e arquitetura `content/` → autoria / `game/` → regras.
- Smoke test estrutural do macrofluxo revisado no código: novo jogo → introdução/tutorial → Central → despacho/resultado → Desenvolvimento → hub NEXO → múltiplas DMs opcionais → encerrar noite → Dia 2.
- Não foi detectada regressão estrutural nesse fluxo durante a inspeção.
- Validação runtime/TypeScript desta sessão ficou bloqueada porque o ZIP não inclui `node_modules` e a reinstalação das dependências declaradas no lockfile sofreu timeout de rede no ambiente. Os erros do `tsc` ocorreram por módulos/tipos React/Next ausentes, não foram classificados como regressões de código.
- Nenhum cânone, fala, ocorrência ou conteúdo narrativo novo foi criado.

## 0.1.2 — NEXO long-form + campanha romântica + curva diária de Dispatch
- NEXO pós-expediente passa a agrupar cenas por personagem em um histórico contínuo, em vez de tratar cada cena futura como um contato separado.
- Adicionado autoscroll ao abrir chat e ao receber/enviar nova mensagem, com botão para voltar às mensagens recentes ao reler histórico antigo.
- Removido o subtítulo `PÓS-EXPEDIENTE` sob NEXO.
- Adicionado suporte a conversas longas por cena via `followUps`, mantendo todas as falas e respostas em `content/`.
- Três escolhas podem carregar `romanceAffinity` 100/50/30; o motor normaliza o ganho pelo número de turnos para evitar farm por conversa longa.
- Adicionado progresso romântico 0–100% por personagem e UI discreta no contato/cabeçalho.
- Save atualizado de v6 para v7 com migração automática; novo bloco `social` preserva progresso romântico e escolhas exclusivas de encontro.
- Preparada exclusividade de saída nos Dias 3 e 6 via `exclusiveOutingDay`; thresholds atuais: 35% e 75%.
- Adicionado gancho `vnSceneId` para transições futuras a cenas presenciais autoradas, sem criar conteúdo narrativo novo.
- Cenas atuais do Dia 1 foram limitadas a `maxDay:1` e receberam apenas classificação mecânica 100/50/30; nenhuma fala foi reescrita.
- Curva de dificuldade do Dispatch passa a escalar os requisitos do briefing por dia, tornando Dia 1 mais amigável a solo e Dia 6 mais dependente de composição.
- Integrado o pacote de legibilidade já aprovado para NEXO, Central, chat operacional e ficha de herói.


## v0.1.3 — persistencia de contatos + campanha social testavel
- corrigido desaparecimento de contatos/historico ao virar o dia; cenas passadas permanecem acessiveis mesmo sem resposta.
- adicionados placeholders D2-D6 para os sete personagens, sempre marcados como conteudo de QA.
- adicionado pipeline de saida/date por `vnSceneId` e rota generica `/encontro`.
- adicionadas cenas presenciais placeholder com background e caixa de texto.
- adicionado `docs/design/CONTENT_COMPLETE_ROADMAP.md` com meta CONTENT-READY.
- save continua em schema v7; nenhuma migracao nova necessaria.


## v0.1.5 - NEXO scroll isolado + Dispatch de suficiencia
- Corrigido autoscroll do NEXO: agora usa `scrollTo` somente no historico interno e nao move a pagina/shell.
- Cenas sociais atuais do Dia 1 tambem marcadas como placeholder de QA.
- Selecao de cena prioriza explicitamente a cena do dia atual para evitar chats sem resposta no Dia 3 quando dias anteriores foram ignorados.
- Chance de missao reequilibrada: nenhum bonus automatico por tamanho de equipe; agentes solo suficientes tornam-se viaveis.
- Curva de requisitos alterada para 0.45/0.50/0.62/0.75/0.90/1.05 (D1-D6).
- Tecnicas desbloqueadas passam a ter feedback explicito na ficha e no briefing; tags concedidas ja entram no calculo de cobertura.
- Ocorrencias expiradas piscam em vermelho antes de sumir; briefing aberto recebe banner de TEMPO ESGOTADO e fecha apos feedback.


## v0.2.4 — Tutorial Isolation + NEXO Privacy
- Primeiro despacho isolado de todos os outros chamados.
- E-04 tutorial encurtado para 12 minutos diegéticos.
- Casos normais do Dia 1 são liberados somente após arquivar o primeiro relatório.
- Coach tutorial integrado ao briefing.
- Painel de conclusão responsivo corrigido.
- NEXO formalizado como mensageiro corporativo: grupo/operações supervisionáveis; DMs privadas não supervisionadas.


## v0.2.5 — Onboarding polish
- Edison recebe asset visual autoral em `public/edison.jpg`.
- Regra NEXO simplificada: grupo operacional supervisionável; DMs privadas não supervisionadas.
- Conclusão do tutorial redesenhada.
- NEXO Operações acompanha automaticamente a mensagem mais recente sem mover a página.
- Pós-tutorial do Dia 1 redistribui chamados entre a liberação e ~14:50, evitando hiatos longos e spawn próximo de 18:00.

## v0.2.6 — 2026-09-29
- Removido o retrato de Edison como arte de fundo da primeira cena.
- Abertura visual em três estágios: exterior da Agência -> escritório -> sistema/SDH.
- Novos assets: `public/agencia-exterior.jpg` e `public/agencia-escritorio.jpg`.
- `public/edison.jpg` permanece como retrato/avatar, não como cenário.

## v0.2.8 — Yuki authored route + NEXO media
- Primeira rota social autorada real: Yuki, estágios 1–6.
- Três imagens enviadas pelo autor integradas ao histórico do NEXO nos estágios 2, 3 e 6.
- NEXO privado passa a suportar imagens clicáveis com lightbox, sem sair da conversa.
- Schema de diálogo ganhou mensagens fixas data-driven antes/depois das escolhas, permitindo reproduzir roteiros longos sem hardcode de fala em React.
- Primeiro outing de Yuki (cafeteria) e segundo date (apartamento) substituem os placeholders em `content/narrative/outings.ts`.
- Outing do Dia/etapa 6 termina exatamente no texto autoral “Posso entrar mesmo?”, sem continuação inventada.
- Placeholders D2–D6 de Yuki foram removidos do registro; estágios 7–10 permanecem apenas como recuperação de QA e são bloqueados após o segundo date.
- Fundamentos de lore/ritmo romântico dos sete integrados à Bíblia da AU; Edison corrigido para masculino na documentação textual.
- Save permanece v9.

### Validação v0.2.8
- 56 arquivos TS/TSX passaram por `transpileModule` do TypeScript com 0 diagnósticos de sintaxe.
- `tsc --noEmit` completo continua não confiável neste ambiente por ausência/incompletude de Next/React e tipagens relacionadas.
- CSS validado com 1638 chaves de abertura e 1638 de fechamento.
- GDD v4.10 renderizado e revisado visualmente em 21 páginas; removido page break que gerava página em branco.


## v0.2.10
- Hotfix: removido CTA genérico de milestone que podia oferecer o primeiro encontro logo após concluir a etapa 2.
- Encontros agora são disparados apenas por escolhas com `vnSceneId`/`exclusiveOutingDay` na própria etapa 3/6.
- Preservado bloqueio de avanço de duas etapas na mesma noite após concluir cena presencial.
- Save schema v9 preservado.

- Compatibilidade: ao carregar, v0.2.10 detecta o estado impossível de v0.2.9 em que o outing 3 do Yuki foi concluído sem nenhuma escolha `yuki:r3:*`; nesse caso restaura Yuki para a etapa 3 e remove apenas o outing prematuro, preservando o restante do save.

## v0.2.29 — Desenvolvimento first-view
- Reorganiza `/desenvolvimento` para caber na primeira viewport desktop em resoluções comuns.
- Compacta cabeçalho, roster e identidade sem remover conteúdo.
- Mantém radar e progressão lado a lado com menor desperdício vertical.
- Coloca escolha de upgrade e técnicas desbloqueadas lado a lado na faixa inferior.
- Adiciona compactação extra para desktops com altura <=820 px.
- Mobile mantém comportamento responsivo anterior.
- Nenhuma regra de progressão, balanceamento ou save foi alterada; schema continua v9.


## v0.2.30 — Desenvolvimento workbench integrado
- Substitui a faixa inferior de upgrade da v0.2.29 por controles de atributo junto ao radar.
- Adiciona prévia de +1 atributo sem persistência antes da confirmação.
- Move ações de progressão/técnica e técnicas desbloqueadas para a coluna direita.
- Preserva regras de progressão e save schema v9.

## v0.2.31 — Desenvolvimento: foco no upgrade
- Aumentado roster lateral (cards, retratos e tipografia) para melhor leitura.
- Níveis 2/4/6: escolha de nova abordagem/evolução movida para o painel principal esquerdo, usando a área de maior atenção da tela.
- Cards de abordagem maiores, com título, descrição e nova capacidade mais legíveis.
- Coluna de progressão deixa de duplicar a escolha e passa a indicar onde concluir o upgrade.
- Técnicas desbloqueadas recebem escala tipográfica e espaçamento maiores.
- Nenhuma regra de progressão, XP, técnica ou save foi alterada.


## v0.2.32 — Hotfix de sobreposição no Desenvolvimento
- Adicionado espaçamento superior específico ao workbench de técnica/especialização.
- Corrigida a colisão entre NÍVEL/XP e o cabeçalho "Escolha uma nova abordagem".
- Sem mudança em XP, técnicas, atributos, milestones, Maestria ou save schema v9.


## v0.2.33 — Elysia authored route + mensagem excluída
- Etapas sociais 1–6 da Elysia substituem os placeholders por texto autoral aprovado e alternativas de resposta do Analista.
- Date 1 (Museu de História) e Date 2 (Casa da Elysia) passam a ser cenas lineares finais em `content/narrative/outings.ts`.
- Três fotos autoradas integradas ao NEXO e convertidas para WebP.
- Mensagens autoradas podem usar `deleteAfterMs`/`deletedText`; o caso “Pegar eu?” é mostrado brevemente e substituído por “Mensagem excluída” antes da próxima bolha.
- Histórico concluído preserva somente o estado excluído; save schema permanece v9.


## v0.2.34 — backgrounds dos dates da Elysia
- Date 1 da Elysia usa o fundo autoral do Museu de História em `public/outings/elysia/date-1-museu.webp`.
- Date 2 da Elysia usa o fundo autoral da casa em `public/outings/elysia/date-2-casa.webp`.
- Assets recebidos em JPG foram convertidos para WebP; texto, fluxo dos dates, romance e save não foram alterados.
- Save schema permanece v9.


## v0.2.35 — hotfix validação Elysia
- Corrige turno `elysia:r4:t3`, que tinha apenas 1 resposta e violava a regra de 3 respostas por turno.
- Adicionadas duas variações mínimas da fala-base do Analista, convergindo para a mesma resposta da Elysia.


## v0.2.36 — convites persistentes e date sob decisão do jogador
- Responder ao último turno de uma etapa 3/6 não abre mais o date automaticamente.
- O NEXO mostra `IR PARA ENCONTRO` depois da última mensagem, preservando o histórico para leitura antes da decisão.
- Convites sobrevivem à virada de dia e continuam disponíveis até a cena presencial ser concluída.
- A regra de uma saída presencial por noite continua ativa, mas não impede terminar chats de outros personagens.
- Se outra saída já ocorreu naquela noite, o CTA permanece visível e volta a habilitar no próximo dia.
- `routeStage` permanece no marco 3/6 até `outingMilestones` registrar o date concluído.
- Save schema permanece v9; sem migração.

## v0.2.37 — Yuki alinhada ao padrão interativo da Elysia
- Preservados acontecimentos, voz, fotos, convites e dates autorados da Yuki.
- D1: despedida deixa de ser fala automática e vira turno de 3 respostas.
- D2: compra do energético, pergunta sobre o jogo e comentário sobre A Sombra do Colosso passam a ter beats próprios.
- D3: resposta sobre o estado do Analista/café vira turno antes do convite para a cafeteria.
- D4: reação à lata já aberta vira escolha, em vez de mensagem automática do Analista.
- D5: resposta sobre providenciar uniforme vira turno antes de “Aguardo atualizações então. Com imagens…”.
- D6: reação a banho/comida vira turno antes do convite para pizza.
- Flags antigas das escolhas principais e dos convites foram preservadas sempre que possível; novos beats usam flags novas.
- CTA persistente de encontro, outings e save schema v9 permanecem inalterados.


## v0.2.38 — menu principal com cidade noturna
- Substituída a área placeholder do menu por `public/menu/cidade-noturna.webp`.
- Adicionado fade horizontal full-screen, concentrado sob a navegação à esquerda e suave até a borda direita.
- Menu reorganizado em marca + ações verticais + footer, com tratamento de hover/foco inspirado na referência fornecida.
- `CONTINUAR` permanece no menu mesmo sem save, em estado desabilitado.
- Textos do menu atualizados em `content/ui/menu.ts`; versão visual passa a v0.2.38.
- Nenhuma mudança funcional em gameplay/save.


## v0.2.39 — fluxo de entrada, configurações e salvar/sair
- Menu ganha painéis internos de Novo Jogo, Carregar Jogo, Conta / Acesso e Configurações sobre a mesma key art.
- CONTINUAR passa a exibir fase do save e resolve a rota de retomada.
- Novo Jogo confirma sobrescrita quando há campanha local.
- Carregar integra slot local, import e export JSON.
- Conta adiciona Entrar / Criar Conta / Jogar sem Conta com adapter local preparado para backend; senha nunca é persistida.
- Configurações persistentes: movimento reduzido e velocidade de bolhas do NEXO; opção de tela cheia.
- Menu recebe drift sutil da cidade, entrada de subpainéis e curtain fade antes de navegar, todos removíveis por redução de movimento.
- SALVAR E SAIR na Central agora volta ao menu principal; Desenvolvimento e NEXO recebem a mesma ação.
- Save schema permanece v9.


## v0.2.41 — dados físicos nas fichas
- Dossiês dos sete agentes passam a exibir idade, altura e peso fornecidos pelo autor.
- `Hero` recebe `age`, `heightCm` e `weightKg` como metadados de conteúdo; nenhuma fórmula de gameplay usa esses campos.
- Idade da Elysia no diálogo de apresentação foi corrigida de 21 para 19 para manter consistência com a ficha aprovada.
- Save schema permanece v9.

## v0.2.42 — Lysandro: rota autorada + fotos no NEXO
- Substituídos os placeholders principais D1–D6 de Lysandro pelo roteiro autoral.
- Mantidas as falas-base do autor; adicionadas duas alternativas por escolha para o padrão de três respostas do NEXO.
- Integradas três fotos autoradas em `public/nexo/lysandro/` em WebP.
- Dates 1/2 de Lysandro substituem os placeholders narrativos e permanecem lineares.
- Convites das etapas 3/6 usam o sistema persistente já existente.
- Save schema permanece v9.


## v0.2.44 — Lysandro Date 2: restaurante → casa
- Adicionado suporte opcional a beats de background em outings lineares.
- Date 2 de Lysandro troca do restaurante para a casa exatamente quando a narrativa segue para a residência.
- Novo asset `public/outings/lysandro/date-2-casa.webp`.
- Save schema permanece v9.

## Documentação — backlog social pós-conversas (2026-10-01)
- Registrado em `docs/failsafe/ROADMAP.md` o backlog para, depois da conclusão das conversas individuais, revisar os grupos do NEXO com vozes consistentes e interações entre membros das equipes reais.
- Registrada como hipótese a avaliar/prototipar uma interação social de fim de expediente com Edison/Analista/grupo, sem dependência dos casos aleatórios do Dispatch e sem assumir continuidade inexistente.
- Registrado o futuro adaptador global de nome/pronomes do jogador (`Ele/dele`, `Ela/dela`, `Elu/delu`), com distinção obrigatória entre “Analista” como tratamento e “analista” como função/cargo.
- Nenhum código, conteúdo narrativo, cânone, regra de save ou versão do pacote foi alterado nesta atualização documental.



## v0.2.54 — revisão/hotfix de navegação mobile
- Corrigida a falta de caminho explícito de retorno em `Memórias → Fotos` e `Memórias → Dates` no layout mobile do NEXO.
- Adicionada barra mobile fixa/sticky com `Conversas` para sair das bibliotecas sem depender do botão físico/gesto do navegador.
- Dates em andamento/replay/QA agora exibem `Voltar ao NEXO` também durante a leitura, preservando retomada da página quando aplicável.
- Safe areas e alturas dinâmicas foram reforçadas em rodapé, compositor, lightbox, modal de próxima noite e leitor de Dates.
- CTAs do arquivo de Dates e do Date reader foram ajustados para toque confortável em 360/390/430 px.
- Sem alteração narrativa, mecânica ou de save; schema permanece v9.


## v0.2.58 — autoria da rota Hélio (2026-10-02)
- Substituída a rota social placeholder de Hélio por autoria fornecida pelo autor para D1–D6.
- Mantidas as falas-base fornecidas; adicionadas duas alternativas por escolha para o padrão de três respostas do NEXO.
- Integradas três fotos autoradas em `public/nexo/helio/`: treino (D4), vinho (D5) e pós-banho (D6).
- Dates 1/2 de Hélio substituem os placeholders, com backgrounds autorados da convenção e do apartamento.
- Convites das etapas 3/6 usam o sistema persistente existente (`exclusiveOutingDay` + `vnSceneId`); nenhum gate antigo foi reativado.
- `SOCIAL_ROUTE_MANIFEST` passa Hélio para `authored: true`; placeholders genéricos de Hélio foram removidos.
- `npm run validate:social-assets`: OK, 28 referências locais encontradas.
- `npx tsc --noEmit` não pôde ser usado como sinal de regressão porque as dependências React/Next continuam incompletas no ambiente após o timeout já registrado; erros começam por módulos/tipos ausentes e atingem arquivos não relacionados.
- Save schema permanece v9 e `package.json` permanece 0.2.58.

## v0.2.58 — Hélio padronizado pelo modelo Demétria (2026-10-02)
- Rota D1–D6 de Hélio reorganizada no padrão autoral aprovado de Demétria: fala-base do Analista preservada como opção 1 e duas alternativas adicionais por turno.
- Alternativas anteriores de Hélio foram substituídas pelas opções aprovadas nesta sessão; acontecimentos, respostas de Hélio, fotos, convites, flags de saída e marcos de Date permanecem no mesmo fluxo.
- Texto-base fornecido pelo autor foi restaurado sem correções editoriais automáticas, inclusive grafia e pontuação originais.
- Dates 1/2 de Hélio foram restaurados para o texto autoral fornecido, apenas segmentado em parágrafos para o leitor; continuam lineares e sem opções.
- `npm run validate:social-assets`: OK, 28 referências locais.
- Versão permanece 0.2.58; save schema permanece v9.

## 2026-10-02 — backlog de revisão contextual global
- Adicionado backlog pós-autoria: quando todos os chats estiverem prontos, revisar todas as opções adicionais do Analista para garantir que cada alternativa se encaixe no contexto da próxima mensagem fixa do personagem.
- A revisão deverá preservar texto-base, autoria e cânone; somente alternativas adicionais incompatíveis com a continuidade poderão ser ajustadas.

- Backlog pós-chats ampliado: Demétria definida como referência de padronização global dos chats; adicionados nome configurável do jogador, seletor de pronomes, substituição contextual de `Analista`, helpers de concordância, compatibilidade de saves e QA textual global.

- Asset update: `public/heroes/lysandro.jpg` replaced with the new Lysandro hero portrait supplied by the author. No dialogue, canon, mechanics, save schema, or route logic changed.

## 2026-10-05 — playtest estrutural de continuidade
- Executada revisão de fluxo/gameplay orientada a hardlocks e softlocks: campanha, modo pós-expediente, D3/D6, reserva de Date, saída/reentrada, conclusão de Date, virada de noite e fechamento operacional.
- Não foi encontrado estado reproduzível que impossibilite a continuação dentro das regras atuais.
- `npm run validate:social-assets`: 28/28 OK.
- QA runtime/browser, build e typecheck continuam não aprovados porque `npm ci --no-audit --no-fund` expirou novamente no ambiente.
- Nenhum código ou conteúdo autoral foi alterado; versão 0.2.58 e save schema v9 preservados.
## 2026-10-05 — harness automatizado de fluxo/gameplay
- Adicionado sistema de QA separado em `qa/playtest/`, sem dependência do runtime normal do jogo.
- Adicionados `TESTAR_JOGO.bat` e `TESTAR_JOGO.sh` para instalação + execução em um comando.
- Playtests cobrem gate de Date, reload, URL sem autorização, saída/reentrada, conclusão/milestones, replay/QA read-only, avanço Noites 1–7 e guards do modo Só pós-expediente.
- Adicionada auditoria estática `npm run qa:flow:static`; resultado nesta sessão: 20/20 PASS.
- `npm run validate:social-assets`: 28/28 PASS.
- Dependências/browser do Playwright não puderam ser instalados neste ambiente por timeout; E2E runtime segue pendente.
- Nenhum conteúdo narrativo, cânone, balanceamento, regra de gameplay ou save schema foi alterado.



## 2026-10-05 — nova tentativa de execução do playtest automatizado
- Retomada feita exclusivamente a partir do ZIP `Agencia-Ressonancia-v0.2.58-Playtest-Automatizado-2026-10-05.zip`.
- Executado `TESTAR_JOGO.sh`, equivalente shell do próximo item obrigatório; o ambiente interrompeu a instalação/E2E com `TransportTimeoutError`.
- Não houve FAIL funcional reproduzido e, por isso, nenhum gameplay foi alterado.
- Revalidações disponíveis: fluxo estático 20/20 PASS, assets sociais 28/28 PASS e sintaxe JS/MJS do harness aprovada.
- Apenas documentação failsafe foi atualizada; versão continua 0.2.58 e save schema continua v9.

## v0.2.58 — autoria da rota Alexandra (2026-10-05)
- Alexandra D1–D6 integrada a partir do material fornecido pelo autor, com três opções por turno e opção 1 preservando a fala-base.
- Fotos autorais integradas: D3 vestido branco, D5 parque e D6 elevador.
- Dates autorados: D3 Mostra Cultural de Ballet Contemporâneo e D6 apartamento do Analista, usando as duas imagens fornecidas.
- Convites dos marcos 3/6 usam `exclusiveOutingDay` + `vnSceneId`; IDs existentes `outing-day3-alexandra` e `outing-day6-alexandra` foram preservados.
- Alexandra agora está `authored: true` e foi removida dos outings placeholder D3/D6.
- `npm run validate:social-assets`: 32/32 referências locais OK. `npm run qa:flow:static`: 22/22 PASS.
- Versão permanece 0.2.58; save schema permanece v9. QA visual/runtime da rota continua pendente.


## v0.2.59 - Nome e pronomes configuráveis + normalização de autoria (2026-10-06)
- Save schema sobe de v9 para v10 com `player.pronouns` e migração segura de saves v9; saves antigos assumem `Ele/dele` para preservar o comportamento histórico.
- Novo Jogo agora coleta nome + pronomes `Ele/dele`, `Ela/dela` ou `Elu/delu`.
- Interpolação de identidade centralizada em `lib/playerText.ts`; textos suportam `{{playerName}}`, pronomes e `{{playerForm:...}}` apenas quando neutralização natural não é adequada.
- Chats e Dates autorados foram revisados com regra "neutralidade primeiro", sem alterar personalidade, eventos, intenção romântica, cânone ou resultado das cenas.
- Os 7 DOCX de autoria foram sincronizados em `docs/authoring/chat-scripts/` e receberam a convenção de variáveis do jogador.
- QA estático: 25/25 PASS. Validação de mídia social: 35/35 PASS. Render visual dos 7 DOCX: aprovado, sem clipping/overlap detectado.
- TypeScript/runtime browser completo continua dependente de ambiente com dependências React/Next instaladas e E2E Playwright funcional.


## v0.2.59 — correção autoral Elysia/Yuki (2026-10-06)
- Reimportados os DOCX corrigidos de Elysia e Yuki como fonte autoral definitiva para essas duas rotas.
- Elysia: idade corrigida para 21 anos no D1 e na ficha; esta decisão substitui a correção histórica para 19 anos.
- Removidas alternativas de fala que haviam sido inventadas na primeira passagem de normalização quando o DOCX marcava uma fala fixa do Analista.
- Mantidos somente os pontos de escolha existentes nos DOCX corrigidos; Dates permanecem lineares.
- Reaplicada a regra de identidade do jogador: neutralidade primeiro, nome dinâmico contextual e pronomes somente quando necessários.
- QA estático 25/25 e mídia social 35/35; DOCX corrigidos renderizados e inspecionados.

## v0.2.61 — ordenação NEXO, cadência do grupo, Alexandra e tutorial safe
- DMs passam a priorizar última atividade efetiva; envio do jogador grava atividade persistente sem novo schema.
- Turno ainda não iniciado pelo Analista deixa de ser promovido pelo horário autorado da cena.
- Primeiras respostas do grupo NEXO são reveladas sequencialmente com indicador de digitação.
- Foto principal de Alexandra atualizada.
- E-04 fica protegido contra expiração no onboarding; relógio pausa durante a decisão e retoma após despacho.
- Nenhuma fala/Date/cânone alterado; save schema permanece v10.


## v0.2.64 — Tutorial Progressivo v2 (2026-10-06)
- Adicionado `content/narrative/progressiveTutorial.ts` com cópias e flags persistentes dos tutoriais contextuais.
- Adicionado `components/ProgressiveTutorialCoach.tsx` e tratamento visual correspondente.
- `app/desenvolvimento/page.tsx`: tutorial de primeiro upgrade, técnica, atributo e Maestria; seleção automática de agente com Maestria quando não há upgrade pendente.
- `app/agencia/page.tsx`: tutorial contextual para 2+ agentes/Ressonância, combo descoberto e condição baixa.
- `app/conversa/page.tsx`: tutorial do NEXO pós-expediente e primeiro convite de Date.
- `docs/design/TUTORIAL_PROGRESSIVO_V2.md` registra gatilhos e golden path.
- QA estático 39/39 PASS; assets sociais 35/35 PASS; save schema v10 preservado.


## v0.2.65 — Edison Tutorial UX v3 (2026-10-06)
- Added unified Edison tutorial coach with official portrait, target cue, spotlight and contextual visual tones.
- Added action-driven tutorial completion for Development and NEXO/Date.
- Added persistent discoverable Agency Manual across Central, Development and NEXO.
- Added responsive tutorial/manual presentation for mobile.
- No gameplay, balance, narrative or save-schema changes; save remains v10.
