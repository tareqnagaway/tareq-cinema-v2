# 🗄️ دليل إعداد Supabase | Supabase Setup Guide

## 🌟 لماذا Supabase؟

Supabase هو بديل مفتوح المصدر لـ Firebase:
- ✅ **مجاني** - 500MB database + 50K users
- ✅ **سهل** - 5 دقائق للإعداد
- ✅ **قوي** - PostgreSQL حقيقي
- ✅ **آمن** - Row Level Security

---

## 📋 الخطوة 1: إنشاء المشروع

### 1. التسجيل
1. اذهب إلى: https://supabase.com
2. اضغط **Start your project**
3. سجل حساب (GitHub أو Email)

### 2. مشروع جديد
1. اضغط **New Project**
2. املأ المعلومات:
   - **Name**: tareq-cinema
   - **Database Password**: (احفظه! مهم جداً)
   - **Region**: اختر الأقرب (Middle East أو Europe)
3. اضغط **Create new project**

⏱️ **الانتظار**: 2-3 دقائق لإنشاء المشروع...

---

## 🏗️ الخطوة 2: إنشاء الجداول (Tables)

### 1. افتح SQL Editor

في لوحة Supabase:
1. اضغط **SQL Editor** (من القائمة اليسرى)
2. اضغط **New Query**

### 2. نسخ والصق هذا الكود:

```sql
-- ========================================
-- جدول الملفات الشخصية (Profiles)
-- ========================================
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- السماح للمستخدمين بقراءة كل الملفات
CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

-- السماح للمستخدمين بتعديل ملفاتهم فقط
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- ========================================
-- جدول Watchlist
-- ========================================
CREATE TABLE watchlist (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  media_id INTEGER NOT NULL,
  media_type TEXT NOT NULL CHECK (media_type IN ('movie', 'tv')),
  title TEXT,
  poster_path TEXT,
  vote_average REAL,
  added_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, media_id, media_type)
);

-- Index للأداء
CREATE INDEX idx_watchlist_user ON watchlist(user_id);
CREATE INDEX idx_watchlist_media ON watchlist(media_id);

-- Row Level Security
ALTER TABLE watchlist ENABLE ROW LEVEL SECURITY;

-- المستخدمون يقدروا يشوفوا watchlist تبعهم فقط
CREATE POLICY "Users can view own watchlist"
  ON watchlist FOR SELECT
  USING (auth.uid() = user_id);

-- المستخدمون يقدروا يضيفوا لـ watchlist تبعهم
CREATE POLICY "Users can insert into own watchlist"
  ON watchlist FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- المستخدمون يقدروا يحذفوا من watchlist تبعهم
CREATE POLICY "Users can delete from own watchlist"
  ON watchlist FOR DELETE
  USING (auth.uid() = user_id);

-- ========================================
-- جدول التعليقات (Comments)
-- ========================================
CREATE TABLE comments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  media_id INTEGER NOT NULL,
  media_type TEXT NOT NULL CHECK (media_type IN ('movie', 'tv')),
  content TEXT NOT NULL CHECK (char_length(content) >= 3),
  rating INTEGER CHECK (rating >= 1 AND rating <= 10),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index للأداء
CREATE INDEX idx_comments_media ON comments(media_id, media_type);
CREATE INDEX idx_comments_user ON comments(user_id);

-- Row Level Security
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- الكل يقدر يشوف التعليقات
CREATE POLICY "Comments are viewable by everyone"
  ON comments FOR SELECT
  USING (true);

-- المستخدمون يقدروا يضيفوا تعليقات
CREATE POLICY "Authenticated users can insert comments"
  ON comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- المستخدمون يقدروا يعدلوا تعليقاتهم فقط
CREATE POLICY "Users can update own comments"
  ON comments FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- المستخدمون يقدروا يحذفوا تعليقاتهم فقط
CREATE POLICY "Users can delete own comments"
  ON comments FOR DELETE
  USING (auth.uid() = user_id);

-- ========================================
-- Function: إنشاء profile تلقائياً عند التسجيل
-- ========================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ========================================
-- تم بنجاح! ✅
-- ========================================
```

### 3. تشغيل الكود
1. اضغط **Run** (أو Ctrl+Enter)
2. انتظر رسالة **Success** ✅

---

## 🔐 الخطوة 3: تفعيل Google Auth

### 1. الذهاب للإعدادات
1. في Supabase Dashboard
2. اضغط **Authentication** > **Providers**

### 2. تفعيل Google
1. ابحث عن **Google**
2. اضغط على المفتاح
3. فعّل **Enable Sign in with Google**

### 3. إعداد Google OAuth (اختياري للتطوير)
للتطوير المحلي، Supabase يوفر Google OAuth جاهز!

للإنتاج:
1. اذهب إلى: https://console.cloud.google.com
2. أنشئ مشروع جديد
3. فعّل Google+ API
4. أنشئ OAuth credentials
5. ضع Client ID و Secret في Supabase

---

## 🔑 الخطوة 4: نسخ المتغيرات

### 1. Project URL
1. في Supabase Dashboard
2. اضغط **Settings** > **API**
3. انسخ **Project URL**

### 2. Anon Key
1. في نفس الصفحة
2. انسخ **anon** **public** key

### 3. الصق في المشروع

في ملف `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## ✅ الخطوة 5: الاختبار

### 1. شغّل المشروع
```bash
npm run dev
```

### 2. اختبر التسجيل
1. اذهب إلى http://localhost:3000
2. اضغ **Login**
3. سجل حساب جديد
4. تأكد من عمل كل شي!

### 3. تحقق من البيانات
1. ارجع لـ Supabase Dashboard
2. اضغط **Table Editor**
3. شوف جدول **profiles** - لازم يكون فيه المستخدم الجديد!

---

## 🎯 ميزات إضافية (اختياري)

### 1. Email Templates
لتخصيص رسائل البريد:
1. **Authentication** > **Email Templates**
2. عدّل القوالب بالعربية

### 2. Storage (للصور)
لرفع صور المستخدمين:
1. **Storage** > **Create Bucket**
2. اسمه: `avatars`
3. اجعله **public**

### 3. Webhooks
لإشعارات عند تسجيل مستخدم جديد:
1. **Database** > **Webhooks**
2. أضف webhook للـ Discord/Slack

---

## 🐛 حل المشاكل

### مشكلة: الاتصال فاشل
```
❌ Error: Failed to connect to Supabase
```

**الحل**:
1. تأكد من URL و Key صحيحين
2. تأكد من وضعهم في `.env.local`
3. أعد تشغيل المشروع (`npm run dev`)

### مشكلة: RLS blocking requests
```
❌ Error: Row level security policy
```

**الحل**:
تأكد من تشغيل كل الـ policies في SQL Editor

### مشكلة: Google Auth لا يعمل
```
❌ Error: OAuth provider not configured
```

**الحل**:
1. تأكد من تفعيل Google في **Providers**
2. تأكد من Redirect URL صحيح

---

## 📚 موارد إضافية

- [Supabase Docs](https://supabase.com/docs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers)

---

## 🎉 مبروك!

الآن عندك:
- ✅ Database جاهزة
- ✅ Authentication شغالة
- ✅ Cloud Watchlist
- ✅ نظام تعليقات

**جاهز للإطلاق! 🚀**
