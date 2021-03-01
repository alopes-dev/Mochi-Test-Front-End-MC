import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.github.com/',
  headers: {
    Authorization: `token d90ed055f938f672c7558e94b76d4f57e90218a9`//my temporarily token
  }
})

export default api
