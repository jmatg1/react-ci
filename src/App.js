import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import Login from './containers/Login/Login'
import Wrapper from './containers/Wrapper/Wrapper'
import Dialog from './components/Dialog/Dialog'
import PopupsContext from './contexts'
import TweetMenu from './components/TweetMenu/TweetMenu'
import { withFirebase } from './firebase/index'
import * as actions from './store/actions/index'

class App extends Component {
  state = {
    dialog: {
      isOpen: false,
      placeholder: null,
      title: null,
      inputValue: null,
      data: {
        img: [],
        idVideos: []
      },
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
    const { onFetchUsers, onFetchTweets, onFetchComments } = this.props
    const uptTweetMenu = { ...this.state.tweetMenu }
    uptTweetMenu.funcClose = this.handleTweetMenuClose
    uptTweetMenu.funcOpen = this.handleTweetMenuOpen

    this.setState({ tweetMenu: uptTweetMenu })

    this.props.firebase.users().on('value', snapshot => {
      onFetchUsers(snapshot.val())
    })

    this.props.firebase.comments().on('value', snapshot => {
      onFetchComments(snapshot.val())
    })

    this.props.firebase.tweets().on('value', snapshot => {
      onFetchTweets(snapshot.val())
    })
  }

  /**
   * Для context
   * Используется в UserHead, для добавления нового твита
   * Используется в MenuItem, для редактирование твита
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

  handleDialogSave = (payload) => {
    this.handleDialogClose()
    this.state.dialog.callBack(payload)
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
    const { profileId } = this.props
    return (
      <>
        <PopupsContext.Provider value={{ openDialog: this.handleDialogOpen }}>
          <Route path="/auth" component={Login}/>

          {profileId === null ? <Redirect to="/auth" component={Login}/> : <Wrapper/>}

          {this.state.dialog.isOpen
            ? <Dialog
              dialog={this.state.dialog}
              open={this.state.dialog.isOpen}
              handleSave={this.handleDialogSave}
              handleClose={this.handleDialogClose}/>
            : null}

          {this.state.tweetMenu.tweetMenuEl
            ? <TweetMenu menu={this.state.tweetMenu}/>
            : null}
        </PopupsContext.Provider>
      </>

    )
  }
}

App.childContextTypes = {
  openDialog: PropTypes.func,
  openTweetMenu: PropTypes.func
}

App.propTypes = {
  // redux
  profileId: PropTypes.number,
  onFetchUsers: PropTypes.func.isRequired,
  onFetchTweets: PropTypes.func.isRequired,
  onFetchComments: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    profileId: state.profile.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchUsers: payload => dispatch(actions.fetchUsers(payload)),
    onFetchTweets: payload => dispatch(actions.fetchTweets(payload)),
    onFetchComments: payload => dispatch(actions.fetchComments(payload))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFirebase
)(App)
