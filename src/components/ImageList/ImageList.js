import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'

const ImagesList = (props) => {
  const { images, handleDelete, classes } = props
  const uploadImageFail = (i) => {
    alert('Неудалось загрузить картинку')
    handleDelete(i, 'img')
  }
  return (
    <GridList cellHeight={160} className={classes.gridList} cols={2}>
      {images.map((url, i) => (
        <GridListTile key={i} cols={1}>
          { handleDelete
            ? <IconButton style={{ zIndex: 999 }} onClick={() => handleDelete(i, 'img')} >
              <DeleteIcon color="secondary"/>
            </IconButton>
            : null
          }
          <img src={url} onError={() => uploadImageFail(i)} alt="Картинка"/>
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
  }
}

export default withStyles(styles)(ImagesList)
