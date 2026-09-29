# Sistema visual v0.9.0 — Agência Ressonância

## Direção
A interface inteira deve parecer parte do mesmo terminal/central de operações. O mapa é o centro do expediente; superfícies auxiliares surgem apenas quando o jogador precisa decidir ou analisar.

## Paleta semântica
- Fundo principal: azul-preto quase negro.
- Painéis: azul-marinho escuro.
- Bordas: azul frio discreto.
- Ciano: seleção, informação operacional e foco.
- Verde: disponibilidade/estado positivo.
- Laranja: atenção/prioridade intermediária.
- Vermelho: urgência/perigo/P1.

## Central
1. Header com marca, relógio do turno e operador.
2. Linha de resumo: aguardando, em campo, disponíveis, não atendidas e relatórios.
3. Mapa tático ocupa a maior área visual.
4. Chamados aparecem no mapa como marcadores; clicar abre Briefing.
5. Faixa inferior permanente contém os 7 heróis.
6. Dock inferior mostra comando/seleção atual e acesso ao Briefing.

## Heróis
Card principal mostra apenas retrato/placeholder, nome, estado e INFO. Atributos ficam na ficha. Estado deve ser legível por texto e não apenas cor.

## Briefing
Modal escuro coerente com a Central. Deve mostrar descrição, risco, confiabilidade, prazo, duração, necessidades, tags, seleção 1–3 heróis e alertas de Ressonância.

## Ficha INFO
Mesmo material visual da Central. Radar 1–5 em ciano, condição, poder, classe/trilha, estilo, pontos fortes e limitações.

## Desenvolvimento
Mesmo sistema escuro. Upgrades usam destaque ciano; evolução pendente pode usar laranja sem transformar a tela em outro produto.

## Outras telas
Login, Novo Jogo, Relatório, Visual Novel e Dev Tools devem reutilizar fundo, bordas, tipografia e cores semânticas da Central. A Visual Novel pode usar arte/cenário próprios, mas caixas e controles continuam pertencendo à Agência Ressonância.

## Regra de densidade
Não exibir informação só porque existe. Tela principal monitora; Briefing decide; INFO analisa. Microtexto excessivo é falha de UX.


## Revisão v0.9.3 — regras da Central
- Não existe faixa Situação Operacional abaixo do mapa.
- Não existe dock Revisar/Despachar na Central; clicar no chamado abre o Briefing.
- Distritos não usam cartões/placas retangulares. São rótulos discretos sobre uma cidade contínua.
- Chamados do mesmo distrito devem poder ocupar pontos diferentes da região.
- Roster: retrato 3x4 (placeholder até chegada da arte), nome, estado e ABRIR FICHA.
- Não mostrar poder, nível, fadiga ou estresse no roster.
- Dossiê é sempre consulta e não muda por haver chamado ativo.
- Equipe só pode ser alterada dentro do Briefing.
