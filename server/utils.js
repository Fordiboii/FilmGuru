/**
 * This is a utility file which contains
 * several utility functions which are used
 * for building SQL queries.
 */
import * as R from 'rambda'

// Helper function for creating error objects
const generateError = (status, errorMessage) => ({ status, error: errorMessage })

// Different transform functions
const insidePercent = input => [`%${input}%`]

const regular = input => [`${input}`]

const identity = input => input

// Curried helper function for building SQL queries
const buildQuery = R.curry((defaultQuery, complexBase, valuesTransform, values) => {
  if (R.isNil(values)) return { text: defaultQuery }
  return ({ text: complexBase, values: valuesTransform(values) })
})

// Helper function for the base movie route
const buildMoviesQuery = buildQuery('SELECT * FROM movie')

// Helper function for the base review route
const buildReviewsQuery = buildQuery('SELECT comment FROM movie')

// Helper function for the base genre route
const buildGenresQuery = buildQuery('SELECT * FROM genre')

export {
  generateError,
  buildMoviesQuery,
  buildReviewsQuery,
  regular,
  insidePercent,
  identity,
  buildGenresQuery,
  buildQuery
}
