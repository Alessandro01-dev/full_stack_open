import { Container, Typography, Box } from '@mui/material'
import LoginForm from './LoginForm'

const LoginPage = ({ handleLogin }) => {
  return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Log in to application
        </Typography>
        <LoginForm handleLogin={handleLogin} />
      </Box>
  )
}

export default LoginPage