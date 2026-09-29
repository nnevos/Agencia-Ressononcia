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

## Atualização v0.1.1 — NEXO como mensageiro multi-chat
- O pós-expediente usa uma interface persistente de mensageiro: lista de conversas à esquerda e conversa ativa à direita no desktop; lista/chat em telas estreitas.
- Abrir uma DM não bloqueia a navegação. O jogador pode entrar, sair e alternar entre contatos sem encerrar a noite.
- Conversas respondidas permanecem consultáveis como histórico durante o pós-expediente, em vez de desaparecerem da interface.
- A lista de contatos pode ser pesquisada e mostra prévia da última mensagem autorada, horário e estado de leitura/resposta.
- Respostas continuam estritamente autoradas em `content/dialogues/post-shift/`: o jogador seleciona uma opção escrita, ela entra no compositor e só é aplicada ao save ao enviar.
- Enviar uma resposta conclui a cena correspondente e aplica seus efeitos/flags; trocar de chat não cria texto narrativo novo.
- Retratos oficiais são usados em lista e cabeçalho, com iniciais apenas como fallback técnico.

## Atualização v0.1.2 — NEXO long-form e campanha romântica

### Histórico contínuo
- O NEXO agrupa cenas por personagem: um contato corresponde a um histórico contínuo, mesmo quando existirem cenas em vários dias.
- Uma cena pode ter vários turnos sequenciais (`followUps`), permitindo conversas longas sem criar uma rota/tela nova para cada troca.
- O histórico deve rolar automaticamente para a mensagem mais recente ao abrir o chat e quando uma nova mensagem/resposta entra.
- Se o jogador subir para reler mensagens antigas, a UI oferece retorno rápido ao fim do histórico.
- O compositor e o cabeçalho permanecem estáveis enquanto somente a área de mensagens rola.

### Cadência de campanha (direção, não molde obrigatório)
A campanha romântica usa seis dias como referência de escalada, mas cada personagem pode acelerar, atrasar ou reinterpretar o ritmo conforme personalidade, flags e contexto:
- Dia 1: conhecer melhor o personagem / backstory;
- Dia 2: conversa leve, cotidiana, piadas e intimidade informal;
- Dia 3: possibilidade de combinar uma saída presencial;
- Dia 4: repercussão do encontro anterior e início/avanço de flerte;
- Dia 5: flerte forte;
- Dia 6: possibilidade de date presencial.

Essa sequência não obriga todos os personagens a flertarem no mesmo momento. Alguns podem demonstrar interesse mais cedo; outros precisam de mais confiança, intimidade ou contexto.

### Respostas e progresso romântico
- Cada turno autorado continua oferecendo três respostas.
- As três respostas recebem peso romântico determinístico `100 / 50 / 30`, representando melhor encaixe, encaixe intermediário e encaixe fraco para a rota romântica. Não é uma rolagem aleatória.
- O progresso romântico começa em `0%` por personagem e é separado dos eixos de confiança, respeito, intimidade, tensão e atração.
- O orçamento romântico atual é distribuído pelos turnos da cena; conversas maiores não dão vantagem automática apenas por terem mais mensagens.
- Meta de rota: pelo menos `35%` para a saída exclusiva do Dia 3 e `75%` para o date/saída exclusiva do Dia 6.
- O romance é opcional. O jogador pode não escolher ninguém e chegar ao fim sem par romântico.

### Exclusividade dos encontros presenciais
- No Dia 3 o jogador pode escolher no máximo um personagem para a saída presencial.
- No Dia 6 o jogador pode escolher no máximo um personagem para o date/saída presencial.
- Conversar com outros personagens continua permitido; a exclusividade bloqueia apenas o encontro daquele marco.
- A escolha é persistida no save e deve ser feita por conteúdo autorado, nunca por texto gerado pelo motor.

### Presencial / VN
- Convites e encontros dos Dias 3 e 6 devem sair do NEXO para uma cena presencial/VN quando houver conteúdo autorado para isso.
- O sistema de diálogo possui gancho (`vnSceneId`) para futura transição, mas não inventa a cena.

## Atualizacao v0.1.3 — persistencia total de contatos e cenas presenciais data-driven

- Um contato nao desaparece quando o dia muda, mesmo se a mensagem do dia anterior ficou sem resposta.
- O historico mostra cenas passadas da thread; cenas futuras continuam ocultas.
- O pacote de desenvolvimento inclui placeholders D2–D6 para todos os sete personagens. Eles existem apenas para QA e devem ser substituidos por autoria final preservando IDs sempre que possivel.
- Escolhas com `vnSceneId` podem abrir `/encontro`, uma tela presencial generica alimentada por conteudo.
- A cena presencial recebe background, titulo, paragrafos, personagem, dia e flag de conclusao via `content/narrative/outings.ts`.
- O objetivo arquitetural e chegar ao estado CONTENT-READY: depois disso, completar a campanha deve exigir somente arquivos de conteudo, assets e QA, nao novas telas por personagem.


## Atualização v0.1.4 — afinidade por mensagem e placeholders

Todo texto atual de agentes é conteúdo PLACEHOLDER de QA até a entrega do roteiro final. O progresso romântico deixa de dividir um orçamento pelo número de turnos: cada resposta concede pontos fixos (100=7, 50=5, 30=3) até um teto de 18 por personagem/dia. Isso permite conversas extensas sem punir cenas longas e sem permitir farm infinito. A resposta que aceita uma saída/date conta para o threshold.

`ENCERRAR NOITE` deve permanecer acessível mesmo com chat aberto e em mobile. Conversar é opcional e nunca é requisito para avançar o dia.

## v0.1.5 - scroll de historico isolado
O autoscroll do NEXO deve atuar somente no elemento rolavel do historico (`phoneChatHistory`/`nexoChatWallpaper`). Nunca usar `scrollIntoView` no marcador final, pois navegadores podem deslocar ancestrais e tirar header, lista de conversas e compositor da viewport. A lista de contatos, o header da conversa e o compositor permanecem fixos; somente o historico interno rola.

Cenas placeholder de QA dos Dias 1-6 existem apenas para validar motor e serao substituidas pela autoria final em `content/`.

## Atualização v0.2.4 — privacidade corporativa
O NEXO funciona como um mensageiro corporativo. O grupo `Guerreiros Elementais` e o canal `AGÊNCIA // OPERAÇÕES` são espaços de trabalho e podem ser supervisionados pela Agência. As DMs privadas entre o Analista e cada herói não são supervisionadas pela Agência. A interface e o texto de onboarding devem deixar essa distinção clara sem transformar a conversa privada em canal operacional.
