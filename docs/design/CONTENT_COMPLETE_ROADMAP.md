# ROADMAP — MOTOR COMPLETO, CONTEUDO SUBSTITUIVEL

## Objetivo final

Chegar a um build em que **nenhuma nova regra, tela ou componente precise ser programado para fechar as rotas sociais e sustentar a campanha aberta de Dispatch**.

Quando este roadmap estiver concluido, produzir a versao narrativa final deve ser um trabalho de autoria: enviar/substituir arquivos de `content/` com dialogos, mensagens, opcoes de resposta, descricoes de ocorrencias e textos das cenas presenciais.

Em outras palavras: **motor pronto, conteudo intercambiavel**.

---

## Definicao de pronto

O projeto entra em estado `CONTENT-READY` quando todos os itens abaixo forem verdadeiros:

- Dias 1–6 e o loop pós-D6 podem ser jogados sem Dev Tools.
- Cada dia possui expediente, resultados, Desenvolvimento e pos-expediente funcionais.
- NEXO preserva historico de todos os contatos entre dias.
- Conversas podem ter dezenas de turnos sem quebrar layout, scroll ou save.
- Autoscroll acompanha novas mensagens sem impedir releitura do historico.
- Todas as respostas do jogador sao data-driven e aceitam pesos romanticos 100/50/30.
- Romance 0–100, marcos individuais de rota e exclusividade de uma saída por noite funcionam de ponta a ponta.
- Escolher a saida/date abre a tela presencial data-driven com background + caixa de texto.
- Nao escolher romance nenhum continua sendo um caminho valido.
- Dificuldade de Dispatch ensina a curva até o Dia 6 e depois alterna respiro/normal/pressão/pico sem inflação infinita.
- Ocorrencias de cada dia sao carregadas por conteudo, nao por mudanca no motor.
- Completion social consegue detectar primeiro + segundo date com os sete sem obrigar encerramento no Dia 6.
- Saves antigos suportados continuam migrando sem reset silencioso.
- Validacao de conteudo acusa IDs duplicados, personagem inexistente e cenas mal formadas.

---

## Fase A — Fundacao social D1–D6

**Estado: implementado para QA na v0.1.4.**

1. Manter contatos antigos visiveis quando o dia vira.
2. Acumular todo o historico por personagem em uma unica thread.
3. Preencher D2–D6 com placeholders claramente marcados para QA.
4. Garantir 3 respostas por turno e pesos 100/50/30.
5. Validar que etapas 3 e 6 liberam os encontros sem hardlock de percentual, mantendo uma saída por noite.
6. Manter apenas uma escolha exclusiva de saida em D3 e uma em D6.
7. Abrir cena presencial data-driven por `vnSceneId`.

**Saida da fase:** NEXO pode ser testado ate o Dia 6 mesmo antes dos dialogos finais.

---

## Fase B — Cena presencial generica e substituivel

**Estado: implementado para QA na v0.1.4.**

Criar uma unica tela `/encontro` capaz de receber do conteudo:

- `id`;
- dia;
- personagem;
- titulo;
- imagem de fundo;
- um ou mais paragrafos descritivos;
- label do botao de continuar;
- flag de conclusao.

A tela nao deve conhecer Elysia, Yuki ou qualquer personagem especifico. Trocar um encontro exige editar somente `content/narrative/outings.ts` ou o arquivo equivalente futuro.

**Saida da fase:** Dias 3/6 conseguem sair do NEXO e voltar sem implementar uma tela nova por personagem.

---

## Gate social v0.1.4 — pronto para receber roteiro final

**Estado: implementado para QA.**

- todo texto atual de agentes e placeholder;
- uma thread por personagem acumula D1–D6;
- ganho de romance e por resposta, nao dividido pelo tamanho da cena;
- 100 = +7, 50 = +5, 30 = +3;
- teto diario = 18 por personagem;
- percentual de romance não bloqueia os marcos; etapa 3 e 6 liberam as cenas presenciais;
- escolhas continuam alterando afinidade, mas o convite não depende de threshold;
- `ENCERRAR NOITE` permanece acessivel mesmo dentro de chat ativo;
- conversa e opcional e nunca impede virar o dia.

**Criterio de autoria final:** substituir os placeholders por arquivos de dialogo reais sem alterar componentes ou motor.

---

## Fase C — Banco de ocorrencias data-driven

**Estado: implementado na v0.2.1; QA runtime pendente.**

1. Banco com 48 casos aprovados em `content/incidents/caseBank.ts`.
2. Pools easy/medium/hard/crisis.
3. Composicao diaria respiro/normal/pressao/pico.
4. `minDay`, `weight` e `cooldownDays` ativos.
5. Seleção deterministica por jogador + dia, sem rerrolar ao recarregar save.
6. Afinidades contextuais de poder ativas e visiveis no briefing.
7. Peso 3/2/1 interpretado como ESSENCIAL/IMPORTANTE/APOIO.

**Saida da fase:** adicionar/trocar ocorrencias exige editar `content/incidents/`; o motor nao precisa conhecer IDs especificos.

---

## Fase D — Condicionais narrativas sem codigo novo

**Estado: parcial.**

Expandir schema de disponibilidade quando necessario para permitir conteudo reagir a:

- personagem enviado/nao enviado;
- sucesso/falha/custo da missao;
- Vida/Energia;
- nivel e tecnicas;
- romance;
- confianca/respeito/intimidade/tensao/atracao;
- saida escolhida no Dia 3;
- date escolhido no Dia 6;
- flags livres de autoria.

**Saida da fase:** um roteirista consegue criar variacao narrativa sem editar React ou simulacao.

---

## Fase E — Final do Dia 6

**Estado: pendente.**

Criar uma resolucao data-driven capaz de distinguir, no minimo:

- romance consolidado com o personagem escolhido;
- relacao positiva sem romance;
- nenhum romance / jogador termina sozinho;
- flags especificas de rota quando existirem.

A tela final deve consumir conteudo e flags. O motor nao escreve epilogo.

**Saida da fase:** a campanha pode terminar corretamente sem codigo por personagem.

---

## Fase F — QA de producao

**Estado: pendente.**

Checklist minimo:

1. novo jogo → Dia 6 completo;
2. caminho sem conversar com ninguem;
3. caminho conversando com todos;
4. romance forte com um personagem;
5. tentar escolher duas saidas no Dia 3;
6. tentar escolher dois dates no Dia 6;
7. jogar com percentual baixo e ainda conseguir avançar pelos dates da rota;
8. recarregar save em cada tela importante;
9. historico NEXO longo no desktop e mobile;
10. cenas presenciais com backgrounds de proporcoes diferentes;
11. Dispatch com 1, 2 e 3 agentes em cada faixa de dificuldade;
12. level-up e tecnicas afetando o dia seguinte;
13. personagem DESMAIADO e recuperacao no proximo dia;
14. migracao de saves suportados;
15. `validateEditableContent()` sem erros.

**Saida da fase:** marcar projeto como `CONTENT-READY`.

---

# Depois de CONTENT-READY

O fluxo editorial ideal passa a ser:

1. autor envia dialogos finais D1–D6;
2. substituir placeholders em `content/dialogues/post-shift/` preservando IDs;
3. autor envia textos/imagens dos encontros;
4. substituir `content/narrative/outings.ts` e assets;
5. autor envia mensagens operacionais;
6. substituir `content/messages/operations.ts`;
7. autor envia ocorrencias;
8. substituir/adicionar arquivos em `content/incidents/`;
9. rodar validacao + playtest;
10. build final.

Nenhuma dessas etapas deve exigir alterar componentes, motor de Dispatch, save ou roteamento, exceto quando uma nova mecanica for deliberadamente adicionada ao design.

## Sequencia objetiva ate CONTENT-READY

1. **Social/NEXO:** motor fechado; resta substituir placeholders por texto final.
2. **Progressao:** motor funcional e rebalanceado; resta QA de campanha completa.
3. **Dispatch:** banco de 48 casos implementado; resta QA e consequencias data-driven opcionais.
4. **Condicionais:** garantir que roteiros possam consultar flags/resultados sem editar React.
5. **Completion:** estado final/100% data-driven para rotas completas, amizade ou jogo sem romance.
6. **QA integral:** jogar D1–D6 + pós-D6, desktop/mobile, save/reload, rotas lentas e alternativas.
7. **CONTENT-READY:** congelar motor; daqui em diante, entregar apenas arquivos de `content/` + imagens/assets finais.

### O que o autor deverá enviar depois do CONTENT-READY

- mensagens operacionais;
- diálogos privados por personagem/dia;
- três opções de resposta por turno e resposta correspondente;
- peso 100/50/30 de cada opção;
- textos e backgrounds de saídas/dates;
- ocorrências/banco de casos e eventuais revisões de balanceamento;
- textos de epílogo/final.

Nenhum desses itens deve exigir nova tela específica ou regra codificada se o roadmap estiver concluído.

## Estado v0.2.8

O motor entrou na fase de conteúdo autorado. Yuki é a primeira rota final nas etapas 1–6, com imagens no NEXO e dois encontros data-driven. Os outros seis personagens continuam usando placeholders de QA até receberem roteiro final. O próximo gate é playtestar Yuki ponta a ponta, inclusive caminhos de afinidade mediana/baixa, antes de replicar o processo para as demais rotas.
