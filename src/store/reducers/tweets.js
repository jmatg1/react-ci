import { fromJS } from 'immutable'
import _ from 'lodash'
import * as actionTypes from '../actions/actionTypes'
import tweetsDate from '../data/tweets'
import { getItem, setItem, arrToMap, objToMap } from '../../shared/utility'

let tweetsStor = getItem('tweets')

if (!tweetsStor) {
  setItem('tweets', tweetsDate)
  tweetsStor = tweetsDate
}

const initialStore = fromJS(arrToMap(tweetsStor, fromJS))

// ----------------------------------------

const fetchTweets = (state, payload) => {
  const tweets = _.map(payload, (el) => {
    if (!el.img) el.img = []
    if (!el.idVideos) el.idVideos = []
    if (!el.likes) el.likes = []
    if (!el.commentsId) el.commentsId = []
    return el
  })
  return objToMap(tweets, fromJS)
}

const changeFavoriteTweet = (state, { tweetId, isFavorite, profileId }) => {
  return state
    .updateIn(
      [tweetId, 'likes'],
      likes => isFavorite ? likes.push(profileId) : likes.filter(lkId => lkId !== profileId)
    )
}

const addComment = (state, { tweetId, comment }) => {
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

const tweetEdit = (state, { tweetId, tweetText, img, idVideos }) => {
  return state
    .updateIn(
      [tweetId, 'text'],
      text => tweetText
    )
    .updateIn(
      [tweetId, 'img'],
      imgs => img
    )
    .updateIn(
      [tweetId, 'idVideos'],
      idVid => idVideos
    )
}
const tweetRemove = (state, { tweet }) => {
  return state.delete(tweet.id)
}

const tweetStore = (state = initialStore, action) => {
  const { payload } = action
  switch (action.type) {
    case actionTypes.TWEETS_FETCH: return fetchTweets(state, payload)
    case actionTypes.TWEET_CHANGE_FAVORITE: return changeFavoriteTweet(state, payload)
    case actionTypes.TWEET_EDIT: return tweetEdit(state, payload)
    case actionTypes.TWEET_REMOVE: return tweetRemove(state, payload)
    case actionTypes.COMMENT_ADD: return addComment(state, payload)
    case actionTypes.COMMENT_REMOVE: return commentRemove(state, payload)
    case actionTypes.TWEET_ADD: return addTweet(state, payload)
    default: return state
  }
}

export default tweetStore
