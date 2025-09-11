create table if not exists public.rooms (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now(),
  is_locked boolean not null default false
);

create table if not exists public.queue (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.rooms(id) on delete cascade,
  provider text not null check (provider in ('youtube','niconico','spotify','soundcloud','file')),
  media_id text not null,
  title text not null,
  duration_sec int not null default 0,
  added_by text,
  ord int not null,
  meta jsonb not null default '{}'::jsonb
);

create table if not exists public.messages (
  id bigserial primary key,
  room_id uuid not null references public.rooms(id) on delete cascade,
  user_name text not null,
  type text not null check (type in ('text','sticker')),
  content text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.exports (
  id bigserial primary key,
  room_id uuid not null references public.rooms(id) on delete cascade,
  yt_playlist_id text,
  yt_playlist_url text,
  created_at timestamptz not null default now(),
  hash text unique
);
