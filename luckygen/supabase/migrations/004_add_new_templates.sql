-- Migration: Add new template wheels with enhanced categories
-- This migration adds additional wheel templates from JSON data
-- Run this after migrations 001, 002, and 003
-- 1. Ensure category column exists (idempotent - safe to run multiple times)
ALTER TABLE public.wheels
ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'other';
-- 2. Ensure index exists on category column for performance
CREATE INDEX IF NOT EXISTS idx_wheels_category ON public.wheels(category);
-- 3. Insert new template wheels with JSONB segments (with random colors)
-- Using ON CONFLICT to prevent duplicates if run multiple times
-- English Templates
INSERT INTO public.wheels (title, slug, segments, category)
VALUES (
        'What to Eat for Dinner?',
        'what-to-eat-for-dinner',
        '[
            {"text": "Pizza", "color": "#FF6B6B"},
            {"text": "Sushi", "color": "#4ECDC4"},
            {"text": "Burger", "color": "#FFD93D"},
            {"text": "Pasta", "color": "#6C5CE7"},
            {"text": "Salad", "color": "#A8E6CF"},
            {"text": "Tacos", "color": "#FF8B94"},
            {"text": "Steak", "color": "#FF6F91"},
            {"text": "Chinese Food", "color": "#FFA07A"},
            {"text": "Indian Curry", "color": "#98D8C8"},
            {"text": "Fried Chicken", "color": "#F7DC6F"}
        ]',
        'food'
    ),
    (
        'Truth or Dare',
        'truth-or-dare',
        '[
            {"text": "Truth: Your biggest fear?", "color": "#45B7D1"},
            {"text": "Dare: Do 10 pushups", "color": "#FF6B6B"},
            {"text": "Truth: Who is your crush?", "color": "#4ECDC4"},
            {"text": "Dare: Sing a song loudly", "color": "#FFD93D"},
            {"text": "Truth: Most embarrassing moment", "color": "#6C5CE7"},
            {"text": "Dare: Text your ex", "color": "#FF8B94"}
        ]',
        'fun'
    ),
    (
        'Random Number 1-10',
        'random-number-1-10',
        '[
            {"text": "1", "color": "#FF6B6B"},
            {"text": "2", "color": "#4ECDC4"},
            {"text": "3", "color": "#FFD93D"},
            {"text": "4", "color": "#6C5CE7"},
            {"text": "5", "color": "#A8E6CF"},
            {"text": "6", "color": "#FF8B94"},
            {"text": "7", "color": "#FF6F91"},
            {"text": "8", "color": "#FFA07A"},
            {"text": "9", "color": "#98D8C8"},
            {"text": "10", "color": "#F7DC6F"}
        ]',
        'utility'
    ),
    (
        'Yes or No Oracle',
        'yes-or-no',
        '[
            {"text": "YES", "color": "#4ECDC4"},
            {"text": "NO", "color": "#FF6B6B"},
            {"text": "MAYBE", "color": "#FFD93D"},
            {"text": "DEFINITELY", "color": "#6C5CE7"},
            {"text": "ABSOLUTELY NOT", "color": "#FF8B94"}
        ]',
        'decision'
    ),
    (
        'Rock Paper Scissors',
        'rock-paper-scissors',
        '[
            {"text": "Rock", "color": "#95A5A6"},
            {"text": "Paper", "color": "#F39C12"},
            {"text": "Scissors", "color": "#E74C3C"}
        ]',
        'games'
    ) ON CONFLICT (slug) DO NOTHING;
-- Indonesian Templates
INSERT INTO public.wheels (title, slug, segments, category)
VALUES (
        'Makan Apa Siang Ini?',
        'makan-apa-siang-ini',
        '[
            {"text": "Nasi Goreng", "color": "#FF6B6B"},
            {"text": "Bakso", "color": "#4ECDC4"},
            {"text": "Mie Ayam", "color": "#FFD93D"},
            {"text": "Sate Ayam", "color": "#6C5CE7"},
            {"text": "Padang", "color": "#A8E6CF"},
            {"text": "Gado-gado", "color": "#FF8B94"},
            {"text": "Ayam Geprek", "color": "#FF6F91"},
            {"text": "Soto", "color": "#FFA07A"}
        ]',
        'food'
    ),
    (
        'Hukuman Game (Fun Punishment)',
        'hukuman-game-lucu',
        '[
            {"text": "Joget TikTok", "color": "#FF6B6B"},
            {"text": "Nyanyi Balonku", "color": "#4ECDC4"},
            {"text": "Push up 10x", "color": "#FFD93D"},
            {"text": "Gendong teman", "color": "#6C5CE7"},
            {"text": "Traktir minum", "color": "#A8E6CF"},
            {"text": "Jongkok 1 menit", "color": "#FF8B94"}
        ]',
        'fun'
    ),
    (
        'Siapa yang Bayar?',
        'siapa-yang-bayar-tagihan',
        '[
            {"text": "Aku", "color": "#FF6B6B"},
            {"text": "Kamu", "color": "#4ECDC4"},
            {"text": "Kita Split Bill", "color": "#FFD93D"},
            {"text": "Yang Paling Tua", "color": "#6C5CE7"},
            {"text": "Yang Paling Muda", "color": "#A8E6CF"}
        ]',
        'lifestyle'
    ),
    (
        'Destinasi Liburan Indonesia',
        'destinasi-liburan-indonesia',
        '[
            {"text": "Bali", "color": "#FF6B6B"},
            {"text": "Yogyakarta", "color": "#4ECDC4"},
            {"text": "Bandung", "color": "#FFD93D"},
            {"text": "Lombok", "color": "#6C5CE7"},
            {"text": "Labuan Bajo", "color": "#A8E6CF"},
            {"text": "Raja Ampat", "color": "#FF8B94"},
            {"text": "Malang", "color": "#FF6F91"}
        ]',
        'travel'
    ),
    (
        'Huruf Acak A-Z',
        'huruf-acak-a-z',
        '[
            {"text": "A", "color": "#FF6B6B"},
            {"text": "B", "color": "#4ECDC4"},
            {"text": "C", "color": "#FFD93D"},
            {"text": "D", "color": "#6C5CE7"},
            {"text": "E", "color": "#A8E6CF"},
            {"text": "F", "color": "#FF8B94"},
            {"text": "G", "color": "#FF6F91"},
            {"text": "H", "color": "#FFA07A"},
            {"text": "I", "color": "#98D8C8"},
            {"text": "J", "color": "#F7DC6F"},
            {"text": "K", "color": "#BB8FCE"},
            {"text": "L", "color": "#85C1E9"},
            {"text": "M", "color": "#F8B88B"},
            {"text": "N", "color": "#ABEBC6"},
            {"text": "O", "color": "#F9E79F"}
        ]',
        'utility'
    ) ON CONFLICT (slug) DO NOTHING;
-- 4. Update view counts to look organic (random between 50-500)
UPDATE public.wheels
SET views = floor(random() * 450 + 50)
WHERE slug IN (
        'what-to-eat-for-dinner',
        'truth-or-dare',
        'random-number-1-10',
        'yes-or-no',
        'rock-paper-scissors',
        'makan-apa-siang-ini',
        'hukuman-game-lucu',
        'siapa-yang-bayar-tagihan',
        'destinasi-liburan-indonesia',
        'huruf-acak-a-z'
    )
    AND views = 0;
-- 5. Optionally mark some as featured
UPDATE public.wheels
SET featured = true
WHERE slug IN (
        'what-to-eat-for-dinner',
        'yes-or-no',
        'makan-apa-siang-ini'
    );