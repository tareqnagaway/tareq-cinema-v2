'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiPlus, FiCheck, FiStar } from 'react-icons/fi';
import { tmdbApi } from '@/lib/tmdb';
import { localStorageApi } from '@/lib/localStorage';
import { Movie, TVShow } from '@/types';

interface MovieCardProps {
  item: Movie | TVShow;
  type: 'movie' | 'tv';
  language: 'ar' | 'en';
}

export default function MovieCard({ item, type, language }: MovieCardProps) {
  const [isInWatchlist, setIsInWatchlist] = useState(
    localStorageApi.isInWatchlist(item.id, type)
  );
  const [imageError, setImageError] = useState(false);

  const title = 'title' in item ? item.title : item.name;
  const releaseDate = 'release_date' in item ? item.release_date : item.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : '';

  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInWatchlist) {
      localStorageApi.removeFromWatchlist(item.id, type);
      setIsInWatchlist(false);
    } else {
      localStorageApi.addToWatchlist({
        id: item.id,
        type,
        title,
        poster_path: item.poster_path,
        vote_average: item.vote_average,
        added_at: new Date().toISOString(),
      });
      setIsInWatchlist(true);
    }
  };

  return (
    <Link
      href={`/${type}/${item.id}`}
      className="movie-card group block flex-shrink-0 w-40 sm:w-48 md:w-56"
    >
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-tareq-gray">
        {!imageError && item.poster_path ? (
          <Image
            src={tmdbApi.getImageUrl(item.poster_path, 'w500')}
            alt={title}
            fill
            sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, 224px"
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            <span className="text-4xl">🎬</span>
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-1 rtl:space-x-reverse text-tareq-gold">
                <FiStar fill="currentColor" size={14} />
                <span className="text-sm font-medium">
                  {item.vote_average.toFixed(1)}
                </span>
              </div>
              <button
                onClick={handleWatchlistToggle}
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                aria-label={isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
              >
                {isInWatchlist ? (
                  <FiCheck size={16} className="text-tareq-gold" />
                ) : (
                  <FiPlus size={16} className="text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Year Badge */}
        {year && (
          <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
            {year}
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="mt-2 text-sm font-medium line-clamp-2 text-gray-200 group-hover:text-white transition-colors">
        {title}
      </h3>
    </Link>
  );
}
