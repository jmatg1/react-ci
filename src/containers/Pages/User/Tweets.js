import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { fetchTweetsUser } from '../../../selectors'
import Content from '../../Content/Content'

const Tweets = (props) => {
  const { tweets } = props
  return <Content tweets={tweets}/>
}

Tweets.propTypes = {
  pageId: PropTypes.number.isRequired,
  // redux
  tweets: PropTypes.array.isRequired
}

const mapStateToProps = (state, prevProps) => {
  const profileId = state.profile.id
  const id = prevProps.pageId ? prevProps.pageId : profileId

  return {
    tweets: fetchTweetsUser(state, id)
  }
}

export default connect(mapStateToProps)(Tweets)
