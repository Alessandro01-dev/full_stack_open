import { useState } from "react"
import PropTypes from 'prop-types'
import { TextField, Button, Box } from '@mui/material'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    handleLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <div>
        <TextField
          variant="standard"
          label="username"
          size="small"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
          sx={{ my: 1, width: '25ch' }}
        />
      </div>
      <div>
        <TextField
          variant="standard"
          label="password"
          type="password"
          size="small"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
          sx={{ my: 1, width: '25ch' }}
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        sx={{ my: 3 }}
      >
        login
      </Button>
    </Box>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm