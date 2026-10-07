# Auth Login Hotfix — Beta 1 v0.3.0-beta.14

Correção de regressão em que a interface podia deixar o usuário preso no cadastro. ENTRAR e CRIAR CONTA são modos independentes; ENTRAR usa e-mail + senha e possui CTA próprio. O cadastro possui fallback explícito `JÁ TENHO CONTA → ENTRAR`. Supabase, save schema v10 e gameplay não mudam.
