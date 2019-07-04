import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles/index';
import TextField from '@material-ui/core/TextField/index';
import Button from '@material-ui/core/Button/index'

import { connect } from 'react-redux'

import * as actions from '../../store/actions'

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: 0,
  }
}));
const SubmitComment = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  const handleChange = event => {
    setValue(event.target.value)
  };

  const sendComment = ev => {
    const { tweetId, profileId } = props
    ev.preventDefault()
    const comment = {
      id: Math.floor(Math.random()*10000),
      createUserId: profileId,
      text: value,
      dateCreate: new Date().toJSON()
    }
   props.onAddComment({ tweetId, comment })

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

const mapStateToProps = state => {
  return {
    profileId: state.profile.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddComment: (payload) => dispatch(actions.addComment(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitComment)
