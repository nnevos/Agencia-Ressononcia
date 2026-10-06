# Beta 1 — Refatoração e otimização v0.3.0-beta.3

## Objetivo
Reduzir trabalho redundante da Central e da sincronização cloud sem alterar regras de gameplay, conteúdo autoral, balanceamento ou save schema.

## Mudanças
- `game/selectors/operationalHeroes.ts` centraliza a montagem de `OperationalHero` usada pela Central e DEV tools.
- `heroById` e `caseById` funcionam como índices compartilhados para evitar buscas lineares repetidas.
- `syncIncidentRuntime()` preserva referências quando nenhum incidente muda de estado.
- O relógio atualiza a UI a cada minuto diegético, mas o save só é persistido quando há transição operacional relevante: spawn/expiração/resolução/fim do turno.
- O primeiro tutorial deixa de regravar `startedAtEpochMs` a cada tick; o relógio é reancorado uma única vez no despacho.
- `writeLocalSaveRaw()` ignora payload idêntico, sem incrementar revisão e sem disparar sync cloud.
- `CloudSyncBridge` serializa uploads: no máximo um push em voo e um push pendente consolidado.
- UI não crítica da Central (DEV tools, Manual e modais) é carregada sob demanda.
- `MissionBriefing` foi dividido em componentes internos menores sem mudar a estrutura visual/funcional.

## Contratos preservados
- Save schema v10.
- `loadSave()` / `writeSave()` continuam sendo a fachada do gameplay.
- Supabase continua opcional e local-first.
- Nenhuma fórmula de Dispatch, XP, Ressonância, progressão social ou Date foi alterada.

## QA
- `npm run qa:flow:static`
- `npm run validate:social-assets`
- `npm run qa:beta1`
- `npm run qa:refactor`
