import React from 'react'
import clsx from 'clsx'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}))



const UserHead = () => {
  const classes = useStyles()
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
  return (
    <Grid item xs={12}>
      <Paper className={fixedHeightPaper}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h3" gutterBottom>Имя</Typography>
          </Grid>

          <Grid item xs={3}>
            <Typography paragraph>Твиты</Typography>
            2
          </Grid>
          <Grid item xs={3}>
            <Typography paragraph>Читаемые</Typography>
            15
          </Grid>
          <Grid item xs={3}>
            <Typography paragraph>Читатели</Typography>
            15
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" color="primary" className={classes.button}>
              Подписаться/Отписаться
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default UserHead
