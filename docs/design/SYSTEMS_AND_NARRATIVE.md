# Sistemas e narrativa — referência de implementação

## Loop final pretendido
Ocorrência → leitura de informação imperfeita → consulta de estado/histórico → equipe + postura → despacho → simulação → relatório explicável → consequências → conversa/recuperação/treino → novas flags → próximo problema.

## Ressonância
Qualidade de cooperação considera compatibilidade funcional, confiança, familiaridade, tensão, condição e contexto. O protótipo futuro deve preferir efeitos discretos/explicáveis a multiplicadores opacos. Relações entre heróis são diferentes da relação Analista↔herói, mas podem se influenciar narrativamente.

## Relação Analista↔herói
Campos-base: trust, professionalRespect, intimacy, tension, attraction, romanceStarted, relationshipStatus, flags. Nenhum campo isolado significa “amor”. Rotas devem aceitar amizade/profissionalismo como resultados completos.

## Ponte Dispatch ↔ VN
Toda cena importante pode ler: último incidente, quem foi enviado, postura, resultado, fadiga/ferimento, flags, histórico de escolhas e relações. Toda escolha narrativa relevante pode escrever flags/modificadores que afetem comunicações, disponibilidade, confiança, Ressonância ou opções futuras.

## Estado humano
Fadiga, ferimentos, estresse, confiança, trauma/preferências e relações alteram eficiência. O jogador administra pessoas, não peças.

## Ocorrências
Dados devem suportar localização, gravidade/prioridade, tempo, confiabilidade, civis/objetivos, tags/capacidades, variáveis ocultas e consequências. O desafio cresce por simultaneidade e incerteza, não apenas números maiores.

## Progressão
Horizontal: novas aplicações dos poderes, protocolos, especialidades, inteligência, medicina, treino e novas abordagens conjuntas. Cidade e reputação devem lembrar decisões.

## Escopo do vertical slice
Implementar primeiro Yuki, Elysia e Lysandro em profundidade para provar a arquitetura. Isso é escopo de produção, não mudança de elenco final: todos os sete permanecem previstos.
