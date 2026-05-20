import { useState } from 'react'
import PropTypes from 'prop-types'
import { TextField, Button, Box } from '@mui/material'
import { useField } from '../hooks'

const LoginForm = ({ handleLogin }) => {
  const { reset: resetUsername, ...usernameField } = useField('text')
  const { reset: resetPassword, ...passwordField } = useField('password')

  const handleSubmit = (event) => {
    event.preventDefault()

    handleLogin({
      username: usernameField.value,
      password: passwordField.value,
    })

    resetUsername()
    resetPassword()
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <div>
        <TextField
          {...usernameField}
          variant="standard"
          label="username"
          size="small"
          name="username"
          sx={{ my: 1, width: '25ch' }}
        />
      </div>
      <div>
        <TextField
          {...passwordField}
          variant="standard"
          label="password"
          size="small"
          name="password"
          sx={{ my: 1, width: '25ch' }}
        />
      </div>
      <Button variant="contained" color="primary" type="submit" sx={{ my: 3 }}>
        login
      </Button>
    </Box>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export default LoginForm
