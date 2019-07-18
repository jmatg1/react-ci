import React, { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import InputBase from '@material-ui/core/InputBase'
import { fade, makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'

const Header = (props) => {
  const classes = useStyles()
  const { open, handleOpen } = props
  const [query, setQuery] = useState('')

  const handleSubmitSearch = (ev) => {
    ev.preventDefault()
    sendQuery()
  }
  const handleChangeQuery = (ev) => {
    setQuery(ev.target.value)
    sendQuery(ev.target.value)
  }
  const sendQuery = (queryText = query) => {
    if (props.location.search === '') {
      props.history.push(`search?query=${queryText}`)
      return
    }
    const url = new URLSearchParams(props.location.search)

    for (let param of url.entries()) {
      if (param[0] === 'query' && param[1] !== queryText) {
        props.onQuerySet({ query: queryText })
        props.history.push(`search?query=${queryText}`)
        return
      }
    }
  }
  return (
    <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="Open drawer"
          onClick={handleOpen}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <MenuIcon/>
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          Twitter React App
        </Typography>
        <form onSubmit={handleSubmitSearch} className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            inputProps={{ 'aria-label': 'Search' }}
            onChange={handleChangeQuery}
            value={query}
          />
        </form>
      </Toolbar>
    </AppBar>
  )
}

Header.propTypes = {
  open: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired
}

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  toolbar: {
    addingRight: 24 // keep right padding when drawer closed
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1
  },
  inputRoot: {
    color: 'inherit'
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  }

}))

const mapDispatchToProps = dispatch => {
  return {
    onQuerySet: (payload) => dispatch(actions.setQuery(payload))
  }
}

export default connect(null, mapDispatchToProps)(withRouter(Header))
