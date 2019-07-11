import PropTypes from 'prop-types'

export const tweet = PropTypes.shape({
  id: PropTypes.number,
  createUserId: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  likes: PropTypes.array.isRequired,
  commentsId: PropTypes.array.isRequired,
  dateCreate: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired
})

export const user = PropTypes.shape({
  id: PropTypes.number.isRequired,
  tweets: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  nickName: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  following: PropTypes.array.isRequired,
  followers: PropTypes.array.isRequired,
  ignoreList: PropTypes.array.isRequired
})

export const comment = PropTypes.shape({
  id: PropTypes.number.isRequired,
  createUserId: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  dateCreate: PropTypes.string.isRequired
})

export const menu = PropTypes.shape({
  funcClose: PropTypes.func.isRequired,
  funcOpen: PropTypes.func.isRequired,
  tweet: tweet,
  tweetMenuEl: PropTypes.object
})
