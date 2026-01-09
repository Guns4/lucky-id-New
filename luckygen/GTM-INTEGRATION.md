# Google Tag Manager Integration Guide

## 📊 Overview

Google Tag Manager (GTM) telah diintegrasikan ke dalam aplikasi LuckyGen untuk memudahkan pengelolaan analytics tags, tracking pixels, dan marketing scripts tanpa perlu mengubah kode.

## ✅ Status Instalasi

- ✅ GTM Script diinstal di `<head>`
- ✅ GTM NoScript fallback diinstal di `<body>`
- ✅ Komponen GTM dibuat sebagai reusable component
- ✅ Menggunakan Next.js `Script` component untuk optimal performance
- ✅ Strategy: `afterInteractive` untuk loading optimal

## 🔧 Implementation Details

### GTM Container ID
```
GTM-T9M5VNTT
```

### Files Modified/Created

1. **`src/components/analytics/GoogleTagManager.tsx`**
   - Komponen utama GTM
   - Terpisah dari logic aplikasi
   - Client-side only (`'use client'`)
   - Mendukung NoScript fallback

2. **`src/app/layout.tsx`**
   - GTM script di `<head>`
   - GTM NoScript di awal `<body>`
   - Integrasi dengan root layout

3. **`env.template`**
   - Template untuk environment variables
   - Mendukung konfigurasi GTM ID dari .env

## 🎯 Features

### 1. Automatic Page View Tracking
GTM secara otomatis melacak setiap page view di aplikasi.

### 2. Custom Event Tracking
Anda dapat menambahkan custom events dengan cara:

```typescript
// Di component manapun
declare global {
  interface Window {
    dataLayer: any[];
  }
}

// Push custom event
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'custom_event_name',
  eventCategory: 'Category',
  eventAction: 'Action',
  eventLabel: 'Label',
  eventValue: 123
});
```

### 3. E-commerce Tracking (Example)
```typescript
window.dataLayer.push({
  event: 'purchase',
  ecommerce: {
    transaction_id: 'T12345',
    value: 25.99,
    currency: 'USD',
    items: [{
      item_name: 'Premium Wheel',
      item_id: 'WHEEL123',
      price: 25.99,
      quantity: 1
    }]
  }
});
```

## 🚀 Next Steps - Google Tag Manager Console

### 1. Verifikasi Instalasi
1. Buka website: `https://www.luckygen.click`
2. Buka Chrome DevTools (F12)
3. Pergi ke tab **Network**
4. Filter: `gtm.js`
5. Refresh halaman
6. Pastikan `gtm.js?id=GTM-T9M5VNTT` ter-load

**Atau gunakan Google Tag Assistant:**
- Install extension: [Tag Assistant](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
- Buka website Anda
- Klik icon Tag Assistant
- Harus muncul: ✅ Google Tag Manager (GTM-T9M5VNTT)

### 2. Setup Tags di GTM Console

Login ke [Google Tag Manager](https://tagmanager.google.com) dan setup tags berikut:

#### A. Google Analytics 4 (GA4)
1. **New Tag** → **Google Analytics: GA4 Configuration**
2. Measurement ID: `G-XXXXXXXXXX` (dari Google Analytics)
3. Triggering: **All Pages**
4. Save & Publish

#### B. Facebook Pixel (Optional)
1. **New Tag** → **Custom HTML**
2. Paste Facebook Pixel code
3. Triggering: **All Pages**
4. Save & Publish

#### C. Google Ads Conversion (Optional)
1. **New Tag** → **Google Ads Conversion Tracking**
2. Conversion ID & Label
3. Triggering: **Custom Event** (e.g., 'purchase')
4. Save & Publish

### 3. Setup Variables

**Built-in Variables:**
- ✅ Enable: Page URL, Page Path, Referrer
- ✅ Enable: Click Element, Click Classes, Click ID
- ✅ Enable: Form Element, Form Classes, Form ID

**Custom Variables (Example):**
```
Variable Name: User ID
Type: Data Layer Variable
Data Layer Variable Name: userId
```

### 4. Setup Triggers

**Example Custom Triggers:**

#### Wheel Spin Event
```
Trigger Type: Custom Event
Event Name: wheel_spin
```

#### Result Share Event
```
Trigger Type: Custom Event
Event Name: share_result
```

### 5. Test & Debug

1. Di GTM Console, klik **Preview**
2. Enter URL: `https://www.luckygen.click`
3. Mode debug akan terbuka
4. Test semua events dan tags
5. Pastikan semua tags firing dengan benar

### 6. Publish Container

1. Klik **Submit** (tombol biru)
2. Version Name: `Initial GTM Setup`
3. Description: `Added GA4, custom events tracking`
4. Klik **Publish**

## 📈 Recommended Tags to Add

### Essential Tags:
1. ✅ **Google Analytics 4** - Website analytics
2. ✅ **Facebook Pixel** - Facebook Ads tracking (jika ada)
3. ✅ **Google Ads Conversion** - Google Ads tracking (jika ada)
4. ✅ **Hotjar** - Heatmap & session recording (optional)

### Custom Events to Track:
```javascript
// Wheel Events
- wheel_create
- wheel_spin
- wheel_result
- wheel_save
- wheel_share

// User Actions
- signup_complete
- login_success
- premium_upgrade

// Engagement
- video_play
- scroll_depth
- time_on_page
```

## 🔒 Security & Performance

### Performance Optimization
- ✅ Scripts loaded `afterInteractive` - tidak blocking initial render
- ✅ Client-side only - tidak impact SSR/SSG
- ✅ Async loading - tidak blocking page load

### Privacy & GDPR
⚠️ **Action Required:**
- [ ] Add Cookie Consent banner
- [ ] Respect user privacy preferences
- [ ] Update Privacy Policy

## 🛠️ Environment Variables (Optional)

Untuk menggunakan environment variables:

1. Edit `.env.local`:
```bash
NEXT_PUBLIC_GTM_ID=GTM-T9M5VNTT
```

2. Update `src/app/layout.tsx`:
```tsx
<GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || 'GTM-T9M5VNTT'} />
```

## 📚 Resources

- [GTM Documentation](https://developers.google.com/tag-manager)
- [GA4 Setup Guide](https://support.google.com/analytics/answer/9304153)
- [GTM Best Practices](https://www.simoahava.com/gtm-tips/)
- [DataLayer Examples](https://developers.google.com/tag-platform/tag-manager/datalayer)

## 🐛 Troubleshooting

### GTM Not Loading?
1. Check browser console for errors
2. Verify GTM ID is correct: `GTM-T9M5VNTT`
3. Check Network tab - gtm.js should load
4. Disable ad blockers

### Tags Not Firing?
1. Use GTM Preview mode
2. Check trigger configuration
3. Verify dataLayer events
4. Check GTM debug console

### Performance Issues?
1. Limit number of tags (max 20-30)
2. Use built-in tags instead of custom HTML
3. Avoid synchronous scripts
4. Use trigger conditions wisely

## ✅ Checklist

- [x] Install GTM script
- [x] Add NoScript fallback
- [x] Create GTM component
- [x] Integrate with layout
- [ ] Verify GTM loading on website
- [ ] Setup Google Analytics 4
- [ ] Configure custom events
- [ ] Test in Preview mode
- [ ] Publish container
- [ ] Add Cookie Consent (if needed)

---

**Next Steps:** Deploy to production dan verify GTM installation menggunakan Google Tag Assistant atau GTM Preview mode.
