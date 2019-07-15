import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

const VideoList = (props) => {
  const { videos, handleDelete } = props
  return (
    <div>
      {videos.map((url, i) => (
        <Grid>
          { handleDelete
            ? <IconButton style={{ zIndex: 999, top: '-105px' }} onClick={() => handleDelete(i, 'video')} >
              <DeleteIcon color="secondary"/>
            </IconButton>
            : null
          }
          <iframe width="355" height="200" src={`https://www.youtube.com/embed/${url}`}
            frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen/>

        </Grid>
      ))}
    </div>
  )
}
VideoList.propTypes = {
  images: PropTypes.array.isRequired,
  handleDelete: PropTypes.func
}

export default VideoList
