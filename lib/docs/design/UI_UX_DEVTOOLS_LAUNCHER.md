# UI/UX, Dev Tools e launcher — v0.5.0

## Direção visual

A tela de despacho usa a linguagem de uma central operacional: informação densa, escura, técnica e legível, com ciano para sistemas/seleção, vermelho para prioridade crítica, laranja para atenção e verde para disponibilidade.

Desktop principal:

`Chamados | Mapa tático | Heróis`

Na parte inferior existe um dock persistente:

`Equipe 1–3 | Análise qualitativa | Botão DESPACHO`

A interface evita porcentagem de sucesso antes da missão. O jogador recebe sinais como Ressonância, falta de mobilidade, fadiga, conflito e especialidades.

## Dev Tools

Botão `DEV`, canto inferior direito.

Ações atuais:
- +30 minutos de jogo;
- +1 hora;
- +3 horas;
- ir para 18:00 e resolver retornos possíveis;
- pular direto para o pós-expediente (também limpa relatórios pendentes para teste narrativo);
- resetar o expediente atual.

Dev Tools alteram o save real. Em versão release devem ser escondidas por configuração, não deletadas.

## Launcher Windows

Arquivo: `Ressonancia.exe`.

Comportamento:
1. localiza a própria pasta;
2. usa essa pasta como diretório de trabalho;
3. executa `npm run dev` com janela oculta;
4. aguarda aproximadamente 3,2 segundos;
5. abre `http://localhost:3000` no navegador padrão.

Pré-requisitos: Node.js/npm instalados e `npm install` já executado na pasta pelo menos uma vez.

Este launcher é de desenvolvimento. Não é ainda um empacotamento desktop completo; Electron/Tauri só deve ser considerado quando o core loop e a arquitetura estiverem mais estáveis.
