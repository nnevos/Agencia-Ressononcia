#!/usr/bin/env sh
set -eu
cd "$(dirname "$0")"
echo "RESSONANCIA - TESTE DE FLUXO E GAMEPLAY"
node scripts/qa-flow-static.mjs
npm ci --no-audit --no-fund
npm --prefix qa/playtest install --no-audit --no-fund
npm --prefix qa/playtest run install-browser
npm run qa:playtest
printf '\nTodos os testes passaram. Relatorio: qa/playtest/reports/html/index.html\n'
