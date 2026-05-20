import { create } from 'zustand'
import loginService from '../services/login'
import blogService from '../services/blogs'
import persistentUserService from '../services/persistentUser'

const useUserStore = create((set) => ({
  user: null,

  initializeUser: () => {
    const user = persistentUserService.getUser()
    if (user) {
      blogService.setToken(user.token)
      set({ user })
    }
  },

  login: async (credentials) => {
    const user = await loginService.login(credentials)
    persistentUserService.saveUser(user)
    blogService.setToken(user.token)
    set({ user })
    return user
  },

  logout: () => {
    persistentUserService.removeUser()
    blogService.setToken(null)
    set({ user: null })
  },
}))

export default useUserStore
