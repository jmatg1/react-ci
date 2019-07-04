import { Map, fromJS } from 'immutable'
import * as actionTypes from '../actions/actionTypes'
import tweetsDate from '../data/tweets'
import { arrayToObject, getItem, setItem } from '../../shared/utility'

let tweetsStor = getItem('tweets')

if (!tweetsStor) {
  setItem('tweets', tweetsDate)
  tweetsStor = tweetsDate
}

const initialStore = new Map(arrayToObject(tweetsStor))
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

const changeFavoriteTweet = (state, { payload: { TweetId, isFavorite, profileId } }) => {
  console.log('profileId', profileId)

  let newLikes = [...state.get(String(TweetId)).likes]
  isFavorite ? newLikes.push(profileId) :  newLikes = newLikes.filter( lkId => lkId !== profileId)
  let a = state
    .updateIn(
      [String(TweetId), 'likes'],
        likes => newLikes
    )

  console.log(a)

  // console.log(newState)



  return a
}

const tweetStore = (state = initialStore, action) => {
  switch (action.type) {
  case actionTypes.FETCH_TWEETS_MAIN:
    return fetchTweetsMain(state, action)
  case actionTypes.CHANGE_FAVORITE_TWEET:
    return changeFavoriteTweet(state, action)
  default:
    return state
  }
}

export default tweetStore
