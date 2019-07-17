import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'

import { connect } from 'react-redux'
import { fetchComments } from '../../selectors/index'
import SubmitComment from '../CommentSubmit/CommentSubmit'
import CommentItem from '../CommentItem/CommentItem'

const CommentList = (props) => {
  console.log('CommentList render')
  const { comments, tweetId } = props

  const classes = useStyles()

  const commentArray = comments.map((cm, i) => {
    if (cm.isIgnore) { // если пользоваетль игнорируется
      return (
        <span key={i} className={classes.mark}>
          {cm.user.name} @{cm.user.nickName} заблокирован
        </span>
      )
    }
    return <CommentItem key={i} tweetId={tweetId} isMy={cm.isMy} user={cm.user} comment={cm.comment}/>
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

CommentList.propTypes = {
  tweetId: PropTypes.number.isRequired,
  // redux
  comments: PropTypes.array.isRequired
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper
  }
}))

const mapStateToProps = (state, prevProps) => {

  return {
    comments: fetchComments(state, prevProps)
  }
}

export default connect(mapStateToProps)(CommentList)
