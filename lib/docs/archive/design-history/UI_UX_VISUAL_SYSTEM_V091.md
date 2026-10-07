# UI/UX Visual System — v0.9.1

## Objetivo

Corrigir problemas observados em playtest real da v0.9.0 sem alterar o core loop. A Central deve ser imediatamente operável em 1366x768 e 1920x1080.

## Zonas fixas da Central

1. Header: identidade, relógio e Analista.
2. Resumo operacional: aguardando, em campo, disponíveis, não atendidas e relatórios.
3. Mapa: maior área flexível da viewport.
4. Agentes: faixa reservada e nunca sobreposta pelo mapa ou Situação Operacional.
5. Comando: ocorrência atual, mensagem e Revisar/Despachar.

## Eventos no mapa

- Marcadores precisam ser botões reais com alvo mínimo de ~54px.
- Todo overlay decorativo (`grid`, polígonos, efeitos) usa `pointer-events:none`.
- Marcadores ficam acima das camadas visuais com `z-index` explícito.
- Hover/foco deve deixar evidente que o marcador é clicável.
- Clique abre o Briefing diretamente.

## Situação Operacional

Não ocupa mais uma linha permanente entre mapa e roster. É um painel flutuante na base do mapa, com título, resumo e botão Abrir Briefing. Dessa forma a informação continua disponível sem roubar altura dos agentes.

## Roster

- Os 7 agentes devem ficar completamente legíveis em desktop.
- Card mostra: retrato placeholder/arte, nome, poder, nível, status, fadiga e estresse.
- `ABRIR FICHA` é um alvo separado da seleção.
- Em telas estreitas, o roster vira faixa horizontal rolável; não comprimir cards até ficarem ilegíveis.

## Regra de densidade

Informação rápida na Central; informação completa no Briefing e na Ficha. Nunca resolver falta de espaço diminuindo texto a ponto de prejudicar leitura.
