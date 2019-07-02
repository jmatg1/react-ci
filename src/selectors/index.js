export const fetchTweetsMain = (state) => {

  const { id, following } = state.profile.toJS()
  let filterTwitter = state.tweets
    .filter(tweet => (
        tweet.createUserId === id || following
          .find(folId => (
              folId === tweet.createUserId
            )
          )
      )
    )
    .sort((a, b) => {


      const dateA = new Date(a.dateCreate).getTime(), dateB = new Date(b.dateCreate).getTime()
      console.log(dateA + dateB)
      return dateA + dateB
    })

    return filterTwitter
}
export const fetchTweetsUser = (state) => {

  const { id, following } = state.profile.toJS()
  let filterTwitter = state.tweets
    .filter(tweet => (
        tweet.createUserId === id || following
          .find(folId => (
              folId === tweet.createUserId
            )
          )
      )
    )
    .sort((a, b) => {


      const dateA = new Date(a.dateCreate).getTime(), dateB = new Date(b.dateCreate).getTime()
      console.log(dateA + dateB)
      return dateA + dateB
    })

    return filterTwitter
}
