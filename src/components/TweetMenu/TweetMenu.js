import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import { getProfileId, getUser } from '../../selectors'

class TweetMenu extends Component {
  state = {
    menuList: {
      isMyTweet: [
        {
          text: 'Удалить',
          type: 'remove'
        },
        {
          text: 'Редактировать',
          type: 'edit'
        }
      ],
      isUserTweet: [
        {
          text: ' Удалить пользователя из ЧС',
          type: 'removeIgnore',
          isIgnore: true
        },
        {
          text: 'Добавить пользователя в ЧС',
          type: 'addIgnore',
          isIgnore: false
        }
      ]
    }
  }

  handleTweetMenuSelect = (type) => {
    const {
      onTweetRemove,
      onAddUserIgnore,
      onDeleteUserIgnore,
      profileId,
      menu: {
        tweet,
        tweet: { createUserId }
      }
    } = this.props

    this.props.menu.funcClose()

    switch (type) {
    case 'remove':
      return onTweetRemove(tweet) // удаляем твит из базы и из списка твитов пользователя()
    case 'edit':
      return this.handleDialogOpen()
    case 'addIgnore':
      return onAddUserIgnore(profileId, createUserId)
    case 'removeIgnore':
      return onDeleteUserIgnore(profileId, createUserId)
    default:
      return null
    }
  }
  // ----
  /**
   * Клик по редактировать твит
   * Открывает диалог для редактирование твита
   */
  handleDialogOpen = () => {
    const { tweet: { text } } = this.props.menu

    this.context.openDialog({
      placeholder: 'Текст твита',
      title: 'Изменить твит',
      inputValue: text,
      callBack: this.handleDialogSave
    })
  }
  /**
   * Клик по сохранить отредактированный текст твита
   * @param text
   */
  handleDialogSave = (text) => {
    const { menu: { tweet: { id } }, onTweetEdit } = this.props
    onTweetEdit(id, text)
  }

  render () {
    const {
      profileId,
      profile,
      menu: {
        tweet: { createUserId },
        tweetMenuEl,
        funcClose
      }
    } = this.props

    const isMyTweet = createUserId === profileId
    const isUserIgnore = profile.ignoreList.find(igId => igId === createUserId) !== undefined

    // Выпадающее меню твита
    let menu = []
    if (isMyTweet) {
      menu = this.state.menuList.isMyTweet.map((el) => (
        <MenuItem
          key={el.type}
          onClick={() => this.handleTweetMenuSelect(el.type)}>
          {el.text}
        </MenuItem>
      ))
    } else {
      menu.push(
        this.state.menuList.isUserTweet.map((el) => {
          if (isUserIgnore === el.isIgnore) {
            return (
              <MenuItem
                key={el.type}
                onClick={() => this.handleTweetMenuSelect(el.type)}>
                {el.text}
              </MenuItem>
            )
          }
          return null
        })
      )
    }

    return (
      <Menu
        id="simple-menu"
        anchorEl={tweetMenuEl}
        keepMounted
        open={Boolean(tweetMenuEl)}
        onClose={funcClose}
      >
        {menu}
      </Menu>
    )
  }
}

TweetMenu.contextTypes = ({
  openDialog: PropTypes.func
})

const mapDispatchToProps = dispatch => {
  return {
    onTweetRemove: (tweet) => dispatch(actions.deleteTweet(tweet)),
    onTweetEdit: (id, text) => dispatch(actions.editTweet(id, text)),
    onAddUserIgnore: (profileId, userId) => dispatch(actions.addUserIgnore(profileId, userId)),
    onDeleteUserIgnore: (profileId, userId) => dispatch(actions.deleteUserIgnore(profileId, userId))
  }
}

export default connect(
  (state) => ({
    profileId: getProfileId(state),
    profile: getUser(state, state.profile.id)
  })
  , mapDispatchToProps
)(TweetMenu)
