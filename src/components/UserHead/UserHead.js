import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import { connect } from 'react-redux'
import { getUser } from '../../selectors/index'
import * as actions from '../../store/actions/index'

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
      data: {},
      callBack: this.addTweet
    })
  }
  /**
   * Создаем новый твит пользователя
   * @param text - текст твитта
   */
  addTweet = (text) => {
    this.props.onAddTweet({
      id: Math.floor(Math.random() * 10000),
      createUserId: this.props.profileId,
      text: text,
      likes: [],
      commentsId: [],
      dateCreate: new Date().toJSON()
    })
  }
  render () {
    const {
      user: { name, following, tweets, followers, isSubscribed, avatar },
      profileId,
      userPageId } = this.props

    const isMe = userPageId === profileId

    const classes = {
      paper: {
        padding: '20px',
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column'
      }
    }

    return (
      <Grid item xs={12}>
        <Paper style={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12} style={{display: 'flex'}}>
              <img src={avatar} alt="Avatar"/>
              <Typography style={{marginLeft: '25px'}} variant="h3" gutterBottom>{name}</Typography>
            </Grid>

            <Grid item xs={3}>
              <Typography paragraph>Твитов</Typography>
              {tweets.length}
            </Grid>
            <Grid item xs={3}>
              <Typography paragraph>Читаемые</Typography>
              {following.length}
            </Grid>
            <Grid item xs={3}>
              <Typography paragraph>Читатели</Typography>
              {followers.length}
            </Grid>

            {isMe
              ? <Grid item xs={3}>
                <Button variant="contained" color="primary" className={classes.button} onClick={this.handleAddTweet}>
                  Добавить твит
                </Button>
              </Grid>
              : <Grid item xs={3}>
                <Button variant="contained" color="primary" className={classes.button} onClick={this.handleSubscribe}>
                  {isSubscribed ? 'Отписаться' : 'Подписаться'}
                </Button>
              </Grid>
            }

          </Grid>
        </Paper>
      </Grid>
    )
  }
}

const mapStateToProps = (state, prevProps) => {
  return {
    user: getUser(state, prevProps.userPageId),
    profileId: state.profile.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddTweet: (tweet) => dispatch(actions.addTweet(tweet)),
    onSubscribe: (payload) => dispatch(actions.subscribe(payload))
  }
}
UserHead.contextTypes = ({
  openDialog: PropTypes.func
})
export default connect(mapStateToProps, mapDispatchToProps)(UserHead)
