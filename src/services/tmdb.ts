const TMDB_API_KEY = 'a9df3024ecdd6c3ed103bb998df53110';
const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

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
  genre_ids?: number[];
  genres?: { id: number; name: string }[];
  runtime?: number;
}

export interface VideoResult {
  id: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
}

export interface MovieDetail extends Movie {
  videos?: {
    results: VideoResult[];
  };
  credits?: {
    cast: { id: number; name: string; character: string; profile_path: string | null }[];
  };
  tagline?: string;
}

export interface Genre {
  id: number;
  name: string;
}

// In-memory cache to enhance performance and meet GTmetrix speed standards
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 10; // 10 minutes

async function fetchFromTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const urlParams = new URLSearchParams({
    api_key: TMDB_API_KEY,
    language: 'en-US',
    ...params,
  });

  const url = `${BASE_URL}${endpoint}?${urlParams.toString()}`;

  // Check cache
  const cached = cache.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T;
  }

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`TMDB error: ${res.status} ${res.statusText}`);
  }

  const data = (await res.json()) as T;
  cache.set(url, { data, timestamp: Date.now() });
  return data;
}

export async function getPopularMovies(page = 1): Promise<{ results: Movie[]; total_pages: number }> {
  return fetchFromTMDB<{ results: Movie[]; total_pages: number }>('/movie/popular', { page: String(page) });
}

export async function getNowPlayingMovies(page = 1): Promise<{ results: Movie[]; total_pages: number }> {
  return fetchFromTMDB<{ results: Movie[]; total_pages: number }>('/movie/now_playing', { page: String(page) });
}

export async function getTopRatedMovies(page = 1): Promise<{ results: Movie[]; total_pages: number }> {
  return fetchFromTMDB<{ results: Movie[]; total_pages: number }>('/movie/top_rated', { page: String(page) });
}

export async function getUpcomingMovies(page = 1): Promise<{ results: Movie[]; total_pages: number }> {
  return fetchFromTMDB<{ results: Movie[]; total_pages: number }>('/movie/upcoming', { page: String(page) });
}

export async function searchMovies(query: string, page = 1): Promise<{ results: Movie[]; total_pages: number }> {
  if (!query.trim()) return { results: [], total_pages: 0 };
  return fetchFromTMDB<{ results: Movie[]; total_pages: number }>('/search/movie', {
    query: query.trim(),
    page: String(page),
  });
}

export async function getMovieVideos(movieId: number): Promise<VideoResult[]> {
  const data = await fetchFromTMDB<{ results: VideoResult[] }>(`/movie/${movieId}/videos`);
  return data.results || [];
}

export async function getMovieDetails(movieId: number): Promise<MovieDetail> {
  return fetchFromTMDB<MovieDetail>(`/movie/${movieId}`, {
    append_to_response: 'videos,credits',
  });
}

export async function getGenres(): Promise<Genre[]> {
  const data = await fetchFromTMDB<{ genres: Genre[] }>('/genre/movie/list');
  return data.genres || [];
}

export function getPosterUrl(path: string | null, size: 'w185' | 'w342' | 'w500' = 'w342'): string {
  if (!path) return 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=80';
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

export function getBackdropUrl(path: string | null, size: 'w780' | 'w1280' = 'w1280'): string {
  if (!path) return 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1280&auto=format&fit=crop&q=80';
  return `${IMAGE_BASE_URL}/${size}${path}`;
}
