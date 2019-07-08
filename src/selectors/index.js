// Ищем все твиты как свои так и твиты подписок
export const fetchTweetsMain = (state) => {
  const { profile: { id }, tweets } = state

  const following = state.users.getIn([id, 'following']).toJS()
  return tweets
    .filter(tweet => {
      if (tweet.createUserId === id || following // собственные твиты
        .find(folId => (folId === tweet.createUserId))) { // твиты подписок
        tweet.isFavorite = tweet.likes.find(lkId => lkId === id) !== undefined // лакнут ли этот пост
        return tweet
      }
      return null
    })
    .sort((a, b) => {
      const dateA = new Date(a.dateCreate).getTime()
      const dateB = new Date(b.dateCreate).getTime()

      return dateB - dateA
    })
}
export const fetchComments = (tweetId, users, comments, tweets) => {
  return tweets.get(tweetId).commentsId.map(cmId =>
    ({
      comment: comments.get(cmId),
      user: users.get(comments.get(cmId).createUserId).toJS()
    })
  )
}

export const getUser = (state, { userPageId }) => {
  return state.users.get(userPageId).toJS()
}

// export const fetchTweetsUser = (state) => {
//   const { id, following } = state.profile.toJS()
//   let filterTwitter = state.tweets
//     .filter(tweet => (
//       tweet.createUserId === id || following
//         .find(folId => (
//           folId === tweet.createUserId
//         )
//         )
//     )
//     )
//     .sort((a, b) => {
//       const dateA = new Date(a.dateCreate).getTime(); const dateB = new Date(b.dateCreate).getTime()
//       return dateA + dateB
//     })
//
//   return filterTwitter
// }
