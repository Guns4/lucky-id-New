# LuckyGen - Spin the Wheel Decision Maker

A production-ready, viral "Spin the Wheel" tool built with Next.js 15, optimized for SEO and AdSense monetization.

## Features

-  🎯 **Frictionless UX**: No login required - start spinning immediately
- 🎨 **Customizable Wheels**: Add/edit/remove segments with custom colors
- 🎉 **Smooth Animations**: High-FPS physics-based spinning with Framer Motion
- 🔊 **Sound Effects**: Toggle-able spin and win sound effects
- 🎁 **Confetti Celebrations**: Animated confetti when winner is announced
- 📱 **Mobile-First**: Fully responsive design
- 🔗 **Shareable**: Save and share wheels with unique URLs
- 🌍 **Multi-Language Ready**: i18n routing structure (en, id, es)
- 💰 **AdSense Ready**: Pre-configured ad slots
- ⚡ **SEO Optimized**: Server-side rendering with dynamic metadata

## Tech Stack

- **Framework**: Next.js 15 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **State**: Zustand (with localStorage persistence)
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp env.template .env.local
   ```

4. Update `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

### Database Setup

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the migration file: `supabase/migrations/001_create_wheels.sql`

This will create:
- `wheels` table
- RLS policies (public read, anyone can create)
- View counter function
- Triggers for auto-updating timestamps

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000/en](http://localhost:3000/en) in your browser.

### Sound Effects

Add your own sound effect files to:
- `public/sounds/spin.mp3` - Plays when wheel starts spinning
- `public/sounds/win.mp3` - Plays when winner is announced

You can find free sound effects at:
- [Freesound.org](https://freesound.org/)
- [Zapsplat.com](https://www.zapsplat.com/)

### Open Graph Image

Add a default Open Graph image:
- `public/images/og-default.png` (1200x630px)

## Project Structure

```
luckygen/
├── src/
│   ├── app/
│   │   ├── [lang]/               # Language-specific routes
│   │   │   ├── page.tsx          # Landing page
│   │   │   ├── layout.tsx        # Language layout
│   │   │   └── w/[slug]/         # Shared wheel pages (SSR)
│   │   │       └── page.tsx
│   │   ├── api/
│   │   │   └── wheels/create/    # Save wheel API
│   │   ├── layout.tsx            # Root layout
│   │   └── globals.css
│   ├── components/
│   │   ├── wheel/                # Wheel, Confetti
│   │   ├── forms/                # SegmentEditor, PresetTemplates
│   │   ├── ads/                  # Ad slot components
│   │   └── shared/               # ShareButton
│   └── lib/
│       ├── supabase/             # DB clients & queries
│       ├── store/                # Zustand state
│       └── utils/                # Helpers (physics, slug, colors)
├── supabase/
│   └── migrations/               # Database schema
└── public/
    ├── sounds/                   # Audio files
    └── images/                   # Images & OG assets
```

## Features Guide

### Preset Templates

Quick-start wheels for common use cases:
- Yes/No
- What to Eat?
- Random 1-100
- Truth or Dare

### Sharing Wheels

1. Customize your wheel
2. Click "Share Wheel"
3. Wheel is saved to database with unique slug
4. Get shareable URL: `/en/w/your-wheel-name`
5. Each shared wheel has its own Open Graph metadata for social sharing

### AdSense Integration

Ad slots are pre-configured but need your AdSense code:

1. Get approved for Google AdSense
2. Add your AdSense script to `src/app/layout.tsx`
3. Update ad slot components in `src/components/ads/`

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

Works on any Next.js hosting:
- Netlify
- Cloudflare Pages
- AWS Amplify
- Railway

## SEO Best Practices

- ✅ Server-side rendering for shared wheels
- ✅ Dynamic metadata generation
- ✅ Canonical URLs
- ✅ Open Graph tags
- ✅ Twitter Card meta
- ✅ Semantic HTML
- ✅ Mobile-first responsive design

## Performance Optimization

- Uses Next.js App Router for optimal performance
- Turbopack for fast development builds
- Framer Motion for hardware-accelerated animations
- LocalStorage persistence (no unnecessary server calls)
- Lazy loading for heavy components

## License

MIT License - feel free to use for commercial projects!

## Support

For issues or questions, please file an issue on GitHub.

## Credits

Built with ❤️ using:
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Supabase](https://supabase.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
