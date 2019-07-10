import { fromJS, Map } from 'immutable'
import * as actionTypes from '../actions/actionTypes'
import tweetsDate from '../data/tweets'
import { getItem, setItem, arrToMap } from '../../shared/utility'

let tweetsStor = getItem('tweets')

if (!tweetsStor) {
  setItem('tweets', tweetsDate)
  tweetsStor = tweetsDate
}

const initialStore = fromJS(arrToMap(tweetsStor, fromJS))

// ----------------------------------------

const changeFavoriteTweet = (state, { payload: { tweetId, isFavorite, profileId } }) => {
  return state
    .updateIn(
      [tweetId, 'likes'],
      likes => isFavorite ? likes.push(profileId) : likes.filter(lkId => lkId !== profileId)
    )
}

const addComment = (state, action) => {
  const { tweetId, comment } = action.payload

  return state.updateIn(
    [tweetId, 'commentsId'],
    commentsId => commentsId.push(comment.id)
  )
}
const commentRemove = (state, { commentId, tweetId }) => {
  return state.updateIn(
    [tweetId, 'commentsId'],
    commentsId => commentsId.filter(cmId => cmId !== commentId)
  )
}
const addTweet = (state, { tweet }) => {
  return state.set(tweet.id, fromJS(tweet))
}

const tweetEdit = (state, action) => {
  const { tweetId, text: tweetText } = action
  return state
    .updateIn(
      [tweetId, 'text'],
      text => tweetText
    )
}
const tweetRemove = (state, action) => {
  return state.delete(action.tweet.id)
}

const tweetStore = (state = initialStore, action) => {
  switch (action.type) {
  case actionTypes.TWEET_CHANGE_FAVORITE:
    return changeFavoriteTweet(state, action)

  case actionTypes.TWEET_EDIT:
    return tweetEdit(state, action)

  case actionTypes.TWEET_REMOVE:
    return tweetRemove(state, action)

  case actionTypes.COMMENT_ADD:
    return addComment(state, action)

  case actionTypes.COMMENT_REMOVE:
    return commentRemove(state, action)

  case actionTypes.TWEET_ADD:
    return addTweet(state, action)

  default:
    return state
  }
}

export default tweetStore
