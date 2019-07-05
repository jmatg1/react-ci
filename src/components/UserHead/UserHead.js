import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import { connect } from 'react-redux'
import { getUser } from '../../selectors/index'

class UserHead extends Component {
  state = {
    subscribe: false
  }
  /**
   * Обработка кнопки Подписаться/Отписаться
   */
  handleSubscribe = () => {
    //  this.props.onSubscribe(this.state.subscribe)
    //  this.setState({subscribe: false})
  }

  render () {
    const { subscribe } = this.state
    const { pageId = null, user: {id: userId, name, following, tweets, followers }, profileId, userPageId } = this.props

    const isMe = userPageId === profileId

    const classes = {
      paper: {
        padding: '20px',
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column'
      }
    }

    if (!isMe) {
      if (following.find(usId => usId === pageId)) {  // ищем пользователя
        this.setState({ subscribe: true })
      }
    }

    return (
      <Grid item xs={12}>
        <Paper style={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h3" gutterBottom>{name}</Typography>
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

            {isMe ? null : (
              <Grid item xs={3}>
                <Button variant="contained" color="primary" className={classes.button} onClick={this.handleSubscribe}>
                  {subscribe ? 'Отписаться' : 'Подписаться'}
                </Button>
              </Grid>
            )}

          </Grid>
        </Paper>
      </Grid>
    )
  }
}

const mapStateToProps = (state,prevProps) => {
  return {
    user: getUser(state,prevProps),
    profileId: state.profile.id
  }
}

export default connect(mapStateToProps)(UserHead)
