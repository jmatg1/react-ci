import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

function SignIn (props) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [signName, setSignName] = useState('')
  const [signPassword, setSignPassword] = useState('')
  const classes = useStyles()

  const findUser = (users, error) => {
    const foundUser = users.find(user => {
      if (user.name === signName) {
        if (error) {
          alert(error)
          return true
        }

        return user.password === signPassword
      }
    })
    return foundUser
  }
  /**
   * Обработка инпутов в форме
   * @param ev
   */
  const handleFormInput = (ev) => {
    switch (ev.target.name) {
    case 'name':
      setSignName(ev.target.value)
      break
    case 'password':
      setSignPassword(ev.target.value)
      break
    }
  }
  /**
   * Обработка Checkbox
   * Выбор между авторизацией и регистрацией
   * @param ev, checked
   */
  const handleRadio = (ev, checked) => setIsSignUp(checked)
  /**
   * Обработка отправки формы авторизации
   * Проверяет зарегистрирован ли пользователь
   * Добавляет нового в contacts
   * @param ev
   */
  const handleFormSubmit = (ev) => {
    ev.preventDefault()
    const { users, signupUser, setProfile, history } = props

    if (isSignUp) { // регистрация
      if (findUser(users, 'Логин занят')) return
      const newUser = {
        id: users.size,
        name: signName,
        password: signPassword,
        tweets: [],
        following: [],
        followers: []
      }
      signupUser(newUser)
      const { password, ...profile } = newUser
      setProfile(profile)
    } else { // авторизация
      const foundUser = findUser(users)
      if (!foundUser) return alert('Неверный логин или пароль')
      const { password, ...profile } = foundUser
      setProfile(profile)
    }
    history.push('/')
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleFormSubmit}>
          <TextField
            onChange={handleFormInput}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Имя"
            name="name"
            autoComplete="email"
            autoFocus
          />
          <TextField
            onChange={handleFormInput}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            autoComplete="current-password"
          />
          <FormControlLabel onChange={handleRadio}
            control={<Checkbox value="reg" color="primary"/>}
            label="Зарегистрироваться?"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? 'Регистрация' : 'Войти'}
          </Button>
        </form>
      </div>
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
}
const mapDispathToProps = dispath => {
  return {
    signupUser: (newUser) => dispath(actions.signupUser(newUser)),
    setProfile: (profile) => dispath(actions.setProfile(profile))
  }
}

export default connect(mapStateToProps, mapDispathToProps)(SignIn)
