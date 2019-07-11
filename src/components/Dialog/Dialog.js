import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

const FormDialog = (props) => {
  const { handleSave, handleClose, open } = props
  const { placeholder, title, inputValue } = props.dialog
  const [value, setValue] = useState(inputValue)
  const [error, setError] = useState({ error: true, text: null })
  console.log('FORM', props)

  /**
   * Установить в поле ввода текст
   */
  useEffect(() => {
    setValue(inputValue)
    setError({
      error: false,
      text: null
    })
  }, [inputValue])

  const setEr = (status = false, textEr = null) => {
    setError({
      error: status,
      text: textEr
    })
  }

  const validation = (text = value) => {
    if (text.length > 280) {
      setEr(true, 'Многа букв')
      return 0
    } else if (text.trim().length === 0) {
      setEr(true, 'Мало букв')
      return 1
    } else {
      setEr(false, null)
      return true
    }
  }

  const handleChangeValue = (ev) => {
    const text = String(ev.target.value)
    if (validation(text) === true || 1) {
      setValue(text)
    }
  }

  const handleSubmit = () => {
    if (validation() !== true) return false
    handleSave(value)
    setValue('')
    setEr()
  }
  const handleCancel = () => {
    handleClose()
    setEr()
    setValue(inputValue)
  }

  return (
    <div>
      <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <TextField
            helperText={error.text}
            error={error.error}
            style={{ width: '400px' }}
            autoFocus
            margin="dense"
            id="name"
            label={placeholder}
            type="text"
            value={value}
            onChange={handleChangeValue}
            multiline
            rowsMax="4"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Отмена
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
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
