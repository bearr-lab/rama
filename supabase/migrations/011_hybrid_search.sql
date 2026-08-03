create or replace function hybrid_property_search (
  query_text text,
  query_embedding vector(4096),
  match_count int
)
returns table (
  id uuid,
  property_id uuid,
  content text,
  metadata jsonb,
  similarity float,
  fts_score float,
  combined_score float
)
language sql stable
as $$
  with vector_matches as (
    select
      id,
      1 - (embedding <=> query_embedding) as similarity,
      row_number() over (order by embedding <=> query_embedding) as rnk
    from property_embeddings
    limit match_count * 2
  ),
  fts_matches as (
    select
      id,
      ts_rank_cd(
        to_tsvector('simple', content),
        plainto_tsquery('simple', query_text)
      ) as fts_score,
      row_number() over (order by ts_rank_cd(
        to_tsvector('simple', content),
        plainto_tsquery('simple', query_text)
      ) desc) as rnk
    from property_embeddings
    where to_tsvector('simple', content) @@ plainto_tsquery('simple', query_text)
    limit match_count * 2
  ),
  combined as (
    select
      coalesce(v.id, f.id) as id,
      coalesce(v.similarity, 0.0) as similarity,
      coalesce(f.fts_score, 0.0) as fts_score,
      -- Reciprocal Rank Fusion (RRF)
      coalesce(1.0 / (v.rnk + 60), 0.0) + coalesce(1.0 / (f.rnk + 60), 0.0) as combined_score
    from vector_matches v
    full outer join fts_matches f on v.id = f.id
  )
  select
    pe.id,
    pe.property_id,
    pe.content,
    pe.metadata,
    c.similarity,
    c.fts_score,
    c.combined_score
  from combined c
  join property_embeddings pe on c.id = pe.id
  order by c.combined_score desc
  limit match_count;
$$;
