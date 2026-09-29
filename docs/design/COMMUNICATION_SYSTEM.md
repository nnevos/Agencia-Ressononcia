# Sistema de Comunicação — NEXO (v0.9.6)

## Princípio
O celular/app NEXO é a interface social principal da AU de Ressonância. Ele liga a camada de trabalho à camada narrativa sem tirar o Analista de sua função.

## Durante o expediente
- Canal: `NEXO // AGÊNCIA // OPERAÇÕES`.
- O Analista fica em **somente leitura**.
- Heróis podem comentar chamados ainda aguardando despacho.
- Equipes despachadas confirmam saída, chegada e mudanças relevantes no cenário.
- Mensagens devem poder antecipar informação imperfeita, tensão, Ressonância e consequências, sem substituir o relatório final.
- Não existe caixa de texto do jogador durante o expediente. A interação do jogador é despachar e administrar a Central.

## Pós-expediente
- O mesmo NEXO abre conversas privadas.
- O jogador escolhe respostas e essas escolhas alteram confiança, respeito, intimidade, tensão e atração.
- Personagens podem iniciar conversas espontaneamente conforme flags, relações, missões e arcos.

## Presencial / VN
Cenas presenciais continuam existindo, mas devem ser mais raras e significativas: encontros, convites, conflitos importantes, romance, eventos de rota e marcos de campanha. A transição do celular para uma cena presencial deve parecer um acontecimento.

## UI da Central
1. **Esquerda — Ocorrências**: novos chamados, urgência, prazo, missões em andamento, heróis enviados, progresso e retorno.
2. **Centro — Mapa**: posição espacial e estado geral da cidade.
3. **Direita — NEXO**: voz dos personagens e atualizações em tempo real.
4. **Centro inferior — Agentes**: disponibilidade e acesso ao dossiê.

## Atualização v0.1.0 — autoria controlada
- Textos operacionais vivem em `content/messages/operations.ts`.
- Conversas privadas vivem em `content/dialogues/post-shift/`.
- O autor controla palavra por palavra tanto a mensagem do personagem quanto cada opção de resposta do Analista.
- O hub pós-expediente lista todas as cenas disponíveis; conversar é opcional e não encerra automaticamente a noite.
- Mensagens ambientais não relacionadas a eventos podem ser agendadas por dia/minuto em `ambientMessages`.
