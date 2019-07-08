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
export const getUser = (state, { userPageId }) => {
  return state.users.get(userPageId).toJS()
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
