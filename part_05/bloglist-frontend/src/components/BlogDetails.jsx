import PropTypes from 'prop-types'
import { Typography, Button, Box, Paper } from '@mui/material'

const BlogDetails = ({ blog, handleLike, handleRemove, user }) => {
  if (!blog) return null

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
        {blog.title}
      </Typography>

      <Typography color="textSecondary" sx={{ mb: 1 }}>
        by {blog.author}
      </Typography>

      <Box sx={{ mb: 1 }}>
        <a href={blog.url} target="_blank" rel="noreferrer">
          {blog.url}
        </a>
      </Box>

      <Typography color="textSecondary" sx={{ mb: 2 }}>
        Added by {blog.user?.name}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="body1">
          {blog.likes} likes
        </Typography>

        {user && (
          <Button
            variant="outlined"
            color="primary"
            onClick={handleLike}
            sx={{ textTransform: 'uppercase' }}
          >
            like
          </Button>
        )}

        {user && user.username === blog.user?.username && (
          <Button
            variant="outlined"
            color="error"
            onClick={handleRemove}
            sx={{ textTransform: 'uppercase' }}
          >
            remove
          </Button>
        )}
      </Box>
    </Paper>
  )
}

BlogDetails.propTypes = {
  blog: PropTypes.object,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  user: PropTypes.object
}

export default BlogDetails