# Mobile Dispatch Rework — Beta 1 v0.3.0-beta.13

## Objetivo

O mobile não reutiliza mais a composição simultânea do desktop. A simulação é compartilhada, mas a apresentação mobile obedece à regra **uma superfície operacional principal por vez**.

## Fluxo

1. **Central** — chamados aguardando, missões em andamento e resultados disponíveis.
2. **Chamado** — descrição, risco, confiabilidade, janela e duração.
3. **Equipe** — agentes, FICHA, seleção, previsão e CTA de despacho.
4. **Resultado** — relatório em tela dedicada com Edison inline e ARQUIVAR RESULTADO.
5. **Agentes/NEXO** — superfícies próprias acessíveis pela navegação mobile.

## Regras

- Desktop continua usando IncidentRail + TacticalMap + OperationsChatRail + AgentRoster.
- `MissionBriefing` e `MissionResultModal` continuam sendo a implementação desktop.
- Mobile usa `MobileDispatchExperience` e `MobileMissionResult`, compartilhando exatamente o mesmo save, assessment e callbacks de simulação.
- FICHA e tutoriais bloqueantes continuam pausando o relógio operacional.
- Nenhuma chance, duração, afinidade, Ressonância, resultado, XP ou custo foi alterado.

## QA alvo

- 320 / 360 / 390 / 430 px.
- Central → chamado → equipe → FICHA → voltar → despachar.
- Resultado + Edison sem qualquer overlay concorrente.
- Caso ativo enquanto FICHA/tutorial bloqueante está aberto: relógio e deadline congelados.
