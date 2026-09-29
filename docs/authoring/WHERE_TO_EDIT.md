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

### Ocorrências
`content/incidents/day01.ts`

Cada ocorrência controla: título, distrito, confiabilidade, descrição, tags recomendadas, pesos de atributos, minuto de aparição, prazo, duração e risco.

**IDs são permanentes depois que uma ocorrência entra em save/teste.** Prefira criar um novo ID a renomear um já usado.

### Balanceamento
`content/config/balance.ts`

Edite: Vida/Energia base, custo de Sucesso/Sucesso com custo/Sucesso parcial/Falha, XP, XP por nível, teto de atributo, pontos recomendados e limites da chance estimada.

`content/config/gameplay.ts`

Edite: horário do turno, duração real, equipe mínima/máxima e quantidade de mensagens no NEXO.

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
- dias e condições em que a cena aparece.

`content/dialogues/post-shift/index.ts` é o registro de cenas disponíveis.

O jogador pode conversar com vários personagens na mesma noite ou encerrar sem falar com ninguém.

### Introdução e tutorial
- `content/narrative/introduction.ts`
- `content/narrative/tutorial.ts`

A introdução atual usa "Coordenação" como placeholder editorial, não como personagem canônico fechado.

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
