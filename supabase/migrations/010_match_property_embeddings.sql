create or replace function match_property_embeddings (
  query_embedding vector(4096),
  match_threshold float,
  match_count int
)
returns table (
  id uuid,
  property_id uuid,
  content text,
  metadata jsonb,
  similarity float
)
language sql stable
as $$
  select
    property_embeddings.id,
    property_embeddings.property_id,
    property_embeddings.content,
    property_embeddings.metadata,
    1 - (property_embeddings.embedding <=> query_embedding) as similarity
  from property_embeddings
  where 1 - (property_embeddings.embedding <=> query_embedding) > match_threshold
  order by property_embeddings.embedding <=> query_embedding
  limit match_count;
$$;
