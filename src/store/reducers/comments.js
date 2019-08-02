import * as actionTypes from '../actions/actionTypes'
import { arrToMap, objToMap } from '../../shared/utility'
import _ from 'lodash'

const initialStore = null

// ----------------------------------------

const fetchComments = (state, payload) => {
  console.log(payload)

  const comments = _.map(payload, (el) => {
    el.reply = !el.reply ? null : el.reply
    return el
  })

  return arrToMap(comments)
}

const addComment = (state, { comment }) => {
  return state.set(comment.id, comment)
}

const removeComment = (state, { commentId }) => {
  return state.delete(commentId)
}

const commentsReducer = (state = initialStore, action) => {
  const { payload } = action
  switch (action.type) {
    case actionTypes.COMMENTS_FETCH: return fetchComments(state, payload)
    case actionTypes.COMMENT_ADD: return addComment(state, payload)
    case actionTypes.COMMENT_REMOVE: return removeComment(state, payload)
    default: return state
  }
}

export default commentsReducer
