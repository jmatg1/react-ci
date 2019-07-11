import * as actionTypes from './actionTypes'

export const setProfile = payload => {
  return {
    type: actionTypes.PROFILE_SET,
    payload
  }
}
