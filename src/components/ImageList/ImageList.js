import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import ImageLoader from 'react-loading-image'
import Spinner from '../Spinner/Spinner'

const ImagesList = (props) => {
  const { images, handleDelete = null, classes } = props
  const uploadImageFail = (i) => {
    if (handleDelete) {
      alert('Неудалось загрузить картинку')
      handleDelete(i, 'img')
    }
    return null
  }
  return (
    <GridList cellHeight={200} className={classes.gridList} cols={2}>
      {images.map((url, i) => (
        <GridListTile key={i} cols={1}>
          {handleDelete
            ? <IconButton className={classes.btn} onClick={() => handleDelete(i, 'img')}>
              <DeleteIcon color="secondary"/>
            </IconButton>
            : null
          }
          <ImageLoader
            className={classes.img}
            src={url}
            loading={() => <Spinner/>}
            error={() => uploadImageFail(i)}
          />
        </GridListTile>
      ))}
    </GridList>
  )
}

ImagesList.propTypes = {
  images: PropTypes.array.isRequired,
  handleDelete: PropTypes.func
}

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden'
  },
  btn: {
    zIndex: 999
  },
  img: {
    width: 'auto',
    height: '100%'
  }
}

export default withStyles(styles)(ImagesList)
