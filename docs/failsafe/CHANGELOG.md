# Changelog

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
