const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

export const tmdbApi = {
  // Get image URL
  getImageUrl: (path: string | null, size: string = 'w500') => {
    if (!path) return '/placeholder.jpg';
    return `${TMDB_IMAGE_BASE}/${size}${path}`;
  },

  // Movies
  getTrending: async (language: string = 'en') => {
    const res = await fetch(
      `${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}&language=${language}`
    );
    return res.json();
  },

  getPopularMovies: async (language: string = 'en', page: number = 1) => {
    const res = await fetch(
      `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=${language}&page=${page}`
    );
    return res.json();
  },

  getTopRatedMovies: async (language: string = 'en', page: number = 1) => {
    const res = await fetch(
      `${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&language=${language}&page=${page}`
    );
    return res.json();
  },

  getNowPlaying: async (language: string = 'en', page: number = 1) => {
    const res = await fetch(
      `${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&language=${language}&page=${page}`
    );
    return res.json();
  },

  getUpcoming: async (language: string = 'en', page: number = 1) => {
    const res = await fetch(
      `${TMDB_BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}&language=${language}&page=${page}`
    );
    return res.json();
  },

  getMovieDetails: async (id: number, language: string = 'en') => {
    const res = await fetch(
      `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&language=${language}&append_to_response=credits,videos,similar`
    );
    return res.json();
  },

  // TV Shows
  getPopularTV: async (language: string = 'en', page: number = 1) => {
    const res = await fetch(
      `${TMDB_BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}&language=${language}&page=${page}`
    );
    return res.json();
  },

  getTopRatedTV: async (language: string = 'en', page: number = 1) => {
    const res = await fetch(
      `${TMDB_BASE_URL}/tv/top_rated?api_key=${TMDB_API_KEY}&language=${language}&page=${page}`
    );
    return res.json();
  },

  getTVDetails: async (id: number, language: string = 'en') => {
    const res = await fetch(
      `${TMDB_BASE_URL}/tv/${id}?api_key=${TMDB_API_KEY}&language=${language}&append_to_response=credits,videos,similar`
    );
    return res.json();
  },

  // Search
  searchMulti: async (query: string, language: string = 'en', page: number = 1) => {
    const res = await fetch(
      `${TMDB_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&language=${language}&query=${encodeURIComponent(query)}&page=${page}`
    );
    return res.json();
  },

  searchMovies: async (query: string, language: string = 'en', page: number = 1) => {
    const res = await fetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&language=${language}&query=${encodeURIComponent(query)}&page=${page}`
    );
    return res.json();
  },

  searchTV: async (query: string, language: string = 'en', page: number = 1) => {
    const res = await fetch(
      `${TMDB_BASE_URL}/search/tv?api_key=${TMDB_API_KEY}&language=${language}&query=${encodeURIComponent(query)}&page=${page}`
    );
    return res.json();
  },

  // Genres
  getMovieGenres: async (language: string = 'en') => {
    const res = await fetch(
      `${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}&language=${language}`
    );
    return res.json();
  },

  getTVGenres: async (language: string = 'en') => {
    const res = await fetch(
      `${TMDB_BASE_URL}/genre/tv/list?api_key=${TMDB_API_KEY}&language=${language}`
    );
    return res.json();
  },

  // Discover
  discoverMovies: async (options: {
    language?: string;
    page?: number;
    genre?: number;
    year?: number;
    sort?: string;
  }) => {
    const { language = 'en', page = 1, genre, year, sort = 'popularity.desc' } = options;
    let url = `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=${language}&page=${page}&sort_by=${sort}`;
    
    if (genre) url += `&with_genres=${genre}`;
    if (year) url += `&primary_release_year=${year}`;
    
    const res = await fetch(url);
    return res.json();
  },

  discoverTV: async (options: {
    language?: string;
    page?: number;
    genre?: number;
    year?: number;
    sort?: string;
  }) => {
    const { language = 'en', page = 1, genre, year, sort = 'popularity.desc' } = options;
    let url = `${TMDB_BASE_URL}/discover/tv?api_key=${TMDB_API_KEY}&language=${language}&page=${page}&sort_by=${sort}`;
    
    if (genre) url += `&with_genres=${genre}`;
    if (year) url += `&first_air_date_year=${year}`;
    
    const res = await fetch(url);
    return res.json();
  },
};

// Video player sources
export const getVideoSources = (id: number, type: 'movie' | 'tv', season?: number, episode?: number) => {
  if (type === 'movie') {
    return [
      {
        name: 'VidSrc',
        url: `https://vidsrc.xyz/embed/movie/${id}`,
        quality: 'HD',
      },
      {
        name: '2Embed',
        url: `https://www.2embed.cc/embed/${id}`,
        quality: 'HD',
      },
      {
        name: 'VidSrc.me',
        url: `https://vidsrc.me/embed/movie?tmdb=${id}`,
        quality: 'HD',
      },
      {
        name: 'AutoEmbed',
        url: `https://autoembed.co/movie/tmdb/${id}`,
        quality: 'HD',
      },
    ];
  } else {
    // TV Show
    const s = season || 1;
    const e = episode || 1;
    return [
      {
        name: 'VidSrc',
        url: `https://vidsrc.xyz/embed/tv/${id}/${s}/${e}`,
        quality: 'HD',
      },
      {
        name: '2Embed',
        url: `https://www.2embed.cc/embedtv/${id}&s=${s}&e=${e}`,
        quality: 'HD',
      },
      {
        name: 'VidSrc.me',
        url: `https://vidsrc.me/embed/tv?tmdb=${id}&season=${s}&episode=${e}`,
        quality: 'HD',
      },
      {
        name: 'AutoEmbed',
        url: `https://autoembed.co/tv/tmdb/${id}-${s}-${e}`,
        quality: 'HD',
      },
    ];
  }
};
