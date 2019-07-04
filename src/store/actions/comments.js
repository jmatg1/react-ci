import * as actionTypes from './actionTypes'

export const addComment = payload => {
  return {
    type: actionTypes.ADD_COMMENT,
    payload
  }
}

export const editComment = payload => {
  return {
    type: actionTypes.EDIT_COMMENT,
    payload
  }
}
