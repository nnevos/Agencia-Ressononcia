# Beta 1 — release checklist

## Arquitetura
- [x] gameplay desacoplado do backend por contratos de persistência;
- [x] save local-first preservado;
- [x] Supabase Auth implementado atrás de adapter;
- [x] save cloud implementado atrás de `RemoteSaveStore`;
- [x] RLS/migration versionada no repositório;
- [x] conflito local/cloud exige decisão explícita;
- [x] modo convidado continua funcionando sem configuração externa;
- [x] schema de save permanece v10.

## Produto
- [x] build identificada como `BETA 1 · v0.3.0-beta.2`;
- [x] menu de conta deixa de ser mock/preview e usa backend real quando configurado;
- [x] export/import manual continua disponível como recuperação;
- [x] tutorial/Dispatch/NEXO/Desenvolvimento permanecem desacoplados da rede.

## Gate antes de publicar externamente
- [ ] executar migration em projeto Supabase de staging;
- [ ] configurar `.env.local`/hosting com URL + anon key;
- [ ] signup com e sem confirmação de e-mail;
- [ ] login, refresh de token e logout;
- [ ] criar save local sem conta e depois vincular a uma conta;
- [ ] testar upload automático após progresso;
- [ ] abrir a mesma conta em segundo navegador e baixar save cloud;
- [ ] produzir conflito intencional e testar `USAR LOCAL` / `USAR NUVEM`;
- [ ] simular offline durante gameplay e reconexão posterior;
- [ ] validar migração v9→v10 e import/export manual;
- [ ] executar golden path completo do tutorial em desktop/mobile;
- [ ] concluir QA E2E/browser pendente da v0.2.65.
