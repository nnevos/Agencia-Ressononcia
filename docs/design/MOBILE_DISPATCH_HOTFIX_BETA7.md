# Dispatch mobile reliability — Beta 1 v0.3.0-beta.7

## Problema observado
No mobile, o briefing de uma ocorrência era filho do painel do mapa, mas abrir um chamado a partir da aba CHAMADOS não ativava o painel MAPA. Como painéis inativos usam `display:none`, o modal podia ser ocultado junto do mapa. Além disso, o briefing usava footer `fixed`, cards compactos em duas colunas e o balão de Edison próximo da faixa de despacho, criando sobreposição e alvos de toque apertados.

## Correção funcional
- Abrir um briefing passa a montar automaticamente o painel MAPA no mobile.
- Ao fechar sem despachar, a Central retorna à aba de origem.
- Após despachar, retorna à fila CHAMADOS para mostrar imediatamente o próximo estado operacional.
- Expiração enquanto o briefing está aberto também retorna à fila.

## Layout mobile do briefing
- Modal ocupa `100dvh` e possui uma única região interna de scroll com momentum touch.
- Header e footer ficam fora da região rolável; nenhum footer `fixed` cobre conteúdo.
- CTA DESPACHAR possui pelo menos 52 px de altura e respeita safe-area.
- Os quatro metadados operacionais (risco, confiabilidade, tempo e duração) permanecem visíveis.
- Em até 600 px, agentes viram uma lista vertical com retrato, nome, classe/trilha, status e botão FICHA de toque amplo.
- Seleção recebe indicador `+`/`✓`, borda própria e `aria-pressed`.
- Alertas da composição usam faixa horizontal rolável em vez de comprimir a grade.
- Balão do Edison fica no topo no primeiro caso para não cobrir a ação de despacho.

## Não alterado
- Fórmula de Dispatch, chance, afinidade, Ressonância, duração e resultados.
- Tutorial E-04 e suas restrições.
- Save schema v10, Supabase e GitHub Pages.
- Desktop mantém a geometria anterior.

## QA obrigatório
Testar em 360, 390 e 430 px:
1. CHAMADOS → abrir E-04/caso normal → briefing deve aparecer imediatamente.
2. Rolar narrativa/requisitos/equipe sem mover a página por trás.
3. Selecionar/remover agentes e abrir FICHA sem toque ambíguo.
4. DESPACHAR deve permanecer visível e clicável com safe-area.
5. Fechar briefing retorna à aba anterior; despachar retorna a CHAMADOS.
6. Edison não pode cobrir o CTA no primeiro caso.
