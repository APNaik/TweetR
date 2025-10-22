import axios from 'axios'

const api = axios.create({
  baseURL: '/api/',
  withCredentials: true,
})

const ACCESS_KEY = 'access_token'
const REFRESH_KEY = 'refresh_token'

export function setToken(access, refresh) {
  localStorage.setItem(ACCESS_KEY, access)
  if (refresh) localStorage.setItem(REFRESH_KEY, refresh)
  api.defaults.headers.common['Authorization'] = `Bearer ${access}`
}

export function clearToken() {
  localStorage.removeItem(ACCESS_KEY)
  localStorage.removeItem(REFRESH_KEY)
  delete api.defaults.headers.common['Authorization']
}

export function loadToken() {
  const t = localStorage.getItem(ACCESS_KEY)
  if (t) api.defaults.headers.common['Authorization'] = `Bearer ${t}`
}

export async function login(username, password) {
  const res = await axios.post('/api/token/', { username, password })
  setToken(res.data.access, res.data.refresh)
  return res.data
}

export async function refreshToken(refresh) {
  const res = await axios.post('/api/token/refresh/', { refresh })
  const access = res.data.access
  if (access) setToken(access, refresh)
  return res.data
}

export async function logout() {
  const refresh = localStorage.getItem(REFRESH_KEY)
  if (!refresh) {
    clearToken()
    return
  }
  try {
    await api.post('auth/logout/', { refresh })
  } catch (err) {
    // ignore errors on logout
  }
  clearToken()
}

export async function fetchTweets() {
  const res = await api.get('tweets/')
  return res.data
}

export async function getUser() {
  const res = await api.get('auth/user/')
  return res.data
}

export async function createTweet(data) {
  // data is FormData with text and optional photo
  const res = await api.post('tweets/', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data
}

export default api
