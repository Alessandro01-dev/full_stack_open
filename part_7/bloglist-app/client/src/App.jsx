import { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import './index.css'
import { Routes, Route, Link, useNavigate, Navigate, useMatch } from 'react-router-dom'
import UserList from './components/UserList'
import LoginPage from './components/LoginPage'
import BlogList from './components/BlogList'
import BlogDetails from './components/BlogDetails'
import BlogForm from './components/BlogForm'
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material'
import ErrorBoundary from './components/ErrorBoundary'
import useNotificationStore from './stores/notificationStore'
import useBlogStore from './stores/blogStore'
import useUserStore from './stores/userStore'

const App = () => {
  const navigate = useNavigate()
  const blogFormRef = useRef()

  const showNotification = useNotificationStore((state) => state.showNotification)
  const { blogs, initializeBlogs, addBlog, likeBlog, deleteBlog } = useBlogStore()
  const { user, initializeUser, login, logout } = useUserStore()

  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find((b) => b.id === match.params.id) : null

  useEffect(() => {
    initializeBlogs()
  }, [initializeBlogs])

  useEffect(() => {
    initializeUser()
  }, [initializeUser])

  const handleLogin = async (credentials) => {
    try {
      await login(credentials)
      navigate('/')
    } catch {
      showNotification('wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleCreateBlog = async (newBlog) => {
    try {
      const addedBlog = await addBlog(newBlog, user)
      showNotification(`a new blog ${addedBlog.title} by ${addedBlog.author} added`, 'success')
      navigate('/')
    } catch {
      showNotification('failed to add blog: check title and url', 'error')
    }
  }

  const handleLike = async (blogToLike) => {
    try {
      await likeBlog(blogToLike)
    } catch {
      showNotification('error updating likes', 'error')
    }
  }

  const handleRemove = async (blogToRemove) => {
    if (window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}?`)) {
      try {
        await deleteBlog(blogToRemove.id)
        navigate('/')
      } catch {
        showNotification('error deleting blog', 'error')
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
              <Button color="inherit" component={Link} to="/users">
                users
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
        <Notification />
      </Container>

      <Container>
        <ErrorBoundary>
          <Routes>
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <LoginPage handleLogin={handleLogin} />}
            />
            <Route path="/" element={<BlogList blogs={blogs} />} />
            <Route
              path="/blogs/:id"
              element={
                <BlogDetails
                  blog={blog}
                  handleLike={() => handleLike(blog)}
                  handleRemove={() => handleRemove(blog)}
                  user={user}
                />
              }
            />
            <Route
              path="/create"
              element={
                user ? (
                  <div>
                    <Typography variant="h6" sx={{ my: 3 }}>
                      Create new
                    </Typography>
                    <BlogForm createBlog={handleCreateBlog} />
                  </div>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/users" element={<UserList />} />
            <Route
              path="*"
              element={
                <div>
                  <h2>404 - Page not found</h2>
                </div>
              }
            />
          </Routes>
        </ErrorBoundary>
      </Container>
    </div>
  )
}

export default App
