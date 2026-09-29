# CURRENT STATE — v0.2.5 · First Dispatch onboarding

## Onboarding / menu
- Novo jogo: nome do Despachante → apresentação da Agência com Edison → grupo NEXO → apresentação do SDH → Central.
- `PULAR TUTORIAL` leva direto à Central e marca `tutorial_skipped`.
- Com tutorial ativo, `pool-e-04` é o primeiro chamado, Hélio é a seleção guiada e o resultado é Sucesso controlado para ensinar o loop sem RNG punitivo.
- Após arquivar o relatório, o tutorial é concluído e o restante do Dia 1 segue o banco normal.
- Menu principal alinhado à esquerda com grande área livre à direita para futura key art/background.
- Edison é [AU-APROVADO]. Save continua v9.


## Social
- Rotas continuam individuais e independentes do dia global.
- Cada personagem pode avançar no máximo **uma etapa de rota por noite global**. O jogador pode conversar com vários/todos os personagens na mesma noite.
- A lista de contatos do NEXO não mostra barra, porcentagem ou número de rota. O percentual de ROMANCE permanece no cabeçalho da conversa aberta.
- Concluir saída/date também consome o avanço daquela personagem naquela noite.
- Save permanece schema v9; o bloqueio diário usa flag estável `social:route-advanced:day:<dia>:<personagem>`.

## Relatórios
- Resultado mostra CHAMADO ORIGINAL + COMO FOI RESOLVIDO.
- O resumo de resolução usa equipe, ocorrência, capacidades cobertas e afinidade de poder quando ativa.

## Dispatch
- Expediente: 08:00–18:00 em **10 minutos reais**.
- Respiro: 10 casos (5 easy/4 medium/1 hard).
- Normal: 11 (4/5/2).
- Pressão: 12 (3/5/4).
- Pico: 13 (2/5/5/1 crisis).
- Spawns ocupam janela menor e usam pequenas ondas para aumentar simultaneidade.
- Escala D1–D6: 0.60 / 0.68 / 0.76 / 0.86 / 0.96 / 1.05.
- Chance base/floors foram reduzidos para evitar que um agente cubra quase tudo cedo apenas por atributos.
- Energia: Sucesso -2; Sucesso com custo -3; parcial -4; falha -5. Vida permanece 0/-1/-2/-5.
- Afinidade de poder: +8 p.p. por match, teto +12 p.p. por equipe. Técnicas permanecem +6 p.p., teto +12.
- Alexandra agora possui afinidade explícita também em Enchente na Baixada Leste e Falha de Bombas na Estação de Drenagem.


## v0.2.5 — onboarding isolado e NEXO corporativo
- Tutorial ativo inicia o turno somente com E-04; demais ocorrências não existem no runtime até o relatório ser arquivado.
- E-04 tutorial resolve em 12 minutos diegéticos; depois o restante do Dia 1 é agendado no tempo restante.
- Coach de Edison aparece dentro do briefing do primeiro caso.
- Card TUTORIAL CONCLUÍDO ganhou layout responsivo sem corte de conteúdo/CTA.
- Grupo/canais operacionais NEXO são corporativos e supervisionáveis; DMs privadas não são supervisionadas.
- Save permanece v9.

## Ajuste v0.2.7
- O retrato de Edison agora aparece como avatar circular pequeno no cabeçalho das caixas de diálogo da introdução, ao lado do nome da personagem.
- A foto continua tratada como retrato/avatar; os cenários permanecem `agencia-exterior.jpg` e `agencia-escritorio.jpg`.
