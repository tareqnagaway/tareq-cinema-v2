import { Language, TranslationKeys } from '@/types';

export const translations: Record<Language, TranslationKeys> = {
  ar: {
    home: 'الرئيسية',
    movies: 'أفلام',
    series: 'مسلسلات',
    myList: 'قائمتي',
    search: 'بحث',
    trending: 'الأكثر رواجاً',
    topRated: 'الأعلى تقييماً',
    popular: 'الأكثر شعبية',
    nowPlaying: 'يعرض الآن',
    upcoming: 'قريباً',
    watchNow: 'شاهد الآن',
    addToList: 'أضف للقائمة',
    removeFromList: 'إزالة من القائمة',
    moreInfo: 'المزيد من المعلومات',
    cast: 'طاقم العمل',
    similar: 'مشابه',
    rating: 'التقييم',
    releaseDate: 'تاريخ الإصدار',
    runtime: 'المدة',
    overview: 'نظرة عامة',
    trailer: 'المقدمة',
    comments: 'التعليقات',
    writeComment: 'اكتب تعليقاً',
    submit: 'إرسال',
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    signUp: 'إنشاء حساب',
    profile: 'الملف الشخصي',
    settings: 'الإعدادات',
  },
  en: {
    home: 'Home',
    movies: 'Movies',
    series: 'Series',
    myList: 'My List',
    search: 'Search',
    trending: 'Trending',
    topRated: 'Top Rated',
    popular: 'Popular',
    nowPlaying: 'Now Playing',
    upcoming: 'Upcoming',
    watchNow: 'Watch Now',
    addToList: 'Add to List',
    removeFromList: 'Remove from List',
    moreInfo: 'More Info',
    cast: 'Cast',
    similar: 'Similar',
    rating: 'Rating',
    releaseDate: 'Release Date',
    runtime: 'Runtime',
    overview: 'Overview',
    trailer: 'Trailer',
    comments: 'Comments',
    writeComment: 'Write a comment',
    submit: 'Submit',
    login: 'Login',
    logout: 'Logout',
    signUp: 'Sign Up',
    profile: 'Profile',
    settings: 'Settings',
  },
};

export const getTranslation = (lang: Language, key: keyof TranslationKeys): string => {
  return translations[lang][key] || translations.en[key];
};

export const formatRuntime = (minutes: number, lang: Language): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (lang === 'ar') {
    return `${hours} ساعة ${mins} دقيقة`;
  }
  return `${hours}h ${mins}m`;
};

export const formatDate = (dateString: string, lang: Language): string => {
  const date = new Date(dateString);
  
  if (lang === 'ar') {
    return date.toLocaleDateString('ar-EG', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
  
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

export const getLanguageCode = (lang: Language): string => {
  return lang === 'ar' ? 'ar-SA' : 'en-US';
};
