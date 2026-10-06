# Auth mobile hotfix — Beta 1 v0.3.0-beta.6

## Problema
Em pelo menos um dispositivo, a tela de acesso aceitava interação no modo ENTRAR, mas o controle CRIAR CONTA não respondia ao toque.

## Decisão
O seletor de autenticação deve ser robusto a touch e independente de submissão de formulário:
- ENTRAR e CRIAR CONTA são `button type="button"` reais;
- cada botão possui área mínima confortável e `touch-action: manipulation`;
- os controles têm camada interativa explícita (`pointer-events`/`z-index`);
- em telas estreitas ficam empilhados;
- existe um segundo atalho textual no formulário para trocar de modo.

## Não alterado
Auth Supabase, políticas RLS, contrato de save cloud, save schema v10, nome do Analista e gameplay.
