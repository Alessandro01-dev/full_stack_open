const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  const favorite = blogs.reduce((prev, current) => {
    return (prev.likes > current.likes) ? prev : current
  })

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const authorCounts = lodash.countBy(blogs, 'author')

  const authorsArray = lodash.map(authorCounts, (count, author) => ({
    author: author,
    blogs: count
  }))

  return lodash.maxBy(authorsArray, 'blogs')
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const blogsByAuthor = lodash.groupBy(blogs, 'author')

  const likesByAuthor = lodash.map(blogsByAuthor, (authorBlogs, author) => ({
    author: author,
    likes: lodash.sumBy(authorBlogs, 'likes')
  }))

  return lodash.maxBy(likesByAuthor, 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}