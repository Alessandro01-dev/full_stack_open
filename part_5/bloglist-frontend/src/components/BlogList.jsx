import PropTypes from 'prop-types'
import Blog from './Blog'

const BlogList = ({ blogs }) => {
  return (
    <div>
      <h2>blogs</h2>
      <ul>
        {[...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </ul>
    </div>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array
}

export default BlogList