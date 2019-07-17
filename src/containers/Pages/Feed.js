import React from 'react'

import { connect } from 'react-redux'
import { fetchTweetFeed } from '../../selectors/index'
import Content from '../Content/Content'

const Feed = (props) => {
  return (
    <Content tweets={props.tweets}/>
  )
}

const mapStateToProps = state => {
  return {
    tweets: fetchTweetFeed(state)
  }
}

export default connect(mapStateToProps)(Feed)
