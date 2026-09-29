/**
 * SearchBar component.
 * Matches the Stitch "Movie Listing Page" design:
 *
 * Desktop: max-w-3xl centered pill bar with a glowing gradient focus ring,
 *          a gold `search` icon on the left, and a small clear button on the right.
 * Mobile:  full-width pill bar, same icon placement, compact height (h-12),
 *          stronger gold focus glow, and a filter icon button on the far right.
 *
 * @param {{ value: string, onChange: (value: string) => void }} props
 */
export default function SearchBar({ value, onChange }) {
  return (
    /* Outer glow wrapper — glows on focus-within */
    <div className="relative group w-full">
      {/* Animated gradient glow ring behind the bar (Desktop) */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-container/30 via-secondary-container/40 to-primary-container/30 rounded-full blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none hidden md:block" />

      {/* Search bar itself */}
      <div className="relative flex items-center w-full h-12 md:h-14 px-4 md:px-6 bg-surface-container rounded-full shadow-2xl transition-all duration-200 focus-within:bg-surface-container-high focus-within:shadow-[0_0_16px_rgba(245,197,24,0.25)]">
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
          className="w-full bg-transparent text-on-surface placeholder:text-on-surface-variant/60 text-sm md:text-base focus:outline-none [&::-webkit-search-cancel-button]:hidden"
        />

        {/* Right: clear button — visible only when there's a value */}
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label="Clear search"
            title="Clear search"
            className="ml-2 text-on-surface-variant hover:text-on-surface transition-colors shrink-0 p-1"
          >
            <span className="material-symbols-outlined text-[18px]">cancel</span>
          </button>
        )}

        {/* Right: keyboard hint pill (desktop only, shown when field is empty) */}
        {!value && (
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-1 rounded bg-surface-container-highest text-on-surface-variant text-[10px] font-semibold tracking-wider ml-2 shrink-0">
            <span>⌘</span><span>K</span>
          </kbd>
        )}
      </div>
    </div>
  )
}
