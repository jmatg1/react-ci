import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'

const Link = (props) => {
  const { children, to } = props

  const handleClickLink = (ev) => {
    ev.preventDefault()
    if (props.location.pathname === to) return true
    props.history.push(to)
  }
  return (
    <NavLink to={to} onClick={handleClickLink}   activeStyle={{
      fontWeight: "bold",
      color: "red"
    }}>
      {children}
    </NavLink>
  )
}

export default withRouter(Link)
