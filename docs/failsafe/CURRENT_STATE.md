# CURRENT STATE — v0.2.9 · NEXO paced delivery + romance sem hardlock

## Baseline
- Base funcional: v0.1.0 Foundation.
- Build incremental atual: **v0.2.9**.
- Save schema: **v9**.
- `content/` continua sendo a fonte oficial de autoria.

## Onboarding / Dispatch
- Fluxo v0.2.7 preservado: menu → onboarding de Edison → grupo NEXO → SDH → primeiro incêndio guiado → Dia 1 normal.
- Edison é homem e deve ser referido no masculino.
- Tutorial continua pulável e o primeiro chamado continua isolado.

## NEXO / Social
- Rotas são individuais por personagem e independentes do dia global.
- Cada personagem avança no máximo uma etapa de rota por noite global.
- Lista de contatos continua sem barra/ROTA; romance aparece apenas dentro da conversa.
- DMs privadas suportam **fotos autoradas**, com visualização ampliada dentro do NEXO.
- O schema de diálogo suporta mensagens fixas do Analista antes/depois de mensagens do personagem, sem hardcode em React (`openingOutgoing`, `prefaceOutgoing`, `afterIncoming`, `afterResponse`).
- Sequências fixas agora chegam **uma bolha por vez**, com pausa/indicador de digitação; as opções só aparecem depois do fim da sequência corrente.
- Romance 0–100% é feedback visual e continua recebendo pontos 100/50/30, mas **não bloqueia** as saídas das etapas 3 e 6.
- O scroll continua isolado ao histórico interno.

## Yuki — primeira rota autorada real
- Estágios 1–6 de Yuki substituem os placeholders de QA por texto autoral aprovado.
- Estágio 2 usa foto de energético.
- Estágio 3 usa foto pós-missão e abre a primeira saída na cafeteria.
- Estágio 6 usa foto em casa e abre o segundo date no apartamento.
- Dates 3/6 usam os textos enviados pelo autor em `content/narrative/outings.ts`.
- Placeholders de recuperação 7–10 de Yuki permanecem apenas para QA de rota lenta quando o segundo marco ainda não foi concluído; ficam bloqueados após o segundo date.
- As outras seis rotas continuam placeholder de QA.

## Assets novos
- `public/nexo/yuki/energetico-dia2.jpg`
- `public/nexo/yuki/pos-missao-dia3.jpg`
- `public/nexo/yuki/casa-dia6.jpg`

## Cânone / AU
- Fundamentos pessoais e ritmos românticos dos sete foram registrados na Bíblia markdown.
- `RESSONANCIA_BIBLIA_AU_V3_4_LORE_ROTAS.docx` foi incorporada ao projeto.
- Yuki: slow burn baseado em experiências → amizade → romance.

## Validação
- TypeScript completo continua limitado pela ausência de pacotes React/Next no ambiente da entrega.
- Nenhum save reset foi introduzido; schema continua v9.
