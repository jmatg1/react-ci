import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Tweet} from './Tweet'
import FavoriteIcon from '@material-ui/icons/Favorite'

configure({adapter: new Adapter()})

describe('test Tweet', () => {

  const tweet =   {
    id: 0,
    createUserId: 0,
    text: "Мой первый твит",
    likes: [1],
    comments: [0],
    isFavorite: true,
    dateCreate: "2019-06-20T10:11:38.207Z"
  }
  const user = {
    name: 'NAme'
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

    wrapper.setProps({tweet: changeFavoriteTweet})
    expect(wrapper.find('FavoriteIcon').props().color).toEqual('primary')

  })

  it('should change value favorite tweet', function () {
    const changedTweet =  { tweetId: 0, isFavorite: true, profileId: 789 }
    wrapper.find('[aria-label="Add to favorites"]').simulate('click')

    expect(mockchangeFavorite.mock.results[0].value).toEqual(changedTweet)
    expect(mockchangeFavorite).toHaveBeenCalledTimes(1)

  })
})
