import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'

import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import * as actions from '../../../store/actions/index'
import { fetchTweetsMain, fetchTweetsUser } from '../../../selectors/index'
import UserHead from '../../../components/UserHead/UserHead'
import Tweet from '../../../components/Tweet/Tweet'
import TweetsPage from './Tweets'
import FollowingPage from './Following'
import FollowersPage from './Followers'

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
        <Switch>
          <Route path={`/tweets`} component={TweetsPage}/>
          <Route path={`/following`} component={FollowingPage}/>
          <Route path={`/followers`} component={FollowersPage}/>

          <Route path={`/${pageId}/tweets`} component={TweetsPage}/>
          <Route path={`/${pageId}/following`} component={FollowingPage}/>
          <Route path={`/${pageId}/followers`} component={FollowersPage}/>
          <Route path={`/`} render={()=>renderTwits}/>
        </Switch>
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
