# Pausa contextual do relógio — Beta 1 v0.3.0-beta.8

## Objetivo
Dar tempo real de leitura ao jogador sem penalizar deadlines ou duração de missão quando uma superfície bloqueante da Central está aberta.

## Superfícies que pausam
- FICHA / dossiê de qualquer agente na Central.
- Tutorial progressivo bloqueante de Ressonância.
- Tutorial progressivo bloqueante de Combo.
- Tutorial progressivo bloqueante de Condição.

## Regra
A pausa é de UX, não de balanceamento. Enquanto ativa, `advanceOperationalState` não roda pelo tick de 1s. Ao fechar a última superfície bloqueante, `startedAtEpochMs` recebe o tempo real total da pausa, de forma que o relógio retome do minuto em que parou.

## Escopo preservado
- Nenhuma alteração em chance de missão, energia, vida, Ressonância, XP ou duração nominal.
- Save schema permanece v10.
- Primeiro caso continua com sua trava própria de tutorial.
- A pausa não é um botão manual e não existe fora dessas superfícies de leitura.

## QA obrigatório
1. Abrir FICHA com ocorrência aguardando e manter 30s aberta: hora/deadline não podem avançar.
2. Fechar FICHA: relógio retoma sem salto.
3. Abrir tutorial de Ressonância/Combo/Condição e repetir o teste.
4. Testar desktop e 360/390/430 px.
