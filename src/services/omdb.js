import curatedList from '../data/movies.json'

const API_KEY = import.meta.env.VITE_OMDB_API_KEY
const BASE_URL = 'https://www.omdbapi.com'

/**
 * Fetches full movie details from OMDb by IMDb ID.
 *
 * OMDb always returns HTTP 200, even on failure — the error is encoded
 * in the response body as `{ Response: "False", Error: "..." }`.
 * This function inspects the body and throws a proper Error in that case.
 *
 * @param {string} imdbId - A valid IMDb ID, e.g. "tt0111161"
 * @returns {Promise<Object>} Full OMDb movie detail object (Title, Year, Rated,
 *   Released, Runtime, Genre, Director, Actors, Plot, Poster, imdbRating, etc.)
 * @throws {Error} If the OMDb API returns Response === "False", or if the
 *   network request itself fails.
 */
export async function getMovieById(imdbId) {
  const url = `${BASE_URL}/?i=${encodeURIComponent(imdbId)}&apikey=${API_KEY}`
  const response = await fetch(url)
  const data = await response.json()

  if (data.Response === 'False') {
    throw new Error(data.Error ?? `Failed to fetch movie with ID: ${imdbId}`)
  }

  return data
}

/**
 * Fetches full details for all movies in the curated list (src/data/movies.json)
 * in parallel using Promise.all.
 *
 * Individual failures are silently caught and filtered out so a single bad
 * ID or transient network error does not crash the entire batch. Successful
 * results are returned in the same order as the curated list.
 *
 * @returns {Promise<Object[]>} Array of full OMDb movie detail objects for
 *   every curated ID that resolved successfully. May be shorter than the
 *   input list if some IDs failed.
 */
export async function getCuratedMovies() {
  const results = await Promise.all(
    curatedList.map(({ imdbID }) =>
      getMovieById(imdbID).catch((err) => {
        console.warn(`[omdb] Skipping ${imdbID}:`, err.message)
        return null
      })
    )
  )

  // Filter out any nulls from individual failures
  return results.filter(Boolean)
}

/**
 * Searches OMDb for movies matching the given query string.
 *
 * The OMDb search endpoint (`?s=`) returns partial data only:
 * Title, Year, imdbID, Type, and Poster. It does NOT include
 * rating, plot, or cast information.
 *
 * When OMDb finds no results it returns `{ Response: "False", Error: "Movie not found!" }`.
 * This function treats that specific "no results" case as an empty array rather
 * than a thrown error, so the UI can display a normal "no results" state.
 * Any other error (invalid API key, network failure, etc.) is still thrown.
 *
 * @param {string} query - The search term to pass to OMDb, e.g. "Inception"
 * @returns {Promise<Object[]>} Array of partial movie objects
 *   (Title, Year, imdbID, Type, Poster). Empty array if no results found.
 * @throws {Error} If the API returns a non-"no results" error (e.g. invalid API key).
 */
export async function searchMovies(query) {
  const url = `${BASE_URL}/?s=${encodeURIComponent(query)}&apikey=${API_KEY}`
  const response = await fetch(url)
  const data = await response.json()

  if (data.Response === 'False') {
    // "Movie not found!" means a valid, empty search result — return [] instead of throwing
    if (data.Error === 'Movie not found!') {
      return []
    }
    throw new Error(data.Error ?? 'OMDb search failed')
  }

  // data.Search is the array of partial results; data.totalResults is the count string
  return data.Search ?? []
}
