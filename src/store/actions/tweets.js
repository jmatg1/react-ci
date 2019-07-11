import * as actionTypes from './actionTypes'
// обрабатывает reducer tweets, users
export const addTweet = tweet => {
  return {
    type: actionTypes.TWEET_ADD,
    tweet
  }
}// обрабатывает reducer tweets, users
export const changeFavoriteTweet = payload => {
  return {
    type: actionTypes.TWEET_CHANGE_FAVORITE,
    payload
  }
}

export const fetchTweetsMain = payload => {
  return {
    type: actionTypes.TWEETS_FETCH_MAIN,
    payload
  }
}

export const editTweet = (tweetId, text) => {
  return {
    type: actionTypes.TWEET_EDIT,
    tweetId,
    text
  }
}
// обрабатывает reducer tweets, users
export const deleteTweet = (tweet) => {
  return {
    type: actionTypes.TWEET_REMOVE,
    tweet
  }
}
