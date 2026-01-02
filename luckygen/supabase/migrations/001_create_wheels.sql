-- Create wheels table for storing shared wheel configurations
CREATE TABLE IF NOT EXISTS public.wheels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    segments JSONB NOT NULL,
    -- Array of {text: string, color: string}
    slug TEXT UNIQUE NOT NULL,
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
-- Create index on slug for fast lookup
CREATE INDEX idx_wheels_slug ON public.wheels(slug);
-- Create index on created_at for trending wheels
CREATE INDEX idx_wheels_created_at ON public.wheels(created_at DESC);
-- Enable Row Level Security (RLS)
ALTER TABLE public.wheels ENABLE ROW LEVEL SECURITY;
-- Policy: Allow anyone to read wheels
CREATE POLICY "Wheels are publicly readable" ON public.wheels FOR
SELECT USING (true);
-- Policy: Allow anyone to insert wheels (no auth required)
CREATE POLICY "Anyone can create wheels" ON public.wheels FOR
INSERT WITH CHECK (true);
-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = timezone('utc'::text, now());
RETURN NEW;
END;
$$ language 'plpgsql';
-- Trigger to auto-update updated_at
CREATE TRIGGER update_wheels_updated_at BEFORE
UPDATE ON public.wheels FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
-- Function to increment views counter
CREATE OR REPLACE FUNCTION increment_wheel_views(wheel_slug TEXT) RETURNS void AS $$ BEGIN
UPDATE public.wheels
SET views = views + 1
WHERE slug = wheel_slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;