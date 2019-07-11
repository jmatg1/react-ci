import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import Draw from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import { makeStyles } from '@material-ui/core'

import { mainListItems } from '../listItems'

const Drawer = (props) => {
  const classes = useStyles()
  const { open, handleDrawerClose } = props
  return (
    <Draw
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon/>
        </IconButton>
      </div>
      <Divider/>
      <List>{mainListItems}</List>
    </Draw>
  )
}

Drawer.propTypes = {
  handleDrawerClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
}

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9)
    }
  }
}))

export default Drawer
