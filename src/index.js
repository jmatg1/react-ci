import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import App from './App'
import users from './store/reducers/users'
import profile from './store/reducers/profile'
import tweets from './store/reducers/tweets'
import comments from './store/reducers/comments'
import localStorage from './middlewares/localStorage'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
  users,
  profile,
  tweets,
  comments
})

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk, localStorage)
))

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>

)

ReactDOM.render(app, document.getElementById('root'))
