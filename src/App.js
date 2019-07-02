import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Login from './containers/Login/Login'
import Wrapper from './containers/Wrapper/Wrapper'

class App extends Component {
  render () {
    const { profileId } = this.props
    console.log('RENDER APP')

    return (
      <>
        <Route path="/auth" component={Login}/>
        {profileId === null ? <Redirect to="/auth" component={Login}/> : <Wrapper/>}
      </>

    )
  }
}

const mapStateToProps = state => {
  return {
    profileId: state.profile.id
  }
}

export default connect(mapStateToProps)(App)
