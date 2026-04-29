import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <div className="p-4 border-b flex justify-between">
      <h2 className="font-bold">Task Manager</h2>
      <button onClick={handleLogout} className="border px-3 py-1">
        Logout
      </button>
    </div>
  )
}

export default Navbar