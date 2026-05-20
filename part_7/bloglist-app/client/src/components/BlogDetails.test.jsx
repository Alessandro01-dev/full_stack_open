import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import BlogDetails from './BlogDetails'
import { expect, test, vi } from 'vitest'

const blog = {
  title: 'Blog Title',
  author: 'Blog Author',
  url: 'http://blogurl.com',
  likes: 5,
  user: {
    name: 'Test User',
    username: 'testuser',
  },
}

test('renders title, author, url and likes but no buttons for unauthenticated user', () => {
  render(
    <BrowserRouter>
      <BlogDetails blog={blog} handleLike={vi.fn()} handleRemove={vi.fn()} user={null} />
    </BrowserRouter>
  )

  expect(screen.getByText(/Blog Title/i)).toBeInTheDocument()
  expect(screen.getByText(/Blog Author/i)).toBeInTheDocument()
  expect(screen.getByText('http://blogurl.com')).toBeInTheDocument()
  expect(screen.getByText(/5 likes/i)).toBeInTheDocument()

  expect(screen.queryByText('like')).toBeNull()
  expect(screen.queryByText('remove')).toBeNull()
})

test('renders like button for authenticated user who is NOT the creator', () => {
  const otherUser = { username: 'otheruser' }

  render(
    <BrowserRouter>
      <BlogDetails blog={blog} handleLike={vi.fn()} handleRemove={vi.fn()} user={otherUser} />
    </BrowserRouter>
  )

  expect(screen.getByText('like')).toBeInTheDocument()
  expect(screen.queryByText('remove')).toBeNull()
})

test('renders both buttons for the creator', () => {
  const userObj = { username: 'testuser' }

  render(
    <BrowserRouter>
      <BlogDetails blog={blog} handleLike={vi.fn()} handleRemove={vi.fn()} user={userObj} />
    </BrowserRouter>
  )

  expect(screen.getByText('like')).toBeInTheDocument()
  expect(screen.getByText('remove')).toBeInTheDocument()
})
