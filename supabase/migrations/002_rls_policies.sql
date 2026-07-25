-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE communities ENABLE ROW LEVEL SECURITY;
ALTER TABLE shortlists ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone"
    ON profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

-- Properties Policies
CREATE POLICY "Active properties are viewable by everyone"
    ON properties FOR SELECT
    USING (is_active = true);

-- Communities Policies
CREATE POLICY "Communities are viewable by everyone"
    ON communities FOR SELECT
    USING (true);

-- Shortlists Policies
CREATE POLICY "Users can view own shortlists"
    ON shortlists FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own shortlists"
    ON shortlists FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own shortlists"
    ON shortlists FOR DELETE
    USING (auth.uid() = user_id);
