import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as typeProperty from '../../shared/typeProps'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/styles'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import Link from '../Link/Link'
import { getUser } from '../../selectors/index'

class UserHead extends Component {
  /**
   * Обработка кнопки Подписаться/Отписаться
   */
  handleSubscribe = () => {
    const { user: { id, isSubscribed }, profileId } = this.props
    const data = {
      profileId,
      subscribeId: id,
      isSubscribed
    }
    this.props.onSubscribe(data)
  }
  /**
   * Обработка клика по Добавить твит
   * Открываем диалог для добавления нового твита
   */
  handleAddTweet = () => {
    this.context.openDialog({
      placeholder: 'Текст нового твита',
      title: 'Добавить новый твит',
      inputValue: '',
      callBack: this.addTweet
    })
  }
  /**
   * Создаем новый твит пользователя
   * @param payload {Object}
   */
  addTweet = (payload) => {
    this.props.onAddTweet({
      tweet: {
        id: Math.floor(Math.random() * 10000),
        createUserId: this.props.profileId,
        text: payload.text,
        img: payload.img,
        idVideos: payload.idVideos,
        likes: [],
        commentsId: [],
        dateCreate: new Date().toJSON()
      }
    })
  }

  /**
   * Доавления/Удаления из чс
   * @return {*}
   */
  handleIgnoreList = (type) => {
    const {
      user: { id: userId },
      profileId,
      onAddUserIgnore,
      onDeleteUserIgnore } = this.props
    switch (type) {
      case 'add': return onAddUserIgnore({ profileId, userId })
      case 'remove': return onDeleteUserIgnore({ profileId, userId })
    }
  }

  /**
   * Клик по своей аватарке
   */
  handleChangeAvatar = () => {
    this.context.openDialog({
      placeholder: 'Ссылка на картинку',
      title: 'Изменить аватарку',
      inputValue: '',
      callBack: this.changeAvatar
    })
  }
  /**
   * Принимаем ссылку на картинку, если она есть то изменяем её
   * @param payload {Object}
   */
  changeAvatar = (payload) => {
    const { img } = payload
    const { profileId } = this.props
    if (img.length === 0) return

    this.props.onChangeAvatar({ profileId, url: img[0] })
  }
  render () {
    const {
      user: { name, nickName, following, tweets, followers, isSubscribed, avatar },
      profile: { id: profileId, ignoreList },
      userPageId,
      classes
    } = this.props

    const isMe = userPageId === profileId
    const isUserIgnore = ignoreList.find(igId => igId === userPageId) !== undefined

    return (
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12} style={{ display: 'flex' }}>
              <img className={classes.avatar} src={avatar} alt="Avatar" onClick={ isMe ? this.handleChangeAvatar : null}/>
              <Typography style={{ marginLeft: '25px' }} variant="h3" gutterBottom>
                {name}
                <Typography style={{ fontSize: '20px' }} gutterBottom>@{nickName}</Typography>
              </Typography>
            </Grid>

            <Grid item xs={2}>
              <Link to={`/${userPageId}/tweets`} >
                <Typography paragraph>Твитов</Typography>
                {tweets.length}
              </Link>
            </Grid>
            <Grid item xs={2}>
              <Link to={`/${userPageId}/following`}>
                <Typography paragraph>Читаемые</Typography>
                {following.length}
              </Link>
            </Grid>
            <Grid item xs={2}>
              <Link to={`/${userPageId}/followers`}>
                <Typography paragraph>Читатели</Typography>
                {followers.length}
              </Link>
            </Grid>

            {isMe
              ? <Grid item xs={3}>
                <Button variant="contained" color="primary" className={classes.button} onClick={this.handleAddTweet}>
                  Добавить твит
                </Button>
              </Grid>
              : <>
                <Grid item xs={3}>
                  <Button disabled={isUserIgnore} variant="contained" color="primary" className={classes.button}
                    onClick={this.handleSubscribe}>
                    {isSubscribed ? 'Отписаться' : 'Подписаться'}
                  </Button>
                </Grid>
                { isUserIgnore
                  ? <Grid item xs={3}>
                    <Button variant="contained" color="secondary" className={classes.button} onClick={() => this.handleIgnoreList('remove')}>
                      Удалить из ЧС
                    </Button>
                  </Grid>
                  : <Grid item xs={3}>
                    <Button variant="contained" color="secondary" className={classes.button} onClick={() => this.handleIgnoreList('add')}>
                      Добавить в чс
                    </Button>
                  </Grid>
                }
              </>
            }

          </Grid>
        </Paper>
      </Grid>
    )
  }
}

UserHead.contextTypes = ({
  openDialog: PropTypes.func
})

UserHead.propTypes = {
  userPageId: PropTypes.number.isRequired,
  // redux
  user: typeProperty.user,
  profile: typeProperty.user,
  profileId: PropTypes.number.isRequired,
  onAddTweet: PropTypes.func.isRequired,
  onChangeAvatar: PropTypes.func.isRequired,
  onSubscribe: PropTypes.func.isRequired,
  onAddUserIgnore: PropTypes.func.isRequired,
  onDeleteUserIgnore: PropTypes.func.isRequired
}

const mapStateToProps = (state, prevProps) => {
  return {
    user: getUser(state, prevProps.userPageId),
    profile: getUser(state, state.profile.id),
    profileId: state.profile.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddTweet: (payload) => dispatch(actions.addTweet(payload)),
    onSubscribe: (payload) => dispatch(actions.subscribe(payload)),
    onChangeAvatar: (payload) => dispatch(actions.changeAvatar(payload)),
    onAddUserIgnore: (payload) => dispatch(actions.addUserIgnore(payload)),
    onDeleteUserIgnore: (payload) => dispatch(actions.deleteUserIgnore(payload))
  }
}

const styles = {
  paper: {
    padding: '20px',
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  avatar: {
    width: '128px',
    height: '128px',
    '&:hover': {
      cursor: 'pointer'
    }
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(UserHead))
