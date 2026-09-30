# RESSONÂNCIA — CONTEXTO MESTRE

> BASELINE: **v0.1.0 (Foundation)**, consolidada da linha funcional v0.9.14. Build incremental atual: **v0.2.9**, com NEXO long-form, progresso romântico e curva diária de Dispatch; a baseline de origem continua sendo a Foundation.
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
- schema atual: v9
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
- O romance 0–100% permanece visível como feedback e continua recebendo pontos 100/50/30, mas deixou de ser requisito para os dates.
- Marcos presenciais são garantidos pela progressão da rota: etapa 3 = primeira saída; etapa 6 = segundo date, respeitando apenas a regra de uma saída presencial por noite global.
- Nenhuma migração de save foi necessária; schema continua v9.
