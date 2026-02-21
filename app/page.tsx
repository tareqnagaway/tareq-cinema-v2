'use client';

import { useEffect, useState } from 'react';
import { tmdbApi } from '@/lib/tmdb';
import { localStorageApi } from '@/lib/localStorage';
import MovieCard from '@/components/MovieCard';
import { Movie, TVShow } from '@/types';
import { getTranslation } from '@/lib/i18n';
import Link from 'next/link';
import { FiPlay, FiPlus, FiInfo } from 'react-icons/fi';

export default function HomePage() {
  const [language, setLanguage] = useState<'ar' | 'en'>('en');
  const [heroMovie, setHeroMovie] = useState<Movie | null>(null);
  const [trending, setTrending] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [popularTV, setPopularTV] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const lang = localStorageApi.getLanguage();
        setLanguage(lang);
        const langCode = lang === 'ar' ? 'ar-SA' : 'en-US';

        // Fetch all data
        const [trendingData, popularData, topRatedData, popularTVData] = await Promise.all([
          tmdbApi.getTrending(langCode),
          tmdbApi.getPopularMovies(langCode),
          tmdbApi.getTopRatedMovies(langCode),
          tmdbApi.getPopularTV(langCode),
        ]);

        setTrending(trendingData.results || []);
        setPopular(popularData.results || []);
        setTopRated(topRatedData.results || []);
        setPopularTV(popularTVData.results || []);

        // Set hero movie (first trending movie with backdrop)
        const heroData = trendingData.results?.find((m: Movie) => m.backdrop_path);
        setHeroMovie(heroData || null);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      {/* Hero Section */}
      {heroMovie && (
        <section className="relative h-[80vh] mb-12">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${tmdbApi.getImageUrl(heroMovie.backdrop_path, 'original')})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-tareq-darker via-transparent to-transparent"></div>
          </div>

          {/* Content */}
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-shadow-lg">
                {heroMovie.title}
              </h1>
              
              <div className="flex items-center space-x-4 rtl:space-x-reverse mb-6 text-sm">
                <span className="flex items-center space-x-1 rtl:space-x-reverse text-tareq-gold">
                  <span>★</span>
                  <span>{heroMovie.vote_average.toFixed(1)}</span>
                </span>
                {heroMovie.release_date && (
                  <span>{new Date(heroMovie.release_date).getFullYear()}</span>
                )}
              </div>

              <p className="text-lg text-gray-300 mb-8 line-clamp-3">
                {heroMovie.overview}
              </p>

              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <Link
                  href={`/movie/${heroMovie.id}`}
                  className="btn-primary flex items-center space-x-2 rtl:space-x-reverse"
                >
                  <FiPlay />
                  <span>{getTranslation(language, 'watchNow')}</span>
                </Link>
                <Link
                  href={`/movie/${heroMovie.id}`}
                  className="btn-secondary flex items-center space-x-2 rtl:space-x-reverse"
                >
                  <FiInfo />
                  <span>{getTranslation(language, 'moreInfo')}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Content Rows */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Trending */}
        <ContentRow
          title={getTranslation(language, 'trending')}
          items={trending}
          type="movie"
          language={language}
        />

        {/* Popular Movies */}
        <ContentRow
          title={getTranslation(language, 'popular')}
          items={popular}
          type="movie"
          language={language}
        />

        {/* Top Rated */}
        <ContentRow
          title={getTranslation(language, 'topRated')}
          items={topRated}
          type="movie"
          language={language}
        />

        {/* Popular TV Shows */}
        <ContentRow
          title={getTranslation(language, 'series')}
          items={popularTV}
          type="tv"
          language={language}
        />

        {/* AdSense Placeholder */}
        <div className="my-8">
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client={`ca-${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
            data-ad-slot={process.env.NEXT_PUBLIC_AD_SLOT}
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>
      </div>
    </div>
  );
}

// Content Row Component
function ContentRow({
  title,
  items,
  type,
  language,
}: {
  title: string;
  items: (Movie | TVShow)[];
  type: 'movie' | 'tv';
  language: 'ar' | 'en';
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 gradient-text">{title}</h2>
      <div className="flex space-x-4 rtl:space-x-reverse overflow-x-auto pb-4 scroll-container">
        {items.map((item) => (
          <MovieCard key={item.id} item={item} type={type} language={language} />
        ))}
      </div>
    </div>
  );
}
