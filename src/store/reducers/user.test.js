import { Map, fromJS } from 'immutable'
import reducer, { initialStore } from './users'
import * as actionTypes from '../actions/actionTypes'
import * as actions from '../actions/index'

const initialState = fromJS([
  {id: 0,}
  ])

describe('reducer user', () => {
  it(actionTypes.USER_SIGN, function () {
    const payload = {
      newUser: {
        id: 999999
      }
    }
    const action = actions.signupUser(payload)
    const newState = initialStore.set(payload.newUser.id, fromJS(payload.newUser))

    expect(reducer(initialStore, action)).toEqual(newState)
  })

  it(actionTypes.TWEET_ADD, function () {
    const payload = {
      tweet: {
        id: 999999,
        createUserId: initialStore.first().get('id')
      }
    }
    const action = actions.addTweet(payload)
    const newState = initialStore.set(payload.tweet.id, fromJS(payload.tweet))

    // expect(reducer(initialStore, action)).toEqual(newState)
  })
})
