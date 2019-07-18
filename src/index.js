import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import configureStore from './store/index'
import Firebase, { FirebaseContext } from './Firebase/index'
const store = configureStore()

const app = (
  <FirebaseContext.Provider value={new Firebase()}>
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  </FirebaseContext.Provider>

)

ReactDOM.render(app, document.getElementById('root'))
