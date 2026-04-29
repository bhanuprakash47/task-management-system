import { useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      navigate("/dashboard")
    } else {
      navigate("/login")
    }
  }, [navigate])

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="mb-4 font-bold">Welcome to Task Manager</h2>
      <p className="mb-3">Quick links:</p>
      <div className="flex gap-3 justify-center">
        <Link to="/login" className="border px-3 py-1">Login</Link>
        <Link to="/signup" className="border px-3 py-1">Sign Up</Link>
      </div>
    </div>
  )
}

export default Home
