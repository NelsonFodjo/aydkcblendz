create table if not exists registrations (
  id uuid primary key default gen_random_uuid(),
  registration_number bigint generated always as identity,
  name text not null,
  whatsapp text not null,
  email text,
  deanery text not null,
  parish text,
  conviction_source text,
  product_interest text,
  qr_code_id uuid not null unique,
  verified_at timestamptz,
  is_winner boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists registrations_qr_code_id_idx on registrations (qr_code_id);
create index if not exists registrations_deanery_idx on registrations (deanery);
create unique index if not exists registrations_single_winner_idx
  on registrations ((is_winner))
  where is_winner;

alter table registrations enable row level security;

create policy "Anyone can insert registrations"
  on registrations for insert
  to anon
  with check (true);

create policy "Anyone can read registrations"
  on registrations for select
  to anon
  using (true);

create policy "Anyone can update verified_at"
  on registrations for update
  to anon
  using (true)
  with check (true);

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger registrations_set_updated_at
  before update on registrations
  for each row
  execute function set_updated_at();
