import React from 'react'
import Grid from '@material-ui/core/Grid'

import { connect } from 'react-redux'
import { fetchIgnoreUsers } from '../../selectors/index'
import UserItem from '../../components/UserItem/UserItem'
import { Typography } from '@material-ui/core'

const Blacklist = (props) => {
  const { users } = props

  if (Object.keys(users).length === 0) return (
    <Grid container spacing={4}>
      <Typography variant="h3">Пусто</Typography>
    </Grid>
  )

  let usersRender = []
  for (let k in users) {
    usersRender.push(<Grid key={k} item xs={3}>
      <UserItem user={users[k]} />
    </Grid>)
  }

  return (

    <Grid container spacing={4}>
      {usersRender}
    </Grid>
  )
}

const mapStateToProps = state => {
  const profileId = state.profile.id
  return {
    users: fetchIgnoreUsers(state),
    profileId: profileId
  }
}

export default connect(mapStateToProps)(Blacklist)
