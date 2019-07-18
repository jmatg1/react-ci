import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Tweet from '../../components/Tweet/Tweet'
import UserItem from '../../components/UserItem/UserItem'
import ReactPaginate from 'react-paginate'
import _ from 'lodash'
import './styles.css'
/**
 * ignore - если ложь, то нет возможности удалить из ЧС
 */
class Content extends Component {
  state = {
    pageCount: 0,
    pageActive: 0,
    showItem: 12,
    tweetsPag: [],
    usersPag: []
  }

  componentDidMount () {
    this.filterItems()
  }
  componentDidUpdate (prevProps, prevState, snapshot) {
    if (!_.isEqual(prevProps.tweets, this.props.tweets) || !_.isEqual(prevProps.users, this.props.users)) {
      this.filterItems()
    }
  }

  filterItems = () => {
    const { tweets = null, users = null } = this.props
    const { showItem } = this.state
    let pageCount = 0; let tweetsPag = []; let usersPag = []

    if (tweets) {
      pageCount = Math.ceil(tweets.length / showItem) // кол-во страниц
      tweetsPag = this.subArray(tweets, showItem) // массив из массив разделенных по страницам
    }

    if (users) {
      pageCount = Math.ceil(users.length / showItem)
      usersPag = this.subArray(users, showItem)
    }

    this.setState({ pageCount, tweetsPag, usersPag, pageActive: 0 })
  }
  subArray = (array, size) => {
    let subarray = [] // массив в который будет выведен результат.
    for (let i = 0; i < Math.ceil(array.length / size); i++) {
      subarray[i] = array.slice((i * size), (i * size) + size)
    }
    return subarray
  }
  handlePageClick = (data) => {
    this.setState({ pageActive: data.selected })
  }

  render () {
    const { tweetsPag, usersPag, pageActive, pageCount } = this.state
    const { ignore = false } = this.props

    let tweets = []
    let users = []

    let render = null

    if (tweetsPag.length) {
      tweets = tweetsPag[pageActive]
      const renderTwits = tweets.map(tw => (
        <Grid key={tw.id} item xs={4}>
          <Tweet tweet={tw}/>
        </Grid>
      ))
      render = <Grid container spacing={3}>
        {renderTwits}
      </Grid>
    }
    if (usersPag.length) {
      users = usersPag[pageActive]
      const renderUsers = users.map(us => (
        <Grid key={us.id} item xs={3}>
          <UserItem user={us} ignore={ignore}/>
        </Grid>
      ))
      render = <Grid container spacing={4}>
        {renderUsers}
      </Grid>
    }

    return (
      <>
        {render}
        { pageCount > 1
          ? <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={4}
            pageRangeDisplayed={4}
            onPageChange={this.handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          /> : null }
      </>)
  }
}

Content.propTypes = {
  tweets: PropTypes.array,
  users: PropTypes.array,
  ignore: PropTypes.bool
}

export default Content
