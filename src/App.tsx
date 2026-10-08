import { useState, useEffect, useCallback, useMemo } from 'react';
import { ALL_RAW_KEYWORDS } from './data/keywords';
import {
  Movie,
  Genre,
  getPopularMovies,
  getNowPlayingMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  searchMovies,
  getGenres,
  getBackdropUrl,
} from './services/tmdb';
import { Navbar } from './components/Navbar';
import { MovieCard } from './components/MovieCard';
import { TrailerModal } from './components/TrailerModal';
import { ContactModal } from './components/ContactModal';
import { AboutModal } from './components/AboutModal';
import { PrivacyModal } from './components/PrivacyModal';
import { Footer } from './components/Footer';
import { Play, Star, Calendar, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';

export default function App() {
  const fullText = ALL_RAW_KEYWORDS.join(', ');

  // State
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [activeTab, setActiveTab] = useState<string>('popular');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  // Modal states
  const [selectedTrailerMovie, setSelectedTrailerMovie] = useState<Movie | null>(null);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState<boolean>(false);

  // Fetch genres on initial load
  useEffect(() => {
    getGenres()
      .then((data) => setGenres(data))
      .catch((err) => console.error('Failed to load genres:', err));
  }, []);

  const genreMap = useMemo(() => {
    const map = new Map<number, string>();
    genres.forEach((g) => map.set(g.id, g.name));
    return map;
  }, [genres]);

  // Fetch movies based on active tab or search
  const loadMovies = useCallback(async (tab: string, query: string, page = 1, append = false) => {
    if (page === 1) setLoading(true);
    else setLoadingMore(true);
    setError(null);

    try {
      let data: { results: Movie[]; total_pages: number };

      if (query.trim()) {
        data = await searchMovies(query.trim(), page);
      } else {
        switch (tab) {
          case 'now_playing':
            data = await getNowPlayingMovies(page);
            break;
          case 'top_rated':
            data = await getTopRatedMovies(page);
            break;
          case 'upcoming':
            data = await getUpcomingMovies(page);
            break;
          case 'popular':
          default:
            data = await getPopularMovies(page);
            break;
        }
      }

      setMovies((prev) => (append ? [...prev, ...data.results] : data.results));
      setTotalPages(Math.min(data.total_pages, 50));
      setCurrentPage(page);
    } catch (err: unknown) {
      console.error('TMDB API Error:', err);
      const message = err instanceof Error ? err.message : 'Failed to retrieve movie database.';
      setError(message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    loadMovies(activeTab, searchQuery, 1, false);
  }, [activeTab, searchQuery, loadMovies]);

  const handleTabSelect = (tab: string) => {
    setActiveTab(tab);
    setSearchQuery('');
    setSelectedGenre(null);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSelectedGenre(null);
      loadMovies(activeTab, searchQuery, 1, false);
    }
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages && !loadingMore) {
      loadMovies(activeTab, searchQuery, currentPage + 1, true);
    }
  };

  // Filter movies by genre if selected
  const displayedMovies = useMemo(() => {
    if (!selectedGenre) return movies;
    return movies.filter((m) => m.genre_ids?.includes(selectedGenre));
  }, [movies, selectedGenre]);

  // Featured hero movie (first high-voted item from popular list)
  const featuredMovie = useMemo(() => {
    if (searchQuery || movies.length === 0) return null;
    return movies[0];
  }, [movies, searchQuery]);

  return (
    <div className="relative min-h-screen w-full bg-white selection:bg-zinc-200 selection:text-zinc-900 font-sans antialiased text-zinc-900 overflow-x-hidden flex flex-col justify-between">
      {/* Background overlay text camouflaged in white against the white page */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none p-6 sm:p-10 md:p-16 lg:p-20 text-white font-sans text-sm sm:text-base md:text-lg lg:text-xl font-medium tracking-tight leading-loose sm:leading-loose text-justify break-words absolute inset-0 -z-10 overflow-hidden"
        style={{ color: '#ffffff', backgroundColor: 'transparent' }}
      >
        {fullText}
      </div>

      {/* Main Website Structure - GeneratePress / Astra clean theme */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Top Info Bar */}
        <div className="bg-zinc-900 text-zinc-300 text-xs py-2 px-4 border-b border-zinc-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-[11px] sm:text-xs text-zinc-300">
                Official Movie Trailers Portal • Powered by TMDB API Database
              </span>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-zinc-400">
              <a
                href="mailto:yourmovies@movies.com"
                className="hover:text-white transition-colors flex items-center gap-1 font-medium text-zinc-300"
              >
                Inquiries: yourmovies@movies.com
              </a>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Mobile-First &amp; Fast</span>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <Navbar
          activeTab={activeTab}
          onSelectTab={handleTabSelect}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearchSubmit={handleSearchSubmit}
          onOpenAbout={() => setIsAboutOpen(true)}
          onOpenPrivacy={() => setIsPrivacyOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
        />

        {/* Featured Hero Banner (Only when not actively searching) */}
        {featuredMovie && !searchQuery && (
          <section className="relative bg-zinc-950 text-white overflow-hidden border-b border-zinc-200">
            {/* Background Backdrop Image - Brightened to vividly show the movie scene */}
            <div className="absolute inset-0 z-0 opacity-85">
              <img
                src={getBackdropUrl(featuredMovie.backdrop_path, 'w1280')}
                alt={featuredMovie.title}
                className="w-full h-full object-cover object-center brightness-105 contrast-105"
                loading="eager"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/25 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/85 via-zinc-950/35 to-transparent" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl space-y-4 bg-zinc-950/60 backdrop-blur-xs p-6 sm:p-8 rounded-2xl border border-white/15 shadow-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-zinc-800/90 text-amber-400 text-xs font-semibold uppercase tracking-wider backdrop-blur-xs border border-zinc-700">
                  <Sparkles className="w-3.5 h-3.5" />
                  Featured Trending Trailer
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight drop-shadow-sm">
                  {featuredMovie.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-zinc-200 font-medium">
                  <span className="flex items-center gap-1 bg-amber-500/25 text-amber-300 px-2.5 py-1 rounded border border-amber-500/40">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {featuredMovie.vote_average.toFixed(1)} / 10
                  </span>
                  {featuredMovie.release_date && (
                    <span className="flex items-center gap-1 text-zinc-300">
                      <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                      {featuredMovie.release_date.split('-')[0]}
                    </span>
                  )}
                  {featuredMovie.genre_ids && featuredMovie.genre_ids.length > 0 && (
                    <span className="text-zinc-300">
                      {featuredMovie.genre_ids
                        .map((id) => genreMap.get(id))
                        .filter(Boolean)
                        .slice(0, 3)
                        .join(' • ')}
                    </span>
                  )}
                </div>

                <p className="text-sm sm:text-base text-zinc-200 line-clamp-3 leading-relaxed max-w-xl">
                  {featuredMovie.overview}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setSelectedTrailerMovie(featuredMovie)}
                    className="px-5 py-2.5 bg-white text-zinc-950 hover:bg-zinc-100 font-bold text-xs sm:text-sm rounded-md flex items-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-zinc-950" />
                    Watch Official Trailer
                  </button>
                  <button
                    onClick={() => setIsAboutOpen(true)}
                    className="px-4 py-2.5 bg-zinc-800/90 hover:bg-zinc-800 text-white font-medium text-xs sm:text-sm rounded-md border border-zinc-700 transition-colors"
                  >
                    About CinemaTrailers
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
          {/* Header Title & Genre Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 mb-6 border-b border-zinc-200 gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-950 tracking-tight capitalize">
                {searchQuery
                  ? `Search Results for "${searchQuery}"`
                  : activeTab.replace('_', ' ') + ' Movie Trailers'}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
                {searchQuery
                  ? `Found ${displayedMovies.length} title(s) matching your inquiry`
                  : 'Stream high-definition official movie previews and cinematic teasers'}
              </p>
            </div>

            {/* Genre Filter Pills */}
            {genres.length > 0 && (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar text-xs">
                <button
                  onClick={() => setSelectedGenre(null)}
                  className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-colors shrink-0 text-xs font-medium ${
                    selectedGenre === null
                      ? 'bg-zinc-900 text-white'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  All Genres
                </button>
                {genres.slice(0, 8).map((genre) => (
                  <button
                    key={genre.id}
                    onClick={() => setSelectedGenre(selectedGenre === genre.id ? null : genre.id)}
                    className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-colors shrink-0 text-xs font-medium ${
                      selectedGenre === genre.id
                        ? 'bg-zinc-900 text-white'
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    }`}
                  >
                    {genre.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="py-20 flex flex-col items-center justify-center text-zinc-500 space-y-3">
              <div className="w-8 h-8 border-3 border-zinc-300 border-t-zinc-900 rounded-full animate-spin" />
              <p className="text-xs font-medium">Connecting to TMDB API database...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="p-6 bg-red-50 border border-red-200 rounded-xl text-center max-w-md mx-auto my-12 space-y-3">
              <AlertCircle className="w-8 h-8 text-red-600 mx-auto" />
              <h3 className="font-bold text-red-900 text-sm">Unable to retrieve movies</h3>
              <p className="text-xs text-red-700">{error}</p>
              <button
                onClick={() => loadMovies(activeTab, searchQuery, 1)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white text-xs font-semibold rounded"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Retry Request
              </button>
            </div>
          )}

          {/* Movies Grid (Mobile-First 1 -> 2 -> 3 -> 4 -> 5 cols) */}
          {!loading && !error && displayedMovies.length > 0 && (
            <div className="space-y-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6">
                {displayedMovies.map((movie) => {
                  const movieGenreNames = movie.genre_ids
                    ?.map((id) => genreMap.get(id))
                    .filter((name): name is string => typeof name === 'string');

                  return (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      genreNames={movieGenreNames}
                      onWatchTrailer={(m) => setSelectedTrailerMovie(m)}
                    />
                  );
                })}
              </div>

              {/* Load More Button (GeneratePress lightweight pagination) */}
              {currentPage < totalPages && (
                <div className="flex justify-center pt-6">
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="px-6 py-2.5 bg-white border border-zinc-300 hover:border-zinc-900 text-zinc-900 text-xs sm:text-sm font-semibold rounded-md shadow-xs transition-colors flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {loadingMore ? (
                      <>
                        <div className="w-4 h-4 border-2 border-zinc-400 border-t-zinc-900 rounded-full animate-spin" />
                        <span>Loading more movies...</span>
                      </>
                    ) : (
                      <>
                        <span>Load More Trailers</span>
                        <span className="text-zinc-400 font-normal">
                          (Page {currentPage} of {totalPages})
                        </span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Empty Search / No Results State */}
          {!loading && !error && displayedMovies.length === 0 && (
            <div className="py-20 text-center border border-dashed border-zinc-200 rounded-xl space-y-3">
              <p className="text-sm font-medium text-zinc-900">
                No movie trailers found for your criteria.
              </p>
              <p className="text-xs text-zinc-500">
                Try searching for a different title or resetting the genre filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedGenre(null);
                }}
                className="px-4 py-2 bg-zinc-900 text-white text-xs font-semibold rounded-md hover:bg-zinc-800"
              >
                Clear Filter
              </button>
            </div>
          )}
        </main>

        {/* Footer */}
        <Footer
          onSelectTab={handleTabSelect}
          onOpenAbout={() => setIsAboutOpen(true)}
          onOpenPrivacy={() => setIsPrivacyOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
        />
      </div>

      {/* Trailer Modal */}
      <TrailerModal
        movie={selectedTrailerMovie}
        onClose={() => setSelectedTrailerMovie(null)}
      />

      {/* Contact Us Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* About Section Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      {/* Privacy Policy Modal */}
      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </div>
  );
}
