import PropTypes from 'prop-types'
import { TextField, Button, Box, Typography } from '@mui/material'
import { useField } from '../hooks'

const BlogForm = ({ createBlog }) => {
  const { reset: resetTitle, ...titleField } = useField('text')
  const { reset: resetAuthor, ...authorField } = useField('text')
  const { reset: resetUrl, ...urlField } = useField('text')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: titleField.value,
      author: authorField.value,
      url: urlField.value,
    })

    resetTitle()
    resetAuthor()
    resetUrl()
  }

  return (
    <Box sx={{ mt: 2, width: '50ch' }}>
      <form onSubmit={addBlog}>
        <div>
          <TextField
            {...titleField}
            variant="outlined"
            label="title"
            fullWidth
            margin="normal"
            name="title"
          />
        </div>
        <div>
          <TextField
            {...authorField}
            variant="outlined"
            label="author"
            fullWidth
            margin="normal"
            name="author"
          />
        </div>
        <div>
          <TextField
            {...urlField}
            variant="outlined"
            label="url"
            fullWidth
            margin="normal"
            name="url"
          />
        </div>
        <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
          create
        </Button>
      </form>
    </Box>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
