import { useState, useEffect, useRef, useCallback } from 'react'
import SearchBar from '../components/SearchBar'
import MovieGrid from '../components/MovieGrid'
import MovieModal from '../components/MovieModal'
import { getCuratedMovies, searchMovies } from '../services/omdb'

const DEBOUNCE_MS = 400

export default function MovieListing() {
  const [movies, setMovies]           = useState([])
  const [isLoading, setIsLoading]     = useState(true)
  const [error, setError]             = useState(null)
  const [query, setQuery]             = useState('')
  const [selectedImdbId, setSelectedImdbId] = useState(null)

  // Stale-response guard: increment on each new fetch, discard if id mismatch
  const requestId = useRef(0)

  /* ── Load curated list on mount ── */
  useEffect(() => {
    let cancelled = false

    const loadCurated = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const data = await getCuratedMovies()
        if (!cancelled) setMovies(data)
      } catch (err) {
        if (!cancelled) setError(err.message ?? 'Failed to load movies.')
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    loadCurated()
    return () => { cancelled = true }
  }, [])

  /* ── Debounced search / revert-to-curated ── */
  useEffect(() => {
    if (query.trim() === '') {
      let cancelled = false
      setIsLoading(true)
      setError(null)

      getCuratedMovies()
        .then((data) => { if (!cancelled) { setMovies(data); setIsLoading(false) } })
        .catch((err)  => { if (!cancelled) { setError(err.message); setIsLoading(false) } })

      return () => { cancelled = true }
    }

    const id = ++requestId.current

    const timer = setTimeout(async () => {
      if (id !== requestId.current) return

      setIsLoading(true)
      setError(null)

      try {
        const results = await searchMovies(query.trim())
        if (id !== requestId.current) return
        setMovies(results)
      } catch (err) {
        if (id !== requestId.current) return
        setError(err.message ?? 'Search failed. Please try again.')
      } finally {
        if (id === requestId.current) setIsLoading(false)
      }
    }, DEBOUNCE_MS)

    return () => clearTimeout(timer)
  }, [query])

  /* ── onSeeDetails: receives the full (or partial) movie object from MovieGrid ── */
  const handleSeeDetails = useCallback((movie) => {
    setSelectedImdbId(movie.imdbID)
  }, [])

  const isSearching = query.trim().length > 0

  return (
    <div className="w-full flex flex-col min-h-[80vh]">
      {/* ── Page header + Search console ── */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-secondary-container/20 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-10 right-1/4 w-[420px] h-[220px] bg-primary-container/10 blur-[110px] rounded-full pointer-events-none" />

        <section className="relative w-full max-w-[1440px] mx-auto px-4 md:px-10 pt-8 pb-10 md:pb-12 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-surface-container-high text-primary text-xs font-semibold tracking-widest uppercase mb-4 shadow-sm">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span>Archive &amp; Premieres</span>
          </div>

          <h1 className="font-display text-4xl md:text-[48px] leading-tight md:leading-[54px] tracking-tight text-on-surface font-extrabold max-w-3xl">
            Explore{' '}
            <span className="text-primary-container drop-shadow-[0_0_24px_rgba(245,197,24,0.35)]">
              Cinema
            </span>
          </h1>

          <p className="text-on-surface-variant text-sm md:text-base max-w-2xl mt-3 mb-8 leading-relaxed">
            Discover over 250,000 films, curated retrospective collections, and
            festival laureates captured across global archives.
          </p>

          <div className="w-full max-w-3xl">
            <SearchBar value={query} onChange={setQuery} />
          </div>
        </section>
      </div>

      {/* ── Result count strip ── */}
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-10 pb-4 flex items-center justify-between">
        {!isLoading && !error && (
          <p className="text-on-surface-variant text-xs flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-container" />
            {isSearching
              ? `${movies.length} result${movies.length !== 1 ? 's' : ''} for "${query}"`
              : `Showing ${movies.length} curated films`}
          </p>
        )}
      </div>

      {/* ── Error state ── */}
      {error && (
        <div className="flex flex-col items-center justify-center gap-4 py-16 px-4 text-center">
          <span className="material-symbols-outlined text-error text-[40px]">error_outline</span>
          <p className="text-on-surface font-semibold">{error}</p>
          <button
            onClick={() => setQuery('')}
            className="px-5 py-2 rounded-full bg-primary-container text-on-primary text-sm font-semibold hover:brightness-105 active:scale-95 transition-all"
          >
            Back to curated list
          </button>
        </div>
      )}

      {/* ── Movie Grid ── */}
      {!error && (
        <MovieGrid
          movies={movies}
          isLoading={isLoading}
          onSeeDetails={handleSeeDetails}
        />
      )}

      {/* ── Movie Modal ── */}
      <MovieModal
        imdbId={selectedImdbId}
        onClose={() => setSelectedImdbId(null)}
      />
    </div>
  )
}
