-- Enable the extension
create extension if not exists vector;

-- Property embeddings table
create table if not exists property_embeddings (
  id uuid primary key default gen_random_uuid(),
  property_id uuid references properties(id) on delete cascade,
  content text not null,           -- the text that was embedded
  embedding vector(4096) not null, -- nv-embed-v1 output
  metadata jsonb default '{}',
  created_at timestamptz default now()
);

-- HNSW index creation removed because pgvector HNSW limits vector indexing to 2000 dimensions.
-- We have 4096 dimensions (nv-embed-v1), so we will rely on exact search (sequential scan) 
-- for the MVP, which is perfectly fine for < 100k rows.
