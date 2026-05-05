import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        <label>
          title:
          <input value={title} onChange={({ target }) => setTitle(target.value)} />
        </label>
      </div>
      <div>
        <label>
          author:
          <input value={author} onChange={({ target }) => setAuthor(target.value)} />
        </label>
      </div>
      <div>
        <label>
          url:
          <input value={url} onChange={({ target }) => setUrl(target.value)} />
        </label>
      </div>
      <button type="submit">create</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm