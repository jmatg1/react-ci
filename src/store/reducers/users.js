import { fromJS } from 'immutable'
import * as actionTypes from '../actions/actionTypes'
import contactsDate from '../data/users'
import { getItem, setItem } from '../../shared/utility'

let contactsStor = getItem('users')

if (!contactsStor) {
  setItem('users', contactsDate)
  contactsStor = contactsDate
}

const initialStore = fromJS(contactsStor)
// ----------------------------------------
// Добавление нового пользователя в БД
const signupUser = (state, { payload: newUser }) => {
  return state.set(newUser.id, fromJS(newUser))
}
// Удалить твит
const tweetRemove = (state, { tweet }) => {
  return state
    .updateIn(
      [tweet.createUserId, 'tweets'],
      tweets => tweets.filter(twId => twId !== tweet.id)
    )
}
// Добавить твит
const tweetAdd = (state, { tweet }) => {
  return state
    .updateIn(
      [tweet.createUserId, 'tweets'],
      tweets => tweets.push(tweet.id)
    )
}
// Добавить пользователя в ЧС, по клику на твит
const addUserIgnore = (state, { tweet, profileId }) => {
  const uptState = unsubscribe(state, { id: tweet.createUserId, profileId })
  return uptState
    .updateIn(
      [profileId, 'ignoreList'],
      ignoreList => ignoreList.push(tweet.createUserId)
    )
}
// Удалить пользоваетдя из ЧС
const removeUserIgnore = (state, { tweet, profileId }) => {
  return state
    .updateIn(
      [profileId, 'ignoreList'],
      ignoreList => ignoreList.filter(igId => igId !== tweet.createUserId)
    )
}
// Подписаться на пользователя
// const subscribeUser = (state, action) => {
//
// }
// Отписаться от пользователя
const unsubscribe = (state, { id, profileId }) => {
  return state.updateIn(
    [profileId, 'following'],
    following => following.filter(flId => flId !== id)
  )
}

const usersStore = (state = initialStore, action) => {
  switch (action.type) {
  case actionTypes.USER_SIGN: return signupUser(state, action)
  case actionTypes.TWEET_REMOVE: return tweetRemove(state, action)
  case actionTypes.TWEET_ADD: return tweetAdd(state, action)
  case actionTypes.USER_ADD_IGNORE: return addUserIgnore(state, action)
  case actionTypes.USER_REMOVE_IGNORE: return removeUserIgnore(state, action)
  default: return state
  }
}

export default usersStore
