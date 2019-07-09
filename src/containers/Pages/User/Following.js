import React from 'react'
import { connect } from 'react-redux'
import { fetchFollowing } from '../../../selectors'
import Grid from '@material-ui/core/Grid'
import UserItem from '../../../components/UserItem/UserItem'

const Following = (props) => {
  const { users } = props

  let renderUsers = []
  users.flatMap(us => {
    console.log(us)
    renderUsers.push(
      <Grid key={us.id} item xs={3}>
        <UserItem  user={us} />
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
  const profileId = state.profile.id
  const id  =  prevProps.pageId ? prevProps.pageId : profileId


  return{
    users: fetchFollowing(state,id)
  }
}

export default connect(mapStateToProps)(Following)
