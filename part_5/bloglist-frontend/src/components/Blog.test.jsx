import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { vi } from 'vitest'

const blog = {
  title: 'Blog Title',
  author: 'Blog Author',
  url: 'http://blogurl.com',
  likes: 5,
  user: {
    name: 'Test User',
    username: 'testuser'
  }
}

const userObj = {
  username: 'testuser'
}

describe('<Blog />', () => {
  let mockHandler

  beforeEach(() => {
    mockHandler = vi.fn()
    render(
      <Blog
        blog={blog}
        user={userObj}
        handleLike={mockHandler}
      />
    )
  })

  test('renders title and author, but does not render URL or likes by default', () => {
    expect(screen.getByText(/Blog Title/i)).toBeInTheDocument()
    expect(screen.getByText(/Blog Author/i)).toBeInTheDocument()
    expect(screen.queryByText('http://blogurl.com')).toBeNull()
    expect(screen.queryByText(/likes/i)).toBeNull()
  })

  test('checks that URL and number of likes are shown when the button is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    expect(screen.getByText('http://blogurl.com')).toBeInTheDocument()
    expect(screen.getByText(/likes 5/i)).toBeInTheDocument()
  })

  test('if the like button is clicked twice, the event handler is called twice', async () => {
    const user = userEvent.setup()

    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})