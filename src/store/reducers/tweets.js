import { Map } from 'immutable'
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

const tweetStore = (state = initialStore, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TWEETS_MAIN:
      return fetchTweetsMain(state, action)
    default:
      return state
  }
}

export default tweetStore
