import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import configureStore from './store/index'
import firebase, { FirebaseContext } from './firebase/index'
const store = configureStore()

const app = (
  <FirebaseContext.Provider value={firebase}>
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  </FirebaseContext.Provider>

)

ReactDOM.render(app, document.getElementById('root'))
