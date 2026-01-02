# LuckyGen - New Template Data Implementation

## 📦 Deliverables

### 1. Database Schema Update (`004_add_new_templates.sql`)

**Location**: `supabase/migrations/004_add_new_templates.sql`

**What it does**:
- Adds `category` column to `wheels` table (idempotent - safe to run multiple times)
- Creates performance index on `category` column
- Inserts 10 new wheel templates (5 English + 5 Indonesian)
- Sets organic view counts (random 50-500 views)
- Marks popular wheels as "featured"

**Categories included**:
- `food` - Food decision wheels
- `fun` - Party games and entertainment
- `utility` - Random generators (numbers, letters)
- `decision` - Yes/No oracle
- `games` - Classic games (Rock Paper Scissors)
- `lifestyle` - Daily life decisions
- `travel` - Travel destination pickers

### 2. Color Scheme

All segments use **vibrant, attractive pastel colors** for better UX:
- `#FF6B6B` - Coral Red
- `#4ECDC4` - Turquoise
- `#FFD93D` - Golden Yellow
- `#6C5CE7` - Purple
- `#A8E6CF` - Mint Green
- `#FF8B94` - Pink
- `#FF6F91` - Rose
- `#FFA07A` - Light Salmon
- `#98D8C8` - Seafoam
- `#F7DC6F` - Light Gold
- And more...

### 3. New Templates Added

#### English (5 templates):
1. **What to Eat for Dinner?** - 10 food options
2. **Truth or Dare** - 6 truth/dare challenges
3. **Random Number 1-10** - Number picker
4. **Yes or No Oracle** - 5 decision options
5. **Rock Paper Scissors** - Classic game

#### Indonesian (5 templates):
1. **Makan Apa Siang Ini?** - 8 Indonesian food options
2. **Hukuman Game (Fun Punishment)** - 6 fun challenges
3. **Siapa yang Bayar?** - Bill payment decider
4. **Destinasi Liburan Indonesia** - 7 travel destinations
5. **Huruf Acak A-Z** - Random letter picker

---

## 🚀 How to Run

### Option 1: Via Supabase Dashboard
1. Go to your Supabase project
2. Navigate to **SQL Editor**
3. Copy the contents of `supabase/migrations/004_add_new_templates.sql`
4. Paste and click **Run**

### Option 2: Via Supabase CLI
```bash
supabase db push
```

### Option 3: Direct SQL Execution
```bash
psql -h your-supabase-host -U postgres -d postgres -f supabase/migrations/004_add_new_templates.sql
```

---

## ✅ Verification

After running the migration, verify it worked:

```sql
-- Check if new templates exist
SELECT title, slug, category, views, featured
FROM public.wheels
WHERE slug IN (
    'what-to-eat-for-dinner',
    'makan-apa-siang-ini',
    'yes-or-no'
)
ORDER BY created_at DESC;

-- Check category distribution
SELECT category, COUNT(*) as count
FROM public.wheels
GROUP BY category
ORDER BY count DESC;

-- Verify JSONB structure
SELECT title, segments::jsonb
FROM public.wheels
WHERE slug = 'what-to-eat-for-dinner';
```

Expected output should show:
- ✅ New wheels with correct slugs
- ✅ Categories assigned properly
- ✅ Segments in JSONB format with `text` and `color` fields
- ✅ View counts between 50-500
- ✅ Some wheels marked as featured

---

## 🔄 Safe to Re-Run

This migration is **idempotent** and safe to run multiple times:
- `ALTER TABLE ... ADD COLUMN IF NOT EXISTS` - Won't error if column exists
- `CREATE INDEX IF NOT EXISTS` - Won't error if index exists
- `ON CONFLICT (slug) DO NOTHING` - Won't create duplicates

---

## 📊 Database Impact

**New rows**: 10 wheel templates
**Updated columns**: `category`, `featured`, `views` (for new rows only)
**Performance**: Index on `category` speeds up filtering queries

---

## 🎨 Template Preview

### Example: "What to Eat for Dinner?"
```json
{
  "title": "What to Eat for Dinner?",
  "slug": "what-to-eat-for-dinner",
  "category": "food",
  "segments": [
    {"text": "Pizza", "color": "#FF6B6B"},
    {"text": "Sushi", "color": "#4ECDC4"},
    {"text": "Burger", "color": "#FFD93D"},
    ...
  ]
}
```

### Example: "Makan Apa Siang Ini?"
```json
{
  "title": "Makan Apa Siang Ini?",
  "slug": "makan-apa-siang-ini",
  "category": "food",
  "segments": [
    {"text": "Nasi Goreng", "color": "#FF6B6B"},
    {"text": "Bakso", "color": "#4ECDC4"},
    ...
  ]
}
```

---

## 📝 Notes

- All new templates will be **immediately visible** in the `/explore` gallery
- Category filter will now show the new categories (`utility`, `lifestyle`, `travel`)
- Search functionality works on the new wheel titles and segment text
- Each wheel has a **unique shareable URL** at `/[lang]/w/[slug]`

---

## 🎯 Next Steps

After running this migration:

1. **Test the Gallery**: Visit `/en/explore` to see new templates
2. **Test Categories**: Click category filters to verify grouping
3. **Test Search**: Search for "dinner" or "makan" to find food wheels
4. **Test Sharing**: Click any new wheel and share its URL
5. **Verify SEO**: Check `/sitemap.xml` includes new wheel slugs
