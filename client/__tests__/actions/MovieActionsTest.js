import * as actions from '../../src/actions/MovieActions'
import * as types from '../../src/actions/MovieActionTypes'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import expect from 'expect'

// Used when testing async actions.
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('actions', () => {
  it('should create an action to update the title field', () => {
    const text = 'Rainman'
    const expectedAction = {
      type: types.UPDATE_TITLE,
      title: text
    }
    expect(actions.updateTitle(text)).toEqual(expectedAction)
  })
  it('should create an action to log the title', () => {
    const expectedAction = {
      type: types.LOG_SEARCH
    }
    expect(actions.logSearch()).toEqual(expectedAction)
  })
})

describe('async actions', () => {
  const mockResult = {
    body: {
      items: [{
        movie_id: 363088,
        title: 'Ant-Man and the Wasp',
        summary: 'Just when his time under house arrest is about to end, Scott Lang puts again his freedom at risk to help Hope van Dyne and Dr. Hank Pym dive into the quantum realm and try to accomplish, against time and any chance of success, a very dangerous rescue mission.',
        popularity: '135.606',
        language: 'en',
        release_date: '2018-07-04',
        poster_path: '/rv1AWImgx386ULjcf62VYaW8zSt.jpg',
        comment: 'sds',
        rating: '6.9'
      },
      {
        movie_id: 102899,
        title: 'Ant-Man',
        summary: 'Armed with the astonishing ability to shrink in scale but increase in strength, master thief Scott Lang must embrace his inner-hero and help his mentor, Doctor Hank Pym, protect the secret behind his spectacular Ant-Man suit from a new generation of towering threats. Against seemingly insurmountable obstacles, Pym and Lang must plan and pull off a heist that will save the world.',
        popularity: '46.111',
        language: 'en',
        release_date: '2015-07-14',
        poster_path: '/D6e8RJf2qUstnfkTslTXNTUAlT.jpg',
        comment: 'sds',
        rating: '7.1'
      }]
    },
    headers: { 'content-type': 'application/json' }
  }

  afterEach(() => {
    fetchMock.restore()
  })

  it('creates FETCH_MOVIES_SUCCESS when fetching movies has been done', () => {
    fetchMock.getOnce('/movies?search=Annihilation', mockResult)

    const expectedActions = [
      { type: types.FETCH_MOVIES_BEGIN },
      {
        type: types.FETCH_MOVIES_SUCCESS,
        payload: {
          movies: [{
            movie_id: 300668,
            title: 'Annihilation',
            summary: "A biologist signs up for a dangerous, secret expedition into a mysterious zone where the laws of nature don't apply.",
            popularity: '28.371',
            language: 'en',
            release_date: '2018-02-22',
            poster_path: '/d3qcpfNwbAMCNqWDHzPQsUYiUgS.jpg',
            comment: '',
            rating: '6.3'
          }]
        }
      }
    ]
    const store = mockStore({ items: [] })

    return store.dispatch(actions.fetchMovies('Annihilation')).then(() => {
      // Return of async actions.
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('creates FETCH_MOVIES_FAILURE after posting request with FETCH_MOVIES_BEGIN', () => {
    fetchMock.getOnce('/movies?search=???', 'Not Found')

    const expectedActions = [
      { type: types.FETCH_MOVIES_BEGIN },
      { type: types.FETCH_MOVIES_FAILURE, error: 'Not Found' }
    ]
    const store = mockStore({ items: [] })

    return store.dispatch(actions.fetchMovies('???')).then(() => {
      // Return of async actions.
      expect(store.getActions()[0]).toEqual(expectedActions[0])
      expect(store.getActions()[1].type).toEqual(expectedActions[1].type)
      expect(store.getActions()[1].payload.error.message).toEqual(expectedActions[1].error)
    })
  })
  it('should create an action to empty the filter field', () => {
    const expectedAction = {
      type: types.EMPTY_FILTER_ITEMS
    }
    expect(actions.emptyFilterItems()).toEqual(expectedAction)
  })
  describe('actions', () => {
    it('should create an action to update the filter query', () => {
      const filterquery = 'The'
      const expectedAction = {
        type: types.UPDATE_FILTER_QUERY,
        payload: filterquery
      }
      expect(actions.updateFilterQuery(filterquery)).toEqual(expectedAction)
    })
  })
})
