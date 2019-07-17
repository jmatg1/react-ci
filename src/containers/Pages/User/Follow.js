import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { fetchFollowers, fetchFollowing } from '../../../selectors'
import Content from '../../Content/Content'

const Follow = (props) => {
  const { users } = props

  return (<Content users={users}/>)
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
