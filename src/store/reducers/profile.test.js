import reducer, { initialState } from './profile'
import * as actionTypes from '../actions/actionTypes'
describe('Reducer profile', ()=>{
  it('PROFILE_SET', function () {

    const action = {
      type: actionTypes.PROFILE_SET,
      payload: {}
    }
    expect(reducer(initialState, action)).toEqual({})
  })
} )
