import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'

import { connect } from 'react-redux'

import { fetchComments } from '../../selectors/index'
import SubmitComment from '../CommentSubmit/CommentSubmit'
import Moment from 'react-moment'

const CommentList = (props) => {
  console.log('CommentList render')
  const { comments, tweetId } = props

  const classes = useStyles()

  const commentArray = comments.map((cm, i) => {
    const author = <>
      {cm.user.name}
      <span className={classes.mark}>
        id{cm.user.id}
      </span>
    </>
    return (
      <ListItem key={i} alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={cm.user.avatar} />
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
                {cm.comment.text}
              </Typography>
              <Typography
                component={'br'}/>
              <Typography
                component={'span'}
                variant={'body2'}>
                <Moment locale="ru" fromNow>{cm.comment.dateCreate}</Moment>
              </Typography>
            </>
          }
        />
      </ListItem>
    )
  })

  return (
    <>
      <SubmitComment tweetId={tweetId}/>
      <List component='ul' className={classes.root}>
        {commentArray}
      </List>
    </>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline'
  },
  mark: {
    fontSize: '12px',
    color: 'rgba(0, 0, 0, 0.54)'
  }
}))

const mapStateToProps = (state, prevProps) => {
  console.log('CommentList connect')

  return {
    comments: fetchComments(state, prevProps)
  }
}

export default connect(mapStateToProps)(CommentList)
