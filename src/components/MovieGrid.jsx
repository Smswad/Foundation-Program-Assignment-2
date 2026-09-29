import MovieCard from './MovieCard'

/**
 * MovieGrid — renders a responsive grid of movie cards.
 *
 * Scales cleanly across breakpoints:
 * - 375px (Mobile): 1 column stacked layout (touch-friendly full width)
 * - 640px (Small Tablet): 2 columns
 * - 768px - 1024px (Tablet/Laptop): 3 columns
 * - 1280px+ (Desktop): 4 columns
 *
 * @param {{ movies: Object[], isLoading: boolean, onSeeDetails: (movie: Object) => void }} props
 */
export default function MovieGrid({ movies = [], isLoading = false, onSeeDetails }) {
  /* --- Skeleton shimmer cards --- */
  if (isLoading) {
    return (
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col rounded-xl overflow-hidden bg-surface-container-low border border-outline-variant/20 animate-pulse"
            >
              <div className="aspect-[2/3] w-full bg-surface-container" />
              <div className="p-4 flex flex-col gap-2.5">
                <div className="h-4 bg-surface-container rounded w-3/4" />
                <div className="h-3 bg-surface-container rounded w-1/2" />
                <div className="h-3 bg-surface-container rounded w-full mt-1 hidden sm:block" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  /* --- Empty state --- */
  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-center px-4 max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-primary-container shadow-inner">
          <span className="material-symbols-outlined text-[36px]">
            movie_filter
          </span>
        </div>
        <p className="text-on-surface font-display text-xl font-bold">
          No movies found
        </p>
        <p className="text-on-surface-variant text-sm leading-relaxed">
          We couldn't find any movies matching your search. Try searching by title or director.
        </p>
      </div>
    )
  }

  /* --- Responsive Movie Grid --- */
  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 pb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onClick={() => onSeeDetails?.(movie)}
          />
        ))}
      </div>
    </section>
  )
}
