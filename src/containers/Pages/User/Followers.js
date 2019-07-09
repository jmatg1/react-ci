import React from 'react'
import { connect } from 'react-redux'
import { fetchFollowers } from '../../../selectors'
import Grid from '@material-ui/core/Grid'
import UserItem from '../../../components/UserItem/UserItem'

const Followers = (props) => {
  const { users } = props

  let renderUsers = []
  users.flatMap(us => {
    console.log('ollowers', us)
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
  console.log('connect followers')

  const profileId = state.profile.id
  const id = prevProps.pageId ? prevProps.pageId : profileId

  return {
    users: fetchFollowers(state, id)
  }
}

export default connect(mapStateToProps)(Followers)
