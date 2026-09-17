import { Link } from 'react-router-dom'

export default function Footer() {
  const iconLinks = [
    { name: 'Repository', icon: 'terminal', path: 'https://github.com', external: true },
    { name: 'Reviews', icon: 'reviews', path: '/#trending', external: false },
    { name: 'Community', icon: 'forum', path: '/#community', external: false },
    { name: 'Browse Movies', icon: 'movie', path: '/movies', external: false },
    { name: 'Privacy Policy', icon: 'policy', path: '/#privacy', external: false },
  ]

  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/40 py-8 md:py-10 px-4 md:px-8 lg:px-10 mt-auto">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Tagline */}
        <div className="flex items-center gap-2 text-center md:text-left">
          <Link to="/" className="font-display text-lg font-bold text-on-surface hover:text-primary transition-colors">
            Movie<span className="text-primary-container">Explorer</span>
          </Link>
          <span className="text-outline text-xs hidden sm:inline">
            • Cinematic Exploration Suite
          </span>
        </div>

        {/* Copyright */}
        <div className="text-xs text-on-surface-variant text-center order-3 md:order-2">
          © 2026 MovieExplorer. All rights reserved.
        </div>

        {/* Action / Social Icons */}
        <div className="flex items-center justify-center gap-2 md:gap-3 order-2 md:order-3">
          {iconLinks.map((item) =>
            item.external ? (
              <a
                key={item.name}
                href={item.path}
                target="_blank"
                rel="noreferrer"
                aria-label={item.name}
                title={item.name}
                className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded-full transition-all"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {item.icon}
                </span>
              </a>
            ) : (
              <Link
                key={item.name}
                to={item.path}
                aria-label={item.name}
                title={item.name}
                className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded-full transition-all"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {item.icon}
                </span>
              </Link>
            )
          )}
        </div>
      </div>
    </footer>
  )
}
