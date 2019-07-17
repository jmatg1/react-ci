import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import _ from 'lodash'
import { urlify, unique, getImage } from '../../shared/utility'
import ImagesList from '../ImageList/ImageList'
import VideoList from '../VideoList/VideoList'
import CardContent from '@material-ui/core/CardContent'
import ImagesUploader from 'react-images-uploader'
import 'react-images-uploader/styles.css'
import 'react-images-uploader/font.css'

// TODO: вынести функции наверх
class FormDialog extends Component {
  state = {
    value: '',
    error: {
      isShow: false,
      text: null
    },
    data: {
      img: [],
      idVideos: []
    },
    uploadImg: ''
  }

  /**
   * Установить в поле ввода текст
   */
  componentDidMount () {
    const { data, inputValue } = this.props.dialog
    this.setState({
      value: inputValue,
      data: data
    })
  }
  /**
   *
   */
  setEr = (status = false, textEr = null) => {
    this.setState({
      error: {
        isShow: status,
        text: textEr
      }
    })
  }

  handleDelete = (id, type) => {
    this.setState((prevState) => {
      const newImg = [...prevState.data.img]
      const newVideo = [...prevState.data.idVideos]

      return ({
        data: {
          img: type === 'img' ? _.reject(newImg, (__, i) => i === id) : newImg,
          idVideos: type === 'video' ? _.reject(newVideo, (__, i) => i === id) : newVideo
        }
      })
    })
  }

  handleUpload = (err, response) => {
    if (err) {
      console.error(err)
      return
    }
    this.setState({ uploadImg: response })
  }

  handleSubmit = () => {
    if (this.validation() !== true) return false
    const { handleSave } = this.props

    let uptImg = [...this.state.data.img]

    if (this.state.uploadImg.length) {
      const uptUploadImg = this.state.uploadImg
      uptImg.push(uptUploadImg)
    }
    const payload = {
      text: this.state.value,
      img: uptImg,
      idVideos: this.state.data.idVideos
    }

    handleSave(payload)
    this.setState({ value: '' })
    this.setEr()
  }

  validation = (text = this.state.value) => {
    const { uploadImg, data: { img, idVideos } } = this.state
    if (text.length > 280) {
      this.setEr(true, 'Многа букв')
      return 0
    } else if (text.trim().length === 0 && !img.length && !idVideos.length && !uploadImg.length) {
      this.setEr(true, 'Мало букв')
      return 1
    } else {
      this.setEr(false, null)
      return true
    }
  }

  handleChangeValue = (ev) => {
    const text = String(ev.target.value)

    if (this.validation(text)) {
      const message = urlify(text)

      this.setState((prevState) => {
        const newImg = _.union(prevState.data.img, message.urls.img)
        const newVideos = _.union(prevState.data.idVideos, message.urls.idVideos)
        return ({
          value: message.text,
          data: {
            img: newImg,
            idVideos: newVideos
          }
        })
      })
    }
  }

  handleCancel = () => {
    this.props.handleClose()
    this.setEr()
    this.setState({ value: this.props.inputValue })
  }

  render () {
    const { value, error, data: { img, idVideos } } = this.state
    const { handleSave, handleClose, open, classes } = this.props
    const { placeholder, title, inputValue } = this.props.dialog

    return (
      <div>
        <Dialog open={open} onClose={this.handleCancel} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <TextField
              helperText={error.text}
              error={error.isShow}
              style={{ width: '500px' }}
              autoFocus
              margin="dense"
              id="name"
              label={placeholder}
              type="text"
              value={value}
              onChange={this.handleChangeValue}
              multiline
              rowsMax="6"
            />
            { img ? <ImagesList images={img} handleDelete={this.handleDelete}/> : null }
            { idVideos ? <VideoList videos={idVideos} handleDelete={this.handleDelete}/> : null }
            <ImagesUploader
              url="http://localhost:9090/notmultiple"
              optimisticPreviews
              multiple={false}
              onLoadEnd={this.handleUpload}
              label="Upload a picture"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancel} color="primary">
              Отмена
            </Button>
            {/* <input type="file" onChange={this.handleUpload}/> */}
            <Button onClick={this.handleSubmit} color="primary">
              Сохранить
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

FormDialog.propTypes = {
  dialog: PropTypes.shape({
    callBack: PropTypes.func,
    data: PropTypes.object,
    inputValue: PropTypes.string,
    isOpen: PropTypes.bool,
    placeholder: PropTypes.string,
    title: PropTypes.string
  }),
  open: PropTypes.bool.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
}
export default FormDialog
