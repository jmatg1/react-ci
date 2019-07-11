import * as actionTypes from './actionTypes'

export const addComment = payload => {
  return {
    type: actionTypes.COMMENT_ADD,
    payload
  }
}

export const deleteComment = (payload) => {
  return {
    type: actionTypes.COMMENT_REMOVE,
    payload
  }
}
