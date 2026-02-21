# 🎬 Tareq Cinema | منصة طارق سينما

<div align="center">
  <img src="public/logo.png" alt="Tareq Cinema Logo" width="200"/>
  
  **منصة streaming فاخرة لمشاهدة الأفلام والمسلسلات**
  
  [![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
</div>

---

## ✨ المزايا

### 🎨 **تصميم فاخر**
- واجهة سينمائية بألوان ذهبية وسوداء
- تأثيرات حبيبات السينما (Cinema Grain)
- رسوم متحركة سلسة
- تصميم responsive كامل

### 🌍 **متعدد اللغات**
- عربي (RTL) كامل
- إنجليزي (LTR)
- تبديل فوري بين اللغات
- ترجمة TMDB للمحتوى

### 🎥 **مشغل فيديو ذكي**
- 4 مصادر streaming:
  1. VidSrc.xyz (أساسي)
  2. 2Embed.cc (احتياطي 1)
  3. VidSrc.me (احتياطي 2)
  4. AutoEmbed.co (احتياطي 3)
- تبديل تلقائي عند الفشل
- واجهة مشغل احترافية

### ⭐ **Watchlist & Continue Watching**
- حفظ الأفلام المفضلة
- متابعة من حيث توقفت
- مزامنة سحابية (مع Supabase)
- LocalStorage كاحتياطي

### 🔐 **نظام المصادقة**
- تسجيل دخول بـ Google
- تسجيل دخول بالبريد
- ملفات شخصية للمستخدمين
- تكامل Supabase كامل

### 💬 **التعليقات والتقييمات**
- نظام تعليقات كامل
- تقييمات من المستخدمين
- ربط مع الملف الشخصي
- تعديل وحذف التعليقات

### 📊 **SEO & Analytics**
- Google Analytics مدمج
- OpenGraph tags كاملة
- JSON-LD Schema
- Sitemap ديناميكي

### 💰 **Google AdSense**
- مواضع إعلانات جاهزة
- Responsive ads
- تكامل كامل

---

## 🚀 البدء السريع

### 1️⃣ التثبيت

```bash
# استنساخ المشروع
git clone https://github.com/yourusername/tareq-cinema.git
cd tareq-cinema

# تثبيت الحزم
npm install
```

### 2️⃣ إعداد المتغيرات

أنشئ ملف `.env.local`:

```env
# TMDB API
NEXT_PUBLIC_TMDB_API_KEY=f505b8b24c4f44c5af10da19a905da3b

# Supabase (اختياري)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Analytics
NEXT_PUBLIC_GA_ID=G-93VZRV27VT

# Google AdSense
NEXT_PUBLIC_ADSENSE_ID=pub-7070515810008388
NEXT_PUBLIC_AD_SLOT=524634608

# Site URL
NEXT_PUBLIC_SITE_URL=https://tareq.live
```

### 3️⃣ التشغيل

```bash
# Development
npm run dev

# Production Build
npm run build
npm start
```

افتح المتصفح على: **http://localhost:3000** 🎉

---

## 📦 هيكل المشروع

```
tareq-cinema/
├── app/                    # Next.js 14 App Router
│   ├── layout.tsx         # Root layout + metadata
│   ├── page.tsx           # Homepage
│   ├── globals.css        # Global styles
│   ├── movie/[id]/        # Movie details
│   ├── series/[id]/       # TV show details
│   ├── search/            # Search page
│   └── my-list/           # Watchlist page
├── components/            # React components
│   ├── Navbar.tsx
│   ├── MovieCard.tsx
│   ├── VideoPlayer.tsx
│   └── ...
├── lib/                   # Utilities
│   ├── tmdb.ts           # TMDB API wrapper
│   ├── supabase.ts       # Supabase client
│   ├── i18n.ts           # Translations
│   └── localStorage.ts   # LocalStorage utils
├── types/                 # TypeScript types
├── public/               # Static assets
└── ...config files
```

---

## 🎯 الميزات المتقدمة

### 🔧 إعداد Supabase (اختياري)

1. **إنشاء مشروع**:
   - اذهب إلى [supabase.com](https://supabase.com)
   - أنشئ مشروع جديد

2. **إنشاء الجداول**:

```sql
-- جدول الملفات الشخصية
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- جدول Watchlist
CREATE TABLE watchlist (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  media_id INTEGER NOT NULL,
  media_type TEXT NOT NULL,
  title TEXT,
  poster_path TEXT,
  vote_average FLOAT,
  added_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, media_id)
);

-- جدول التعليقات
CREATE TABLE comments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  media_id INTEGER NOT NULL,
  media_type TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

3. **تفعيل Auth Providers**:
   - Google OAuth
   - Email/Password

4. **نسخ المتغيرات**:
   - Project URL
   - Anon Key
   - الصقهم في `.env.local`

---

## 🌐 النشر

### Cloudflare Pages

```bash
# 1. Build المشروع
npm run build

# 2. رفع مجلد /out إلى Cloudflare Pages
# - Build command: npm run build
# - Build output: out
# - Framework: Next.js (Static HTML Export)
```

### Vercel (الأسهل)

```bash
# 1. تثبيت Vercel CLI
npm i -g vercel

# 2. تسجيل الدخول
vercel login

# 3. النشر
vercel --prod
```

أو:
- ارفع على GitHub
- اربط مع Vercel
- أضف Environment Variables
- انشر تلقائياً! ✨

---

## 🎨 التخصيص

### تغيير الألوان

في `tailwind.config.js`:

```js
colors: {
  'tareq-gold': '#لونك_الذهبي',
  'tareq-red': '#لونك_الأحمر',
  // ...
}
```

### إضافة لغة جديدة

في `lib/i18n.ts`:

```ts
export const translations = {
  ar: { ... },
  en: { ... },
  fr: { // الفرنسية مثلاً
    home: 'Accueil',
    // ...
  }
}
```

### تعديل مصادر الفيديو

في `lib/tmdb.ts`:

```ts
export const getVideoSources = (id, type) => {
  return [
    { name: 'مصدرك', url: '...' },
    // ...
  ];
};
```

---

## 📱 PWA Support

المشروع جاهز ليعمل كـ Progressive Web App:

1. أضف `manifest.json` في `/public`
2. فعّل Service Worker
3. المستخدمون يقدروا يثبتوا الموقع كتطبيق!

---

## 🐛 استكشاف الأخطاء

### مشكلة: الصور لا تظهر
```bash
# تأكد من TMDB API Key صحيح
# تأكد من الـ domains في next.config.js
```

### مشكلة: اللغة لا تتغير
```bash
# امسح localStorage
localStorage.clear()
# أعد تحميل الصفحة
```

### مشكلة: Supabase لا يعمل
```bash
# تأكد من URL وKey صحيحين
# تأكد من الجداول موجودة
# تأكد من RLS policies صحيحة
```

---

## 📄 الرخصة

MIT License - استخدمه بحرية! 🎉

---

## 🤝 المساهمة

Pull requests مرحب بها! للتغييرات الكبيرة:
1. افتح issue أولاً
2. ناقش التغيير
3. قدم PR

---

## 💖 شكر خاص

- [TMDB](https://www.themoviedb.org/) - بيانات الأفلام
- [Next.js](https://nextjs.org/) - Framework
- [Supabase](https://supabase.com/) - Backend
- [Tailwind CSS](https://tailwindcss.com/) - Styling

---

<div align="center">
  <p>صنع بـ ❤️ في الأردن</p>
  <p>© 2024 Tareq Cinema | جميع الحقوق محفوظة</p>
</div>
