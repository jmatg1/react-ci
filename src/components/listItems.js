import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DashboardIcon from '@material-ui/icons/Dashboard'
import PeopleIcon from '@material-ui/icons/People'

import { Link } from 'react-router-dom'

export const mainListItems = (
  <div>
    <ListItem button component={Link} to="/">
      <ListItemIcon>
        <DashboardIcon/>
      </ListItemIcon>
      <ListItemText primary="Главная"/>
    </ListItem>

    <ListItem button component={Link} to="/food">
      <ListItemIcon>
        <PeopleIcon/>
      </ListItemIcon>
      <ListItemText primary="Рекомендации"/>
    </ListItem>
  </div>
)

export const secondaryListItems = (
  <div>
    {/*<ListSubheader inset>Saved reports</ListSubheader>*/}
    {/*<ListItem button>*/}
    {/*  <ListItemIcon>*/}
    {/*    <AssignmentIcon />*/}
    {/*  </ListItemIcon>*/}
    {/*  <ListItemText primary="Current month" />*/}
    {/*</ListItem>*/}
  </div>
)
