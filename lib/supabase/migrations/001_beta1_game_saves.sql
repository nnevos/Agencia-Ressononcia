-- Ressonância Beta 1 — save cloud mínimo, protegido por RLS.
-- Execute no SQL Editor do Supabase antes de ativar as variáveis NEXT_PUBLIC_*.

create table if not exists public.game_saves (
  user_id uuid not null references auth.users(id) on delete cascade,
  slot_key text not null default 'campaign',
  schema_version integer not null,
  client_revision bigint not null default 0,
  payload jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, slot_key),
  constraint game_saves_slot_key_nonempty check (char_length(slot_key) > 0)
);

alter table public.game_saves enable row level security;

create policy "game_saves_select_own"
on public.game_saves for select
using (auth.uid() = user_id);

create policy "game_saves_insert_own"
on public.game_saves for insert
with check (auth.uid() = user_id);

create policy "game_saves_update_own"
on public.game_saves for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "game_saves_delete_own"
on public.game_saves for delete
using (auth.uid() = user_id);

create or replace function public.touch_game_saves_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists game_saves_touch_updated_at on public.game_saves;
create trigger game_saves_touch_updated_at
before update on public.game_saves
for each row execute function public.touch_game_saves_updated_at();
