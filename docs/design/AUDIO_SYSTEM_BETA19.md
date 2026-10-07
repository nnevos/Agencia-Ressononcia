# AUDIO SYSTEM — Beta 1 v0.3.0-beta.19

## Escopo
- `/agencia`: `Aphex Twin - Tha`, loop.
- `/conversa`: `Aphex Twin - Delphium`, loop.
- Demais rotas: sem música ambiente por enquanto.

## Volume
- Preferência global local `musicVolume` em `ressonancia.settings`.
- Padrão para instalação/preferência antiga: `0.1` (10%).
- Faixa aceita: 0–1; UI expõe 0–100%.
- O volume não faz parte do save de campanha nem do sync Supabase.

## Autoplay
Browsers podem bloquear reprodução iniciada sem gesto. O player tenta tocar ao entrar na rota e repete a tentativa em `pointerdown`/`keydown`, sem lançar erro para o usuário.

## GitHub Pages
Assets passam por `publicPath()` para respeitar `NEXT_PUBLIC_BASE_PATH`.

## Distribuição
Os MP3 foram fornecidos diretamente para o projeto nesta sessão. Antes de distribuição pública ampla, o responsável pelo projeto deve confirmar que possui permissão/licença para redistribuí-los.
