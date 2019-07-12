import * as actionTypes from '../actions/actionTypes'

export const initialState = {
  id: null,
  name: null,
  tweets: [],
  following: [],
  followers: []
}

const profile = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROFILE_SET: return action.payload
    default: return state
  }
}

export default profile
