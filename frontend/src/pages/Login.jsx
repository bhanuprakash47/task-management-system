import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { loginUser } from "../services/authService"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      const res = await loginUser({ email, password })
      localStorage.setItem("token", res.data.token)
      navigate("/dashboard")
    } catch (err) {
      const msg = err?.response?.data?.message || "Login failed"
      setError(msg)
    }
  }

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h2 className="mb-4 font-bold">Login</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          className="border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="border p-2">Login</button>
      </form>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <p className="mt-4 text-sm">
        Don't have an account? <Link to="/signup" className="text-blue-600">Sign up</Link>
      </p>
    </div>
  )
}

export default Login