create table if not exists document_verifications (
  id uuid primary key default gen_random_uuid(),
  property_id uuid references properties(id) on delete cascade,
  agent_id uuid, -- could reference a users/agents table if it exists
  document_url text not null,
  document_type text not null, -- 'EJARI', 'TITLE_DEED'
  extracted_data jsonb,
  confidence_score float,
  status text default 'PENDING',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table document_verifications enable row level security;

create policy "Allow public insert for verifications" on document_verifications for insert with check (true);
create policy "Allow public select for verifications" on document_verifications for select using (true);
create policy "Allow public update for verifications" on document_verifications for update using (true);
