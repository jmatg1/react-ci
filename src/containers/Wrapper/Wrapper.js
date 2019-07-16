import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import { Switch, Route } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Drawer from '../../components/Drawer/Drawer'
import Feed from '../../containers/Pages/Feed'
import User from '../../containers/Pages/User/User'
import Blacklist from '../../containers/Pages/Blacklist'
import Search from '../../containers/Pages/Search'

export default function Wrapper () {
  const classes = useStyles()
  const [open, setOpen] = React.useState(true)
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <CssBaseline/>
      <Header open={open} handleOpen={handleDrawerOpen}/>
      <Drawer open={open} handleDrawerClose={handleDrawerClose}/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer}/>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>

            <Switch>
              <Route path="/search" component={Search}/>
              <Route path="/feed" component={Feed}/>
              <Route path="/blacklist" component={Blacklist}/>
              <Route path="/:id" component={User}/>
              <Route path="/" component={User}/>
            </Switch>

          </Grid>
        </Container>
      </main>
    </div>
  )
}

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {
    height: 240
  }
}))
