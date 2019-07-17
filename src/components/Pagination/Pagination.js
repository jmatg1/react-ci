import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactPaginate from 'react-paginate'
import './styles.css'

export default class Paginations extends Component {
  static propTypes = {
    author: PropTypes.string.isRequired,
    perPage: PropTypes.number.isRequired
  };

  constructor (props) {
    super(props)

    this.state = {
      offset: 0,
      pageCount: 50,  // кол-во страниц

    }
  }


  handlePageClick = data => {
    let selected = data.selected
    let offset = Math.ceil(selected * this.props.perPage)
  };

  render () {
    return (
        <ReactPaginate
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
        />
    )
  }
}
