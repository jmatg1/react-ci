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

const signupUser = (state, { payload: newUser }) => {
  return state.set(newUser.id, fromJS(newUser))
}

const tweetRemove = (state, { tweet }) => {
  return state
    .updateIn(
      [tweet.createUserId, 'tweets'],
      tweets => tweets.filter(twId => twId !== tweet.id)
    )
}
const tweetAdd = (state, { tweet }) => {
  return state
    .updateIn(
      [tweet.id, 'tweets'],
      tweets => tweets.push(tweet.createUserId)
    )
}
const addUserIgnore = (state, { tweet, profileId }) => {
  const uptState = unsubscribe(state, { id: tweet.createUserId, profileId })
  return uptState
    .updateIn(
      [profileId, 'ignoreList'],
      ignoreList => ignoreList.push(tweet.createUserId)
    )
}
const removeUserIgnore = (state, { tweet, profileId }) => {
  return state
    .updateIn(
      [profileId, 'ignoreList'],
      ignoreList => ignoreList.filter(igId => igId !== tweet.createUserId)
    )
}
const subscribeUser = (state, action) => {

}
const unsubscribe = (state, { id, profileId }) => {

  console.log(id,profileId)

  return state.updateIn(
    [profileId, 'following'],
    following => following.filter(flId => flId !== id)
  )
}

const usersStore = (state = initialStore, action) => {
  switch (action.type) {
  case actionTypes.SINGUP_USER: return signupUser(state, action)
  case actionTypes.TWEET_REMOVE: return tweetRemove(state, action)
  case actionTypes.ADD_TWEET: return tweetAdd(state, action)
  case actionTypes.ADD_USER_IGNORE: return addUserIgnore(state, action)
  case actionTypes.REMOVE_USER_IGNORE: return removeUserIgnore(state, action)
  default: return state
  }
}

export default usersStore
