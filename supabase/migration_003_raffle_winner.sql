alter table registrations
  add column if not exists is_winner boolean not null default false;

create unique index if not exists registrations_single_winner_idx
  on registrations ((is_winner))
  where is_winner;
