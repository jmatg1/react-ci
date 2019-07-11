import * as actionTypes from './actionTypes'
// обрабатывает reducer tweets, users
export const addTweet = payload => {
  return {
    type: actionTypes.TWEET_ADD,
    payload
  }
}// обрабатывает reducer tweets, users
export const changeFavoriteTweet = payload => {
  return {
    type: actionTypes.TWEET_CHANGE_FAVORITE,
    payload
  }
}

export const editTweet = (payload) => {
  return {
    type: actionTypes.TWEET_EDIT,
    payload
  }
}
// обрабатывает reducer tweets, users
export const deleteTweet = (payload) => {
  return {
    type: actionTypes.TWEET_REMOVE,
    payload
  }
}
