import React, { Component } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { withStyles } from '@material-ui/styles'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import 'moment/locale/ru'
import * as actions from '../../store/actions/index'

import CommentList from '../../components/CommentList/CommentList'
import { getProfileId, getUser } from '../../selectors'

export class Tweet extends Component {
  state = {
    expanded: false
  }
  shouldComponentUpdate (nextProps, nextState) {
    const { tweet: { text, likes } } = this.props
    const { text: prText, likes: prLikes } = nextProps.tweet

    if (likes.length === prLikes.length & text === prText & this.state.expanded === nextState.expanded) return false
    return true
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
  /**
   * Клик по сердечку
   * Добавить/Удалить в/из избранного
   */
  handleClickFavorite = () => {
    this.props.onChangeFavoriteTweet({
      tweetId: this.props.tweet.id,
      isFavorite: !this.props.tweet.isFavorite,
      profileId: this.props.profileId
    })
  }

  handleTweetMenuOpen = (event) => {
    this.context.openTweetMenu({
      tweet: this.props.tweet,
      tweetMenuEl: event.currentTarget
    })
  }
  render () {
    console.log('render tweet')
    const { tweet: { id: tweetId, text, dateCreate, likes, isFavorite, createUserId }, user: { name, avatar }, classes } = this.props
    const { expanded } = this.state

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar src={avatar} alt="Remy Sharp" className={classes.avatar}>name[0]</Avatar>
          }
          action={
            <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleTweetMenuOpen}>
              <MoreVertIcon/>
            </IconButton>
          }
          title=<Link to={`/${createUserId}`}>{name}</Link>
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
            <CommentList tweetId={tweetId} />
          </CardContent>
        </Collapse>
      </Card>
    )
  }
}

Tweet.contextTypes = ({
  openTweetMenu: PropTypes.func
})

const mapStateToProps = (state, prevProps) => {
  console.log('Tweet connect')

  return {
    profileId: getProfileId(state),
    user: getUser(state, prevProps.tweet.createUserId)
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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Tweet))
