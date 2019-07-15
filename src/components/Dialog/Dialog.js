import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import { urlify, unique, removeFromArray } from '../../shared/utility'
import ImagesList from '../ImageList/ImageList'
import VideoList from '../VideoList/VideoList'
import CardContent from '@material-ui/core/CardContent'

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
    }
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
    console.log({
      error: status,
      text: textEr
    })

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

      console.log(newImg)
      return ({
        data: {
          img: type === 'img' ? newImg.filter((_, i) => i !== id) : newImg,
          idVideos: type === 'video' ? newVideo.filter((_, i) => i !== id) : newVideo
        }
      })
    })
  }

  handleUpload = (ev) => {
    console.log(ev.target)
  }
  render () {
    const { value, error, data: { img, idVideos } } = this.state
    const { handleSave, handleClose, open, classes } = this.props
    const { placeholder, title, inputValue } = this.props.dialog
    console.log('FORM')

    const validation = (text = this.state.value) => {
      if (text.length > 280) {
        this.setEr(true, 'Многа букв')
        return 0
      } else if (text.trim().length === 0) {
        this.setEr(true, 'Мало букв')
        return 1
      } else {
        this.setEr(false, null)
        return true
      }
    }

    const handleChangeValue = (ev) => {
      const text = String(ev.target.value)

      if (validation(text)) {
        const withoutUrl = urlify(text)
        this.setState((prevState) => {
          const newImg = unique([...prevState.data.img].concat(withoutUrl.urls.img))
          const newVideos = unique([...prevState.data.idVideos].concat(withoutUrl.urls.idVideos))
          return ({
            value: withoutUrl.text,
            data: {
              img: newImg,
              idVideos: newVideos
            }
          })
        })
      }
    }

    const handleSubmit = () => {
      if (validation() !== true) return false
      const payload = {
        text: this.state.value,
        ...this.state.data
      }
      handleSave(payload)
      this.setState({ value: '' })
      this.setEr()
    }
    const handleCancel = () => {
      handleClose()
      this.setEr()
      this.setState({ value: inputValue })
    }

    return (
      <div>
        <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
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
              onChange={handleChangeValue}
              multiline
              rowsMax="6"
            />
            { img ? <ImagesList images={img} handleDelete={this.handleDelete}/> : null }
            { idVideos ? <VideoList videos={idVideos} handleDelete={this.handleDelete}/> : null }
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} color="primary">
              Отмена
            </Button>
            {/* <input type="file" onChange={this.handleUpload}/> */}
            <Button onClick={handleSubmit} color="primary">
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
