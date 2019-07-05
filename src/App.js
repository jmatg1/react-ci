import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Login from './containers/Login/Login'
import Wrapper from './containers/Wrapper/Wrapper'
import Dialog from './components/Dialog/Dialog'
import PopupsContext from './contexts'
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
      isOpen: false
    }
  }
  getChildContext() {
    return {openDialog: this.handleDialogOpen};
  }
  changePopup = (type, status, settings) => {
    const popup = {...this.state[type]}

    for (let key in settings){
      popup[key] = settings[key]
    }

    popup.isOpen = status

    this.setState(
      {[type]: {...popup}}
      )
  }

  handleDialogOpen = (settings) => {
    this.changePopup('dialog',true, settings)
  }

  handleDialogClose = () => {
    this.changePopup('dialog',false)
  }

  handleDialogSave = (text) => {
    console.log('handleDialogSave ----->',this.state)

    this.handleDialogClose()
    this.state.dialog.callBack(text)
  }

  render () {
    const { profileId } = this.props
    console.log('RENDER APP')
    console.log('this.state.dialog.isOpen',this.state.dialog.isOpen)

    return (
      <>
        <PopupsContext.Provider value={{openDialog: this.handleDialogOpen}}>
          <Route path="/auth" component={Login}/>
          {profileId === null ? <Redirect to="/auth" component={Login}/> : <Wrapper/>}

          <Dialog
            dialog={this.state.dialog}
            open={this.state.dialog.isOpen}
            handleSave={this.handleDialogSave}
            handleClose={this.handleDialogClose}/>
        </PopupsContext.Provider>
      </>

    )
  }
}

App.childContextTypes = {
  openDialog: PropTypes.func
};

const mapStateToProps = state => {
  return {
    profileId: state.profile.id
  }
}

export default connect(mapStateToProps)(App)
