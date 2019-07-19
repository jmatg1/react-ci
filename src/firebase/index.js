import React from 'react'
import { FirebaseContext } from '../contexts'
import Firebase from './firebase'

const firebase = new Firebase()
export default firebase

export const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
)

export { FirebaseContext }
