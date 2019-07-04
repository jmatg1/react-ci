import { setItem } from '../shared/utility'
import * as actionTypes from '../store/actions/actionTypes'
export default (store) => (next) => (action) => {
  next(action)
  if (action.type === actionTypes.SET_PROFILE) saveUsers(store)
  if (action.type === actionTypes.ADD_COMMENT) {
    saveComments(store)
    saveTweets(store)
  }
  if (action.type === actionTypes.ADD_TWEET) saveTweets(store)
}

const saveComments = (store) => setItem('comments', Object.values(store.getState().comments.toJS()))
const saveTweets = (store) => setItem('tweets', Object.values(store.getState().tweets.toJS()))
const saveUsers = (store) => setItem('users', Object.values(store.getState().users.toJS()))
