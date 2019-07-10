import {createSelector} from 'reselect'

export const profileIdSelector = state => state.profile.id
export const tweetsSelector = state => state.tweets
export const usersSelector = state => state.users
export const commentsSelector = state => state.comments
export const userIdSelector = (_,prevProps) => prevProps
export const tweetIdSelector = (_,prevProps) => prevProps.tweetId

export const getProfileId = createSelector(profileIdSelector,(profileId) => profileId)

// Ищем все твиты как свои так и твиты подписок
// Добавляем isFavorite к каждому твиту, true - пост лайкнут
export const fetchTweetsMain = createSelector(
  profileIdSelector,
  tweetsSelector,
  usersSelector,
  (profileId, tweets, users) => {

  const following = users.getIn([profileId, 'following']).toJS() // список подписок
  return tweets
    .filter(tweet => {
      if (tweet.createUserId === profileId || // собственные твиты
        following.find(folId => (folId === tweet.createUserId))) { // твиты подписок
        tweet.isFavorite = tweet.likes.find(lkId => lkId === profileId) !== undefined // лакнут ли этот пост
        return tweet
      }
      return null
    })
    .sort((a, b) => { // сортируем от самых новых
      const dateA = new Date(a.dateCreate).getTime()
      const dateB = new Date(b.dateCreate).getTime()

      return dateB - dateA
    })
})

export const fetchTweetsUser = createSelector(
  profileIdSelector,
  tweetsSelector,
  usersSelector,
  userIdSelector,
  (profileId, tweets, users, userId) => {

  return tweets
    .filter(tweet => {
      if (tweet.createUserId === userId) { // твиты пользователя
        tweet.isFavorite = tweet.likes.find(lkId => lkId === profileId) !== undefined // лакнут ли этот пост
        return tweet
      }
      return null
    })
    .sort((a, b) => { // сортируем от самых новых
      const dateA = new Date(a.dateCreate).getTime()
      const dateB = new Date(b.dateCreate).getTime()

      return dateB - dateA
    })
})


// Получаем комментарии твита
export const fetchComments = createSelector(
  tweetIdSelector,
  usersSelector,
  commentsSelector,
  tweetsSelector,
  (tweetId, users, comments, tweets) => {
  return tweets.get(tweetId).commentsId.map(cmId =>
    ({
      comment: comments.get(cmId),
      user: users.get(comments.get(cmId).createUserId).toJS()
    })
  )
})

// Получаем пользователя
export const getUser = (state, id) => {
  if (state.profile.id === id) return state.users.get(id).toJS()

  // получаем чужую страницу
  // добавляем isSubscribed если мы на него подписаны
  const profileId = state.profile.id
  const userPageId = id
  const user = state.users.get(id).toJS()

  user.isSubscribed = false

  const following = state.users.getIn([profileId, 'following'])

  if (following.find(usId => usId === userPageId)) { // пользователь подписан на него
    user.isSubscribed = true
  }

  return user
}


export const fetchAllTweets = createSelector(
  profileIdSelector,
  tweetsSelector
  , (profileId,tweets) => {
  return tweets
    .map(tweet => {
      tweet.isFavorite = tweet.likes.find(lkId => lkId === profileId) !== undefined // лакнут ли этот пост
      return tweet
    })
    .sort((a, b) => { // сортируем от самых новых
      const dateA = new Date(a.dateCreate).getTime()
      const dateB = new Date(b.dateCreate).getTime()

      return dateB - dateA
    })
})

export const fetchIgnoreUsers = state => {
  const { users, profile: { id: profileId } } = state

  const ignoreList = users.getIn([profileId, 'ignoreList'])

  return users
    .filter((_, i) => ignoreList.find(igId => igId === i)).toJS()
}

export const fetchFollowing = (state, id) => {
  const usersId = state.users.getIn(
    [id, 'following']
  )

  let users = []

  usersId.map(usId => {
    users.push(state.users.get(usId).toJS())
  })

  return users
}

export const fetchFollowers = (state, id) => {
  const usersId = state.users.getIn(
    [id, 'followers']
  )

  console.log('selector', id)
  let users = []

  usersId.map(usId => {
    users.push(state.users.get(usId).toJS())
  })

  return users
}
