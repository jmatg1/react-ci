import { Map } from 'immutable'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
  id: null,
  name: null,
  tweets: [],
  following: [],
  followers: []
}

const profile = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.SET_PROFILE: return new Map(action.payload)
  default: return state
  }
}

export default profile
