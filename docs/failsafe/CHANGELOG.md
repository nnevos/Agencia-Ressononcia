
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
