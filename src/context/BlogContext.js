import createDataContext from './createDataContext'
import jsonServer from '../api/jsonServer'

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'deleteBlogPost':
      return state.filter((blogPost) => blogPost.id !== action.payload)
    case 'editBlogPost':
      return state.map((blogPost) => {
        return blogPost.id === action.payload.id ? action.payload : blogPost
      })
    case 'getBlogPosts':
      return action.payload
    default:
      return state
  }
}

const getBlogPosts = (dispatch) => {
  return async () => {
    const response = await jsonServer.get('/blogposts')
    dispatch({ type: 'getBlogPosts', payload: response.data })
  }
}

const addBlogPost = (dispatch) => {
  return async (title, content, navigate) => {
    const response = await jsonServer.post('/blogposts', { title, content })
    // dispatch({ type: 'addBlogPost', payload: { title, content } })
    if (navigate) {
      navigate()
    }
  }
}

const deleteBlogPost = (dispatch) => {
  return async (id) => {
    await jsonServer.delete(`/blogposts/${id}`)
    dispatch({ type: 'deleteBlogPost', payload: id })
  }
}

const editBlogPost = (dispatch) => {
  return async (id, title, content, navigate) => {
    await jsonServer.put(`/blogposts/${id}`, { title, content })
    dispatch({
      type: 'editBlogPost',
      payload: { id, title, content },
    })
    if (navigate) {
      navigate()
    }
  }
}

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  []
)
