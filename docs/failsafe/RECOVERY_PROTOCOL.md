# RECOVERY PROTOCOL — v0.2.9

Se o chat/contexto for perdido:

1. usar o ZIP mais recente do projeto como fonte de verdade;
2. ler `PROJECT_CONTEXT.md`;
3. ler `EDIT_HERE.md` e `content/README.md`;
4. ler todos os arquivos em `docs/canon/`, `docs/authoring/`, `docs/design/` e `docs/failsafe/` antes de alterar código ou narrativa;
5. confirmar `package.json` versão **0.2.8** e save schema **v9** em `lib/save.ts`;
6. não reconstruir a partir do antigo `ressonancia-fase1-0.1.1`;
7. não apagar saves para contornar migração;
8. confirmar que Yuki D1–D6 vem de `content/dialogues/post-shift/yuki.ts`, não dos placeholders;
9. confirmar assets de mídia em `public/nexo/yuki/`;
10. confirmar que `PhoneDialogueEngine` suporta imagens e mensagens fixas data-driven, mas não contém falas específicas de Yuki;
11. antes do handoff, atualizar CURRENT_STATE, NEXT_SESSION, CHANGELOG e PROJECT_STATE.json.

## Sistemas que não devem ser revertidos
- banco de 48 casos e afinidades de poder;
- rotas individuais por personagem;
- campanha aberta pós-D6;
- uma etapa social por personagem por noite global;
- NEXO com scroll interno isolado;
- onboarding com Edison e primeiro despacho isolado;
- grupo operacional supervisionável / DMs privadas não supervisionadas;
- conteúdo autoral em `content/`.
