import * as actionTypes from './actionTypes'

export const addTweet = payload => {
  return {
    type: actionTypes.SINGUP_USER,
    payload
  }
}

export const fetchTweetsMain = payload => {
  return {
    type: actionTypes.FETCH_TWEETS_MAIN,
    payload
  }
}
