import * as actionTypes from './actionTypes'

export const signupUser = payload => {
  return {
    type: actionTypes.USER_SIGN,
    payload
  }
}
export const addUserIgnore = (profileId, userId) => ({
  type: actionTypes.USER_ADD_IGNORE,
  profileId,
  userId
})
export const removeUserIgnore = (profileId, userId) => ({
  type: actionTypes.USER_REMOVE_IGNORE,
  profileId,
  userId
})

export const subscribe = payload => ({
  type: actionTypes.USER_SUBSCRIBE,
  payload
})
