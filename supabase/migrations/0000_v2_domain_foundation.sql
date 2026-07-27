-- RAMA V2 Initial Domain Foundation
-- Enforces schemas, relationships, and basic RLS policies.

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "vector";

-- ==========================================
-- CORE ENTITIES
-- ==========================================

-- DEVELOPERS
CREATE TABLE developers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    established_year INT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- COMMUNITIES
CREATE TABLE communities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    boundaries GEOMETRY(Polygon, 4326),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- BUILDINGS
CREATE TABLE buildings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    community_id UUID REFERENCES communities(id),
    developer_id UUID REFERENCES developers(id),
    completion_date DATE,
    coordinates GEOMETRY(Point, 4326),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- PROPERTIES
CREATE TABLE properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    price NUMERIC(15,2) NOT NULL,
    community_id UUID REFERENCES communities(id) NOT NULL,
    building_id UUID REFERENCES buildings(id),
    bedrooms INT,
    bathrooms INT,
    size_sqft NUMERIC(10,2),
    status TEXT DEFAULT 'Draft', -- Draft, Verifying, Active, Under_Offer, Sold
    owner_id UUID, -- References auth.users later
    coordinates GEOMETRY(Point, 4326),
    semantic_embedding vector(1536), -- For OpenAI Embeddings
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- INTELLIGENCE ENTITIES
-- ==========================================

-- TRUST PASSPORT
CREATE TABLE trust_passports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    health_score INT DEFAULT 0, -- 0-100
    evidence_score INT DEFAULT 0, -- 0-100
    risk_score INT DEFAULT 0, -- 0-100
    freshness_score INT DEFAULT 100, -- Decays over time
    last_recalculated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(property_id)
);

-- EVIDENCE
CREATE TABLE evidence (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    type TEXT NOT NULL, -- TITLE_DEED, INSPECTION, RERA_VERIFIED
    source TEXT NOT NULL,
    confidence_level NUMERIC(3,2) DEFAULT 1.00, -- 0.00 to 1.00
    decay_rate NUMERIC(5,4) DEFAULT 0.001, -- Daily decay
    submitted_by UUID, -- References auth.users
    verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- INDEXING
-- ==========================================

CREATE INDEX idx_properties_community ON properties(community_id);
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_geom ON properties USING GIST (coordinates);
CREATE INDEX idx_communities_geom ON communities USING GIST (boundaries);

-- Semantic search index for properties
CREATE INDEX idx_properties_embedding ON properties USING hnsw (semantic_embedding vector_cosine_ops);

-- ==========================================
-- ROW LEVEL SECURITY (RLS)
-- ==========================================

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE communities ENABLE ROW LEVEL SECURITY;
ALTER TABLE buildings ENABLE ROW LEVEL SECURITY;
ALTER TABLE trust_passports ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidence ENABLE ROW LEVEL SECURITY;

-- Public read access for active properties
CREATE POLICY "Public profiles are viewable by everyone" ON properties
    FOR SELECT USING (status = 'Active');

-- Owner read access for their own properties (including drafts and under offer)
CREATE POLICY "Owners can view all their own properties" ON properties
    FOR SELECT USING (auth.uid() = owner_id);

-- Admin/Owner write access to properties (Assumes auth setup)
CREATE POLICY "Users can update their own properties" ON properties
    FOR UPDATE USING (auth.uid() = owner_id);

-- Communities and Buildings are publicly readable
CREATE POLICY "Communities are publicly viewable" ON communities FOR SELECT USING (true);
CREATE POLICY "Buildings are publicly viewable" ON buildings FOR SELECT USING (true);

-- Trust passports are publicly readable
CREATE POLICY "Trust Passports are publicly viewable" ON trust_passports FOR SELECT USING (true);
