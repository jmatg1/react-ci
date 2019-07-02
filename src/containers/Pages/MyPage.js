import React from 'react'
import UserHead from '../../components/UserHead/UserHead'
import Grid from '@material-ui/core/Grid'
import Tweet from '../../components/Tweet/Tweet'

const MyPage = () => {
  return (
    <>
      {/* Head Profile */}
      <UserHead isMe/>
      {/* Tweets */}
      <Grid item xs={4}>
        <Tweet/>
      </Grid>
      <Grid item xs={4}>
        <Tweet/>
      </Grid>
      <Grid item xs={4}>
        <Tweet/>
      </Grid>
      <Grid item xs={4}>
        <Tweet/>
      </Grid>
    </>
  )
}

export default MyPage
