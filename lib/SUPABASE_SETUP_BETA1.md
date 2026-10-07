# SUPABASE — ATIVAÇÃO DA BETA 1

A Beta 1 usa uma conta simples apenas para identificar o jogador e sincronizar o save. Não há confirmação de e-mail, magic link, OAuth ou onboarding de conta.

## Configuração

1. Crie um projeto no Supabase.
2. Em **Authentication > Providers > Email**, mantenha Email habilitado e **desative Confirm email**.
3. Abra o SQL Editor e execute `supabase/migrations/001_beta1_game_saves.sql`.
4. Copie `.env.example` para `.env.local`.
5. Preencha `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
6. Reinicie `npm run dev`.
7. No menu principal, abra **CONTA / ACESSO**.

## Fluxo esperado

- **CRIAR CONTA**: nome de exibição + e-mail + senha -> conta criada -> login automático -> sincronização do save.
- **ENTRAR**: e-mail + senha -> sessão ativa -> sincronização do save.
- **JOGAR SEM CONTA**: save permanece somente no navegador.
- **ENCERRAR SESSÃO**: encerra a sessão Supabase; o save local continua no dispositivo.

Se `Confirm email` estiver ligado por engano, o jogo rejeita a criação sem sessão e informa exatamente qual configuração deve ser alterada. Não existe fluxo de confirmação de e-mail dentro da Beta 1.

A Beta 1 continua local-first: se Supabase não estiver configurado ou estiver offline, o gameplay continua salvando localmente. Se houver dois saves diferentes ao conectar uma conta, o jogo ainda pede **USAR LOCAL** ou **USAR NUVEM** para evitar perda acidental de progresso.

Detalhes técnicos e segurança: `docs/design/BETA1_SUPABASE_ARCHITECTURE.md`.
Checklist de staging/publicação: `docs/design/BETA1_RELEASE_CHECKLIST.md`.
