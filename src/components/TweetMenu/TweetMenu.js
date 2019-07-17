import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as typeProperty from '../../shared/typeProps'
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
        tweet: { createUserId: userId }
      }
    } = this.props

    this.props.menu.funcClose()

    switch (type) {
      case 'remove':
        return onTweetRemove({ tweet }) // удаляем твит из базы и из списка твитов пользователя()
      case 'edit':
        return this.handleDialogOpen()
      case 'addIgnore':
        return onAddUserIgnore({ profileId, userId })
      case 'removeIgnore':
        return onDeleteUserIgnore({ profileId, userId })
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
    const { tweet: { text, img, idVideos } } = this.props.menu

    this.context.openDialog({
      placeholder: 'Текст твита',
      title: 'Изменить твит',
      inputValue: text,
      data: {
        img,
        idVideos
      },
      callBack: this.handleDialogSave
    })
  }
  /**
   * Клик по сохранить отредактированный текст твита
   * @param text
   */
  handleDialogSave = (payload) => {
    const { menu: { tweet: { id } }, onTweetEdit } = this.props
    onTweetEdit({ tweetId: id, tweetText: payload.text, ...payload })
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

TweetMenu.propTypes = {
  menu: typeProperty.menu,
  // redux
  profileId: PropTypes.number.isRequired,
  onAddUserIgnore: PropTypes.func.isRequired,
  onDeleteUserIgnore: PropTypes.func.isRequired,
  onTweetEdit: PropTypes.func.isRequired,
  onTweetRemove: PropTypes.func.isRequired,
  onChangeFavoriteTweet: PropTypes.func,
  profile: typeProperty.user

}

const mapStateToProps = state => {
  return {
    profileId: getProfileId(state),
    profile: getUser(state, state.profile.id)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTweetRemove: (payload) => dispatch(actions.deleteTweet(payload)),
    onTweetEdit: (payload) => dispatch(actions.editTweet(payload)),
    onAddUserIgnore: (payload) => dispatch(actions.addUserIgnore(payload)),
    onDeleteUserIgnore: (payload) => dispatch(actions.deleteUserIgnore(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TweetMenu)
