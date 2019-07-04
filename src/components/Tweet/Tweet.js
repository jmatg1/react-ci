import React, { Component } from 'react'
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
import { withStyles } from '@material-ui/styles'

import { connect } from 'react-redux'
import Moment from 'react-moment'
import 'moment/locale/ru'
import * as actions from '../../store/actions/index'
class Tweet extends Component {
  state = {
    expanded: false
  }

  /**
   * Обработка по стрелочки вниз
   * Открывает, закрывает список комментариев
   */
  handleExpandClick = () => {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    })
    )
  }
  handleClickFavorite = () => {
    this.props.onChangeFavoriteTweet({
      TweetId: this.props.tweet.id,
      isFavorite: !this.props.tweet.isFavorite,
      profileId: this.props.profileId
    })
  }
  render () {
    console.log('render TWEET', this.props.tweet)
    const { tweet: { text, dateCreate, likes, isFavorite }, user: { name }, classes } = this.props
    const { expanded } = this.state

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
          <IconButton aria-label="Add to favorites" onClick={this.handleClickFavorite}>
            <FavoriteIcon color={isFavorite ? 'secondary' : 'primary'}/>
            <span className={classes.count}>{likes.length}</span>
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

const mapStateToProps = (state,prevProps) => {

  return {
    profileId: state.profile.toJS().id,
    user: state.users.get(String(prevProps.tweet.createUserId))
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeFavoriteTweet: (payload) => dispatch(actions.changeFavoriteTweet(payload))
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
  },
  count: {
    fontSize: '16px',
    marginLeft: '5px'
  }
}

export default withStyles(styles)(connect(mapStateToProps,mapDispatchToProps)(Tweet))
