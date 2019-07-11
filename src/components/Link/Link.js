import React from 'react'
import PropTypes from 'prop-types'

import { NavLink, withRouter } from 'react-router-dom'

const Link = (props) => {
  const { children, to } = props

  const handleClickLink = (ev) => {
    ev.preventDefault()
    if (props.location.pathname === to) return true
    props.history.push(to)
  }
  return (
    <NavLink to={to} onClick={handleClickLink} activeStyle={{
      fontWeight: 'bold',
      color: 'red'
    }}>
      {children}
    </NavLink>
  )
}
Link.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired
}

export default withRouter(Link)
