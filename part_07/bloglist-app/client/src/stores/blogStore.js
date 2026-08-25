import { create } from 'zustand'
import blogService from '../services/blogs'

const useBlogStore = create((set, get) => ({
  blogs: [],

  initializeBlogs: async () => {
    const blogs = await blogService.getAll()
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
    set({ blogs: sortedBlogs })
  },

  addBlog: async (newBlog, currentUser) => {
    const addedBlog = await blogService.create(newBlog)

    const blogWithUser = {
      ...addedBlog,
      user: {
        username: currentUser.username,
        name: currentUser.name,
        id: addedBlog.user,
      },
    }

    const updatedBlogs = get().blogs.concat(blogWithUser)
    set({ blogs: updatedBlogs.sort((a, b) => b.likes - a.likes) })
    return addedBlog
  },

  likeBlog: async (blogToLike) => {
    const blogToUpdate = {
      ...blogToLike,
      likes: blogToLike.likes + 1,
      user: blogToLike.user.id,
    }
    const returnedBlog = await blogService.update(blogToUpdate)

    const updatedBlogs = get().blogs.map((b) =>
      b.id === blogToLike.id ? { ...returnedBlog, user: blogToLike.user } : b
    )
    set({ blogs: updatedBlogs.sort((a, b) => b.likes - a.likes) })
  },

  commentBlog: async (id, commentContent) => {
    const updatedBlog = await blogService.addComment(id, commentContent)

    set({
      blogs: get().blogs.map((b) => (b.id === id ? updatedBlog : b)),
    })
  },

  deleteBlog: async (id) => {
    await blogService.remove(id)
    set({ blogs: get().blogs.filter((b) => b.id !== id) })
  },
}))

export default useBlogStore
