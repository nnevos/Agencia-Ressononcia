@echo off
setlocal
cd /d "%~dp0"
echo ================================================
echo RESSONANCIA - TESTE DE FLUXO E GAMEPLAY
echo ================================================
echo.

echo [1/5] Auditoria estatica...
node scripts\qa-flow-static.mjs
if errorlevel 1 goto :fail

echo.
echo [2/5] Instalando dependencias do jogo...
call npm ci --no-audit --no-fund
if errorlevel 1 goto :fail

echo.
echo [3/5] Instalando harness de playtest...
call npm --prefix qa\playtest install --no-audit --no-fund
if errorlevel 1 goto :fail

echo.
echo [4/5] Garantindo Chromium de teste...
call npm --prefix qa\playtest run install-browser
if errorlevel 1 goto :fail

echo.
echo [5/5] Rodando playtest automatizado...
call npm run qa:playtest
if errorlevel 1 goto :fail

echo.
echo ================================================
echo TODOS OS TESTES PASSARAM.
echo Relatorio: qa\playtest\reports\html\index.html
echo ================================================
pause
exit /b 0

:fail
echo.
echo ================================================
echo O TESTE ENCONTROU UMA FALHA OU NAO CONSEGUIU RODAR.
echo Veja a mensagem acima e qa\playtest\reports\ quando existir.
echo ================================================
pause
exit /b 1
