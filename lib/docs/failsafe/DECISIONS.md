# Registro de decisões ativas

## D-001 — Plataforma web
Next.js/React/TypeScript continuam como plataforma do protótipo.

## D-002 — Protagonista
O jogador é o Analista de Despacho, nome escolhido pelo jogador.

## D-003 — Romance
Todos os sete heróis podem ter romance opcional com o Analista.

## D-004 — Relações multidimensionais
Confiança, respeito, intimidade, tensão, atração e flags; não usar barra única de amor.

## D-005 — Dispatch e narrativa são causalmente ligados
Operações geram cenas/consequências; relações podem alterar campo.

## D-006 — Expediente contínuo
08:00–18:00 em 15 min reais no protótipo.

## D-007 — Despacho assíncrono
Herói fica indisponível durante a missão; resultados chegam depois.

## D-008 — Escassez deliberada
Não deve ser possível responder a tudo com a equipe ideal.

## D-009 — Feedback qualitativo
Não mostrar porcentagem de sucesso antes do despacho.

## D-010 — UI por divulgação progressiva
Mapa monitora; briefing decide; ficha analisa herói.

## D-011 — Cinco atributos pessoais
Substitui os 8 atributos antigos. Força, Agilidade, Carisma, Inteligência, Vigor; escala 1–5.

## D-012 — Base 1 + 4 pontos iniciais
Todos começam com 1 em cada atributo e quatro pontos extras distribuídos de modo único por personagem.

## D-013 — Poder não é atributo
Potência elemental e aplicações especiais vivem em poder/técnicas/tags, não são convertidas diretamente em FOR/INT/etc.

## D-014 — Progressão 1–6
Nv1 base; Nv2 técnica; Nv3 +1 atributo; Nv4 técnica/especialização; Nv5 +1 atributo; Nv6 evolução de poder.

## D-015 — Development gate diário
XP é ganho desde o primeiro expediente. Ao fim de cada expediente, após os relatórios e antes do pós-expediente, o jogador passa pela tela Desenvolvimento da Equipe e resolve upgrades pendentes. O próximo dia começa com essas melhorias aplicadas.

## D-016 — Level up fora da missão
XP é ganho em campo desde o Dia 1, mas upgrades são processados somente após o encerramento do expediente, antes do pós-expediente.

## D-017 — Técnicas abrem repertório
Técnicas devem preferencialmente liberar novas soluções/tags, não apenas +X%.


## D-018 — Sistema visual único
Toda a aplicação usa a linguagem visual da Central: fundo azul-preto, painéis azul-escuros, linhas frias e ciano como destaque principal. Telas claras/bege não fazem parte da direção final.

## D-019 — Central map-first
O mapa é a superfície dominante. Ocorrências são representadas por marcadores clicáveis no mapa e abrem briefing contextual.

## D-020 — Roster inferior permanente
Os sete heróis ficam numa faixa inferior permanente durante o expediente. A faixa comunica retrato, nome, estado e acesso INFO, sem despejar atributos na superfície principal.

## D-021 — Cor é semântica
Ciano = seleção/informação operacional; verde = disponível/positivo; laranja = atenção/P2; vermelho = urgência/P1/perigo. Evitar cores fortes sem função.

## UI v0.9.1 — decisão após playtest visual

- O layout da Central usa zonas verticais independentes (header, resumo, mapa, agentes, comando), evitando cálculos que possam sobrepor elementos.
- Camadas decorativas do mapa nunca podem capturar eventos de ponteiro.
- Marcadores de ocorrência têm hitbox grande, z-index explícito e abrem Briefing diretamente.
- Situação Operacional é contextual/flutuante e não deve reduzir a altura dos cards dos heróis.
- Em telas menores, preferir scroll horizontal do roster a comprimir os sete cards até ficarem ilegíveis.


## UI v0.9.2 — seleção contextual de equipe

- Clicar num herói na Central, sem briefing ativo, abre sua ficha.
- Selecionar para equipe só é permitido dentro de um briefing de ocorrência `waiting`.
- A composição é temporária e deve ser limpa ao fechar ou trocar de briefing.
- O fato de a Central manter um chamado em foco para contexto NÃO significa que o jogador está montando uma equipe.
- Indicadores de equipe não devem aparecer fora do contexto de briefing/despacho.

### D-012 — Chance de sucesso visível e probabilística (v0.9.4)
SUPERSEDES a regra anterior que proibia porcentagem explícita antes do despacho.
O briefing pode mostrar uma estimativa percentual de sucesso. Ela nunca é garantia: o resultado usa rolagem probabilística e mantém risco residual mesmo acima da faixa recomendada. Requisitos de atributo são referências graduais, não travas binárias.

### D-022 — Moldura central e espaço negativo lateral
**Decisão:** em desktop, mapa e faixa de agentes não devem ocupar toda a largura da viewport. Ambos usam a mesma largura máxima centralizada, deixando corredores laterais visíveis. O espaço negativo é parte da identidade da Central e não deve ser removido em futuras refatorações; em telas menores ele pode ser reduzido responsivamente.

## Comunicação — decisão aprovada v0.9.6
- NEXO é o app fictício de comunicação da Agência.
- Durante o expediente o Analista é somente leitura; sua agência acontece pelo despacho.
- Fora do expediente, DMs no NEXO são o formato social padrão e permitem respostas.
- Cenas presenciais/VN são especiais, não o formato padrão de toda conversa.

## D-019 — Central usa a viewport inteira em 20/60/20
**Status:** ativa — v0.9.7

No expediente em desktop, a Central não usa moldura estreita/max-width. O workspace ocupa a largura útil da viewport e divide-se em aproximadamente 20% para Ocorrências, 60% para Mapa + Agentes e 20% para NEXO. Espaço negativo deve existir dentro dos painéis, não como corredores laterais gigantes que comprimem a interface.


## D-023 — Resultado integrado à fila operacional (v0.9.8)
Missões concluídas não abrem uma aba global de relatórios. O card da ocorrência fica verde como `RESULTADO DISPONÍVEL`; clicar abre o relatório contextual. Somente ao arquivar o resultado a ocorrência sai da fila e os agentes recebem/aplicam consequências e voltam ao estado disponível/recuperação.

## D-024 — Um único relógio + Configurações no header (v0.9.8)
O relógio central 08:00–18:00 é a única referência temporal visível durante o expediente. O canto superior direito concentra Configurações, incluindo identidade do Analista, salvar, reiniciar expediente e salvar/sair.

## D-025 — Roster inferior é retrato, não painel de status (v0.9.8)
Na Central, o roster serve para reconhecer e consultar agentes rapidamente. Nome, poder, nível e o texto `DISPONÍVEL` não são repetidos. Quando um agente está indisponível, o retrato é escurecido e recebe overlay `EM CAMPO` ou `RECUPERAÇÃO`; clicar continua abrindo a ficha.

## D-025 — Retratos oficiais quadrados
Os sete retratos enviados pelo autor passam a ser assets oficiais de interface. Na Central, Briefing, NEXO e mini-equipes, os avatares usam formato quadrado com `object-fit: cover`; iniciais ficam apenas como fallback técnico. Estados de indisponibilidade são overlays sobre a imagem.


### D-UI — Prioridade interna sem sigla visível
P1/P2/P3 permanecem no modelo de incidentes para regras e balanceamento, mas não são mostrados ao jogador. A interface comunica urgência por cor, tempo restante, risco e contexto.

## D-020 — Vida e Energia substituem fadiga/estresse/ferimento categórico
**Decisão (SUPERSEDED por D-026):** condição operacional visível usava Vida 0–100 e Energia 0–100. A partir da v0.9.13, usar a escala curta definida em D-026.
**Motivo:** leitura imediata no roster/dossiê e decisões de risco mais claras.

## D-021 — Resultado gera desgaste probabilístico persistente
**Decisão:** Sucesso, Sucesso com custo, Sucesso parcial e Falha têm custos crescentes de Vida/Energia; risco da ocorrência e exaustão podem ampliar dano.

## D-026 — Escala curta de condição (v0.9.13)
Vida máxima é 9 + Vigor e Energia máxima é 9 + Agilidade. Custos por resultado são fixos e legíveis. Chegar a 0 em qualquer barra causa DESMAIADO até o próximo dia; o despacho só é bloqueado nesse estado, não por condição baixa acima de zero.

## D-027 — `content/` é a fonte oficial de autoria (v0.1.0)
Personagens, ocorrências, falas, opções do jogador, tutorial, introdução, textos de menu e balanceamento ficam em `content/`. Motores em `game/` não devem acumular texto autoral.

## D-028 — Pós-expediente não força conversa única (v0.1.0)
O jogador pode conversar com qualquer personagem que tenha cena disponível, com vários personagens ou encerrar a noite sem conversar com ninguém. Uma DM concluída retorna ao hub em vez de avançar automaticamente o dia.

## D-029 — Introdução/tutorial são conteúdo data-driven (v0.1.0)
Textos iniciais vivem em `content/narrative/`. `Coordenação` é placeholder editorial até a chefia da Agência ser definida na AU.

## D-030 — Novo baseline de versionamento (v0.1.0 Foundation)
A linha funcional v0.9.14 foi consolidada/refatorada como novo baseline v0.1.0. O antigo snapshot `ressonancia-fase1-0.1.1` permanece obsoleto e não deve ser usado, apesar da numeração histórica semelhante.

## D-031 — Pós-expediente usa NEXO multi-chat persistente (v0.1.1)
**Status:** ativa.

O pós-expediente deve se comportar como um mensageiro: lista de contatos e conversa ativa coexistem no desktop; no mobile, navega-se entre lista e chat. Abrir uma conversa não força seu término antes de visitar outra. Conversas já respondidas continuam visíveis como histórico na mesma noite. O compositor nunca gera fala livre: ele só envia opções explicitamente autoradas em `content/dialogues/post-shift/`, preservando D-027 e a autoridade narrativa do autor.

## D-029 — Progresso romântico explícito por personagem (v0.1.2)
**SUPERSEDE parcialmente D-004.** Relações continuam multidimensionais (confiança, respeito, intimidade, tensão e atração), mas a rota romântica também possui progresso explícito de `0–100%` por personagem. Esse percentual não substitui os demais eixos; serve para marcos de campanha e elegibilidade de encontros.

## D-030 — Três respostas com peso romântico 100/50/30
Cada turno pós-expediente oferece três respostas autoradas. Elas podem ser marcadas com `romanceAffinity: 100 | 50 | 30`, representando encaixe romântico alto, médio e baixo. O valor é determinístico e não é chance/RNG.

## D-031 — Marcos românticos dos Dias 3 e 6
**SUPERSEDIDO por D-050 (v0.2.9).** Historicamente, esta decisão exigia 35%/75%; esses thresholds não são mais gates ativos.
- Conversar com os demais continua permitido.
- O jogador pode não desenvolver romance com ninguém e terminar a campanha sem par.

## D-032 — Cadência romântica é direcional, não uniforme
A referência de seis dias é: D1 conhecer/backstory; D2 conversa cotidiana/humor; D3 possível saída; D4 repercussão/início de flerte; D5 flerte forte; D6 possível date. Personagens podem acelerar ou atrasar essa cadência conforme personalidade, flags e relação. Não forçar o mesmo ritmo narrativo a todos.

## D-033 — NEXO guarda histórico contínuo por personagem
Um contato representa um histórico persistente através de vários dias/cenas. Cenas podem ter múltiplos turnos autorados (`followUps`). O histórico autoscrolla ao abrir e quando chega uma mensagem nova, mas continua rolável para leitura de mensagens antigas.

## D-034 — Escalada diária do Dispatch
O Dia 1 deve comportar mais soluções solo; a exigência cresce diariamente e o Dia 6 deve valorizar duplas/trios, Ressonância e combos. A curva atual usa multiplicadores de requisito por dia configuráveis em `content/config/balance.ts`.

## D-045 — Edison substitui Coordenação no onboarding (v0.2.3)
**SUPERSEDE a decisão antiga de placeholder da chefia para a abertura.** Edison é [AU-APROVADO] como supervisor que recebe o Despachante, apresenta os Guerreiros Elementais/NEXO e acompanha o primeiro despacho. Aparência e histórico pessoal além dessa função permanecem [A DEFINIR].

## D-046 — Primeiro despacho guiado e pulável
Novo jogo passa por onboarding autorado, mas `PULAR TUTORIAL` deve sempre permitir entrada direta no Dispatch normal. Quando ativo, E-04 + Hélio formam o único caso rigidamente guiado; o resultado é Sucesso controlado com custo normal, e o restante do Dia 1 fica livre após arquivar o relatório.

## D-047 — Menu reserva área para key art
A navegação principal fica concentrada à esquerda. A área direita do menu é intencionalmente livre para futura imagem/background, sem depender dessa arte para legibilidade ou navegação.

## D-048 — Mídia autorada no NEXO privado (v0.2.8)
Fotos em DMs são conteúdo autoral. O motor aceita imagem + alt text em turnos do NEXO e permite ampliação em lightbox. Assets vivem em `public/` e referências vivem em `content/`; componentes não conhecem personagem específico.

## D-049 — Yuki é a primeira rota social final (v0.2.8)
Os estágios 1–6 de Yuki deixam de ser placeholder e passam a usar o roteiro autoral aprovado. A rota mantém o modelo slow burn de experiências → amizade → romance. Os marcos presenciais continuam nas etapas 3 e 6 e a narração do jogador evita gênero gramatical sempre que possível.


## D-050 — Romance não bloqueia o arco principal (v0.2.9)
**SUPERSEDE D-031 e qualquer regra ativa de threshold obrigatório para encontros.**
O percentual 0–100% permanece como feedback de afinidade e como dado disponível para variações narrativas futuras. As escolhas continuam com `romanceAffinity` 100/50/30 e continuam alterando relações. Porém, chegar ao marco da rota é suficiente para o conteúdo principal: etapa 3 libera a primeira saída e etapa 6 libera o segundo date. A única exclusividade preservada é no máximo uma saída presencial por noite global.

## D-051 — NEXO entrega sequências automáticas uma bolha por vez (v0.2.9)
Mensagens fixas (`prefaceOutgoing`, `afterIncoming`, resposta do personagem e `afterResponse`) não devem surgir todas no mesmo frame. Durante a conversa ativa, o NEXO revela cada bolha em sequência com pequena pausa/indicador de digitação e só libera as três escolhas quando a sequência anterior terminou. Histórico já concluído pode ser exibido integralmente ao reabrir a thread.


### v0.2.10 — dates não são inferidos pela porcentagem nem pelo stage isolado
A porcentagem romântica é indicativa. A etapa define quando o conteúdo pode existir, mas o gatilho do encontro é narrativo: uma escolha explícita dentro da conversa autorada da etapa 3/6. Não haverá CTA genérico criado apenas porque `routeStage >= 3/6`.


## D-052 — Percentual de romance é progresso de rota, não XP (v0.2.11)

O indicador `ROMANCE` deixa de acumular pontos por resposta. A porcentagem exibida é calculada exclusivamente pelo avanço estrutural da rota individual: quantidade de etapas principais concluídas dividida pelo total de etapas principais da rota até o segundo date. Pesos `romanceAffinity: 100 | 50 | 30` continuam disponíveis como metadado de tom/afinidade e podem acompanhar deltas de confiança, intimidade, atração, tensão e respeito, mas não alteram o percentual. Campos legados de pontos permanecem no save v9 somente para compatibilidade. `minRomanceProgress` não é gate ativo.


## D-053 — Turnos recorrentes começam sem modal meta; Desenvolvimento é transição integrada (v0.2.13)
**Status:** ativa.

Depois do onboarding, entrar na Central com o expediente do dia ainda em `not_started` inicia o turno automaticamente às 08:00. O modal manual de abertura fica restrito ao primeiro turno com `tutorial_active`, onde faz parte da orientação autorada de Edison. No encerramento, a passagem para Desenvolvimento deve ser apresentada como estado da própria Central, não como popup flutuante sobre o workspace. A tela Desenvolvimento usa os retratos oficiais já registrados pelo projeto; iniciais permanecem apenas como fallback técnico.


## D-054 — A iniciativa autoral da DM exige ação coerente do remetente (v0.2.14)
**Status:** ativa.

Quando um turno autorado começa por `openingOutgoing` ou `prefaceOutgoing`, o Analista é quem inicia a troca. Essa fala deve permanecer preparada no compositor até o jogador apertar Enviar; a UI não pode criar a bolha e a resposta do personagem automaticamente ao abrir o chat. Quando o turno começa por `opening`/`incoming`, a mensagem pertence ao personagem e pode existir como recebida/não lida antes de abrir a thread. O scroll deve acompanhar o fim apenas enquanto o jogador estiver acompanhando mensagens recentes; releitura de histórico não pode ser interrompida por autoscroll forçado.


## v0.2.18 — requisito visual no briefing
- O feedback de atributos continua sendo informação de primeira camada porque participa diretamente da decisão de despacho.
- A representação preferida passa a ser um radar comparativo único: `EQUIPE` versus `NECESSÁRIO`, em vez de cinco barras independentes.
- Simplificação de UI deve reduzir texto/repetição, não esconder a relação entre composição e necessidade do caso.


## v0.2.19 — briefing pode rolar; retrato pertence à identidade do dossiê
- O briefing desktop não deve cortar cards para tentar caber rigidamente na viewport. Quando necessário, usa rolagem interna com cabeçalho e ação de despacho sticky.
- O dossiê reutiliza o retrato oficial do agente acima do nome; não cria assets paralelos nem altera dados de personagem.


## v0.2.20 — densidade visual do radar
- O radar deve usar a área disponível de forma eficiente: labels pertencem visualmente aos vértices e não devem ficar isolados por grandes vazios.
- Compactação deve ocorrer aproximando elementos e reduzindo espaço morto, sem esconder os cinco atributos nem o requisito do caso.


## v0.2.21 — redistribuir espaço antes de recorrer a scroll no briefing
- **SUPERSEDE a regra de v0.2.19 para desktop comum.** O briefing não deve usar rolagem interna como primeira solução quando existe espaço ocioso em outra coluna.
- Narrativa/contexto ficam no alto à esquerda; seleção da equipe ocupa a área abaixo; radar e requisitos usam a coluna direita; o CTA permanece no rodapé.
- A meta é permitir leitura de situação + necessidade + composição + ação na primeira viewport.
- Compactação responsiva pode reduzir espaçamento e tamanho visual em alturas menores, mas não deve esconder indicadores mecânicos essenciais.


## v0.2.22 — requisitos discretos e faixa total de agentes
- Como os atributos e a soma da equipe são inteiros, a exigência exibida/calculada também deve ser inteira. A escala diária continua existindo, mas seu resultado é arredondado para o ponto inteiro mais próximo antes da avaliação.
- O briefing desktop deve usar a largura total disponível para o roster quando isso evita espaço morto; sete agentes em uma faixa horizontal têm prioridade sobre empilhar cards numa única coluna do layout.
- Jargão de matemática interna, como `p.p.`, não deve aparecer nos alertas rápidos da UI.


## D-058 — Briefing é contextual ao mapa; roster persistente seleciona equipe (v0.2.23)
**Status:** ativa.

No desktop, abrir uma ocorrência não deve cobrir toda a Central nem duplicar o roster. O briefing aparece sobre o canal do Mapa Tático. A barra inferior de agentes permanece visível e é a superfície principal de seleção da equipe: retrato seleciona/remove durante um briefing; `ABRIR FICHA` abre o dossiê. Ocorrências e NEXO continuam visíveis. O briefing mantém todas as informações decisórias e o CTA. No mobile, onde a barra não permanece simultaneamente acessível, os cards internos do briefing continuam válidos.


## D-059 — Tipografia de decisão deve permanecer legível no briefing contextual (v0.2.24)
Textos de situação, requisitos, explicações e composição não devem ser comprimidos a ponto de exigir esforço de leitura apenas para preservar espaço vazio. A compactação visual deve preservar uma escala tipográfica confortável.


## D-060 — Legibilidade tipográfica vale para toda a Central desktop (v0.2.25)
- Não tratar microtexto ilegível como problema exclusivo do briefing.
- Aumentar tipografia funcional da fila, status, roster, NEXO e briefing sem ampliar o radar.
- Preservar hierarquia: texto secundário pode ser menor, mas não a ponto de exigir esforço para leitura normal.


## D-061 — Central deve ser composta por superfícies, não por uma página monolítica (v0.2.26)
**Status:** ativa.

`app/agencia/page.tsx` é orquestrador de estado/fluxo. Fila, mapa, briefing, NEXO operacional, roster, cabeçalho e modais devem permanecer em componentes de `components/agency/`. Refatoração estrutural não autoriza mover regras de jogo para componentes nem hardcodar conteúdo narrativo.

## D-062 — Polish não muda regra; acessibilidade e portabilidade do save são infraestrutura (v0.2.27)
**Status:** ativa.

Acessibilidade deve melhorar leitura, foco, navegação e feedback sem alterar balanceamento. Export/import usa JSON do mesmo schema e pipeline de migração do save local; não cria um segundo formato de persistência. Enquadramento de backgrounds de outings é dado de conteúdo (`backgroundPositionDesktop/Mobile`), não CSS específico por personagem. Assets podem ser otimizados sem mudar composição/conteúdo visual aprovado.


## v0.2.28 — overlay do briefing dentro do TacticalMap
- Como `MissionBriefing` é filho de `TacticalMap` desde a decomposição da Central, no desktop ele deve ser posicionado de forma absoluta dentro de `.mapStageWorkspace`, abaixo da toolbar.
- Não usar `grid-column`/`grid-row` no `.mapBriefingLayer` enquanto ele permanecer filho do mapa: isso cria trilhas implícitas e comprime a arte da cidade.
- Mobile continua com overlay `fixed` full-screen.


## D-063 — Desenvolvimento deve usar workbench integrado em vez de faixa inferior (v0.2.30)
**Status:** ativa.

No desktop, a escolha de atributo dos níveis 3/5 acontece no mesmo painel do radar para evitar uma faixa inferior que empurra ou quebra a composição. O jogador pode pré-visualizar um único +1 com controles +/− e só persiste a alteração ao confirmar. A coluna direita concentra progressão, milestones, escolhas de técnica/evolução e técnicas já desbloqueadas. A mudança é de UX; regras e valores de progressão permanecem os mesmos.


## D-064 — Mensagem apagada é conteúdo autorado, não efeito hardcoded (v0.2.33)
**Status:** ativa.

O NEXO pode representar uma mensagem que chega normalmente e é apagada após um atraso curto usando campos data-driven em `DialogueMessage` (`deleteAfterMs` e `deletedText`). Durante a entrega ao vivo, o jogador deve ter tempo de ler a mensagem antes da troca visual; a próxima bolha aguarda a exclusão. Ao reabrir o histórico concluído, a mensagem aparece somente no estado excluído. O motor não deve conter texto específico da Elysia para esse efeito.

## D-065 — Dates da Elysia são cenas lineares autoradas (v0.2.33)
**Status:** ativa.

Etapas 3 e 6 da rota de Elysia oferecem `/encontro` a partir de escolhas autoradas do NEXO. Desde v0.2.36, essas escolhas deixam o convite pendente e o jogador abre a cena pelo CTA `IR PARA ENCONTRO`. Dentro do date não há escolhas: a cena é texto corrido data-driven em `content/narrative/outings.ts`. O Date 2 termina exatamente na pergunta “Você não quer saber qual é a recompensa?”; não continuar sem novo texto do autor.


## D-066 — Convite de date é persistente e não consome a noite no chat (v0.2.36)
**Status:** ativa.

A escolha autorada que encerra o chat de um marco 3/6 não deve reservar automaticamente `outingsByGlobalDay` nem navegar para `/encontro`. Depois da última mensagem, o NEXO exibe `IR PARA ENCONTRO`. O jogador pode adiar por quantos dias quiser; o convite permanece disponível e a rota fica estacionada no mesmo estágio até o encontro ser concluído. A limitação de uma saída presencial por noite é aplicada somente ao pressionar o CTA. Se outra saída já ocupou a noite, o botão permanece visível porém desabilitado e volta no dia seguinte. Conversas de outros personagens não são bloqueadas por essa limitação.

## D-067 — padrão estrutural de chat final usa beats curtos com agência (v0.2.37)
Rotas sociais finais devem evitar que o Analista atravesse vários assuntos importantes por mensagens automáticas entre duas escolhas. Sempre que houver uma mudança de assunto ou reação significativa do Analista, preferir um novo turno com exatamente 3 respostas, incluindo uma opção neutra/casual e variações coerentes com a intimidade do estágio. A regra é estrutural: não uniformizar a voz dos personagens. Yuki preserva informalidade, jogos, energético e slow burn; Elysia preserva timidez/nerdice e escalada provocadora. Sequências automáticas continuam válidas para pequenas transições autoradas que não representam decisão significativa.


## D-068 — menu principal usa cidade como key art e fade contínuo (v0.2.38)
- A primeira tela apresenta a cidade, não um personagem específico, para representar o escopo da Agência e não privilegiar uma rota.
- O menu é legível por uma camada de fade escuro contínua sobre a imagem; não usar um card opaco isolado se a composição puder ser resolvida pelo gradiente.
- O gradiente deve alcançar toda a largura da viewport, ficando progressivamente mais transparente no lado oposto ao menu.
- Background e fade são apresentação; textos continuam data-driven em `content/ui/menu.ts`.


## D-069 — menu é o hub de entrada e conta é desacoplada da campanha (v0.2.39)
- O menu principal concentra Continuar, Novo Jogo, Carregar Jogo, Conta / Acesso e Configurações em vez de espalhar o primeiro fluxo em páginas visuais desconectadas.
- Identidade de conta e nome do Analista são conceitos separados.
- Até existir backend, a UI de conta não armazena senha nem afirma autenticação remota real; guest/preview armazenam apenas metadados locais.
- Salvar e Sair significa persistir o estado atual e retornar ao menu principal, não à tela de login.
- Preferências de interface podem usar armazenamento local separado do save de campanha.


## v0.2.42 — padrão de autoria de Lysandro
- Lysandro usa intensidade/flertes desde a primeira etapa; a progressão revela cuidado e responsabilidade, não “liberação” do flerte.
- Falas [Base] fornecidas pelo autor são preservadas; opções adicionais servem apenas para variação de tom e convergem para o mesmo beat quando não houver ramificação autoral.
- Fotos de chat são conteúdo autoral e ficam data-driven no diálogo.
- Dates de Lysandro são lineares, sem escolhas internas, e não devem ser estendidos além do texto recebido.


## D-070 — Novo Jogo pode usar modo somente pós-expediente (v0.2.46)
**Status:** ativa.

O jogador pode escolher, no momento de criar um novo save, entre a campanha completa e um modo focado somente no dating sim pós-expediente. Esse modo não cria uma progressão social paralela: reutiliza as mesmas rotas, flags, convites, encontros e calendário global, identificado pela flag `mode:post-shift-only` no save v9. Central, Desenvolvimento e onboarding ficam fora do fluxo e acessos diretos a essas telas retornam ao NEXO. A passagem de noite continua necessária para respeitar a cadência de uma etapa por personagem por noite e o limite de uma saída presencial por noite. A campanha completa permanece o comportamento padrão.

## D-071 — Avanço de noite no modo só pós-expediente exige confirmação (v0.2.48)

- No modo `mode:post-shift-only`, **PRÓXIMA NOITE** não avança imediatamente.
- A UI deve perguntar **“Deseja ir para o próximo dia?”**.
- Ações disponíveis: **Ir para próximo dia** e **Voltar**.
- Confirmar persiste o novo dia e atualiza o estado local do NEXO na mesma rota `/conversa`; cancelar mantém a noite atual intacta.
- O fluxo de campanha completa continua usando seu encerramento normal e não recebe esta confirmação específica.


## v0.2.50 — estados visuais do NEXO
- O NEXO deve distinguir visualmente mensagem nova, conversa concluída e convite presencial pendente sem alterar progressão narrativa.
- O dia/noite atual deve permanecer visível também dentro da thread, importante no mobile.
- Avanço de noite em modo Só pós-expediente deve avisar sobre conteúdo não lido e convites pendentes, sem invalidar convites persistentes.
- Fotos continuam como mídia do histórico: miniatura enquadrada + lightbox, sem edição do arquivo autoral.


## v0.2.51 — Dates permanecem cenas lineares, agora com leitor paginado
- Date não recebe escolhas de diálogo: continua sendo narrativa linear autorada.
- Paginação é responsabilidade da UI e não modifica `paragraphs` nem a ordem dos textos em `content/narrative/outings.ts`.
- `beats` continuam sendo a unidade autoral para trocar background/ambiente; a UI pode subdividir cada beat apenas para legibilidade.
- Progresso de leitura temporário não entra no save v9; usa `sessionStorage` para não exigir migração.
- Milestone e avanço de rota só são gravados no botão final da última página.
- Cena já concluída deve retornar ao NEXO em vez de ser reproduzida novamente por URL manual.


## v0.2.52 — memórias e QA social sem alterar narrativa
- Fotos desbloqueadas são derivadas do histórico realmente alcançado; não exibir slots bloqueados/checklist de colecionável.
- Replay de Date é superfície oficial de memória e sempre read-only; não pode conceder milestone, reservar noite ou avançar rota.
- QA preview de Date também é read-only e existe somente para teste interno.
- Estado de leitura do NEXO pode usar novas strings em `flags` sem mudança do schema v9.
- A estrutura técnica principal de todas as rotas é D1–D6 com encontros presenciais em 3/6; conteúdo e voz continuam específicos de cada personagem.
- Ferramentas de QA podem manipular estágio/noite/progresso social, mas não devem inventar texto nem virar dependência do gameplay normal.
- Adaptador de pronomes e revisão de grupos permanecem adiados até o fechamento das conversas individuais.


## v0.2.53 — abas do NEXO não ocupam a região flexível
- A navegação Conversas/Fotos/Dates é uma barra compacta entre o resumo da noite e a lista de contatos.
- A única região vertical flexível da lateral continua sendo a lista de contatos.
- Este hotfix é exclusivamente visual/estrutural; não muda estado social nem narrativa.


## v0.2.56 — robustez social sem novo schema
- Inconsistências sociais recuperáveis de saves v9 devem ser hidratadas/reparadas no carregamento em vez de exigir reset do save.
- Reparo automático é conservador: deduplica flags, restaura mapas/chaves ausentes e sincroniza milestones/completion flags de Dates; não reescreve escolhas autorais nem avança cenas arbitrariamente.
- QA social pode manipular estados para teste, mas essas ações permanecem isoladas em `/qa/social`.


## D-072 — Date presencial só começa após ação explícita do jogador (v0.2.57)
**Status:** ativa.

Concluir a última mensagem de um estágio 3/6 e desbloquear o convite **não** pode abrir a tela presencial automaticamente. O NEXO deve permanecer na conversa, com a última mensagem legível e o CTA persistente `IR PARA ENCONTRO`. Somente o clique explícito nesse CTA reserva a saída da noite e autoriza a entrada normal em `/encontro`. A autorização é efêmera de sessão, não altera o schema do save e existe apenas para impedir navegação antecipada/acidental. Replay e QA preview permanecem fora desse gate.


## D-073 — autorização de entrada em Date via navegação explícita (v0.2.58)
**REFINA D-072.** A decisão de produto permanece: Date normal só começa após clique explícito em `IR PARA ENCONTRO`. A implementação não usa mais `sessionStorage` como gate de lançamento. O CTA navega com `?launch=1`, e `/encontro` exige esse marcador junto da seleção persistida da noite. `sessionStorage` fica restrito ao progresso temporário de leitura do Date.


## D-0B1 — Beta 1 usa persistência local-first com Supabase como sincronização
- O gameplay não depende de rede para funcionar.
- `lib/save.ts` permanece como fachada do domínio; backend é acessado apenas por contratos/adapters.
- Supabase usa Auth + PostgREST com anon key pública e RLS; service role nunca entra no cliente.
- Primeiro conflito local/cloud exige escolha explícita. Não usar last-write-wins silencioso.
- A Beta 1 possui um único slot cloud `campaign`; múltiplos slots ficam para evolução posterior.
- Conteúdo narrativo/cânone continua versionado no projeto, não no Supabase.
