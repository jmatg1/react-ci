import { Map } from 'immutable'
import * as actionTypes from '../actions/actionTypes'
import contactsDate from '../data/users'
import { arrToMap, getItem, setItem } from '../../shared/utility'

let contactsStor = getItem('users')

if (!contactsStor) {
  setItem('users', contactsDate)
  contactsStor = contactsDate
}

const initialStore = new Map(arrToMap(contactsStor))
// ----------------------------------------

const signupUser = (state, action) => {
  const { payload: newUser } = action
  return state.set(newUser.id, newUser)
}

const tweetRemove = (state, action) => {
  const { tweet: { id: tweetId }, profileId } = action
  console.log('--------------------')

  const uptState = state
    .updateIn(
      [profileId, 'tweets'],
      tweets => tweets.filter(twId => twId !== tweetId)
    )
  console.log(uptState.toJS())
  console.log('--------------------')
  return uptState
}

const usersStore = (state = initialStore, action) => {
  switch (action.type) {
  case actionTypes.SINGUP_USER: return signupUser(state, action)
  case actionTypes.TWEET_REMOVE: return tweetRemove(state, action)
  default: return state
  }
}

export default usersStore
