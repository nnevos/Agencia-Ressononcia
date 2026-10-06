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


## Central consolidada — v0.2.26
A rota `app/agencia/page.tsx` deve permanecer como orquestradora. Componentes visuais específicos da Central vivem em `components/agency/`; o CSS ativo da Central vive em `app/agencia/agency.css`. Não mover regras de simulação para essa camada.


## Player text interpolation
`lib/playerText.ts` é a única camada responsável por resolver nome, pronomes e flexões excepcionais do protagonista. O save armazena a escolha de pronomes; componentes consomem `formatPlayerText`, enquanto `content/` continua armazenando texto autoral com tokens declarativos.


## Beta 1 — persistência e Supabase

A autoria e o motor **não** devem importar Supabase diretamente. O caminho obrigatório é:

`gameplay/content -> lib/save.ts -> persistência local -> CloudSyncBridge -> RemoteSaveStore/Supabase`

- `lib/save.ts` continua sendo a única fachada do save usada pelas telas.
- `lib/persistence/contracts.ts` contém os contratos de backend.
- `lib/supabase/*` é infraestrutura substituível e não pode conter regra narrativa/gameplay.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` pode existir no cliente; `service_role` nunca.
- Conteúdo autoral/cânone não deve ser movido para Supabase como parte desta arquitetura.
