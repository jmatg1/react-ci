import * as actionTypes from './actionTypes'

export const signupUser = payload => {
  return {
    type: actionTypes.SINGUP_USER,
    payload
  }
}
export const addUserIgnore = (tweet, profileId) => ({
  type: actionTypes.ADD_USER_IGNORE,
  tweet,
  profileId
})
