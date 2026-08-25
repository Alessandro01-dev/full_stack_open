import PropTypes from 'prop-types'
import {
  Typography,
  Button,
  Box,
  Paper,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material'
import useBlogStore from '../stores/blogStore'
import { useField } from '../hooks'

const BlogDetails = ({ blog, handleLike, handleRemove, user }) => {
  const commentStoreAction = useBlogStore((state) => state.commentBlog)
  const { reset: resetComment, ...commentField } = useField('text')

  if (!blog) return null

  const handleAddComment = (event) => {
    event.preventDefault()

    if (!commentField.value.trim()) return

    commentStoreAction(blog.id, commentField.value)
    resetComment()
  }

  return (
    <Box>
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
          <Typography variant="body1">{blog.likes} likes</Typography>

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

      <Paper elevation={2} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
          Comments
        </Typography>
        <Box component="form" onSubmit={handleAddComment} sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            {...commentField}
            label="Write a comment..."
            variant="outlined"
            size="small"
            name="comment"
          />
          <Button type="submit" variant="contained" color="primary">
            add comment
          </Button>
        </Box>

        {!blog.comments || blog.comments.length === 0 ? (
          <Typography variant="body2" color="textSecondary" italic>
            No comments yet. Be the first to comment!
          </Typography>
        ) : (
          <List>
            {blog.comments?.map((comment, index) => (
              <Box key={index}>
                <ListItem disableGutters>
                  <ListItemText primary={comment} />
                </ListItem>
                {index < blog.comments.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  )
}

BlogDetails.propTypes = {
  blog: PropTypes.object,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  user: PropTypes.object,
}

export default BlogDetails
