import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

export const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  notification: null,
  timeoutId: null,
  actions: {
    vote: async (id) => {
      const anecdotes = get().anecdotes
      const anecdoteToVote = anecdotes.find(a => a.id === id)
      const updatedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }
      const savedAnecdote = await anecdoteService.update(id, updatedAnecdote)
      set((state) => ({
        anecdotes: state.anecdotes.map(a =>
          a.id !== id ? a : savedAnecdote
        )
      }))
      get().actions.showNotification(`you voted '${anecdoteToVote.content}'`)
    },
    createAnecdote: async (content) => {
      const newObject = await anecdoteService.createNew(content)
      set((state) => ({
        anecdotes: state.anecdotes.concat(newObject)
      }))
      get().actions.showNotification(`anecdote '${content}' created`)
    },
    setFilter: value => set(() => ({ filter: value })),
    initializeAnecdotes: async () => {
      const anecdotes = await anecdoteService.getAll()
      set({ anecdotes })
    },
    showNotification: (message) => {
      const currentTimeoutId = get().timeoutId
      if (currentTimeoutId) {
        clearTimeout(currentTimeoutId)
      }
      set({ notification: message })
      const newTimeoutId = setTimeout(() => {
        set({ notification: null, timeoutId: null })
      }, 5000)

      set({ timeoutId: newTimeoutId })
    },
    deleteAnecdote: async (id) => {
      await anecdoteService.remove(id)
      set((state) => ({
        anecdotes: state.anecdotes.filter(a => a.id !== id)
      }))
      get().actions.showNotification('anecdote deleted')
    }
  },
}))

export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes)
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
export const useFilter = () => useAnecdoteStore((state) => state.filter)
export const useNotification = () => useAnecdoteStore((state) => state.notification)