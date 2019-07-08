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
import { withStyles } from '@material-ui/styles'

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import 'moment/locale/ru'
import * as actions from '../../store/actions/index'

import CommentList from '../../components/CommentList/CommentList'
import TweetMenu from '../TweetMenu/TweetMenu'

export class Tweet extends Component {
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
  render () {
    console.log('render tweet')
    const { tweet: { id: tweetId, text, dateCreate, likes, isFavorite, createUserId }, user: { name, avatar }, classes } = this.props
    const { expanded } = this.state

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar src={avatar}  alt="Remy Sharp" className={classes.avatar}>name[0]</Avatar>
          }
          action={
            <TweetMenu tweet={this.props.tweet}/>

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

const mapStateToProps = (state, prevProps) => {

  return {
    profileId: state.profile.id,
    user: state.users.get(prevProps.tweet.createUserId).toJS()
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
