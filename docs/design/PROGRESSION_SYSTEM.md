# Sistema de Progressão — v0.8.1

## Objetivo

Criar crescimento visível sem inflar números. O jogador desenvolve pessoas e repertórios, não apenas estatísticas.

## Cinco atributos

Todos os heróis usam a mesma escala pessoal 1–5:

- **Força:** força física, impacto, capacidade corporal de mover/segurar/romper.
- **Agilidade:** velocidade, coordenação, reflexos, reposicionamento.
- **Carisma:** presença social, negociação, acalmar civis, imprensa/testemunhas.
- **Inteligência:** leitura de situação, técnica, planejamento, conhecimento e precisão decisória.
- **Vigor:** resistência física, tolerância a esforço, sustentação de operação.

Poder elemental NÃO é convertido diretamente em atributo. Hélio pode ter FOR baixa e ainda possuir enorme potência de fogo; Elysia pode ter VIG baixo e produzir Energia extrema, mas pagar por sobrecarga.

## Valores iniciais

Todos começam em 1/1/1/1/1 e recebem quatro pontos extras fixos para preservar identidade:

- Yuki: 2/2/1/2/2
- Elysia: 1/3/1/3/1
- Lysandro: 3/2/1/1/2
- Hélio: 1/2/1/3/2
- Demétria: 3/1/1/1/3
- Alexandra: 1/1/2/3/2
- Eros: 1/3/3/1/1

## Níveis

- **Nível 1:** perfil inicial
- **Nível 2:** técnica
- **Nível 3:** +1 atributo
- **Nível 4:** técnica/especialização
- **Nível 5:** +1 atributo
- **Nível 6:** evolução de poder

## XP

XP acumulado necessário:

- Nv. 1: 0
- Nv. 2: 70
- Nv. 3: 170
- Nv. 4: 300
- Nv. 5: 460
- Nv. 6: 650

XP por missão na implementação atual:

- Sucesso: 30
- Sucesso com custo: 26
- Sucesso parcial: 20
- Falha: 14

Falha ainda ensina; por isso concede XP, mas menos.

## Quando o level up acontece

XP é recebido desde o primeiro expediente, mas o upgrade NÃO é processado no meio da missão. Ao encerrar o expediente e concluir os relatórios, o jogo marca `developmentRequired = true` e abre Desenvolvimento da Equipe ainda no mesmo dia.

Fluxo correto desde o Dia 1:

**Expediente → XP → Relatórios → Desenvolvimento da Equipe → Pós-expediente/VN → próximo dia**.

Assim, um herói que subir de nível no Dia 1 resolve sua técnica/atributo ao fim do Dia 1 e já começa o Dia 2 com a melhoria ativa.

## Técnicas

Nos níveis 2 e 4 o jogador escolhe uma técnica entre opções do personagem. No nível 6 escolhe/recebe a evolução disponível. Técnicas podem conceder novas tags operacionais, abrindo soluções no Dispatch.

## Atributos

Nos níveis 3 e 5 o jogador escolhe um dos cinco atributos para receber +1. Teto atual: 5.

## Filosofia

- builds podem divergir entre saves;
- nenhum atributo substitui poder, especialidade ou Ressonância;
- progressão horizontal deve ser tão importante quanto progressão numérica;
- um personagem não deve ficar universalmente melhor em tudo;
- upgrades devem abrir decisões novas.
