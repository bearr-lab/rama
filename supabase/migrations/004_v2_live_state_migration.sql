-- RAMA V2 Live State Migration
-- Connects frontend interactive state models directly to Supabase PostgreSQL with RLS and initial seeding.

-- 1. USER_SHORTLISTS
CREATE TABLE IF NOT EXISTS public.user_shortlists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    property_id TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, property_id)
);

-- 2. KANBAN_TASKS
CREATE TABLE IF NOT EXISTS public.kanban_tasks (
    id TEXT PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    property TEXT NOT NULL,
    column_stage TEXT NOT NULL DEFAULT 'draft',
    priority TEXT NOT NULL DEFAULT 'medium',
    due_date TEXT,
    verified BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PORTFOLIO_ASSETS
CREATE TABLE IF NOT EXISTS public.portfolio_assets (
    id TEXT PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    community TEXT NOT NULL,
    purchase_price NUMERIC(15,2) NOT NULL,
    current_value NUMERIC(15,2) NOT NULL,
    monthly_rent NUMERIC(15,2) NOT NULL,
    net_yield NUMERIC(5,2) NOT NULL,
    tenant_status TEXT DEFAULT 'occupied',
    lease_end TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. MAINTENANCE_TICKETS
CREATE TABLE IF NOT EXISTS public.maintenance_tickets (
    id TEXT PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    property_title TEXT NOT NULL,
    issue TEXT NOT NULL,
    status TEXT DEFAULT 'scheduled',
    cost_aed NUMERIC(10,2) NOT NULL,
    service_date TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.user_shortlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kanban_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.maintenance_tickets ENABLE ROW LEVEL SECURITY;

-- RLS Policies (Enabled for anon & authenticated evaluation mode)
DROP POLICY IF EXISTS "Anyone can view user shortlists" ON public.user_shortlists;
DROP POLICY IF EXISTS "Anyone can insert user shortlists" ON public.user_shortlists;
DROP POLICY IF EXISTS "Anyone can delete user shortlists" ON public.user_shortlists;
CREATE POLICY "Anyone can view user shortlists" ON public.user_shortlists FOR SELECT USING (true);
CREATE POLICY "Anyone can insert user shortlists" ON public.user_shortlists FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can delete user shortlists" ON public.user_shortlists FOR DELETE USING (true);

DROP POLICY IF EXISTS "Anyone can view kanban tasks" ON public.kanban_tasks;
DROP POLICY IF EXISTS "Anyone can insert kanban tasks" ON public.kanban_tasks;
DROP POLICY IF EXISTS "Anyone can update kanban tasks" ON public.kanban_tasks;
DROP POLICY IF EXISTS "Anyone can delete kanban tasks" ON public.kanban_tasks;
CREATE POLICY "Anyone can view kanban tasks" ON public.kanban_tasks FOR SELECT USING (true);
CREATE POLICY "Anyone can insert kanban tasks" ON public.kanban_tasks FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update kanban tasks" ON public.kanban_tasks FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete kanban tasks" ON public.kanban_tasks FOR DELETE USING (true);

DROP POLICY IF EXISTS "Anyone can view portfolio assets" ON public.portfolio_assets;
DROP POLICY IF EXISTS "Anyone can insert portfolio assets" ON public.portfolio_assets;
DROP POLICY IF EXISTS "Anyone can update portfolio assets" ON public.portfolio_assets;
DROP POLICY IF EXISTS "Anyone can delete portfolio assets" ON public.portfolio_assets;
CREATE POLICY "Anyone can view portfolio assets" ON public.portfolio_assets FOR SELECT USING (true);
CREATE POLICY "Anyone can insert portfolio assets" ON public.portfolio_assets FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update portfolio assets" ON public.portfolio_assets FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete portfolio assets" ON public.portfolio_assets FOR DELETE USING (true);

DROP POLICY IF EXISTS "Anyone can view maintenance tickets" ON public.maintenance_tickets;
DROP POLICY IF EXISTS "Anyone can insert maintenance tickets" ON public.maintenance_tickets;
DROP POLICY IF EXISTS "Anyone can update maintenance tickets" ON public.maintenance_tickets;
DROP POLICY IF EXISTS "Anyone can delete maintenance tickets" ON public.maintenance_tickets;
CREATE POLICY "Anyone can view maintenance tickets" ON public.maintenance_tickets FOR SELECT USING (true);
CREATE POLICY "Anyone can insert maintenance tickets" ON public.maintenance_tickets FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update maintenance tickets" ON public.maintenance_tickets FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete maintenance tickets" ON public.maintenance_tickets FOR DELETE USING (true);

-- Seed Kanban Tasks
INSERT INTO public.kanban_tasks (id, title, property, column_stage, priority, due_date, verified)
VALUES 
('task-1', 'Verify RERA Escrow Account Certificate #8992-1', 'Sky Collection Penthouse, Downtown', 'draft', 'high', 'Today', true),
('task-2', 'Review Developer Service Charge NOC (2024-2026)', 'Marina Gate Residence 1, Dubai Marina', 'draft', 'medium', 'Tomorrow', true),
('task-3', 'Private VIP Inspection & Acoustic Survey', 'Sky Collection Penthouse, Downtown', 'viewing', 'high', 'July 28, 14:00', true),
('task-4', 'Submit Formal MOU Form F at AED 18.25M', 'Sky Collection Penthouse, Downtown', 'offer', 'high', 'July 30', true),
('task-5', 'Prepare Manager''s Check for 4% DLD Transfer Fee', 'Creek Horizon Tower A, Creek Harbour', 'transfer', 'high', 'August 2', true)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, column_stage = EXCLUDED.column_stage;

-- Seed Portfolio Assets
INSERT INTO public.portfolio_assets (id, title, community, purchase_price, current_value, monthly_rent, net_yield, tenant_status, lease_end)
VALUES 
('prop-1', 'Sky Collection Penthouse', 'Downtown Dubai', 16000000, 18500000, 104000, 6.8, 'occupied', 'October 14, 2027'),
('prop-2', 'Marina Gate Residence 1', 'Dubai Marina', 2850000, 3450000, 21500, 7.5, 'renewal', 'In 45 Days (Sept 2026)'),
('prop-6', 'Creek Horizon Tower A', 'Dubai Creek Harbour', 2400000, 2900000, 18500, 7.7, 'occupied', 'March 30, 2027')
ON CONFLICT (id) DO UPDATE SET current_value = EXCLUDED.current_value, net_yield = EXCLUDED.net_yield;

-- Seed Maintenance Tickets
INSERT INTO public.maintenance_tickets (id, property_title, issue, status, cost_aed, service_date)
VALUES 
('t-1', 'Marina Gate Residence 1', 'AC Chiller & Duct Annual Servicing (Empower)', 'scheduled', 1850, 'August 5, 2026'),
('t-2', 'Sky Collection Penthouse', 'Smart Home KNX Automation Firmware Audit', 'resolved', 1200, 'July 12, 2026')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status, cost_aed = EXCLUDED.cost_aed;
