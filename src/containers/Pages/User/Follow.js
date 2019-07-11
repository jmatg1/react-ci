import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'

import { connect } from 'react-redux'
import { fetchFollowers, fetchFollowing } from '../../../selectors'
import UserItem from '../../../components/UserItem/UserItem'

const Follow = (props) => {
  const { users } = props

  return users.map(us => (
    <Grid key={us.id} item xs={3}>
      <UserItem user={us} />
    </Grid>
  ))
}

Follow.propTypes = {
  pageId: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  // redux
  users: PropTypes.array.isRequired
}

const mapStateToProps = (state, prevProps) => {
  const { pageId, type } = prevProps
  const id = pageId || state.profile.id

  return {
    users: type === 'followers' ? fetchFollowers(state, id) : fetchFollowing(state, id)
  }
}

export default connect(mapStateToProps)(Follow)
