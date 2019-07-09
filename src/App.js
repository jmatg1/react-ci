import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Login from './containers/Login/Login'
import Wrapper from './containers/Wrapper/Wrapper'
import Dialog from './components/Dialog/Dialog'
import PopupsContext from './contexts'
import TweetMenu from './components/TweetMenu/TweetMenu'
class App extends Component {
  state = {
    dialog: {
      isOpen: false,
      placeholder: null,
      title: null,
      inputValue: null,
      data: {},
      callBack: null
    },
    tweetMenu: {
      tweet: null,
      tweetMenuEl: null,
      funcClose: null,
      funcOpen: null
    }
  }

  componentDidMount () {
    const uptTweetMenu = { ...this.state.tweetMenu }
    uptTweetMenu.funcClose = this.handleTweetMenuClose
    uptTweetMenu.funcOpen = this.handleTweetMenuOpen

    this.setState({ tweetMenu: uptTweetMenu })
  }

  /**
   * Для context
   * Используется в UserHead, для добавления нового твита
   * @return {{openDialog: App.handleDialogOpen}}
   */
  getChildContext () {
    return {
      openDialog: this.handleDialogOpen,
      openTweetMenu: this.handleTweetMenuOpen
    }
  }
  changePopup = (type, status, settings) => {
    const popup = { ...this.state[type] }

    for (let key in settings) {
      popup[key] = settings[key]
    }

    popup.isOpen = status

    this.setState(
      { [type]: { ...popup } }
    )
  }
  // -- Dialog Start
  handleDialogOpen = (settings) => {
    this.changePopup('dialog', true, settings)
  }

  handleDialogClose = () => {
    this.changePopup('dialog', false)
  }

  handleDialogSave = (text) => {
    this.handleDialogClose()
    this.state.dialog.callBack(text)
  }
  // -- Dialog End

  // -- Tweet Menu Start
  handleTweetMenuOpen = (settings) => {
    const uptTweetMenu = { ...this.state.tweetMenu }
    uptTweetMenu.tweetMenuEl = settings.tweetMenuEl
    uptTweetMenu.tweet = settings.tweet

    this.setState({ tweetMenu: uptTweetMenu })
  }

  handleTweetMenuClose = () => {
    const uptTweetMenu = { ...this.state.tweetMenu }
    uptTweetMenu.tweetMenuEl = null

    this.setState({ tweetMenu: uptTweetMenu })
  }
  // -- Tweet Menu End
  render () {
    console.log(this.state.tweetMenu)

    const { profileId } = this.props
    console.log('RENDER APP')
    return (
      <>
        <PopupsContext.Provider value={{ openDialog: this.handleDialogOpen }}>
          <Route path="/auth" component={Login}/>

          {profileId === null ? <Redirect to="/auth" component={Login}/> : <Wrapper/>}

          <Dialog
            dialog={this.state.dialog}
            open={this.state.dialog.isOpen}
            handleSave={this.handleDialogSave}
            handleClose={this.handleDialogClose}/>
          {this.state.tweetMenu.tweetMenuEl ? <TweetMenu menu={this.state.tweetMenu}/> : null }
        </PopupsContext.Provider>
      </>

    )
  }
}

App.childContextTypes = {
  openDialog: PropTypes.func,
  openTweetMenu: PropTypes.func
}

const mapStateToProps = state => {
  return {
    profileId: state.profile.id
  }
}

export default connect(mapStateToProps)(App)
