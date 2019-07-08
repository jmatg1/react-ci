import React, { useContext } from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import PopupsContext from '../../contexts'

const TweetMenu = (props) => {
  const { tweet, tweet: { createUserId, text }, profileId, onTweetRemove, onAddUserIgnore } = props
  const [tweetMenuEl, setAnchorEl] = React.useState(null)
  const popupsContext = useContext(PopupsContext)

  const isMyTweet = createUserId === profileId

  const handleTweetMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleTweetMenuSelect = (type) => {
    setAnchorEl(null)
    switch (type) {
    case 'remove':
      return tweetRemoveOrIgnore()
    case 'edit':
      return handleDialogOpen()
    default:
      return null
    }
  }

  const handleTweetMenuClose = () => {
    setAnchorEl(null)
  }

  // ----
  /**
   * Клик по редактировать твит
   * Открывает диалог для редактирование твита
   */
  const handleDialogOpen = () => {
    popupsContext.openDialog({
      placeholder: 'Текст твита',
      title: 'Изменить твит',
      inputValue: text,
      callBack: handleDialogSave
    })
  }
  /**
   * Клик по сохранить отредактированный текст твита
   * @param text
   */
  const handleDialogSave = (text) => {
    const { tweet: { id }, onTweetEdit } = props
    onTweetEdit(id, text)
  }
  /**
   * Обработка клика по удалить твит
   * Если это собственный твит пользователя, то удаляем его
   * Если другого, то добавляем пользователя в ЧС
   */
  const tweetRemoveOrIgnore = () => {
    if (isMyTweet) {
      onTweetRemove(tweet) // удаляем твит из базы и из списка твитов пользователя
    } else { // добавляем в игнор пользователя
      onAddUserIgnore(tweet, profileId)
    }
  }
  return (
    <>
      <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleTweetMenuOpen}>
        <MoreVertIcon/>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={tweetMenuEl}
        keepMounted
        open={Boolean(tweetMenuEl)}
        onClose={handleTweetMenuClose}
      >
        <MenuItem
          onClick={() => handleTweetMenuSelect('remove')}>{isMyTweet ? 'Удалить' : 'Игнорировать пользователя'}</MenuItem>
        {isMyTweet ? <MenuItem onClick={() => handleTweetMenuSelect('edit')}>Редактировать</MenuItem> : null }
      </Menu>
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    onTweetRemove: (tweet) => dispatch(actions.tweetRemove(tweet)),
    onAddUserIgnore: (tweet, profileId) => dispatch(actions.addUserIgnore(tweet, profileId)),
    onTweetEdit: (id, text) => dispatch(actions.tweetEdit(id, text))
  }
}

export default connect(
  (state) => ({ profileId: state.profile.id })
  , mapDispatchToProps
)(TweetMenu)
