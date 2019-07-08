import * as actionTypes from './actionTypes'

export const setProfile = profile => {
  return {
    type: actionTypes.PROFILE_SET,
    payload: profile
  }
}
export const uptProfile = profileId => {
  return {
    type: actionTypes.PROFILE_UPDATE,
    profileId
  }
}
