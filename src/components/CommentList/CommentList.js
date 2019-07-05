import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'

import { connect } from 'react-redux'

import { fetchComments } from '../../selectors/index'
import SubmitComment from '../CommentSubmit/CommentSubmit'
import Moment from 'react-moment'

const CommentList = (props) => {
  const { comments, tweetId } = props
  console.log('render CommentList')

  const classes = useStyles()
  let commentArray = []

  if (comments.length === 0) return <Typography>Нет комментариев</Typography>

  comments.map((cm, i) => {
    const author = <>
      {cm.user.name}
      <span className={classes.mark}>
        id{cm.user.id}
      </span>
    </>
    commentArray.push(
      <ListItem key={i} alignItems="flex-start">
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
              <Typography component={'br'}/>
              <Typography component={'span'}
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
    <List className={classes.root}>
      <SubmitComment tweetId={tweetId}/>
      {commentArray}
    </List>
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
  const { users, comments, tweets } = state
  const { tweetId } = prevProps

  return {
    comments: fetchComments(tweetId, users, comments, tweets)
  }
}

export default connect(mapStateToProps)(CommentList)
