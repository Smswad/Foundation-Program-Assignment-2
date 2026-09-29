import { useEffect, useState } from 'react'
import { getMovieById } from '../services/omdb'

/**
 * MovieModal
 *
 * Matches Stitch "Movie Details Modal" designs:
 * - Desktop: Centered card dialog (max-w-[690px]), backdrop blur scrim,
 *   poster/backdrop banner at top (h-[270px]), gradient fade, floating close button,
 *   ratings, tags, overview, and cast credits.
 * - Mobile: Near full-screen bottom sheet (max-h-[92vh]), drag handle,
 *   touch-accessible close buttons (44px min), zero horizontal overflow.
 *
 * @param {{ imdbId: string|null, onClose: () => void }} props
 */
export default function MovieModal({ imdbId, onClose }) {
  const [movie, setMovie] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  /* ── Fetch full movie detail whenever imdbId changes ── */
  useEffect(() => {
    if (!imdbId) return

    let cancelled = false
    setMovie(null)
    setError(null)
    setIsLoading(true)

    getMovieById(imdbId)
      .then((data) => {
        if (!cancelled) {
          setMovie(data)
          setIsLoading(false)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message)
          setIsLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [imdbId])

  /* ── Escape key listener ── */
  useEffect(() => {
    if (!imdbId) return
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [imdbId, onClose])

  /* ── Prevent background scroll when modal is open ── */
  useEffect(() => {
    if (imdbId) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [imdbId])

  if (!imdbId) return null

  const genres = movie?.Genre
    ? movie.Genre.split(',').map((g) => g.trim()).filter(Boolean)
    : []

  const hasPoster = movie?.Poster && movie.Poster !== 'N/A'

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-label="Movie details modal"
    >
      {/* Modal Dialog Card */}
      <div
        className="w-full sm:max-w-[690px] max-h-[92vh] sm:max-h-[88vh] bg-[#16161D] rounded-t-3xl sm:rounded-2xl border-t sm:border border-outline-variant/40 shadow-2xl overflow-hidden flex flex-col transition-all animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Indicator */}
        <div className="sm:hidden w-full pt-3 pb-1 flex justify-center shrink-0 bg-[#16161D]">
          <div className="w-12 h-1.5 rounded-full bg-outline/40" />
        </div>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1 overscroll-contain">
          {/* Top Banner / Poster Section */}
          <div className="relative w-full h-[220px] sm:h-[280px] shrink-0 overflow-hidden bg-surface-container-lowest">
            {hasPoster ? (
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-surface-container text-on-surface-variant">
                <span className="material-symbols-outlined text-[56px] opacity-30">
                  movie
                </span>
              </div>
            )}

            {/* Gradient Scrim into Card Body */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#16161D] via-[#16161D]/40 to-transparent pointer-events-none" />

            {/* Badges Overlay */}
            {movie?.Rated && movie.Rated !== 'N/A' && (
              <span className="absolute top-3.5 left-4 px-2.5 py-1 rounded text-[11px] font-bold tracking-wider uppercase bg-black/70 backdrop-blur-md text-on-surface border border-outline-variant/60 shadow-md">
                {movie.Rated}
              </span>
            )}

            {/* Close Button — 44px min tap target */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="absolute top-3.5 right-4 w-11 h-11 rounded-full bg-black/60 hover:bg-black/80 active:scale-95 transition-all backdrop-blur-md border border-white/20 text-white flex items-center justify-center z-20 shadow-lg cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Modal Content Body */}
          <div className="px-5 sm:px-8 pb-8 pt-2 flex flex-col gap-4">
            {isLoading && (
              <div className="flex flex-col gap-3 py-10 animate-pulse">
                <div className="h-7 bg-surface-container rounded w-2/3" />
                <div className="h-4 bg-surface-container rounded w-1/3" />
                <div className="h-20 bg-surface-container rounded w-full mt-2" />
              </div>
            )}

            {error && (
              <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
                <span className="material-symbols-outlined text-error text-[40px]">
                  error_outline
                </span>
                <p className="text-on-surface font-semibold text-sm">{error}</p>
                <button
                  type="button"
                  onClick={onClose}
                  className="h-11 px-6 rounded-full bg-primary-container text-on-primary text-sm font-semibold hover:brightness-105 active:scale-95 transition-all"
                >
                  Close
                </button>
              </div>
            )}

            {!isLoading && !error && movie && (
              <>
                {/* Title & Ratings */}
                <div className="space-y-2">
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight leading-tight">
                    {movie.Title}
                  </h2>

                  {/* Metadata Row */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs sm:text-sm text-on-surface-variant font-medium">
                    {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                      <div className="flex items-center gap-1 font-bold text-primary-container">
                        <span
                          className="material-symbols-outlined text-[16px] text-primary-container"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                        <span className="text-on-surface text-sm font-bold">
                          {movie.imdbRating}
                        </span>
                        <span className="text-outline font-normal">/ 10</span>
                      </div>
                    )}

                    {movie.Released && movie.Released !== 'N/A' && (
                      <>
                        <span className="text-outline">•</span>
                        <div className="flex items-center gap-1">
                          <span>📅</span>
                          <span>{movie.Released}</span>
                        </div>
                      </>
                    )}

                    {movie.Runtime && movie.Runtime !== 'N/A' && (
                      <>
                        <span className="text-outline">•</span>
                        <span>{movie.Runtime}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Genre Badges */}
                {genres.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {genres.map((genre) => (
                      <span
                        key={genre}
                        className="px-3 py-1 text-xs rounded-full bg-surface-container text-on-surface-variant border border-outline-variant/60 font-medium"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                )}

                {/* Plot Overview */}
                {movie.Plot && movie.Plot !== 'N/A' && (
                  <div className="space-y-1.5 pt-2 border-t border-outline-variant/30">
                    <h3 className="text-[11px] font-bold tracking-widest text-on-surface-variant uppercase">
                      Overview
                    </h3>
                    <p className="text-sm sm:text-base leading-relaxed text-on-surface-variant">
                      {movie.Plot}
                    </p>
                  </div>
                )}

                {/* Cast / Director / Awards Credits Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-outline-variant/30 text-xs">
                  {movie.Director && movie.Director !== 'N/A' && (
                    <div>
                      <span className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider block mb-0.5">
                        Director
                      </span>
                      <span className="text-on-surface font-medium text-xs sm:text-sm">
                        {movie.Director}
                      </span>
                    </div>
                  )}

                  {movie.Actors && movie.Actors !== 'N/A' && (
                    <div>
                      <span className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider block mb-0.5">
                        Starring
                      </span>
                      <span className="text-on-surface font-medium text-xs sm:text-sm leading-normal block">
                        {movie.Actors}
                      </span>
                    </div>
                  )}

                  {movie.Awards && movie.Awards !== 'N/A' && (
                    <div className="sm:col-span-2 pt-1">
                      <span className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider block mb-0.5">
                        Awards
                      </span>
                      <span className="text-primary-container font-medium text-xs sm:text-sm">
                        {movie.Awards}
                      </span>
                    </div>
                  )}
                </div>

                {/* Actions Footer */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-outline-variant/30">
                  <div className="flex items-center gap-2.5 w-full sm:w-auto">
                    <button
                      type="button"
                      className="flex-1 sm:flex-initial h-11 px-6 bg-primary-container hover:brightness-105 active:scale-95 text-on-primary font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md shadow-primary-container/20 transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                      <span>Watch Trailer</span>
                    </button>
                    <button
                      type="button"
                      className="h-11 px-4 bg-surface-container hover:bg-surface-container-high active:scale-95 text-on-surface font-medium text-sm rounded-xl border border-outline-variant transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">bookmark_add</span>
                      <span className="hidden sm:inline">Watchlist</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full sm:w-auto h-11 px-5 border border-outline-variant hover:border-outline bg-transparent text-on-surface-variant hover:text-on-surface rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-95"
                  >
                    <span>Close</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
