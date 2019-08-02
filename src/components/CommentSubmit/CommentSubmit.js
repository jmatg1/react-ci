import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles/index'
import TextField from '@material-ui/core/TextField/index'
import Button from '@material-ui/core/Button/index'

import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import { getProfileId } from '../../selectors/index'

const SubmitComment = (props) => {
  const { replyComment = null, replyUser = null } = props
  const classes = useStyles()
  const [value, setValue] = React.useState('')

  useEffect(() => {
    if (!replyUser) return
    setValue(`${replyUser.nickName}, `)
  }, [replyComment, replyUser])

  const handleChange = event => {
    setValue(event.target.value)
  }

  const sendComment = ev => {
    if (value.trim().length === 0) return
    const { tweetId, profileId } = props
    ev.preventDefault()
    const comment = {
      id: Math.floor(Math.random() * 10000),
      createUserId: profileId,
      text: value,
      dateCreate: new Date().toJSON(),
      reply: replyComment ? replyComment.id : null
    }
    props.onAddComment({ tweetId, comment })
    setValue('')
  }

  return (
    <form onSubmit={sendComment}>
      <TextField
        id="outlined-dense-multiline"
        label="Добавить комментарий"
        className={clsx(classes.textField, classes.dense)}
        margin="dense"
        variant="outlined"
        multiline
        rowsMax="4"
        value={value}
        onChange={handleChange}
      />
      <Button variant="contained" color="primary" onClick={sendComment}>
        Отправить
      </Button>
    </form>
  )
}

SubmitComment.propTypes = {
  tweetId: PropTypes.number.isRequired,
  replyComment: PropTypes.object,
  replyUser: PropTypes.object,
  // redux
  profileId: PropTypes.number.isRequired,
  onAddComment: PropTypes.func.isRequired
}

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: 0
  }
}))

const mapStateToProps = state => {
  return {
    profileId: getProfileId(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddComment: (payload) => dispatch(actions.addComment(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitComment)
