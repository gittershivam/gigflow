import axios from 'axios'

const baseURL = process.env.REACT_APP_API_URL

if (!baseURL) {
  throw new Error('REACT_APP_API_URL is not defined in environment variables')
}

const api = axios.create({ baseURL })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api