import { setItem } from '../shared/utility'
export default (store) => (next) => (action) => {
  next(action)
  saveUsers(store)
  saveComments(store)
  saveTweets(store)
}

const saveComments = (store) => setItem('comments', Object.values(store.getState().comments.toJS()))
const saveTweets = (store) => setItem('tweets', Object.values(store.getState().tweets.toJS()))
const saveUsers = (store) => setItem('users', Object.values(store.getState().users.toJS()))
