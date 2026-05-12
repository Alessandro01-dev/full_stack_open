import { render, screen, act, fireEvent } from '@testing-library/react'
import { test, expect, vi } from 'vitest'

import AnecdoteList from '../components/AnecdoteList'
import { useAnecdoteStore } from '../store'
import anecdoteService from '../services/anecdotes'

vi.mock('../services/anecdotes')

test('renders anecdotes sorted by votes', async () => {
  await act(async () => {
    useAnecdoteStore.setState({
      anecdotes: [
        {
          id: '1',
          content: 'lowest votes',
          votes: 1
        },
        {
          id: '2',
          content: 'highest votes',
          votes: 10
        },
        {
          id: '3',
          content: 'middle votes',
          votes: 5
        }
      ],
      filter: ''
    })
  })

  render(<AnecdoteList />)

  const anecdotes = screen.getAllByText(/has/i)

  expect(anecdotes[0].textContent).toContain('10')
  expect(anecdotes[1].textContent).toContain('5')
  expect(anecdotes[2].textContent).toContain('1')
})

test('renders filtered anecdotes', async () => {
  await act(async () => {
    useAnecdoteStore.setState({
      anecdotes: [
        {
          id: '1',
          content: 'React is easy',
          votes: 1
        },
        {
          id: '2',
          content: 'Redux is hard',
          votes: 10
        },
        {
          id: '3',
          content: 'Zustand is simple',
          votes: 5
        }
      ],
      filter: 'react'
    })
  })

  render(<AnecdoteList />)

  expect(screen.getByText('React is easy')).toBeDefined()

  expect(
    screen.queryByText('Redux is hard')
  ).toBeNull()

  expect(
    screen.queryByText('Zustand is simple')
  ).toBeNull()
})

test('voting increases anecdote votes', async () => {
  const anecdote = {
    id: '1',
    content: 'testing react',
    votes: 1
  }

  await act(async () => {
    useAnecdoteStore.setState({
      anecdotes: [anecdote],
      filter: ''
    })
  })

  anecdoteService.update.mockResolvedValue({
    ...anecdote,
    votes: 2
  })

  render(<AnecdoteList />)

  const button = screen.getByText('vote')

  await act(async () => {
    fireEvent.click(button)
  })

  expect(screen.getByText(/has 2/i)).toBeDefined()
})