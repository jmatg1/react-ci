import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import users from './reducers/users'
import profile from './reducers/profile'
import tweets from './reducers/tweets'
import comments from './reducers/comments'
import thunk from 'redux-thunk'
import localStorage from '../middlewares/localStorage'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
  users,
  profile,
  tweets,
  comments
})

export default function configureStore () {
  return createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk, localStorage)
  ))
}
