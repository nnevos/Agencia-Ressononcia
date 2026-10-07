# ROTAS INDIVIDUAIS E LATE GAME — v0.2.2

## Decisão ativa
O dia global controla a cidade/Dispatch. O progresso social é individual por personagem. Não conversar com um personagem não avança sua rota e não apaga mensagens.

## Rotas
- Cada herói possui `routeStage` persistente.
- A cena autorada usa `day` como etapa da rota (compatibilidade editorial), não como dia global.
- O jogador pode desenvolver todos em paralelo ou focar um por vez.
- Primeiro encontro: marco de rota 3. O percentual de romance não bloqueia a cena; 30% fica apenas como referência histórica/de balanceamento.
- Segundo date: marco de rota 6. O percentual de romance não bloqueia a cena; 70% fica apenas como referência histórica/de balanceamento.
- Apenas uma saída presencial pode ser realizada por noite global.
- Concluir o chat de convite não consome a saída da noite: o NEXO mantém um CTA persistente `IR PARA ENCONTRO`.
- Se o jogador adiar, o convite continua disponível nas noites seguintes. A rota fica estacionada no estágio 3/6 até o encontro ser concluído.
- Se outro personagem já teve encontro naquela noite, o CTA permanece visível porém indisponível até o próximo dia; isso não bloqueia conversar com os demais personagens.
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


## v0.2.9 — romance como feedback, não gate
As escolhas 100/50/30 continuam alterando o percentual e os eixos relacionais, porém o arco principal não pode entrar em hardlock por pontuação. Ao alcançar a etapa 3 ou 6 da rota individual, o encontro correspondente pode ser escolhido independentemente do percentual atual. A única trava estrutural preservada é uma saída presencial por noite global.


## v0.2.36 — convite desacoplado da execução do date
O convite autorado continua nas etapas 3/6, mas a escolha de resposta no chat apenas conclui a conversa. A reserva da única saída presencial da noite ocorre somente quando o jogador pressiona `IR PARA ENCONTRO`. Enquanto o date não for concluído, `routeStage` não avança. Isso permite manter várias rotas em paralelo, acumular convites e escolher em qual noite realizar cada saída sem perder diálogo ou conteúdo.

## v0.2.51 — apresentação dos Dates

Os marcos presenciais continuam sendo cenas lineares e sem escolhas. A autoria permanece em `content/narrative/outings.ts`; a interface de `/encontro/[sceneId]` pode subdividir um bloco longo de `paragraphs` em páginas de leitura sem modificar texto, ordem ou consequência narrativa.

Regras:
- DATE 1 corresponde ao marco de rota 3; DATE 2 ao marco 6.
- `beats` são usados apenas quando há uma transição autoral de ambiente/background; cada beat pode ser paginado visualmente.
- `continueLabel` do beat aparece somente no fim daquele beat.
- `outingMilestones`, avanço de `routeStage`, `completionFlag` e `routeAdvanceFlag` só são gravados ao concluir a última página da cena.
- Progresso temporário de leitura pode ser mantido em `sessionStorage`; isso não faz parte do save e não altera o schema v9.
- Um encontro já concluído não deve ser reexecutado por acesso manual à URL.


## Beta 1 v0.3.0-beta.12 — fim romântico + operação infinita

- O fim sistêmico da campanha social acontece quando **os sete personagens concluíram DATE 1 (marco 3) e DATE 2 (marco 6)**.
- A conclusão é derivada de `social.outingMilestones`; percentual legado e `routeStage` isolado não substituem os dois marcos presenciais.
- Ao completar o último romance, o jogo abre `/final` uma única vez e registra `campaign:all-romances-ending-seen`.
- A tela final é sistêmica e não inventa epílogo/cânone: apenas confirma as rotas concluídas e lista os dois Dates por agente.
- `CONTINUAR JOGANDO` volta ao NEXO. Na campanha completa, o jogador encerra a noite normalmente e o loop **Dispatch → Desenvolvimento → NEXO** continua indefinidamente usando a curva pós-Dia 6 já existente.
- `VOLTAR AO MENU` preserva o save; `CONTINUAR` não reabre a tela final depois que ela foi vista.
- Save schema permanece v10; a persistência usa flags já suportadas.
