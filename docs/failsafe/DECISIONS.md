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
