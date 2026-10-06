# UI/UX da Central — direção aprovada

## Princípio

A tela principal serve para **monitorar**. O briefing serve para **decidir**. A ficha serve para **analisar o herói**. Não misturar os três níveis de detalhe na mesma superfície.

## Tela principal

Inspirada conceitualmente nas referências de Dispatch enviadas pelo usuário:

- mapa tático como área dominante;
- ocorrências aparecem visualmente no mapa e numa lista simples;
- barra/rail dos sete heróis com retrato, nome e status;
- status legíveis: DISPONÍVEL, EM MISSÃO, RETORNANDO/RECUPERAÇÃO;
- relógio do expediente e relatórios pendentes;
- sem parágrafos longos, listas de atributos ou cálculo de sucesso na tela principal.

## Clique em ocorrência

Abre um briefing grande com:

- título e prioridade;
- descrição completa do chamado;
- distrito;
- risco;
- confiabilidade;
- tempo para decidir;
- duração estimada;
- atributos relevantes (Força/Agilidade/Carisma/Inteligência/Vigor);
- capacidades/tags recomendadas;
- slots/seleção de 1–3 heróis;
- alertas qualitativos de composição e Ressonância;
- botão DESPACHAR.

## Clique/INFO do herói

Abre uma ficha grande com:

- retrato/arte;
- nome, poder, classe e trilha;
- estilo;
- descrição do modo de atuação;
- status, fadiga, estresse e ferimento;
- **gráfico pentagonal** de Força, Agilidade, Carisma, Inteligência e Vigor;
- valores 1–5;
- nível e XP;
- pontos fortes;
- limitações;
- técnicas desbloqueadas.

## Gráfico de atributos

Escala visual fixa 1–5. O polígono precisa deixar claras as silhuetas estatísticas:

- Elysia: picos em AGI/INT, VIG baixo;
- Demétria: picos em FOR/VIG, AGI baixa;
- Eros: AGI/CAR;
- Alexandra: INT dominante;
- Lysandro: FOR com AGI/VIG secundários;
- Yuki: distribuição equilibrada;
- Hélio: INT com AGI/VIG secundários.

## Desenvolvimento da Equipe

No fim de cada expediente, inclusive no Dia 1, usar uma tela própria antes do pós-expediente. O jogador escolhe personagem, vê radar, XP, trilha de níveis 1–6 e resolve upgrades conquistados naquele turno. O dia seguinte começa com essas melhorias já ativas.

## Feedback pré-despacho

Não exibir porcentagem única de sucesso. Preferir:

- Boa Agilidade
- Pouco Vigor
- Forte cobertura técnica
- Falta reconhecimento
- Tensão forte na dupla
- Ressonância especial disponível
- Herói fatigado/ferido

A resposta final pertence ao jogador.


## Consolidação e acessibilidade — v0.2.26/v0.2.27
- Central composta por superfícies independentes (fila, mapa/briefing, NEXO, roster) com estado orquestrado pela rota.
- Acessibilidade base: foco visível, Escape, live regions e alvos de toque; reduced motion respeitado.
- Export/import de save é infraestrutura de QA/portabilidade e não altera o loop.
