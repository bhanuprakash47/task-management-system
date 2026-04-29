import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import TaskItem from "../components/TaskItem"
import { getTasks, createTask, deleteTask, updateTask } from "../services/taskService"

const Dashboard = () => {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState("")
  const [status, setStatus] = useState("pending")
  const [error, setError] = useState("")

  const fetchTasks = async () => {
    try {
      const res = await getTasks()
      setTasks(res.data)
    } catch (err) {
      console.error("Fetch tasks error:", err)
      const status = err?.response?.status
      const body = err?.response?.data
      const msg = err?.response?.data?.message || err?.response?.data?.error || "Failed to load tasks"
      let combined = msg
      if (status) combined += ` (status ${status})`
      if (body) combined += ` - ${JSON.stringify(body)}`
      setError(combined)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleCreate = async () => {
    if (!title) return
    setError("")
    try {
      await createTask({ title, status })
      setTitle("")
      fetchTasks()
    } catch (err) {
      const msg = err?.response?.data?.message || err?.response?.data?.error || "Failed to create task"
      setError(msg)
    }
  }

  const handleDelete = async (id) => {
    setError("")
    try {
      await deleteTask(id)
      fetchTasks()
    } catch (err) {
      const msg = err?.response?.data?.message || err?.response?.data?.error || "Failed to delete task"
      setError(msg)
    }
  }

  const handleUpdate = async (id, data) => {
    setError("")
    try {
      await updateTask(id, data)
      fetchTasks()
    } catch (err) {
      const msg = err?.response?.data?.message || err?.response?.data?.error || "Failed to update task"
      setError(msg)
      throw err
    }
  }

  return (
    <div>
      <Navbar />

      <div className="p-4 max-w-lg mx-auto">
        <h2 className="mb-3 font-bold">Tasks</h2>

        <div className="flex gap-2 mb-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            className="border p-2 flex-1"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2"
          >
            <option value="pending">pending</option>
            <option value="completed">completed</option>
          </select>

          <button onClick={handleCreate} className="border px-3">
            Add
          </button>
        </div>

        {error && <p className="text-sm text-red-600 mb-3">{error}</p>}

        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onDelete={handleDelete} onUpdate={handleUpdate} />
        ))}
      </div>
    </div>
  )
}

export default Dashboard