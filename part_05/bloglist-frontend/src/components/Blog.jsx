import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {

  return (
    <li className="blog">
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    </li>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog