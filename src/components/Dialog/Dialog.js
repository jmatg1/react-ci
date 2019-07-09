import React, { useState, useEffect } from 'react'
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
  /**
   * Установить в поле ввода текст
   */
  useEffect(() => {
    setValue(inputValue)
  }, [inputValue])

  const handleChangeValue = (ev) => {
    setValue(ev.target.value)
  }

  const handleSubmit = () => {
    handleSave(value)
    setValue('')
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <TextField
            style={{width: '400px'}}
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
          <Button onClick={handleClose} color="primary">
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

export default FormDialog
