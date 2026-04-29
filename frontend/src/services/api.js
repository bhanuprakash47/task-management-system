import axios from "axios"

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

// attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token")
  if (token) {
    // set both header casings to be robust across environments
    req.headers.Authorization = `Bearer ${token}`
    req.headers["authorization"] = `Bearer ${token}`
  }
  return req
})

// Global response handler: if token expired or invalid, clear and redirect to login
API.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status
    if (status === 401 || status === 403) {
      localStorage.removeItem("token")
      // force a full reload to ensure protected routes are re-evaluated
      window.location.href = "/login"
    }
    return Promise.reject(error)
  }
)

export default API