/**
 * SearchBar component.
 * Matches Stitch "Movie Listing Page" design:
 *
 * Desktop: max-w-3xl centered pill bar with gradient focus ring,
 *          gold search icon left, clear button / ⌘K right.
 * Mobile:  full-width pill bar (min 48px height), touch-friendly clear button (min 44px tap target),
 *          gold focus glow.
 *
 * @param {{ value: string, onChange: (value: string) => void }} props
 */
export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative group w-full">
      {/* Animated gradient glow ring behind the bar (Desktop) */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-container/30 via-secondary-container/40 to-primary-container/30 rounded-full blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none hidden md:block" />

      {/* Search bar container */}
      <div className="relative flex items-center w-full h-12 md:h-14 px-4 md:px-6 bg-surface-container rounded-full shadow-2xl transition-all duration-200 border border-outline-variant/30 focus-within:border-primary-container/60 focus-within:bg-surface-container-high focus-within:shadow-[0_0_20px_rgba(245,197,24,0.25)]">
        {/* Left: search icon */}
        <span className="material-symbols-outlined text-primary-container text-[20px] md:text-[24px] mr-3 shrink-0 pointer-events-none">
          search
        </span>

        {/* Input */}
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search for a movie..."
          aria-label="Search for a movie"
          className="w-full bg-transparent text-on-surface placeholder:text-on-surface-variant/60 text-sm md:text-base focus:outline-none [&::-webkit-search-cancel-button]:hidden h-full"
        />

        {/* Right: clear button (touch-friendly min 44px target) */}
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label="Clear search"
            title="Clear search"
            className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors shrink-0 -mr-2"
          >
            <span className="material-symbols-outlined text-[20px]">cancel</span>
          </button>
        )}

        {/* Right: keyboard hint pill (desktop only, when empty) */}
        {!value && (
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2.5 py-1 rounded bg-surface-container-highest text-on-surface-variant text-[11px] font-semibold tracking-wider ml-2 shrink-0">
            <span>⌘</span><span>K</span>
          </kbd>
        )}
      </div>
    </div>
  )
}
