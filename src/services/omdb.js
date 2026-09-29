import curatedList from '../data/movies.json'

const API_KEY = import.meta.env.VITE_OMDB_API_KEY
const BASE_URL = 'https://www.omdbapi.com'

/**
 * Validates that an API key is present before attempting network calls.
 */
function ensureApiKey() {
  if (!API_KEY || API_KEY === 'your_key_here') {
    throw new Error(
      'OMDb API key is not configured. Please set VITE_OMDB_API_KEY in your environment.'
    )
  }
}

/**
 * Fetches full movie details from OMDb by IMDb ID.
 *
 * OMDb always returns HTTP 200, even on failure — the error is encoded
 * in the response body as `{ Response: "False", Error: "..." }`.
 * This function inspects the body and throws a proper Error in that case.
 *
 * @param {string} imdbId - A valid IMDb ID, e.g. "tt0111161"
 * @returns {Promise<Object>} Full OMDb movie detail object
 * @throws {Error} If the OMDb API returns Response === "False", or if the network request fails.
 */
export async function getMovieById(imdbId) {
  ensureApiKey()

  const url = `${BASE_URL}/?i=${encodeURIComponent(imdbId)}&apikey=${API_KEY}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Network response error: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()

  if (data.Response === 'False') {
    throw new Error(data.Error ?? `Failed to fetch movie with ID: ${imdbId}`)
  }

  return data
}

/**
 * Fetches full details for all movies in the curated list in parallel.
 * Individual failures are logged, and if all movies fail, throws an error
 * so the UI can display a helpful error state.
 *
 * @returns {Promise<Object[]>} Array of full OMDb movie detail objects
 */
export async function getCuratedMovies() {
  ensureApiKey()

  let lastError = null
  const results = await Promise.all(
    curatedList.map(({ imdbID }) =>
      getMovieById(imdbID).catch((err) => {
        lastError = err
        console.warn(`[omdb] Skipping ${imdbID}:`, err.message)
        return null
      })
    )
  )

  const valid = results.filter(Boolean)
  if (valid.length === 0 && lastError) {
    throw lastError
  }

  return valid
}

/**
 * Searches OMDb for movies matching the given query string.
 *
 * When OMDb finds no results it returns `{ Response: "False", Error: "Movie not found!" }`.
 * This function treats that specific case as an empty array [].
 *
 * @param {string} query - The search term
 * @returns {Promise<Object[]>} Array of partial movie objects
 */
export async function searchMovies(query) {
  ensureApiKey()

  const url = `${BASE_URL}/?s=${encodeURIComponent(query)}&apikey=${API_KEY}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Network response error: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()

  if (data.Response === 'False') {
    if (data.Error === 'Movie not found!') {
      return []
    }
    throw new Error(data.Error ?? 'OMDb search failed')
  }

  return data.Search ?? []
}
