import { useEffect, useState } from 'react'
import { getMovieById } from '../services/omdb'

/**
 * MovieModal
 *
 * Matches the Stitch "Movie Details Modal" designs:
 *
 * Desktop: centered dialog (max-w-[690px]), dark scrim + backdrop-blur,
 *          poster/backdrop banner at top (h-[270px]), gradient fade into
 *          card body, floating X button top-right of image, title + Rated
 *          badge, ★ rating · 📅 date + runtime inline row, genre pills,
 *          Overview section, Director / Actors credits grid, action CTA
 *          row at bottom.
 *
 * Mobile:  full-screen scrim + backdrop-blur, slide-up bottom sheet
 *          (max-h-[94vh]), drag-handle pill at top, same image/content
 *          layout but stacked single-column, close button pinned to bottom.
 *
 * @param {{ imdbId: string|null, onClose: () => void }} props
 */
export default function MovieModal({ imdbId, onClose }) {
  const [movie, setMovie]       = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError]       = useState(null)

  /* ── Fetch full movie detail whenever imdbId changes ── */
  useEffect(() => {
    if (!imdbId) return

    let cancelled = false
    setMovie(null)
    setError(null)
    setIsLoading(true)

    getMovieById(imdbId)
      .then((data) => { if (!cancelled) { setMovie(data); setIsLoading(false) } })
      .catch((err) => { if (!cancelled) { setError(err.message); setIsLoading(false) } })

    return () => { cancelled = true }
  }, [imdbId])

  /* ── Escape key closes modal ── */
  useEffect(() => {
    if (!imdbId) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [imdbId, onClose])

  /* ── Scroll lock while open ── */
  useEffect(() => {
    if (imdbId) document.body.style.overflow = 'hidden'
    else        document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [imdbId])

  if (!imdbId) return null

  /* ── Helpers ── */
  const genres = movie?.Genre
    ? movie.Genre.split(',').map((g) => g.trim()).filter(Boolean)
    : []

  const hasPoster = movie?.Poster && movie.Poster !== 'N/A'

  /* ────────────────────────────────────────────────────────────────
     SHARED INNER CONTENT
     Used in both desktop card and mobile sheet
  ──────────────────────────────────────────────────────────────── */
  const ModalContent = () => (
    <>
      {/* ── Backdrop / Poster image + gradient scrim ── */}
      <div className="relative w-full h-[200px] sm:h-[270px] shrink-0 overflow-hidden bg-surface-container-lowest rounded-t-2xl">
        {hasPoster ? (
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="material-symbols-outlined text-on-surface-variant text-[64px] opacity-30">
              movie
            </span>
          </div>
        )}

        {/* Bottom gradient fade into card body */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#16161D] via-[#16161D]/40 to-transparent pointer-events-none" />

        {/* Rated badge — top left */}
        {movie?.Rated && movie.Rated !== 'N/A' && (
          <span className="absolute top-3 left-4 px-2.5 py-0.5 rounded text-[11px] font-semibold tracking-wider uppercase bg-black/60 backdrop-blur-md text-on-surface border border-outline-variant/60">
            {movie.Rated}
          </span>
        )}

        {/* Close button — top right (floats over image) */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 active:scale-95 transition-all backdrop-blur-md border border-white/20 text-white flex items-center justify-center z-20"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* ── Body ── */}
      {isLoading && (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 py-12 animate-pulse px-6">
          <div className="h-7 bg-surface-container-high rounded w-2/3" />
          <div className="h-4 bg-surface-container-high rounded w-1/2" />
          <div className="h-4 bg-surface-container-high rounded w-3/4" />
          <div className="h-4 bg-surface-container-high rounded w-5/6" />
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center justify-center gap-3 py-10 px-6 text-center">
          <span className="material-symbols-outlined text-error text-[36px]">error_outline</span>
          <p className="text-on-surface font-semibold text-sm">{error}</p>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-primary-container text-on-primary text-sm font-semibold hover:brightness-105 active:scale-95 transition-all"
          >
            Close
          </button>
        </div>
      )}

      {!isLoading && !error && movie && (
        <div className="px-6 sm:px-7 pb-7 pt-1 flex flex-col gap-4 -mt-1">
          {/* Title + Rated row */}
          <div className="flex items-start justify-between gap-3">
            <h2 className="font-display text-xl sm:text-2xl font-extrabold text-on-surface tracking-tight leading-tight">
              {movie.Title}
            </h2>
          </div>

          {/* Metadata row: ★ rating · 📅 date · runtime */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-on-surface-variant">
            {movie.imdbRating && movie.imdbRating !== 'N/A' && (
              <div className="flex items-center gap-1 font-bold text-primary-container">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-on-surface text-sm font-bold">{movie.imdbRating}</span>
                <span className="text-on-surface-variant font-normal">/ 10</span>
              </div>
            )}

            {movie.Released && movie.Released !== 'N/A' && (
              <>
                <span className="text-outline font-bold">•</span>
                <div className="flex items-center gap-1">
                  <span>📅</span>
                  <span>{movie.Released}</span>
                </div>
              </>
            )}

            {movie.Runtime && movie.Runtime !== 'N/A' && (
              <span className="text-outline">({movie.Runtime})</span>
            )}
          </div>

          {/* Genre pills */}
          {genres.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {genres.map((genre) => (
                <span
                  key={genre}
                  className="px-2.5 py-0.5 text-xs rounded-full bg-surface-container text-on-surface-variant border border-outline-variant/60 font-medium"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}

          {/* Overview */}
          {movie.Plot && movie.Plot !== 'N/A' && (
            <div className="space-y-1.5 pt-1 border-t border-outline-variant/40">
              <h4 className="text-[10px] font-bold tracking-widest text-on-surface-variant uppercase pt-2">
                Overview
              </h4>
              <p className="text-sm leading-relaxed text-on-surface-variant">
                {movie.Plot}
              </p>
            </div>
          )}

          {/* Director / Actors / Awards credits grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-outline-variant/40 text-xs">
            {movie.Director && movie.Director !== 'N/A' && (
              <div className="pt-1">
                <span className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider block mb-0.5">
                  Director
                </span>
                <span className="text-on-surface font-medium">{movie.Director}</span>
              </div>
            )}

            {movie.Actors && movie.Actors !== 'N/A' && (
              <div className="pt-1">
                <span className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider block mb-0.5">
                  Starring
                </span>
                <span className="text-on-surface font-medium leading-normal block">
                  {movie.Actors}
                </span>
              </div>
            )}

            {movie.Awards && movie.Awards !== 'N/A' && (
              <div className="sm:col-span-2 pt-1">
                <span className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider block mb-0.5">
                  Awards
                </span>
                <span className="text-primary-container font-medium">{movie.Awards}</span>
              </div>
            )}
          </div>

          {/* Desktop action footer */}
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-outline-variant/40">
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                className="inline-flex items-center gap-2 bg-primary-container hover:brightness-105 active:scale-95 text-on-primary font-bold text-sm px-5 py-2.5 rounded-xl transition duration-150 shadow-md shadow-primary-container/20"
              >
                <span>▶</span>
                <span>Watch Trailer</span>
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 bg-surface-container hover:bg-surface-container-high active:scale-95 text-on-surface font-medium text-sm px-4 py-2.5 rounded-xl border border-outline-variant transition duration-150"
              >
                <span>+</span>
                <span>Watchlist</span>
              </button>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 border border-outline-variant hover:border-outline bg-transparent text-on-surface-variant hover:text-on-surface px-4 py-2.5 rounded-xl text-sm font-medium transition duration-150 active:scale-95"
            >
              <span className="text-xs">✕</span>
              <span>Close</span>
            </button>
          </div>
        </div>
      )}
    </>
  )

  /* ────────────────────────────────────────────────────────────────
     RENDER
     Shared dark scrim + backdrop-blur backdrop.
     - Mobile: bottom sheet (slide-up, max-h-[94vh], rounded-t-3xl)
     - Desktop (sm+): centered dialog card (max-w-[690px], rounded-2xl)
  ──────────────────────────────────────────────────────────────── */
  return (
    /* Backdrop — clicking directly on it calls onClose */
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-label="Movie details"
    >
      {/* Drag handle — mobile only */}
      <div
        className="sm:hidden absolute top-[calc(6vh-18px)] left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-outline/60 z-50"
        aria-hidden="true"
      />

      {/* Modal card — stops click propagation so backdrop-click-to-close works */}
      <div
        className={[
          /* Mobile: full-width bottom sheet */
          'w-full max-h-[94vh] overflow-y-auto bg-[#16161D] rounded-t-3xl border-t border-x border-outline-variant/40 shadow-2xl',
          /* Desktop: centered dialog */
          'sm:rounded-2xl sm:border sm:border-outline-variant/40 sm:max-w-[690px] sm:max-h-[90vh] sm:overflow-y-auto',
          'flex flex-col transition-all scrollbar-none',
        ].join(' ')}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag indicator pill — mobile */}
        <div className="sm:hidden w-full pt-2.5 pb-1 flex justify-center shrink-0">
          <div className="w-10 h-1 rounded-full bg-outline/50" />
        </div>

        <ModalContent />
      </div>
    </div>
  )
}
