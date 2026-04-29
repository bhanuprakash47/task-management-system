import API from "./api"

export const getTasks = () => API.get("/tasks")

export const getTaskById = (id) => API.get(`/tasks/${id}`)

export const createTask = (data) => API.post("/tasks/create", data)

export const updateTask = (id, data) => API.put(`/tasks/${id}`, data)

export const deleteTask = (id) => API.delete(`/tasks/${id}`)

export const deleteAllTasks = () => API.delete("/tasks/delete")