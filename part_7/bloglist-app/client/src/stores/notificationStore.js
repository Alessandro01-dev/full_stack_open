import { create } from 'zustand'

const useNotificationStore = create((set) => ({
  message: null,
  type: null,

  showNotification: (message, type = 'success') => {
    set({ message, type })

    setTimeout(() => {
      set({ message: null, type: null })
    }, 5000)
  },
}))

export default useNotificationStore
