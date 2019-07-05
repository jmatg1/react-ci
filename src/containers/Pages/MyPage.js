import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'

import { connect } from 'react-redux'

import * as actions from '../../store/actions/index'
import { fetchTweetsMain } from '../../selectors/index'
import UserHead from '../../components/UserHead/UserHead'
import Tweet from '../../components/Tweet/Tweet'

class MyPage extends Component {
  render () {
    console.log('render MyPage')

    const { profileId, tweets } = this.props

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
        <UserHead userPageId={profileId}/>
        {renderTwits}
      </>
    )
  }
}

const mapStateToProps = (state, prevProps) => {
  console.log('connect MyPage')

  return {
    profileId: state.profile.id,
    tweets: fetchTweetsMain(state, prevProps)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchTweetsMain: (payload) => dispatch(actions.fetchTweetsMain(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPage)
