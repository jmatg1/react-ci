import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Tweet} from './Tweet'
import FavoriteIcon from '@material-ui/icons/Favorite'

configure({adapter: new Adapter()})

describe('test Tweet', () => {

  const tweet =   {
    id: 10,
    createUserId: 11,
    text: "tweet text",
    likes: [],
    commentsId: [],
    dateCreate: "2018-12-26T00:00:20.786Z",
    isFavorite: true
  }
  const user =  {
    id: 7110,
    name: "Chesley Bahringer",
    nickName: "Verona56",
    password: "asd",
    avatar: "http",
    tweets: [
      3524,
      1294,
      8976,
      8403
    ],
    following: [5289],
    followers: [5289],
    ignoreList: []
  }
  const comment =   {
    id: 0,
    createUserId: 1,
    text: "hello",
    dateCreate: "2018-11-01T12:56:34.294Z"
  }
  const profileId = 789

  const mockchangeFavorite = jest.fn(x => x)

  const wrapper = shallow(
    <Tweet tweet={tweet}
           user={user}
           classes={{}}
           profileId={profileId}
           onChangeFavoriteTweet={mockchangeFavorite}
    />
           )

  it('renders tweet', () => {
    expect(wrapper).toHaveLength(1)
  })

  it('should tweet text', () => {
    expect(wrapper.find('WithStyles(ForwardRef(Typography))').first().text()).toEqual(tweet.text)
  })

  it('should change color favorite tweet', () => {
    expect(wrapper.find('FavoriteIcon').props().color).toEqual('secondary')

    const changeFavoriteTweet = {...tweet}
    changeFavoriteTweet.isFavorite = false

    const newWrapper = shallow(
      <Tweet tweet={changeFavoriteTweet}
             user={user}
             classes={{}}
             profileId={profileId}
             onChangeFavoriteTweet={mockchangeFavorite}
      />
    )

    expect(newWrapper.find('FavoriteIcon').props().color).toEqual('primary')

  })

  it('should change value favorite tweet', function () {
    const changedTweet =  { tweetId: tweet.id, isFavorite: !tweet.isFavorite, profileId: profileId }
    wrapper.find('[aria-label="Add to favorites"]').simulate('click')

    expect(mockchangeFavorite.mock.results[0].value).toEqual(changedTweet)
    expect(mockchangeFavorite).toHaveBeenCalledTimes(1)

  })
})
