import * as actionTypes from './actionTypes'

export const addComment = payload => {
  return {
    type: actionTypes.COMMENT_ADD,
    payload
  }
}

export const editComment = payload => {
  return {
    type: actionTypes.COMMENT_EDIT,
    payload
  }
}
