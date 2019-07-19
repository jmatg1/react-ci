import * as actionTypes from './actionTypes'

export const fetchUsers = payload => {
  return {
    type: actionTypes.USERS_FETCH,
    payload
  }
}
export const signupUser = payload => {
  return {
    type: actionTypes.USER_SIGN,
    payload
  }
}
// добавляет в чс и удаляет из подписки
export const addUserIgnore = (payload) => ({
  type: actionTypes.USER_ADD_IGNORE,
  payload
})

export const deleteUserIgnore = (payload) => ({
  type: actionTypes.USER_REMOVE_IGNORE,
  payload
})

export const subscribe = payload => ({
  type: actionTypes.USER_SUBSCRIBE,
  payload
})

export const changeAvatar = payload => ({
  type: actionTypes.USER_CHANGE_AVATAR,
  payload
})
