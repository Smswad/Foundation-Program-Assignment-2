import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      {/* Cinematic Hero Section */}
      <section className="relative w-full min-h-[75vh] lg:min-h-[82vh] flex items-center justify-center overflow-hidden bg-surface-container-lowest select-none px-4 md:px-8 lg:px-10 py-16 md:py-24">
        {/* Background Layer with Backdrop Image & Scrims */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDitL9R44dRCkRpSFWd3PyKEbRyuq1iExqFmmmp4DEM0qYvAw5WkcQRqCUHKcM_IRYDccsSk0pT-wcXzVpHQ5YSmfhrJRP3f3iiVlsyVk3ZEfARAmqVvhkX8bCcHmZXMPUTqY8kzvNIJgVrZlTWFQWjojVY3aR6jcVUCk5gYCRcNEe9dio6ks_6gquKog2rP2BickgpZKiigaqaswv8rU84ZKV5MqE_1DFi9tnG99gJkT5XaHb4A7Tf"
            alt="Cinematic Backdrop"
            className="w-full h-full object-cover object-center scale-105 opacity-30 md:opacity-40 mix-blend-screen transition-transform duration-1000 ease-out"
          />
          {/* Vertical and Radial Scrim Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-surface-container-lowest/80 to-surface-container-lowest/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest/90 via-transparent to-surface-container-lowest/90" />

          {/* Atmospheric Ambient Glows */}
          <div className="absolute -top-32 -left-20 w-72 md:w-96 h-72 md:h-96 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 right-10 w-80 md:w-[500px] h-80 md:h-[500px] bg-primary-container/15 rounded-full blur-[100px] pointer-events-none" />
        </div>

        {/* Decorative Atmospheric Geometry (Desktop) */}
        <div className="absolute inset-0 pointer-events-none z-[1] opacity-20 mix-blend-screen hidden lg:flex items-center justify-between px-10">
          <svg
            className="w-72 h-72 text-primary/15 -translate-x-8"
            fill="currentColor"
            viewBox="0 0 200 200"
          >
            <circle
              cx="100"
              cy="100"
              fill="none"
              r="90"
              stroke="currentColor"
              strokeDasharray="12 8"
              strokeWidth="3"
            />
            <circle
              cx="100"
              cy="100"
              fill="none"
              r="60"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="100" cy="100" r="16" />
            <circle cx="100" cy="40" r="12" />
            <circle cx="160" cy="100" r="12" />
            <circle cx="100" cy="160" r="12" />
            <circle cx="40" cy="100" r="12" />
          </svg>
          <svg
            className="w-80 h-80 text-secondary/20 translate-x-10 rotate-12"
            fill="currentColor"
            viewBox="0 0 240 240"
          >
            <path d="M20 60 L220 20 L220 50 L20 90 Z" opacity="0.4" />
            <rect
              fill="none"
              height="130"
              rx="8"
              stroke="currentColor"
              strokeWidth="2"
              width="200"
              x="20"
              y="80"
            />
            <line
              stroke="currentColor"
              strokeDasharray="6 4"
              strokeWidth="1.5"
              x1="30"
              x2="210"
              y1="120"
              y2="120"
            />
          </svg>
        </div>

        {/* Centered Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
          {/* Micro Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container/90 border border-outline-variant/30 backdrop-blur-md shadow-lg shadow-surface-container-lowest/50 mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-container" />
            </span>
            <span className="font-display text-[10px] md:text-xs uppercase tracking-widest text-primary-fixed font-semibold">
              Cinematic Discovery Platform
            </span>
            <span className="text-on-surface-variant/40 text-xs">•</span>
            <span className="text-[10px] md:text-xs uppercase text-on-surface-variant font-medium">
              Over 250,000+ Titles
            </span>
          </div>

          {/* Monumental Headline */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[84px] leading-tight sm:leading-[70px] lg:leading-[88px] font-extrabold tracking-tight text-on-surface drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)] max-w-4xl">
            DISCOVER{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-container via-primary to-tertiary drop-shadow-[0_2px_16px_rgba(245,197,24,0.35)]">
              MOVIES
            </span>
          </h1>

          {/* Supporting Editorial Subtext */}
          <p className="text-sm sm:text-base lg:text-lg text-on-surface-variant max-w-2xl mx-auto mt-4 sm:mt-5 leading-relaxed font-normal">
            Explore curated masterpieces, trending premieres, and world-class
            cinema archives with deep critical intelligence and real-time
            community insights.
          </p>

          {/* Action CTA Cluster */}
          <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mt-8">
            <Link
              to="/movies"
              className="w-full sm:w-auto px-8 py-3.5 bg-primary-container text-on-primary font-display font-semibold text-base sm:text-lg rounded-full inline-flex items-center justify-center gap-2 shadow-[0_0_24px_-2px_rgba(245,197,24,0.45)] hover:shadow-[0_0_36px_rgba(245,197,24,0.65)] hover:scale-105 active:scale-95 transition-all group"
            >
              <span
                className="material-symbols-outlined text-[22px] transition-transform group-hover:rotate-45"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                play_arrow
              </span>
              <span>Explore Now</span>
            </Link>

            <Link
              to="/movies"
              className="w-full sm:w-auto px-7 py-3.5 bg-surface-container/80 hover:bg-surface-container-high text-on-surface font-semibold text-sm sm:text-base rounded-full inline-flex items-center justify-center gap-2 backdrop-blur-md shadow-md border border-outline-variant/30 hover:border-outline-variant/60 transition-all group"
            >
              <span className="material-symbols-outlined text-[20px] text-secondary group-hover:text-primary transition-colors">
                video_library
              </span>
              <span>Curated Vault</span>
            </Link>
          </div>

          {/* Meta Value Badges */}
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-4 sm:gap-x-6 text-on-surface-variant text-xs sm:text-sm mt-10 opacity-80">
            <span className="inline-flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary-container text-[16px]">
                stars
              </span>
              <span>Curated Collections</span>
            </span>
            <span className="text-surface-variant hidden sm:inline">•</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary-container text-[16px]">
                bolt
              </span>
              <span>Real-time Ratings</span>
            </span>
            <span className="text-surface-variant hidden sm:inline">•</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary-container text-[16px]">
                public
              </span>
              <span>Global Cinema</span>
            </span>
          </div>
        </div>

        {/* Scroll Indicator (Desktop) */}
        <Link
          to="/movies"
          className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-on-surface-variant/60 hover:text-primary transition-colors animate-bounce"
        >
          <span className="text-[10px] tracking-widest uppercase font-semibold">
            Explore
          </span>
          <span className="material-symbols-outlined text-[18px]">
            keyboard_double_arrow_down
          </span>
        </Link>
      </section>
    </div>
  )
}
