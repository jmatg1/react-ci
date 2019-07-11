import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'

import { connect } from 'react-redux'
import { fetchTweetsMain, fetchTweetsUser, getProfileId } from '../../../selectors/index'
import { Switch, Route } from 'react-router-dom'
import UserHead from '../../../components/UserHead/UserHead'
import Tweet from '../../../components/Tweet/Tweet'
import TweetsPage from './Tweets'
import FollowPage from './Follow'

class User extends Component {
  render () {
    const { tweets } = this.props
    const routeId = Number(this.props.match.params.id)
    const pageId = routeId || this.props.profileId

    let renderTwits = []

    renderTwits = tweets.map(tw => (
      <Grid key={tw.id} item xs={4}>
        <Tweet tweet={tw}/>
      </Grid>
    ))

    return (
      <>
        <UserHead userPageId={pageId}/>
        <Switch>
          <Route path={`/tweets`} component={TweetsPage}/>
          <Route path={`/following`} render={() => <FollowPage type='following' pageId={pageId}/>}/>
          <Route path={`/followers`} render={() => <FollowPage type='followers' pageId={pageId}/>}/>

          <Route path={`/${pageId}/tweets`} render={() => <TweetsPage pageId={pageId}/>}/>
          <Route path={`/${pageId}/following`} render={() => <FollowPage type='following' pageId={pageId}/>}/>
          <Route path={`/${pageId}/followers`} render={() => <FollowPage type='followers' pageId={pageId}/>}/>
          <Route path={`/`} render={() => renderTwits}/>
        </Switch>
      </>
    )
  }
}

const mapStateToProps = (state, prevProps) => {
  const profileId = state.profile.id
  const routeId = Number(prevProps.match.params.id)
  const pageId = routeId || profileId
  let isMyPage = false
  if (pageId === profileId) isMyPage = true

  return {
    profileId: getProfileId(state),
    tweets: isMyPage ? fetchTweetsMain(state, prevProps) : fetchTweetsUser(state, pageId)
  }
}

export default connect(mapStateToProps)(User)
