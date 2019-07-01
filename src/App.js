import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Login from './containers/Login/Login'
import Profile from './containers/Profile/Profile'

class App extends Component {
  render () {
    const { profileId } = this.props
    console.log('RENDER APP')

    return (
      <div className="container">
        <Switch>
          <Route path="/auth" component={Login}/>
          {profileId === null ? <Redirect to="/auth" component={Login}/> : '<Redirect to="/" component={Profile} />'}
          <Route path="/" component={Profile}/>
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    profileId: state.profile.id
  }
}

export default connect(mapStateToProps)(App)
