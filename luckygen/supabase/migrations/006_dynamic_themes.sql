-- Create app_themes table
CREATE TABLE IF NOT EXISTS public.app_themes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    key TEXT NOT NULL UNIQUE,
    bg_image_url TEXT,
    pointer_image_url TEXT,
    colors TEXT [] NOT NULL DEFAULT '{}',
    button_style TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
-- Enable RLS
ALTER TABLE public.app_themes ENABLE ROW LEVEL SECURITY;
-- Create policies for app_themes
-- Everyone can read active themes
CREATE POLICY "Enable read access for all users" ON public.app_themes FOR
SELECT USING (true);
-- Only authenticated users (admins) can insert/update/delete
-- NOTE: Ideally restrict this to specific user IDs in production
CREATE POLICY "Enable write access for authenticated users" ON public.app_themes FOR ALL TO authenticated USING (true) WITH CHECK (true);
-- Storage Bucket Setup for 'theme-assets'
-- Note: Creating buckets via SQL in Supabase usually requires calling storage.buckets methods if available,
-- or just relying on the dashboard. But we can try to insert if the schema permits.
INSERT INTO storage.buckets (id, name, public)
VALUES ('theme-assets', 'theme-assets', true) ON CONFLICT (id) DO NOTHING;
-- Storage Policies
-- Public Read
CREATE POLICY "Public Access" ON storage.objects FOR
SELECT USING (bucket_id = 'theme-assets');
-- Authenticated Write (Upload)
CREATE POLICY "Authenticated Insert" ON storage.objects FOR
INSERT TO authenticated WITH CHECK (bucket_id = 'theme-assets');
-- Authenticated Update/Delete
CREATE POLICY "Authenticated Update" ON storage.objects FOR
UPDATE TO authenticated USING (bucket_id = 'theme-assets');
CREATE POLICY "Authenticated Delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'theme-assets');