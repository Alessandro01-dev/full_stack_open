import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

export const useNotification = () => {
  const context = useContext(NotificationContext)
  const setNotification = context[1]

  return (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }
}

export const useNotificationValue = () => {
  const context = useContext(NotificationContext)
  return context[0]
}
