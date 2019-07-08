import React from 'react';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default function UserItem(props) {
  const classes = useStyles();
  const { user: { id, name, nickName, avatar} } = props

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
        <Button size="small" color="primary">
          Удалить из ЧС
        </Button>
      </CardActions>
    </Card>
  );
}

const useStyles = makeStyles({
  card: {
    maxWidth: 300,
  },
  media: {
    height: 300,
  },
});
