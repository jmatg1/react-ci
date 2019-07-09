import React from 'react'
import { connect } from 'react-redux'
import { fetchFollowers, fetchFollowing } from '../../../selectors'
import Grid from '@material-ui/core/Grid'
import UserItem from '../../../components/UserItem/UserItem'

const Follow = (props) => {
  const { users } = props

  let renderUsers = []
  users.flatMap(us => {
    renderUsers.push(
      <Grid key={us.id} item xs={3}>
        <UserItem user={us} />
      </Grid>
    )
  })

  return (
    <>
      {renderUsers}
    </>
  )
}

const mapStateToProps = (state, prevProps) => {
  const { pageId, type } = prevProps
  const profileId = state.profile.id
  const id = pageId || profileId

  return {
    users: type === 'followers' ? fetchFollowers(state, id) : fetchFollowing(state, id)
  }
}

export default connect(mapStateToProps)(Follow)
