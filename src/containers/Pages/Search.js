import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import { fetchSearchUsersTweet } from '../../selectors/index'
import Grid from '@material-ui/core/Grid'
import Content from '../Content/Content'

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
     const { tweets } = this.props
     return (<>
       <Grid>
         <h1>Search: {this.props.query}</h1>
       </Grid>
       <Content tweets={tweets}/>
     </>
     )
   }
}

Search.propTypes = {
  // redux
  tweets: PropTypes.array.isRequired,
  query: PropTypes.string.isRequired,
  onQuerySet: PropTypes.func.isRequired
}

const mapStateToProps = (state, prevProps) => {
  return {
    tweets: fetchSearchUsersTweet(state, prevProps),
    query: state.profile.query
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onQuerySet: (payload) => dispatch(actions.setQuery(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
