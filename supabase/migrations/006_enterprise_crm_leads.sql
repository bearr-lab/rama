-- =================================================================================
-- ENTERPRISE CRM & LEADS ARCHITECTURE (PHASE 1)
-- =================================================================================

-- 1. Enum for Lead Status
CREATE TYPE lead_status AS ENUM ('new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost');

-- 2. Enum for Lead Intent (AI Scored)
CREATE TYPE lead_intent AS ENUM ('low', 'medium', 'high', 'urgent');

-- 3. Leads Table (The Core CRM Entity)
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    -- Contact Information
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    nationality TEXT,
    
    -- AI Scoring & Tracking
    status lead_status DEFAULT 'new' NOT NULL,
    ai_intent_score lead_intent DEFAULT 'low' NOT NULL,
    ai_notes TEXT, -- AI-generated summaries of conversations
    
    -- Property Interest (Foreign Key to existing properties)
    interested_property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL,
    budget_min NUMERIC(15, 2),
    budget_max NUMERIC(15, 2),
    
    -- Audit & Assignment
    assigned_broker_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    source TEXT DEFAULT 'organic' -- e.g., 'ai_concierge', 'google_ads'
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- 4.5 Security Definer Admin Check
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM auth.users
    WHERE id = auth.uid()
    AND raw_app_meta_data->>'role' = 'admin'
  );
$$;

-- 5. RLS Policies
-- Only authenticated brokers/admins can view leads
CREATE POLICY "Brokers can view assigned leads" ON public.leads
    FOR SELECT TO authenticated USING (
        auth.uid() = assigned_broker_id
        OR public.is_admin()
    );

-- Public can insert leads (via AI Concierge / Contact Forms)
CREATE POLICY "Public can insert leads" ON public.leads
    FOR INSERT WITH CHECK (true);

-- 6. Trigger for updated_at
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.leads
    FOR EACH ROW EXECUTE PROCEDURE moddatetime (updated_at);

-- 7. Add 'availability_status' to existing properties for Live Matrix
ALTER TABLE public.properties 
ADD COLUMN IF NOT EXISTS availability_status TEXT DEFAULT 'available' CHECK (availability_status IN ('available', 'reserved', 'sold'));
