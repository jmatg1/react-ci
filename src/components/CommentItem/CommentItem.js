import React from 'react'
import PropTypes from 'prop-types'
import * as typeProperty from '../../shared/typeProps'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import Moment from 'react-moment'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

const CommentItem = (props) => {
  const { comment, user, isMy, tweetId } = props
  const classes = useStyles()

  const author = (
    <>
      {user.name}
      <span className={classes.mark}>@{user.nickName}</span>
    </>
  )

  const handleClickDeleteIcon = () => {
    props.onDeleteComment({ commentId: comment.id, tweetId })
  }

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src={user.avatar} />
      </ListItemAvatar>
      <ListItemText
        primary={author}
        secondary={
          <>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              {comment.text}
            </Typography>
            <Typography
              component={'br'}/>
            <Typography
              component={'span'}
              variant={'body2'}>
              <Moment locale="ru" fromNow>{comment.dateCreate}</Moment>
            </Typography>
          </>
        }
      />

      { isMy
        ? <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClickDeleteIcon} >
          <DeleteIcon/>
        </IconButton>
        : null}

    </ListItem>
  )
}

CommentItem.propTypes = {
  comment: typeProperty.comment,
  user: typeProperty.user,
  isMy: PropTypes.bool.isRequired,
  tweetId: PropTypes.number.isRequired,
  // redux
  onDeleteComment: PropTypes.func.isRequired
}

const useStyles = makeStyles(theme => ({
  inline: {
    display: 'inline'
  },
  mark: {
    fontSize: '12px',
    color: 'rgba(0, 0, 0, 0.54)'
  }
}))

const mapDispatchToProps = dispatch => {
  return {
    onDeleteComment: (payload) => dispatch(actions.deleteComment(payload))
  }
}

export default connect(null, mapDispatchToProps)(CommentItem)
