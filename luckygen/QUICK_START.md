# 🎯 LuckyGen Quick Start Guide

## Immediate Next Steps

### 1. Set Up Supabase (5 minutes)

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for database to initialize
3. Go to **SQL Editor** → Click **New Query**
4. Copy and paste the contents of `supabase/migrations/001_create_wheels.sql`
5. Click **Run**
6. Go to **Settings** → **API** and copy:
   - Project URL
   - `anon/public` key

### 2. Configure Environment (1 minute)

Create `.env.local` in project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Add Sound Effects (Optional)

Download free sounds from [Freesound.org](https://freesound.org/) or [Zapsplat.com](https://www.zapsplat.com/)

Required files:
- `public/sounds/spin.mp3` - Wheel spinning sound
- `public/sounds/win.mp3` - Winner celebration sound

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000/en](http://localhost:3000/en)

---

## Test the Application

### Test Flow

1. **Landing Page**:
   - Click a preset template (e.g., "Yes/No")
   - Click SPIN button
   - Observe smooth animation
   - Winner should display with confetti

2. **Custom Wheel**:
   - Type an option in input field
   - Press Enter or click "Add"
   - Click color circle to change color
   - Add at least 2 options
   - Click SPIN

3. **Share Feature**:
   - Add 2+ segments
   - Click "Share Wheel"
   - Copy the generated URL
   - Open in new tab/window
   - Verify wheel displays correctly

4. **Mobile Test**:
   - Open on mobile or resize browser < 768px
   - Test touch interactions
   - Verify responsive layout

---

## Deploy to Vercel (10 minutes)

### Option 1: GitHub (Recommended)

```bash
# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit: LuckyGen app"

# Create GitHub repo and push
git remote add origin https://github.com/yourusername/luckygen.git
git push -u origin main
```

Then:
1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Select your GitHub repo
4. Add environment variables from `.env.local`
5. Click "Deploy"

### Option 2: Vercel CLI

```bash
npm i -g vercel
vercel
```

Follow prompts and add environment variables.

---

## Add Google AdSense (After Launch)

### Step 1: Apply for AdSense

1. Go to [google.com/adsense](https://www.google.com/adsense)
2. Apply with your domain
3. Wait for approval (can take 1-2 weeks)

### Step 2: Add AdSense Code

Once approved, edit `src/app/layout.tsx`:

```tsx
<head>
  {/* Replace ca-pub-XXXXXXXXXX with your publisher ID */}
  <script 
    async 
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" 
    crossOrigin="anonymous"
  />
</head>
```

### Step 3: Update Ad Components

Edit `src/components/ads/TopLeaderboard.tsx` and `InContentAd.tsx`:

```tsx
<ins 
  className="adsbygoogle"
  style={{ display: 'block' }}
  data-ad-client="ca-pub-XXXXXXXXXX"
  data-ad-slot="1234567890"
  data-ad-format="auto"
  data-full-width-responsive="true"
/>
<script>
  (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

---

## Troubleshooting

### Build Errors

**Issue**: TypeScript errors during build
```bash
npm run build
```

**Solution**: Check console for specific errors. Most common:
- Missing environment variables
- Syntax errors in components

### Supabase Connection Issues

**Issue**: "Failed to create wheel" error

**Check**:
1. Environment variables are correct
2. RLS policies are enabled
3. Migration ran successfully

**Test connection**:
```bash
# In browser console on /en page
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
```

### Wheel Not Spinning

**Issue**: Click SPIN but nothing happens

**Check**:
- At least 2 segments added
- Browser console for errors
- Framer Motion installed: `npm list framer-motion`

---

## Performance Optimization

### Before Launch

1. **Add OG Image**: Create `public/images/og-default.png` (1200x630px)
2. **Test on Mobile**: Use real device or Chrome DevTools
3. **Run Lighthouse**: Aim for 90+ score
4. **Check Build Size**: `npm run build` - should be < 500KB initial
5. **Test Share URLs**: Create and share a test wheel

### After Launch

1. **Monitor Supabase**: Check database row count and bandwidth
2. **Track Analytics**: Add Google Analytics or Plausible
3. **SEO Check**: Use [Google Search Console](https://search.google.com/search-console)
4. **Speed Test**: [PageSpeed Insights](https://pagespeed.web.dev/)

---

## Customization Ideas

### Easy Wins

1. **Change Color Theme**: Edit gradients in `src/app/[lang]/page.tsx`
2. **Add More Presets**: Edit `src/components/forms/PresetTemplates.tsx`
3. **Custom Fonts**: Change from Inter to another in `src/app/layout.tsx`
4. **Additional Languages**: Add to `src/middleware.ts` and create translation files

### Advanced

1. **User Accounts**: Add Supabase Auth
2. **Wheel Gallery**: Show recently created wheels
3. **Wheel Templates**: Let users save/load templates
4. **Premium Features**: Unlock more segments, custom backgrounds
5. **Analytics Dashboard**: Track spins, shares, popular wheels

---

## Support & Resources

### Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Community

- Next.js Discord
- Supabase Discord
- Stack Overflow

---

## Success Checklist

Before going live:

- [ ] Supabase database configured
- [ ] Environment variables set
- [ ] Sound files added (or removed audio elements)
- [ ] OG image created
- [ ] Build passes (`npm run build`)
- [ ] Tested on mobile
- [ ] Tested sharing feature
- [ ] Custom domain configured (if applicable)
- [ ] Analytics added
- [ ] README updated with your info

---

## 🎉 You're Ready!

Your viral "Spin the Wheel" app is complete. Good luck with your launch! 🚀

**Pro tip**: Create some interesting example wheels and share them on social media to gain initial traction.
