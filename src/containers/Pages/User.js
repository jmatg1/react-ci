import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'

import { connect } from 'react-redux'

import * as actions from '../../store/actions/index'
import { fetchTweetsMain, fetchTweetsUser } from '../../selectors/index'
import UserHead from '../../components/UserHead/UserHead'
import Tweet from '../../components/Tweet/Tweet'

class User extends Component {
  render () {
    console.log('render MyPage')

    const { tweets } = this.props
    const routeId = Number(this.props.match.params.id)
    const pageId = routeId || this.props.profileId

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
        <UserHead userPageId={pageId}/>
        {renderTwits}
      </>
    )
  }
}

const mapStateToProps = (state, prevProps) => {
  console.log('connect MyPage')
  const profileId = state.profile.id
  const routeId = Number(prevProps.match.params.id)
  const pageId = routeId || profileId
  let isMyPage = false
  if (pageId === profileId) isMyPage = true

  return {
    profileId: profileId,
    tweets: isMyPage ? fetchTweetsMain(state, prevProps) : fetchTweetsUser(state, pageId)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchTweetsMain: (payload) => dispatch(actions.fetchTweetsMain(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
