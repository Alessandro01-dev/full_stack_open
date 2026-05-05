import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './index.css'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Toggleble'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchBlogs()
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch {
      setErrorMessage('wrong username or password')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const blogFormRef = useRef()

  const handleCreateBlog = async (newBlog) => {
    try {
      const addedBlog = await blogService.create(newBlog)
      blogFormRef.current.toggleVisibility()
      setSuccessMessage(`a new blog ${addedBlog.title} by ${addedBlog.author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      setBlogs(blogs.concat(addedBlog))
    } catch {
      setErrorMessage('failed to add blog: check title and url')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLike = async (blog) => {
    const blogToUpdate = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    try {
      const returnedBlog = await blogService.update(blogToUpdate)
      setBlogs(blogs.map(b => b.id === blog.id ? returnedBlog : b))
    } catch {
      setErrorMessage('error updating likes')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
      } catch {
        setErrorMessage('error deleting blog')
        setTimeout(() => setErrorMessage(null), 5000)
      }
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} type="error" />
        <LoginForm
          handleLogin={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={successMessage} type="success" />
      <Notification message={errorMessage} type="error" />

      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

      <h2>create new</h2>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={handleCreateBlog} />
      </Togglable>

      <br />
      {[...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={() => handleLike(blog)}
          handleRemove={() => handleRemove(blog)}
          user={user}
        />
      )}
    </div>
  )
}

export default App