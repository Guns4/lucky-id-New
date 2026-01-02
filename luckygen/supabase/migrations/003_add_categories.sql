-- Add category field to wheels table for filtering
ALTER TABLE public.wheels
ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'other';
-- Create index on category for fast filtering
CREATE INDEX IF NOT EXISTS idx_wheels_category ON public.wheels(category);
-- Update existing wheels with categories
UPDATE public.wheels
SET category = 'food'
WHERE slug IN (
        'what-to-eat',
        'makan-apa',
        'que-comer',
        'o-que-comer',
        'kya-khana-hai',
        'what-to-order',
        'minuman-apa'
    );
UPDATE public.wheels
SET category = 'party'
WHERE slug IN (
        'truth-or-dare',
        'verdad-o-reto',
        'verdade-ou-desafio',
        'sach-ya-dare',
        'spin-the-bottle',
        'dare-challenge'
    );
UPDATE public.wheels
SET category = 'decision'
WHERE slug IN (
        'yes-or-no',
        'ya-atau-tidak',
        'si-o-no',
        'sim-ou-nao',
        'haan-ya-nahi',
        'should-i-text-my-ex',
        'skip-work-today',
        'netflix-or-study',
        'gym-or-pizza'
    );
UPDATE public.wheels
SET category = 'entertainment'
WHERE slug IN (
        'what-movie-to-watch',
        'que-pelicula-ver',
        'weekend-activity',
        'kegiatan-akhir-pekan',
        'actividad-fin-de-semana',
        'atividade-fim-de-semana',
        'date-night-ideas'
    );
UPDATE public.wheels
SET category = 'random'
WHERE slug IN (
        'random-number-1-50',
        'choose-a-color',
        'hair-color-change'
    );
UPDATE public.wheels
SET category = 'education'
WHERE slug IN ('study-subject');
UPDATE public.wheels
SET category = 'health'
WHERE slug IN ('workout-routine');
UPDATE public.wheels
SET category = 'travel'
WHERE slug IN ('liburan-kemana');
-- Add featured flag for promoting certain wheels
ALTER TABLE public.wheels
ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;
-- Mark popular wheels as featured
UPDATE public.wheels
SET featured = true
WHERE slug IN (
        'what-to-eat',
        'truth-or-dare',
        'yes-or-no',
        'should-i-text-my-ex',
        'random-number-1-50'
    );