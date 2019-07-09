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

    <ListItem button component={Link} to="/feed">
      <ListItemIcon>
        <PeopleIcon/>
      </ListItemIcon>
      <ListItemText primary="Рекомендации"/>
    </ListItem>

    <ListItem button component={Link} to="/tweets/:id">
      <ListItemIcon>
        <PeopleIcon/>
      </ListItemIcon>
      <ListItemText primary="Твиты"/>
    </ListItem>

    <ListItem button component={Link} to="/following">
      <ListItemIcon>
        <PeopleIcon/>
      </ListItemIcon>
      <ListItemText primary="Читаемые"/>
    </ListItem>

    <ListItem button component={Link} to="/followers">
      <ListItemIcon>
        <PeopleIcon/>
      </ListItemIcon>
      <ListItemText primary="Читатели"/>
    </ListItem>

    <ListItem button component={Link} to="/blacklist">
      <ListItemIcon>
        <PeopleIcon/>
      </ListItemIcon>
      <ListItemText primary="Черный список"/>
    </ListItem>

  </div>
)
