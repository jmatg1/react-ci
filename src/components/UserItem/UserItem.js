import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import * as actions from '../../store/actions/index'

function UserItem (props) {
  const classes = useStyles()
  const { user: { id, name, nickName, avatar }, onRemoveUserIgnore, profileId, ignore = false } = props
  const handleRemoveUser = () => {
    onRemoveUserIgnore(profileId, id)
  }
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={avatar}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name} <br/> <Link to={`/${id}`}>@{nickName}</Link>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {ignore
          ? <Button size="small" color="primary" onClick={handleRemoveUser}>
            Удалить из ЧС
          </Button>
          : null
        }
      </CardActions>
    </Card>
  )
}

const useStyles = makeStyles({
  card: {
    maxWidth: 300
  },
  media: {
    height: 300
  }
})

const mapStateToProps = state => {
  return {
    profileId: state.profile.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRemoveUserIgnore: (profileId, userId) => dispatch(actions.removeUserIgnore(profileId, userId))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserItem)
