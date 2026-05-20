import { Container, Typography, Box } from '@mui/material'
import LoginForm from './LoginForm'

const LoginPage = ({ handleLogin }) => {
  return (
    <Box>
      <Typography variant="h6" sx={{ my: 3 }}>
        Log in to application
      </Typography>
      <LoginForm handleLogin={handleLogin} />
    </Box>
  )
}

export default LoginPage
