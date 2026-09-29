# ARQUITETURA DO PROJETO — BASELINE v0.1.0

## Camadas

### `content/` — autoria
Dados editáveis pelo autor. História, eventos, falas, respostas, personagens e balanceamento.

### `game/` — regras
Interpreta os dados de `content/`: turno, resolução, Vida/Energia, progressão, Ressonância e operações.

### `components/` — peças de interface
HeroCard, radar, motores de diálogo etc. Não devem conter conteúdo narrativo específico.

### `app/` — telas
Central, desenvolvimento, pós-expediente, introdução, login/menu. Devem consumir conteúdo e motores.

### `lib/` — infraestrutura
Save e futuras integrações.

### `docs/` — design, cânone, autoria e failsafe
Fonte humana de continuidade.

## Compatibilidade

Arquivos antigos em `game/data/heroes.ts`, `game/data/incidents.ts` e outros podem existir como re-exports. A fonte oficial está em `content/`.

## Regra para novas funcionalidades

Antes de adicionar texto hardcoded em React, perguntar: "isso é conteúdo editável?" Se sim, criar dado em `content/` e fazer a UI consumi-lo.
