# 🎬 MovieExplorer

**MovieExplorer** is a modern, high-performance web application designed for exploring cinematic archives, discovering iconic films, and retrieving real-time movie details, cast credits, ratings, and plot summaries via the OMDb API.

Built with **React 19**, **Vite**, and **Tailwind CSS v4**, the application delivers a seamless dark-mode experience with fluid responsive layouts from mobile devices (375px) up to ultra-wide displays.

---

## ✨ Features

- **🏠 Cinematic Landing Page**: Engaging hero banner with atmospheric lighting, quick navigation CTAs, and curated movie categories.
- **🍿 Curated Movie Showcase**: Instant browse mode featuring 20 all-time iconic films loaded in parallel with IMDb ratings and badges.
- **🔍 Live Debounced Search**: Fast search bar with 400ms debouncing, race-condition guards for asynchronous requests, and instant restore when cleared.
- **📑 Detailed Movie Modal**: Rich modal dialog displaying full metadata:
  - High-resolution poster with gradient scrim
  - IMDb star rating `/10`, release date, and duration
  - Genre badge pills
  - Complete plot overview
  - Director, starring cast, and award accolades
- **📱 Fully Responsive & Mobile-First**:
  - Single-column stacked feed on mobile (375px)
  - 2-to-4 column responsive showcase grid across tablets and desktop monitors
  - Touch-friendly tap targets (minimum 44px height)
- **♿ Accessible by Design**:
  - Keyboard navigation and focus rings
  - Modal dismissible via top button (✕), bottom close CTA, backdrop click, or `Escape` key
  - Native ARIA dialog attributes (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`)
  - Image `alt` attributes and missing poster placeholders
- **⚡ Production Ready**: Shimmer skeleton loading cards, error boundaries with retry mechanisms, and SPA deep-link routing support for Vercel.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/vite`
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Data Source**: [OMDb API](https://www.omdbapi.com/)
- **Typography & Icons**: [Google Fonts (Outfit & Inter)](https://fonts.google.com/) & [Material Symbols](https://fonts.google.com/icons)

---

## 📁 Project Structure

```
MovieExplorer/
├── public/                  # Static assets
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Footer.jsx       # Responsive footer with social & nav links
│   │   ├── MovieCard.jsx    # Individual movie card with poster, rating & hover states
│   │   ├── MovieGrid.jsx    # Responsive grid with skeleton loaders & empty states
│   │   ├── MovieModal.jsx   # In-depth details dialog (backdrop blur, mobile bottom sheet)
│   │   ├── Navbar.jsx       # Sticky navigation bar with mobile hamburger menu
│   │   └── SearchBar.jsx    # Debounced search bar with clear button & focus rings
│   ├── data/
│   │   └── movies.json      # Curated list of 20 default IMDb titles
│   ├── pages/
│   │   ├── Home.jsx         # Landing page & hero section
│   │   └── MovieListing.jsx # Browse & search catalog with live filtering
│   ├── services/
│   │   └── omdb.js          # OMDb API service (getMovieById, getCuratedMovies, searchMovies)
│   ├── App.jsx              # App layout shell & React Router routes
│   ├── index.css            # Tailwind CSS configuration & theme design tokens
│   └── main.jsx             # React DOM root entry point
├── .env.example             # Environment variable template
├── index.html               # Main HTML entry with font pre-connects
├── package.json             # Project dependencies and npm scripts
├── vercel.json              # Vercel SPA routing configuration
└── vite.config.js           # Vite configuration with Tailwind CSS plugin
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.0 or higher recommended)
- [npm](https://www.npmjs.com/) (or yarn / pnpm)
- An **OMDb API Key** (get a free key at [omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx))

---

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/movie-explorer.git
   cd movie-explorer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   VITE_OMDB_API_KEY=your_omdb_api_key_here
   ```
   *(Replace `your_omdb_api_key_here` with your actual 8-character OMDb API key)*

4. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Vite development server with Hot Module Replacement (HMR) |
| `npm run build` | Bundles and optimizes the production build into the `dist/` directory |
| `npm run preview` | Locally previews the production build from `dist/` |
| `npm run lint` | Runs the linter to check for code quality and syntax issues |

---

## 🌐 Deployment

### Deploying to Vercel

1. Push your repository to **GitHub**.
2. Import your repository on the **[Vercel Dashboard](https://vercel.com/dashboard)**.
3. In the project **Settings** → **Environment Variables**, add:
   - **Key**: `VITE_OMDB_API_KEY`
   - **Value**: `your_omdb_api_key`
4. Click **Deploy**.
5. The included `vercel.json` ensures that client-side routes like `/movies` resolve properly upon page reload.

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use and modify it for your own projects.
