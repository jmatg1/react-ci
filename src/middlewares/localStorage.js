import firebase from '../firebase/index'
import * as actions from '../store/actions/actionTypes'

// при любых обращениях  сохраняем все в localStorage
export default (store) => (next) => (action) => {
  next(action)

  switch (action.type) {
    case actions.TWEETS_FETCH:
    case actions.COMMENTS_FETCH:
    case actions.USERS_FETCH:
      return null
    default:
      firebase.users().set((store.getState().users.toJS()))
      firebase.comments().set((store.getState().comments.toJS()))
      firebase.tweets().set((store.getState().tweets.toJS()))
      return true
  }
}
