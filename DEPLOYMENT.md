# 🚀 دليل النشر على Cloudflare Pages

## 📋 المتطلبات

- حساب Cloudflare (مجاني)
- المشروع جاهز ومُختبر محلياً
- GitHub account (اختياري ولكن مُفضّل)

---

## 🎯 الطريقة 1: النشر عبر GitHub (الأسهل)

### 1️⃣ رفع المشروع على GitHub

```bash
# Initialize git (إذا لم يكن موجود)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Tareq Cinema"

# أنشئ repository على GitHub ثم:
git remote add origin https://github.com/yourusername/tareq-cinema.git
git push -u origin main
```

### 2️⃣ ربط Cloudflare Pages

1. **اذهب إلى Cloudflare Dashboard**:
   - https://dash.cloudflare.com
   - اضغط **Workers & Pages**

2. **إنشاء Application**:
   - اضغط **Create application**
   - اختر **Pages**
   - اضغط **Connect to Git**

3. **ربط GitHub**:
   - سجل دخول إلى GitHub
   - اختر الـ repository: `tareq-cinema`
   - اضغط **Begin setup**

### 3️⃣ إعدادات البناء (Build Settings)

املأ الإعدادات التالية:

```
Production branch: main
Build command: npm run build
Build output directory: out
Root directory: /
```

**Framework preset**: اختار `Next.js (Static HTML Export)`

### 4️⃣ Environment Variables

اضغط **Add variable** وأضف:

```
NEXT_PUBLIC_TMDB_API_KEY = f505b8b24c4f44c5af10da19a905da3b
NEXT_PUBLIC_SUPABASE_URL = your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY = your_supabase_key
NEXT_PUBLIC_GA_ID = G-93VZRV27VT
NEXT_PUBLIC_ADSENSE_ID = pub-7070515810008388
NEXT_PUBLIC_AD_SLOT = 524634608
NEXT_PUBLIC_SITE_URL = https://tareq-cinema.pages.dev
```

### 5️⃣ النشر

1. اضغط **Save and Deploy**
2. انتظر 2-5 دقائق للبناء
3. سيعطيك URL مثل: `https://tareq-cinema.pages.dev`

✅ **مبروك! الموقع شغال!** 🎉

---

## 🎯 الطريقة 2: النشر المباشر (Wrangler CLI)

### 1️⃣ تثبيت Wrangler

```bash
npm install -g wrangler

# تسجيل الدخول
wrangler login
```

### 2️⃣ بناء المشروع

```bash
npm run build
```

### 3️⃣ النشر

```bash
wrangler pages deploy out --project-name=tareq-cinema
```

---

## 🌐 ربط Domain مخصص (tareq.live)

### 1️⃣ في Cloudflare Pages

1. اذهب إلى project: **tareq-cinema**
2. اضغط **Custom domains**
3. اضغط **Set up a custom domain**

### 2️⃣ أضف Domain

1. اكتب: `tareq.live`
2. اضغط **Continue**

### 3️⃣ تحديث DNS

إذا كان Domain بره Cloudflare:
1. اذهب إلى مزود الـ DNS
2. أضف CNAME record:
   ```
   Type: CNAME
   Name: @ (or tareq.live)
   Value: tareq-cinema.pages.dev
   ```

إذا كان Domain في Cloudflare:
- سيتم تلقائياً! ✅

### 4️⃣ تفعيل SSL

1. في Cloudflare Dashboard
2. **SSL/TLS** > **Overview**
3. اختر: **Full** أو **Full (strict)**

⏱️ انتظر 5-15 دقيقة للـ propagation

✅ **الآن tareq.live شغال!** 🎊

---

## ⚙️ إعدادات متقدمة

### 1. Build Configurations

في `package.json`, تأكد من:

```json
{
  "scripts": {
    "build": "next build",
    "export": "next export"
  }
}
```

### 2. Performance Optimization

في `next.config.js`:

```js
module.exports = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}
```

### 3. Headers & Redirects

أنشئ ملف `public/_headers`:

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin

/_next/static/*
  Cache-Control: public, max-age=31536000, immutable

/images/*
  Cache-Control: public, max-age=86400
```

أنشئ ملف `public/_redirects`:

```
/old-url /new-url 301
/api/* /api/:splat 200
```

---

## 🔄 التحديثات التلقائية

مع GitHub:
1. كل `git push` سيُشغّل بناء جديد تلقائياً
2. Preview للـ branches الأخرى
3. Rollback سهل

```bash
# تحديث الموقع
git add .
git commit -m "Update feature X"
git push

# Cloudflare سيبني ويرفع تلقائياً!
```

---

## 📊 Monitoring & Analytics

### 1. Cloudflare Analytics

في Dashboard:
- **Analytics** > **Web Analytics**
- شوف:
  - الزوار
  - Page views
  - البلدان
  - الأجهزة

### 2. Google Analytics

تم تفعيله تلقائياً مع `G-93VZRV27VT`

للتحقق:
1. افتح الموقع
2. افتح Developer Tools (F12)
3. شوف Console - لازم تشوف `gtag` requests

---

## 🐛 حل المشاكل الشائعة

### مشكلة: Build فاشل

```
❌ Error: Build failed
```

**الحل**:
1. تأكد من `npm run build` يشتغل محلياً
2. تأكد من كل Environment Variables موجودة
3. شوف Build logs للتفاصيل

### مشكلة: الصور لا تظهر

```
❌ Images not loading
```

**الحل**:
في `next.config.js`:
```js
images: {
  unoptimized: true,
}
```

### مشكلة: 404 على الصفحات

```
❌ 404 Not Found
```

**الحل**:
في `next.config.js`:
```js
trailingSlash: true,
```

### مشكلة: Environment Variables لا تعمل

```
❌ TMDB_API_KEY is undefined
```

**الحل**:
1. تأكد من إضافتها في Cloudflare Pages Settings
2. أعد البناء (Re-deploy)
3. تأكد من البادئة `NEXT_PUBLIC_`

---

## 🎯 Best Practices

### ✅ قبل النشر:

- [ ] اختبر محلياً: `npm run build && npm start`
- [ ] تأكد من كل Environment Variables
- [ ] اختبر اللغتين (عربي/إنجليزي)
- [ ] اختبر على موبايل
- [ ] شيك الـ SEO metadata

### ✅ بعد النشر:

- [ ] اختبر الموقع المباشر
- [ ] شيك Google Analytics
- [ ] اختبر AdSense
- [ ] اختبر Supabase Auth
- [ ] شوف Performance في Lighthouse

---

## 📈 تحسين الأداء

### 1. Enable Caching

في Cloudflare:
- **Caching** > **Configuration**
- Browser Cache TTL: `4 hours` or more

### 2. Minification

في Cloudflare:
- **Speed** > **Optimization**
- فعّل Auto Minify: HTML, CSS, JS

### 3. Image Optimization

استخدم WebP format:
```bash
# Convert images
npm install -g sharp-cli
sharp -i input.png -o output.webp
```

---

## 🔐 الأمان

### 1. Environment Variables

❌ **لا تضع** secrets في الكود!  
✅ **استخدم** Environment Variables فقط

### 2. API Keys

✅ TMDB API Key - safe (public)  
❌ Supabase Service Key - **NEVER** expose!  
✅ Supabase Anon Key - safe

### 3. CORS & Headers

مضبوطة تلقائياً في المشروع

---

## 📚 موارد إضافية

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Performance Best Practices](https://web.dev/fast/)

---

## 🎉 مبروك على الإطلاق!

الآن موقعك:
- ✅ مُستضاف مجاناً على Cloudflare
- ✅ SSL مفعّل تلقائياً
- ✅ CDN عالمي
- ✅ Updates تلقائية
- ✅ Performance ممتاز

**استمتع بـ Tareq Cinema! 🍿**
