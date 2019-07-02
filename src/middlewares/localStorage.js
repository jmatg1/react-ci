import { setItem } from '../shared/utility'
import * as actionTypes from '../store/actions/actionTypes'
export default (store) => (next) => (action) => {
  next(action)
  if (action.type === actionTypes.SET_PROFILE) setItem('users', Object.values(store.getState().users.toJS()))
}
