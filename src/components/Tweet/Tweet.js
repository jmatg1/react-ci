import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { withStyles } from '@material-ui/styles';

import { connect } from 'react-redux'
import Moment from 'react-moment'
import 'moment/locale/ru'


class Tweet extends Component {
  state = {
    expanded: false
  }


  handleExpandClick = () => {
    this.setState(prevState => ({
        expanded: !prevState.expanded
      })
    )
  }

  render () {
    console.log('render TWEET')
    const  {tweet: {text, dateCreate, likes}, user: {name}, classes}  = this.props
    const {expanded} = this.state

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              {name[0]}
            </Avatar>
          }
          action={
            <IconButton aria-label="Settings">
              <MoreVertIcon/>
            </IconButton>
          }
          title={name}
          subheader={<Moment locale="ru" fromNow>{dateCreate}</Moment>}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon color="secondary"/>
            {likes.length}
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon/>
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon/>
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Комментарии:</Typography>

          </CardContent>
        </Collapse>
      </Card>
    )
  }
}

const mapStateToProps = (state, prevProps) => {

  return {
    user: state.users.get(String(prevProps.tweet.createUserId))
  }
}


const styles = {
  card: {
    maxWidth: '100%'
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: 'transform 0.5s linear'
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  }
}

export default withStyles(styles)(connect(mapStateToProps)(Tweet))

