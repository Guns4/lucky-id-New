-- Add user_id to wheels table to link wheels to authenticated users
ALTER TABLE public.wheels
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);
-- Create index for faster lookup by user
CREATE INDEX IF NOT EXISTS idx_wheels_user_id ON public.wheels(user_id);
-- Update RLS Policies
-- Policy: Everyone can view all wheels (Already exists, but good to reaffirm context)
-- CREATE POLICY "Enable read access for all users" ON public.wheels FOR SELECT USING (true);
-- Policy: Users can only update their own wheels
CREATE POLICY "Users can update their own wheels" ON public.wheels FOR
UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- Policy: Users can delete their own wheels
CREATE POLICY "Users can delete their own wheels" ON public.wheels FOR DELETE TO authenticated USING (auth.uid() = user_id);
-- Policy: Authenticated users can insert wheels with their user_id
-- Note: The existing insert policy might be public. We need to ensure auth users can attach their ID.
-- If RLS is enabled, we might need to adjust the existing insert policy or add a new one.
-- Keeping it simple: Allow insert if user is authenticated OR anon (which is already true)
-- We just need to make sure the app passes the user_id.