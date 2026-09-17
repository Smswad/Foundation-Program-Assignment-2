import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Movies', path: '/movies' },
    { name: 'Trending', path: '/#trending' },
    { name: 'Watchlist', path: '/#watchlist' },
  ]

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-surface-container-lowest/85 backdrop-blur-xl border-b border-outline-variant/40">
      <div className="h-16 md:h-20 w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-10 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="flex items-center gap-2.5 group"
        >
          {/* Logo SVG */}
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-surface-container-low border border-primary-container flex items-center justify-center relative overflow-hidden shadow-[0_0_12px_rgba(245,197,24,0.2)]">
            <svg
              className="w-5 h-5 text-primary-container"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
              <line x1="7" y1="2" x2="7" y2="22" />
              <line x1="17" y1="2" x2="17" y2="22" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <line x1="2" y1="7" x2="7" y2="7" />
              <line x1="2" y1="17" x2="7" y2="17" />
              <line x1="17" y1="17" x2="22" y2="17" />
              <line x1="17" y1="7" x2="22" y2="7" />
            </svg>
          </div>
          <span className="font-display text-lg md:text-xl font-bold tracking-tight text-on-surface group-hover:text-primary transition-colors">
            Movie<span className="text-primary-container">Explorer</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  isActive && link.path.startsWith('/') && !link.path.includes('#')
                    ? "font-medium text-sm text-primary relative py-1 after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-primary-container after:shadow-[0_0_12px_#f5c518]"
                    : "font-medium text-sm text-on-surface-variant hover:text-on-surface transition-colors py-1"
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/movies"
              className="h-10 px-5 bg-primary-container text-on-primary font-semibold text-sm rounded-full flex items-center gap-1.5 shadow-[0_0_16px_-2px_rgba(245,197,24,0.35)] hover:shadow-[0_0_24px_rgba(245,197,24,0.5)] hover:brightness-105 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">movie</span>
              <span>Movies</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>

            <div
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-primary-container transition-all"
              title="User Profile"
            >
              <span className="material-symbols-outlined text-on-primary text-[18px]">
                person
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Actions: Profile + Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary text-[18px]">
              person
            </span>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="w-10 h-10 flex items-center justify-center text-on-surface hover:text-primary transition-colors focus:outline-none"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu Collapse */}
      {mobileMenuOpen && (
        <div className="md:hidden w-full bg-surface-container-lowest/95 backdrop-blur-2xl border-b border-outline-variant/40 px-4 py-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === '/'}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-xl font-medium text-base transition-colors flex items-center justify-between ${
                    isActive && link.path.startsWith('/') && !link.path.includes('#')
                      ? 'bg-surface-container text-primary-container font-semibold'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                  }`
                }
              >
                <span>{link.name}</span>
                <span className="material-symbols-outlined text-[18px] opacity-60">
                  chevron_right
                </span>
              </NavLink>
            ))}
          </nav>

          <div className="pt-2 border-t border-outline-variant/20">
            <Link
              to="/movies"
              onClick={closeMobileMenu}
              className="w-full h-11 bg-primary-container text-on-primary font-semibold text-sm rounded-full flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(245,197,24,0.35)] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">movie</span>
              <span>Explore All Movies</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
