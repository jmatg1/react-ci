
// Ищем все твиты как свои так и твиты подписок
export const fetchTweetsMain = (state) => {
  const { profile: { id, following }, tweets } = state
  let filterTwitter = tweets
    .filter(tweet => {
      if (tweet.createUserId === id || following // собственные твиты
        .find(folId => (folId === tweet.createUserId))) { // твиты подписок
        tweet.isFavorite = tweet.likes.find(lkId => lkId === id) !== undefined // лакнут ли этот пост
        return tweet
      }
    })
    .sort((a, b) => {
      const dateA = new Date(a.dateCreate).getTime()
      const dateB = new Date(b.dateCreate).getTime()

      return dateB - dateA
    })

  return filterTwitter
}
export const fetchComments = (tweetId, users, comments, tweets) => {
  const filterComments = tweets.get(tweetId).commentsId.map(cmId =>
    ({
      comment: comments.get(cmId),
      user: users.get(comments.get(cmId).createUserId)
    })
  )
  return filterComments
}

export const getUser = (state, {userPageId}) => {

  return state.users.get(userPageId)
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


// Source: http://stackoverflow.com/questions/497790
var dates = {
  convert:function(d) {
    // Converts the date in d to a date-object. The input can be:
    //   a date object: returned without modification
    //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
    //   a number     : Interpreted as number of milliseconds
    //                  since 1 Jan 1970 (a timestamp)
    //   a string     : Any format supported by the javascript engine, like
    //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
    //  an object     : Interpreted as an object with year, month and date
    //                  attributes.  **NOTE** month is 0-11.
    return (
      d.constructor === Date ? d :
        d.constructor === Array ? new Date(d[0],d[1],d[2]) :
          d.constructor === Number ? new Date(d) :
            d.constructor === String ? new Date(d) :
              typeof d === "object" ? new Date(d.year,d.month,d.date) :
                NaN
    );
  },
  compare:function(a,b) {
    // Compare two dates (could be of any type supported by the convert
    // function above) and returns:
    //  -1 : if a < b
    //   0 : if a = b
    //   1 : if a > b
    // NaN : if a or b is an illegal date
    // NOTE: The code inside isFinite does an assignment (=).
    return (
      isFinite(a=this.convert(a).valueOf()) &&
      isFinite(b=this.convert(b).valueOf()) ?
        (a>b)+(a<b) :
        NaN
    );
  },
  inRange:function(d,start,end) {
    // Checks if date in d is between dates in start and end.
    // Returns a boolean or NaN:
    //    true  : if d is between start and end (inclusive)
    //    false : if d is before start or after end
    //    NaN   : if one or more of the dates is illegal.
    // NOTE: The code inside isFinite does an assignment (=).
    return (
      isFinite(d=this.convert(d).valueOf()) &&
      isFinite(start=this.convert(start).valueOf()) &&
      isFinite(end=this.convert(end).valueOf()) ?
        start <= d && d <= end :
        NaN
    );
  }
}
