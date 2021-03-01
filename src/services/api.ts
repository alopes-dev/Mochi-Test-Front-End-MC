import axios from 'axios'
console.log(`token ${process.env.NEXT_PUBLIC_PERSONAL_ACCESS_TOKEN}`)
const api = axios.create({
  baseURL: 'https://api.github.com/',
  headers: {
    Authorization: `token ${process.env.NEXT_PUBLIC_PERSONAL_ACCESS_TOKEN}`,
  }
})

export default api
