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

const signupUser = (state,  { payload: newUser }) => {
  return state.set(newUser.id, fromJS(newUser))
}

const tweetRemove = (state, action) => {
  const { tweet: { id: tweetId, createUserId: profileId } } = action

  return state
    .updateIn(
      [profileId, 'tweets'],
      tweets => tweets.filter(twId => twId !== tweetId)
    )
}
const tweetAdd = (state, {tweet: { id: tweetId, createUserId: profileId }}) => {
  return state
    .updateIn(
      [profileId, 'tweets'],
      tweets => tweets.push(tweetId)
    )
}

const usersStore = (state = initialStore, action) => {
  switch (action.type) {
  case actionTypes.SINGUP_USER: return signupUser(state, action)
  case actionTypes.TWEET_REMOVE: return tweetRemove(state, action)
  case actionTypes.ADD_TWEET: return tweetAdd(state, action)
  default: return state
  }
}

export default usersStore
