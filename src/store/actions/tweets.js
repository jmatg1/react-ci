import * as actionTypes from './actionTypes'

export const changeFavoriteTweet = payload => {
  return {
    type: actionTypes.CHANGE_FAVORITE_TWEET,
    payload
  }
}

export const fetchTweetsMain = payload => {
  return {
    type: actionTypes.FETCH_TWEETS_MAIN,
    payload
  }
}
