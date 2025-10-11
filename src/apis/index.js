import { API_ROOT } from '~/utils/constants'
// import axios from 'axios'
import {toast} from "react-toastify"
import authorizedAxiosInstance from "~/utils/authorizeAxios.js"

// Movie
export const fetchMoviesAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/movies/`)
  return response.data // authorizedAxiosInstance trả về kết quả qua property là data
}

export const getMovieAPI = async (movieId) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/movies/${movieId}`)
  return response.data
}

export const searchMoviesAPI = async (query) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/movies/search`, {
    params: { query } // authorizedAxiosInstance sẽ tự encode query string
  })
  return response.data
}

export const getCategoriesByMovieId = async (movieId) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/movies/${movieId}/categories`)
  return response.data
}

// Category
export const getMoviesByCategoryId = async (categoryId) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/category/${categoryId}/movies`)
  return response.data
}

export const getCategoryById = async (categoryId) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/category/${categoryId}`)
  return response.data
}

export const getCategories = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/category/`)
  return response.data
}

// Series
export const getSeriesById = async (seriesId) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/series/${seriesId}`)
  return response.data
}

export const getAllSeries = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/series/`)
  return response.data
}

export const getMoviesBySeriesId = async (seriesId) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/series/${seriesId}/movies`)
  return response.data
}

// User
export const registerUserApi = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/register`, data)
  toast.success('Account Created Successfuly', { theme: 'colored' })
  return response.data
}

export const verifyUserApi = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/users/verify`, data)
  toast.success('Account Verfified Successfuly', { theme: 'colored' })
  return response.data
}

export const forgotPasswordApi = async (data) => {
  try {
    const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/forgot-password`, data)
    toast.success('Reset link sent to your email.', { theme: 'colored' })
    return response.data
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to send reset email.', { theme: 'colored' })
    throw error
  }
}

export const resetPasswordApi = async (data) => {
  try {
    const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/users/reset-password`, data)
    toast.success('Password reset successfully!', { theme: 'colored' })
    return response.data
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to reset password.', { theme: 'colored' })
    throw error
  }
}

// Favorite
export const getFavoritesAPI = async (userId) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/users/${userId}/favorites`, { withCredentials: true })
  return response.data
}

export const addFavoriteAPI = async (userId, movieId) => {
  const response = await authorizedAxiosInstance.post(
      `${API_ROOT}/v1/users/${userId}/favorites`,
      { movieId },
      { withCredentials: true }
  )
  return response.data
}

export const removeFavoriteAPI = async (userId, movieId) => {
  const response = await authorizedAxiosInstance.delete(
      `${API_ROOT}/v1/users/${userId}/favorites`,
      {
        withCredentials: true,
        data: { movieId }
      }
  )
  return response.data
}

// Chatbox
export const sendMessageAPI = async (message) => {
  const response = await authorizedAxiosInstance.post(
      `${API_ROOT}/v1/chatbox`,
      { message },
      { withCredentials: true }
  )
  return response.data
}


// export const verifyUserApi = async (data) => {
//   const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/users/verify`, data)
//   toast.success('Account Verfified Successfuly', { theme: 'colored' })
//   return response.data
// }
//
// export const refreshTokenApi = async () => {
//   const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/users/refresh_token`)
//   return response.data
// }


// export const fetchMoviesAPI = async (searchPath) => {
//     const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/movies${searchPath}`)
//     return response.data
// }
