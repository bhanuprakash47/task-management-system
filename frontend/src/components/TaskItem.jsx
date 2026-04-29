import { useState } from "react"

const TaskItem = ({ task, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [status, setStatus] = useState(task.status)
  const [error, setError] = useState("")

  const save = async () => {
    setError("")
    try {
      await onUpdate(task.id, { title, status })
      setIsEditing(false)
    } catch (err) {
      console.error("Task update error:", err)
      const status = err?.response?.status
      const body = err?.response?.data
      const msg = err?.response?.data?.message || err?.response?.data?.error || "Update failed"
      setError(msg)
      // attach debug details for visibility
      setError((prev) => prev + (status ? ` (status ${status})` : ""))
      if (body) setError((prev) => prev + ` - ${JSON.stringify(body)}`)
    }
  }

  return (
    <div className="border p-3 flex justify-between mb-2 items-center">
      <div className="flex-1 text-left">
        {isEditing ? (
          <div className="flex gap-2 items-center">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-1"
            />
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="border p-1">
              <option value="pending">pending</option>
              <option value="completed">completed</option>
            </select>
          </div>
        ) : (
          <>
            <p className="font-medium">{task.title}</p>
            <p className="text-sm text-gray-500">{task.status}</p>
          </>
        )}
        {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
      </div>

      <div className="flex gap-2">
        {isEditing ? (
          <>
            <button onClick={save} className="border px-2 py-1 bg-green-50">Save</button>
            <button onClick={() => { setIsEditing(false); setTitle(task.title); setStatus(task.status) }} className="border px-2 py-1">Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)} className="border px-2 py-1">Edit</button>
            <button onClick={() => onDelete(task.id)} className="border px-2 py-1">Delete</button>
          </>
        )}
      </div>
    </div>
  )
}

export default TaskItem