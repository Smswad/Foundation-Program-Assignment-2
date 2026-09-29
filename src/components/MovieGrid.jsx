/**
 * MovieGrid — renders a responsive grid of movie cards.
 *
 * Props:
 *   movies      {Object[]}  Array of full or partial OMDb movie objects.
 *   isLoading   {boolean}   Show skeleton shimmer cards while fetching.
 *   onSeeDetails {Function} Called with a movie object when the card is clicked.
 *
 * Empty-array case: shows a friendly "no results" message.
 */
export default function MovieGrid({ movies = [], isLoading = false, onSeeDetails }) {
  /* --- Skeleton shimmer card ------------------------------------------- */
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4 md:px-8 lg:px-10 py-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex flex-col rounded-xl overflow-hidden bg-surface-container animate-pulse">
            <div className="aspect-[2/3] bg-surface-container-high" />
            <div className="p-3 flex flex-col gap-2">
              <div className="h-3.5 bg-surface-container-high rounded w-3/4" />
              <div className="h-3 bg-surface-container-high rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  /* --- Empty state ------------------------------------------------------- */
  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-center px-4">
        <span className="material-symbols-outlined text-primary-container text-[48px]">
          movie_filter
        </span>
        <p className="text-on-surface font-display text-lg font-semibold">
          No movies found
        </p>
        <p className="text-on-surface-variant text-sm max-w-xs">
          Try a different search term or browse our curated list.
        </p>
      </div>
    )
  }

  /* --- Grid --------------------------------------------------------------- */
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4 md:px-8 lg:px-10 py-6">
      {movies.map((movie) => {
        const poster = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : null
        const title  = movie.Title ?? movie.title ?? '—'
        const year   = movie.Year ?? '—'
        const rating = movie.imdbRating && movie.imdbRating !== 'N/A'
          ? movie.imdbRating
          : null

        return (
          <article
            key={movie.imdbID}
            onClick={() => onSeeDetails?.(movie)}
            className="flex flex-col rounded-xl overflow-hidden bg-surface-container shadow-xl cursor-pointer group hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)] hover:-translate-y-1 transition-all duration-300"
          >
            {/* Poster */}
            <div className="relative aspect-[2/3] bg-surface-container-lowest overflow-hidden">
              {poster ? (
                <img
                  src={poster}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-[48px] opacity-30">
                    movie
                  </span>
                </div>
              )}

              {/* IMDb rating badge */}
              {rating && (
                <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-container-lowest/85 backdrop-blur-md">
                  <span
                    className="material-symbols-outlined text-primary-container text-[12px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="text-primary-container text-[11px] font-bold tracking-wide">
                    {rating}
                  </span>
                </div>
              )}
            </div>

            {/* Meta */}
            <div className="p-3 flex flex-col gap-1">
              <p className="text-on-surface text-sm font-semibold line-clamp-2 leading-snug">
                {title}
              </p>
              <p className="text-on-surface-variant text-xs">{year}</p>
            </div>
          </article>
        )
      })}
    </div>
  )
}
