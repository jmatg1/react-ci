import { setItem } from '../shared/utility'
import * as actionTypes from '../store/actions/actionTypes'
export default (store) => (next) => (action) => {
  next(action)
  if (action.type === actionTypes.REMOVE_MESSAGE ||
    action.type === actionTypes.EDIT_MESSAGE ||
    action.type === actionTypes.ADD_MESSAGE) setItem('messages', Object.values(store.getState().messages))
  if (action.type === actionTypes.EDIT_ROOM ||
    action.type === actionTypes.REMOVE_ROOM ||
    action.type === actionTypes.ADD_ROOM) setItem('rooms', Object.values(store.getState().rooms))
  if (action.type === actionTypes.SET_PROFILE) setItem('contacts', Object.values(store.getState().contacts))
}
