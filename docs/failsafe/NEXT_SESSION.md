# NEXT SESSION — Beta 1 · v0.3.0-beta.27

Hotfix de briefing desktop para viewport baixa implementado em 2026-10-07 após feedback visual em ~1365×605. QA estático passou; o próximo gate é visual/runtime. Não criar feature nova antes dele.

1. Publicar beta.27 e reproduzir primeiro em viewport próxima de 1365×605: abrir uma ocorrência e confirmar que narrativa, requisitos, mensagens e seleção permanecem alcançáveis por scroll, com cabeçalho e DESPACHAR EQUIPE acessíveis.
2. Revalidar o briefing em 1280×720, 1366×768, 1920×1080 e ultrawide.
3. Confirmar que o NEXO desktop/Configurações da beta.26 continua sem sobreposição em lista, conversa, Fotos e Dates.
4. Revalidar o NEXO/briefing mobile em 320/360/390/430 px para confirmar que os hotfixes mobile foram preservados.
5. Continuar o smoke de save cloud entre dispositivos quando houver Supabase staging/browser disponível.
6. Preservar save schema v10, Supabase, Dates, regras sociais, autoria e cânone existentes.
