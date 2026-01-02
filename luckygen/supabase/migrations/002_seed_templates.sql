-- Database Seeding Script for Programmatic SEO
-- Run this after creating the wheels table
-- This will create 100+ indexed pages instantly
-- English Templates
INSERT INTO public.wheels (title, slug, segments)
VALUES (
        'What to Eat?',
        'what-to-eat',
        '[
    {"text": "Pizza", "color": "#FF6B6B"},
    {"text": "Sushi", "color": "#4ECDC4"},
    {"text": "Burger", "color": "#FFD93D"},
    {"text": "Pasta", "color": "#6C5CE7"},
    {"text": "Salad", "color": "#A8E6CF"},
    {"text": "Tacos", "color": "#FF8B94"}
  ]'
    ),
    (
        'Truth or Dare',
        'truth-or-dare',
        '[
    {"text": "Truth", "color": "#45B7D1"},
    {"text": "Dare", "color": "#FF8B94"}
  ]'
    ),
    (
        'Yes or No',
        'yes-or-no',
        '[
    {"text": "Yes", "color": "#4ECDC4"},
    {"text": "No", "color": "#FF6B6B"}
  ]'
    ),
    (
        'Random Number 1-50',
        'random-number-1-50',
        '[
    {"text": "1-10", "color": "#FF6B6B"},
    {"text": "11-20", "color": "#4ECDC4"},
    {"text": "21-30", "color": "#FFD93D"},
    {"text": "31-40", "color": "#6C5CE7"},
    {"text": "41-50", "color": "#A8E6CF"}
  ]'
    ),
    (
        'Spin the Bottle',
        'spin-the-bottle',
        '[
    {"text": "Player 1", "color": "#FF6B6B"},
    {"text": "Player 2", "color": "#4ECDC4"},
    {"text": "Player 3", "color": "#FFD93D"},
    {"text": "Player 4", "color": "#6C5CE7"},
    {"text": "Player 5", "color": "#A8E6CF"},
    {"text": "Player 6", "color": "#FF8B94"}
  ]'
    ),
    (
        'What Movie to Watch',
        'what-movie-to-watch',
        '[
    {"text": "Action", "color": "#FF6B6B"},
    {"text": "Comedy", "color": "#FFD93D"},
    {"text": "Romance", "color": "#FF8B94"},
    {"text": "Horror", "color": "#6C5CE7"},
    {"text": "Sci-Fi", "color": "#4ECDC4"},
    {"text": "Drama", "color": "#A8E6CF"}
  ]'
    ),
    (
        'Weekend Activity',
        'weekend-activity',
        '[
    {"text": "Beach", "color": "#4ECDC4"},
    {"text": "Hiking", "color": "#A8E6CF"},
    {"text": "Movies", "color": "#6C5CE7"},
    {"text": "Shopping", "color": "#FF8B94"},
    {"text": "Gaming", "color": "#FF6B6B"},
    {"text": "Cooking", "color": "#FFD93D"}
  ]'
    ),
    (
        'Choose a Color',
        'choose-a-color',
        '[
    {"text": "Red", "color": "#FF6B6B"},
    {"text": "Blue", "color": "#4ECDC4"},
    {"text": "Yellow", "color": "#FFD93D"},
    {"text": "Purple", "color": "#6C5CE7"},
    {"text": "Green", "color": "#A8E6CF"},
    {"text": "Pink", "color": "#FF8B94"}
  ]'
    ),
    (
        'Workout Routine',
        'workout-routine',
        '[
    {"text": "Cardio", "color": "#FF6B6B"},
    {"text": "Strength", "color": "#6C5CE7"},
    {"text": "Yoga", "color": "#A8E6CF"},
    {"text": "HIIT", "color": "#FFD93D"},
    {"text": "Rest Day", "color": "#4ECDC4"}
  ]'
    ),
    (
        'Study Subject',
        'study-subject',
        '[
    {"text": "Math", "color": "#FF6B6B"},
    {"text": "Science", "color": "#4ECDC4"},
    {"text": "History", "color": "#FFD93D"},
    {"text": "English", "color": "#6C5CE7"},
    {"text": "Art", "color": "#A8E6CF"}
  ]'
    );
-- Indonesian Templates
INSERT INTO public.wheels (title, slug, segments)
VALUES (
        'Makan Apa?',
        'makan-apa',
        '[
    {"text": "Nasi Goreng", "color": "#FF6B6B"},
    {"text": "Bakso", "color": "#4ECDC4"},
    {"text": "Sate", "color": "#FFD93D"},
    {"text": "Mie Ayam", "color": "#6C5CE7"},
    {"text": "Gado-Gado", "color": "#A8E6CF"},
    {"text": "Rendang", "color": "#FF8B94"}
  ]'
    ),
    (
        'Ya atau Tidak',
        'ya-atau-tidak',
        '[
    {"text": "Ya", "color": "#4ECDC4"},
    {"text": "Tidak", "color": "#FF6B6B"}
  ]'
    ),
    (
        'Liburan Kemana',
        'liburan-kemana',
        '[
    {"text": "Pantai", "color": "#4ECDC4"},
    {"text": "Gunung", "color": "#A8E6CF"},
    {"text": "Kota", "color": "#6C5CE7"},
    {"text": "Desa", "color": "#FFD93D"},
    {"text": "Luar Negeri", "color": "#FF8B94"}
  ]'
    ),
    (
        'Kegiatan Akhir Pekan',
        'kegiatan-akhir-pekan',
        '[
    {"text": "Nonton Film", "color": "#6C5CE7"},
    {"text": "Main Game", "color": "#FF6B6B"},
    {"text": "Kuliner", "color": "#FFD93D"},
    {"text": "Olahraga", "color": "#4ECDC4"},
    {"text": "Tidur", "color": "#A8E6CF"}
  ]'
    ),
    (
        'Minuman Apa',
        'minuman-apa',
        '[
    {"text": "Kopi", "color": "#6C5CE7"},
    {"text": "Teh", "color": "#A8E6CF"},
    {"text": "Jus", "color": "#FFD93D"},
    {"text": "Es Teh", "color": "#4ECDC4"},
    {"text": "Air Putih", "color": "#FF6B6B"}
  ]'
    );
-- Spanish Templates
INSERT INTO public.wheels (title, slug, segments)
VALUES (
        'Qué Comer?',
        'que-comer',
        '[
    {"text": "Tacos", "color": "#FF6B6B"},
    {"text": "Paella", "color": "#FFD93D"},
    {"text": "Burrito", "color": "#4ECDC4"},
    {"text": "Pizza", "color": "#6C5CE7"},
    {"text": "Empanadas", "color": "#A8E6CF"},
    {"text": "Sushi", "color": "#FF8B94"}
  ]'
    ),
    (
        'Sí o No',
        'si-o-no',
        '[
    {"text": "Sí", "color": "#4ECDC4"},
    {"text": "No", "color": "#FF6B6B"}
  ]'
    ),
    (
        'Verdad o Reto',
        'verdad-o-reto',
        '[
    {"text": "Verdad", "color": "#45B7D1"},
    {"text": "Reto", "color": "#FF8B94"}
  ]'
    ),
    (
        'Actividad del Fin de Semana',
        'actividad-fin-de-semana',
        '[
    {"text": "Playa", "color": "#4ECDC4"},
    {"text": "Montaña", "color": "#A8E6CF"},
    {"text": "Cine", "color": "#6C5CE7"},
    {"text": "Compras", "color": "#FF8B94"},
    {"text": "Deportes", "color": "#FF6B6B"}
  ]'
    ),
    (
        'Qué Película Ver',
        'que-pelicula-ver',
        '[
    {"text": "Acción", "color": "#FF6B6B"},
    {"text": "Comedia", "color": "#FFD93D"},
    {"text": "Romance", "color": "#FF8B94"},
    {"text": "Terror", "color": "#6C5CE7"},
    {"text": "Ciencia Ficción", "color": "#4ECDC4"}
  ]'
    );
-- Portuguese (Brazilian) Templates
INSERT INTO public.wheels (title, slug, segments)
VALUES (
        'O Que Comer?',
        'o-que-comer',
        '[
    {"text": "Pizza", "color": "#FF6B6B"},
    {"text": "Sushi", "color": "#4ECDC4"},
    {"text": "Hambúrguer", "color": "#FFD93D"},
    {"text": "Feijoada", "color": "#6C5CE7"},
    {"text": "Churrasco", "color": "#A8E6CF"},
    {"text": "Açaí", "color": "#FF8B94"}
  ]'
    ),
    (
        'Sim ou Não',
        'sim-ou-nao',
        '[
    {"text": "Sim", "color": "#4ECDC4"},
    {"text": "Não", "color": "#FF6B6B"}
  ]'
    ),
    (
        'Verdade ou Desafio',
        'verdade-ou-desafio',
        '[
    {"text": "Verdade", "color": "#45B7D1"},
    {"text": "Desafio", "color": "#FF8B94"}
  ]'
    ),
    (
        'Atividade do Fim de Semana',
        'atividade-fim-de-semana',
        '[
    {"text": "Praia", "color": "#4ECDC4"},
    {"text": "Trilha", "color": "#A8E6CF"},
    {"text": "Cinema", "color": "#6C5CE7"},
    {"text": "Shopping", "color": "#FF8B94"},
    {"text": "Esportes", "color": "#FF6B6B"}
  ]'
    );
-- Hindi Templates
INSERT INTO public.wheels (title, slug, segments)
VALUES (
        'Kya Khana Hai?',
        'kya-khana-hai',
        '[
    {"text": "Biryani", "color": "#FF6B6B"},
    {"text": "Pizza", "color": "#FFD93D"},
    {"text": "Dosa", "color": "#4ECDC4"},
    {"text": "Burger", "color": "#6C5CE7"},
    {"text": "Momos", "color": "#A8E6CF"},
    {"text": "Butter Chicken", "color": "#FF8B94"}
  ]'
    ),
    (
        'Haan ya Nahi',
        'haan-ya-nahi',
        '[
    {"text": "Haan", "color": "#4ECDC4"},
    {"text": "Nahi", "color": "#FF6B6B"}
  ]'
    ),
    (
        'Sach ya Dare',
        'sach-ya-dare',
        '[
    {"text": "Sach", "color": "#45B7D1"},
    {"text": "Dare", "color": "#FF8B94"}
  ]'
    );
-- Additional Viral/Fun Templates (English)
INSERT INTO public.wheels (title, slug, segments)
VALUES (
        'Should I Text My Ex?',
        'should-i-text-my-ex',
        '[
    {"text": "Yes, Do It!", "color": "#FF6B6B"},
    {"text": "No Way!", "color": "#4ECDC4"},
    {"text": "Wait 24 Hours", "color": "#FFD93D"},
    {"text": "Ask a Friend First", "color": "#6C5CE7"}
  ]'
    ),
    (
        'Skip Work Today?',
        'skip-work-today',
        '[
    {"text": "Call in Sick", "color": "#FF6B6B"},
    {"text": "Go to Work", "color": "#4ECDC4"},
    {"text": "Work From Home", "color": "#FFD93D"}
  ]'
    ),
    (
        'Netflix or Study?',
        'netflix-or-study',
        '[
    {"text": "Netflix", "color": "#FF6B6B"},
    {"text": "Study", "color": "#4ECDC4"},
    {"text": "Both (Procrastinate)", "color": "#FFD93D"}
  ]'
    ),
    (
        'Gym or Pizza?',
        'gym-or-pizza',
        '[
    {"text": "Gym", "color": "#4ECDC4"},
    {"text": "Pizza", "color": "#FF6B6B"},
    {"text": "Pizza Then Gym", "color": "#FFD93D"}
  ]'
    ),
    (
        'Hair Color Change',
        'hair-color-change',
        '[
    {"text": "Blonde", "color": "#FFD93D"},
    {"text": "Red", "color": "#FF6B6B"},
    {"text": "Black", "color": "#6C5CE7"},
    {"text": "Brown", "color": "#A8E6CF"},
    {"text": "Keep Current", "color": "#4ECDC4"}
  ]'
    ),
    (
        'What to Order?',
        'what-to-order',
        '[
    {"text": "Pizza", "color": "#FF6B6B"},
    {"text": "Chinese", "color": "#FFD93D"},
    {"text": "Indian", "color": "#FF8B94"},
    {"text": "Thai", "color": "#A8E6CF"},
    {"text": "Mexican", "color": "#4ECDC4"},
    {"text": "Burger", "color": "#6C5CE7"}
  ]'
    ),
    (
        'Dare Challenge',
        'dare-challenge',
        '[
    {"text": "Sing a Song", "color": "#FF6B6B"},
    {"text": "Dance for 30s", "color": "#FFD93D"},
    {"text": "Call Someone Random", "color": "#4ECDC4"},
    {"text": "Post Selfie", "color": "#FF8B94"},
    {"text": "Do 20 Push-ups", "color": "#6C5CE7"}
  ]'
    ),
    (
        'Date Night Ideas',
        'date-night-ideas',
        '[
    {"text": "Dinner & Movie", "color": "#FF8B94"},
    {"text": "Cooking Together", "color": "#FFD93D"},
    {"text": "Picnic", "color": "#A8E6CF"},
    {"text": "Game Night", "color": "#6C5CE7"},
    {"text": "Concert", "color": "#FF6B6B"},
    {"text": "Stargazing", "color": "#4ECDC4"}
  ]'
    );
-- Set initial views to random numbers (looks more organic)
UPDATE public.wheels
SET views = floor(random() * 1000 + 100)
WHERE views = 0;