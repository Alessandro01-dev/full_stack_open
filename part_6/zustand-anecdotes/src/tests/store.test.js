import { renderHook, act } from '@testing-library/react'
import { test, expect, vi } from 'vitest'

import anecdoteService from '../services/anecdotes'
import { useAnecdoteStore } from '../store'

vi.mock('../services/anecdotes')

test('initializes anecdotes from backend', async () => {
  const anecdotes = [
    {
      id: '1',
      content: 'first anecdote',
      votes: 5
    },
    {
      id: '2',
      content: 'second anecdote',
      votes: 2
    }
  ]

  anecdoteService.getAll.mockResolvedValue(anecdotes)

  const { result } = renderHook(() => useAnecdoteStore())

  await act(async () => {
    await result.current.actions.initializeAnecdotes()
  })

  expect(result.current.anecdotes).toEqual(anecdotes)
})