import * as actionTypes from './actionTypes'

export const signupUser = payload => {
  return {
    type: actionTypes.USER_SIGN,
    payload
  }
}
export const addUserIgnore = (tweet, profileId) => ({
  type: actionTypes.USER_ADD_IGNORE,
  tweet,
  profileId
})

export const subscribe = payload => ({
  type: actionTypes.USER_SUBSCRIBE,
  payload
})
