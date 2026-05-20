import PropTypes from 'prop-types'
import Blog from './Blog'
import { Typography } from '@mui/material'

const BlogList = ({ blogs }) => {
  // Simulated Error
  /* throw new Error('simulated error') */

  return (
    <div>
      <Typography variant="h6" sx={{ my: 3 }}>
        Blogs
      </Typography>
      <ul>
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
      </ul>
    </div>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array,
}

export default BlogList
