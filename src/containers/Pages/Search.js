import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import { fetchSearchUsersTweet, test } from '../../selectors/index'
import Grid from '@material-ui/core/Grid'
import Tweet from '../../components/Tweet/Tweet'

class Search extends Component {
  componentDidMount () {
    this.getQuery()
  }
   getQuery = () => {
     const query = new URLSearchParams(this.props.location.search)
     for (let param of query.entries()) {
       if (param[0] === 'query') {
         this.props.onQuerySet({ query: param[1] })
       }
     }
   }
   render () {
     console.log('render seach')

     const renderTwits = this.props.tweets.map(tw => (
       <Grid key={tw.id} item xs={4}>
         <Tweet tweet={tw}/>
       </Grid>
     ))
     return (<>
       <Grid>
         <h1>Search: {this.props.query}</h1>
       </Grid>
       <Grid container spacing={4}>
         {renderTwits}
       </Grid>
     </>
     )
   }
}

Search.propTypes = {

}

const mapStateToProps = (state, prevProps) => {
  console.log(prevProps)
  return {
    tweets: fetchSearchUsersTweet(state, prevProps),
    query: state.profile.query,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onQuerySet: (payload) => dispatch(actions.setQuery(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
