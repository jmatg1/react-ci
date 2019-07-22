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
      if (store.getState().users) firebase.users().set((store.getState().users.toJS()))
      if (store.getState().comments) firebase.comments().set((store.getState().comments.toJS()))
      if (store.getState().tweets) firebase.tweets().set((store.getState().tweets.toJS()))
      return true
  }
}
