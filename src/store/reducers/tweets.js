import { Map } from 'immutable'
import * as actionTypes from '../actions/actionTypes'
import tweetsDate from '../data/tweets'
import { getItem, setItem, arrToMap } from '../../shared/utility'

let tweetsStor = getItem('tweets')

if (!tweetsStor) {
  setItem('tweets', tweetsDate)
  tweetsStor = tweetsDate
}

const initialStore = new Map(arrToMap(tweetsStor))
// ----------------------------------------

const fetchTweetsMain = (state, { payload: { id, following } }) => {
  return initialStore
    .filter(tweet => (
      tweet.createUserId === id || following
        .find(folId => (
          folId === tweet.createUserId
        )
        )
    ))
}

const changeFavoriteTweet = (state, { payload: { tweetId, isFavorite, profileId } }) => {
  let newLikes = [...state.get(tweetId).likes]
  isFavorite ? newLikes.push(profileId) : newLikes = newLikes.filter(lkId => lkId !== profileId)

  return state
    .updateIn(
      [tweetId, 'likes'],
      likes => newLikes
    )
}

const addComment = (state, action) => {
  const { tweetId, comment } = action.payload

  let updComments = [...state.get(tweetId).commentsId]
  updComments.push(comment.id)

  return state.updateIn(
    [tweetId, 'commentsId'],
    commentsId => updComments
  )
}
const addTweet = (state, { tweet }) => {
  return state.set(tweet.id, tweet)
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
  case actionTypes.TWEETS_FETCH_MAIN:
    return fetchTweetsMain(state, action)

  case actionTypes.TWEET_CHANGE_FAVORITE:
    return changeFavoriteTweet(state, action)

  case actionTypes.TWEET_EDIT:
    return tweetEdit(state, action)
  case actionTypes.TWEET_REMOVE:
    return tweetRemove(state, action)

  case actionTypes.COMMENT_ADD:
    return addComment(state, action)

  case actionTypes.TWEET_ADD:
    return addTweet(state, action)

  default:
    return state
  }
}

export default tweetStore
