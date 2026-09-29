# CURRENT STATE — v0.1.0 Foundation

## Estado

Baseline refatorado e organizado a partir da v0.9.14 funcional.

## Implementado

- Central 20/60/20: ocorrências, mapa/roster, NEXO.
- expediente 08:00–18:00 em 15 minutos reais.
- ocorrências sobrepostas e despacho assíncrono.
- briefing probabilístico com requisitos e chance estimada.
- resultados integrados à fila operacional.
- retratos oficiais dos sete heróis.
- cinco atributos 1–5.
- Vida = 9 + Vigor; Energia = 9 + Agilidade.
- DESMAIADO em 0 Vida/Energia até o dia seguinte.
- XP, níveis 1–6, técnicas e Desenvolvimento.
- Ressonância e combos.
- NEXO somente leitura durante trabalho.
- pós-expediente com hub de conversas: falar com vários, um ou nenhum personagem.
- introdução/tutorial data-driven inicial.
- menu principal data-driven inicial.
- save local v6 com migração.
- launcher Windows preservado.

## Refatoração v0.1.0

Nova pasta `content/` é a fonte oficial de autoria:
- `characters/`
- `incidents/`
- `messages/`
- `dialogues/post-shift/`
- `narrative/`
- `relationships/`
- `config/`
- `ui/`

Motores ficam em `game/`. React não deve conter narrativa específica quando ela puder ser externalizada.

## Limitações atuais

- agenda de ocorrências ainda usa o conjunto do Dia 1 como conteúdo principal do protótipo;
- introdução usa `Coordenação` como placeholder editorial, não NPC canônico final;
- não há backend/cloud save;
- cidade/reputação ainda não tem camada completa;
- modificadores ocultos de ocorrência ainda não são sistema completo;
- cenas presenciais VN especiais ainda precisam de pipeline de conteúdo próprio;
- conteúdo pós-expediente atual é inicial/playtest e deve ser reescrito pelo autor quando desejado.

## Validação

A camada `content/validate.ts` verifica em desenvolvimento IDs duplicados básicos, personagens inexistentes em cenas e tempos inválidos de ocorrência.

## Validação do handoff v0.1.0
- TypeScript completo: **PASSOU** (`tsc --noEmit`) usando dependências compatíveis já presentes no ambiente.
- Next build: iniciou, mas foi bloqueado pela tentativa do Next de baixar `@next/swc-linux-x64-gnu` sem acesso de rede (`EAI_AGAIN registry.npmjs.org`). Não houve erro de código antes desse bloqueio.
