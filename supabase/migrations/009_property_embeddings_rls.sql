alter table property_embeddings enable row level security;

create policy "Allow public read access"
  on property_embeddings for select
  using ( true );

create policy "Allow public insert access"
  on property_embeddings for insert
  with check ( true );
