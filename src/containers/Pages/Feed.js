import React from 'react'
import Grid from '@material-ui/core/Grid'

import { connect } from 'react-redux'
import { fetchAllTweets } from '../../selectors/index'
import Tweet from '../../components/Tweet/Tweet'

const Feed = (props) => {
  let renderTwits = []

  props.tweets.flatMap(tw => {
    renderTwits.push(
      <Grid key={tw.id} item xs={4}>
        <Tweet tweet={tw}/>
      </Grid>
    )
  })

  return (

    <Grid container spacing={4}>
      {renderTwits}
    </Grid>
  )
}

const mapStateToProps = state => {
  return {
    tweets: fetchAllTweets(state, state.profile.id)
  }
}

export default connect(mapStateToProps)(Feed)
