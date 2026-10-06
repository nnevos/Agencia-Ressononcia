# ONDE EDITAR CADA COISA

Este é o guia rápido para autoria de RESSONÂNCIA.

## Regra principal

**Se você quer mudar o que o jogador lê, escolhe ou encontra, procure primeiro em `content/`.**

Não edite componentes React para trocar fala, descrição de ocorrência, atributo inicial, XP ou texto de tutorial.

## Mapa rápido

### Personagens
`content/characters/heroes.ts`

Edite: nome, poder, classe, trilha, estilo, tags, descrição, pontos fortes, limitações, atributos iniciais e técnicas.

Retratos: `content/characters/portraits.ts`.

### NEXO operacional contextual
`content/messages/operations.ts`

Edite `eventComments` para o comentário de cada caso, `affinityMissionLines` para afinidades explícitas, `specialtyMissionLines` para respostas por tag, `pairDialogue` para pares autorados, `teamTemplates` para fallbacks de equipe e `outcomeLines`/`teamOutcomeReactions` para retornos. A lógica de prioridade fica em `game/data/operationsChat.ts`; não coloque fala narrativa diretamente no componente React.

Documento de revisão: `docs/authoring/chat-scripts/NEXO - Guerreiros Elementais.docx`.

### Ocorrências
`content/incidents/caseBank.ts` + `content/incidents/dailyPool.ts`

Cada ocorrência controla: título, distrito, confiabilidade, descrição, tags recomendadas, pesos de atributos, prazo, duração, risco, faixa, `minDay`, `weight`, `cooldownDays` e afinidades contextuais de poder. O minuto de aparição é gerado pelo `dailyPool.ts` para o expediente sorteado.

**IDs são permanentes depois que uma ocorrência entra em save/teste.** Prefira criar um novo ID a renomear um já usado.

### Balanceamento
`content/config/balance.ts`

Edite: Vida/Energia base, custo de Sucesso/Sucesso com custo/Sucesso parcial/Falha, XP, XP por nível, teto de atributo, pontos recomendados e limites da chance estimada.

`content/config/gameplay.ts`

Edite: horário do turno, duração real, equipe mínima/máxima e quantidade de mensagens no NEXO.

`content/config/social.ts`

Edite: orçamento romântico por dia, thresholds dos encontros e pesos mecânicos do sistema social.

### Mensagens durante o expediente
`content/messages/operations.ts`

- `eventComments`: falas disparadas por uma ocorrência específica.
- `missionLines`: saída/chegada/atualização de missão por personagem.
- `ambientMessages`: conversa no grupo que não depende de ocorrência.

O Analista permanece somente leitura durante o expediente.

### Pós-expediente
`content/dialogues/post-shift/`

Cada personagem tem seu próprio arquivo. Você controla exatamente:
- mensagem inicial;
- contexto se foi/não foi enviado;
- texto de cada resposta do jogador;
- resposta do personagem;
- alterações de confiança/respeito/intimidade/tensão/atração;
- flags;
- dias e condições em que a cena aparece;
- `romanceAffinity: 100 | 50 | 30`;
- turnos extras em `followUps` para conversas longas;
- `exclusiveOutingDay: 3 | 6` para marcar a oferta de encontro no fim do chat;
- `vnSceneId` como destino do CTA persistente `IR PARA ENCONTRO`.

`content/dialogues/post-shift/index.ts` é o registro de cenas disponíveis.

O jogador pode conversar com vários personagens na mesma noite ou encerrar sem falar com ninguém.

### Introdução e tutorial
- `content/narrative/introduction.ts`
- `content/narrative/tutorial.ts`

Edison é [AU-APROVADO] como supervisor do onboarding do Dia 1; falas e sequência ficam em `content/narrative/introduction.ts`.

### Menu
`content/ui/menu.ts`

Textos do menu inicial e rótulos principais.

### Ressonância
`content/relationships/resonance.ts`

Valores iniciais por dupla e combos especiais.

## O que NÃO editar para mudar conteúdo

- `game/simulation/*`: motores de tempo, condição e resolução.
- `app/*`: telas/roteamento.
- `components/*`: componentes reutilizáveis.
- `lib/save.ts`: save/migração.

Só altere esses arquivos quando a regra do sistema em si mudar.

### Cenas presenciais / saidas / dates
`content/narrative/outings.ts`

A tela `/encontro` e generica. Para trocar uma saida/date, edite somente:
- titulo;
- background;
- paragrafos descritivos;
- label de continuar;
- flag/ID quando estiver criando uma cena realmente nova.

Os placeholders D2–D6 e os encontros atuais estao marcados como `PLACEHOLDER`. Ao receber texto final, prefira manter IDs de cena, turno e escolha para preservar saves de teste.


### Banco v0.2.1

- `caseBank.ts`: edite o conteúdo e os parâmetros de cada um dos 48 casos aprovados.
- `dailyPool.ts`: edite composição respiro/normal/pressão/pico e regras de sorteio.
- `powerAffinityHeroIds`: lista opcional de heróis cujo poder tem vantagem contextual forte no caso. Não use para tornar um personagem obrigatório.
- peso 3 = ESSENCIAL; 2 = IMPORTANTE; 1 = APOIO.


### Nome/pronomes do protagonista
A interpolação é centralizada em `lib/playerText.ts`. Não faça novos `.replaceAll("{{playerName}}", ...)` nos componentes. Em conteúdo, preserve “Analista” quando for cargo; em narração ou tratamento pessoal, adapte contextualmente e prefira neutralidade.
