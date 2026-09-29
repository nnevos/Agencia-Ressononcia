# ROTAS INDIVIDUAIS E LATE GAME — v0.2.2

## Decisão ativa
O dia global controla a cidade/Dispatch. O progresso social é individual por personagem. Não conversar com um personagem não avança sua rota e não apaga mensagens.

## Rotas
- Cada herói possui `routeStage` persistente.
- A cena autorada usa `day` como etapa da rota (compatibilidade editorial), não como dia global.
- O jogador pode desenvolver todos em paralelo ou focar um por vez.
- Primeiro encontro: marco de rota 3, alvo de romance 30%.
- Segundo date: marco de rota 6, alvo de romance 70%.
- Apenas uma saída presencial pode ser marcada por noite global.
- Se o jogador não atingir o marco no convite original, o encontro continua recuperável em noites posteriores quando o requisito for alcançado.
- Placeholders de QA incluem etapas 7–10 para testar rotas lentas. Conteúdo final pode ter ritmos e quantidades diferentes por personagem.
- 100% romântico: os sete personagens concluíram os marcos presenciais 3 e 6. O calendário não termina automaticamente no Dia 6.

## Romance
Ganho continua por mensagem (100/50/30 => +7/+5/+3), com teto de 18 por etapa/personagem. O teto é por etapa individual, não por dia global.

## Progressão operacional
- Níveis 1–6 continuam como arco principal.
- XP continua após o nível 6 e alimenta Maestria 1–5 automaticamente.
- Maestria não aumenta atributos além de 5; melhora consistência solo no Dispatch.
- Técnicas desbloqueadas deixam de ser apenas tags invisíveis: cada técnica relevante para as tags recomendadas da ocorrência concede +6 pontos percentuais na estimativa, até +12 p.p. por equipe, além da cobertura de tag já existente.
- Maestria concede +1,2 p.p. por rank quando o agente atua sozinho, reforçando a fantasia de especialista veterano sem exigir inflação de atributos.

## Dificuldade pós-Dia 6
Não existe escalada infinita. Dias 1–6 mantêm curva introdutória. A partir do Dia 7 a escala alterna em ciclo de respiro, normal, pressão e pico: 0,68 / 0,76 / 0,88 / 0,72 / 0,94 / 1,02 / 0,78 / 0,86, repetindo sem crescimento permanente.

## Banco de ocorrências v0.2.1
A agenda fixa foi substituída por banco data-driven de 48 casos aprovados, com pools, pesos, cooldown, `minDay` e composição diária determinística. Afinidades contextuais de poder adicionam vantagem real sem criar heróis obrigatórios. Ver `INCIDENT_POOL_SYSTEM.md`.

## Cadência social v0.2.2
Cada personagem avança no máximo uma etapa individual por noite global. É permitido conversar com todos os sete na mesma noite, mas nenhuma rota pode consumir duas etapas no mesmo pós-expediente. A lista de contatos não revela número da rota nem barra romântica; ROMANCE permanece visível somente dentro da conversa.
