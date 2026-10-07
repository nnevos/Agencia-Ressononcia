# Playtest automatizado — Ressonância v0.2.58

Ferramenta de QA separada do gameplay. Nada em `qa/playtest/` é importado por `app/`, `game/` ou `content/`.

## O que testa

- gate explícito do Date (`IR PARA ENCONTRO` -> `?launch=1`);
- bloqueio de URL manual sem autorização;
- reload no meio do Date;
- sair do Date sem concluir e reentrar;
- milestone/`routeStage` após conclusão;
- replay e QA preview sem mutação de progresso;
- Noites 1–7 do modo Só pós-expediente;
- guards contra entrada indevida em Introdução/Central/Desenvolvimento;
- execução em Chromium desktop e viewport mobile 390 px;
- screenshots, trace e vídeo são preservados quando um teste falha.

## Um clique no Windows

Na raiz do projeto, execute `TESTAR_JOGO.bat`.

Ele faz, nesta ordem:
1. auditoria estática;
2. `npm ci` do jogo;
3. instalação das dependências deste harness;
4. instalação do Chromium do Playwright;
5. playtests E2E.

## Manual

```bash
npm run qa:flow:static
npm ci
npm --prefix qa/playtest install
npm --prefix qa/playtest run install-browser
npm run qa:playtest
```

Relatório HTML: `qa/playtest/reports/html/index.html`.

## Interpretação

`PASS` significa que o fluxo observado corresponde aos invariantes atuais do projeto. `FAIL` deve ser tratado como regressão potencial até inspeção do trace. O harness não altera cânone, texto autoral, balanceamento nem save schema.
