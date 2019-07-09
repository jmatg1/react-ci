// Ищем все твиты как свои так и твиты подписок
// Добавляем isFavorite к каждому твиту, true - пост лайкнут
export const fetchTweetsMain = (state) => {
  const { profile: { id }, tweets } = state

  const following = state.users.getIn([id, 'following']).toJS() // список подписок
  return tweets
    .filter(tweet => {
      if (tweet.createUserId === id || // собственные твиты
        following.find(folId => (folId === tweet.createUserId))) { // твиты подписок
        tweet.isFavorite = tweet.likes.find(lkId => lkId === id) !== undefined // лакнут ли этот пост
        return tweet
      }
      return null
    })
    .sort((a, b) => { // сортируем от самых новых
      const dateA = new Date(a.dateCreate).getTime()
      const dateB = new Date(b.dateCreate).getTime()

      return dateB - dateA
    })
}
// Получаем комментарии твита
export const fetchComments = (tweetId, users, comments, tweets) => {
  return tweets.get(tweetId).commentsId.map(cmId =>
    ({
      comment: comments.get(cmId),
      user: users.get(comments.get(cmId).createUserId).toJS()
    })
  )
}
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

export const fetchTweetsUser = (state, pageId) => {
  const { profile: { id: profileId }, tweets } = state

  return tweets
    .filter(tweet => {
      if (tweet.createUserId === pageId) { // твиты пользователя
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
}

export const fetchAllTweets = (state, profileId) => {
  return state.tweets
    .map(tweet => {
      tweet.isFavorite = tweet.likes.find(lkId => lkId === profileId) !== undefined // лакнут ли этот пост
      return tweet
    })
    .sort((a, b) => { // сортируем от самых новых
      const dateA = new Date(a.dateCreate).getTime()
      const dateB = new Date(b.dateCreate).getTime()

      return dateB - dateA
    })
}

export const fetchIgnoreUsers = state => {
  const { users, profile: { id: profileId } } = state

  const ignoreList = users.getIn([profileId, 'ignoreList'])

  return users
    .filter((_, i) => ignoreList.find(igId => igId === i)).toJS()
}
