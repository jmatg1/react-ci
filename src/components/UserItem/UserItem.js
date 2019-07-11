import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as typeProperty from '../../shared/typeProps'
import { withStyles } from '@material-ui/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as actions from '../../store/actions/index'
import { getProfileId } from '../../selectors'

class UserItem extends Component {
  handleRemoveUser = () => {
    const { onDeleteUserIgnore, profileId, user: { id } } = this.props
    onDeleteUserIgnore({ profileId, userId: id })
  }

  shouldComponentUpdate (nextProps, nextState, nextContext) {
    if (nextProps.user.id === this.props.user.id) return false
    return true
  }

  render () {
    const { user: { id, name, nickName, avatar }, ignore = false, classes } = this.props
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={avatar}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name} <br/> <Link to={`/${id}`}>@{nickName}</Link>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {ignore
            ? <Button size="small" color="primary" onClick={this.handleRemoveUser}>
              Удалить из ЧС
            </Button>
            : null
          }
        </CardActions>
      </Card>
    )
  }
}

UserItem.propTypes = {
  ignore: PropTypes.bool,
  user: typeProperty.user,
  // redux
  profileId: PropTypes.number.isRequired,
  onDeleteUserIgnore: PropTypes.func.isRequired
}

const classes = {
  card: {
    maxWidth: 300
  },
  media: {
    height: 300
  }
}

const mapStateToProps = state => {
  return {
    profileId: getProfileId(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDeleteUserIgnore: (payload) => dispatch(actions.deleteUserIgnore(payload))
  }
}
export default withStyles(classes)(connect(mapStateToProps, mapDispatchToProps)(UserItem))
