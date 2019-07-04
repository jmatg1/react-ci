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
  let filterTwitter = initialStore
    .filter(tweet => (
      tweet.createUserId === id || following
        .find(folId => (
          folId === tweet.createUserId
        )
        )
    )
    )
  return filterTwitter
}

const changeFavoriteTweet = (state, { payload: { tweetId, isFavorite, profileId } }) => {
  let newLikes = [...state.get(tweetId).likes]
  isFavorite ? newLikes.push(profileId) : newLikes = newLikes.filter(lkId => lkId !== profileId)

  let a = state
    .updateIn(
      [tweetId, 'likes'],
      likes => newLikes
    )

  return a
}

const addComment = (state, action) => {
  const { tweetId, comment } = action.payload

  let updComments = [...state.get(tweetId).commentsId]
  updComments.push(comment.id)

  const updState = state.updateIn(
    [tweetId, 'commentsId'],
    commentsId => updComments
  )
  return updState
}

const tweetStore = (state = initialStore, action) => {
  switch (action.type) {
  case actionTypes.FETCH_TWEETS_MAIN:
    return fetchTweetsMain(state, action)
  case actionTypes.CHANGE_FAVORITE_TWEET:
    return changeFavoriteTweet(state, action)
  case actionTypes.ADD_COMMENT: return addComment(state, action)
  default:
    return state
  }
}

export default tweetStore
