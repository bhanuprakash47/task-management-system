import express from "express"
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  deleteAllTask
} from "./controllers/taskController.js"

import verifyToken from "../middlewares/authMiddleware.js"

const router = express.Router()

// Create Task
router.post("/create", verifyToken, createTask)

// Get All Tasks
router.get("/", verifyToken, getAllTasks)

// Get Task By ID
router.get("/:id", verifyToken, getTaskById)

// Update Task
router.put("/:id", verifyToken, updateTask)

// Delete Task By ID
router.delete("/:id", verifyToken, deleteTask)

router.delete("/delete",verifyToken,deleteAllTask)

export default router

