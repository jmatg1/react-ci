import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'

import { connect } from 'react-redux'
import { fetchIgnoreUsers, getProfileId } from '../../selectors/index'
import UserItem from '../../components/UserItem/UserItem'

const Blacklist = (props) => {
  const { users } = props

  if (users.length === 0) { // если нет игнорируемых пользователей
    return (
      <Grid container spacing={4}>
        <Typography variant="h3">Пусто</Typography>
      </Grid>
    )
  }

  const usersRender = users.map(us => (
    <Grid key={us.id} item xs={3}>
      <UserItem user={us} ignore />
    </Grid>
  ))

  return (

    <Grid container spacing={4}>
      {usersRender}
    </Grid>
  )
}

Blacklist.propTypes = {
  // redux
  users: PropTypes.array.isRequired,
  profileId: PropTypes.number.isRequired
}

const mapStateToProps = state => {
  return {
    users: fetchIgnoreUsers(state),
    profileId: getProfileId(state)
  }
}

export default connect(mapStateToProps)(Blacklist)
