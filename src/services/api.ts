import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.github.com/',
  headers: {
    Authorization: `token 8fd6490462e06a249d8ee743e9c59badf814b168`,
  }
})

export default api
