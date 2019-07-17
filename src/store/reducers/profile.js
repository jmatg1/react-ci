import * as actionTypes from '../actions/actionTypes'
import { isEqual } from 'lodash'

export const initialState = {
  id: null,
  name: null,
  tweets: [],
  following: [],
  followers: [],
  query: null,
  dateFrom: null,
  dateTo: null
}

const setQuery = (state, payload) => {
  const updState = {
    ...state,
    ...payload
  }
  return isEqual(state, updState) ? state : updState
}

const profile = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROFILE_SET: return action.payload
    case actionTypes.QUERY_SET: return setQuery(state, action.payload)
    default: return state
  }
}

export default profile
