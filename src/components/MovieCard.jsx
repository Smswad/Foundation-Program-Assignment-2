/**
 * MovieCard component.
 * Faithful to Stitch design:
 * - High-contrast cinematic dark theme
 * - Poster image with subtle gradient scrim & zoom hover
 * - Rating pill with gold star
 * - Title with truncate / clamp and gold hover
 * - Year and runtime metadata
 * - Touch-friendly hit target (min 44px interactive areas)
 *
 * @param {{ movie: Object, onClick: () => void }} props
 */
export default function MovieCard({ movie, onClick }) {
  const poster = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : null
  const title = movie.Title ?? movie.title ?? '—'
  const year = movie.Year ?? '—'
  const rating = movie.imdbRating && movie.imdbRating !== 'N/A' ? movie.imdbRating : null
  const type = movie.Type ? movie.Type.toUpperCase() : null

  return (
    <article
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.()
        }
      }}
      className="group relative flex flex-col bg-surface-container-low rounded-xl overflow-hidden shadow-md hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(245,197,24,0.15)] transition-all duration-300 cursor-pointer border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary-container min-h-[44px]"
    >
      {/* Media Banner Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-surface-container-lowest">
        {poster ? (
          <img
            src={poster}
            alt={title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-on-surface-variant bg-surface-container">
            <span className="material-symbols-outlined text-[48px] opacity-30">
              movie
            </span>
            <span className="text-xs font-medium opacity-50 px-2 text-center">No Poster</span>
          </div>
        )}

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/20 to-transparent pointer-events-none" />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
          {rating ? (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-surface-container-lowest/85 backdrop-blur-md shadow-sm border border-outline-variant/30">
              <span
                className="material-symbols-outlined text-primary-container text-[14px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span className="text-primary-container text-xs font-bold tracking-tight">
                {rating}
              </span>
            </div>
          ) : type ? (
            <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-surface-container-lowest/85 backdrop-blur-md text-primary border border-outline-variant/30">
              {type}
            </span>
          ) : null}
        </div>
      </div>

      {/* Card Details */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between bg-surface-container-low">
        <div>
          <h2
            className="font-display text-sm sm:text-base font-bold text-on-surface line-clamp-1 group-hover:text-primary-container transition-colors"
            title={title}
          >
            {title}
          </h2>

          <div className="flex items-center justify-between mt-1 text-xs text-on-surface-variant font-medium">
            <span>{year}</span>
            {movie.Runtime && movie.Runtime !== 'N/A' && (
              <span className="text-on-surface-variant/70">{movie.Runtime}</span>
            )}
          </div>
        </div>

        {movie.Plot && movie.Plot !== 'N/A' && (
          <p className="text-xs text-on-surface-variant/80 mt-2 line-clamp-2 leading-relaxed hidden sm:block">
            {movie.Plot}
          </p>
        )}
      </div>
    </article>
  )
}
