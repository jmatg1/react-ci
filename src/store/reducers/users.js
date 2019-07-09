import { fromJS } from 'immutable'
import * as actionTypes from '../actions/actionTypes'
import contactsDate from '../data/users'
import { arrToMap, getItem, setItem } from '../../shared/utility'

let contactsStor = getItem('users')

if (!contactsStor) {
  setItem('users', contactsDate)
  contactsStor = contactsDate
}

const initialStore = fromJS(arrToMap(contactsStor, fromJS))
console.log(initialStore)

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
const addUserIgnore = (state, { profileId, userId }) => {
  const uptState = unsubscribe(state, { id: userId, profileId })
  return uptState
    .updateIn(
      [profileId, 'ignoreList'],
      ignoreList => ignoreList.push(userId)
    )
}
// Удалить пользоваетдя из ЧС
const removeUserIgnore = (state, { profileId, userId }) => {
  return state
    .updateIn(
      [profileId, 'ignoreList'],
      ignoreList => ignoreList.filter(igId => igId !== userId)
    )
}
// Подписаться на пользователя
const subscribeUser = (state, { payload }) => {
  const {
    profileId,
    subscribeId,
    isSubscribed
  } = payload

  if (isSubscribed) {
    return unsubscribe(state, { id: subscribeId, profileId })
  }

  const uptState = state.updateIn( // подписываемся
    [profileId, 'following'],
    following => following.push(subscribeId)
  )

  return uptState.updateIn( // добавляем подписчика
    [subscribeId, 'followers'],
    following => following.push(profileId)
  )
}
// Отписаться от пользователя
const unsubscribe = (state, { id, profileId }) => {
  const uptState = state.updateIn(
    [profileId, 'following'],
    following => following.filter(flId => flId !== id)
  )
  return uptState.updateIn(
    [id, 'followers'],
    following => following.filter(flId => flId !== profileId)
  )
}

const usersStore = (state = initialStore, action) => {
  switch (action.type) {
  case actionTypes.USER_SIGN: return signupUser(state, action)
  case actionTypes.TWEET_REMOVE: return tweetRemove(state, action)
  case actionTypes.TWEET_ADD: return tweetAdd(state, action)
  case actionTypes.USER_ADD_IGNORE: return addUserIgnore(state, action)
  case actionTypes.USER_REMOVE_IGNORE: return removeUserIgnore(state, action)
  case actionTypes.USER_SUBSCRIBE: return subscribeUser(state, action)
  default: return state
  }
}

export default usersStore
