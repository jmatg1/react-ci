import React from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Tweet from '../../../components/Tweet/Tweet'
import { fetchTweetsUser } from '../../../selectors'

const Tweets = (props) => {
  const { tweets } = props

  let renderTwits = []
  tweets.flatMap(tw => {
    renderTwits.push(
      <Grid key={tw.id} item xs={4}>
        <Tweet tweet={tw}/>
      </Grid>
    )
  })
  return (
    <>
      {renderTwits}
    </>
  )
}

const mapStateToProps = (state,prevProps) => {
  const profileId = state.profile.id
  const id  =  prevProps.pageId ? prevProps.pageId : profileId

  return {
    tweets: fetchTweetsUser(state,id)
  }
}


export default connect(mapStateToProps)(Tweets)
