-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis"; -- For location-based search

-- Create ENUMs
CREATE TYPE property_type AS ENUM ('apartment', 'villa', 'townhouse', 'penthouse');
CREATE TYPE tenure AS ENUM ('ready', 'off_plan');
CREATE TYPE verification_status AS ENUM ('verified', 'review', 'unknown');

-- Create profiles table (extends auth.users)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    locale VARCHAR(2) DEFAULT 'en',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create properties table
CREATE TABLE properties (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title_en TEXT NOT NULL,
    title_ar TEXT NOT NULL,
    description_en TEXT,
    description_ar TEXT,
    price NUMERIC NOT NULL,
    price_verified BOOLEAN DEFAULT false,
    bedrooms INTEGER,
    bathrooms INTEGER,
    area_sqft NUMERIC,
    community TEXT NOT NULL,
    sub_community TEXT,
    property_type property_type NOT NULL,
    tenure tenure NOT NULL,
    developer TEXT,
    completion_date DATE,
    service_charge_aed NUMERIC,
    images TEXT[] NOT NULL DEFAULT '{}',
    thumbnail TEXT,
    latitude NUMERIC,
    longitude NUMERIC,
    location GEOGRAPHY(POINT), -- PostGIS point
    features TEXT[] DEFAULT '{}',
    amenities TEXT[] DEFAULT '{}',
    verification_status verification_status DEFAULT 'unknown',
    verification_source TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create communities table
CREATE TABLE communities (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name_en TEXT NOT NULL,
    name_ar TEXT NOT NULL,
    description_en TEXT,
    description_ar TEXT,
    image TEXT,
    property_count INTEGER DEFAULT 0,
    avg_price NUMERIC,
    latitude NUMERIC,
    longitude NUMERIC,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create shortlists table (user saved properties)
CREATE TABLE shortlists (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, property_id)
);

-- Create functions and triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_properties_updated_at
    BEFORE UPDATE ON properties
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
