import React from 'react'
import Grid from '@material-ui/core/Grid'

import { connect } from 'react-redux'
import { fetchTweetFeed } from '../../selectors/index'
import Tweet from '../../components/Tweet/Tweet'

const Feed = (props) => {
  const renderTwits = props.tweets.map(tw => (
    <Grid key={tw.id} item xs={4}>
      <Tweet tweet={tw}/>
    </Grid>
  ))

  return (

    <Grid container spacing={4}>
      {renderTwits}
    </Grid>
  )
}

const mapStateToProps = state => {
  return {
    tweets: fetchTweetFeed(state)
  }
}

export default connect(mapStateToProps)(Feed)
