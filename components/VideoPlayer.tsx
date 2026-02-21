'use client';

import { useState } from 'react';
import { getVideoSources } from '@/lib/tmdb';
import { FiRefreshCw } from 'react-icons/fi';

interface VideoPlayerProps {
  id: number;
  type: 'movie' | 'tv';
  season?: number;
  episode?: number;
  language: 'ar' | 'en';
}

export default function VideoPlayer({ id, type, season, episode, language }: VideoPlayerProps) {
  const sources = getVideoSources(id, type, season, episode);
  const [currentSource, setCurrentSource] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleSourceChange = (index: number) => {
    setLoading(true);
    setCurrentSource(index);
  };

  const handleNext = () => {
    const nextIndex = (currentSource + 1) % sources.length;
    handleSourceChange(nextIndex);
  };

  return (
    <div className="space-y-4">
      {/* Player */}
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
            <div className="loader"></div>
          </div>
        )}
        
        <iframe
          src={sources[currentSource].url}
          className="w-full h-full"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          onLoad={() => setLoading(false)}
        />
      </div>

      {/* Source Selector */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-2 rtl:space-x-reverse flex-wrap gap-2">
          <span className="text-sm text-gray-400">
            {language === 'ar' ? 'المصدر:' : 'Source:'}
          </span>
          {sources.map((source, index) => (
            <button
              key={index}
              onClick={() => handleSourceChange(index)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentSource === index
                  ? 'bg-tareq-gold text-black'
                  : 'bg-tareq-gray text-white hover:bg-tareq-gray/80'
              }`}
            >
              {source.name}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-tareq-gray text-white rounded-lg hover:bg-tareq-gray/80 transition-colors"
        >
          <FiRefreshCw size={16} />
          <span className="text-sm">
            {language === 'ar' ? 'المصدر التالي' : 'Next Source'}
          </span>
        </button>
      </div>

      {/* Info */}
      <div className="text-sm text-gray-400 text-center">
        {language === 'ar' 
          ? 'إذا لم يعمل المصدر، جرب المصدر التالي' 
          : 'If source doesn\'t work, try the next one'}
      </div>
    </div>
  );
}
