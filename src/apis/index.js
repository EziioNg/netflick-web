// import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'
import axios from 'axios'

// Movie
export const fetchMoviesAPI = async () => {
  const response = await axios.get(`${API_ROOT}/v1/movies/`)
  return response.data // axios trả về kết quả qua property là data
}

export const getMovieAPI = async (movieId) => {
  const response = await axios.get(`${API_ROOT}/v1/movies/${movieId}`)
  return response.data
}


// Category
export const getMoviesByCategoryId = async (categoryId) => {
  const response = await axios.get(`${API_ROOT}/v1/category/${categoryId}/movies`)
  return response.data
}

export const getCategoryById = async (categoryId) => {
  const response = await axios.get(`${API_ROOT}/v1/category/${categoryId}`)
  return response.data
}

export const getCategories = async () => {
  const response = await axios.get(`${API_ROOT}/v1/category/`)
  return response.data
}


// export const fetchMoviesAPI = async (searchPath) => {
//     const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/movies${searchPath}`)
//     return response.data
// }
