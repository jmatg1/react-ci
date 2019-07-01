import * as actionTypes from './actionTypes'

export const signupUser = payload => {
  return {
    type: actionTypes.SINGUP_USER,
    payload
  }
}
