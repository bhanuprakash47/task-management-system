import express from "express"
import sequelize from "./config/db.js"
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// allow Authorization header from browsers
app.use(
  cors({
    origin: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)
app.use(express.json())

app.get("/", (_req, res) => {
  res.json({ message: "API is running" })
})

app.use("/auth", authRoutes)
app.use("/tasks", taskRoutes)

const startServer = async () => {
  try {
    await sequelize.authenticate()
    console.log("Database connected")

    // Ensure models are loaded so sequelize.sync() knows about them
    // This registers models and associations defined in models/index.js
    await import("./models/index.js")

    // Synchronize models with the database. `alter: true` will try to
    // update the existing tables to match the models without dropping data.
    // For production DBs consider using proper migrations instead.
    await sequelize.sync({ alter: true })
    console.log("Database synchronized (models are up-to-date)")

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (err) {
    console.error("DB connection error:", err.message)
  }
}

startServer()