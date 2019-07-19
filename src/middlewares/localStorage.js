import { setItem } from '../shared/utility'
import firebase from '../firebase/index'
import * as actions from '../store/actions/actionTypes'

// при любых обращениях  сохраняем все в localStorage
export default (store) => (next) => (action) => {
  next(action)
  saveUsers(store)
  saveComments(store)
  saveTweets(store)

  switch (action.type) {
    case actions.TWEETS_FETCH:
    case actions.COMMENTS_FETCH:
    case actions.USERS_FETCH:
      return null
    default:
      firebase.users().set((store.getState().users.toJS()))
        .then(fb => console.log('fb send users'))
        .catch(er => console.log(er))

      firebase.comments().set((store.getState().comments.toJS()))
        .then(fb => console.log('fb send comments'))
        .catch(er => console.log(er))

      firebase.tweets().set((store.getState().tweets.toJS()))
        .then(fb => console.log('fb send tweets'))
        .catch(er => console.log(er))
      return true
  }
}

const saveComments = (store) => setItem('comments', Object.values(store.getState().comments.toJS()))
const saveTweets = (store) => setItem('tweets', Object.values(store.getState().tweets.toJS()))
const saveUsers = (store) => setItem('users', Object.values(store.getState().users.toJS()))
