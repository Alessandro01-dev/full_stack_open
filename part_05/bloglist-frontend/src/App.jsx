import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './index.css'
import { Routes, Route, Link, useNavigate, Navigate, useMatch } from 'react-router-dom'
import UserList from './components/UserList'
import LoginPage from './components/LoginPage'
import BlogList from './components/BlogList'
import BlogDetails from './components/BlogDetails'
import BlogForm from './components/BlogForm'
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  const navigate = useNavigate()
  const blogFormRef = useRef()

  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(b => b.id === match.params.id)
    : null

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
      navigate('/')
    } catch {
      setErrorMessage('wrong username or password')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    navigate('/')
  }

  const handleCreateBlog = async (newBlog) => {
    try {
      const addedBlog = await blogService.create(newBlog)
      const blogWithUser = {
        ...addedBlog,
        user: {
          username: user.username,
          name: user.name,
          id: addedBlog.user
        }
      }
      setBlogs(blogs.concat(blogWithUser))
      setSuccessMessage(`a new blog ${addedBlog.title} by ${addedBlog.author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      navigate('/')
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
      setBlogs(blogs.map(b => b.id === blog.id ? { ...returnedBlog, user: blog.user } : b))
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
        navigate('/')
      } catch {
        setErrorMessage('error deleting blog')
        setTimeout(() => setErrorMessage(null), 5000)
      }
    }
  }

  const padding = { padding: 5 }

  return (
    <div>
      <AppBar position="static">
        <Container>
          <Toolbar disableGutters>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Blog App
            </Typography>

            <Box>
              <Button color="inherit" component={Link} to="/">
                blogs
              </Button>
              {user && (
                <Button color="inherit" component={Link} to="/create">
                  new blog
                </Button>
              )}
              {user ? (
                <Button color="inherit" onClick={handleLogout}>
                  logout
                </Button>
              ) : (
                <Button color="inherit" component={Link} to="/login">
                  login
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Container>
        <Notification message={successMessage} type="success" />
        <Notification message={errorMessage} type="error" />
      </Container>

      <Container>
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage handleLogin={handleLogin} />} />
          <Route path="/" element={<BlogList blogs={blogs} />} />
          <Route path="/blogs/:id" element={<BlogDetails blog={blog} handleLike={() => handleLike(blog)} handleRemove={() => handleRemove(blog)} user={user} />} />
          <Route path="/create" element={
            user ? (
              <div>
                <h2>create new</h2>
                <BlogForm createBlog={handleCreateBlog} />
              </div>
            ) : (
              <Navigate to="/login" />
            )
          } />
        </Routes>
      </Container>
    </div>
  )
}

export default App