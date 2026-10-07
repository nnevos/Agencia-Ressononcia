# Beta 1 — arquitetura Supabase e persistência local-first

## Objetivo

A Beta 1 mantém o gameplay independente de rede e prepara conta/save cloud sem espalhar chamadas de backend pelas telas.

## Princípio

**Local primeiro, nuvem como sincronização.**

- O gameplay continua chamando `loadSave()` / `writeSave()` de `lib/save.ts`.
- `lib/save.ts` valida/migra o schema do jogo e delega o armazenamento bruto para `lib/persistence/localSaveStore.ts`.
- Cada escrita local atualiza metadados separados (`revision`, `updatedAt`) e emite `ressonancia:save-written`.
- `CloudSyncBridge` observa essas escritas e sincroniza em background somente quando há uma conta Supabase autenticada e explicitamente vinculada ao save.
- Sem internet, sem variáveis de ambiente ou em modo convidado, o jogo continua funcional usando apenas localStorage.

## Camadas

### Domínio do save
`lib/save.ts`

Responsável por:
- schema v10;
- criação de novo jogo;
- migrações;
- reparos de integridade;
- import/export JSON.

Não conhece tabela SQL, URL do Supabase ou políticas RLS.

### Persistência local
`lib/persistence/localSaveStore.ts`

Responsável por:
- payload local;
- revisão local;
- timestamp local;
- evento de escrita para observadores.

### Contratos de persistência
`lib/persistence/contracts.ts`

Define `RemoteSaveStore`, `CloudSaveRecord`, slot e metadados. Um backend futuro pode substituir Supabase sem alterar o gameplay.

### Supabase
`lib/supabase/*`

- `config.ts`: lê apenas `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- `http.ts`: transporte HTTP e erros.
- `auth.ts`: signup/login/refresh/logout via Supabase Auth.
- `saveStore.ts`: implementação de `RemoteSaveStore` via PostgREST.

**Nunca** colocar `service_role` no cliente.

### Orquestração cloud
`lib/cloudSync.ts`

Responsável por:
- vincular um save local a um `userId` autenticado;
- primeiro reconcile após login;
- upload/download;
- conflito explícito;
- sincronização posterior.

Não há last-write-wins silencioso no primeiro vínculo. Se local e nuvem já têm payloads diferentes, o usuário escolhe `USAR LOCAL` ou `USAR NUVEM`.

### Ponte React
`components/CloudSyncBridge.tsx`

Componente sem UI montado no layout. Faz debounce das escritas e envia o save para a nuvem depois que o vínculo foi resolvido.

## Banco mínimo Beta 1

Migration: `supabase/migrations/001_beta1_game_saves.sql`

Tabela `game_saves`:
- `user_id uuid`;
- `slot_key text`;
- `schema_version integer`;
- `client_revision bigint`;
- `payload jsonb`;
- `updated_at timestamptz`.

Chave primária: `(user_id, slot_key)`.

RLS restringe SELECT/INSERT/UPDATE/DELETE a `auth.uid() = user_id`.

## Ativação em um projeto Supabase

1. Criar projeto Supabase.
2. Executar `supabase/migrations/001_beta1_game_saves.sql` no SQL Editor.
3. Copiar `.env.example` para `.env.local`.
4. Preencher URL e anon key públicas.
5. Configurar política de confirmação de e-mail conforme o ambiente de teste.
6. Reiniciar `next dev`.
7. Criar conta pelo menu `CONTA / ACESSO`.
8. Validar conflito local/cloud em dois navegadores antes de produção.

## Limites deliberados da Beta 1

- Um slot cloud (`campaign`) por conta. A interface de múltiplos slots continua backlog.
- Não há realtime/subscriptions: saves são enviados após escrita local.
- Não há merge de campo a campo entre saves divergentes; o usuário escolhe uma fonte no primeiro conflito.
- Settings continuam locais nesta Beta.
- Conteúdo/cânone continuam empacotados no cliente e não migram para banco remoto.

## Segurança

- Somente anon key pública no browser.
- RLS obrigatória.
- Senha é enviada diretamente ao endpoint Auth e não é armazenada pelo jogo.
- Access/refresh tokens são persistidos na sessão local para manter login; logout limpa a sessão local mesmo se a chamada remota falhar.
- Service role pertence exclusivamente a ambiente servidor/administrativo e não faz parte desta build.
