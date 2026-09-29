# RECOVERY PROTOCOL — v0.2.6

Se o chat/contexto for perdido:

1. usar o ZIP mais recente do projeto como fonte de verdade;
2. ler `PROJECT_CONTEXT.md`;
3. ler `content/README.md` e `docs/authoring/WHERE_TO_EDIT.md`;
4. ler `docs/canon/*` antes de escrever personagem;
5. ler `docs/failsafe/CURRENT_STATE.md` e `NEXT_SESSION.md`;
6. confirmar `package.json` versão 0.2.6 e save schema v9 em `lib/save.ts`;
7. não reconstruir a partir do antigo `ressonancia-fase1-0.1.1`;
8. não apagar saves para contornar migração;
9. antes do handoff, atualizar CURRENT_STATE, NEXT_SESSION, CHANGELOG e PROJECT_STATE.json.


## v0.2.1

Ao recuperar o projeto, confirmar também que `content/incidents/caseBank.ts` possui 48 casos, `dailyPool.ts` está ativo e `game/data/incidents.ts` aponta para o banco novo. O antigo `day01.ts` não é mais a agenda runtime.
