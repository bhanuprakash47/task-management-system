import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { registerUser } from "../services/authService"

const Signup = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      await registerUser({ name, email, password })
      navigate("/login")
    } catch (err) {
      const msg = err?.response?.data?.message || "Registration failed"
      setError(msg)
    }
  }

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h2 className="mb-4 font-bold">Sign Up</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Name"
          className="border p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <button className="border p-2">Sign Up</button>
      </form>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <p className="mt-4 text-sm">
        Already registered? <Link to="/login" className="text-blue-600">Login</Link>
      </p>
    </div>
  )
}

export default Signup
