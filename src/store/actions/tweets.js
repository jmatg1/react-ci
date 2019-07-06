import * as actionTypes from './actionTypes'
// обрабатывает reducer tweets, users
export const addTweet = tweet => {
  return {
    type: actionTypes.ADD_TWEET,
    tweet
  }
}
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

export const tweetEdit = (tweetId, text) => {
  return {
    type: actionTypes.TWEET_EDIT,
    tweetId,
    text
  }
}
// обрабатывает reducer tweets, users
export const tweetRemove = (tweet) => {
  return {
    type: actionTypes.TWEET_REMOVE,
    tweet
  }
}
// обрабатывает reducer tweets, users
// export const tweetIgnore = (tweet,profileId) => {
//   return {
//     type: actionTypes.TWEET_REMOVE,
//     tweet,
//     profileId
//   }
// }
