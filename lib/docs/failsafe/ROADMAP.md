# ROADMAP — baseline v0.1.0

## Fundação jogável — IMPLEMENTADO

- [x] Central de despacho
- [x] 7 heróis
- [x] ocorrências simultâneas
- [x] despacho 1–3
- [x] missões assíncronas
- [x] Vida/Energia
- [x] chance probabilística
- [x] resultados explicáveis
- [x] XP/nível/técnicas
- [x] Ressonância
- [x] NEXO operacional
- [x] pós-expediente opcional com múltiplos contatos
- [x] conteúdo separado do motor
- [x] introdução/tutorial inicial data-driven

## Conteúdo/campanha — PRÓXIMO

- [ ] arquivos de ocorrência por dia/capítulo
- [ ] modificadores ocultos e informação incorreta
- [ ] cidade/reputação e consequências persistentes
- [ ] mensagens NEXO condicionais por flags/relações
- [ ] cenas presenciais especiais data-driven
- [ ] introdução definitiva da Agência/chefia
- [ ] 2–3 dias completos de vertical slice

## Infraestrutura — FUTURO

- [ ] múltiplos slots de save
- [x] export/import manual de save local JSON (v0.2.27)
- [ ] configurações completas (áudio, acessibilidade, velocidade, texto)
- [x] Supabase Auth/save cloud — arquitetura local-first + adapter REST/RLS implementados na Beta 1; staging/QA remoto ainda é gate de publicação
- [ ] histórico de conversas/resultados
- [ ] ferramentas/editor de conteúdo

## Polimento — FUTURO

- [ ] arte final
- [ ] música/SFX
- [x] acessibilidade base da Central (foco, Escape, live regions, reduced motion); auditoria completa ainda pendente
- [ ] QA e balanceamento
- [ ] publicação

## v0.1.3 — alvo CONTENT-READY

O roadmap detalhado para chegar ao ponto em que a campanha fecha apenas substituindo arquivos de dialogo/texto/mensagens/opcoes esta em:

`docs/design/CONTENT_COMPLETE_ROADMAP.md`

A prioridade estrutural seguinte e o pipeline de ocorrencias D1-D6 data-driven.

## v0.2.8 — fase de conteúdo autorado

- [x] banco de 48 ocorrências data-driven
- [x] campanha social por rota individual, sem depender do dia global
- [x] cena presencial genérica consumindo dados de `content/`
- [x] NEXO privado com imagens autoradas e lightbox
- [x] mensagens fixas antes/depois das escolhas, sem hardcode narrativo em React
- [x] primeira rota final: Yuki, etapas 1–6 + dois encontros
- [ ] playtest completo da rota Yuki (incluindo caminhos 50/30 para evitar hardlock)
- [ ] substituir placeholders dos outros seis personagens por autoria final
- [ ] conteúdo final de grupo/canal operacional
- [ ] backgrounds finais dos encontros


## v0.2.9 — UX social sem hardlock
- Entrega sequencial de bolhas no NEXO.
- Percentual romântico preservado como feedback, sem bloquear dates.
- Próximo foco continua autoria das demais rotas + QA de conteúdo real.


## v0.2.11 — indicador social simplificado

Percentual de romance passa a ser apenas leitura do progresso estrutural da rota. Isso remove balanceamento artificial de XP social antes da produção das demais rotas.

## v0.2.42 — autoria social
- Lysandro D1–D6 concluído em conteúdo principal, com fotos no NEXO e dois dates lineares.
- Próximas rotas principais ainda pendentes: Hélio, Alexandra e Eros. Demétria D1–D6 + Dates já está autorada.

## Backlog pós-finalização das conversas individuais

> Executar somente depois que as rotas/conversas individuais autorais estiverem fechadas, para usar essas versões como referência de voz e personalidade.

### Revisão dos grupos do NEXO
- [ ] Reescrever as conversas de grupo do NEXO para manter a personalidade de cada personagem consistente com suas conversas individuais finalizadas.
- [ ] Aumentar a interação **entre os próprios personagens** no grupo, evitando que o canal pareça apenas uma sequência de falas dirigidas ao Analista.
- [ ] Antes da reescrita, identificar nos arquivos de autoria quais personagens pertencem a cada equipe.
- [ ] Usar a composição real de cada equipe para orientar diálogos, familiaridade e interações entre seus respectivos membros, sem inventar relações ou cânone fora da autoria aprovada.

### Interação social de fim de expediente — avaliar/prototipar
- [ ] Avaliar uma pequena interação social após cada dia de expediente, com Edison, Analista e/ou grupo.
- [ ] Essa interação **não pode depender dos casos específicos do Dispatch**, porque os eventos são aleatórios.
- [ ] Também não deve afirmar continuidade direta com mensagens/eventos que talvez não tenham ocorrido naquele save.
- [ ] Tratar este item como hipótese de design, não como decisão fechada: comparar o NEXO atual com uma versão que inclua esse fechamento diário e verificar se há ganho real ou apenas redundância com o grupo.
- [ ] Considerar como alternativa integrar melhor Edison ao próprio NEXO/grupo, em vez de criar uma segunda camada social obrigatória.

### Adaptador global de nome e pronomes do jogador
- [ ] Na criação de novo jogo, permitir seleção de pronomes do jogador: **Ele/dele**, **Ela/dela** e **Elu/delu**.
- [ ] Criar uma camada/adaptador central de linguagem para flexionar textos quando necessário, evitando manter três cópias completas das mesmas conversas.
- [ ] Revisar sistematicamente o conteúdo para identificar referências ao jogador que precisam de adaptação de pronome/gênero.
- [ ] Revisar onde o **nome escolhido pelo jogador** pode substituir um tratamento pessoal como “Analista”.
- [ ] Não substituir automaticamente toda ocorrência de “Analista”: distinguir quando a palavra é tratamento/referência ao protagonista e quando significa literalmente o cargo/função de analista.
- [ ] Preservar a voz de cada personagem ao decidir quando alguém usa cargo, nome, apelido ou outra forma de tratamento.
- [ ] Fazer uma revisão textual global depois da implementação do adaptador para validar concordância, naturalidade e ausência de trocas indevidas.

### Ordem sugerida desse backlog
1. Finalizar todas as conversas individuais.
2. Revisar grupos/equipes do NEXO usando as vozes individuais como referência.
3. Prototipar e decidir se a interação social de fim de expediente agrega algo além do grupo.
4. Implementar o adaptador de nome/pronomes.
5. Fazer revisão global de todas as conversas com as variações de linguagem ativas.



## v0.2.52 — polimento social implementado
- [x] estados persistentes de leitura/novidade por turno no NEXO
- [x] biblioteca de fotos recebidas/desbloqueadas
- [x] arquivo e replay read-only de Dates concluídos
- [x] cartão de entrada e transições do sistema de Dates
- [x] navegação anterior/seguinte e teclado no leitor de Dates
- [x] manifesto técnico D1–D6 + Dates 3/6 com validação editorial
- [x] ferramenta interna `/qa/social` para noite/estágio/chat/date/flags/reset social
- [x] passada mobile/acessibilidade nessas novas superfícies


## v0.2.56 — robustez social implementada
- [x] validação automática ampliada de rotas/choices/flags/convites/mídia
- [x] validação de existência dos assets sociais locais
- [x] normalização conservadora de saves v9 sociais parciais/inconsistentes
- [x] diagnóstico e reparo social no QA
- [x] atalhos D1–D6 + abrir, lido/não lido e controle de Dates no QA
- [ ] QA runtime completo de reload/import em navegador real


## v0.2.57 — gate explícito de Date implementado
- Entrada presencial agora depende do CTA persistente do NEXO, não da conclusão automática do chat.
- Próximo passo: QA runtime do fluxo D3/D6 em desktop e mobile.


## v0.2.58 — hotfix do gate de Date concluído
- Substituído gate de lançamento via `sessionStorage` por autorização explícita `?launch=1` gerada no clique do CTA.
- Próximo passo: QA runtime do clique, reload e acesso manual sem autorização.

## Backlog — revisão contextual final das opções de diálogo
- **Quando executar:** somente depois que todos os chats/rotas sociais autorados estiverem prontos e padronizados.
- Revisar, turno a turno, todas as opções adicionais de fala do Analista (especialmente opções 2 e 3) e conferir se **cada opção se encaixa semanticamente na próxima mensagem fixa do personagem**.
- A revisão deve considerar continuidade de assunto, pergunta/resposta, tom, referência pronominal e qualquer informação que a fala seguinte pressuponha.
- Quando uma alternativa não encaixar naturalmente na resposta seguinte, ajustar **somente a opção adicional problemática**, preservando a fala-base/autoral e sem inventar novo cânone, evento ou informação narrativa.
- Fazer a revisão em todas as rotas antes de considerar a padronização global dos chats concluída.

## Pós-chats — padronização e identidade do jogador
Executar este bloco quando todos os chats autorados estiverem prontos:
- Padronizar todos os chats no modelo da Demétria, atualmente a referência de organização/abordagem: fala fixa do personagem -> `Analista — opções:` -> 3 respostas; opção 1 preserva a fala-base autoral e opções 2/3 são alternativas compatíveis; Dates permanecem lineares/sem opções salvo decisão autoral explícita; manter organização de fotos, convites e envios no mesmo padrão.
- Fazer revisão global de continuidade de todas as opções 2/3 contra a próxima fala fixa do personagem (assunto, pergunta/resposta, tom e pressupostos), corrigindo somente alternativas quando necessário e preservando a opção 1/cânone.
- Implementar identidade configurável do jogador: nome + seletor de pronomes, de forma centralizada.
- Revisar Dates e demais textos do jogo para trocar referências narrativas genéricas a `Analista` pelo nome escolhido quando for referência à pessoa; preservar `Analista` quando for cargo/título/contextualmente adequado. Não fazer substituição cega.
- Adicionar helpers/variáveis centralizados para nome, pronomes, artigos/possessivos e concordância, evitando condicionais narrativas espalhadas.
- Garantir migração/fallback seguro para saves existentes quando o sistema de identidade entrar, sem quebrar saves anteriores.
- Fazer QA textual de todas as combinações suportadas de nome/pronomes e QA final de continuidade após a padronização.
