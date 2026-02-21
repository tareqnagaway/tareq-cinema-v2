export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  original_language: string;
  adult: boolean;
  video: boolean;
}

export interface TVShow {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  original_language: string;
  origin_country: string[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface MovieDetails extends Movie {
  genres: Genre[];
  runtime: number;
  status: string;
  tagline: string;
  budget: number;
  revenue: number;
  production_countries: { iso_3166_1: string; name: string }[];
  spoken_languages: { iso_639_1: string; name: string }[];
}

export interface TVShowDetails extends TVShow {
  genres: Genre[];
  number_of_seasons: number;
  number_of_episodes: number;
  status: string;
  tagline: string;
  episode_run_time: number[];
  seasons: Season[];
}

export interface Season {
  id: number;
  season_number: number;
  episode_count: number;
  air_date: string;
  name: string;
  overview: string;
  poster_path: string | null;
}

export interface WatchlistItem {
  id: number;
  type: 'movie' | 'tv';
  title: string;
  poster_path: string | null;
  vote_average: number;
  added_at: string;
}

export interface UserComment {
  id: string;
  user_id: string;
  user_name: string;
  user_avatar?: string;
  media_id: number;
  media_type: 'movie' | 'tv';
  content: string;
  rating?: number;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
}

export type Language = 'ar' | 'en';

export interface TranslationKeys {
  home: string;
  movies: string;
  series: string;
  myList: string;
  search: string;
  trending: string;
  topRated: string;
  popular: string;
  nowPlaying: string;
  upcoming: string;
  watchNow: string;
  addToList: string;
  removeFromList: string;
  moreInfo: string;
  cast: string;
  similar: string;
  rating: string;
  releaseDate: string;
  runtime: string;
  overview: string;
  trailer: string;
  comments: string;
  writeComment: string;
  submit: string;
  login: string;
  logout: string;
  signUp: string;
  profile: string;
  settings: string;
}
