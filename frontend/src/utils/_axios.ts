import axios from 'axios'

export const _axios = axios.create({
  baseURL: 'http://localhost:4589/',
  withCredentials: true
})