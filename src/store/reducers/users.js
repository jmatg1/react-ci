import { Map } from 'immutable'
import * as actionTypes from '../actions/actionTypes'
import contactsDate from '../data/users'
import { arrayToObject, getItem, setItem } from '../../shared/utility'

let contactsStor = getItem('users')

if (!contactsStor) {
  setItem('users', contactsDate)
  contactsStor = contactsDate
}

const initialStore = new Map(arrayToObject(contactsStor))
// ----------------------------------------

const signupUser = (state, action) => {
  const { payload: newUser } = action
  return state.set(newUser.id, newUser)
}

const usersStore = (state = initialStore, action) => {
  switch (action.type) {
  case actionTypes.SINGUP_USER: return signupUser(state, action)
  default: return state
  }
}

export default usersStore
