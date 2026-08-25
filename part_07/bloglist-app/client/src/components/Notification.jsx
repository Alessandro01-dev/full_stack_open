import { Alert } from '@mui/material'
import PropTypes from 'prop-types'
import useNotificationStore from '../stores/notificationStore'

const Notification = () => {
  const { message, type } = useNotificationStore()

  if (message === null) {
    return null
  }

  return (
    <Alert severity={type === 'error' ? 'error' : 'success'} sx={{ my: 4 }}>
      {message}
    </Alert>
  )
}

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
}

export default Notification
