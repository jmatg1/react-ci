import * as actionTypes from './actionTypes'

export const setProfile = profile => {
  return {
    type: actionTypes.SET_PROFILE,
    payload: profile
  }
}
