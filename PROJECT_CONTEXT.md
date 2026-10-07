## Beta 1 · v0.3.0-beta.25 — Manual integrado ao rodapé mobile do NEXO (2026-10-07)

- No mobile, o launcher flutuante do Manual foi removido da lista do NEXO.
- `ENCERRAR NOITE` e `MANUAL` agora ocupam uma faixa de ações própria no rodapé, lado a lado; em 360 px ou menos empilham.
- Conversas ativas continuam sem Manual flutuante, preservando respostas e envio livres de sobreposição.
- Desktop permanece com o launcher flutuante anterior.
- Save schema permanece v10.

## Beta 1 · v0.3.0-beta.25 — NEXO mobile sem sobreposição de ações (2026-10-06)

- Corrigido o bloco CSS da beta.23 que havia sido serializado com escapes literais e, por isso, não era aplicado pelo navegador.
- Em conversa mobile, ENCERRAR NOITE permanece apenas na lista do NEXO; o cabeçalho fica reservado a contato + Configurações.
- Manual é ocultado enquanto uma conversa está aberta no mobile, evitando cobrir respostas/composer.
- Composer de envio só aparece depois que uma resposta é selecionada; antes disso, as respostas são a única ação inferior.
- Nenhuma lógica social, Date, Supabase ou save foi alterada; save schema permanece v10.

## Beta 1 · v0.3.0-beta.25 — correção textual Lysandro (2026-10-06)

- Date 1 de Lysandro: corrigido o trecho autoral para `um rápido beijo acontece`, preservando evento e intenção da cena.
- Runtime e DOCX de autoria foram alinhados; nenhuma mecânica, flag, romance ou save foi alterado.
- Save schema permanece v10.

## Beta 1 · v0.3.0-beta.21 — Configurações NEXO + DEV oculto (2026-10-06)

- Configurações do NEXO reorganizadas em Áudio / Save / Conta, com painel compacto no desktop e quase fullscreen no mobile.
- Input nativo de arquivo permanece oculto; importação usa botão estilizado.
- DEV Tools ficam invisíveis por padrão e só são liberadas pelo atalho secreto `Ctrl + Alt + Shift + D`; repetir o atalho oculta novamente.

## Beta 1 · v0.3.0-beta.21 — configurações também no NEXO (2026-10-06)

- NEXO/chat agora possui engrenagem global de Configurações no canto superior direito, disponível também com conversa ativa e no mobile.
- O menu replica o volume global da música (persistente), salvar agora, exportar/importar save, salvar e sair e sair da conta.
- Volume continua padrão 10%; Dispatch/NEXO continuam usando Tha/Delphium em loop.
- Save schema permanece v10.

## Beta 1 · v0.3.0-beta.19 — música ambiente + volume (2026-10-06)
- Música de Dispatch: `Aphex Twin - Tha`, asset local fornecido nesta sessão, em loop.
- Música do NEXO/chat: `Aphex Twin - Delphium`, asset local fornecido nesta sessão, em loop.
- Volume global persistente em `ressonancia.settings`, padrão inicial de 10%; slider nas Configurações da Central e no menu principal.
- Player global respeita `basePath` do GitHub Pages e tenta iniciar após interação do usuário quando autoplay for bloqueado.
- Save schema permanece v10; música/configuração não altera o save de campanha.

## Beta 1 · v0.3.0-beta.18 — AgencyHeader build hotfix (2026-10-06)
- Tipagem de `AgencyHeader` formalizada em `AgencyHeaderProps`, incluindo `onSignOut` e callbacks async de import/logout.
- `onImportSave` e `onSignOut` aceitam `Promise<void>` sem quebrar o contrato React/TypeScript.
- Nenhuma regra de gameplay, save, Supabase ou UI foi alterada.

## Beta 1 · v0.3.0-beta.16 — tutorial NEXO sem bloqueio visual (2026-10-06)
- Tutoriais progressivos do NEXO agora usam balão normal com botão `OK`, sem spotlight/backdrop escuro.
- Lista de contatos deixa de receber destaque/z-index forçado durante esses tutoriais.
- Ao confirmar `OK`, a flag de tutorial é persistida e o balão não reaparece naquela campanha.
- Gameplay, social, Supabase e save schema v10 permanecem inalterados.

## Beta 1 · v0.3.0-beta.14 — rework total do Dispatch mobile (2026-10-06)

- Mobile deixa de comprimir a Central desktop e passa a usar fluxo sequencial próprio: Central → Chamado → Equipe → Resultado/Ficha.
- MAPA deixa de ser dependência para abrir briefing no celular; desktop preserva a Central tática atual.
- Resultado mobile é uma superfície dedicada, sem card de resultado, HUD, Manual ou tutorial flutuante competindo por espaço.
- Edison e tutoriais progressivos entram no fluxo vertical mobile; relógio continua pausando quando o tutorial bloqueante/FICHA estiver ativo.
- NEXO operacional e lista de agentes têm superfícies mobile próprias; nenhuma regra de Dispatch foi alterada.
- Save schema permanece v10.

## Beta 1 · v0.3.0-beta.12 — fim romântico + operação infinita (2026-10-06)

- O fim sistêmico ocorre quando todos os sete agentes concluíram DATE 1 e DATE 2.
- O último Date leva a uma tela final única, sem epílogo narrativo inventado.
- A tela permite CONTINUAR JOGANDO (retorno ao NEXO e loop infinito de Dispatch na campanha) ou VOLTAR AO MENU.
- Saves já completos também são detectados no NEXO/menu; a tela não repete após `campaign:all-romances-ending-seen`.
- Save schema permanece v10.

## Beta 1 · v0.3.0-beta.11 — revisão mobile completa (2026-10-06)

- Resultado de ocorrência assume o viewport inteiro no mobile; rail/cartões da Central deixam de competir com o relatório aberto.
- Ficha de agente usa viewport inteiro com header/footer alcançáveis e continua respeitando a pausa contextual.
- NEXO privado usa histórico e composer em grid de 100dvh; respostas ficam em coluna, envio tem alvos touch >=44px e composer pode rolar quando há muitas opções.
- Desenvolvimento, Manual, confirmações, menus, VN e Dates receberam safe-area/overflow mobile para evitar ações fora da tela.
- Nenhuma regra de Dispatch, social, Supabase ou save foi alterada; save schema permanece v10.

## Beta 1 · v0.3.0-beta.10 — Responsividade das mensagens no Dispatch (2026-10-06)

- NEXO operacional agora mantém mensagens legíveis em monitores baixos/estreitos com feed realmente rolável e texto com quebra segura.
- Briefing espelha as 3 mensagens operacionais mais recentes quando o rail lateral fica comprimido ou oculto; no mobile o espelho aparece dentro da região rolável do briefing.
- Layouts desktop baixos reduzem chrome do NEXO antes de sacrificar a área de mensagens.
- Gameplay, relógio, Supabase e save schema v10 permanecem inalterados.

## Beta 1 · v0.3.0-beta.8 — Pausa contextual de leitura (2026-10-06)

- A Central pausa o relógio operacional enquanto uma FICHA de agente está aberta, inclusive com ocorrência aguardando despacho.
- Tutoriais progressivos bloqueantes do Dispatch (Ressonância, Combo e Condição) também congelam o relógio enquanto ocupam a leitura.
- Ao fechar a ficha/tutorial, o relógio é reancorado uma única vez; deadlines e missões não consomem o período de leitura.
- O cabeçalho mostra `PAUSADO · LEITURA` enquanto a pausa contextual está ativa.
- Gameplay, duração nominal das missões, chance, Supabase e save schema v10 permanecem inalterados.

## Beta 1 · v0.3.0-beta.7 — Dispatch mobile reliability (2026-10-06)
- Abrir chamado no mobile agora monta o painel MAPA antes do briefing, eliminando o caso em que o modal era ocultado junto de um workspace inativo.
- Briefing mobile usa uma região interna de scroll, footer não sobreposto, CTA amplo e lista touch de agentes em telas estreitas.
- Fechar retorna à aba de origem; despachar/expirar retorna a CHAMADOS. Desktop, Dispatch mecânico, Supabase e save v10 permanecem inalterados.

## Beta 1 · v0.3.0-beta.6 — auth mobile hotfix (2026-10-06)
- ENTRAR/CRIAR CONTA agora usam controles touch independentes e redundantes no menu de acesso.
- GitHub Pages, Supabase, save v10 e gameplay permanecem inalterados.

## Beta 1 · v0.3.0-beta.5 — GitHub Pages / static export (2026-10-06)
- Next configurado com `output: export`, `trailingSlash` e `basePath` configurável por `NEXT_PUBLIC_BASE_PATH`.
- Workflow `.github/workflows/pages.yml` publica `out/` via GitHub Pages em push para main/master ou manualmente.
- Assets de `public/` passam por `lib/publicPath.ts`, preservando execução local e subdiretório `/repo` do Pages.
- Dates dinâmicos recebem `generateStaticParams`, permitindo export estático de todas as cenas autoradas.
- GitHub repo continua mostrando README; o jogo deve ser aberto pela URL do ambiente GitHub Pages.
- Save schema permanece v10; gameplay/cânone/balanceamento não foram alterados.

## Beta 1 · v0.3.0-beta.3 — refatoração/otimização (2026-10-06)
- Central reduz persistência redundante: ticks visuais não geram revisão de save/cloud sem transição operacional.
- Persistência local deduplica payload idêntico; CloudSyncBridge evita uploads concorrentes.
- Seletores/índices compartilhados reduzem duplicação e buscas lineares; UI secundária da Central usa code splitting.
- Save schema permanece v10; gameplay, balanceamento, conteúdo e cânone não mudaram.

# RESSONÂNCIA — CONTEXTO MESTRE

> BASELINE: **v0.1.0 (Foundation)**, consolidada da linha funcional v0.9.14. Build incremental atual: **Beta 1 · v0.3.0-beta.21**, com NEXO long-form, progresso romântico e curva diária de Dispatch; a baseline de origem continua sendo a Foundation.
> NÃO confundir com o antigo snapshot `ressonancia-fase1-0.1.1`, que é obsoleto e nunca deve ser usado como base.

## Como retomar em outro chat

Leia, nesta ordem:
1. `PROJECT_CONTEXT.md`
2. `content/README.md`
3. `docs/authoring/WHERE_TO_EDIT.md`
4. `docs/canon/*`
5. `docs/design/*`
6. `docs/failsafe/CURRENT_STATE.md`
7. `docs/failsafe/NEXT_SESSION.md`




## Beta 1 · v0.3.0-beta.2 (2026-10-06)
## Hotfix visual do primeiro tutorial · v0.3.0-beta.2
- No E-04, Edison usa apenas o balão flutuante padrão; o briefing não reserva mais uma faixa interna para tutorial.
- O onboarding principal não aplica spotlight global escuro no primeiro caso nem no resultado; o alvo relevante continua pulsando.
- Ao abrir o resultado do primeiro caso, o balão permanece visível acima do modal e orienta revisar/arquivar.
- Save schema v10 e regras de Dispatch/tutorial permanecem inalterados.

- Arquitetura de persistência passa a ser local-first: `lib/save.ts` continua como fachada do domínio e `lib/persistence/` separa armazenamento/metadados do backend.
- Supabase Auth + save cloud implementados por adapters REST em `lib/supabase/`, ativados somente quando `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` estão configurados.
- `CloudSyncBridge` sincroniza saves em background após escrita local somente para contas vinculadas; modo convidado e jogo offline continuam funcionais.
- Primeiro vínculo não usa last-write-wins silencioso: se local e nuvem divergirem, o jogador escolhe explicitamente `USAR LOCAL` ou `USAR NUVEM`.
- Migration/RLS versionada em `supabase/migrations/001_beta1_game_saves.sql`; nunca usar service role no cliente.
- Build identificada como `BETA 1 · v0.3.0-beta.2`; save schema permanece v10.

## Atualização v0.2.65 (2026-10-06)
- Edison Tutorial UX v3 unifica a apresentação tutorial em `components/EdisonCoach.tsx`, usando retrato oficial, estados visuais, pista de alvo e spotlight sem bloquear a interface real.
- Desenvolvimento registra aprendizado por ação: selecionar agente `UP`, escolher técnica e confirmar atributo; Maestria permanece confirmação informativa por não possuir escolha manual.
- NEXO registra o tutorial pós-expediente ao abrir uma conversa e o tutorial de Date ao usar explicitamente `IR PARA ENCONTRO`.
- `Manual da Agência` foi adicionado à Central, Desenvolvimento e NEXO; entradas contextuais desbloqueiam conforme flags já existentes.
- Save schema permanece v10; nenhuma fórmula, balanceamento, conteúdo narrativo ou gate de Date foi alterado.

## Atualização v0.2.64 (2026-10-06)
- Tutorial Progressivo v2 implementado sem alterar balanceamento: explicações contextuais aparecem somente quando o sistema se torna acionável e usam flags persistentes no save v10.
- Desenvolvimento agora ensina primeiro upgrade, técnica/especialização/evolução, ponto de atributo e Maestria pós-Nv6; upgrades continuam obrigatórios antes do pós-expediente.
- Dispatch contextual ensina equipe/Ressonância ao selecionar 2+ agentes, combos somente quando descobertos e condição quando o briefing detectar agente cansado/machucado.
- NEXO pós-expediente explica liberdade de conversar com vários contatos; convite de Date recebe tutorial próprio quando houver convite pendente.
- Regras documentadas em `docs/design/TUTORIAL_PROGRESSIVO_V2.md`; save schema permanece v10.

## Atualização v0.2.63 (2026-10-06)
- NEXO operacional contextual v2 implementado sem alterar o cálculo de Dispatch: mensagens agora consideram ocorrência, afinidade, tags/especialidade, composição da equipe, relações/combos já registrados e resultado da missão.
- Os **48/48 casos** do banco ativo possuem comentário pré-despacho, incluindo os dez IDs legados `inc-*` ainda válidos no banco.
- Equipes diferentes recebem diálogo diferente: pares canônicos/ressonantes têm interações próprias e as demais composições usam fallback que referencia o colega realmente despachado.
- Resultados distinguem sucesso, sucesso com custo, parcial e falha; em equipes com 2+ membros o segundo agente pode reagir ao retorno do primeiro.
- `docs/authoring/chat-scripts/NEXO - Guerreiros Elementais.docx` passa a espelhar o catálogo operacional contextual para revisão autoral.
- Save schema permanece v10; nenhuma chance, requisito, duração, recompensa ou resultado mecânico de ocorrência foi alterado.

## Atualização v0.2.62 (2026-10-06)
- Mensagens do grupo NEXO Guerreiros Elementais revisadas a partir das vozes já autoradas nos chats individuais.
- `content/narrative/introduction.ts`: sete respostas iniciais do grupo reescritas mantendo a entrega sequencial da v0.2.61.
- `content/messages/operations.ts`: comentários de ocorrências, atualizações de missão e conversa ambiente deixam de ser placeholder e passam a ter voz específica por personagem.
- Documento revisável criado em `docs/authoring/chat-scripts/NEXO - Guerreiros Elementais.docx`; qualquer revisão futura deve ser refletida no runtime correspondente.
- Nenhum evento, regra de Dispatch, Date, rota individual, cânone ou save schema foi alterado; save permanece v10.

## Atualização v0.2.61 (2026-10-06)

- NEXO ordena contatos pela atividade real mais recente: mensagens enviadas pelo jogador passam a registrar atividade persistente por contato; mensagens recebidas sem interação usam a hora autorada como fallback; conversas ainda não iniciadas não sobem artificialmente apenas por possuírem `timeLabel`.
- A primeira conversa coletiva do grupo `Guerreiros Elementais` agora revela as respostas uma a uma, com indicador de digitação e avanço bloqueado até a sequência terminar.
- Retrato principal de Alexandra substituído pelo asset fornecido nesta sessão em `public/heroes/alexandra.jpg`.
- O primeiro caso guiado E-04 não pode mais expirar enquanto aguarda a decisão do jogador: o relógio operacional pausa nessa etapa e retoma do mesmo minuto após o despacho.
- Save schema permanece v10; nenhum diálogo, Date, cânone ou balanceamento de casos foi alterado.

## Atualização v0.2.60 (2026-10-06)

- Hotfix de validação social após o primeiro runtime da v0.2.59.
- Alexandra autorada não é mais duplicada pelos geradores placeholder D2–D6; os IDs autorais existentes foram preservados para compatibilidade de save.
- Eros D1–D6 agora segue o contrato estrutural de exatamente 3 respostas por turno: a fala-base autoral permanece intacta como opção base e as duas alternativas adicionais apenas variam o tom do Analista, sem criar evento/cânone novo.
- Todos os finais de D3/D6 do Eros preservam `exclusiveOutingDay` + `vnSceneId`, como exigido pelo gate de Date.
- Save schema permanece v10.

## Identidade

RESSONÂNCIA é uma AU de **Elemento do Frio**. O jogador é o **Analista de Despacho** da Agência Ressonância. Não controla combate diretamente: interpreta ocorrências, monta equipes de 1–3 agentes e lida com consequências humanas, operacionais e narrativas.

Heróis: Yuki, Elysia, Lysandro, Hélio, Demétria, Alexandra e Eros. Todos podem desenvolver amizade, relação profissional, tensão ou romance opcional com o Analista.

## Regra de autoridade narrativa

- `[CÂNONE-BASE]`: sustentado pelo livro/material fornecido.
- `[AU-APROVADO]`: decisão específica do jogo.
- `[A DEFINIR]`: não inventar silenciosamente.

Antes de escrever personagem, ler `docs/canon/AU_BIBLE.md` e `docs/canon/CHARACTER_BIBLE.md`.

## Arquitetura v0.1.0

A refatoração separa autoria de motor:

- `content/` — **fonte oficial editável**: personagens, ocorrências, mensagens, conversas, respostas do jogador, tutorial, introdução, textos de menu e balanceamento.
- `game/` — regras/simulação.
- `components/` — componentes reutilizáveis.
- `app/` — telas/rotas.
- `lib/` — save/infraestrutura.
- `docs/authoring/` — manual para o autor alterar conteúdo com segurança.

Arquivos antigos em `game/data/*` podem permanecer como re-exports de compatibilidade. Não duplicar conteúdo novo neles.

## Loop atual

**Expediente 08:00–18:00 → resultados → Desenvolvimento da Equipe → pós-expediente/NEXO → próximo dia.**

- 10 horas diegéticas = 10 minutos reais no protótipo.
- ocorrências se sobrepõem;
- equipe de 1–3 heróis;
- despacho assíncrono;
- NEXO operacional somente leitura durante o trabalho;
- missão concluída fica verde como `RESULTADO DISPONÍVEL` até ser arquivada;
- XP é processado no fim do expediente;
- pós-expediente permite conversar com qualquer personagem com cena disponível ou com ninguém.

## Atributos e condição

Atributos 1–5: **Força, Agilidade, Carisma, Inteligência, Vigor**.

Todos começam em 1/1/1/1/1 + quatro pontos distribuídos por identidade.

Condição:
- Vida máxima = `9 + Vigor`
- Energia máxima = `9 + Agilidade`
- Sucesso: 0 Vida / -1 Energia
- Sucesso com custo: -1 Vida / -2 Energia
- Sucesso parcial: -2 Vida / -3 Energia
- Falha: -5 Vida / -5 Energia
- 0 em Vida OU Energia = `DESMAIADO` até o dia seguinte.

## Progressão

- Nv1: base + quatro pontos iniciais
- Nv2: técnica
- Nv3: +1 atributo
- Nv4: técnica/especialização
- Nv5: +1 atributo
- Nv6: evolução de poder

XP é ganho desde o Dia 1 e upgrades são resolvidos no fim do próprio expediente, antes do pós-expediente.

## UI atual

Central desktop em três canais:
- esquerda: Ocorrências;
- centro: Mapa + roster;
- direita: NEXO // Operações.

Briefing mostra pontos recomendados e **chance estimada probabilística**. A chance não garante resultado.

Prioridade P1/P2/P3 existe internamente, mas não é exibida como sigla ao jogador.

## Save

- localStorage
- schema atual: v10
- saves antigos são migrados; não apagar save para resolver mudança de schema.


## Social/NEXO v0.1.5

- Um contato do NEXO acumula histórico de vários dias; cenas longas usam turnos adicionais autorados.
- Autoscroll acompanha novas mensagens usando scroll interno do histórico; header, lista de contatos e compositor permanecem fixos.
- Romance possui progresso 0–100% por personagem, além dos eixos relacionais existentes.
- Romance agora ganha pontos por mensagem (100=+7, 50=+5, 30=+3), com teto diário de 18 por personagem; conversas longas ajudam sem permitir farm infinito.
- O percentual de romance é feedback de afinidade e não bloqueia encontros. Chegar aos marcos de rota 3 e 6 libera as cenas presenciais; a exclusividade continua sendo uma saída por noite global.
- Dias 3 e 6 permitem no máximo um encontro presencial cada; não escolher ninguém é válido.
- O ritmo D1–D6 é direcional e pode variar por personagem.
- A dificuldade do Dispatch cresce por dia (0,45/0,50/0,62/0,75/0,90/1,05). D1–D2 favorecem especialistas solo; D5–D6 cobram builds, cobertura complementar e combos.
- Tamanho de equipe não concede bônus automático. Se um agente cobre sozinho os requisitos/capacidades, ele é viável solo; outros agentes entram para cobrir lacunas, condição, Ressonância e combos.
- Técnicas desbloqueadas adicionam capacidades (`grantedTags`) ao cálculo de Dispatch e são visíveis na ficha/briefing.
- Contatos permanecem acessiveis nos dias seguintes mesmo se uma mensagem antiga ficou sem resposta.
- Yuki D1-D6 já usa autoria final aprovada; as demais rotas sociais continuam PLACEHOLDER de QA até receberem texto final.
- Saidas dos Dias 3/6 usam uma tela presencial generica `/encontro` com background + caixa de texto data-driven.
- Roadmap de fechamento: `docs/design/CONTENT_COMPLETE_ROADMAP.md`.

## Regra de desenvolvimento

1. Conteúdo editável vai para `content/`.
2. Não hardcodar falas ou ocorrências em React se puderem ser dados.
3. IDs de conteúdo são estáveis.
4. Mudança mecânica durável atualiza GDD + failsafe.
5. Mudança canônica/AU durável atualiza Bíblia da AU.
6. Atualizar `NEXT_SESSION.md` antes de cada handoff.

## Progressão v0.1.5

- thresholds cumulativos de XP: 50 / 130 / 230 / 360 / 520 para níveis 2–6;
- Desenvolvimento seleciona automaticamente o próximo agente com upgrade pendente;
- saves migrados reconstroem milestones a partir do XP acumulado;
- o botão de topo não finge concluir upgrades: leva ao próximo upgrade pendente e só libera o pós-expediente quando todos forem resolvidos.


## Dev Mode v0.1.6

- Novo botão `FINALIZAR EXPEDIENTE 100%` no painel DEV.
- Resolve automaticamente todas as ocorrências ainda não arquivadas como `Sucesso`, aplica custo/XP normal de Sucesso, limpa relatórios pendentes e encerra o turno às 18:00.
- O atalho segue diretamente para Desenvolvimento para acelerar QA de progressão, NEXO e dias posteriores.
- Resultados já arquivados não recebem XP novamente.


## Atualização v0.2.0 (2026-09-29)
Rotas sociais agora são individuais por personagem e independentes do dia global. Campanha continua após Dia 6. Técnicas relevantes têm efeito direto (+6 p.p., cap +12), XP pós-Nv6 alimenta Maestria 1–5 e dificuldade pós-D6 alterna ondas sem inflação infinita. Save schema v9. Ver `docs/design/ROUTE_AND_LATEGAME_SYSTEM.md`.


## Atualização v0.2.1 (2026-09-29)

O banco aprovado de 48 ocorrências foi implementado em `content/incidents/caseBank.ts`, com composição diária determinística, pesos, cooldown, `minDay` e faixas easy/medium/hard/crisis. Casos aprovados com afinidade contextual de poder concedem +10 p.p. por herói compatível, teto +15 p.p. por equipe, sem tornar o herói obrigatório. Peso de atributo 3/2/1 agora significa ESSENCIAL/IMPORTANTE/APOIO literalmente. Save permanece v9. Ver `docs/design/INCIDENT_POOL_SYSTEM.md`.

## Atualização v0.2.4 (2026-09-29)

Playtest D1-D6 rebalanceado. NEXO agora permite no máximo uma etapa de rota por personagem por noite global e remove progresso/ROTA da lista de contatos; romance permanece visível somente dentro da conversa. Relatórios voltam a contextualizar o chamado e descrevem como a equipe o resolveu. Dispatch acelera para 10 minutos reais, usa 10/11/12/13 casos conforme pressão, spawns em ondas mais próximas, requisitos D1-D5 mais firmes e custos de Energia maiores para tornar disponibilidade/fadiga relevantes. Afinidade contextual passa a +8 p.p. (cap +12). Casos de enchente/drenagem agora reconhecem Alexandra. Save permanece v9.


## Atualização v0.2.4 (2026-09-29)

Onboarding definitivo do Dia 1 implementado a partir do roteiro autoral: Edison recebe o Despachante, apresenta os Guerreiros Elementais, primeiro contato ocorre no grupo NEXO e o SDH ensina o primeiro despacho usando o incêndio E-04 com Hélio. Tutorial pode ser pulado; primeiro caso tutorial é sucesso controlado e depois libera o banco normal. Menu principal foi redesenhado com navegação à esquerda e área reservada para arte futura. Edison passa a ser [AU-APROVADO] como supervisor/chefia de onboarding da Agência. Save permanece v9.


## Atualização v0.2.4 (2026-09-29)

Primeiro despacho agora é isolado: nenhum outro caso surge durante E-04; a missão guiada dura 12 minutos diegéticos e o banco normal só é liberado após arquivar o relatório. Orientação de Edison foi movida para dentro do briefing quando necessário e o card final foi corrigido responsivamente. NEXO é mensageiro corporativo: grupos/canais operacionais podem ser supervisionados; DMs privadas não são supervisionadas. Save permanece v9.


## Atualização v0.2.6 (2026-09-29)

Polimento do onboarding após playtest: texto de privacidade do NEXO reduzido à regra essencial; imagem autoral de Edison integrada à introdução e aos elementos do tutorial; card de conclusão redesenhado; chat operacional passa a acompanhar automaticamente a mensagem mais recente usando scroll interno; e a liberação do banco após E-04 usa cadência compacta, com último spawn bem antes do fim do turno para evitar vazios longos e chamados tardios. Save permanece v9.

## Atualização v0.2.6 (2026-09-29)

A abertura visual deixa de usar o retrato de Edison como key art. A introdução agora começa com a imagem externa do prédio da Agência, muda para o interior do escritório a partir da segunda fala e, depois do NEXO, segue para a linguagem visual do sistema/SDH. `edison.jpg` permanece reservado a avatar/retrato em elementos de interface e orientação.

- v0.2.7: caixas de diálogo da introdução exibem avatar pequeno de Edison ao lado do speaker, usando `public/edison.jpg` apenas como retrato.


## Atualização v0.2.8 (2026-09-29)

A rota de Yuki, etapas 1–6, é o primeiro conteúdo social autoral real a substituir placeholders. O NEXO privado agora suporta fotos autoradas clicáveis/lightbox e sequências fixas de mensagens do Analista/personagem sem hardcode narrativo em React. Os três assets enviados para Yuki ficam em `public/nexo/yuki/`. Os encontros das etapas 3 e 6 usam texto autoral em `content/narrative/outings.ts`; o segundo termina exatamente em “Posso entrar mesmo?”, sem continuação inventada. Edison foi corrigido para o masculino na documentação textual. Save permanece v9.


## Atualização v0.2.9 — cadência de mensagens + romance sem hardlock
- Sequências fixas no NEXO são entregues bolha por bolha, com pequena pausa/indicador de digitação; as opções só aparecem depois que a sequência corrente terminou.
- [SUPERSEDIDO em v0.2.11] O romance 0–100% permaneceu visível sem hardlock; desde v0.2.11 a porcentagem é derivada apenas das etapas concluídas e não recebe pontos 100/50/30.
- Marcos presenciais são garantidos pela progressão da rota: etapa 3 = primeira saída; etapa 6 = segundo date, respeitando apenas a regra de uma saída presencial por noite global.
- Nenhuma migração de save foi necessária; schema continua v9.


## Hotfix v0.2.10 — convite presencial preso à conversa correta
- Removido o botão genérico `MARCAR PRIMEIRA SAÍDA/SEGUNDO DATE` que podia aparecer assim que `routeStage` alcançava 3/6, mesmo antes da conversa daquela etapa.
- Dates agora só são disparados pelas escolhas autoradas que possuem `vnSceneId` + `exclusiveOutingDay` dentro da própria etapa 3/6.
- Concluir a etapa 2 nunca abre encontro nem consome a etapa 3.
- A conclusão da cena presencial continua registrando `routeAdvanceFlag` para impedir abrir a etapa seguinte na mesma noite global.
- Save schema permanece v9.

- Compatibilidade: ao carregar, v0.2.10 detecta o estado impossível de v0.2.9 em que o outing 3 do Yuki foi concluído sem nenhuma escolha `yuki:r3:*`; nesse caso restaura Yuki para a etapa 3 e remove apenas o outing prematuro, preservando o restante do save.


## Atualização v0.2.11 — percentual de romance derivado da rota

- O percentual `ROMANCE` deixou de usar XP/pontos acumulados pelas escolhas.
- O valor exibido agora é derivado somente das etapas concluídas da rota individual: `etapas principais concluídas / total de etapas principais da rota`.
- Exemplo da rota atual de Yuki (6 etapas): 0% no início, ~17% após a etapa 1, ~33% após a etapa 2, 50% após o primeiro encontro/etapa 3, ~67% após a etapa 4, ~83% após a etapa 5 e 100% após concluir a etapa 6.
- As marcações `romanceAffinity: 100 | 50 | 30` permanecem como metadado autoral e para deltas relacionais/futuras variações, mas não alteram a barra.
- `romanceProgress` e `romanceEarnedByStage` continuam no save v9 apenas para compatibilidade com saves anteriores; o motor social atual não os usa para calcular a porcentagem.
- `minRomanceProgress` fica legado/ignorado. Dates continuam vinculados ao convite autorado das etapas 3 e 6 e à exclusividade de uma saída presencial por noite.

## Atualização v0.2.12 — retrato da Elysia
- `public/heroes/elysia.jpg` foi substituído pela nova imagem fornecida pelo autor.
- Sem mudança de mecânica, narrativa ou save.

## QA de continuidade v0.2.12 (2026-09-30)

A retomada foi feita exclusivamente a partir do ZIP v0.2.12. Antes de qualquer alteração foram relidos `PROJECT_CONTEXT.md`, `EDIT_HERE.md`, `content/README.md` e todos os arquivos de `docs/failsafe/`, `docs/authoring/`, `docs/design/` e `docs/canon/`.

Auditoria estática do próximo bloco de `NEXT_SESSION.md` confirmou no código: entrega cadenciada de bolhas automáticas (620 ms, uma por vez), indicador de digitação entre bolhas, escolhas ocultas até a sequência corrente terminar, autoscroll usando somente o histórico interno, lightbox de imagem, porcentagem de romance derivada de `routeStage`, ausência de gate por `minRomanceProgress` e convites de Yuki nas etapas 3/6 disponíveis nas três afinidades 30/50/100.

QA visual/runtime em navegador continua pendente: a instalação de dependências (`npm ci`) expirou no ambiente desta sessão. Nenhuma regra, conteúdo narrativo, save schema ou asset foi alterado.


## Atualização v0.2.13 — fluxo diário e Desenvolvimento

- Dias normais não exibem mais o modal meta `Preparar expediente`: ao entrar na Central com um turno ainda não iniciado, o expediente começa automaticamente às 08:00.
- A única abertura manual preservada é o primeiro turno quando `tutorial_active` está ativo, porque faz parte do onboarding autorado de Edison.
- O fim do expediente deixa de usar o CTA flutuante no centro inferior; a transição para Desenvolvimento passa a ocupar uma faixa integrada à shell da Central.
- A tela Desenvolvimento usa os retratos oficiais já definidos em `content/characters/portraits.ts` tanto no roster quanto no painel do agente selecionado.
- Nenhum conteúdo narrativo, cânone, regra de progressão ou save schema foi alterado.


## Atualização v0.2.15 (2026-09-30)

Fluxo de DMs do NEXO refinado sem alterar conteúdo autoral: quando um turno começa com `openingOutgoing`/`prefaceOutgoing`, a mensagem do Analista não nasce no histórico; ela fica preparada no compositor e só é enviada após ação explícita do jogador. Quando o personagem inicia o turno, a mensagem recebida já aparece na lista como conversa nova e pode carregar indicador de não lida. O autoscroll passa a seguir novas bolhas apenas quando o jogador está próximo do fim (ou acabou de enviar); se ele estiver relendo mensagens antigas, a posição é preservada e aparece um atalho de novas mensagens. Flags técnicas `social:intro-outgoing-sent:*` preservam o envio inicial em reloads sem novo schema. Save permanece v9.


## Atualização v0.2.15 (2026-09-30)
- Os dois encontros autorados de Yuki agora usam backgrounds fornecidos pelo autor: cafeteria no primeiro encontro e apartamento no segundo date.
- Assets: `public/outings/yuki/date-1-cafeteria.jpg` e `public/outings/yuki/date-2-apartamento.jpg`.
- Nenhum texto, flag, regra de rota ou save foi alterado. Save schema v9.


## Atualização v0.2.16 (2026-09-30)

Direção de UX consolidada: **simplificar a superfície sem simplificar o motor**. A Central/briefing passam a priorizar informação necessária para decidir; detalhes mecânicos permanecem disponíveis em superfícies secundárias. Dispatch mobile usa navegação por painéis (Chamados / Mapa / Agentes / NEXO), briefing em tela cheia e despacho fixo ao alcance do polegar. O mapa tático passa a usar `public/maps/central-city-map.jpg`, fornecido pelo autor, com marcadores dinâmicos sobre a imagem. Save permanece v9; nenhuma fórmula de Dispatch, narrativa, rota ou conteúdo canônico foi alterado.


## Atualização v0.2.18 (2026-09-30)

O briefing troca as cinco barras separadas de requisitos por um **radar comparativo**. O contorno pontilhado representa os valores necessários do caso e a área preenchida representa a soma dos atributos da equipe selecionada. Os cinco eixos permanecem Força, Agilidade, Carisma, Inteligência e Vigor; valores e requisitos continuam visíveis e reagem imediatamente à composição. Tags, afinidade contextual e chance estimada permanecem no briefing. Esta mudança é somente de apresentação: fórmulas, balanceamento e save schema v9 não mudaram.


## Atualização v0.2.19 (2026-09-30)
O briefing desktop passa a aceitar rolagem interna quando a altura útil não comporta todo o conteúdo, preservando cabeçalho e CTA de despacho sticky e evitando corte da seleção de agentes. Em alturas menores, o radar reduz moderadamente sem mudar dados ou cálculos. O dossiê de agente agora mostra o retrato oficial acima do nome, usando `content/characters/portraits.ts` como fonte única. Save permanece v9; nenhuma mecânica, fórmula ou narrativa foi alterada.


## Atualização v0.2.20 (2026-09-30)
O radar comparativo do briefing foi compactado visualmente: o pentágono ocupa uma parcela maior da área útil e os rótulos/valores foram aproximados dos respectivos vértices, reduzindo espaço vazio sem remover informação. Em viewports desktop mais baixas, o componente também usa largura menor para liberar espaço à seleção de equipe. Mudança somente de apresentação; cálculos, requisitos, chance e save schema v9 permanecem inalterados.


## Atualização v0.2.21 (2026-09-30)

Briefing desktop reorganizado para caber na primeira viewport sem depender de rolagem interna: a seleção da equipe ocupa o espaço antes ocioso sob a narrativa, enquanto requisitos/radar permanecem na coluna direita. Em alturas reduzidas, densidade e radar compactam moderadamente. Nenhuma mecânica, fórmula ou save mudou; schema permanece v9.


## Atualização v0.2.22 (2026-09-30)

Briefing desktop usa a faixa inferior em largura total para os sete agentes, em uma única linha, aproveitando o espaço antes vazio sem ampliar o modal. Requisitos de atributos do Dispatch passam a ser quantizados em pontos inteiros após a escala diária (`Math.round`), para corresponder à natureza discreta dos atributos e evitar alvos como 4.2/5.3 que nenhum atributo/equipe pode assumir exatamente. A chance passa a usar esses mesmos alvos inteiros; esta é uma pequena alteração mecânica deliberada de legibilidade/consistência. Alertas de equipe deixam de exibir a sigla técnica `p.p.`. Save permanece v9.


## Atualização v0.2.23 (2026-09-30)

O briefing desktop deixa de ocupar um modal global sobre toda a Central: ele passa a abrir contextualizado sobre o próprio Mapa Tático, preservando Ocorrências, NEXO e principalmente a barra persistente de agentes. Durante um briefing aberto, clicar no retrato de um agente na barra inferior adiciona/remove esse agente da composição; `ABRIR FICHA` continua abrindo o dossiê. O briefing mantém descrição, risco, confiabilidade, tempo, duração, radar equipe × necessário, tags, afinidade, chance, alertas de composição e CTA de despacho, mas não duplica os sete cards no desktop. Mobile mantém seleção dentro do briefing full-screen. Save permanece v9 e nenhuma fórmula de Dispatch, conteúdo narrativo ou balanceamento foi alterado.


## v0.2.26 — consolidação técnica da Central
- `app/agencia/page.tsx` foi reduzido a orquestração de estado/fluxo; superfícies de UI vivem em `components/agency/` (`AgencyHeader`, `IncidentRail`, `TacticalMap`, `MissionBriefing`, `OperationsChatRail`, `AgentRoster`, modais e navegação mobile).
- O CSS ativo introduzido entre v0.2.16–v0.2.25 foi retirado de `app/globals.css` e centralizado em `app/agencia/agency.css`, importado após o global para preservar a cascata efetiva sem mudança visual deliberada.
- Não alterar lógica de Dispatch ao editar esses componentes: a fonte de regras continua em `game/` e `content/`.

## v0.2.27 — polish / acessibilidade / save / assets
- Central: Escape fecha briefing/dossiê/resultado/configurações; estados importantes possuem anúncio `aria-live`; foco visível foi reforçado e controles touch principais têm alvo mínimo maior; `prefers-reduced-motion` reduz animações/transições.
- Roster: seleção expõe `aria-pressed`; agente indisponível não pode ser selecionado durante briefing, mas `ABRIR FICHA` continua acessível.
- Configurações: `EXPORTAR SAVE` baixa JSON legível; `IMPORTAR SAVE` valida/migra o arquivo antes de substituir o save local. Schema permanece v9.
- Outings: `OutingScene` aceita `backgroundPositionDesktop` e `backgroundPositionMobile`; Yuki usa crop específico por viewport sem criar tela por personagem.
- Assets pesados em uso foram convertidos para WebP e referências atualizadas (Yuki, mapa, backgrounds da Agência e dois outings de Yuki). Não houve mudança narrativa.


## Hotfix v0.2.28 — briefing contextual após decomposição
- Corrigida regressão visual introduzida pela decomposição da Central: `MissionBriefing` agora é filho de `TacticalMap`, portanto o overlay desktop precisa ser `position:absolute` dentro de `.mapStageWorkspace`.
- O briefing volta a ocupar somente a área do mapa, por cima da cidade, sem criar coluna/linha implícita que comprimia a imagem e deslocava o conteúdo.
- Nenhuma mecânica, conteúdo, balanceamento ou save foi alterado; schema permanece v9.

## v0.2.29 — Desenvolvimento first-view desktop

A tela `/desenvolvimento` foi compactada e redistribuída no desktop para priorizar uma primeira viewport completa, sem remover informação e sem alterar progressão. O cabeçalho, roster e identidade usam menos altura; radar e progressão continuam lado a lado; escolha pendente e técnicas desbloqueadas passam a compartilhar a faixa inferior em duas colunas. Em desktops de pouca altura existe uma compactação adicional. Mobile <=900 px preserva o fluxo responsivo anterior. Save schema permanece v9.


## Atualização v0.2.31 (2026-09-30)

Desenvolvimento foi reorganizado como workbench: em níveis 3/5 a escolha de atributo acontece ao lado do radar com preview +/− e confirmação explícita; a progressão, escolhas de técnica/evolução e técnicas desbloqueadas ficam concentradas na coluna direita. O objetivo é aproveitar a primeira viewport sem a faixa inferior quebrada da v0.2.29. Nenhuma regra de XP, thresholds, atributos, técnicas, Maestria ou save mudou. Save schema v9.


## Atualização v0.2.33 — rota autorada da Elysia
- Elysia substitui PLACEHOLDER por autoria final nas etapas 1–6.
- A rota segue a cadência aprovada tímida → confortável → desinibida: apresentação, conversa nerd sobre poderes, museu, flerte crescente, mensagem apagada e convite para casa.
- Etapa 3 abre o Date 1 no Museu de História; etapa 6 abre o Date 2 na casa de Elysia. Ambos são cenas lineares em `/encontro`, sem escolhas internas.
- Três fotos autoradas foram integradas ao NEXO em `public/nexo/elysia/`.
- `DialogueMessage` ganhou exclusão visual opcional data-driven (`deleteAfterMs`/`deletedText`): durante a entrega ao vivo a mensagem permanece legível por um curto intervalo e então vira “Mensagem excluída”; no histórico concluído ela permanece excluída.
- Save schema permanece v9.


## Atualização v0.2.34 — backgrounds dos dates da Elysia
Os Dates 1 e 2 da Elysia usam backgrounds autorais próprios (Museu de História e casa), armazenados em `public/outings/elysia/` em WebP. Nenhuma regra narrativa/mecânica ou save foi alterada.


## Atualização v0.2.35 — hotfix de validação da rota Elysia
- Corrigido `elysia:r4:t3`: o turno do livro volta a respeitar a regra editorial de exatamente 3 respostas do Analista.
- Nenhuma mudança de progressão, dates, save ou mecânicas.


## Atualização v0.2.36 — convites de encontro persistentes

- Finalizar o chat autorado que oferece um date não reserva mais automaticamente a noite nem abre `/encontro`.
- Após a última mensagem, o NEXO exibe um CTA persistente `IR PARA ENCONTRO`; a última mensagem continua visível no histórico.
- O jogador pode encerrar a noite sem aceitar. O convite permanece disponível em noites futuras enquanto o marco presencial não tiver sido concluído.
- Se outra pessoa já ocupou a saída presencial daquela noite global, o chat continua normalmente e o CTA fica temporariamente indisponível, voltando a ficar utilizável no dia seguinte.
- A rota daquele personagem permanece estacionada no estágio 3/6 até o date ser concluído; somente então `routeStage` avança.
- Não há mudança de save schema; o estado é derivado das flags da escolha final + `outingMilestones`/`outingsByGlobalDay`. Save permanece v9.

## Atualização v0.2.37 — Yuki no padrão conversacional da Elysia

- A rota autorada de Yuki preserva os acontecimentos, voz, fotos e dates existentes, mas redistribui mensagens automáticas do Analista em mais turnos com 3 respostas.
- O objetivo é manter o mesmo padrão interativo consolidado pela Elysia: beats curtos, opção neutra/casual e escalada de intimidade sem transformar a voz de Yuki.
- Convites das etapas 3/6 continuam usando o CTA persistente `IR PARA ENCONTRO`; dates e save schema v9 não mudam.


## Atualização v0.2.38 (2026-09-30)

Menu principal redesenhado com a imagem autoral de cidade noturna em tela cheia. A interface usa uma camada de fade escuro horizontal contínuo sobre a imagem para garantir leitura do logo e das ações sem esconder completamente a cidade. `CONTINUAR` permanece visível e desabilitado quando não há save; `NOVO JOGO` e `CONTA / ACESSO` preservam os fluxos atuais. O asset vive em `public/menu/cidade-noturna.webp`. Save permanece v9.


## Atualização v0.2.40 (2026-09-30)

Menu principal passa a concentrar o fluxo de entrada: CONTINUAR, NOVO JOGO, CARREGAR JOGO, CONTA / ACESSO e CONFIGURAÇÕES em painéis sobre a cidade noturna. Conta continua preparada para backend futuro: a build local não armazena senha; sessão guest/preview guarda apenas metadados não sensíveis. CARREGAR integra slot local e import/export JSON. Configurações persistem redução de movimento e velocidade das mensagens do NEXO. Transições do menu usam fade/curtain e respeitam redução de movimento. `SALVAR E SAIR` grava o save e retorna ao menu principal na Central, Desenvolvimento e NEXO. Save schema permanece v9.


## Atualização v0.2.42 (2026-09-30)

Rota autorada de Lysandro implementada nas etapas 1–6, substituindo os placeholders principais. O fluxo segue o padrão consolidado do NEXO: beats curtos, três respostas do Analista por turno, convites persistentes nas etapas 3 e 6 e dates lineares. Três fotos autoradas foram integradas aos chats (milkshake no estágio 2, espelho no estágio 4 e foto antes do Date 2 no estágio 6). Os dates usam o texto fornecido pelo autor; backgrounds específicos ainda não foram fornecidos, então mantêm fallback visual existente. Save schema permanece v9.


## Atualização v0.2.43 (2026-09-30)

Mídia autoral de Lysandro atualizada: as três fotos do NEXO foram substituídas pelos arquivos mais recentes do autor e os dois dates agora usam backgrounds específicos (Bar do Becos no Date 1 e restaurante no Date 2). Falas, escolhas, progressão e save não foram alterados. Save schema permanece v9.


## Atualização v0.2.44 (2026-09-30)
- Date 2 de Lysandro agora possui dois beats lineares de apresentação: restaurante e casa.
- A transição para o trecho “Voltando para casa...” troca o background para `public/outings/lysandro/date-2-casa.webp`.
- O texto autoral e a progressão permanecem inalterados; save schema v9.


## Atualização v0.2.45 (2026-10-01)

- Retomada feita exclusivamente a partir do ZIP fornecido nesta sessão; `package.json` interno confirmou v0.2.44 como versão de origem, save schema v9.
- QA estático do Date 2 de Lysandro confirmou dois beats lineares: restaurante primeiro e casa depois, com `date-2-casa.webp` somente no segundo beat.
- O botão do primeiro beat apenas incrementa o beat ativo; `finishScene()` fica restrito ao último beat, portanto o encontro não é concluído na transição restaurante → casa.
- O texto autoral permanece inalterado e termina em “fechando a porta.”; nenhuma continuação narrativa foi criada.
- QA runtime/browser continua pendente porque `npm ci` expirou no ambiente; nenhum reset de save foi usado.
- Save schema permanece v9; nenhuma mecânica, cânone ou conteúdo narrativo foi alterado.


## Atualização v0.2.46 (2026-10-01)

- `NOVO JOGO` agora oferece dois modos: **Campanha completa** e **Só pós-expediente**.
- O modo `Só pós-expediente` reutiliza o mesmo save schema v9 e as mesmas rotas sociais; é identificado pela flag `mode:post-shift-only`.
- Nesse modo, o save começa diretamente no NEXO pós-expediente, sem onboarding, Central ou Desenvolvimento.
- `PRÓXIMA NOITE` avança o dia global e retorna ao NEXO, preservando a regra de no máximo uma etapa de rota por personagem por noite e uma saída presencial por noite.
- Acesso manual a `/introducao`, `/agencia` ou `/desenvolvimento` redireciona de volta para `/conversa` quando o modo social-only está ativo.
- Linhas contextuais dependentes do expediente (`contextLines`) ficam ocultas nesse modo para não afirmar operações que não ocorreram.
- Campanha completa continua sendo o padrão e não teve regras alteradas. Save schema permanece v9.


## Atualização v0.2.47 (2026-10-01)
- Rota autoral D1–D6 de Demétria integrada ao NEXO, com três respostas por turno e dates lineares nos marcos 3/6.
- Cinco mídias autorais de Demétria integradas: três fotos de chat e dois fundos de date.
- Save schema permanece v9.


## Atualização v0.2.49 (2026-10-01)

- Hotfix do modo **Só pós-expediente**: o avanço entre noites atualiza o save persistido e o estado local de `/conversa`, evitando o travamento causado por navegação para a mesma rota.
- `PRÓXIMA NOITE` agora abre confirmação com **Ir para próximo dia** e **Voltar**.
- Nenhuma alteração de cânone, rotas sociais ou save schema (permanece v9).


## Atualização v0.2.49 (2026-10-01)
- Fotos da Demétria atualizadas: Dia 4/academia e Dia 6/convite do Date 2.
- Sem mudanças de diálogo, lógica ou save schema (v9).


## Atualização v0.2.51 (2026-10-01)

Sistema de Dates recebeu leitor linear paginado sem escolhas: cenas longas são divididas apenas para leitura, preservando integralmente a ordem e o texto autoral. A tela exibe DATE 1/DATE 2, progresso da cena, transições entre páginas/beats, retoma a página atual dentro da mesma noite via sessionStorage e impede reabrir manualmente um encontro já concluído. Save permanece schema v9; nenhum conteúdo narrativo foi alterado.


## Atualização v0.2.52 (2026-10-01)

Pacote de polimento social/NEXO sem alteração de conteúdo narrativo: biblioteca de fotos desbloqueadas, arquivo oficial de Dates concluídos com replay sem mutação de save, estados persistentes de leitura no NEXO, contador de novidades, transição NEXO→Date, cartão de abertura do Date, navegação anterior/seguinte por páginas e suporte a teclado. Foi criado `content/social/routeManifest.ts` para padronizar a estrutura D1–D6 + Dates 3/6 e `content/validate.ts` agora valida essa estrutura. Nova rota interna `/qa/social` permite selecionar noite/etapa/personagem, abrir chat, visualizar Date em QA preview, inspecionar flags e limpar apenas progresso social. Save permanece schema v9. Adaptador de pronomes, reescrita dos grupos e hipótese de fechamento social continuam no backlog pós-conversas.


## Atualização v0.2.53 (2026-10-01)
Hotfix visual do NEXO: a introdução das abas Conversas/Fotos/Dates havia criado um sexto filho no grid lateral sem adicionar a sexta linha correspondente. As abas ocupavam indevidamente a linha flexível da lista de contatos. O grid agora reserva uma linha compacta própria para a navegação e a lista volta a preencher o espaço restante. Nenhuma regra social, conversa, Date ou save foi alterado. Save permanece v9.


## Atualização v0.2.55 (2026-10-01)

NEXO recebeu revisão de lista e autoscroll: contatos passam a ser ordenados pela atividade mais recente; o preview usa a mensagem mais recente realmente disponível/alcançada, distingue mensagens do Analista com `Você:` e padroniza truncamento/estado visual. O autoscroll agora usa limiar responsivo, acompanha mutações e mudanças de altura do compositor apenas quando o jogador está perto do fim, e mantém o botão de retorno às mensagens recentes acima do compositor dinâmico. Save permanece v9.


## Atualização v0.2.56 (2026-10-01)

Pacote de robustez social: validação editorial reforçada para flags/IDs/mídia/convites de Date, verificação de assets sociais em `npm run validate:social-assets`, normalização conservadora de saves v9 parciais e reparo de inconsistências entre milestones/flags de Date. `/qa/social` ganhou simulação de lido/não lido, atalhos D1–D6 + abrir, manipulação controlada de Date e diagnóstico/reload/reparo. Save permanece schema v9.


## Atualização v0.2.57 (2026-10-01)

- Hotfix do gatilho de Dates: concluir a última mensagem ou desbloquear um convite não autoriza mais abrir `/encontro`.
- O Date normal recebe uma autorização efêmera de `sessionStorage` somente quando o jogador pressiona explicitamente `IR PARA ENCONTRO` no NEXO.
- `/encontro` valida essa autorização antes de mostrar a abertura presencial; acesso antecipado retorna ao NEXO.
- Reload durante um Date já iniciado continua permitido; sair voluntariamente para o NEXO remove a autorização e exige novo clique no CTA para reentrar.
- Replay e QA preview continuam read-only e não usam esse gate. Save schema permanece v9; nenhum texto narrativo foi alterado.


## Atualização v0.2.58 (2026-10-01)
- Corrigido o gate de entrada em Dates introduzido na v0.2.57: `IR PARA ENCONTRO` não depende mais de `sessionStorage` para autorizar a mudança de rota.
- O CTA agora navega explicitamente com `?launch=1`; `/encontro` exige esse parâmetro em cenas normais e continua validando `outingsByGlobalDay` antes de renderizar.
- A última mensagem continua legível e nenhum Date abre automaticamente; replay/QA permanecem independentes do gate.
- Save schema permanece v9 e nenhum conteúdo narrativo foi alterado.

## Atualização autoral — Hélio (2026-10-02)
- Para Hélio, usar o mesmo padrão textual aprovado a partir da rota Demétria: opção 1 preserva literalmente a fala-base fornecida; opções 2/3 são apenas variações do Analista, sem alterar acontecimentos.
- Não normalizar ortografia/pontuação das falas-base ou dos Dates sem pedido explícito do autor.
- Dates de Hélio permanecem lineares e sem opções; segmentação em parágrafos é apenas de apresentação.
- Versão atual permanece 0.2.58; save schema v9.


## Atualização autoral v0.2.58 — Alexandra (2026-10-05)
- `content/dialogues/post-shift/alexandra.ts`: rota D1–D6 autorada com três opções por turno.
- `content/narrative/outings.ts`: Dates de Alexandra nos marcos 3 e 6 substituem os placeholders.
- Mídias: `public/nexo/alexandra/` (3 fotos) e `public/outings/alexandra/` (2 backgrounds).
- Alexandra está `authored: true`; versão 0.2.58 e save schema v9 permanecem inalterados.


## Atualização v0.2.59 — identidade textual do jogador (2026-10-06)
- Novo Jogo coleta nome + pronomes: Ele/dele, Ela/dela ou Elu/delu.
- Save schema v10 persiste `player.pronouns`; saves v9 migram para Ele/dele para preservar o comportamento histórico.
- `lib/playerText.ts` centraliza nome, pronomes e flexões excepcionais. Conteúdo deve priorizar neutralidade e preservar “Analista” quando for cargo.
- NEXO e Dates usam a mesma interpolação; não duplicar lógica em componentes.


## Correção autoral Elysia/Yuki — 2026-10-06
- Os DOCX reenviados nesta data são a única fonte válida para Elysia/Yuki.
- Elysia tem 21 anos; o registro anterior de 19 anos foi superseded pela correção autoral.
- Não transformar falas fixas do Analista em alternativas; só há escolha quando o DOCX declara alternativas/escolhas.

## v0.3.0-beta.17 — logout nas configurações (2026-10-06)
- A engrenagem da Central agora oferece `SAIR DA CONTA` separado de `SALVAR E SAIR`.
- Logout preserva o save local, encerra a sessão Supabase e retorna ao painel de autenticação.
- Save schema permanece v10; nenhuma regra de gameplay/narrativa foi alterada.

## Beta 1 · v0.3.0-beta.25 — NEXO mobile sem sobreposicoes (2026-10-06)
- Conversa mobile usa uma unica superficie de acao por regiao.
- `PROXIMA NOITE`/`ENCERRAR NOITE` nao ocupa o cabecalho de uma conversa; a acao continua na lista do NEXO.
- Manual nao flutua sobre respostas/composer durante conversa ativa; permanece acessivel ao voltar para a lista.
- Composer redundante fica oculto ate uma resposta ser selecionada; depois aparece apenas a confirmacao/envio.
- Configuracoes continuam acessiveis pela engrenagem no topo direito.
- Save schema v10 e logica social inalterados.
