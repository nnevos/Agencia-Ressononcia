# SUPABASE — ATIVAÇÃO DA BETA 1

1. Crie um projeto no Supabase.
2. Abra o SQL Editor e execute `supabase/migrations/001_beta1_game_saves.sql`.
3. Copie `.env.example` para `.env.local`.
4. Preencha:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Reinicie `npm run dev`.
6. No menu principal, abra **CONTA / ACESSO** e crie/entre em uma conta.

A Beta 1 é local-first: se Supabase não estiver configurado ou estiver offline, o gameplay continua salvando localmente. O primeiro conflito entre um save local e um save remoto nunca é resolvido silenciosamente: escolha **USAR LOCAL** ou **USAR NUVEM**.

Detalhes técnicos e segurança: `docs/design/BETA1_SUPABASE_ARCHITECTURE.md`.
Checklist de staging/publicação: `docs/design/BETA1_RELEASE_CHECKLIST.md`.
