import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'

import { connect } from 'react-redux'
import { fetchTweetsUser } from '../../../selectors'
import Tweet from '../../../components/Tweet/Tweet'

const Tweets = (props) => {
  const { tweets } = props

  return tweets.map(tw => (
    <Grid key={tw.id} item xs={4}>
      <Tweet tweet={tw}/>
    </Grid>
  ))
}

Tweets.propTypes = {
  pageId: PropTypes.number.isRequired,
  // redux
  tweets: PropTypes.array.isRequired
}

const mapStateToProps = (state, prevProps) => {
  const profileId = state.profile.id
  const id = prevProps.pageId ? prevProps.pageId : profileId

  return {
    tweets: fetchTweetsUser(state, id)
  }
}

export default connect(mapStateToProps)(Tweets)
