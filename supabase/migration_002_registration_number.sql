alter table registrations
  add column if not exists registration_number bigint generated always as identity;
