import { createSelector } from 'reselect'
import { fromJS, Map } from 'immutable'

export const profileIdSelector = state => state.profile.id
export const tweetsSelector = state => state.tweets
export const usersSelector = state => state.users
export const commentsSelector = state => state.comments
export const userIdSelector = (_, prevProps) => prevProps
export const tweetIdSelector = (_, prevProps) => prevProps.tweetId

export const getProfileId = createSelector(profileIdSelector, (profileId) => profileId)

// Добавляем isFavorite к каждому твиту, true - пост лайкнут
const sortFavoriteTweets = (tweetsFilter, profileId) => {
  return tweetsFilter.map(tw => {
    const isFavorite = tw.get('likes').find(lkId => lkId === profileId) !== undefined // лакнут ли этот пост

    return tw.set('isFavorite', isFavorite)
  })
    .valueSeq()
    .toJS()
    .sort((a, b) => { // сортируем от самых новых
      const dateA = new Date(a.dateCreate).getTime()
      const dateB = new Date(b.dateCreate).getTime()

      return dateB - dateA
    })
}

// Ищем все твиты как свои так и твиты подписок
export const fetchTweetsMain = createSelector(
  profileIdSelector,
  tweetsSelector,
  usersSelector,
  (profileId, tweets, users) => {
    const following = users.getIn([profileId, 'following']).toJS() // список подписок

    const tweetsFilter = tweets
      .filter(tweet => {
        const createUserId = tweet.get('createUserId')
        if (createUserId === profileId || // собственные твиты
          following.find(folId => (folId === createUserId))) { // твиты подписок
          return tweet
        }
        return null
      })

    return sortFavoriteTweets(tweetsFilter, profileId)
  })

export const fetchTweetsUser = createSelector(
  tweetsSelector,
  userIdSelector,
  profileIdSelector,
  (tweets, pageId, profileId) => {
    const tweetsFilter = tweets
      .filter(tweet => (tweet.get('createUserId') === pageId))
    return sortFavoriteTweets(tweetsFilter, profileId)
  })

// Получаем комментарии твита
export const fetchComments = createSelector(
  profileIdSelector,
  tweetIdSelector,
  usersSelector,
  commentsSelector,
  tweetsSelector,
  (profileId, tweetId, users, comments, tweets) => {
    return tweets.getIn([tweetId, 'commentsId']).map(cmId => {
      const user = users.get(comments.get(cmId).createUserId).toJS()
      const isIgnore = users.getIn([profileId, 'ignoreList']).find(igId => igId === user.id) !== undefined

      return ({
        comment: comments.get(cmId),
        user: user,
        isIgnore,
        isMy: user.id === profileId
      })
    }).valueSeq().toJS()
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
  , (profileId, tweets) => {
    return sortFavoriteTweets(tweets, profileId)
  })

export const fetchIgnoreUsers = state => {
  const { users, profile: { id: profileId } } = state

  const ignoreList = users.getIn([profileId, 'ignoreList'])

  return users
    .filter((_, i) => ignoreList.find(igId => igId === i)).valueSeq().toJS()
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
